'use strict';

const { SCHEMA_VERSION } = require('../parser');

/**
 * Emitter module.
 *
 * Takes all validated parsed results and assembles the final catalog.json shape.
 *
 * catalog.json shape:
 * {
 *   meta: { built_at, schema_version }
 *   controllers: [version_id, ...]        ← index of controller version ids
 *   device_types: { [id]: { id, versions: [version_id, ...] } }
 *   versions: { [version_id]: VersionRecord }
 *   nodes: { [node_id]: NodeRecord }
 * }
 */
function emit(allParsed) {
  const builtAt = new Date().toISOString();

  const controllers = [];
  const deviceTypes = {};
  const versions = {};
  const nodes = {};

  for (const { version, nodes: fileNodes } of allParsed) {
    // ── Versions ──────────────────────────────────────────────────────────
    const { _raw_controller_labels, ...cleanVersion } = version;
    versions[version.id] = cleanVersion;

    // ── Controllers index ─────────────────────────────────────────────────
    if (version.is_controller) {
      controllers.push(version.id);
    }

    // ── Device types ──────────────────────────────────────────────────────
    if (!deviceTypes[version.device_type]) {
      deviceTypes[version.device_type] = {
        id: version.device_type,
        versions: [],
      };
    }
    deviceTypes[version.device_type].versions.push(version.id);

    // ── Nodes ─────────────────────────────────────────────────────────────
    Object.assign(nodes, fileNodes);
  }

  // Sort versions within each device type: newest first by semver-ish comparison
  for (const dt of Object.values(deviceTypes)) {
    dt.versions.sort((a, b) => {
      const va = versions[a].version;
      const vb = versions[b].version;
      return compareSemver(vb, va); // descending
    });
  }

  return {
    meta: {
      built_at: builtAt,
      schema_version: SCHEMA_VERSION,
    },
    controllers,
    device_types: deviceTypes,
    versions,
    nodes,
  };
}

/**
 * Simple semver-ish comparator.
 * Handles "3.2", "2.1.0", "10.0" etc.
 * Returns negative if a < b, 0 if equal, positive if a > b.
 */
function compareSemver(a, b) {
  const pa = String(a).split('.').map(Number);
  const pb = String(b).split('.').map(Number);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

module.exports = { emit };
