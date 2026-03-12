const CARD_TYPE = "rv-ha-lovelace-card";
const CARD_NAME = "RV Level Lovelace Card";
const CARD_VERSION = "0.3.8";

const DEFAULT_GEOMETRY = {
  wheelbase_mm: 2000,
  track_front_mm: 1723,
  track_rear_mm: 1661,
};

const DEFAULT_DISPLAY = {
  mode: "rv_top",
  max_tilt_deg: 5,
  level_tolerance_cm: 0.1,
  dot_boundary_radius_ratio: 0.112,
  round_dot_boundary_radius_ratio: 0.44,
  dot_size_ratio: 0.068,
  text_size_mode: "auto",
  show_temperature: true,
  show_battery: true,
  show_angle_panel: true,
  show_corner_values: true,
  show_compass_ring: true,
  round_overlay_scale: 1,
  round_overlay_offset_x: 0,
  round_overlay_offset_y: 0,
  background_color: "#9bc4d6",
  level_gradient_start: "#e8ff84",
  level_gradient_mid: "#d6ee65",
  level_gradient_end: "#c3de41",
  level_highlight_color: "#ffffff",
  crosshair_color: "#141b13",
  ring_background_color: "#0a0d13",
  ring_tick_color: "#8f96a6",
  ring_major_tick_color: "#dfe4ef",
  ring_cardinal_color: "#d8df7a",
  dot_color: "#ff2a1f",
  dot_border_color: "#2a211f",
  level_ok_color: "#00c853",
  raise_color: "#ff1744",
  text_color: "#111111",
  show_compass_status: true,
  compass_unreliable_tilt_deg: 20,
  smooth_alpha: 0.2,
};

const DEFAULT_ORIENTATION = {
  swap_axes: false,
  invert_pitch: false,
  invert_roll: false,
  invert_yaw: false,
  yaw_offset_deg: 0,
  auto_screen_mapping: false,
};

const DEFAULT_ENTITIES = {
  pitch: "sensor.wit_wt5500008241_neigung",
  roll: "sensor.wit_wt5500008241_roll",
  yaw: "sensor.wit_wt5500008241_gier",
  temperature: "sensor.wit_wt5500008241_temperatur",
  battery_soc: "sensor.wit_wt5500008241_batterie",
};

const I18N = {
  de: {
    image_alt: "Wohnmobil Nivellierung",
    general: "Allgemein",
    title: "Ueberschrift",
    image_url: "Basisbild URL (optional)",
    entities: "Entitaeten",
    pitch_entity: "Neigung (Pitch)",
    roll_entity: "Roll",
    yaw_entity: "Gier (Yaw)",
    temp_entity: "Temperatur",
    batt_entity: "Batterie",
    geometry: "Geometrie",
    wheelbase_mm: "Achsabstand (mm)",
    track_front_mm: "Spur vorne (mm)",
    track_rear_mm: "Spur hinten (mm)",
    display: "Anzeige",
    display_mode: "Anzeigemodus",
    mode_rv_top: "Wohnmobil Draufsicht",
    mode_round_compass: "Kompass-Wasserwaage",
    max_tilt_deg: "Max Tilt fuer Punkt (Grad)",
    level_tolerance_cm: "Nivellier-Toleranz (cm)",
    background_color: "Hintergrundfarbe",
    level_gradient_start: "Wasserwaage Farbverlauf Start",
    level_gradient_mid: "Wasserwaage Farbverlauf Mitte",
    level_gradient_end: "Wasserwaage Farbverlauf Ende",
    level_highlight_color: "Wasserwaage Highlight-Farbe",
    crosshair_color: "Fadenkreuz-Farbe",
    ring_background_color: "Kompassring Hintergrund",
    ring_tick_color: "Kompassring Skalenfarbe",
    ring_major_tick_color: "Kompassring Hauptskala",
    ring_cardinal_color: "Kompassring Himmelsrichtungen",
    dot_color: "Blasenfarbe",
    dot_border_color: "Blasenrandfarbe",
    level_ok_color: "Nivelliert-Farbe",
    raise_color: "Anheben-Farbe",
    text_color: "Schriftfarbe",
    show_compass_status: "Kompass-Status anzeigen",
    no_color: "Keine Farbe",
    compass_unreliable_tilt_deg: "Tilt-Grenze fuer Kompass-Hinweis (Grad)",
    smooth_alpha: "Glaettung (0-1)",
    text_size_mode: "Schriftgroesse",
    dot_boundary_radius_ratio: "Bubble-Radius (Verhaeltnis)",
    round_dot_boundary_radius_ratio: "Bubble-Radius rund (Verhaeltnis)",
    dot_size_ratio: "Punktgroesse (Verhaeltnis)",
    text_size_auto: "Auto",
    text_size_small: "Klein",
    text_size_medium: "Mittel",
    text_size_large: "Gross",
    show_temperature: "Temperatur anzeigen",
    show_battery: "Batterie anzeigen",
    show_angle_panel: "AngleX/Y/Z anzeigen",
    show_corner_values: "Nivellierpunkte anzeigen",
    show_compass_ring: "Kompassring anzeigen",
    round_overlay_scale: "Kompass-Overlay Skalierung",
    round_overlay_offset_x: "Kompass-Overlay X-Offset (%)",
    round_overlay_offset_y: "Kompass-Overlay Y-Offset (%)",
    orientation: "Sensorausrichtung",
    swap_axes: "X/Y tauschen",
    invert_pitch: "Pitch invertieren",
    invert_roll: "Roll invertieren",
    invert_yaw: "Yaw invertieren",
    yaw_offset_deg: "Yaw-Offset (Grad)",
    auto_screen_mapping: "Achsen automatisch an Bildschirm drehen",
    compass_reliability_hint: "Kompass evtl. unzuverlaessig (starke Neigung)",
    angle_x: "AngleX",
    angle_y: "AngleY",
    angle_z: "AngleZ",
    not_available: "--",
    unit_cm: "cm",
    unit_deg: "deg",
  },
  en: {
    image_alt: "RV leveling",
    general: "General",
    title: "Title",
    image_url: "Base image URL (optional)",
    entities: "Entities",
    pitch_entity: "Inclination (Pitch)",
    roll_entity: "Roll",
    yaw_entity: "Yaw (Gier)",
    temp_entity: "Temperature",
    batt_entity: "Battery",
    geometry: "Geometry",
    wheelbase_mm: "Wheelbase (mm)",
    track_front_mm: "Front track (mm)",
    track_rear_mm: "Rear track (mm)",
    display: "Display",
    display_mode: "Display mode",
    mode_rv_top: "RV Top View",
    mode_round_compass: "Compass Level",
    max_tilt_deg: "Max tilt for dot (deg)",
    level_tolerance_cm: "Level tolerance (cm)",
    background_color: "Background color",
    level_gradient_start: "Level gradient start",
    level_gradient_mid: "Level gradient middle",
    level_gradient_end: "Level gradient end",
    level_highlight_color: "Level highlight color",
    crosshair_color: "Crosshair color",
    ring_background_color: "Compass ring background",
    ring_tick_color: "Compass ring tick color",
    ring_major_tick_color: "Compass ring major tick color",
    ring_cardinal_color: "Compass ring cardinal color",
    dot_color: "Bubble color",
    dot_border_color: "Bubble border color",
    level_ok_color: "Level-ok color",
    raise_color: "Raise-needed color",
    text_color: "Text color",
    show_compass_status: "Show compass status",
    no_color: "No color",
    compass_unreliable_tilt_deg: "Tilt limit for compass hint (deg)",
    smooth_alpha: "Smoothing (0-1)",
    text_size_mode: "Text size",
    dot_boundary_radius_ratio: "Bubble radius (ratio)",
    round_dot_boundary_radius_ratio: "Round bubble radius (ratio)",
    dot_size_ratio: "Dot size (ratio)",
    text_size_auto: "Auto",
    text_size_small: "Small",
    text_size_medium: "Medium",
    text_size_large: "Large",
    show_temperature: "Show temperature",
    show_battery: "Show battery",
    show_angle_panel: "Show AngleX/Y/Z",
    show_corner_values: "Show leveling points",
    show_compass_ring: "Show compass ring",
    round_overlay_scale: "Compass overlay scale",
    round_overlay_offset_x: "Compass overlay X offset (%)",
    round_overlay_offset_y: "Compass overlay Y offset (%)",
    orientation: "Sensor orientation",
    swap_axes: "Swap X/Y",
    invert_pitch: "Invert pitch",
    invert_roll: "Invert roll",
    invert_yaw: "Invert yaw",
    yaw_offset_deg: "Yaw offset (deg)",
    auto_screen_mapping: "Auto-map axes to screen orientation",
    compass_reliability_hint: "Compass may be unreliable at high tilt",
    angle_x: "AngleX",
    angle_y: "AngleY",
    angle_z: "AngleZ",
    not_available: "--",
    unit_cm: "cm",
    unit_deg: "deg",
  },
};

const NUMBER_FIELDS = new Set([
  "wheelbase_mm",
  "track_front_mm",
  "track_rear_mm",
  "max_tilt_deg",
  "level_tolerance_cm",
  "dot_boundary_radius_ratio",
  "round_dot_boundary_radius_ratio",
  "dot_size_ratio",
  "round_overlay_scale",
  "round_overlay_offset_x",
  "round_overlay_offset_y",
  "yaw_offset_deg",
  "compass_unreliable_tilt_deg",
  "smooth_alpha",
]);

const TEXT_SIZE_MODES = new Set(["auto", "small", "medium", "large"]);
const DISPLAY_MODES = new Set(["rv_top", "round_compass"]);
const TEXT_SIZE_MODE_FACTORS = {
  auto: 1.0,
  small: 0.88,
  medium: 1.0,
  large: 1.14,
};

const MAX_LEVELING_TILT_DEG = 30;
const ROUND_CENTER_X_RATIO = 0.5;
const ROUND_CENTER_Y_RATIO = 0.5;

function detectScriptBasePath() {
  if (typeof document === "undefined") return "";

  const scriptFromCurrent = document.currentScript?.src || "";
  if (scriptFromCurrent.includes("rv-ha-lovelace-card.js")) {
    return scriptFromCurrent.slice(0, scriptFromCurrent.lastIndexOf("/"));
  }

  const scripts = document.querySelectorAll?.("script[src]") || [];
  for (const script of scripts) {
    const src = String(script?.src || "");
    if (src.includes("rv-ha-lovelace-card.js")) {
      return src.slice(0, src.lastIndexOf("/"));
    }
  }

  return "";
}

