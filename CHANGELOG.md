# Changelog

All notable changes to this project are documented in this file and in GitHub Releases:

- https://github.com/othorg/rv-level-ha-lovelace-card/releases

## [Unreleased]

### Changed
- No changes yet.

## [0.4.9] - 2026-03-13

### Fixed
- `rv_top`: leveling marker/value alignment stabilized by reserving value line height even when no raise value is shown.
- This keeps green dots and red arrows on the same guide row across all four corners.


## [0.4.8] - 2026-03-13

### Fixed
- `rv_top` leveling guide placement refined:
  - vertical guide positions now use the real transformed WoMo outline bounds inside the SVG (instead of the outer SVG container)
  - top/bottom marker rows now use a stable 15% inset relative to the actual WoMo height
  - horizontal guide rows remain dynamically centered between the mini-compass ring and card side.

## [0.4.7] - 2026-03-13

### Changed
- `rv_top`: switched leveling point placement to dynamic geometry guides:
  - horizontal guides are now centered at 50% between the outer mini-compass ring and each card side
  - vertical guides are now derived from the RV SVG bounds using a `-15%` offset from the top and bottom edges
- `rv_top`: aligned the right-side angle value block to the same dynamic right guide line and vertically centered between top/bottom guide rows.

## [0.4.6] - 2026-03-12

### Changed
- `rv_top` pixel fine-tuning:
  - aligned all four leveling markers (`FL/FR/RL/RR`) to exact center coordinates
  - aligned marker symbols and values to the same vertical guide lines
  - centered the right-side angle value on the right guide line (not left-aligned)

## [0.4.5] - 2026-03-12

### Changed
- `rv_top`: removed `AngleX`/`AngleY` captions (numeric values remain visible).
- `rv_top`: aligned right-side angle value vertically between right leveling points (`FR`/`RR`).
- `rv_top`: refined angle block sizing/positioning to prevent clipping/overlap artifacts.

## [0.4.4] - 2026-03-12

### Changed
- Renamed orientation option label to `Roll-Invertierung` (without "deaktivieren").

## [0.4.3] - 2026-03-12

### Fixed
- Corrected `rv_top` X/Y angle block layout regression:
  - right-side angle block no longer clips at card edge
  - bottom angle block no longer overlaps with status/content
  - improved line-height and non-wrapping numeric angle text for stable rendering

## [0.4.2] - 2026-03-12

### Changed
- `rv_top` angle display mapping updated:
  - `AngleX` now shows `pitch`
  - `AngleY` now shows `roll`
- `rv_top` angle unit switched from `deg` to `°`.
- Repositioned `rv_top` angle blocks to avoid overlap with the RV SVG.
- Roll sign handling changed to match desired default behavior without requiring a checkbox:
  - roll is now inverted by default in leveling display
  - `invert_roll` option now acts as "disable roll inversion"

### Tests
- Updated existing `resolvePitchRoll` expectations for the new default roll inversion behavior.
- Added explicit test coverage for the new `invert_roll` toggle semantics.

## [0.4.1] - 2026-03-12

### Added
- New orientation option `sensor_forward_axis` (`x` or `y`) to support different physical sensor mounting directions.
- Editor dropdown for selecting the sensor forward axis.

### Changed
- Magnetometer heading calculation now applies the selected `sensor_forward_axis` preset.
- Sensor orientation badge (X/Y/Z SVG) now updates to match the selected forward-axis preset.
- README updated with mounting guidance for `sensor_forward_axis` and heading correction workflow.

### Tests
- Added coverage for `sensor_forward_axis` normalization and defaults.
- Added magnetometer heading tests for `x`-forward and `y`-forward presets.
- Added model-level and SVG rendering tests for axis preset behavior.

## [0.4.0] - 2026-03-12

### Added
- Optional magnetometer entity support for tilt-compensated heading:
  - `entities.mag_x`
  - `entities.mag_y`
  - `entities.mag_z`
