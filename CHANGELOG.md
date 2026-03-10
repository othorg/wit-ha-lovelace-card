# Changelog

All notable changes to this project are documented in this file and in GitHub Releases:

- https://github.com/othorg/wit-ha-lovelace-card/releases

## [Unreleased]

### Changed
- No changes yet.

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