function uniq(values) {
  const out = [];
  const seen = new Set();
  for (const value of values) {
    if (!value || seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  return out;
}

const SCRIPT_BASE = detectScriptBasePath();
const DEFAULT_ICON_CANDIDATES = uniq([
  SCRIPT_BASE ? `${SCRIPT_BASE}/rv-level-icon.svg` : "",
  SCRIPT_BASE ? `${SCRIPT_BASE}/rv-level-icon.png` : "",
  "/hacsfiles/rv-level-ha-lovelace-card/rv-level-icon.svg",
  "/hacsfiles/rv-level-ha-lovelace-card/rv-level-icon.png",
  "/local/community/rv-level-ha-lovelace-card/rv-level-icon.svg",
  "/local/community/rv-level-ha-lovelace-card/rv-level-icon.png",
  "/local/rv-level-ha-lovelace-card/rv-level-icon.svg",
  "/local/rv-level-ha-lovelace-card/rv-level-icon.png",
]);

function resolveLanguage(hass) {
  const raw = String(hass?.locale?.language || hass?.language || "").toLowerCase();
  return raw.startsWith("de") ? "de" : "en";
}

function t(lang, key) {
  return I18N[lang]?.[key] || I18N.en[key] || key;
}

function sanitizeCssColor(value, fallback) {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;
  const lower = raw.toLowerCase();
  const blockedKeywords = new Set([
    "inherit",
    "initial",
    "unset",
    "revert",
    "revert-layer",
    "expression",
    "url",
  ]);
  if (blockedKeywords.has(lower)) return fallback;
  if (/^#[0-9a-fA-F]{3,8}$/.test(raw)) return raw;
  if (/^rgba?\(\s*[\d.\s,%+-]+\)$/.test(raw)) return raw;
  if (/^hsla?\(\s*[\d.\s,%+-]+\)$/.test(raw)) return raw;
  if (/^var\(--[a-zA-Z0-9_-]+\)$/.test(raw)) return raw;
  if (/^[a-z]{3,20}$/i.test(raw)) return raw;
  return fallback;
}

function sanitizeOptionalCssColor(value, fallback) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return sanitizeCssColor(raw, fallback);
}

function clampNumber(value, min, max, fallback) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.max(min, Math.min(max, num));
}

function clampInt(value, min, max) {
  const num = Number(value);
  if (!Number.isFinite(num)) return min;
  return Math.round(Math.max(min, Math.min(max, num)));
}

function normalizeConfig(config) {
  const raw = config || {};
  const normalized = {
    type: `custom:${CARD_TYPE}`,
    title: String(raw.title || ""),
    image: String(raw.image || ""),
    entities: {
      ...DEFAULT_ENTITIES,
      ...(raw.entities || {}),
    },
    geometry: {
      ...DEFAULT_GEOMETRY,
      ...(raw.geometry || {}),
    },
    display: {
      ...DEFAULT_DISPLAY,
      ...(raw.display || {}),
    },
    orientation: {
      ...DEFAULT_ORIENTATION,
      ...(raw.orientation || {}),
    },
  };

  normalized.geometry.wheelbase_mm = clampNumber(normalized.geometry.wheelbase_mm, 500, 10000, DEFAULT_GEOMETRY.wheelbase_mm);
  normalized.geometry.track_front_mm = clampNumber(normalized.geometry.track_front_mm, 500, 5000, DEFAULT_GEOMETRY.track_front_mm);
  normalized.geometry.track_rear_mm = clampNumber(normalized.geometry.track_rear_mm, 500, 5000, DEFAULT_GEOMETRY.track_rear_mm);

  normalized.display.max_tilt_deg = clampNumber(normalized.display.max_tilt_deg, 1, 30, DEFAULT_DISPLAY.max_tilt_deg);
  normalized.display.level_tolerance_cm = clampNumber(normalized.display.level_tolerance_cm, 0, 20, DEFAULT_DISPLAY.level_tolerance_cm);
  normalized.display.dot_boundary_radius_ratio = clampNumber(
    normalized.display.dot_boundary_radius_ratio,
    0.04,
    0.2,
    DEFAULT_DISPLAY.dot_boundary_radius_ratio,
  );
  normalized.display.dot_size_ratio = clampNumber(
    normalized.display.dot_size_ratio,
    0.02,
    0.16,
    DEFAULT_DISPLAY.dot_size_ratio,
  );
  normalized.display.round_dot_boundary_radius_ratio = clampNumber(
    normalized.display.round_dot_boundary_radius_ratio,
    0.2,
    0.49,
    clampNumber(normalized.display.dot_boundary_radius_ratio * 4, 0.2, 0.49, DEFAULT_DISPLAY.round_dot_boundary_radius_ratio),
  );
  normalized.display.mode = normalizeDisplayMode(normalized.display.mode);
  normalized.display.text_size_mode = normalizeTextSizeMode(normalized.display.text_size_mode);
  normalized.display.show_temperature = Boolean(normalized.display.show_temperature);
  normalized.display.show_battery = Boolean(normalized.display.show_battery);
  normalized.display.show_angle_panel = Boolean(normalized.display.show_angle_panel);
  normalized.display.show_corner_values = Boolean(normalized.display.show_corner_values);
  normalized.display.show_compass_ring = Boolean(normalized.display.show_compass_ring);
  normalized.display.round_overlay_scale = clampNumber(normalized.display.round_overlay_scale, 0.2, 3, DEFAULT_DISPLAY.round_overlay_scale);
  normalized.display.round_overlay_offset_x = clampNumber(normalized.display.round_overlay_offset_x, -100, 100, DEFAULT_DISPLAY.round_overlay_offset_x);
  normalized.display.round_overlay_offset_y = clampNumber(normalized.display.round_overlay_offset_y, -100, 100, DEFAULT_DISPLAY.round_overlay_offset_y);
  normalized.display.show_compass_status = Boolean(normalized.display.show_compass_status);
  normalized.display.compass_unreliable_tilt_deg = clampNumber(
    normalized.display.compass_unreliable_tilt_deg,
    1,
    89,
    DEFAULT_DISPLAY.compass_unreliable_tilt_deg,
  );
  normalized.display.smooth_alpha = clampNumber(normalized.display.smooth_alpha, 0.01, 1, DEFAULT_DISPLAY.smooth_alpha);
  normalized.display.background_color = sanitizeOptionalCssColor(normalized.display.background_color, DEFAULT_DISPLAY.background_color);
  normalized.display.level_gradient_start = sanitizeOptionalCssColor(normalized.display.level_gradient_start, DEFAULT_DISPLAY.level_gradient_start);
  normalized.display.level_gradient_mid = sanitizeOptionalCssColor(normalized.display.level_gradient_mid, DEFAULT_DISPLAY.level_gradient_mid);
  normalized.display.level_gradient_end = sanitizeOptionalCssColor(normalized.display.level_gradient_end, DEFAULT_DISPLAY.level_gradient_end);
  normalized.display.level_highlight_color = sanitizeOptionalCssColor(normalized.display.level_highlight_color, DEFAULT_DISPLAY.level_highlight_color);
  normalized.display.crosshair_color = sanitizeOptionalCssColor(normalized.display.crosshair_color, DEFAULT_DISPLAY.crosshair_color);
  normalized.display.ring_background_color = sanitizeOptionalCssColor(normalized.display.ring_background_color, DEFAULT_DISPLAY.ring_background_color);
  normalized.display.ring_tick_color = sanitizeOptionalCssColor(normalized.display.ring_tick_color, DEFAULT_DISPLAY.ring_tick_color);
  normalized.display.ring_major_tick_color = sanitizeOptionalCssColor(normalized.display.ring_major_tick_color, DEFAULT_DISPLAY.ring_major_tick_color);
  normalized.display.ring_cardinal_color = sanitizeOptionalCssColor(normalized.display.ring_cardinal_color, DEFAULT_DISPLAY.ring_cardinal_color);
  normalized.display.dot_color = sanitizeOptionalCssColor(normalized.display.dot_color, DEFAULT_DISPLAY.dot_color);
  normalized.display.dot_border_color = sanitizeOptionalCssColor(normalized.display.dot_border_color, DEFAULT_DISPLAY.dot_border_color);
  normalized.display.level_ok_color = sanitizeOptionalCssColor(normalized.display.level_ok_color, DEFAULT_DISPLAY.level_ok_color);
  normalized.display.raise_color = sanitizeOptionalCssColor(normalized.display.raise_color, DEFAULT_DISPLAY.raise_color);
  normalized.display.text_color = sanitizeOptionalCssColor(normalized.display.text_color, DEFAULT_DISPLAY.text_color);

  normalized.orientation.swap_axes = Boolean(normalized.orientation.swap_axes);
  normalized.orientation.invert_pitch = Boolean(normalized.orientation.invert_pitch);
  normalized.orientation.invert_roll = Boolean(normalized.orientation.invert_roll);
  normalized.orientation.invert_yaw = Boolean(normalized.orientation.invert_yaw);
  normalized.orientation.auto_screen_mapping = Boolean(normalized.orientation.auto_screen_mapping);
  normalized.orientation.yaw_offset_deg = clampNumber(
    normalized.orientation.yaw_offset_deg,
    -360,
    360,
    DEFAULT_ORIENTATION.yaw_offset_deg,
  );

  return normalized;
}

function normalizeTextSizeMode(value) {
  const mode = String(value || "").toLowerCase();
  if (TEXT_SIZE_MODES.has(mode)) return mode;
  return DEFAULT_DISPLAY.text_size_mode;
}

function normalizeDisplayMode(value) {
  const mode = String(value || "").toLowerCase();
  if (DISPLAY_MODES.has(mode)) return mode;
  return DEFAULT_DISPLAY.mode;
}

function isSupportedCardType(type) {
  const value = String(type || "").trim();
  return value === CARD_TYPE || value === `custom:${CARD_TYPE}`;
}

function isStateUnavailable(stateObj) {
  const state = String(stateObj?.state || "").toLowerCase();
  return !stateObj || state === "" || state === "unknown" || state === "unavailable" || state === "none";
}

function readNumericState(hass, entityId) {
  if (!entityId) return null;
  const stateObj = hass?.states?.[entityId];
  if (isStateUnavailable(stateObj)) return null;
  const value = Number.parseFloat(String(stateObj.state));
  if (!Number.isFinite(value)) return null;
  return value;
}

function resolvePitchRoll(hass, config, isLandscape = isLandscapeOrientation()) {
  const pitchEntity = config?.entities?.pitch || "";
  const rollEntity = config?.entities?.roll || "";

  let pitch = readNumericState(hass, pitchEntity);
  let roll = readNumericState(hass, rollEntity);

  if (pitch !== null && roll !== null && config?.orientation?.auto_screen_mapping && isLandscape) {
    const p = pitch;
    // 90-degree remap for common landscape usage in dashboards.
    pitch = roll;
    roll = -p;
  }

  if (config?.orientation?.swap_axes) {
    const tmp = pitch;
    pitch = roll;
    roll = tmp;
  }
  if (pitch !== null && config?.orientation?.invert_pitch) pitch = -pitch;
  if (roll !== null && config?.orientation?.invert_roll) roll = -roll;

  return { pitch, roll, valid: pitch !== null && roll !== null };
}

function computeLeveling(pitchDeg, rollDeg, geometry) {
  if (!Number.isFinite(pitchDeg) || !Number.isFinite(rollDeg)) return null;

  const wb = Number(geometry?.wheelbase_mm || DEFAULT_GEOMETRY.wheelbase_mm);
  const tf = Number(geometry?.track_front_mm || DEFAULT_GEOMETRY.track_front_mm);
  const tr = Number(geometry?.track_rear_mm || DEFAULT_GEOMETRY.track_rear_mm);

  const toRad = (deg) => deg * Math.PI / 180;
  const tanP = Math.tan(toRad(pitchDeg));
  const tanR = Math.tan(toRad(rollDeg));

  const z_fl = wb * tanP + (tf / 2) * tanR;
  const z_fr = wb * tanP + (-tf / 2) * tanR;
  const z_rl = (tr / 2) * tanR;
  const z_rr = (-tr / 2) * tanR;

  const minZ = Math.min(z_fl, z_fr, z_rl, z_rr);

  // Note: The raise_* mapping intentionally mirrors the existing EasyLevel YAML logic
  // provided by the project owner (diagonal reference mapping).
  return {
    z_fl,
    z_fr,
    z_rl,
    z_rr,
    minZ,
    raise_fl: Math.max(0, z_rr - minZ),
    raise_fr: Math.max(0, z_rl - minZ),
    raise_rl: Math.max(0, z_fr - minZ),
    raise_rr: Math.max(0, z_fl - minZ),
  };
}

function clampTiltForLeveling(value) {
  return clampNumber(value, -MAX_LEVELING_TILT_DEG, MAX_LEVELING_TILT_DEG, 0);
}

function projectToUnitCircle(x, y) {
  const nx = Number.isFinite(x) ? x : 0;
  const ny = Number.isFinite(y) ? y : 0;
  const mag = Math.hypot(nx, ny);
  if (mag <= 1) {
    return { x: nx, y: ny };
  }
  return { x: nx / mag, y: ny / mag };
}

function normalize360(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return ((n % 360) + 360) % 360;
}

function shortestAngleDelta(fromDeg, toDeg) {
  return ((toDeg - fromDeg + 540) % 360) - 180;
}

function isLandscapeOrientation() {
  if (typeof window === "undefined") return false;
  try {
    const type = String(window?.screen?.orientation?.type || "").toLowerCase();
    if (type.includes("landscape")) return true;
    if (type.includes("portrait")) return false;
  } catch {
    // Ignore and fallback below.
  }
  try {
    if (typeof window.matchMedia === "function") {
      return Boolean(window.matchMedia("(orientation: landscape)").matches);
    }
  } catch {
    // Ignore and fallback below.
  }
  const w = Number(window?.innerWidth || 0);
  const h = Number(window?.innerHeight || 0);
  return w > h;
}

function computeDotGeometry(width, display = DEFAULT_DISPLAY) {
  const boundaryRatio = clampNumber(
    display?.dot_boundary_radius_ratio,
    0.04,
    0.2,
    DEFAULT_DISPLAY.dot_boundary_radius_ratio,
  );
  const dotSizeRatio = clampNumber(
    display?.dot_size_ratio,
    0.02,
    0.16,
    DEFAULT_DISPLAY.dot_size_ratio,
  );
  const dotSizePx = clampInt(width * dotSizeRatio, 20, width * 0.14);
  const boundaryRadiusPx = clampInt(
    width * boundaryRatio,
    Math.ceil(dotSizePx / 2) + 4,
    width * 0.2,
  );
  const bubbleZoneSizePx = boundaryRadiusPx * 2;
  const dotTrackRadiusPx = Math.max(0, boundaryRadiusPx - dotSizePx / 2);
  return { dotSizePx, boundaryRadiusPx, bubbleZoneSizePx, dotTrackRadiusPx };
}

function computeRoundDotGeometry(width, display = DEFAULT_DISPLAY) {
  const legacyRatio = clampNumber(
    display?.dot_boundary_radius_ratio,
    0.04,
    0.2,
    DEFAULT_DISPLAY.dot_boundary_radius_ratio,
  );
  const roundRatio = clampNumber(
    display?.round_dot_boundary_radius_ratio,
    0.2,
    0.49,
    clampNumber(legacyRatio * 4, 0.2, 0.49, DEFAULT_DISPLAY.round_dot_boundary_radius_ratio),
  );
  const dotSizeRatio = clampNumber(
    display?.dot_size_ratio,
    0.02,
    0.16,
    DEFAULT_DISPLAY.dot_size_ratio,
  );
  const dotSizePx = clampInt(width * dotSizeRatio, 14, width * 0.18);
  const boundaryRadiusPx = clampInt(
    width * roundRatio,
    Math.ceil(dotSizePx / 2) + 4,
    width * 0.49,
  );
  const dotTrackRadiusPx = Math.max(0, boundaryRadiusPx - dotSizePx / 2);
  return { dotSizePx, boundaryRadiusPx, dotTrackRadiusPx };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asColorInputValue(value, fallback) {
  const color = sanitizeCssColor(value, fallback);
  if (/^#[0-9a-fA-F]{6}$/.test(color)) return color;
  if (/^#[0-9a-fA-F]{3}$/.test(color)) {
    const c = color.slice(1);
    return `#${c[0]}${c[0]}${c[1]}${c[1]}${c[2]}${c[2]}`;
  }
  if (/^#[0-9a-fA-F]{8}$/.test(color)) return `#${color.slice(1, 7)}`;
  return fallback;
}

function fmtOne(value) {
  if (!Number.isFinite(value)) return "0.0";
  return (Math.round(value * 10) / 10).toFixed(1);
}

function fmtTwo(value) {
  if (!Number.isFinite(value)) return "0.00";
  return (Math.round(value * 100) / 100).toFixed(2);
}

function shouldShowRaiseValue(corner) {
  return Boolean(corner && corner.raise !== null && !corner.levelOk);
}

class WitHaLovelaceCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = undefined;
    this._config = normalizeConfig({});
    this._domReady = false;
    this._nodes = {};
    this._currentMode = this._config.display.mode;
    this._cachedTrackedEntityIds = null;
    this._boundWrapperClick = this._onWrapperClick.bind(this);
    this._roundColorSignature = "";
    this._roundModel = null;
    this._smoothState = {
      pitch: null,
      roll: null,
      heading: null,
    };
    this._smoothTarget = {
      pitch: null,
      roll: null,
      heading: null,
    };
    this._rafId = 0;
    this._lastRafTs = 0;
    this._orientationCache = { value: false, ts: 0 };
  }

  static getStubConfig() {
    return {
      type: `custom:${CARD_TYPE}`,
      title: "",
    };
  }

  static getConfigElement() {
    return document.createElement("rv-ha-lovelace-card-editor");
  }

  setConfig(config) {
    if (!config || !isSupportedCardType(config.type)) {
      throw new Error(`Invalid configuration for ${CARD_TYPE}`);
    }
    this._stopAnimationLoop();
    const oldMode = this._currentMode;
    this._config = normalizeConfig(config);
    this._currentMode = this._config.display.mode;
    if (oldMode && oldMode !== this._currentMode) {
      this._domReady = false;
      this._nodes = {};
    }
    this._cachedTrackedEntityIds = null;
    this._roundColorSignature = "";
    this._miniRingColorSignature = "";
    this._rvTopSvgSignature = "";
    this._roundModel = null;
    this._smoothState = { pitch: null, roll: null, heading: null };
    this._smoothTarget = { pitch: null, roll: null, heading: null };
    this._render();
  }

  set hass(hass) {
    const previous = this._hass;
    this._hass = hass;
    const langChanged = resolveLanguage(previous) !== resolveLanguage(hass);
    if (!previous || langChanged || this._hasRelevantStateChanges(previous, hass)) {
      this._render();
    }
  }

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    this._stopAnimationLoop();
    if (this._nodes.wrapper) {
      this._nodes.wrapper.removeEventListener("click", this._boundWrapperClick);
    }
    this._domReady = false;
  }

  getCardSize() {
    const width = this.offsetWidth || this.getBoundingClientRect().width || 0;
    if (!width) return 8;
    const bodyHeight = (width * 6) / 5;
    const headerHeight = 56;
    return Math.max(8, Math.ceil((bodyHeight + headerHeight) / 50));
  }

  _lang() {
    return resolveLanguage(this._hass);
  }

  _t(key) {
    return t(this._lang(), key);
  }

  _displayColor(key, fallback = "transparent") {
    const value = String(this._config?.display?.[key] ?? "").trim();
    return value || fallback;
  }

  _emitMoreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: { entityId },
      bubbles: true,
      composed: true,
    }));
  }

  _trackedEntityIds() {
    if (this._cachedTrackedEntityIds) {
      return this._cachedTrackedEntityIds;
    }
    const ids = [
      this._config.entities?.pitch,
      this._config.entities?.roll,
      this._config.entities?.yaw,
      this._config.entities?.temperature,
      this._config.entities?.battery_soc,
    ].filter(Boolean);
    this._cachedTrackedEntityIds = [...new Set(ids)];
    return this._cachedTrackedEntityIds;
  }

  _hasRelevantStateChanges(previousHass, nextHass) {
    for (const entityId of this._trackedEntityIds()) {
      const before = previousHass?.states?.[entityId]?.state ?? null;
      const after = nextHass?.states?.[entityId]?.state ?? null;
      if (before !== after) return true;
    }
    return false;
  }

  _formatRawEntity(entityId, fallback = "--") {
    if (!entityId) return fallback;
    const stateObj = this._hass?.states?.[entityId];
    if (!stateObj || isStateUnavailable(stateObj)) return fallback;
    const unit = String(stateObj.attributes?.unit_of_measurement || "").trim();
    const value = String(stateObj.state || "").trim();
    return unit ? `${value}${unit}` : value;
  }

  _buildModel() {
    const pr = resolvePitchRoll(this._hass, this._config, this._isLandscapeCached());
    const safePitch = pr.valid ? clampTiltForLeveling(pr.pitch) : null;
    const safeRoll = pr.valid ? clampTiltForLeveling(pr.roll) : null;
    const level = pr.valid ? computeLeveling(safePitch, safeRoll, this._config.geometry) : null;
    const maxTilt = this._config.display.max_tilt_deg || DEFAULT_DISPLAY.max_tilt_deg;

    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const rawDotNx = pr.valid ? clamp((-pr.roll) / maxTilt) : 0;
    const rawDotNy = pr.valid ? clamp((-pr.pitch) / maxTilt) : 0;
    const dot = projectToUnitCircle(rawDotNx, rawDotNy);

    const tolCm = this._config.display.level_tolerance_cm;
    const rawYaw = readNumericState(this._hass, this._config.entities.yaw);
    let heading = 0;
    let yaw = null;
    if (rawYaw !== null) {
      const mappedYaw = this._config.orientation.invert_yaw ? -rawYaw : rawYaw;
      yaw = normalize360(mappedYaw + this._config.orientation.yaw_offset_deg);
      heading = yaw;
    }
    const tiltMagnitude = pr.valid ? Math.max(Math.abs(pr.pitch), Math.abs(pr.roll)) : null;
    const compassReliable = Boolean(
      tiltMagnitude !== null
      && tiltMagnitude <= this._config.display.compass_unreliable_tilt_deg,
    );

    // computeLeveling returns mm; convert to cm for UI display/tolerance.
    const corners = {
      fl: {
        raise: level ? level.raise_fl / 10 : null,
        levelOk: Boolean(level && (level.raise_fl / 10) <= tolCm),
      },
      fr: {
        raise: level ? level.raise_fr / 10 : null,
        levelOk: Boolean(level && (level.raise_fr / 10) <= tolCm),
      },
      rl: {
        raise: level ? level.raise_rl / 10 : null,
        levelOk: Boolean(level && (level.raise_rl / 10) <= tolCm),
      },
      rr: {
        raise: level ? level.raise_rr / 10 : null,
        levelOk: Boolean(level && (level.raise_rr / 10) <= tolCm),
      },
    };

    return {
      valid: pr.valid,
      pitch: pr.pitch,
      roll: pr.roll,
      yaw,
      yawAvailable: yaw !== null,
      heading,
      ringRotationDeg: -heading,
      tiltMagnitude,
      compassReliable,
      dotNx: dot.x,
      dotNy: dot.y,
      corners,
      tempText: this._formatRawEntity(this._config.entities.temperature, this._t("not_available")),
      battText: this._formatRawEntity(this._config.entities.battery_soc, this._t("not_available")),
    };
  }

  _textModeFactor() {
    const mode = normalizeTextSizeMode(this._config?.display?.text_size_mode);
    return TEXT_SIZE_MODE_FACTORS[mode] || TEXT_SIZE_MODE_FACTORS.auto;
  }

  _onWrapperClick(ev) {
    const clickable = ev.target?.closest?.("[data-entity-key]");
    if (!clickable) return;
    const key = String(clickable.dataset.entityKey || "");
    const entityId = this._config.entities?.[key] || "";
    if (entityId) this._emitMoreInfo(entityId);
  }

  _isLandscapeCached() {
    const now = Date.now();
    if (now - this._orientationCache.ts > 500) {
      this._orientationCache.value = isLandscapeOrientation();
      this._orientationCache.ts = now;
    }
    return this._orientationCache.value;
  }

  _stopAnimationLoop() {
    if (this._rafId) {
      if (typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(this._rafId);
      }
      this._rafId = 0;
    }
    this._lastRafTs = 0;
  }

  _ensureRoundRingSvg() {
    const d = this._config.display;
    const signature = [
      d.ring_background_color,
      d.ring_tick_color,
      d.ring_major_tick_color,
      d.ring_cardinal_color,
    ].join("|");
    if (signature === this._roundColorSignature) return;
    this._roundColorSignature = signature;
    if (this._nodes.ringRotor) {
      this._nodes.ringRotor.innerHTML = this._buildCompassRingSvg();
    }
  }

  _syncRoundTargets(model) {
    this._roundModel = model;
    if (model.pitch === null || model.roll === null) {
      this._smoothTarget.pitch = null;
      this._smoothTarget.roll = null;
    } else {
      this._smoothTarget.pitch = model.pitch;
      this._smoothTarget.roll = model.roll;
      if (this._smoothState.pitch === null || this._smoothState.roll === null) {
        this._smoothState.pitch = model.pitch;
        this._smoothState.roll = model.roll;
      }
    }

    if (!model.yawAvailable) {
      this._smoothTarget.heading = null;
      this._smoothState.heading = null;
      return;
    }
    const targetHeading = model.heading;
    if (this._smoothState.heading === null) {
      this._smoothState.heading = targetHeading;
      this._smoothTarget.heading = targetHeading;
      return;
    }
    const currentNorm = normalize360(this._smoothState.heading);
    const delta = shortestAngleDelta(currentNorm, targetHeading);
    this._smoothTarget.heading = this._smoothState.heading + delta;
    if (Math.abs(this._smoothState.heading) > 3600) {
      this._smoothState.heading = normalize360(this._smoothState.heading);
      const recalculatedDelta = shortestAngleDelta(this._smoothState.heading, targetHeading);
      this._smoothTarget.heading = this._smoothState.heading + recalculatedDelta;
    }
  }

  _startAnimationLoop() {
    if (this._rafId) return;
    if (typeof requestAnimationFrame !== "function") {
      this._dispatchDynamicRender();
      return;
    }
    const tick = (ts) => {
      this._rafId = 0;
      if (!this._domReady || !this._roundModel) return;

      const prevTs = this._lastRafTs || ts;
      const dt = Math.max(1, Math.min(120, ts - prevTs));
      this._lastRafTs = ts;

      const baseAlpha = this._config.display.smooth_alpha;
      const frameAlpha = 1 - Math.pow(1 - baseAlpha, dt / 16.6667);
      let moving = false;
      const eps = 0.01;

      for (const key of ["pitch", "roll", "heading"]) {
        const target = this._smoothTarget[key];
        if (target === null || target === undefined) continue;
        if (!Number.isFinite(this._smoothState[key])) {
          this._smoothState[key] = target;
          continue;
        }
        const diff = target - this._smoothState[key];
        if (Math.abs(diff) <= eps) {
          this._smoothState[key] = target;
          continue;
        }
        this._smoothState[key] += diff * frameAlpha;
        moving = true;
      }

      this._dispatchDynamicRender();
      if (moving) {
        this._rafId = requestAnimationFrame(tick);
      }
    };
    this._rafId = requestAnimationFrame(tick);
  }

  _roundRenderValues() {
    const model = this._roundModel;
    if (!model) return null;
    const pitch = this._smoothState.pitch ?? model.pitch ?? 0;
    const roll = this._smoothState.roll ?? model.roll ?? 0;
    const heading = this._smoothState.heading;

    const maxTilt = this._config.display.max_tilt_deg || DEFAULT_DISPLAY.max_tilt_deg;
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const rawNx = model.valid ? clamp((-roll) / maxTilt) : 0;
    const rawNy = model.valid ? clamp((-pitch) / maxTilt) : 0;
    const dot = projectToUnitCircle(rawNx, rawNy);
    const normalizedHeading = heading === null || heading === undefined ? 0 : normalize360(heading);

    return {
      pitch: model.valid ? pitch : null,
      roll: model.valid ? roll : null,
      yaw: model.yawAvailable ? normalizedHeading : null,
      ringRotationDeg: -normalizedHeading,
      dotNx: dot.x,
      dotNy: dot.y,
    };
  }

  _hasValidDomReferences() {
    if (!this._domReady || !this.shadowRoot) return false;
    if (!this._nodes || !this._nodes.wrapper) return false;
    if (this._nodes.mode !== this._config.display.mode) return false;
    if (typeof this.shadowRoot.contains === "function" && !this.shadowRoot.contains(this._nodes.wrapper)) return false;
    return true;
  }

  _ensureDom() {
    if (this._hasValidDomReferences()) return;
    if (this._config.display.mode === "round_compass") {
      this._ensureDomRoundCompass();
      return;
    }
    this._ensureDomRvTop();
  }

  _ensureDomRvTop() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card { overflow: hidden; }
        .wrapper.rv-top {
          display: flex;
          flex-direction: column;
          background: #9bc4d6;
          border-radius: 16px;
          padding: 12px 10px 10px;
          box-sizing: border-box;
          overflow: hidden;
          aspect-ratio: 5 / 6;
        }
        .rv-top-head {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          min-height: 32px;
        }
        .head-value {
          font-family: Arial, sans-serif;
          color: #111;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 60px;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        .head-value.right { grid-column: 2; text-align: right; justify-self: end; }
        .head-value.left { grid-column: 1; text-align: left; justify-self: start; }
        .head-icon { margin-right: 3px; }
        .temp .head-icon {
          display: inline-block;
          transform: rotate(18deg);
          transform-origin: 50% 55%;
        }
        .rv-title {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          font-family: Arial, sans-serif;
          color: #111;
          text-align: center;
          font-size: 18px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 54%;
          pointer-events: none;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        .clickable { cursor: pointer; }
        .rv-top-body {
          position: relative;
          width: 100%;
          flex: 1;
          min-height: 0;
        }
        .rv-svg-container {
          position: absolute;
          top: 2%; bottom: 4%; left: 16%; right: 16%;
        }
        .rv-svg-container svg { width: 100%; height: 100%; display: block; }
        .wheel-indicator {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          z-index: 3;
        }
        .wheel-indicator.fl { top: 23%; left: 18%; }
        .wheel-indicator.fr { top: 23%; right: 18%; }
        .wheel-indicator.rl { bottom: 24%; left: 18%; }
        .wheel-indicator.rr { bottom: 24%; right: 18%; }
        .wheel-dot {
          width: 16px; height: 16px;
          box-shadow: 0 0 6px rgba(0,0,0,0.3);
          border-radius: 50%;
          background: #00c853;
          clip-path: none;
        }
        .wheel-dot.needs-raise {
          border-radius: 2px;
          clip-path: polygon(50% 0%, 100% 58%, 73% 58%, 73% 100%, 27% 100%, 27% 58%, 0% 58%);
        }
        .wheel-value {
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          text-align: center;
        }
        .mini-compass {
          position: absolute;
          left: 50%; top: 48%;
          transform: translate(-50%, -50%);
          width: 42%;
          aspect-ratio: 1 / 1;
          z-index: 2;
        }
        .mini-ring-rotor {
          position: absolute;
          inset: 0;
          transform: rotate(0deg);
          transform-origin: 50% 50%;
        }
        .mini-ring-rotor svg { width: 100%; height: 100%; display: block; }
        .mini-compass-index {
          position: absolute;
          left: 50%; top: 2%;
          transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 9px solid #f4f091;
          filter: drop-shadow(0 0 1px rgba(0,0,0,0.8));
          z-index: 4;
        }
        .mini-level-circle {
          position: absolute;
          left: 50%; top: 50%;
          width: 62%; height: 62%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(circle at 50% 36%, rgba(255,255,255,0.42), rgba(255,255,255,0) 35%),
            radial-gradient(circle at 50% 50%, #e8ff84 0%, #d6ee65 46%, #c3de41 100%);
          border: 1.5px solid rgba(18,24,16,0.72);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.24), 0 0 8px rgba(0,0,0,0.3);
          overflow: hidden;
          z-index: 3;
        }
        .mini-level-ring {
          position: absolute;
          left: 50%; top: 50%;
          border: 1px solid rgba(255,255,255,0.35);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .mini-level-ring.r1 { width: 88%; height: 88%; }
        .mini-level-ring.r2 { width: 62%; height: 62%; }
        .mini-level-ring.r3 { width: 34%; height: 34%; }
        .mini-cross {
          position: absolute;
          background: rgba(20,27,19,0.6);
        }
        .mini-cross.v { top: 0; bottom: 0; left: 50%; width: 1px; transform: translateX(-50%); }
        .mini-cross.h { left: 0; right: 0; top: 50%; height: 1px; transform: translateY(-50%); }
        .mini-dot {
          position: absolute;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #ff2a1f;
          border: 1.5px solid #2a211f;
          box-shadow: 0 0 6px rgba(0,0,0,0.4);
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          z-index: 4;
          pointer-events: none;
          box-sizing: border-box;
          clip-path: circle(50% at 50% 50%);
        }
        .angle-display {
          position: absolute;
          font-family: Arial, sans-serif;
          z-index: 3;
          text-align: center;
        }
        .angle-display .angle-label {
          display: block;
          font-size: 11px;
          opacity: 0.7;
          margin-bottom: 2px;
        }
        .angle-display .angle-value {
          display: block;
          font-size: 18px;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }
        .angle-display.angle-x {
          right: 1%;
          top: 50%;
          transform: translateY(-50%);
        }
        .angle-display.angle-y {
          bottom: 1%;
          left: 50%;
          transform: translateX(-50%);
        }
        .rv-top-status {
          margin-top: 6px;
          font-family: Arial, sans-serif;
          color: #111;
          font-size: 13px;
          text-align: center;
          min-height: 18px;
          line-height: 1.2;
        }
        .sensor-axes-badge {
          margin: 4px auto 0;
          width: 64px;
          height: 64px;
          opacity: 0.92;
        }
        .sensor-axes-badge svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      </style>
      <ha-card>
        <div class="wrapper rv-top">
          <div class="rv-top-head">
            <div class="head-value left clickable temp" data-entity-key="temperature">
              <span class="head-icon">\u{1F321}</span><span class="head-text"></span>
            </div>
            <div class="rv-title"></div>
            <div class="head-value right clickable batt" data-entity-key="battery_soc">
              <span class="head-icon">\u{1F50B}</span><span class="head-text"></span>
            </div>
          </div>
          <div class="rv-top-body">
            <div class="rv-svg-container">${this._buildRvTopSvg()}</div>

            <div class="wheel-indicator fl">
              <span class="wheel-dot"></span>
              <span class="wheel-value"></span>
            </div>
            <div class="wheel-indicator fr">
              <span class="wheel-dot"></span>
              <span class="wheel-value"></span>
            </div>
            <div class="wheel-indicator rl">
              <span class="wheel-dot"></span>
              <span class="wheel-value"></span>
            </div>
            <div class="wheel-indicator rr">
              <span class="wheel-dot"></span>
              <span class="wheel-value"></span>
            </div>

            <div class="mini-compass">
              <div class="mini-ring-rotor">${this._buildCompassRingSvg()}</div>
              <div class="mini-compass-index"></div>
              <div class="mini-level-circle">
                <div class="mini-level-ring r1"></div>
                <div class="mini-level-ring r2"></div>
                <div class="mini-level-ring r3"></div>
                <div class="mini-cross v"></div>
                <div class="mini-cross h"></div>
                <div class="mini-dot"></div>
              </div>
            </div>

            <div class="angle-display angle-x clickable" data-entity-key="pitch">
              <span class="angle-label"></span>
              <span class="angle-value"></span>
            </div>
            <div class="angle-display angle-y clickable" data-entity-key="roll">
              <span class="angle-label"></span>
              <span class="angle-value"></span>
            </div>
          </div>
          <div class="rv-top-status"></div>
          <div class="sensor-axes-badge">${this._buildSensorAxesSvg()}</div>
        </div>
      </ha-card>
    `;

    const wrapper = this.shadowRoot.querySelector(".wrapper");
    wrapper.addEventListener("click", this._boundWrapperClick);

    this._nodes = {
      mode: "rv_top",
      wrapper,
      temp: this.shadowRoot.querySelector(".temp"),
      tempText: this.shadowRoot.querySelector(".temp .head-text"),
      batt: this.shadowRoot.querySelector(".batt"),
      battText: this.shadowRoot.querySelector(".batt .head-text"),
      title: this.shadowRoot.querySelector(".rv-title"),
      rvSvgContainer: this.shadowRoot.querySelector(".rv-svg-container"),
      wheelDotFL: this.shadowRoot.querySelector(".wheel-indicator.fl .wheel-dot"),
      wheelDotFR: this.shadowRoot.querySelector(".wheel-indicator.fr .wheel-dot"),
      wheelDotRL: this.shadowRoot.querySelector(".wheel-indicator.rl .wheel-dot"),
      wheelDotRR: this.shadowRoot.querySelector(".wheel-indicator.rr .wheel-dot"),
      wheelValFL: this.shadowRoot.querySelector(".wheel-indicator.fl .wheel-value"),
      wheelValFR: this.shadowRoot.querySelector(".wheel-indicator.fr .wheel-value"),
      wheelValRL: this.shadowRoot.querySelector(".wheel-indicator.rl .wheel-value"),
      wheelValRR: this.shadowRoot.querySelector(".wheel-indicator.rr .wheel-value"),
      miniRingRotor: this.shadowRoot.querySelector(".mini-ring-rotor"),
      miniCompassIndex: this.shadowRoot.querySelector(".mini-compass-index"),
      miniLevelCircle: this.shadowRoot.querySelector(".mini-level-circle"),
      miniDot: this.shadowRoot.querySelector(".mini-dot"),
      angleXLabel: this.shadowRoot.querySelector(".angle-x .angle-label"),
      angleXValue: this.shadowRoot.querySelector(".angle-x .angle-value"),
      angleYLabel: this.shadowRoot.querySelector(".angle-y .angle-label"),
      angleYValue: this.shadowRoot.querySelector(".angle-y .angle-value"),
      compassStatus: this.shadowRoot.querySelector(".rv-top-status"),
    };
    this._domReady = true;
  }

  _buildCompassRingSvg() {
    const ringBg = escapeHtml(this._displayColor("ring_background_color"));
    const tick = escapeHtml(this._displayColor("ring_tick_color"));
    const majorTick = escapeHtml(this._displayColor("ring_major_tick_color"));
    const cardinalColor = escapeHtml(this._displayColor("ring_cardinal_color"));
    const ticks = [];
    const labels = [];
    for (let deg = 0; deg < 360; deg += 5) {
      const major = deg % 30 === 0;
      const rad = (deg - 90) * Math.PI / 180;
      const rOuter = 49;
      const rInner = major ? 42 : 45.5;
      const x1 = 50 + rInner * Math.cos(rad);
      const y1 = 50 + rInner * Math.sin(rad);
      const x2 = 50 + rOuter * Math.cos(rad);
      const y2 = 50 + rOuter * Math.sin(rad);
      ticks.push(
        `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${major ? majorTick : tick}" stroke-width="${major ? "0.6" : "0.35"}" />`,
      );
      if (deg % 90 === 0) {
        const cardinal = ["N", "E", "S", "W"][deg / 90];
        const rl = 37.5;
        const xl = 50 + rl * Math.cos(rad);
        const yl = 50 + rl * Math.sin(rad);
        labels.push(
          `<text x="${xl.toFixed(2)}" y="${yl.toFixed(2)}" fill="${cardinalColor}" text-anchor="middle" dominant-baseline="middle" font-size="6.3" font-family="Arial" font-weight="700">${cardinal}</text>`,
        );
      } else if (deg % 30 === 0) {
        const rl = 37.8;
        const xl = 50 + rl * Math.cos(rad);
        const yl = 50 + rl * Math.sin(rad);
        labels.push(
          `<text x="${xl.toFixed(2)}" y="${yl.toFixed(2)}" fill="${majorTick}" text-anchor="middle" dominant-baseline="middle" font-size="3.2" font-family="Arial">${deg}</text>`,
        );
      }
    }
    return `
      <svg viewBox="0 0 100 100" role="img" aria-hidden="true">
        <circle cx="50" cy="50" r="49.5" fill="${ringBg}" stroke="#222938" stroke-width="0.9" />
        ${ticks.join("")}
        ${labels.join("")}
      </svg>
    `;
  }

  _buildSensorAxesSvg() {
    const labelColor = escapeHtml(this._displayColor("text_color"));
    return `
      <svg viewBox="0 0 64 64" role="img" aria-label="Sensor orientation axes" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.22)" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
        <circle cx="32" cy="32" r="3.2" fill="rgba(25,25,25,0.72)"/>

        <line x1="32" y1="32" x2="52" y2="32" stroke="#e53935" stroke-width="2.2" stroke-linecap="round"/>
        <polygon points="56,32 50,28.5 50,35.5" fill="#e53935"/>
        <text x="57.5" y="29.2" font-size="8.5" font-family="Arial, sans-serif" fill="${labelColor}">X</text>

        <line x1="32" y1="32" x2="32" y2="12" stroke="#1fbf4c" stroke-width="2.2" stroke-linecap="round"/>
        <polygon points="32,8 28.5,14 35.5,14" fill="#1fbf4c"/>
        <text x="35.3" y="11" font-size="8.5" font-family="Arial, sans-serif" fill="${labelColor}">Y</text>

        <line x1="32" y1="32" x2="17.5" y2="46.5" stroke="#1e88e5" stroke-width="2.2" stroke-linecap="round"/>
        <polygon points="14.2,49.8 16.2,43.2 20.8,47.8" fill="#1e88e5"/>
        <text x="10.6" y="53.6" font-size="8.5" font-family="Arial, sans-serif" fill="${labelColor}">Z</text>
      </svg>
    `;
  }

  _buildRvTopSvg() {
    const stroke = escapeHtml(this._displayColor("text_color"));
    const dimStroke = escapeHtml(this._displayColor("text_color"));
    return `
      <svg viewBox="0 0 100 150" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rv-shell" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(171,203,220,0.45)"/>
            <stop offset="100%" stop-color="rgba(145,181,199,0.38)"/>
          </linearGradient>
          <linearGradient id="rv-panel-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(67,75,94,0.95)"/>
            <stop offset="100%" stop-color="rgba(57,63,79,0.92)"/>
          </linearGradient>
          <linearGradient id="rv-window" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(161,198,216,0.56)"/>
            <stop offset="100%" stop-color="rgba(133,173,194,0.48)"/>
          </linearGradient>
        </defs>
        <g transform="translate(50 75) scale(1.16) translate(-50 -75)">
          <!-- Outer shell -->
          <path d="M31,25 Q31,13 50,13 Q69,13 69,25 L69,129 Q69,136 61.5,136 L38.5,136 Q31,136 31,129 Z"
                fill="url(#rv-shell)" stroke="${stroke}" stroke-width="1.25" stroke-linejoin="round"/>

          <!-- Front cab -->
          <path d="M34,28 Q34,20 50,20 Q66,20 66,28 L66,47 Q66,51 62,51 L38,51 Q34,51 34,47 Z"
                fill="rgba(150,186,206,0.45)" stroke="${dimStroke}" stroke-width="0.7"/>
          <path d="M39,31 Q44,26 50,26 Q56,26 61,31" fill="none" stroke="${dimStroke}" stroke-width="0.55" opacity="0.85"/>
          <circle cx="43" cy="35" r="1.35" fill="none" stroke="${dimStroke}" stroke-width="0.5"/>
          <circle cx="57" cy="35" r="1.35" fill="none" stroke="${dimStroke}" stroke-width="0.5"/>

          <!-- Seats -->
          <g transform="translate(0.6,0.6)">
            <rect x="39.5" y="38.3" width="8.2" height="12.4" rx="2.2" fill="rgba(66,73,92,0.95)" stroke="${stroke}" stroke-width="0.58" transform="rotate(-24 43.6 44.5)"/>
            <rect x="52.3" y="38.3" width="8.2" height="12.4" rx="2.2" fill="rgba(66,73,92,0.95)" stroke="${stroke}" stroke-width="0.58" transform="rotate(24 56.4 44.5)"/>
          </g>

          <!-- Side wall blocks -->
          <rect x="31.4" y="52.5" width="11.2" height="30.2" rx="1.4" fill="url(#rv-panel-dark)" stroke="${dimStroke}" stroke-width="0.45"/>
          <rect x="57.4" y="52.5" width="11.2" height="30.2" rx="1.4" fill="url(#rv-panel-dark)" stroke="${dimStroke}" stroke-width="0.45"/>
          <rect x="31.9" y="53.6" width="1.55" height="12" rx="0.6" fill="none" stroke="${dimStroke}" stroke-width="0.45" opacity="0.8"/>
          <rect x="31.9" y="67.6" width="1.55" height="12" rx="0.6" fill="none" stroke="${dimStroke}" stroke-width="0.45" opacity="0.8"/>
          <rect x="66.55" y="53.6" width="1.55" height="12" rx="0.6" fill="none" stroke="${dimStroke}" stroke-width="0.45" opacity="0.8"/>
          <rect x="66.55" y="67.6" width="1.55" height="12" rx="0.6" fill="none" stroke="${dimStroke}" stroke-width="0.45" opacity="0.8"/>

          <!-- Middle living area (without green target circle) -->
          <rect x="42.8" y="53.1" width="14.4" height="45" rx="3.3" fill="url(#rv-window)" stroke="${dimStroke}" stroke-width="0.55"/>
          <path d="M43.4,76.8 L56.6,76.8" stroke="${dimStroke}" stroke-width="0.45" opacity="0.55"/>

          <!-- Kitchen left -->
          <rect x="33.9" y="83.4" width="12.4" height="20.4" rx="1.4" fill="rgba(150,186,206,0.38)" stroke="${dimStroke}" stroke-width="0.52"/>
          <circle cx="37.2" cy="89.6" r="2.05" fill="none" stroke="${dimStroke}" stroke-width="0.55"/>
          <rect x="35.5" y="94.1" width="3.4" height="4.5" fill="none" stroke="${dimStroke}" stroke-width="0.45"/>
          <rect x="40.2" y="94.1" width="4.35" height="8.4" fill="none" stroke="${dimStroke}" stroke-width="0.45"/>
          <path d="M35.4,100.5 L38.9,100.5 M35.4,101.8 L38.9,101.8 M35.4,103.1 L38.9,103.1" stroke="${dimStroke}" stroke-width="0.33"/>

          <!-- Bathroom right -->
          <rect x="53.9" y="86.2" width="11.5" height="17.1" rx="1.2" fill="rgba(150,186,206,0.38)" stroke="${dimStroke}" stroke-width="0.52"/>
          <ellipse cx="59.2" cy="98.6" rx="2.2" ry="3.2" fill="none" stroke="${dimStroke}" stroke-width="0.45"/>
          <circle cx="60.5" cy="98.6" r="0.43" fill="${dimStroke}" opacity="0.85"/>
          <path d="M63.6,86.6 Q67.8,92.8 63.6,98.8" fill="none" stroke="${dimStroke}" stroke-width="0.38" opacity="0.72"/>
          <path d="M63.0,102.0 Q66.8,105.6 63.0,109.2" fill="none" stroke="${dimStroke}" stroke-width="0.38" opacity="0.6"/>

          <!-- Rear corridor + dark rear block -->
          <rect x="45.5" y="102.8" width="9.1" height="20.4" rx="1.2" fill="none" stroke="${dimStroke}" stroke-width="0.5"/>
          <rect x="31.6" y="111.5" width="36.8" height="24.2" rx="1.8" fill="url(#rv-panel-dark)" stroke="${dimStroke}" stroke-width="0.45"/>
          <path d="M50,111.9 L50,135.3" stroke="${dimStroke}" stroke-width="0.45" opacity="0.82"/>
          <rect x="36.3" y="122.6" width="9.1" height="6.7" rx="1.7" fill="none" stroke="rgba(185,205,219,0.75)" stroke-width="0.48"/>
          <rect x="54.6" y="122.6" width="9.1" height="6.7" rx="1.7" fill="none" stroke="rgba(185,205,219,0.75)" stroke-width="0.48"/>

          <!-- Center axis / helper lines -->
          <path d="M50,53.5 L50,110.8" stroke="${dimStroke}" stroke-width="0.33" opacity="0.48"/>
          <path d="M34.7,84.4 L65.3,84.4" stroke="${dimStroke}" stroke-width="0.33" opacity="0.48"/>
          <path d="M34.7,95.2 L65.3,95.2" stroke="${dimStroke}" stroke-width="0.33" opacity="0.48"/>
          <path d="M33.2,106.0 L66.8,106.0" stroke="${dimStroke}" stroke-width="0.33" opacity="0.42"/>
        </g>
      </svg>
    `;
  }

  _ensureRvTopSvg() {
    const sig = this._config.display.text_color;
    if (sig === this._rvTopSvgSignature) return;
    this._rvTopSvgSignature = sig;
    if (this._nodes.rvSvgContainer) {
      this._nodes.rvSvgContainer.innerHTML = this._buildRvTopSvg();
    }
  }

  _ensureMiniRingSvg() {
    const d = this._config.display;
    const sig = [
      d.ring_background_color,
      d.ring_tick_color,
      d.ring_major_tick_color,
      d.ring_cardinal_color,
    ].join("|");
    if (sig === this._miniRingColorSignature) return;
    this._miniRingColorSignature = sig;
    if (this._nodes.miniRingRotor) {
      this._nodes.miniRingRotor.innerHTML = this._buildCompassRingSvg();
    }
  }

  _ensureDomRoundCompass() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card { overflow: hidden; }
        .wrapper.round {
          position: relative;
          background: #9bc4d6;
          border-radius: 16px;
          padding: 12px 10px 10px;
          box-sizing: border-box;
          overflow: hidden;
          aspect-ratio: 5 / 6;
          display: flex;
          flex-direction: column;
        }
        .round-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 1;
        }
        .round-overlay {
          position: relative;
          z-index: 2;
          transform-origin: 50% 50%;
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        .round-head {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          min-height: 32px;
        }
        .head-value {
          font-family: Arial, sans-serif;
          color: #111;
          text-shadow: none;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 70px;
        }
        .head-value.right {
          grid-column: 2;
          text-align: right;
          justify-self: end;
        }
        .head-value.left {
          grid-column: 1;
          text-align: left;
          justify-self: start;
        }
        .head-icon { margin-right: 3px; }
        .temp .head-icon {
          display: inline-block;
          transform: rotate(18deg);
          transform-origin: 50% 55%;
        }
        .title {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-family: Arial, sans-serif;
          color: #111;
          text-align: center;
          font-size: 20px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 58%;
          pointer-events: none;
          text-shadow: none;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        .clickable { cursor: pointer; }
        .compass-wrapper {
          position: relative;
          width: min(100%, 73%);
          margin: 0 auto;
          aspect-ratio: 1 / 1;
          flex: 0 0 auto;
        }
        .ring-rotor {
          position: absolute;
          inset: 0;
          transform: rotate(0deg);
          transform-origin: 50% 50%;
        }
        .ring-rotor svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .compass-index {
          position: absolute;
          left: 50%;
          top: 2.1%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 14px solid #f4f091;
          filter: drop-shadow(0 0 2px rgba(0,0,0,0.8));
          z-index: 4;
        }
        .level-circle {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 64%;
          height: 64%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(circle at 50% 36%, rgba(255,255,255,0.42), rgba(255,255,255,0) 35%),
            radial-gradient(circle at 50% 50%, #e8ff84 0%, #d6ee65 46%, #c3de41 100%);
          border: 2px solid rgba(18,24,16,0.72);
          box-shadow: inset 0 0 0 2px rgba(255,255,255,0.24), 0 0 14px rgba(0,0,0,0.4);
          overflow: hidden;
          z-index: 3;
        }
        .level-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(255,255,255,0.42);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .level-ring.r1 { width: 88%; height: 88%; }
        .level-ring.r2 { width: 62%; height: 62%; }
        .level-ring.r3 { width: 34%; height: 34%; }
        .cross {
          position: absolute;
          background: rgba(20,27,19,0.72);
        }
        .cross.v { top: 0; bottom: 0; left: 50%; width: 2px; transform: translateX(-50%); }
        .cross.h { left: 0; right: 0; top: 50%; height: 2px; transform: translateY(-50%); }
        .dot {
          position: absolute;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #ff2a1f;
          border: 2px solid #2a211f;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 4;
          pointer-events: none;
          box-sizing: border-box;
          clip-path: circle(50% at 50% 50%);
        }
        .value-panel {
          margin-top: 8px;
          border-top: 1px solid rgba(172,180,203,0.22);
          padding-top: 6px;
          font-family: Arial, sans-serif;
        }
        .value-panel.shift-down {
          margin-top: 28px;
        }
        .value-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          padding: 6px 4px;
          color: #111;
          border-bottom: 1px solid rgba(172,180,203,0.12);
          font-size: 16px;
          line-height: 1.2;
        }
        .value-row:last-child { border-bottom: 0; }
        .value-label { opacity: 0.95; }
        .value-number {
          font-variant-numeric: tabular-nums;
          justify-self: end;
          opacity: 0.98;
        }
        .status-row {
          margin-top: 6px;
          font-family: Arial, sans-serif;
          color: #111;
          font-size: 12px;
          text-align: center;
          min-height: 14px;
          line-height: 1.2;
        }
        .sensor-axes-badge {
          margin: 6px auto 0;
          width: 58px;
          height: 58px;
          opacity: 0.9;
        }
        .sensor-axes-badge svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .corner-grid {
          margin-top: 6px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px 8px;
          font-family: Arial, sans-serif;
        }
        .corner-cell {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 6px;
          align-items: center;
          min-width: 0;
          color: #111;
          font-size: 13px;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 8px;
          padding: 3px 6px;
          background: rgba(255,255,255,0.28);
        }
        .corner-cell .corner-key { font-weight: 600; opacity: 0.9; }
        .corner-cell .corner-value {
          justify-self: end;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        .corner-cell .corner-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #00c853;
          clip-path: none;
        }
        .corner-cell .corner-indicator.needs-raise {
          border-radius: 2px;
          clip-path: polygon(50% 0%, 100% 58%, 73% 58%, 73% 100%, 27% 100%, 27% 58%, 0% 58%);
        }
      </style>
      <ha-card>
        <div class="wrapper round">
          <img class="round-bg" alt="" />
          <div class="round-head">
            <div class="head-value left clickable temp" data-entity-key="temperature">
              <span class="head-icon">\u{1F321}</span><span class="head-text"></span>
            </div>
            <div class="title"></div>
            <div class="head-value right clickable batt" data-entity-key="battery_soc">
              <span class="head-icon">\u{1F50B}</span><span class="head-text"></span>
            </div>
          </div>
          <div class="round-overlay">
          <div class="compass-wrapper">
            <div class="ring-rotor">${this._buildCompassRingSvg()}</div>
            <div class="compass-index"></div>
            <div class="level-circle">
              <div class="level-ring r1"></div>
              <div class="level-ring r2"></div>
              <div class="level-ring r3"></div>
              <div class="cross v"></div>
              <div class="cross h"></div>
              <div class="dot"></div>
            </div>
          </div>
          <div class="value-panel">
            <div class="value-row clickable" data-entity-key="pitch">
              <span class="value-label angle-x-label"></span>
              <span class="value-number angle-x-value"></span>
            </div>
            <div class="value-row clickable" data-entity-key="roll">
              <span class="value-label angle-y-label"></span>
              <span class="value-number angle-y-value"></span>
            </div>
            <div class="value-row clickable" data-entity-key="yaw">
              <span class="value-label angle-z-label"></span>
              <span class="value-number angle-z-value"></span>
            </div>
          </div>
          <div class="corner-grid">
            <div class="corner-cell corner-fl">
              <span class="corner-key">FL</span>
              <span class="corner-value"></span>
              <span class="corner-indicator"></span>
            </div>
            <div class="corner-cell corner-fr">
              <span class="corner-key">FR</span>
              <span class="corner-value"></span>
              <span class="corner-indicator"></span>
            </div>
            <div class="corner-cell corner-rl">
              <span class="corner-key">RL</span>
              <span class="corner-value"></span>
              <span class="corner-indicator"></span>
            </div>
            <div class="corner-cell corner-rr">
              <span class="corner-key">RR</span>
              <span class="corner-value"></span>
              <span class="corner-indicator"></span>
            </div>
          </div>
          <div class="status-row compass-status"></div>
          <div class="sensor-axes-badge">${this._buildSensorAxesSvg()}</div>
          </div>
        </div>
      </ha-card>
    `;
    const wrapper = this.shadowRoot.querySelector(".wrapper");
    wrapper.addEventListener("click", this._boundWrapperClick);
    this._nodes = {
      mode: "round_compass",
      wrapper,
      roundBg: this.shadowRoot.querySelector(".round-bg"),
      roundOverlay: this.shadowRoot.querySelector(".round-overlay"),
      temp: this.shadowRoot.querySelector(".temp"),
      tempText: this.shadowRoot.querySelector(".temp .head-text"),
      batt: this.shadowRoot.querySelector(".batt"),
      battText: this.shadowRoot.querySelector(".batt .head-text"),
      title: this.shadowRoot.querySelector(".title"),
      ringRotor: this.shadowRoot.querySelector(".ring-rotor"),
      compassIndex: this.shadowRoot.querySelector(".compass-index"),
      levelCircle: this.shadowRoot.querySelector(".level-circle"),
      dot: this.shadowRoot.querySelector(".dot"),
      cornerGrid: this.shadowRoot.querySelector(".corner-grid"),
      cornerFL: this.shadowRoot.querySelector(".corner-fl"),
      cornerFR: this.shadowRoot.querySelector(".corner-fr"),
      cornerRL: this.shadowRoot.querySelector(".corner-rl"),
      cornerRR: this.shadowRoot.querySelector(".corner-rr"),
      angleXLabel: this.shadowRoot.querySelector(".angle-x-label"),
      angleYLabel: this.shadowRoot.querySelector(".angle-y-label"),
      angleZLabel: this.shadowRoot.querySelector(".angle-z-label"),
      angleXValue: this.shadowRoot.querySelector(".angle-x-value"),
      angleYValue: this.shadowRoot.querySelector(".angle-y-value"),
      angleZValue: this.shadowRoot.querySelector(".angle-z-value"),
      valuePanel: this.shadowRoot.querySelector(".value-panel"),
      compassStatus: this.shadowRoot.querySelector(".compass-status"),
    };
    this._domReady = true;
  }

  _dispatchDynamicRender() {
    if (this._config.display.mode === "round_compass") {
      this._renderRoundDynamic();
    } else {
      this._renderRvTopDynamic();
    }
  }

  _update() {
    if (!this._domReady) return;
    if (this._config.display.mode === "round_compass") {
      this._updateRoundCompass();
      return;
    }
    this._updateRvTop();
  }

  _updateRvTop() {
    const title = String(this._config.title || "").trim();
    const model = this._buildModel();
    this._syncRoundTargets(model);

    this._ensureRvTopSvg();
    if (this._config.display.show_compass_ring) {
      this._ensureMiniRingSvg();
    }

    const width = this._nodes.wrapper?.clientWidth || this._nodes.wrapper?.offsetWidth || 440;
    const autoScale = clampNumber(width / 440, 0.62, 1.12, 1);
    const modeScale = this._textModeFactor();
    const scale = clampNumber(autoScale * modeScale, 0.62, 1.32, 1);

    const titlePx = clampInt(18 * scale, 12, 28);
    const infoPx = clampInt(14 * scale, 10, 20);
    const anglePx = clampInt(18 * scale, 12, 28);
    const angleLabelPx = clampInt(11 * scale, 9, 15);
    const wheelValuePx = clampInt(12 * scale, 9, 16);
    const textColor = this._displayColor("text_color");
    const levelOkColor = this._displayColor("level_ok_color");
    const raiseColor = this._displayColor("raise_color");
    const levelHighlightColor = this._displayColor("level_highlight_color");
    const levelStartColor = this._displayColor("level_gradient_start");
    const levelMidColor = this._displayColor("level_gradient_mid");
    const levelEndColor = this._displayColor("level_gradient_end");
    const dotColor = this._displayColor("dot_color");
    const dotBorderColor = this._displayColor("dot_border_color");
    const crosshairColor = this._displayColor("crosshair_color");

    this._nodes.wrapper.style.background = this._displayColor("background_color");

    this._nodes.title.textContent = title;
    this._nodes.title.hidden = !title;
    this._nodes.title.style.fontSize = `${titlePx}px`;
    this._nodes.title.style.color = textColor;

    this._nodes.temp.hidden = !this._config.display.show_temperature;
    this._nodes.batt.hidden = !this._config.display.show_battery;
    this._nodes.tempText.textContent = model.tempText;
    this._nodes.battText.textContent = model.battText;
    this._nodes.temp.style.fontSize = `${infoPx}px`;
    this._nodes.batt.style.fontSize = `${infoPx}px`;
    this._nodes.temp.style.color = textColor;
    this._nodes.batt.style.color = textColor;

    const showCorners = this._config.display.show_corner_values;
    const applyWheel = (dotNode, valNode, corner) => {
      dotNode.parentElement.hidden = !showCorners;
      if (!showCorners) {
        valNode.hidden = true;
        valNode.style.display = "none";
        return;
      }
      const needsRaise = shouldShowRaiseValue(corner);
      dotNode.classList.toggle("needs-raise", needsRaise);
      dotNode.style.background = needsRaise ? raiseColor : levelOkColor;
      const value = corner.raise === null ? 0 : corner.raise;
      valNode.hidden = !needsRaise;
      valNode.style.display = needsRaise ? "" : "none";
      valNode.textContent = needsRaise ? `${fmtOne(value)} ${this._t("unit_cm")}` : "";
      valNode.style.fontSize = `${wheelValuePx}px`;
      valNode.style.color = textColor;
    };
    applyWheel(this._nodes.wheelDotFL, this._nodes.wheelValFL, model.corners.fl);
    applyWheel(this._nodes.wheelDotFR, this._nodes.wheelValFR, model.corners.fr);
    applyWheel(this._nodes.wheelDotRL, this._nodes.wheelValRL, model.corners.rl);
    applyWheel(this._nodes.wheelDotRR, this._nodes.wheelValRR, model.corners.rr);

    this._nodes.miniRingRotor.hidden = !this._config.display.show_compass_ring;
    this._nodes.miniCompassIndex.hidden = !this._config.display.show_compass_ring;
    this._nodes.miniLevelCircle.style.background = `
      radial-gradient(circle at 50% 36%, ${levelHighlightColor}, rgba(255,255,255,0) 35%),
      radial-gradient(circle at 50% 50%, ${levelStartColor} 0%, ${levelMidColor} 46%, ${levelEndColor} 100%)
    `;
    this._nodes.miniDot.style.background = dotColor;
    this._nodes.miniDot.style.borderColor = dotBorderColor;
    const miniCrossNodes = this.shadowRoot.querySelectorAll(".mini-cross");
    for (const node of miniCrossNodes) node.style.background = crosshairColor;

    const showAngles = this._config.display.show_angle_panel;
    this._nodes.angleXLabel.parentElement.hidden = !showAngles;
    this._nodes.angleYLabel.parentElement.hidden = !showAngles;
    if (showAngles) {
      this._nodes.angleXLabel.textContent = this._t("angle_x");
      this._nodes.angleYLabel.textContent = this._t("angle_y");
      this._nodes.angleXLabel.style.fontSize = `${angleLabelPx}px`;
      this._nodes.angleYLabel.style.fontSize = `${angleLabelPx}px`;
      this._nodes.angleXValue.style.fontSize = `${anglePx}px`;
      this._nodes.angleYValue.style.fontSize = `${anglePx}px`;
      this._nodes.angleXLabel.style.color = textColor;
      this._nodes.angleYLabel.style.color = textColor;
      this._nodes.angleXValue.style.color = textColor;
      this._nodes.angleYValue.style.color = textColor;
    }

    if (this._config.display.show_compass_status && model.yawAvailable && !model.compassReliable) {
      this._nodes.compassStatus.textContent = this._t("compass_reliability_hint");
      this._nodes.compassStatus.hidden = false;
    } else {
      this._nodes.compassStatus.textContent = "";
      this._nodes.compassStatus.hidden = true;
    }
    this._nodes.compassStatus.style.color = textColor;

    this._renderRvTopDynamic();
    this._startAnimationLoop();
  }

  _renderRvTopDynamic() {
    const model = this._roundModel;
    if (!model || this._config.display.mode !== "rv_top") return;
    const render = this._roundRenderValues();
    if (!render) return;

    this._nodes.angleXValue.textContent = render.pitch !== null
      ? `${fmtTwo(render.pitch)} ${this._t("unit_deg")}`
      : `${this._t("not_available")} ${this._t("unit_deg")}`;
    this._nodes.angleYValue.textContent = render.roll !== null
      ? `${fmtTwo(render.roll)} ${this._t("unit_deg")}`
      : `${this._t("not_available")} ${this._t("unit_deg")}`;

    this._nodes.miniRingRotor.style.transform = `rotate(${render.ringRotationDeg}deg)`;
    this._nodes.miniRingRotor.style.transition = "none";

    const miniSize = this._nodes.miniLevelCircle?.clientWidth || 80;
    const dotGeometry = computeRoundDotGeometry(miniSize, this._config.display);
    const centerX = miniSize * ROUND_CENTER_X_RATIO;
    const centerY = miniSize * ROUND_CENTER_Y_RATIO;
    const dotCenterX = centerX + render.dotNx * dotGeometry.dotTrackRadiusPx;
    const dotCenterY = centerY + render.dotNy * dotGeometry.dotTrackRadiusPx;
    this._nodes.miniDot.style.width = `${dotGeometry.dotSizePx}px`;
    this._nodes.miniDot.style.height = `${dotGeometry.dotSizePx}px`;
    this._nodes.miniDot.style.left = `${dotCenterX}px`;
    this._nodes.miniDot.style.top = `${dotCenterY}px`;
  }

  _updateRoundCompass() {
    const title = String(this._config.title || "").trim();
    const model = this._buildModel();
    this._syncRoundTargets(model);
    if (this._config.display.show_compass_ring) {
      this._ensureRoundRingSvg();
    }

    const width = this._nodes.wrapper?.clientWidth || this._nodes.wrapper?.offsetWidth || 540;
    const autoScale = clampNumber(width / 540, 0.62, 1.12, 1);
    const modeScale = this._textModeFactor();
    const scale = clampNumber(autoScale * modeScale, 0.62, 1.32, 1);

    const titlePx = clampInt(20 * scale, 13, 30);
    const infoPx = clampInt(14 * scale, 10, 20);
    const valuePx = clampInt(22 * scale, 14, 34);
    const textColor = this._displayColor("text_color");
    const levelOkColor = this._displayColor("level_ok_color");
    const raiseColor = this._displayColor("raise_color");
    const levelHighlightColor = this._displayColor("level_highlight_color");
    const levelStartColor = this._displayColor("level_gradient_start");
    const levelMidColor = this._displayColor("level_gradient_mid");
    const levelEndColor = this._displayColor("level_gradient_end");
    const dotColor = this._displayColor("dot_color");
    const dotBorderColor = this._displayColor("dot_border_color");
    const crosshairColor = this._displayColor("crosshair_color");

    this._nodes.title.textContent = title;
    this._nodes.title.hidden = !title;
    this._nodes.title.style.fontSize = `${titlePx}px`;
    this._nodes.title.style.color = textColor;
    this._nodes.temp.hidden = !this._config.display.show_temperature;
    this._nodes.batt.hidden = !this._config.display.show_battery;
    this._nodes.tempText.textContent = this._buildHeadValue(model.tempText);
    this._nodes.battText.textContent = this._buildHeadValue(model.battText);
    this._nodes.temp.style.fontSize = `${infoPx}px`;
    this._nodes.batt.style.fontSize = `${infoPx}px`;
    this._nodes.temp.style.color = textColor;
    this._nodes.batt.style.color = textColor;
    this._nodes.ringRotor.hidden = !this._config.display.show_compass_ring;
    this._nodes.compassIndex.hidden = !this._config.display.show_compass_ring;
    const roundBgUrl = String(this._config.image || "").trim();
    this._nodes.roundBg.hidden = !roundBgUrl;
    this._nodes.wrapper.style.background = roundBgUrl ? "transparent" : this._displayColor("background_color");
    if (roundBgUrl) {
      if (this._nodes.roundBg.dataset.src !== roundBgUrl) {
        this._nodes.roundBg.dataset.src = roundBgUrl;
        this._nodes.roundBg.src = roundBgUrl;
        this._nodes.roundBg.onerror = () => {
          this._nodes.roundBg.hidden = true;
          this._nodes.wrapper.style.background = this._displayColor("background_color");
        };
      }
      this._nodes.roundBg.alt = this._t("image_alt");
    }
    const overlayScale = clampNumber(
      this._config.display.round_overlay_scale,
      0.2,
      3,
      DEFAULT_DISPLAY.round_overlay_scale,
    );
    const overlayOffsetX = clampNumber(
      this._config.display.round_overlay_offset_x,
      -100,
      100,
      DEFAULT_DISPLAY.round_overlay_offset_x,
    );
    const overlayOffsetY = clampNumber(
      this._config.display.round_overlay_offset_y,
      -100,
      100,
      DEFAULT_DISPLAY.round_overlay_offset_y,
    );
    if (overlayScale === 1 && overlayOffsetX === 0 && overlayOffsetY === 0) {
      this._nodes.roundOverlay.style.transform = "none";
    } else {
      this._nodes.roundOverlay.style.transform = `translate(${overlayOffsetX}%, ${overlayOffsetY}%) scale(${overlayScale})`;
    }

    this._nodes.angleXLabel.textContent = `${this._t("angle_x")}`;
    this._nodes.angleYLabel.textContent = `${this._t("angle_y")}`;
    this._nodes.angleZLabel.textContent = `${this._t("angle_z")}`;
    this._nodes.angleXValue.style.fontSize = `${valuePx}px`;
    this._nodes.angleYValue.style.fontSize = `${valuePx}px`;
    this._nodes.angleZValue.style.fontSize = `${valuePx}px`;
    this._nodes.angleXValue.style.color = textColor;
    this._nodes.angleYValue.style.color = textColor;
    this._nodes.angleZValue.style.color = textColor;
    this._nodes.angleXLabel.style.color = textColor;
    this._nodes.angleYLabel.style.color = textColor;
    this._nodes.angleZLabel.style.color = textColor;
    this._nodes.valuePanel.hidden = !this._config.display.show_angle_panel;

    this._nodes.levelCircle.style.background = `
      radial-gradient(circle at 50% 36%, ${levelHighlightColor}, rgba(255,255,255,0) 35%),
      radial-gradient(circle at 50% 50%, ${levelStartColor} 0%, ${levelMidColor} 46%, ${levelEndColor} 100%)
    `;
    this._nodes.dot.style.background = dotColor;
    this._nodes.dot.style.borderColor = dotBorderColor;

    const crossNodes = this.shadowRoot.querySelectorAll(".cross");
    for (const node of crossNodes) node.style.background = crosshairColor;

    const applyCornerCell = (cellNode, corner) => {
      if (!cellNode) return;
      const valueNode = cellNode.querySelector(".corner-value");
      const indicatorNode = cellNode.querySelector(".corner-indicator");
      const needsRaise = shouldShowRaiseValue(corner);
      const value = corner.raise === null ? 0 : corner.raise;
      valueNode.hidden = !needsRaise;
      valueNode.style.display = needsRaise ? "" : "none";
      valueNode.textContent = needsRaise ? `${fmtOne(value)} ${this._t("unit_cm")}` : "";
      valueNode.style.color = textColor;
      const keyNode = cellNode.querySelector(".corner-key");
      keyNode.style.color = textColor;
      indicatorNode.classList.toggle("needs-raise", needsRaise);
      indicatorNode.style.background = needsRaise ? raiseColor : levelOkColor;
    };
    const showCornerGrid = this._config.display.show_corner_values;
    this._nodes.cornerGrid.hidden = !showCornerGrid;
    this._nodes.cornerGrid.style.display = showCornerGrid ? "grid" : "none";
    const cornerCells = [
      this._nodes.cornerFL,
      this._nodes.cornerFR,
      this._nodes.cornerRL,
      this._nodes.cornerRR,
    ];
    for (const cell of cornerCells) {
      if (!cell) continue;
      cell.hidden = !showCornerGrid;
      cell.style.display = showCornerGrid ? "grid" : "none";
      const valueNode = cell.querySelector(".corner-value");
      const indicatorNode = cell.querySelector(".corner-indicator");
      if (valueNode) {
        valueNode.hidden = !showCornerGrid;
        valueNode.style.display = showCornerGrid ? "" : "none";
      }
      if (indicatorNode) {
        indicatorNode.hidden = !showCornerGrid;
        indicatorNode.style.display = showCornerGrid ? "block" : "none";
      }
    }
    if (showCornerGrid) {
      applyCornerCell(this._nodes.cornerFL, model.corners.fl);
      applyCornerCell(this._nodes.cornerFR, model.corners.fr);
      applyCornerCell(this._nodes.cornerRL, model.corners.rl);
      applyCornerCell(this._nodes.cornerRR, model.corners.rr);
    }
    this._nodes.valuePanel.classList.toggle(
      "shift-down",
      this._config.display.show_angle_panel && !this._config.display.show_corner_values,
    );

    if (this._config.display.show_compass_status && model.yawAvailable && !model.compassReliable) {
      this._nodes.compassStatus.textContent = this._t("compass_reliability_hint");
      this._nodes.compassStatus.hidden = false;
    } else {
      this._nodes.compassStatus.textContent = "";
      this._nodes.compassStatus.hidden = true;
    }
    this._nodes.compassStatus.style.color = textColor;

    this._renderRoundDynamic();
    this._startAnimationLoop();
  }

  _renderRoundDynamic() {
    const model = this._roundModel;
    if (!model || this._config.display.mode !== "round_compass") return;
    const render = this._roundRenderValues();
    if (!render) return;

    this._nodes.angleXValue.textContent = render.pitch !== null
      ? `${fmtTwo(render.pitch)} ${this._t("unit_deg")}`
      : `${this._t("not_available")} ${this._t("unit_deg")}`;
    this._nodes.angleYValue.textContent = render.roll !== null
      ? `${fmtTwo(render.roll)} ${this._t("unit_deg")}`
      : `${this._t("not_available")} ${this._t("unit_deg")}`;
    this._nodes.angleZValue.textContent = render.yaw !== null
      ? `${fmtTwo(render.yaw)} ${this._t("unit_deg")}`
      : `${this._t("not_available")} ${this._t("unit_deg")}`;

    this._nodes.ringRotor.style.transform = `rotate(${render.ringRotationDeg}deg)`;
    this._nodes.ringRotor.style.transition = "none";

    const width = this._nodes.wrapper?.clientWidth || this._nodes.wrapper?.offsetWidth || 540;
    const levelSize = this._nodes.levelCircle?.clientWidth || Math.round(width * 0.64);
    const dotGeometry = computeRoundDotGeometry(levelSize, this._config.display);
    const dotSizePx = dotGeometry.dotSizePx;
    const dotTrackRadiusPx = dotGeometry.dotTrackRadiusPx;
    const centerX = levelSize * ROUND_CENTER_X_RATIO;
    const centerY = levelSize * ROUND_CENTER_Y_RATIO;
    const dotCenterX = centerX + render.dotNx * dotTrackRadiusPx;
    const dotCenterY = centerY + render.dotNy * dotTrackRadiusPx;
    this._nodes.dot.style.width = `${dotSizePx}px`;
    this._nodes.dot.style.height = `${dotSizePx}px`;
    this._nodes.dot.style.left = `${dotCenterX}px`;
    this._nodes.dot.style.top = `${dotCenterY}px`;
  }

  _buildHeadValue(raw) {
    if (!raw || raw === this._t("not_available")) return this._t("not_available");
    return raw;
  }

  _render() {
    this._ensureDom();
    this._update();
  }
}

class WitHaLovelaceCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = normalizeConfig({});
    this._hass = undefined;
    this._domReady = false;
    this._lastOptionsSignature = "";
    this._boundChange = this._onChange.bind(this);
  }

  setConfig(config) {
    this._config = normalizeConfig(config || {});
    this._render();
  }

  set hass(hass) {
    const previous = this._hass;
    this._hass = hass;
    const langChanged = resolveLanguage(previous) !== resolveLanguage(hass);
    const nextSignature = this._entityOptionsSignature(hass);
    const optionsChanged = this._lastOptionsSignature !== nextSignature;
    this._lastOptionsSignature = nextSignature;
    if (!previous || langChanged || optionsChanged) {
      this._render();
    }
  }

  disconnectedCallback() {
    if (this._domReady) {
      this.shadowRoot.removeEventListener("change", this._boundChange);
    }
    this._domReady = false;
  }

  _lang() {
    return resolveLanguage(this._hass);
  }

  _t(key) {
    return t(this._lang(), key);
  }

  _emitConfig(next) {
    this._config = normalizeConfig(next);
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    }));
  }

  _stateOptions() {
    const states = this._hass?.states || {};
    return Object.keys(states).sort();
  }

  _entityOptionsSignature(hass) {
    const states = hass?.states || {};
    const keys = Object.keys(states).sort();
    const lang = resolveLanguage(hass);
    return `${lang}|${keys.join("|")}`;
  }

  _render() {
    const c = this._config;
    const options = this._stateOptions();
    const optionHtml = options.map((entityId) => `<option value="${escapeHtml(entityId)}"></option>`).join("");
    const color = {
      background_color: asColorInputValue(c.display.background_color, DEFAULT_DISPLAY.background_color),
      dot_color: asColorInputValue(c.display.dot_color, DEFAULT_DISPLAY.dot_color),
      dot_border_color: asColorInputValue(c.display.dot_border_color, DEFAULT_DISPLAY.dot_border_color),
      crosshair_color: asColorInputValue(c.display.crosshair_color, DEFAULT_DISPLAY.crosshair_color),
      level_gradient_start: asColorInputValue(c.display.level_gradient_start, DEFAULT_DISPLAY.level_gradient_start),
      level_gradient_mid: asColorInputValue(c.display.level_gradient_mid, DEFAULT_DISPLAY.level_gradient_mid),
      level_gradient_end: asColorInputValue(c.display.level_gradient_end, DEFAULT_DISPLAY.level_gradient_end),
      level_highlight_color: asColorInputValue(c.display.level_highlight_color, DEFAULT_DISPLAY.level_highlight_color),
      ring_background_color: asColorInputValue(c.display.ring_background_color, DEFAULT_DISPLAY.ring_background_color),
      ring_tick_color: asColorInputValue(c.display.ring_tick_color, DEFAULT_DISPLAY.ring_tick_color),
      ring_major_tick_color: asColorInputValue(c.display.ring_major_tick_color, DEFAULT_DISPLAY.ring_major_tick_color),
      ring_cardinal_color: asColorInputValue(c.display.ring_cardinal_color, DEFAULT_DISPLAY.ring_cardinal_color),
      level_ok_color: asColorInputValue(c.display.level_ok_color, DEFAULT_DISPLAY.level_ok_color),
      raise_color: asColorInputValue(c.display.raise_color, DEFAULT_DISPLAY.raise_color),
      text_color: asColorInputValue(c.display.text_color, DEFAULT_DISPLAY.text_color),
    };
    const colorText = {};
    const colorOrder = [
      "background_color",
      "text_color",
      "dot_color",
      "dot_border_color",
      "crosshair_color",
      "level_gradient_start",
      "level_gradient_mid",
      "level_gradient_end",
      "level_highlight_color",
      "ring_background_color",
      "ring_tick_color",
      "ring_major_tick_color",
      "ring_cardinal_color",
      "level_ok_color",
      "raise_color",
    ];
    const colorNone = {};
    for (const id of colorOrder) {
      colorNone[id] = String(c.display?.[id] ?? "").trim() === "";
      colorText[id] = String(c.display?.[id] ?? "").trim();
    }
    const colorTile = (id) => `
      <label class="color-item" for="${id}">
        <span class="color-name">${escapeHtml(this._t(id))}</span>
        <span class="color-control">
          <input id="${id}" data-group="display" type="color" value="${escapeHtml(color[id])}" ${colorNone[id] ? "disabled" : ""} />
          <input
            id="${id}__hex"
            data-group="display"
            data-color-key="${id}"
            class="color-hex-input"
            type="text"
            placeholder="#RRGGBB"
            value="${escapeHtml(colorText[id] || String(color[id]).toUpperCase())}"
            ${colorNone[id] ? "disabled" : ""}
          />
        </span>
        <span class="none-row">
          <input id="${id}__none" data-group="display" data-color-key="${id}" type="checkbox" ${colorNone[id] ? "checked" : ""} />
          <span>${escapeHtml(this._t("no_color"))}</span>
        </span>
      </label>
    `;
    const colorGridHtml = colorOrder.map((id) => colorTile(id)).join("");

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: Arial, sans-serif; }
        .grid { display: grid; gap: 14px; }
        .section { border: 1px solid #dcdcdc; border-radius: 10px; padding: 12px; }
        h3 { margin: 0 0 10px 0; font-size: 16px; }
        .row { display: grid; gap: 6px; margin-bottom: 8px; }
        .row.inline { grid-template-columns: 1fr 1fr; gap: 10px; }
        label { font-size: 13px; color: #3a3a3a; }
        input[type="text"], input[type="number"], select {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #c9c9c9;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 14px;
        }
        input[type="color"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 34px;
          border: 1px solid #c9c9c9;
          border-radius: 8px;
          padding: 2px;
          background: #fff;
          cursor: pointer;
          box-sizing: border-box;
        }
        input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; border-radius: 6px; }
        input[type="color"]::-webkit-color-swatch { border: 0; border-radius: 6px; }
        input[type="color"]::-moz-color-swatch { border: 0; border-radius: 6px; }
        .check { display: flex; align-items: center; gap: 8px; margin: 6px 0; }
        .color-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 10px;
        }
        .color-item {
          display: grid;
          gap: 6px;
          border: 1px solid #d7d7d7;
          border-radius: 10px;
          padding: 8px;
          background: #f8f8f8;
        }
        .color-name {
          font-size: 12px;
          color: #2f2f2f;
          line-height: 1.2;
        }
        .color-control {
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 8px;
          align-items: center;
        }
        .color-hex-input {
          font-size: 12px;
          color: #333;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          letter-spacing: 0.02em;
          background: #fff;
          border: 1px solid #d2d2d2;
          border-radius: 6px;
          padding: 7px 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          box-sizing: border-box;
        }
        .none-row {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #555;
        }
      </style>
      <div class="grid">
        <div class="section">
          <h3>${escapeHtml(this._t("general"))}</h3>
          <div class="row"><label>${escapeHtml(this._t("title"))}</label><input id="title" type="text" value="${escapeHtml(c.title)}" /></div>
          <div class="row"><label>${escapeHtml(this._t("image_url"))}</label><input id="image" type="text" value="${escapeHtml(c.image)}" /></div>
        </div>

        <div class="section">
          <h3>${escapeHtml(this._t("entities"))}</h3>
          <datalist id="entity-options">${optionHtml}</datalist>
          <div class="row"><label>${escapeHtml(this._t("pitch_entity"))}</label><input id="pitch" data-group="entities" list="entity-options" type="text" value="${escapeHtml(c.entities.pitch)}" /></div>
          <div class="row"><label>${escapeHtml(this._t("roll_entity"))}</label><input id="roll" data-group="entities" list="entity-options" type="text" value="${escapeHtml(c.entities.roll)}" /></div>
          <div class="row"><label>${escapeHtml(this._t("yaw_entity"))}</label><input id="yaw" data-group="entities" list="entity-options" type="text" value="${escapeHtml(c.entities.yaw)}" /></div>
          <div class="row"><label>${escapeHtml(this._t("temp_entity"))}</label><input id="temperature" data-group="entities" list="entity-options" type="text" value="${escapeHtml(c.entities.temperature)}" /></div>
          <div class="row"><label>${escapeHtml(this._t("batt_entity"))}</label><input id="battery_soc" data-group="entities" list="entity-options" type="text" value="${escapeHtml(c.entities.battery_soc)}" /></div>
        </div>

        <div class="section">
          <h3>${escapeHtml(this._t("geometry"))}</h3>
          <div class="row inline">
            <div><label>${escapeHtml(this._t("wheelbase_mm"))}</label><input id="wheelbase_mm" data-group="geometry" type="number" step="1" value="${escapeHtml(c.geometry.wheelbase_mm)}" /></div>
            <div><label>${escapeHtml(this._t("track_front_mm"))}</label><input id="track_front_mm" data-group="geometry" type="number" step="1" value="${escapeHtml(c.geometry.track_front_mm)}" /></div>
          </div>
          <div class="row"><label>${escapeHtml(this._t("track_rear_mm"))}</label><input id="track_rear_mm" data-group="geometry" type="number" step="1" value="${escapeHtml(c.geometry.track_rear_mm)}" /></div>
        </div>

        <div class="section">
          <h3>${escapeHtml(this._t("display"))}</h3>
          <div class="row">
            <label>${escapeHtml(this._t("display_mode"))}</label>
            <select id="mode" data-group="display">
              <option value="rv_top" ${c.display.mode === "rv_top" ? "selected" : ""}>${escapeHtml(this._t("mode_rv_top"))}</option>
              <option value="round_compass" ${c.display.mode === "round_compass" ? "selected" : ""}>${escapeHtml(this._t("mode_round_compass"))}</option>
            </select>
          </div>
          <div class="row inline">
            <div><label>${escapeHtml(this._t("max_tilt_deg"))}</label><input id="max_tilt_deg" data-group="display" type="number" step="0.1" value="${escapeHtml(c.display.max_tilt_deg)}" /></div>
            <div><label>${escapeHtml(this._t("level_tolerance_cm"))}</label><input id="level_tolerance_cm" data-group="display" type="number" step="0.1" value="${escapeHtml(c.display.level_tolerance_cm)}" /></div>
          </div>
          <div class="row inline">
            <div><label>${escapeHtml(this._t("round_overlay_scale"))}</label><input id="round_overlay_scale" data-group="display" type="number" step="0.01" min="0.2" max="3" value="${escapeHtml(c.display.round_overlay_scale)}" /></div>
            <div><label>${escapeHtml(this._t("round_overlay_offset_x"))}</label><input id="round_overlay_offset_x" data-group="display" type="number" step="0.5" min="-100" max="100" value="${escapeHtml(c.display.round_overlay_offset_x)}" /></div>
          </div>
          <div class="row">
            <label>${escapeHtml(this._t("round_overlay_offset_y"))}</label>
            <input id="round_overlay_offset_y" data-group="display" type="number" step="0.5" min="-100" max="100" value="${escapeHtml(c.display.round_overlay_offset_y)}" />
          </div>
          <div class="row">
            <label>${escapeHtml(this._t("text_size_mode"))}</label>
            <select id="text_size_mode" data-group="display">
              <option value="auto" ${c.display.text_size_mode === "auto" ? "selected" : ""}>${escapeHtml(this._t("text_size_auto"))}</option>
              <option value="small" ${c.display.text_size_mode === "small" ? "selected" : ""}>${escapeHtml(this._t("text_size_small"))}</option>
              <option value="medium" ${c.display.text_size_mode === "medium" ? "selected" : ""}>${escapeHtml(this._t("text_size_medium"))}</option>
              <option value="large" ${c.display.text_size_mode === "large" ? "selected" : ""}>${escapeHtml(this._t("text_size_large"))}</option>
            </select>
          </div>
          <div class="row inline">
            <div><label>${escapeHtml(this._t("dot_boundary_radius_ratio"))}</label><input id="dot_boundary_radius_ratio" data-group="display" type="number" step="0.001" value="${escapeHtml(c.display.dot_boundary_radius_ratio)}" /></div>
            <div><label>${escapeHtml(this._t("round_dot_boundary_radius_ratio"))}</label><input id="round_dot_boundary_radius_ratio" data-group="display" type="number" step="0.001" value="${escapeHtml(c.display.round_dot_boundary_radius_ratio)}" /></div>
          </div>
          <div class="row inline">
            <div><label>${escapeHtml(this._t("dot_size_ratio"))}</label><input id="dot_size_ratio" data-group="display" type="number" step="0.001" value="${escapeHtml(c.display.dot_size_ratio)}" /></div>
            <div><label>${escapeHtml(this._t("smooth_alpha"))}</label><input id="smooth_alpha" data-group="display" type="number" step="0.01" min="0.01" max="1" value="${escapeHtml(c.display.smooth_alpha)}" /></div>
          </div>
          <div class="row">
            <div class="color-grid">
              ${colorGridHtml}
            </div>
          </div>
          <div class="row inline">
            <div><label>${escapeHtml(this._t("compass_unreliable_tilt_deg"))}</label><input id="compass_unreliable_tilt_deg" data-group="display" type="number" step="0.1" value="${escapeHtml(c.display.compass_unreliable_tilt_deg)}" /></div>
          </div>
          <label class="check"><input id="show_temperature" data-group="display" type="checkbox" ${c.display.show_temperature ? "checked" : ""} /> ${escapeHtml(this._t("show_temperature"))}</label>
          <label class="check"><input id="show_battery" data-group="display" type="checkbox" ${c.display.show_battery ? "checked" : ""} /> ${escapeHtml(this._t("show_battery"))}</label>
          <label class="check"><input id="show_angle_panel" data-group="display" type="checkbox" ${c.display.show_angle_panel ? "checked" : ""} /> ${escapeHtml(this._t("show_angle_panel"))}</label>
          <label class="check"><input id="show_corner_values" data-group="display" type="checkbox" ${c.display.show_corner_values ? "checked" : ""} /> ${escapeHtml(this._t("show_corner_values"))}</label>
          <label class="check"><input id="show_compass_ring" data-group="display" type="checkbox" ${c.display.show_compass_ring ? "checked" : ""} /> ${escapeHtml(this._t("show_compass_ring"))}</label>
          <label class="check"><input id="show_compass_status" data-group="display" type="checkbox" ${c.display.show_compass_status ? "checked" : ""} /> ${escapeHtml(this._t("show_compass_status"))}</label>
        </div>

        <div class="section">
          <h3>${escapeHtml(this._t("orientation"))}</h3>
          <label class="check"><input id="swap_axes" data-group="orientation" type="checkbox" ${c.orientation.swap_axes ? "checked" : ""} /> ${escapeHtml(this._t("swap_axes"))}</label>
          <label class="check"><input id="invert_pitch" data-group="orientation" type="checkbox" ${c.orientation.invert_pitch ? "checked" : ""} /> ${escapeHtml(this._t("invert_pitch"))}</label>
          <label class="check"><input id="invert_roll" data-group="orientation" type="checkbox" ${c.orientation.invert_roll ? "checked" : ""} /> ${escapeHtml(this._t("invert_roll"))}</label>
          <label class="check"><input id="invert_yaw" data-group="orientation" type="checkbox" ${c.orientation.invert_yaw ? "checked" : ""} /> ${escapeHtml(this._t("invert_yaw"))}</label>
          <label class="check"><input id="auto_screen_mapping" data-group="orientation" type="checkbox" ${c.orientation.auto_screen_mapping ? "checked" : ""} /> ${escapeHtml(this._t("auto_screen_mapping"))}</label>
          <div class="row"><label>${escapeHtml(this._t("yaw_offset_deg"))}</label><input id="yaw_offset_deg" data-group="orientation" type="number" step="0.1" value="${escapeHtml(c.orientation.yaw_offset_deg)}" /></div>
        </div>
      </div>
    `;

    if (!this._domReady) {
      this.shadowRoot.addEventListener("change", this._boundChange);
      this._domReady = true;
    }
  }

  _onChange(ev) {
    const target = ev?.target;
    const id = String(target?.id || "");
    if (!id) return;

    const next = normalizeConfig(this._config);

    if (id === "title") {
      next.title = String(target.value || "");
      this._emitConfig(next);
      return;
    }

    if (id === "image") {
      next.image = String(target.value || "");
      this._emitConfig(next);
      return;
    }

    const group = String(target?.dataset?.group || "");
    if (!group) return;

    const colorKey = String(target?.dataset?.colorKey || "");
    if (target.type === "checkbox" && colorKey) {
      if (target.checked) {
        next[group][colorKey] = "";
      } else {
        const colorInput = this.shadowRoot?.querySelector?.(`#${colorKey}`);
        next[group][colorKey] = String(colorInput?.value || DEFAULT_DISPLAY[colorKey] || "");
      }
      this._emitConfig(next);
      return;
    }

    if (colorKey && id.endsWith("__hex")) {
      next[group][colorKey] = String(target.value || "").trim();
      this._emitConfig(next);
      return;
    }

    if (target.type === "checkbox") {
      next[group][id] = Boolean(target.checked);
      this._emitConfig(next);
      return;
    }

    if (NUMBER_FIELDS.has(id)) {
      next[group][id] = Number(target.value);
      this._emitConfig(next);
      return;
    }

    next[group][id] = String(target.value || "");
    this._emitConfig(next);
  }
}

if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, WitHaLovelaceCard);
}

if (!customElements.get("rv-ha-lovelace-card-editor")) {
  customElements.define("rv-ha-lovelace-card-editor", WitHaLovelaceCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: CARD_NAME,
    description: "RV leveling visualization card.",
    preview: false,
    documentationURL: "https://github.com/othorg/rv-level-ha-lovelace-card",
    icon: DEFAULT_ICON_CANDIDATES[0] || "mdi:caravan",
  });
}

window.__WIT_CARD_TEST_API = {
  CARD_TYPE,
  CARD_VERSION,
  normalizeConfig,
  normalizeDisplayMode,
  normalize360,
  computeLeveling,
  clampTiltForLeveling,
  projectToUnitCircle,
  computeDotGeometry,
  computeRoundDotGeometry,
  resolvePitchRoll,
  fmtTwo,
  shouldShowRaiseValue,
  readNumericState,
  clampNumber,
  shortestAngleDelta,
  isSupportedCardType,
};

console.info(`%c${CARD_NAME} %c${CARD_VERSION}`, "color:#0b75b7;font-weight:700", "color:#666;font-weight:400");
