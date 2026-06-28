# SC Device Markdown Extractor Prompt

Copy everything below the horizontal rule and paste it into Claude.ai,
then attach the device or controller manual PDF.

---

## How to use

1. Copy the prompt text below
2. Open Claude.ai and start a new conversation
3. Paste the prompt
4. Attach the PDF manual
5. Send

Claude will produce one markdown file per device type / version it finds.
Each file is ready to drop into `content/devices/` or `content/controllers/`.

---

## The prompt

````
I'm going to give you a device or controller manual PDF. Your job is to extract
the menu structure and produce one or more markdown files that conform exactly
to the schema described below.

---

### Output schema

Each file represents one device type at one firmware/software version.
The file has two parts: a YAML frontmatter block and a markdown body.

**Frontmatter block** (between --- delimiters):

For a regular device:
```yaml
---
device_type: <slug>          # lowercase, underscores only, e.g. sc200
version: "<version string>"  # quoted, e.g. "3.2" or "2.1.0"
label: "<Display Name>"      # human-readable, e.g. "SC200 v3.2"
compatible_controllers:
  - <controller_slug>        # list of controller ids this device connects to
controller_labels:           # OPTIONAL — only include if the manual shows
  <controller_id>:           # different label text for a specific controller
    <node.path>: "Override label"
---
```

For a controller:
```yaml
---
device_type: <slug>
version: "<version string>"
label: "<Display Name>"
is_controller: true
max_devices: <number>        # maximum devices this controller supports
---
```

**Markdown body** rules:

- H1 headings ('#') = 'Menu' 
- H2 headings (`##`) = top-level menu sections
- **Beyond H2 — use nested list items instead of headings:**
  A list item that has indented children beneath it becomes a BRANCH node.
  A list item with no children is a LEAF node. Nesting can go arbitrarily deep.
  ```markdown
  - gateway: Default Gateway
    - primary: Primary Gateway
      > Primary route for outbound traffic.
      - metric: Metric
        - weight: Weight
  ```
- Headings are BRANCH nodes. A heading with no children becomes a LEAF automatically — do not force a list item for it
- List items in `key: Label` format = settings (LEAF or BRANCH nodes)
  - `key` must be: lowercase, no spaces, underscores allowed, unique within the version
  - `Label` is the display text shown in the menu
- A blockquote `>` immediately after a heading or list item = description for that node
- For controllers only: use `- slot: Device {{slot_index}}` to mark where connected devices appear in the menu

**Node path** is the dot-separated chain of keys from root to node.
You do not write paths explicitly — they are derived from the key hierarchy.
But you MUST use consistent keys so paths are predictable.
Example: heading `## Measurement` → key `measurement`, heading `### pH` → key `ph`, list item `- slope: Slope` → path is `measurement.ph.slope`.

**Controller label overrides**: if the manual shows that a menu item
has a different name when used with a specific controller, add it to
`controller_labels` using the full dot-path as the key.

---

### Extraction instructions

**Step 1 — Identify what you are looking at**

First, read the document and tell me:
- Device name and model number
- Firmware or software version (check the title page, footer, or version table)
- Whether this is a controller or a sensor/device
- If a controller: maximum number of connected devices it supports
- Page range where the menu structure appears (often a chapter called "Menu overview", "Navigation", "Operating menu", or similar)

**Step 2 — Build the tree**

Work through the menu chapter systematically:
- Preserve the exact hierarchy shown — do not flatten or restructure
- Preserve the original label text as closely as possible, fixing only obvious OCR errors
- If a setting appears under multiple paths (e.g. accessible from two menus), include it in the primary location only
- If the manual shows a numbered menu tree diagram, use that as the structure source of truth
- If there is no clean tree diagram, reconstruct the hierarchy from the section headings and setting tables

**Step 3 — Assign keys**

For each node, derive a key:
- Slugify the label: lowercase, replace spaces and special characters with underscores, strip leading/trailing underscores
- If two sibling nodes would produce the same key, append a disambiguating suffix (e.g. `_1`, `_2`)
- Keep keys short but meaningful — `ph_slope` not `electrode_response_slope_value`

**Step 4 — Add descriptions**

For each leaf node (setting), add a one-sentence blockquote description if the manual provides one.
Do not invent descriptions — only include what the manual states.
For branch nodes, add a description only if the manual has a clear section introduction sentence.

**Step 5 — Produce the file(s)**

Output each file as a fenced code block labelled with the suggested filename.
Example:
```sc200-v3.2.md
[file contents here]
```

If the manual covers multiple firmware versions with different menu structures,
produce a separate file for each version.

If the manual covers a controller with its own menu plus connected device menus,
produce a separate file for the controller and a separate file for each device type.

---

### Quality checks — apply these before outputting

- [ ] Every list item is in `key: Label` format — no plain text list items
- [ ] No duplicate keys within the same version
- [ ] `device_type` and `version` frontmatter fields are present and non-empty
- [ ] `is_controller: true` and `max_devices` present if this is a controller
- [ ] `compatible_controllers` present (and non-empty) if this is a device
- [ ] Heading hierarchy is consistent — no skipped levels (H2 → H4 without H3)
- [ ] `slot` node present somewhere in the controller file's body
- [ ] No invented content — everything comes from the manual

---

### If something is unclear

If the manual is ambiguous about hierarchy, make the most reasonable choice
and flag it with a comment in the file using HTML comment syntax:
```
<!-- REVIEW: uncertain whether "Slope adjustment" belongs under pH or Calibration -->
```

If you cannot determine the firmware version, use `"latest"` and flag it.

If a section of the manual is clearly not part of the menu structure
(safety warnings, installation instructions, specifications), skip it.

---

Now please analyse the attached PDF and produce the markdown file(s).
````
