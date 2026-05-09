# Menu Explorer

Menu Explorer is a web-based Single Page Application (SPA) for browsing the menu structure and configuration option of SC device controllers, paired with a Node.js build pipeline that compiles markdown documentation into a structured catalog.

The application displays hierarchical device menus, allowing users to explore settings, programming options, and sensor configurations across multiple controller models.

## Features

### Build Pipeline (`pipeline/`)
- Parses structured markdown files with YAML frontmatter from `content/controllers/` and `content/devices/`
- Validates device and controller configurations per-file and across the entire catalog
- Generates a unified `site/catalog.json` with normalized schema
- Supports multiple controller versions and device types
- Single command build with detailed error reporting

### Menu Explorer SPA (`site/`)
- Interactive browser-based interface for navigating device menus
- Controller picker with model information and slot capacity overview
- Hierarchical menu tree with expand/collapse functionality
- Device slot management (add/remove devices to controller sensor ports)
- Sidebar navigation showing current controller and assigned devices
- Responsive design with dark theme optimized for technical documentation

## Project Structure

```
menu-explorer/
├── content/
│   ├── controllers/   # Markdown files for controller menu documentation
│   └── devices/       # Markdown files for endpoint device documentation
├── pipeline/          # Node.js build pipeline (compiles catalog.json)
├── site/              # SPA (HTML + JS, reads generated catalog.json)
└── catalog.json       # Generated output (used by the SPA)
```

## Installation

### Build Dependencies
```bash
cd pipeline
npm install
```

### Running the Application
The SPA is static and can be served with any HTTP server from the `site/` directory:

```bash
# From the repo root, serve the SPA locally:
cd site && python3 -m http.server 8000

# Or use any static file server of your choice
```

## Usage

### Build the Catalog
From the `pipeline/` directory, run:

```bash
npm run build
```

This reads all markdown files from `content/controllers/` and `content/devices/`, performs validation, and writes `site/catalog.json`. On success, a summary of controllers, device types, versions, and nodes is printed. On validation failure, the build aborts with detailed error output.

### Use the Menu Explorer SPA
After building (or if `catalog.json` already exists), serve the `site/` directory with any static HTTP server. Open the application in a browser to:

- Select a controller model from the picker screen
- View the controller's sensor slots and assigned devices
- Navigate the hierarchical menu tree (branches expand to reveal sub-menus and leaf items)
- Add or remove devices from available sensor ports
- Browse configuration and programming options documented in the source markdown

The SPA reads `catalog.json` at runtime and requires no build step.

## License

ISC