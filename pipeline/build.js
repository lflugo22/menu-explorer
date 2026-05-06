#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const { parseFile }                    = require('./src/parser');
const { validateFile, validateCatalog } = require('./src/validator');
const { emit }                          = require('./src/emitter');

// ── Config ────────────────────────────────────────────────────────────────────
const CONTENT_DIRS = [
  path.resolve(__dirname, 'content/controllers'),
  path.resolve(__dirname, 'content/devices'),
];
const OUT_FILE = path.resolve(__dirname, 'dist/catalog.json');

// ── Helpers ───────────────────────────────────────────────────────────────────
function collectMarkdownFiles(dirs) {
  const files = [];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (name.endsWith('.md')) {
        files.push(path.join(dir, name));
      }
    }
  }
  return files;
}

function printResults(label, items, symbol) {
  if (!items.length) return;
  console.log(`\n${label}`);
  for (const item of items) console.log(`  ${symbol} ${item}`);
}

// ── Build pipeline ────────────────────────────────────────────────────────────
function build() {
  console.log('sc-catalog-builder\n' + '─'.repeat(40));

  const mdFiles = collectMarkdownFiles(CONTENT_DIRS);
  console.log(`Found ${mdFiles.length} markdown file(s):`);
  for (const f of mdFiles) console.log(`  · ${path.relative(__dirname, f)}`);

  const allParsed = [];
  const allErrors = [];
  const allWarnings = [];

  // ── Parse + single-file validate ──────────────────────────────────────────
  for (const filePath of mdFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = parseFile(filePath, content);
    const { errors, warnings } = validateFile(parsed, path.relative(__dirname, filePath));

    allParsed.push({ ...parsed, filePath });
    allErrors.push(...errors);
    allWarnings.push(...warnings);
  }

  // ── Cross-file validate ───────────────────────────────────────────────────
  const catalogValidation = validateCatalog(allParsed);
  allErrors.push(...catalogValidation.errors);
  allWarnings.push(...catalogValidation.warnings);

  // ── Report warnings ───────────────────────────────────────────────────────
  printResults('Warnings:', allWarnings, '⚠');

  // ── Abort on errors ───────────────────────────────────────────────────────
  if (allErrors.length) {
    printResults('Errors (build aborted):', allErrors, '✖');
    process.exit(1);
  }

  // ── Emit ──────────────────────────────────────────────────────────────────
  const catalog = emit(allParsed);

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(catalog, null, 2), 'utf8');

  // ── Summary ───────────────────────────────────────────────────────────────
  const nodeCount  = Object.keys(catalog.nodes).length;
  const versionCount = Object.keys(catalog.versions).length;
  const controllerCount = catalog.controllers.length;
  const deviceTypeCount = Object.keys(catalog.device_types).length;

  console.log('\n✔ Build successful');
  console.log(`  Controllers : ${controllerCount}`);
  console.log(`  Device types: ${deviceTypeCount}`);
  console.log(`  Versions    : ${versionCount}`);
  console.log(`  Nodes       : ${nodeCount}`);
  console.log(`  Output      : ${path.relative(__dirname, OUT_FILE)}`);
}

build();