- Editor fields and i18n labels for Magnetometer X/Y/Z.
- `computeMagHeading()` exposed in test API and covered by dedicated heading/fallback tests.

### Changed
- Model heading flow is now magnetometer-first with automatic gyro-yaw fallback.
- `AngleZ` remains consistent with the active heading source.
- Compass source indicator now shows `MAG` vs `GYRO` when no tilt warning is active.
- README expanded with setup and behavior notes for magnetic heading.
- YAML example entity IDs aligned with current `sensor.wit_wt5500008241_*` naming.

## [0.3.12] - 2026-03-12

### Fixed
- Removed both sign inversions in dot movement calculation (`rawDotNx`, `rawDotNy`) so the bubble now moves to the lower side, matching EasyLevel behavior.
  - `roll > 0` (left side high) -> dot moves right
  - `pitch < 0` (front low) -> dot moves up/front

## [0.3.11] - 2026-03-12

### Changed
- Refined axis semantics and documentation:
  - `AngleX` now explicitly displays roll (side tilt).
  - `AngleY` now explicitly displays pitch (front/back tilt).
- Updated orientation badge SVG to better match installation reference:
  - clear `FRONT` marker
  - axis labeling `Y` forward, `X` right, `Z+` up.
- Switched leveling corner calculation to direct per-corner mapping (`raise_corner = corner_height - min_height`) for clearer interpretation against reference hardware.
- README updated with explicit angle and corner value interpretation notes.

### Tests
- Updated `computeLeveling` expectations for direct corner mapping.
- Added explicit coverage for combined `auto_screen_mapping + swap_axes` behavior.

## [0.3.10] - 2026-03-12

### Changed
- Updated both viewports (`rv_top`, `round_compass`) to an `1:1.414` aspect ratio.
- Added new display option `Show X/Y/Z orientation` (`show_sensor_axes`) in the editor and rendering logic for both views.
- `round_compass` layout reworked:
  - compass centered in the middle area
  - angle/corner/status block aligned to the bottom
  - temperature/battery plus X/Y/Z orientation remain in the top header area.
- Fixed `rv_top` corner toggle behavior:
  - disabling corner values now always hides symbols (green points/red arrows) and values together.

## [0.3.9] - 2026-03-12

### Changed
- Replaced thermometer emoji with a dedicated upright thermometer SVG icon in both views.
- Repositioned the sensor orientation X/Y/Z badge to the header area below the battery value in both views.
- Updated both viewports (`rv_top`, `round_compass`) to a unified `9/19` aspect ratio.
- Updated card size calculation to follow the new `19:9` portrait height model.

## [0.3.8] - 2026-03-12

### Changed
- Thermometer icon alignment refined so it appears upright in both display modes (`rv_top`, `round_compass`).
- `rv_top` leveling indicators moved closer to the vehicle center:
  - front/rear rows shifted ~10% toward center vertically
  - left/right columns shifted ~15% toward center horizontally
  - applies to symbol + value block.
- Added a compact sensor orientation badge (X/Y/Z axes) to both views for installation guidance.

## [0.3.7] - 2026-03-11

### Changed
- Leveling tolerance display behavior refined in both views (`rv_top` and `round_compass`):
  - when a corner is within tolerance (`raise <= level_tolerance_cm`), it now shows only a green point
  - corner raise values are hidden while within tolerance
  - red arrow + value are shown only when tolerance is exceeded

### Tests
- Added unit test coverage for `shouldShowRaiseValue()` tolerance gating.

## [0.3.6] - 2026-03-11

### Changed
- Updated default entity mapping to match the current `wit_901_wifi` sensor naming from HA:
  - `pitch`: `sensor.wit_wt5500008241_neigung`
  - `roll`: `sensor.wit_wt5500008241_roll`
  - `yaw`: `sensor.wit_wt5500008241_gier`
  - `temperature`: `sensor.wit_wt5500008241_temperatur`
  - `battery_soc`: `sensor.wit_wt5500008241_batterie`
