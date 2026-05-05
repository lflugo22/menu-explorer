/**
 * store.js — immutable catalog store
 *
 * Loads catalog.json once. Provides O(1) lookups by id.
 * No writes. No side effects.
 */

export const store = (() => {
  let _catalog = null;

  async function load() {
    const [catalogRes] = await Promise.all([
      fetch('./catalog.json'),
    ]);

    if (!catalogRes.ok) throw new Error(`Failed to load catalog.json: ${catalogRes.status}`);

    _catalog = await catalogRes.json();

    if (_catalog.meta.schema_version !== '1') {
      throw new Error(`Unsupported catalog schema version: ${_catalog.meta.schema_version}`);
    }

    return _catalog;
  }

  function assertLoaded() {
    if (!_catalog) throw new Error('Store not loaded — call store.load() first');
  }

  // ── Lookup helpers ──────────────────────────────────────────────────────

  function getControllers() {
    assertLoaded();
    return _catalog.controllers.map(id => _catalog.versions[id]);
  }

  function getVersion(versionId) {
    assertLoaded();
    return _catalog.versions[versionId] ?? null;
  }

  function getNode(nodeId) {
    assertLoaded();
    return _catalog.nodes[nodeId] ?? null;
  }

  function getChildren(nodeId) {
    assertLoaded();
    const node = _catalog.nodes[nodeId];
    if (!node) return [];
    return node.children.map(id => _catalog.nodes[id]).filter(Boolean);
  }

  /** Devices compatible with a given controller device_type id */
  function getCompatibleVersions(controllerDeviceType) {
    assertLoaded();
    return Object.values(_catalog.versions).filter(v =>
      !v.is_controller &&
      v.compatible_controllers.includes(controllerDeviceType)
    );
  }

  /**
   * Resolve display label for a node given the active controller device_type.
   * Falls back to node.label if no override exists.
   */
  function resolveLabel(nodeId, controllerDeviceType) {
    assertLoaded();
    const node = _catalog.nodes[nodeId];
    if (!node) return '';
    return node.controller_labels?.[controllerDeviceType] ?? node.label;
  }

  /**
   * Reconstruct breadcrumb trail for a node.
   * Returns array of { id, label } from root to node (inclusive).
   */
  function getBreadcrumb(nodeId, controllerDeviceType) {
    assertLoaded();
    const node = _catalog.nodes[nodeId];
    if (!node) return [];

    const segments = node.path.split('.');
    const versionId = node.version_id;
    const crumbs = [];

    let builtPath = '';
    for (const seg of segments) {
      builtPath = builtPath ? `${builtPath}.${seg}` : seg;
      const id = `${versionId}/${builtPath}`;
      const n = _catalog.nodes[id];
      if (n) crumbs.push({ id, label: resolveLabel(id, controllerDeviceType) });
    }

    return crumbs;
  }

  return { load, getControllers, getVersion, getNode, getChildren, getCompatibleVersions, resolveLabel, getBreadcrumb };
})();
