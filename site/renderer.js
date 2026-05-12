/**
 * renderer.js — menu renderer
 *
 * Turns catalog nodes + session state into DOM.
 * The only place where slot expansion happens.
 * Knows nothing about how data was produced.
 */

import { store } from './store.js';
import { session } from './session.js';

// ── Render entry point ──────────────────────────────────────────────────────

export function render(appEl) {
  const state = session.getState();

  if (!state.controllerId) {
    renderControllerPicker(appEl);
    return;
  }

  const controllerVersion = store.getVersion(state.controllerId);
  if (!controllerVersion) return;

  renderShell(appEl, controllerVersion, state);
}

// ── Controller picker ───────────────────────────────────────────────────────

function renderControllerPicker(appEl) {
  const controllers = store.getControllers();

  appEl.innerHTML = `
    <div class="picker-screen">
      <div class="picker-inner">
        <div class="picker-logo">
          <span class="logo-sc">Menu</span>
          <span class="logo-explorer">Explorer</span>
        </div>
        <p class="picker-sub">Select a controller to begin</p>
        <div class="picker-grid">
          ${controllers.map(c => `
            <button class="controller-card" data-version-id="${c.id}">
              <span class="card-model">${c.label}</span>
              <span class="card-slots">${c.max_devices} device slots</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  appEl.querySelectorAll('.controller-card').forEach(btn => {
    btn.addEventListener('click', () => {
      session.setController(btn.dataset.versionId);
    });
  });
}

// ── Main shell ──────────────────────────────────────────────────────────────

function renderShell(appEl, controllerVersion, state) {
  appEl.innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <span class="logo-sc">Menu</span>
            <span class="logo-explorer">Explorer</span>
          </div>
          <button class="btn-change-ctrl" id="changeController">Change</button>
        </div>

        <div class="ctrl-badge">
          <span class="ctrl-label">Controller</span>
          <span class="ctrl-name">${controllerVersion.label}</span>
        </div>

        <div class="slots-section">
          <div class="slots-header">
            <span class="slots-title">Connected Devices</span>
            <span class="slots-count">${state.slots.length} / ${controllerVersion.max_devices}</span>
          </div>
          <div class="slots-list" id="slotsList"></div>
          ${state.slots.length < controllerVersion.max_devices ? `
            <button class="btn-add-device" id="addDevice">+ Add Device</button>
          ` : ''}
        </div>
      </aside>

      <main class="main-panel">
        <div class="breadcrumb" id="breadcrumb"></div>
        <div class="menu-view" id="menuView"></div>
      </main>
    </div>

    <div class="device-picker-overlay hidden" id="devicePickerOverlay">
      <div class="device-picker-modal">
        <div class="modal-header">
          <span class="modal-title">Add Device</span>
          <button class="modal-close" id="closeDevicePicker">✕</button>
        </div>
        <div class="modal-body" id="devicePickerList"></div>
      </div>
    </div>
  `;

  // Wire up slots list
  renderSlotsList(appEl, controllerVersion, state);

  // Wire up menu view
  renderMenuView(appEl, controllerVersion, state);

  // Change controller
  appEl.querySelector('#changeController').addEventListener('click', () => {
    session.setController(null);
  });

  // Add device
  const addBtn = appEl.querySelector('#addDevice');
  if (addBtn) {
    addBtn.addEventListener('click', () => showDevicePicker(appEl, controllerVersion));
  }

  // Device picker overlay
  appEl.querySelector('#closeDevicePicker').addEventListener('click', () => {
    appEl.querySelector('#devicePickerOverlay').classList.add('hidden');
  });
}

// ── Slots sidebar ───────────────────────────────────────────────────────────

function renderSlotsList(appEl, controllerVersion, state) {
  const list = appEl.querySelector('#slotsList');
  if (!list) return;

  if (state.slots.length === 0) {
    list.innerHTML = `<p class="slots-empty">No devices connected</p>`;
    list.querySelector('.slots-empty')?.addEventListener('click', () => {
      showDevicePicker(appEl, controllerVersion);
    });
    return;
  }

  list.innerHTML = state.slots.map(slot => {
    const dv = store.getVersion(slot.deviceVersionId);
    const isActive = state.activeSlotIndex === slot.slotIndex;
    return `
      <div class="slot-item ${isActive ? 'slot-active' : ''}" data-slot="${slot.slotIndex}">
        <div class="slot-info">
          <span class="slot-index">Device ${slot.slotIndex}</span>
          <span class="slot-device">${dv?.label ?? slot.deviceVersionId}</span>
        </div>
        <button class="slot-remove" data-slot="${slot.slotIndex}" title="Remove device">✕</button>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.slot-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('slot-remove')) return;
      const slotIndex = parseInt(el.dataset.slot);
      const slot = session.getSlot(slotIndex);
      if (!slot) return;
      const dv = store.getVersion(slot.deviceVersionId);
      if (!dv?.root_nodes?.length) return;
      session.navigateTo(dv.root_nodes[0], slotIndex);
    });
  });

  list.querySelectorAll('.slot-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      session.removeDevice(parseInt(btn.dataset.slot));
    });
  });
}