- Harmonized editor labels with WIT integration terminology (`Neigung`, `Roll`, `Gier`, `Temperatur`, `Batterie`) while keeping config keys backward-compatible.

### Tests
- Updated default-config test assertions for the new WIT-oriented default entity IDs.

## [0.3.5] - 2026-03-11

### Changed
- Unified card outer sizing across both display modes:
  - `round_compass` now uses the same outer aspect ratio as `rv_top` (`5/6`).
  - `getCardSize()` now follows one shared sizing path for both modes.
- Refined `round_compass` internal spacing and scaling so compass/value/corner/status sections fit cleanly inside the unified outer card dimensions.

## [0.3.4] - 2026-03-11

### Changed
- README preview now shows both display modes with current screenshots:
  - `assets/rv_compass_example.png`
  - `assets/rv_top_example.png`
- Updated README assets section to match active files only.

### Removed
- Removed legacy, no-longer-used top-view reference files from repository:
  - `assets/rv_top_flair.png`
  - `assets/rv-level-rv-top.svg`
  - `dist/rv_top_flair.png`
  - `dist/rv-level-rv-top.svg`

## [0.3.3] - 2026-03-11

### Changed
- Color configuration now supports both picker and direct text entry per color value.
- Added per-color `No color` option in the editor, allowing explicit transparent/empty color values.
- `round_compass`: disabling `show_corner_values` now hides the full corner block including symbols (dots/arrows) and values.

### Tests
- Added coverage for empty/no-color values in `normalizeConfig`.

## [0.3.2] - 2026-03-11

### Changed
- Reworked `rv_top` inline SVG to more closely match the visual structure of `assets/rv_top_flair.png` while keeping the central green target removed.
- Improved `rv_top` floorplan linework/details for a cleaner and more recognizable motorhome top-view.

## [0.3.1] - 2026-03-11

### Changed
- `round_compass` header now uses the same temperature/battery icons as `rv_top` (`🌡`, `🔋`).
- Leveling point markers now use upward arrows for raise-required points (red), while leveled points remain circles (green), in both display modes.
- `rv_top` motorhome SVG was proportionally upscaled and the container adjusted so side walls align better with the mini-compass outer radius.

## [0.3.0] - 2026-03-11

### Changed
- **Breaking:** Complete redesign of `rv_top` display mode.
  - Replaced static PNG background (`rv_top_flair.png`) with dynamic inline SVG motorhome schematic.
  - Leveling indicators now shown as colored dots (green/red) at wheel positions with raise values.
  - Embedded mini-compass (ring + level bubble + crosshairs) in the vehicle center.
  - Angle displays (X/Y) positioned outside the vehicle (right and below).
  - Temperature and battery shown in header with Unicode emoji icons.
- Generalized smoothing/animation system: now active in both `rv_top` and `round_compass` modes.
- Removed dependency on external `rv_top_flair.png` image and fallback URL chain.
- Card aspect ratio changed from `550/1093` to `5/6` for `rv_top` mode.

### Added
- `_buildRvTopSvg()`: Dynamic SVG generation for motorhome top-down view.
- `_ensureRvTopSvg()`: Color-signature-based SVG caching for rv_top.
- `_ensureMiniRingSvg()`: Compass ring SVG caching for mini-compass in rv_top.
- `_renderRvTopDynamic()`: Per-frame rendering for mini-compass animation.
- `show_compass_ring` now controls the mini-compass ring in rv_top mode too.

### Removed
- `DEFAULT_IMAGE_CANDIDATES` and image fallback URL chain.
- `_resolveImageUrl()` and `_onImageError` methods.
- `DOT_CENTER_X_RATIO` / `DOT_CENTER_Y_RATIO` constants.
- Old rv_top CSS (`.overlay`, `.bubble-zone`, `.corner`, `.marker` classes).

### Tests
- Added tests for `_buildRvTopSvg()` SVG generation and color configuration.
- All 27 tests passing.

## [0.2.10] - 2026-03-11

