# RV Level Lovelace Card

Custom Lovelace card for Home Assistant to visualize RV leveling/orientation data with two display modes:
- `rv_top`: RV leveling top-view with corner raise guidance
- `round_compass`: circular level target + rotating compass ring

## Preview

| Round Compass | RV Top |
|---|---|
| ![RV Level round compass preview](assets/rv_compass_example.png) | ![RV Level rv_top preview](assets/rv_top_example.png) |

The card is sensor-source agnostic: it works with any Home Assistant entities that provide compatible numeric values for pitch/roll/yaw/temperature/battery.

## Status

Current release line: `0.3.x` with dual visualization modes and full editor-based configuration.

## Features

- Two display modes:
  - `rv_top` (dynamic inline SVG motorhome top-view with wheel-level indicators and embedded mini-compass)
  - `round_compass` (circular level target + rotating compass ring)
- Frontend configuration via Lovelace card editor (no mandatory YAML mapping)
- Configurable entities:
  - pitch
  - roll
  - yaw
  - magnetometer X/Y/Z (optional, for magnetic compass heading)
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
  - optional AngleX/AngleY/AngleZ panel visibility (`show_angle_panel`)
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

## Leveling values interpretation (important)

The card shows two different value types:

- **Angle values** (`AngleX`, `AngleY`, optional `AngleZ`)
  - `AngleX` = **roll** (left/right tilt, Seitenneigung)
  - `AngleY` = **pitch** (front/back tilt, Längsneigung)
  - `AngleZ` = **yaw** (compass heading)
  - These can be **positive or negative**.
  - The sign depends on sensor orientation and your mapping options (`swap_axes`, `invert_pitch`, `invert_roll`, `invert_yaw`).
- **Leveling points** (`FL`, `FR`, `RL`, `RR` in cm)
  - These values are **always >= 0** in the card (no negative cm values).
  - Meaning: **how high** each corner is above the lowest reference point (in cm).

Color logic for leveling points:

- **Green**: point is within tolerance (`level_tolerance_cm`) — this is the lowest corner (reference / ground contact)
- **Red**: point is above tolerance — shows how much higher this corner is than the reference

Important behavior notes:

- A **red point with a positive value** means this corner is that much higher than the lowest corner.
- Leveling points intentionally have **no negative values** (the card shows height above the reference point).
- The green corner is where you are closest to the ground — place leveling blocks/ramps under the opposite side to level the vehicle.

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

## Magnetic compass heading (magnetometer)

The card supports computing a **tilt-compensated magnetic heading** from magnetometer data. This replaces the gyro-based yaw (which is only relative and drifts over time) with an absolute compass direction.

### Setup

1. **Enable magnetometer entities in Home Assistant.**
   The WIT-901 WiFi integration provides `mag_x`, `mag_y`, `mag_z` entities, but they are **disabled by default**. You must manually enable them:
   - Go to **Settings → Devices & Services → WIT-901 device → Entities**
   - Find the three magnetometer entities (Magnetometer X/Y/Z) and enable each one
   - Wait for HA to start reporting values
2. **Configure in card editor.**
   Enter the three magnetometer entity IDs in the card editor fields "Magnetometer X", "Magnetometer Y", "Magnetometer Z".
3. **Verify heading.**
   The compass ring should now show the correct magnetic heading. Use `yaw_offset_deg` for fine-tuning (e.g. local magnetic declination or mounting offset).

### How it works

- When all three magnetometer entities are configured and reporting valid values, the card computes a **tilt-compensated magnetic heading** using pitch/roll from the sensor frame (before any orientation transforms).
- The heading formula assumes the **WIT-901 default mounting** with **X=forward, Y=left, Z=up**.
- When the magnetic heading is active, `AngleZ` in the angle panel shows the same heading value (not the gyro yaw), so compass ring and AngleZ stay in sync.
- If magnetometer entities are not configured or report invalid/unavailable values, the card **falls back to the gyro-based yaw entity** automatically.

### Important notes

- **Magnetic heading is affected by interference.** Strong magnetic fields from speakers, inverters, transformers, or high-current cables near the sensor will distort the heading. Keep distance from these sources (see "Sensor placement & orientation" above).
- **Use `yaw_offset_deg` for fine correction.** This offset applies to both magnetometer and gyro heading sources.
- **The magnetometer vector norm must be ≥ 1 µT.** If the sensor is shielded or uncalibrated (near-zero field), the card rejects the reading and falls back to gyro yaw.
- **Orientation options `swap_axes`, `invert_pitch`, `invert_roll` do NOT affect the heading calculation.** These options only correct the leveling display. The heading formula uses raw sensor-frame pitch/roll because magnetometer data is also in sensor frame. To correct the heading output, use `invert_yaw` and `yaw_offset_deg`.

## Installation (HACS)

1. Open `HACS`.
2. Open menu (top-right, 3 dots) -> `Custom repositories`.
3. Add repository URL:
   - `https://github.com/othorg/rv-level-ha-lovelace-card`
4. Category: `Dashboard`.
5. Install **RV Level Lovelace Card**.
6. Reload browser tab (or restart Home Assistant frontend once).
7. Add card in dashboard.

## Manual resource (optional)

If needed, add manually:

- URL: `/hacsfiles/rv-level-ha-lovelace-card/rv-ha-lovelace-card.js`
- Type: `module`

## Card type

`custom:rv-ha-lovelace-card`

## Example YAML (optional)

```yaml
type: custom:rv-ha-lovelace-card
title: Flair 920 - Level
entities:
  pitch: sensor.easylevelrv_neigung_x
  roll: sensor.easylevelrv_neigung_y
  yaw: sensor.wit_wt5500008241_gier
  mag_x: sensor.wit_wt5500008241_magnetometer_x
  mag_y: sensor.wit_wt5500008241_magnetometer_y
  mag_z: sensor.wit_wt5500008241_magnetometer_z
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
`package.json` and `dist/rv-ha-lovelace-card.js` (`CARD_VERSION`).
2. Commit and push to `main`.
3. Create and push a new semver tag:
`git tag -a vX.Y.Z -m "Release vX.Y.Z" && git push origin vX.Y.Z`
4. GitHub Actions creates a GitHub Release automatically from the tag.

## Assets

- Preview images: `assets/rv_compass_example.png`, `assets/rv_top_example.png`
- Icon: `assets/rv-level-icon.svg`
- Branding PNGs: `brand/rv-level-icon*.png`, `brand/rv-level-logo*.png`, `brand/rv-level-logo-dark*.png`

Mirrored files for HACS resource use are available in `dist/`.
