/**
 * session.js — mutable session state
 *
 * Tracks the active controller and connected device slots.
 * Ephemeral: resets on page refresh by design.
 *
 * Emits a 'session:change' CustomEvent on window after every mutation
 * so the renderer can react without polling.
 */

export const session = (() => {
  let _state = {
    controllerId: null,      // version_id of the active controller, e.g. "sc1000@2.0"
    slots: [],               // [{ slotIndex, deviceVersionId }] ordered by slotIndex
    activeNodeId: null,      // currently focused node id for the menu view
    activeSlotIndex: null,   // which slot's tree we're navigating (null = controller menu)
  };

  function emit() {
    window.dispatchEvent(new CustomEvent('session:change', { detail: snapshot() }));
  }

  function snapshot() {
    return structuredClone(_state);
  }

  // ── Controller ─────────────────────────────────────────────────────────

  function setController(versionId) {
    _state.controllerId = versionId;
    _state.slots = [];
    _state.activeNodeId = null;
    _state.activeSlotIndex = null;
    emit();
  }

  // ── Slots ───────────────────────────────────────────────────────────────

  function addDevice(deviceVersionId, maxDevices) {
    if (_state.slots.length >= maxDevices) return false;
    const nextIndex = _state.slots.length > 0
      ? Math.max(..._state.slots.map(s => s.slotIndex)) + 1
      : 1;
    _state.slots = [..._state.slots, { slotIndex: nextIndex, deviceVersionId }];
    emit();
    return true;
  }

  function removeDevice(slotIndex) {
    _state.slots = _state.slots.filter(s => s.slotIndex !== slotIndex);
    // Clear navigation if we were inside the removed slot
    if (_state.activeSlotIndex === slotIndex) {
      _state.activeNodeId = null;
      _state.activeSlotIndex = null;
    }
    emit();
  }

  function getSlots() {
    return [..._state.slots];
  }

  function getSlot(slotIndex) {
    return _state.slots.find(s => s.slotIndex === slotIndex) ?? null;
  }

  // ── Navigation ──────────────────────────────────────────────────────────

  /**
   * Navigate to a node.
   * slotIndex: null when navigating the controller's own menu.
   */
  function navigateTo(nodeId, slotIndex = null) {
    _state.activeNodeId = nodeId;
    _state.activeSlotIndex = slotIndex;
    emit();
  }

  function navigateUp(getNode) {
    if (!_state.activeNodeId) return;
    const node = getNode?.(_state.activeNodeId);
    if (!node) return;
    if (node.parent_id) {
      _state.activeNodeId = node.parent_id;
    } else {
      // At root of device tree — return to controller menu
      _state.activeNodeId = null;
      _state.activeSlotIndex = null;
    }
    emit();
  }

  function getState() {
    return snapshot();
  }

  return {
    setController,
    addDevice,
    removeDevice,
    getSlots,
    getSlot,
    navigateTo,
    navigateUp,
    getState,
  };
})();