### Fixed
- Added a README preview image so HACS image validation passes (`Validation images`).

### Changed
- Updated GitHub Actions workflow to Node-24-ready action majors:
  - `actions/checkout@v5`
  - `actions/setup-node@v5`

## [0.2.9] - 2026-03-11

### Changed
- Added HACS validation job (`hacs/action`, `category: plugin`) to CI.
- Updated README repository/resource references to `rv-level-ha-lovelace-card`.
- Added fallback asset paths for both repository slugs:
  - `rv-level-ha-lovelace-card` (new)
  - `rv-ha-lovelace-card` (legacy compatibility)
- Added maintainer checklist: `docs/HACS_DEFAULT_SUBMISSION.md`.

## [0.2.8] - 2026-03-11

### Fixed
- `show_corner_values` now fully hides corner visualization containers in both display modes (not only corner text values).

### Changed
- README is now consistently English in the leveling interpretation section.

## [0.2.7] - 2026-03-11

### Changed
- Improved text sharpness in `round_compass` header:
  - moved temperature/title/battery header out of scaled overlay transform
  - removed blur-prone header text shadow and applied font smoothing
- Optimized overlay transform behavior:
  - uses `transform: none` when scale/offset are default values
- Updated display toggle wording:
  - `show_corner_values` now reads `Nivellierpunkte anzeigen` / `Show leveling points`

### Fixed
- In `rv_top`, disabling `show_corner_values` now hides the entire corner visualization block (markers + values), not only the numeric text.

## [0.2.6] - 2026-03-11

### Changed
- Branding assets were renamed to the `rv-level-*` naming scheme for icon/top-view fallback files.
- Added generated PNG branding set in `brand/` and mirrored icon/logo PNGs in `dist/`.

## [0.2.5] - 2026-03-11

### Added
- New round-compass display toggle:
  - `display.show_angle_panel` to show/hide the `AngleX/AngleY/AngleZ` block.

### Changed
- In `round_compass` mode, the card now forces a transparent wrapper background whenever a background image (`image`) is set, so the image remains fully visible.
- Improved round-compass layout behavior:
  - when angle panel is hidden, corner/value block spacing is adjusted to keep visual balance.

### Tests
- Extended normalization tests for:
  - `display.show_angle_panel` default and boolean coercion.

## [0.2.4] - 2026-03-11

### Added
- New round-compass overlay positioning controls:
  - `display.round_overlay_scale`
  - `display.round_overlay_offset_x`
  - `display.round_overlay_offset_y`
- New display toggle:
  - `display.show_compass_ring` to show/hide compass ring and index marker.
- Added sensor placement/orientation guidance section in README for reliable vehicle mounting.

### Changed
- `image` (Basisbild URL) is now also used in `round_compass` mode as optional background image.
- Refined color configuration editor UX:
  - switched to a compact color palette grid with larger pickers and visible HEX values.
- README now explicitly documents that the card is sensor-source agnostic (works with non-WT sensors if values are compatible).

### Tests
- Extended config normalization tests for:
  - `round_overlay_scale`
  - `round_overlay_offset_x`
  - `round_overlay_offset_y`
  - `show_compass_ring`

## [0.2.3] - 2026-03-11

### Changed
- Card branding and docs updated to **RV Level Lovelace Card** (including HACS display name).
- Round-compass header layout adjusted:
  - temperature shown on the left (left-aligned),
  - battery shown on the right (right-aligned),
  - title centered between both values.
- Added new configurable display color fields:
  - `display.level_gradient_mid`
  - `display.text_color`
- Replaced remaining display color text fields with UI color pickers in the editor.
- Corner values are now available in round-compass view with FL/FR/RL/RR indicators.

### Fixed
- Fixed `normalizeConfig()` root-field regression: `title` and `image` are now preserved from config.
- Fixed corner value unit mismatch: raise values are converted from mm to cm before display and tolerance checks.
- Fixed dynamic round level gradient to keep a distinct middle color stop during updates.
- Removed redundant `projectToUnitCircle()` zero-magnitude check.

