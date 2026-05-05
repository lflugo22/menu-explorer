'use strict';

/**
 * Validator module.
 *
 * Two phases:
 *   1. validateFile()   — validates a single parsed result in isolation
 *   2. validateCatalog() — cross-file checks across all parsed results
 *
 * Both return { errors: string[], warnings: string[] }
 */

// ── Single-file validation ───────────────────────────────────────────────────

function validateFile(parsed, filePath) {
  const errors = [];
  const warnings = [];
  const { version, nodes, warnings: parseWarnings } = parsed;
  const ctx = filePath;

  // Required frontmatter fields
  if (!version.device_type) errors.push(`[${ctx}] Missing required frontmatter field: device_type`);
  if (!version.version)     errors.push(`[${ctx}] Missing required frontmatter field: version`);
  if (!version.label)       errors.push(`[${ctx}] Missing required frontmatter field: label`);

  if (version.is_controller) {
    // Controller-specific rules
    if (version.max_devices == null) {
      errors.push(`[${ctx}] is_controller is true but max_devices is missing`);
    }
    if (version.compatible_controllers?.length) {
      errors.push(`[${ctx}] compatible_controllers must not be set on a controller file`);
    }

    // Exactly one slot node allowed
    const slotNodes = Object.values(nodes).filter(n => n.type === 'slot');
    if (slotNodes.length === 0) {
      warnings.push(`[${ctx}] Controller has no slot node — connected devices will not be navigable`);
    }
    if (slotNodes.length > 1) {
      errors.push(`[${ctx}] Controller defines more than one slot node (found ${slotNodes.length})`);
    }
  } else {
    // Device-specific rules
    const slotNodes = Object.values(nodes).filter(n => n.type === 'slot');
    if (slotNodes.length > 0) {
      errors.push(`[${ctx}] slot node found in non-controller file`);
    }
    if (version.compatible_controllers.length === 0) {
      warnings.push(`[${ctx}] No compatible_controllers declared — device will not appear in any controller picker`);
    }
  }

  // controller_labels path references — warn if a label path doesn't match any node
  if (!version.is_controller) {
    const frontmatter = version._raw_controller_labels ?? {};
    // Note: overrides are already baked into nodes; detect misses by checking
    // if a declared override path produced no matching node in this version
    for (const [controllerId, overrides] of Object.entries(frontmatter)) {
      for (const nodePath of Object.keys(overrides)) {
        const nodeId = `${version.id}/${nodePath}`;
        if (!nodes[nodeId]) {
          warnings.push(`[${ctx}] controller_labels path "${nodePath}" for controller "${controllerId}" does not match any node — override will be ignored`);
        }
      }
    }
  }
  const paths = Object.values(nodes).map(n => n.path);
  const seen = new Set();
  for (const path of paths) {
    if (seen.has(path)) {
      errors.push(`[${ctx}] Duplicate node path within version: "${path}"`);
    }
    seen.add(path);
  }

  // Invalid list items from parser
  for (const raw of parseWarnings?.invalidListItems ?? []) {
    errors.push(`[${ctx}] List item not in "key: Label" format: "${raw}"`);
  }

  return { errors, warnings };
}

// ── Cross-file catalog validation ────────────────────────────────────────────

function validateCatalog(allParsed) {
  const errors = [];
  const warnings = [];

  const versionIds = new Set();
  const controllerIds = new Set();

  // Collect controller ids first
  for (const { version } of allParsed) {
    if (version.is_controller) {
      controllerIds.add(version.device_type);
    }
  }

  for (const { version, filePath } of allParsed) {
    const ctx = filePath;

    // Duplicate version ids across files
    if (versionIds.has(version.id)) {
      errors.push(`[${ctx}] Duplicate version id "${version.id}" — device_type + version must be unique across all files`);
    }
    versionIds.add(version.id);

    // compatible_controllers references unknown controller
    for (const ctrlId of version.compatible_controllers ?? []) {
      if (!controllerIds.has(ctrlId)) {
        warnings.push(`[${ctx}] compatible_controllers references unknown controller "${ctrlId}" — label overrides for this controller will be unused`);
      }
    }

    // controller_labels references controller not in compatible_controllers
    // (already partially covered above, but check the label keys too)
    // Note: controller_labels are baked into nodes at parse time; this is a
    // belt-and-braces check on the version record itself if needed in future.
  }

  return { errors, warnings };
}

module.exports = { validateFile, validateCatalog };
