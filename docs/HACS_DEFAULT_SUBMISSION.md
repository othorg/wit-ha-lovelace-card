## HACS Default Submission (Plugin)

Repository: `othorg/rv-level-ha-lovelace-card`
Category: `plugin`

### 1. Preconditions

- `hacs.json` exists in repo root.
- Dashboard file is in `dist/` and matches `hacs.json.filename`.
- CI passes:
  - Node tests
  - `hacs/action` (`category: plugin`)
- At least one tagged release exists (`vX.Y.Z`).

### 2. Manual GitHub setup (required)

- Set repository description.
- Add topics:
  - `hacs`
  - `home-assistant`
  - `lovelace`
  - `home-assistant-dashboard`

### 3. Add to HACS default list

1. Fork `https://github.com/hacs/default`
2. Edit file `plugin` in your fork.
3. Add line:

```text
othorg/rv-level-ha-lovelace-card
```

4. Keep alphabetical order.
5. Open PR against `hacs/default`.

### 4. Suggested PR notes

- Plugin type: Lovelace card (`RV Level Lovelace Card`)
- HACS validation and CI are green.
- Active release/tagging workflow is in place.
