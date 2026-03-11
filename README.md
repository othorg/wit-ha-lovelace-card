# RV Level Lovelace Card

Custom Lovelace card for Home Assistant to visualize RV leveling/orientation data with two display modes:
- `rv_top`: RV leveling top-view with corner raise guidance
- `round_compass`: circular level target + rotating compass ring

The card is sensor-source agnostic: it works with any Home Assistant entities that provide compatible numeric values for pitch/roll/yaw/temperature/battery.

## Status

Current release line: `0.2.x` with dual visualization modes and full editor-based configuration.

## Features

- Two display modes:
  - `rv_top` (existing RV top visualization)
  - `round_compass` (new circular level + compass ring)
- Frontend configuration via Lovelace card editor (no mandatory YAML mapping)
- Configurable entities:
  - pitch
  - roll
  - yaw
  - temperature
  - battery SoC
- Configurable geometry:
  - wheelbase
  - front track
  - rear track
- Configurable display behavior:
  - max tilt range for center dot
  - level tolerance
  - round overlay scale and XY offsets (`round_overlay_scale`, `round_overlay_offset_x`, `round_overlay_offset_y`)
  - center bubble radius ratio (`dot_boundary_radius_ratio`)
  - round bubble radius ratio (`round_dot_boundary_radius_ratio`)
  - center dot size ratio (`dot_size_ratio`)
  - smoothing (`smooth_alpha`)
  - text size mode (`auto`, `small`, `medium`, `large`)
  - background + bubble/level/compass colors
  - optional compass ring visibility (`show_compass_ring`)
  - optional compass reliability hint
  - optional temperature/battery/corner labels
- Orientation correction options:
  - auto screen orientation mapping (portrait/landscape)
  - swap X/Y
  - invert pitch
  - invert roll
  - invert yaw
  - yaw offset
- Click on values opens Home Assistant more-info
- German/English UI (German for `de*`, English for all other locales)

## Sensor placement & orientation (vehicle)

For reliable leveling values, sensor placement matters more than card settings.

- Mounting position (recommended):
  - rigid, flat mounting surface
  - near the vehicle centerline
  - preferably close to the geometric center between front/rear axle (or at least not at an extreme corner)
- Axis alignment:
  - sensor X axis -> vehicle forward/backward
  - sensor Y axis -> vehicle left/right
  - sensor Z axis -> up/down
- Mounting quality:
  - avoid loose or flexible parts (furniture panels, thin covers)
  - avoid strong vibration/movement relative to chassis
  - keep distance from strong magnetic interference (large speakers, inverters, transformers, high-current cables)
- If perfect mounting is not possible:
  - use card orientation options (`swap_axes`, `invert_pitch`, `invert_roll`, `invert_yaw`)
  - use `yaw_offset_deg` for heading alignment
  - enable `auto_screen_mapping` for portrait/landscape dashboards

## Installation (HACS)

1. Open `HACS`.
2. Open menu (top-right, 3 dots) -> `Custom repositories`.
3. Add repository URL:
   - `https://github.com/othorg/wit-ha-lovelace-card`
4. Category: `Dashboard`.
5. Install **RV Level Lovelace Card**.
6. Reload browser tab (or restart Home Assistant frontend once).
7. Add card in dashboard.

## Manual resource (optional)

If needed, add manually:

- URL: `/hacsfiles/wit-ha-lovelace-card/wit-ha-lovelace-card.js`
- Type: `module`

## Card type

`custom:wit-ha-lovelace-card`

## Example YAML (optional)

```yaml
type: custom:wit-ha-lovelace-card
title: Flair 920 - Wasserwaage
entities:
  pitch: sensor.easylevelrv_neigung_x
  roll: sensor.easylevelrv_neigung_y
  yaw: sensor.wit_901_wifi_00008241_yaw
  temperature: sensor.easylevelrv_temperatur
  battery_soc: sensor.easylevelrv_batterie
geometry:
  wheelbase_mm: 2000
  track_front_mm: 1723
  track_rear_mm: 1661
display:
  mode: round_compass
  max_tilt_deg: 5
  level_tolerance_cm: 0.1
  round_overlay_scale: 1.0
  round_overlay_offset_x: 0
  round_overlay_offset_y: 0
  dot_boundary_radius_ratio: 0.112
  round_dot_boundary_radius_ratio: 0.44
  dot_size_ratio: 0.068
  smooth_alpha: 0.2
  background_color: "#9bc4d6"
  dot_color: "#ff2a1f"
  dot_border_color: "#2a211f"
  level_gradient_start: "#e8ff84"
  level_gradient_mid: "#d6ee65"
  level_gradient_end: "#c3de41"
  text_color: "#111111"
  ring_background_color: "#0a0d13"
  show_compass_status: true
  text_size_mode: auto
orientation:
  auto_screen_mapping: false
  swap_axes: false
  invert_pitch: false
  invert_roll: false
  invert_yaw: false
  yaw_offset_deg: 0
```

## Development

Run tests:

```bash
npm test
```

## Maintainer Release Flow

To publish updates so HACS can reliably detect new versions:

1. Update version in:
`package.json` and `dist/wit-ha-lovelace-card.js` (`CARD_VERSION`).
2. Commit and push to `main`.
3. Create and push a new semver tag:
`git tag -a vX.Y.Z -m "Release vX.Y.Z" && git push origin vX.Y.Z`
4. GitHub Actions creates a GitHub Release automatically from the tag.

## Assets

- Base image: `assets/rv_top_flair.png`
- Icon: `assets/wit-icon.svg`

Mirrored files for HACS resource use are available in `dist/`.