// ── Menu view ───────────────────────────────────────────────────────────────

function renderMenuView(appEl, controllerVersion, state) {
  const menuEl = appEl.querySelector('#menuView');
  const breadcrumbEl = appEl.querySelector('#breadcrumb');
  if (!menuEl) return;

  const ctrlDeviceType = controllerVersion.device_type;

  // Determine which nodes to render
  let nodesToRender = [];
  let currentNodeId = state.activeNodeId;
  let contextSlot = state.activeSlotIndex !== null
    ? session.getSlot(state.activeSlotIndex) : null;

  if (!currentNodeId) {
    // Top level: controller root nodes
    nodesToRender = controllerVersion.root_nodes.map(id => store.getNode(id)).filter(Boolean);
    breadcrumbEl.innerHTML = `<span class="crumb crumb-root">${controllerVersion.label}</span>`;
  } else {
    const currentNode = store.getNode(currentNodeId);
    if (!currentNode) return;

    if (currentNode.type === 'branch' || currentNode.type === 'slot') {
      nodesToRender = store.getChildren(currentNodeId);
    }

    // Breadcrumb
    const crumbs = state.activeSlotIndex !== null
      ? buildSlotBreadcrumb(currentNodeId, contextSlot, controllerVersion)
      : store.getBreadcrumb(currentNodeId, ctrlDeviceType);

    const backCrumb = `<button class="crumb crumb-back" id="crumbBack">←</button>`;
    const ctrlCrumb = `<button class="crumb crumb-link" data-node-id="" data-slot="">
      ${controllerVersion.label}
    </button>`;

    const innerCrumbs = crumbs.map((c, i) =>
      i < crumbs.length - 1
        ? `<button class="crumb crumb-link" data-node-id="${c.id}" data-slot="${state.activeSlotIndex ?? ''}">${c.label}</button>`
        : `<span class="crumb crumb-current">${c.label}</span>`
    ).join('<span class="crumb-sep">›</span>');

    breadcrumbEl.innerHTML = backCrumb + ctrlCrumb +
      (crumbs.length ? `<span class="crumb-sep">›</span>` : '') + innerCrumbs;

    appEl.querySelector('#crumbBack')?.addEventListener('click', () => {
      const node = store.getNode(currentNodeId);
      if (!node) return;
      if (node.parent_id) {
        session.navigateTo(node.parent_id, state.activeSlotIndex);
      } else {
        // Back to controller root
        session.navigateTo(null, null);
      }
    });

    breadcrumbEl.querySelectorAll('.crumb-link').forEach(btn => {
      btn.addEventListener('click', () => {
        const nid = btn.dataset.nodeId || null;
        const sid = btn.dataset.slot ? parseInt(btn.dataset.slot) : null;
        session.navigateTo(nid, sid);
      });
    });
  }

  // Render node list
  if (nodesToRender.length === 0) {
    menuEl.innerHTML = `<div class="menu-empty">No items</div>`;
    return;
  }

  menuEl.innerHTML = `<ul class="menu-list">
    ${nodesToRender.map(node => renderNode(node, state, ctrlDeviceType)).join('')}
  </ul>`;

  // Wire up navigation clicks
  menuEl.querySelectorAll('.menu-item[data-node-id]').forEach(el => {
    el.addEventListener('click', () => {
      const nodeId = el.dataset.nodeId;
      const node = store.getNode(nodeId);
      if (!node) return;

      if (node.type === 'slot') {
        // Expand slot — navigate to that device's root
        const slotIndex = parseInt(el.dataset.slotIndex);
        const slot = session.getSlot(slotIndex);
        if (!slot) return;
        const dv = store.getVersion(slot.deviceVersionId);
        if (!dv?.root_nodes?.length) return;
        session.navigateTo(dv.root_nodes[0], slotIndex);
      } else if (node.type === 'branch') {
        session.navigateTo(nodeId, state.activeSlotIndex);
      }
      // leaf: no navigation
    });
  });

  // Wire up empty slot click to open device picker
  const emptySlotEl = menuEl.querySelector('#slotEmpty');
  if (emptySlotEl) {
    emptySlotEl.addEventListener('click', () => {
      showDevicePicker(appEl, controllerVersion);
    });
  }
}

// ── Node renderer ───────────────────────────────────────────────────────────

