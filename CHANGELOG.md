# Changelog

All notable changes to this project are documented in this file and in GitHub Releases:

- https://github.com/othorg/wit-ha-lovelace-card/releases

## [Unreleased]

### Changed
- No changes yet.

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
- Improved card-picker compatibility by accepting both `wit-ha-lovelace-card` and `custom:wit-ha-lovelace-card` config types in `setConfig`.
- Disabled card preview in metadata (`preview: false`) to avoid stuck preview loading in Home Assistant card picker.
- Added regression tests for supported card-type variants and metadata preview flag.

## [0.1.1] - 2026-03-10

### Fixed
- Fixed custom card picker initialization by aligning `window.customCards` metadata type with Home Assistant expectations (`type: \"wit-ha-lovelace-card\"`).
- Updated metadata registration test accordingly.

## [0.1.0] - 2026-03-10

### Added
- Initial project scaffold for `wit-ha-lovelace-card`.
- HACS metadata, test setup, CI workflow, documentation, and changelog.
- First Lovelace card MVP with configurable entities and geometry for RV leveling visualization.
