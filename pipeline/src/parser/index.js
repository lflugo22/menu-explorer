'use strict';

const matter = require('gray-matter');
const { lexer } = require('marked');

const SLOT_MARKER = 'slot';
const SCHEMA_VERSION = '1';

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

function parseListItem(text) {
  const match = text.match(/^([a-z0-9_]+):\s+(.+)$/i);
  if (!match) return null;
  return { key: match[1].trim(), label: match[2].trim() };
}

function tokenText(token) {
  if (token.text) return token.text.trim();
  if (token.tokens) return token.tokens.map(t => t.text || '').join('').trim();
  return '';
}

function parseFile(filePath, fileContent) {
  const { data: frontmatter, content } = matter(fileContent);
  const sourceFile = filePath.split('/').pop();

  const deviceType        = frontmatter.device_type;
  const version           = String(frontmatter.version ?? '');
  const label             = frontmatter.label ?? '';
  const isController      = frontmatter.is_controller === true;
  const maxDevices        = frontmatter.max_devices ?? null;
  const compatControllers = frontmatter.compatible_controllers ?? [];
  const controllerLabels  = frontmatter.controller_labels ?? {};
  const versionId         = `${deviceType}@${version}`;

  // ── Shared mutable state ────────────────────────────────────────────────
  const nodes        = {};
  const rootNodes    = [];
  const headingStack = [];
  const sortCounters = {};
  const invalidItems = [];
  let   lastNodeId   = null;

  function getSortOrder(parentPath) {
    const k = parentPath || '__root__';
    sortCounters[k] = (sortCounters[k] ?? -1) + 1;
    return sortCounters[k];
  }

  function currentHeadingParent() {
    return headingStack.length ? headingStack[headingStack.length - 1] : null;
  }

  function buildPath(key, listParentPath) {
    const base = listParentPath ?? headingStack.map(h => h.key).join('.');
    return base ? `${base}.${key}` : key;
  }

  function makeNode({ key, label, type, path, parentId, depth, sortOrder }) {
    return {
      id:                `${versionId}/${path}`,
      version_id:        versionId,
      path, key, label,
      description:       null,
      type,
      depth,
      parent_id:         parentId,
      children:          [],
      sort_order:        sortOrder,
      controller_labels: {},
    };
  }

  function attachToParent(node, parentNode) {
    if (parentNode) {
      nodes[parentNode.id].children.push(node.id);
    } else {
      rootNodes.push(node.id);
    }
  }

  // ── Recursive list item processor ───────────────────────────────────────
  // parentNode:   node record that owns this list, or null
  // parentPath:   dot-path string of parentNode
  // depthOffset:  absolute depth of items at this nesting level
  function processItems(items, parentNode, parentPath, depthOffset) {
    for (const item of items) {
      let rawText         = '';
      let itemDescription = null;
      let nestedList      = null;

      for (const sub of item.tokens ?? []) {
        if ((sub.type === 'text' || sub.type === 'paragraph') && !rawText) {
          rawText = (sub.text ?? '').trim();
        }
        if (sub.type === 'blockquote') {
          itemDescription = sub.text?.trim() ?? null;
        }
        if (sub.type === 'list') {
          nestedList = sub;
        }
      }

      const hasChildren = nestedList !== null;

      // Slot node
      if (rawText.startsWith(`${SLOT_MARKER}:`)) {
        const slotLabel = rawText.replace(`${SLOT_MARKER}:`, '').trim();
        const path      = buildPath(SLOT_MARKER, parentPath);
        const node      = makeNode({
          key: SLOT_MARKER, label: slotLabel, type: 'slot',
          path, parentId: parentNode?.id ?? null,
          depth: depthOffset, sortOrder: getSortOrder(parentPath),
        });
        if (itemDescription) node.description = itemDescription;
        nodes[node.id] = node;
        lastNodeId = node.id;
        attachToParent(node, parentNode);
        continue;
      }

      // Validate key: Label format
      const parsed = parseListItem(rawText);
      if (!parsed) { invalidItems.push(rawText); continue; }

      const { key, label: itemLabel } = parsed;
      const path     = buildPath(key, parentPath);
      const nodeType = hasChildren ? 'branch' : 'leaf';
      const node     = makeNode({
        key, label: itemLabel, type: nodeType,
        path, parentId: parentNode?.id ?? null,
        depth: depthOffset, sortOrder: getSortOrder(parentPath),
      });
      if (itemDescription) node.description = itemDescription;
      nodes[node.id] = node;
      lastNodeId = node.id;
      attachToParent(node, parentNode);

      // Recurse into children
      if (hasChildren) {
        processItems(nestedList.items, node, path, depthOffset + 1);
      }
    }
  }

  // ── Top-level token walk ─────────────────────────────────────────────────
  for (const token of lexer(content)) {

    if (token.type === 'heading') {
      const mdDepth = token.depth;
      const headLabel = tokenText(token);
      const key = slugify(headLabel);

      while (headingStack.length && headingStack[headingStack.length - 1].depth >= mdDepth) {
        headingStack.pop();
      }

      const parent    = currentHeadingParent();
      const path      = buildPath(key, null);
      const nodeDepth = headingStack.length;
      const node      = makeNode({
        key, label: headLabel, type: 'branch',
        path, parentId: parent?.id ?? null,
        depth: nodeDepth, sortOrder: getSortOrder(parent?.path ?? null),
      });

      nodes[node.id] = node;
      lastNodeId = node.id;
      attachToParent(node, parent ? nodes[parent.id] : null);
      headingStack.push({ key, id: node.id, depth: mdDepth, path });
    }

    else if (token.type === 'list') {
      const parent     = currentHeadingParent();
      const parentPath = parent?.path ?? null;
      processItems(token.items, parent ? nodes[parent.id] : null, parentPath, headingStack.length);
    }

    else if (token.type === 'blockquote') {
      if (lastNodeId && nodes[lastNodeId]) {
        nodes[lastNodeId].description = token.text?.trim() || null;
      }
    }
  }

  // ── Promote childless branch headings to leaf ───────────────────────────
  for (const node of Object.values(nodes)) {
    if (node.type === 'branch' && node.children.length === 0) node.type = 'leaf';
  }

  // ── Resolve controller_labels onto nodes ─────────────────────────────────
  for (const [controllerId, overrides] of Object.entries(controllerLabels)) {
    for (const [nodePath, overrideLabel] of Object.entries(overrides)) {
      const nodeId = `${versionId}/${nodePath}`;
      if (nodes[nodeId]) nodes[nodeId].controller_labels[controllerId] = overrideLabel;
    }
  }

  return {
    version: {
      id: versionId, device_type: deviceType, version, label,
      is_controller: isController,
      max_devices: isController ? (maxDevices ?? null) : null,
      compatible_controllers: isController ? [] : compatControllers,
      source_file: sourceFile,
      root_nodes: rootNodes,
      _raw_controller_labels: controllerLabels,
    },
    nodes,
    warnings: { invalidListItems: invalidItems },
  };
}

module.exports = { parseFile, SCHEMA_VERSION };
