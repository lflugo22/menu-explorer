'use strict';

const matter = require('gray-matter');
const { lexer } = require('marked');

const SLOT_MARKER = 'slot';
const SCHEMA_VERSION = '1';

/**
 * Slugify a heading string into a valid key.
 * e.g. "pH Calibration" → "ph_calibration"
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Parse a list item's raw text into { key, label }.
 * Accepts "key: Label text" format.
 * Returns null if the format is not matched.
 */
function parseListItem(text) {
  const match = text.match(/^([a-z0-9_]+):\s+(.+)$/i);
  if (!match) return null;
  return { key: match[1].trim(), label: match[2].trim() };
}

/**
 * Extract plain text from a marked token (handles inline tokens).
 */
function tokenText(token) {
  if (token.text) return token.text.trim();
  if (token.tokens) return token.tokens.map(t => t.text || '').join('').trim();
  return '';
}

/**
 * Parse a single markdown file.
 *
 * Returns:
 * {
 *   version:  { id, device_type, version, label, is_controller, max_devices,
 *               compatible_controllers, controller_labels, source_file, root_nodes }
 *   nodes:    { [node_id]: NodeRecord }
 * }
 */
function parseFile(filePath, fileContent) {
  const { data: frontmatter, content } = matter(fileContent);
  const sourceFile = filePath.split('/').pop();

  // ── Frontmatter extraction ──────────────────────────────────────────────
  const deviceType       = frontmatter.device_type;
  const version          = String(frontmatter.version ?? '');
  const label            = frontmatter.label ?? '';
  const isController     = frontmatter.is_controller === true;
  const maxDevices       = frontmatter.max_devices ?? null;
  const compatControllers = frontmatter.compatible_controllers ?? [];
  const controllerLabels = frontmatter.controller_labels ?? {};

  const versionId = `${deviceType}@${version}`;

  // ── Lex the markdown body ───────────────────────────────────────────────
  const tokens = lexer(content);

  // ── State for the walk ──────────────────────────────────────────────────
  const nodes = {};          // flat map: node_id → node record
  const rootNodes = [];      // ordered top-level node ids
  const headingStack = [];   // stack of { key, id, depth } for open branches

  let sortCounters = {};     // path → running sort_order counter
  let lastTokenId = null;    // id of the last heading or leaf, for blockquote attachment

  function getSortOrder(parentPath) {
    const k = parentPath || '__root__';
    sortCounters[k] = (sortCounters[k] ?? -1) + 1;
    return sortCounters[k];
  }

  function currentParent() {
    return headingStack.length ? headingStack[headingStack.length - 1] : null;
  }

  function buildPath(key) {
    const ancestor = headingStack.map(h => h.key).join('.');
    return ancestor ? `${ancestor}.${key}` : key;
  }

  function makeNode({ key, label, type, path, parentId, depth, sortOrder }) {
    const id = `${versionId}/${path}`;
    return {
      id,
      version_id: versionId,
      path,
      key,
      label,
      description: null,          // filled in when a blockquote follows
      type,                       // 'branch' | 'leaf' | 'slot'
      depth,
      parent_id: parentId,
      children: [],               // branch: child ids; leaf/slot: []
      sort_order: sortOrder,
      controller_labels: {},      // resolved from frontmatter at emit time
    };
  }

  // ── Token walk ──────────────────────────────────────────────────────────
  for (const token of tokens) {

    // ── Heading → candidate branch ────────────────────────────────────────
    if (token.type === 'heading') {
      const depth = token.depth; // 2 = L0 top-level, 3 = L1, etc.
      const headingLabel = tokenText(token);
      const key = slugify(headingLabel);

      // Pop BEFORE building path so siblings don't nest into each other.
      // e.g. H3 "Temperature" following H3 "pH" should pop "ph" first.
      while (headingStack.length && headingStack[headingStack.length - 1].depth >= depth) {
        headingStack.pop();
      }

      const parent = currentParent();
      const path = buildPath(key);        // built after pop — correct parent context
      const nodeDepth = headingStack.length; // 0-indexed from root
      const sortOrder = getSortOrder(parent?.path ?? null);

      const node = makeNode({
        key, label: headingLabel, type: 'branch',
        path, parentId: parent?.id ?? null,
        depth: nodeDepth, sortOrder,
      });

      nodes[node.id] = node;
      lastTokenId = node.id;

      if (parent) {
        nodes[parent.id].children.push(node.id);
      } else {
        rootNodes.push(node.id);
      }

      headingStack.push({ key, id: node.id, depth, path }); // depth = markdown heading level (2,3,4…)
    }

    // ── List → leaves (or slot node) ─────────────────────────────────────
    else if (token.type === 'list') {
      const parent = currentParent();
      const parentPath = parent?.path ?? null;

      for (const item of token.items) {
        // Extract the item's first text line and any nested blockquote
        let rawText = '';
        let itemDescription = null;

        for (const subToken of item.tokens ?? []) {
          if (subToken.type === 'text' && !rawText) {
            rawText = subToken.text.trim();
          }
          if (subToken.type === 'blockquote') {
            itemDescription = subToken.text?.trim() ?? null;
          }
          // Handle nested paragraph within blockquote tokens
          if (subToken.type === 'paragraph') {
            rawText = rawText || subToken.text.trim();
          }
        }

        // Slot node
        if (rawText.startsWith(`${SLOT_MARKER}:`)) {
          const slotLabel = rawText.replace(`${SLOT_MARKER}:`, '').trim();
          const path = buildPath(SLOT_MARKER);
          const nodeDepth = headingStack.length;
          const sortOrder = getSortOrder(parentPath);

          const node = makeNode({
            key: SLOT_MARKER,
            label: slotLabel,
            type: 'slot',
            path,
            parentId: parent?.id ?? null,
            depth: nodeDepth,
            sortOrder,
          });
          if (itemDescription) node.description = itemDescription;

          nodes[node.id] = node;
          lastTokenId = node.id;

          if (parent) {
            nodes[parent.id].children.push(node.id);
          } else {
            rootNodes.push(node.id);
          }
          continue;
        }

        // Regular leaf
        const parsed = parseListItem(rawText);
        if (!parsed) {
          // Not valid key: label format — emitted as a parse warning, handled by validator
          nodes[`__invalid__${rawText}`] = { __invalid__: true, raw: rawText, parent_id: parent?.id };
          continue;
        }

        const { key, label: leafLabel } = parsed;
        const path = buildPath(key);
        const nodeDepth = headingStack.length;
        const sortOrder = getSortOrder(parentPath);

        const node = makeNode({
          key, label: leafLabel, type: 'leaf',
          path, parentId: parent?.id ?? null,
          depth: nodeDepth, sortOrder,
        });
        if (itemDescription) node.description = itemDescription;

        nodes[node.id] = node;
        lastTokenId = node.id;

        if (parent) {
          nodes[parent.id].children.push(node.id);
        } else {
          rootNodes.push(node.id);
        }
      }
    }

    // ── Blockquote → description for preceding node ───────────────────────
    else if (token.type === 'blockquote') {
      if (lastTokenId && nodes[lastTokenId]) {
        const text = token.text?.trim() ?? '';
        nodes[lastTokenId].description = text || null;
      }
    }
  }

  // ── Promote empty-children headings to leaf ───────────────────────────
  for (const node of Object.values(nodes)) {
    if (node.__invalid__) continue;
    if (node.type === 'branch' && node.children.length === 0) {
      node.type = 'leaf';
    }
  }

  // ── Resolve controller_labels from frontmatter onto each node ─────────
  for (const [controllerId, overrides] of Object.entries(controllerLabels)) {
    for (const [nodePath, overrideLabel] of Object.entries(overrides)) {
      const nodeId = `${versionId}/${nodePath}`;
      if (nodes[nodeId]) {
        nodes[nodeId].controller_labels[controllerId] = overrideLabel;
      }
    }
  }

  // ── Strip internal invalid markers ────────────────────────────────────
  const invalidNodes = Object.entries(nodes)
    .filter(([, n]) => n.__invalid__)
    .map(([, n]) => n.raw);

  for (const key of Object.keys(nodes)) {
    if (nodes[key].__invalid__) delete nodes[key];
  }

  // ── Build version record ───────────────────────────────────────────────
  const versionRecord = {
    id: versionId,
    device_type: deviceType,
    version,
    label,
    is_controller: isController,
    max_devices: isController ? (maxDevices ?? null) : null,
    compatible_controllers: isController ? [] : compatControllers,
    source_file: sourceFile,
    root_nodes: rootNodes,
    _raw_controller_labels: controllerLabels, // used by validator, stripped at emit
  };

  return {
    version: versionRecord,
    nodes,
    warnings: {
      invalidListItems: invalidNodes,
    },
  };
}

module.exports = { parseFile, SCHEMA_VERSION };