function renderNode(node, state, ctrlDeviceType) {
  if (node.type === 'slot') {
    return renderSlotNodes(node, state);
  }

  const label = store.resolveLabel(node.id, ctrlDeviceType);
  const isLeaf = node.type === 'leaf';
  const icon = isLeaf ? '◆' : '▶';
  const typeClass = isLeaf ? 'menu-item-leaf' : 'menu-item-branch';

  return `
    <li class="menu-item ${typeClass}" ${!isLeaf ? `data-node-id="${node.id}"` : ''}>
      <span class="menu-icon">${icon}</span>
      <span class="menu-item-content">
        <span class="menu-item-label">${label}</span>
        ${node.description ? `<span class="menu-item-desc">${node.description}</span>` : ''}
        ${isLeaf ? `<span class="menu-item-path">${node.path}</span>` : ''}
      </span>
      ${!isLeaf ? `<span class="menu-chevron">›</span>` : ''}
    </li>
  `;
}

function renderSlotNodes(slotNode, state) {
  const slots = session.getSlots();
  if (slots.length === 0) {
    return `
      <li class="menu-item menu-item-slot menu-item-slot-empty" id="slotEmpty">
        <span class="menu-icon">○</span>
        <span class="menu-item-content">
          <span class="menu-item-label">No devices connected</span>
          <span class="menu-item-desc">Add a device using the sidebar</span>
        </span>
      </li>
    `;
  }

  return slots.map(slot => {
    const dv = store.getVersion(slot.deviceVersionId);
    return `
      <li class="menu-item menu-item-branch menu-item-slot"
          data-node-id="${slotNode.id}"
          data-slot-index="${slot.slotIndex}">
        <span class="menu-icon">▶</span>
        <span class="menu-item-content">
          <span class="menu-item-label">Device ${slot.slotIndex}</span>
          <span class="menu-item-desc">${dv?.label ?? slot.deviceVersionId}</span>
        </span>
        <span class="menu-chevron">›</span>
      </li>
    `;
  }).join('');
}

// ── Device picker ───────────────────────────────────────────────────────────

function showDevicePicker(appEl, controllerVersion) {
  const overlay = appEl.querySelector('#devicePickerOverlay');
  const list = appEl.querySelector('#devicePickerList');
  const compatible = store.getCompatibleVersions(controllerVersion.device_type);

  const state = session.getState();
  const maxDevices = controllerVersion.max_devices;

  // Add search input to the modal
  list.innerHTML = `
    <input type="text" id="deviceSearch" placeholder="Search devices..." class="device-search-input">
    <div class="device-list-container" id="deviceListContainer">
      ${compatible.length === 0
        ? `<p class="picker-empty">No compatible devices found in catalog</p>`
        : compatible.map(dv => `
          <button class="device-option" data-version-id="${dv.id}">
            <span class="device-option-label">${dv.label}</span>
          </button>
        `).join('')
      }
    </div>
  `;

  const searchInput = list.querySelector('#deviceSearch');
  const deviceListContainer = list.querySelector('#deviceListContainer');

  // Filter devices as user types
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      // Show all devices when search is empty
      deviceListContainer.innerHTML = compatible.map(dv => `
        <button class="device-option" data-version-id="${dv.id}">
          <span class="device-option-label">${dv.label}</span>
          <span class="device-option-type">${dv.device_type}</span>
        </button>
      `).join('');
    } else {
      // Filter devices based on search term (partial match on label and device_type)
      const filteredDevices = compatible.filter(dv => 
        dv.label.toLowerCase().includes(searchTerm) || 
        dv.device_type.toLowerCase().includes(searchTerm)
      );
      
      deviceListContainer.innerHTML = filteredDevices.length === 0
        ? `<p class="picker-empty">No devices found</p>`
        : filteredDevices.map(dv => `
          <button class="device-option" data-version-id="${dv.id}">
            <span class="device-option-label">${dv.label}</span>
            <span class="device-option-type">${dv.device_type}</span>
          </button>
        `).join('');
    }

    // Reattach event listeners to the new buttons
    deviceListContainer.querySelectorAll('.device-option').forEach(btn => {
      btn.addEventListener('click', () => {
        session.addDevice(btn.dataset.versionId, maxDevices);
        overlay.classList.add('hidden');
      });
    });
  });

  // Initial population of device list (in case search is empty on open)
  if (compatible.length > 0) {
    deviceListContainer.querySelectorAll('.device-option').forEach(btn => {
      btn.addEventListener('click', () => {
        session.addDevice(btn.dataset.versionId, maxDevices);
        overlay.classList.add('hidden');
      });
    });
  }

  overlay.classList.remove('hidden');
  
  // Focus the search input when modal opens
  searchInput.focus();
}

// ── Breadcrumb helpers ──────────────────────────────────────────────────────

function buildSlotBreadcrumb(nodeId, slot, controllerVersion) {
  if (!slot) return store.getBreadcrumb(nodeId, controllerVersion.device_type);
  const dv = store.getVersion(slot.deviceVersionId);
  if (!dv) return [];

  const slotLabel = `Device ${slot.slotIndex}`;
  const nodeCrumbs = store.getBreadcrumb(nodeId, controllerVersion.device_type);

  return [{ id: `__slot__${slot.slotIndex}`, label: slotLabel }, ...nodeCrumbs];
}
