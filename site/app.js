/**
 * app.js — entry point
 *
 * Boots the app: loads catalog, wires session → renderer, starts.
 */

import { store } from './store.js';
import { session } from './session.js';
import { render } from './renderer.js';

const appEl = document.getElementById('app');

async function boot() {
  try {
    await store.load();
  } catch (err) {
    appEl.innerHTML = `
      <div class="boot-error">
        <span class="error-icon">⚠</span>
        <p class="error-title">Failed to load catalog</p>
        <p class="error-detail">${err.message}</p>
      </div>
    `;
    return;
  }

  // Re-render on every session change
  window.addEventListener('session:change', () => render(appEl));

  // Initial render
  render(appEl);
}

boot();
