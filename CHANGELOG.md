# Changelog

All notable changes to this project are documented in this file and in GitHub Releases:

- https://github.com/othorg/wit-ha-lovelace-card/releases

## [Unreleased]

### Changed
- No changes yet.

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