### Tests
- Added/updated tests for:
  - root `title`/`image` config preservation
  - cm-based corner raise values and tolerance behavior
  - additional color normalization defaults (`level_gradient_mid`, `text_color`)

## [0.2.2] - 2026-03-11

### Changed
- Round-compass header layout updated:
  - temperature moved to the right and right-aligned,
  - battery moved to the left and right-aligned for symmetric alignment.
- Added configurable text color (`display.text_color`) and applied it across both display modes.
- Added round-compass corner value panel (FL/FR/RL/RR) with level/raise indicators.
- Round-compass now uses geometry-driven leveling values (wheelbase/front/rear track) like the original RV view.
- Replaced display color text inputs in the editor with color pickers for direct UI color selection.

### Fixed
- Hardened CSS color sanitization with blocked global CSS keywords and stricter named-color matching.
- Escaped compass SVG color values before injecting into SVG markup.
- Added cached screen-orientation detection to reduce repeated orientation checks at high update rates.
- Added heading re-normalization in smoothing loop to prevent unbounded long-running heading values.

## [0.2.1] - 2026-03-11

### Changed
- Round compass and RV mode now use only configured `title`; removed hardcoded fallback title text.
- Added smoothing for pitch/roll/yaw rendering in `round_compass` with shortest-path yaw wrap handling (359 -> 0 without jump).
- Added optional automatic screen orientation mapping (`orientation.auto_screen_mapping`) for portrait/landscape axis behavior.
- Added round-specific bubble radius control (`display.round_dot_boundary_radius_ratio`) so the bubble can reach the full usable liquid area.
- Added compass reliability hint based on tilt threshold (`display.show_compass_status`, `display.compass_unreliable_tilt_deg`).
- Added configurable color palette for background, bubble, level gradients, crosshair and compass ring.
- Added tests for round dot geometry, color sanitization and shortest-angle interpolation.

## [0.2.0] - 2026-03-11

### Added
- New display mode `display.mode: round_compass` with:
  - circular level target (crosshair + concentric rings)
  - rotating compass ring based on yaw
  - AngleX/AngleY/AngleZ value panel
- New configurable yaw inputs/options:
  - `entities.yaw`
  - `orientation.invert_yaw`
  - `orientation.yaw_offset_deg`

### Changed
- Card architecture now supports mode-specific DOM/render paths:
  - `rv_top` renderer (existing behavior)
  - `round_compass` renderer
- Mode switch in editor forces safe DOM rebuild.
- State tracking now includes `yaw` for reactive updates.
- Version bumped to `0.2.0`.

### Tests
- Added regression tests for:
  - mode normalization and fallback
  - yaw-related config normalization
  - heading normalization (0..360)
  - ring rotation sign
  - yaw-unavailable fallback in round mode
  - DOM rebuild behavior on display mode switch

## [0.1.13] - 2026-03-10

### Added
- New configurable display parameters in card config/editor:
  - `display.dot_boundary_radius_ratio`
  - `display.dot_size_ratio`
- Added editor inputs for both parameters under the Display section.

### Changed
- Dot geometry now uses per-card display config values (with clamped safety limits) instead of hardcoded constants.

### Tests
- Extended tests for default/override behavior of the new bubble ratio parameters.

## [0.1.12] - 2026-03-10

### Added
- GitHub release automation workflow (`.github/workflows/release.yml`) on `v*` tags.

### Changed
- Adopted explicit release versioning flow aligned with the Solvis card:
  - semver tag -> GitHub Release -> HACS update detection.
- Version bump only; no functional card behavior changes compared to `0.1.11`.

## [0.1.11] - 2026-03-10

### Changed
- Increased center bubble movement range to better utilize the light-green center circle.
- Rebalanced dot geometry:
  - larger boundary radius (`DOT_BOUNDARY_RADIUS_RATIO`)
  - slightly smaller red dot size (`DOT_SIZE_RATIO`)
- Keeps the same edge-safe rule: at max deflection, the red dot stays inside the boundary circle.

## [0.1.10] - 2026-03-10

### Changed
- Recalibrated center bubble mapping so the red dot's outer edge reaches exactly the light-green center-circle boundary at maximum deflection.
- Dot radius/track now use explicit boundary geometry (`computeDotGeometry`) to keep image-aligned behavior deterministic across viewport sizes.

### Tests
- Added regression test for dot geometry edge/boundary relation.

## [0.1.9] - 2026-03-10

### Changed
- Release packaging update to ensure HACS picks up the latest card build reliably.
- No functional code changes compared to `0.1.8` bubble behavior.

## [0.1.8] - 2026-03-10

### Changed
- Removed the extra visible helper circle for the center bubble.
- Calibrated bubble center/radius ratios to align movement with the circle area in `rv_top_flair.png`.

### Fixed
- Center dot remains circle-constrained while now visually following the base image circle without an additional overlay ring.

## [0.1.7] - 2026-03-10

### Fixed
- Reworked center bubble rendering into a dedicated square `bubble-zone` with explicit circular track.
- Center red dot is now rendered inside the bubble-zone with pixel-based square sizing and circle clipping.
- Dot movement is constrained to the bubble track radius and cannot leave the green circle.

## [0.1.6] - 2026-03-10

### Fixed
- Center level dot now uses circular vector projection (`projectToUnitCircle`) so movement always stays inside a circular range.
- Dot position now uses pixel-based circle radius (instead of plain percent offsets), keeping 360° bubble behavior stable on tall card aspect ratios.
- Dot width/height are set explicitly per render to guarantee a true circle (no oval distortion).

### Tests
- Added regression test for unit-circle projection behavior.

## [0.1.5] - 2026-03-10

### Fixed
- Stabilized corner marker rendering under fast sensor movement:
  - removed reliance on fixed `vw` triangle sizing by applying runtime pixel-based marker sizing per card viewport.
  - added robust marker style reset per update (prevents malformed marker carry-over states).
- Added tilt safety clamp (`±30°`) for leveling calculations to avoid outlier spikes when sensor values jump during motion.

### Tests
- Added test coverage for tilt clamp behavior used by the stabilization path.

## [0.1.4] - 2026-03-10

### Added
- New display config option `text_size_mode` with values: `auto`, `small`, `medium`, `large`.
- Card editor selector for text size mode in the Display section.

### Changed
- Viewport-aware dynamic text sizing with hard safety caps to keep labels away from core layout elements.
- Added width constraints and ellipsis handling for top labels, title, angle values, and corner value labels.

### Tests
- Added normalization tests for `display.text_size_mode` (valid and invalid values).

## [0.1.3] - 2026-03-10

### Fixed
- Improved small-screen rendering and readability:
  - reduced and dynamically scaled overlay font sizes
  - prevented label line wrapping (`white-space: nowrap`)
  - constrained title width with ellipsis behavior
  - improved right-side roll label alignment
- Stabilized corner value text sizing for narrow card widths.

## [0.1.2] - 2026-03-10

### Fixed
- Improved card-picker compatibility by accepting both `rv-ha-lovelace-card` and `custom:rv-ha-lovelace-card` config types in `setConfig`.
- Disabled card preview in metadata (`preview: false`) to avoid stuck preview loading in Home Assistant card picker.
- Added regression tests for supported card-type variants and metadata preview flag.

## [0.1.1] - 2026-03-10

### Fixed
- Fixed custom card picker initialization by aligning `window.customCards` metadata type with Home Assistant expectations (`type: \"rv-ha-lovelace-card\"`).
- Updated metadata registration test accordingly.

## [0.1.0] - 2026-03-10

### Added
- Initial project scaffold for `rv-ha-lovelace-card`.
- HACS metadata, test setup, CI workflow, documentation, and changelog.
- First Lovelace card MVP with configurable entities and geometry for RV leveling visualization.
