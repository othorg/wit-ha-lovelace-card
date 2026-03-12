import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CARD_SOURCE = path.resolve(__dirname, "../dist/rv-ha-lovelace-card.js");

class FakeEventTarget {
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() { return true; }
}

class FakeHTMLElement extends FakeEventTarget {
  constructor() {
    super();
    this.shadowRoot = null;
    this.offsetWidth = 0;
  }

  attachShadow() {
    this.shadowRoot = {
      innerHTML: "",
      querySelector() { return null; },
      addEventListener() {},
      removeEventListener() {},
    };
    return this.shadowRoot;
  }

  getBoundingClientRect() {
    return { width: this.offsetWidth || 0, height: 0 };
  }
}

function loadRuntime() {
  const registry = new Map();
  const customElements = {
    define(name, klass) {
      registry.set(name, klass);
    },
    get(name) {
      return registry.get(name);
    },
  };

  const sandboxWindow = {
    customCards: [],
    devicePixelRatio: 1,
    addEventListener() {},
    removeEventListener() {},
  };

  const sandbox = {
    console,
    Math,
    Number,
    String,
    Boolean,
    Date,
    Set,
    Map,
    JSON,
    encodeURIComponent,
    decodeURIComponent,
    customElements,
    HTMLElement: FakeHTMLElement,
    EventTarget: FakeEventTarget,
    CustomEvent: class {
      constructor(type, init = {}) {
        this.type = type;
        this.detail = init.detail;
      }
    },
    window: sandboxWindow,
    document: {
      currentScript: { src: "https://example.local/hacsfiles/rv-level-ha-lovelace-card/rv-ha-lovelace-card.js" },
      querySelectorAll() { return []; },
    },
  };
  sandbox.window.customElements = customElements;
  sandbox.window.document = sandbox.document;

  const source = fs.readFileSync(CARD_SOURCE, "utf8");
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: CARD_SOURCE });

  return {
    api: sandbox.window.__WIT_CARD_TEST_API,
    customCards: sandbox.window.customCards,
    registry,
  };
}

test("exports test api", () => {
  const runtime = loadRuntime();
  assert.ok(runtime.api);
  assert.equal(runtime.api.CARD_TYPE, "rv-ha-lovelace-card");
});

test("supports plain and custom-prefixed card types", () => {
  const runtime = loadRuntime();
  assert.equal(runtime.api.isSupportedCardType("rv-ha-lovelace-card"), true);
  assert.equal(runtime.api.isSupportedCardType("custom:rv-ha-lovelace-card"), true);
  assert.equal(runtime.api.isSupportedCardType("custom:other-card"), false);
});

test("version in package and card source are in sync", () => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8"));
  const runtime = loadRuntime();
  assert.equal(runtime.api.CARD_VERSION, pkg.version);
});

test("normalizeConfig applies defaults", () => {
  const runtime = loadRuntime();
  const cfg = runtime.api.normalizeConfig({ type: "custom:rv-ha-lovelace-card" });

  assert.equal(cfg.entities.pitch, "sensor.wit_wt5500008241_neigung");
  assert.equal(cfg.entities.roll, "sensor.wit_wt5500008241_roll");
  assert.equal(cfg.entities.yaw, "sensor.wit_wt5500008241_gier");
  assert.equal(cfg.entities.temperature, "sensor.wit_wt5500008241_temperatur");
  assert.equal(cfg.entities.battery_soc, "sensor.wit_wt5500008241_batterie");
  assert.equal(cfg.geometry.wheelbase_mm, 2000);
  assert.equal(cfg.display.mode, "rv_top");
  assert.equal(cfg.display.max_tilt_deg, 5);
  assert.equal(cfg.display.dot_boundary_radius_ratio, 0.112);
  assert.equal(cfg.display.round_dot_boundary_radius_ratio, 0.44);
  assert.equal(cfg.display.dot_size_ratio, 0.068);
  assert.equal(cfg.display.round_overlay_scale, 1);
  assert.equal(cfg.display.round_overlay_offset_x, 0);
  assert.equal(cfg.display.round_overlay_offset_y, 0);
  assert.equal(cfg.display.show_angle_panel, true);
  assert.equal(cfg.display.show_compass_ring, true);
  assert.equal(cfg.display.text_size_mode, "auto");
  assert.equal(cfg.display.background_color, "#9bc4d6");
  assert.equal(cfg.display.level_gradient_start, "#e8ff84");
  assert.equal(cfg.display.level_gradient_mid, "#d6ee65");
  assert.equal(cfg.display.level_gradient_end, "#c3de41");
  assert.equal(cfg.display.dot_color, "#ff2a1f");
  assert.equal(cfg.display.text_color, "#111111");
  assert.equal(cfg.display.smooth_alpha, 0.2);
  assert.equal(cfg.orientation.invert_yaw, false);
  assert.equal(cfg.orientation.yaw_offset_deg, 0);
  assert.equal(cfg.orientation.auto_screen_mapping, false);
  assert.equal(cfg.orientation.swap_axes, false);
});

test("normalizeConfig preserves title and image", () => {
  const runtime = loadRuntime();
  const cfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    title: "Mein Titel",
    image: "/local/custom/image.png",
  });
  assert.equal(cfg.title, "Mein Titel");
  assert.equal(cfg.image, "/local/custom/image.png");
});

test("normalizeConfig keeps backward-compatible rv_top defaults when mode missing", () => {
  const runtime = loadRuntime();
  const cfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: {
      max_tilt_deg: 7,
      text_size_mode: "small",
    },
  });
  assert.equal(cfg.display.mode, "rv_top");
  assert.equal(cfg.display.max_tilt_deg, 7);
  assert.equal(cfg.display.text_size_mode, "small");
});

test("normalizeConfig validates display mode and yaw-related orientation fields", () => {
  const runtime = loadRuntime();
  const good = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: {
      mode: "round_compass",
      round_overlay_scale: 99,
      round_overlay_offset_x: 250,
      round_overlay_offset_y: -250,
      show_angle_panel: 0,
      show_compass_ring: 0,
    },
    entities: { yaw: "sensor.yaw" },
    orientation: {
      invert_yaw: true,
      yaw_offset_deg: 400,
    },
  });
  assert.equal(good.display.mode, "round_compass");
  assert.equal(good.entities.yaw, "sensor.yaw");
  assert.equal(good.orientation.invert_yaw, true);
  assert.equal(good.orientation.yaw_offset_deg, 360);
  assert.equal(good.display.round_overlay_scale, 3);
  assert.equal(good.display.round_overlay_offset_x, 100);
  assert.equal(good.display.round_overlay_offset_y, -100);
  assert.equal(good.display.show_angle_panel, false);
  assert.equal(good.display.show_compass_ring, false);

  const bad = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { mode: "other_mode" },
    orientation: { yaw_offset_deg: -999 },
  });
  assert.equal(bad.display.mode, "rv_top");
  assert.equal(bad.orientation.yaw_offset_deg, -360);
});

test("normalizeConfig keeps valid text_size_mode and falls back for invalid values", () => {
  const runtime = loadRuntime();

  const validCfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { text_size_mode: "large" },
  });
  assert.equal(validCfg.display.text_size_mode, "large");

  const invalidCfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { text_size_mode: "huge" },
  });
  assert.equal(invalidCfg.display.text_size_mode, "auto");
});

test("computeLeveling returns zero raises on flat surface", () => {
  const runtime = loadRuntime();
  const result = runtime.api.computeLeveling(0, 0, {
    wheelbase_mm: 2000,
    track_front_mm: 1700,
    track_rear_mm: 1600,
  });

  assert.equal(result.raise_fl, 0);
  assert.equal(result.raise_fr, 0);
  assert.equal(result.raise_rl, 0);
  assert.equal(result.raise_rr, 0);
});

test("computeLeveling uses direct raise mapping (height above lowest corner)", () => {
  const runtime = loadRuntime();
  const result = runtime.api.computeLeveling(0, 5, {
    wheelbase_mm: 2000,
    track_front_mm: 1700,
    track_rear_mm: 1600,
  });

  const minZ = Math.min(result.z_fl, result.z_fr, result.z_rl, result.z_rr);
  assert.equal(result.raise_fl, Math.max(0, result.z_fl - minZ));
  assert.equal(result.raise_fr, Math.max(0, result.z_fr - minZ));
  assert.equal(result.raise_rl, Math.max(0, result.z_rl - minZ));
  assert.equal(result.raise_rr, Math.max(0, result.z_rr - minZ));
});

test("shouldShowRaiseValue hides values at/below tolerance and shows above", () => {
  const runtime = loadRuntime();
  assert.equal(runtime.api.shouldShowRaiseValue({ raise: 0, levelOk: true }), false);
  assert.equal(runtime.api.shouldShowRaiseValue({ raise: 0.1, levelOk: true }), false);
  assert.equal(runtime.api.shouldShowRaiseValue({ raise: 0.2, levelOk: false }), true);
  assert.equal(runtime.api.shouldShowRaiseValue({ raise: null, levelOk: false }), false);
});

test("clampTiltForLeveling caps extreme angles for stable rendering", () => {
  const runtime = loadRuntime();
  assert.equal(runtime.api.clampTiltForLeveling(5), 5);
  assert.equal(runtime.api.clampTiltForLeveling(120), 30);
  assert.equal(runtime.api.clampTiltForLeveling(-120), -30);
});

test("projectToUnitCircle keeps vectors inside unit circle", () => {
  const runtime = loadRuntime();
  const inside = runtime.api.projectToUnitCircle(0.6, 0.2);
  assert.equal(inside.x, 0.6);
  assert.equal(inside.y, 0.2);

  const outside = runtime.api.projectToUnitCircle(1.4, 1.4);
  assert.ok(Math.hypot(outside.x, outside.y) <= 1.0000001);
});

test("computeDotGeometry keeps max dot edge on boundary circle", () => {
  const runtime = loadRuntime();
  const geom = runtime.api.computeDotGeometry(550, {
    dot_boundary_radius_ratio: 0.112,
    dot_size_ratio: 0.068,
  });
  assert.ok(geom.dotTrackRadiusPx >= 0);
  assert.equal(geom.boundaryRadiusPx - geom.dotSizePx / 2, geom.dotTrackRadiusPx);
});

test("computeDotGeometry respects user display ratios", () => {
  const runtime = loadRuntime();
  const small = runtime.api.computeDotGeometry(550, {
    dot_boundary_radius_ratio: 0.08,
    dot_size_ratio: 0.05,
  });
  const large = runtime.api.computeDotGeometry(550, {
    dot_boundary_radius_ratio: 0.14,
    dot_size_ratio: 0.08,
  });
  assert.ok(large.boundaryRadiusPx > small.boundaryRadiusPx);
  assert.ok(large.dotSizePx > small.dotSizePx);
});

test("computeRoundDotGeometry uses round ratio and keeps edge-safe track", () => {
  const runtime = loadRuntime();
  const geom = runtime.api.computeRoundDotGeometry(360, {
    dot_boundary_radius_ratio: 0.112,
    round_dot_boundary_radius_ratio: 0.46,
    dot_size_ratio: 0.08,
  });
  assert.ok(geom.boundaryRadiusPx > 120);
  assert.equal(geom.boundaryRadiusPx - geom.dotSizePx / 2, geom.dotTrackRadiusPx);
});

test("normalizeConfig sanitizes invalid color strings", () => {
  const runtime = loadRuntime();
  const cfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: {
      background_color: "url(javascript:alert(1))",
      level_gradient_start: "inherit",
      level_gradient_end: "unset",
      dot_color: "#00ff00",
    },
  });
  assert.equal(cfg.display.background_color, "#9bc4d6");
  assert.equal(cfg.display.level_gradient_start, "#e8ff84");
  assert.equal(cfg.display.level_gradient_end, "#c3de41");
  assert.equal(cfg.display.dot_color, "#00ff00");
});

test("normalizeConfig keeps empty color values as no-color", () => {
  const runtime = loadRuntime();
  const cfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: {
      level_highlight_color: "",
      ring_tick_color: "",
      text_color: "",
    },
  });
  assert.equal(cfg.display.level_highlight_color, "");
  assert.equal(cfg.display.ring_tick_color, "");
  assert.equal(cfg.display.text_color, "");
});

test("shortestAngleDelta follows shortest path across wrap", () => {
  const runtime = loadRuntime();
  assert.equal(runtime.api.shortestAngleDelta(359, 1), 2);
  assert.equal(runtime.api.shortestAngleDelta(1, 359), -2);
});

test("resolvePitchRoll respects swap and inversion flags", () => {
  const runtime = loadRuntime();
  const hass = {
    states: {
      "sensor.pitch": { state: "1.5" },
      "sensor.roll": { state: "-2.0" },
    },
  };

  const result = runtime.api.resolvePitchRoll(hass, {
    entities: {
      pitch: "sensor.pitch",
      roll: "sensor.roll",
    },
    orientation: {
      swap_axes: true,
      invert_pitch: true,
      invert_roll: false,
    },
  });

  assert.equal(result.valid, true);
  assert.equal(result.pitch, 2.0);
  assert.equal(result.roll, 1.5);
});

test("resolvePitchRoll auto_screen_mapping + swap_axes combined transformation", () => {
  const runtime = loadRuntime();
  const hass = {
    states: {
      "sensor.pitch": { state: "3.0" },
      "sensor.roll": { state: "1.0" },
    },
  };

  // auto_screen_mapping in landscape: pitch=roll, roll=-pitch → pitch=1.0, roll=-3.0
  // then swap_axes: pitch=roll=-3.0, roll=pitch=1.0
  // then invert_pitch: pitch=3.0
  const result = runtime.api.resolvePitchRoll(hass, {
    entities: { pitch: "sensor.pitch", roll: "sensor.roll" },
    orientation: {
      auto_screen_mapping: true,
      swap_axes: true,
      invert_pitch: true,
      invert_roll: false,
    },
  }, /* isLandscape */ true);

  assert.equal(result.valid, true);
  assert.equal(result.pitch, 3.0);
  assert.equal(result.roll, 1.0);

  // Same input but portrait (auto_screen_mapping skipped):
  // swap_axes: pitch=1.0, roll=3.0 → invert_pitch: pitch=-1.0
  const portrait = runtime.api.resolvePitchRoll(hass, {
    entities: { pitch: "sensor.pitch", roll: "sensor.roll" },
    orientation: {
      auto_screen_mapping: true,
      swap_axes: true,
      invert_pitch: true,
      invert_roll: false,
    },
  }, /* isLandscape */ false);

  assert.equal(portrait.pitch, -1.0);
  assert.equal(portrait.roll, 3.0);
});

test("normalize360 wraps negative and oversized angles", () => {
  const runtime = loadRuntime();
  assert.equal(runtime.api.normalize360(0), 0);
  assert.equal(runtime.api.normalize360(361), 1);
  assert.equal(runtime.api.normalize360(-1), 359);
  assert.ok(Math.abs(runtime.api.normalize360(725.2) - 5.2) < 1e-9);
});

test("round_compass model keeps bubble valid when yaw is unavailable", () => {
  const runtime = loadRuntime();
  const CardClass = runtime.registry.get("rv-ha-lovelace-card");
  const card = new CardClass();
  card._config = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { mode: "round_compass", max_tilt_deg: 5 },
    entities: {
      pitch: "sensor.pitch",
      roll: "sensor.roll",
      yaw: "sensor.yaw",
    },
  });
  card._hass = {
    states: {
      "sensor.pitch": { state: "1.5" },
      "sensor.roll": { state: "-2.0" },
      "sensor.yaw": { state: "unavailable" },
    },
  };
  const model = card._buildModel();
  assert.equal(model.valid, true);
  assert.equal(model.yawAvailable, false);
  assert.ok(Math.abs(model.ringRotationDeg) < 1e-9);
  assert.notEqual(model.dotNx, 0);
});

test("round_compass ring rotation uses negative heading", () => {
  const runtime = loadRuntime();
  const CardClass = runtime.registry.get("rv-ha-lovelace-card");
  const card = new CardClass();
  card._config = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { mode: "round_compass" },
    entities: {
      pitch: "sensor.pitch",
      roll: "sensor.roll",
      yaw: "sensor.yaw",
    },
    orientation: {
      invert_yaw: false,
      yaw_offset_deg: 10,
    },
  });
  card._hass = {
    states: {
      "sensor.pitch": { state: "0" },
      "sensor.roll": { state: "0" },
      "sensor.yaw": { state: "25" },
    },
  };
  const model = card._buildModel();
  assert.equal(model.heading, 35);
  assert.equal(model.ringRotationDeg, -35);
});

test("corner raise values are exposed in centimeters for display and tolerance", () => {
  const runtime = loadRuntime();
  const CardClass = runtime.registry.get("rv-ha-lovelace-card");
  const card = new CardClass();
  card._config = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { level_tolerance_cm: 4 },
    geometry: {
      wheelbase_mm: 2000,
      track_front_mm: 1723,
      track_rear_mm: 1661,
    },
    orientation: {
      swap_axes: false,
    },
    entities: {
      pitch: "sensor.pitch",
      roll: "sensor.roll",
    },
  });
  card._hass = {
    states: {
      "sensor.pitch": { state: "1.0" },
      "sensor.roll": { state: "0.0" },
    },
  };
  const model = card._buildModel();
  // pitch=1° lifts front by ~34.9 mm = ~3.49 cm (direct mapping: FL/FR are above RL/RR).
  assert.ok(model.corners.fl.raise > 3);
  assert.ok(model.corners.fl.raise < 4);
  assert.equal(model.corners.rl.raise, 0);
  assert.equal(model.corners.rr.raise, 0);
});

test("setConfig forces DOM rebuild on display mode switch", () => {
  const runtime = loadRuntime();
  const CardClass = runtime.registry.get("rv-ha-lovelace-card");
  const card = new CardClass();
  card._render = () => {};
  card._domReady = true;
  card._nodes = { wrapper: {}, mode: "rv_top" };
  card._currentMode = "rv_top";

  card.setConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { mode: "round_compass" },
  });
  assert.equal(card._domReady, false);
  assert.equal(card._currentMode, "round_compass");
});

test("readNumericState returns null for unavailable", () => {
  const runtime = loadRuntime();
  const hass = {
    states: {
      "sensor.x": { state: "unavailable" },
    },
  };

  assert.equal(runtime.api.readNumericState(hass, "sensor.x"), null);
});

test("custom card metadata is registered", () => {
  const runtime = loadRuntime();
  assert.equal(runtime.customCards.length, 1);
  assert.equal(runtime.customCards[0].type, "rv-ha-lovelace-card");
  assert.equal(runtime.customCards[0].preview, false);
});

test("rv_top mode builds SVG motorhome drawing", () => {
  const runtime = loadRuntime();
  const CardClass = runtime.registry.get("rv-ha-lovelace-card");
  const card = new CardClass();
  card._render = () => {};
  card.setConfig({ type: "custom:rv-ha-lovelace-card", display: { mode: "rv_top" } });
  const svg = card._buildRvTopSvg();
  assert.ok(svg.includes("<svg"), "should contain opening svg tag");
  assert.ok(svg.includes("viewBox"), "should have a viewBox");
  assert.ok(svg.includes("<path"), "should contain path elements for body");
  assert.ok(svg.includes("<rect"), "should contain rect elements for wheels/windows");
});

test("rv_top SVG uses configured text_color for stroke", () => {
  const runtime = loadRuntime();
  const CardClass = runtime.registry.get("rv-ha-lovelace-card");
  const card = new CardClass();
  card._render = () => {};
  card.setConfig({ type: "custom:rv-ha-lovelace-card", display: { mode: "rv_top", text_color: "#ff0000" } });
  const svg1 = card._buildRvTopSvg();
  assert.ok(svg1.includes("#ff0000"), "should use configured stroke color");
  card.setConfig({ type: "custom:rv-ha-lovelace-card", display: { mode: "rv_top", text_color: "#0000ff" } });
  const svg2 = card._buildRvTopSvg();
  assert.ok(svg2.includes("#0000ff"), "should use updated stroke color");
});

test("normalizeConfig show_angle_panel defaults to true and accepts false", () => {
  const runtime = loadRuntime();
  const defaultCfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { mode: "rv_top" },
  });
  assert.equal(defaultCfg.display.show_angle_panel, true);

  const offCfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { mode: "rv_top", show_angle_panel: false },
  });
  assert.equal(offCfg.display.show_angle_panel, false);
});

test("normalizeConfig show_corner_values defaults to true and accepts false", () => {
  const runtime = loadRuntime();
  const defaultCfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { mode: "rv_top" },
  });
  assert.equal(defaultCfg.display.show_corner_values, true);

  const offCfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { mode: "rv_top", show_corner_values: false },
  });
  assert.equal(offCfg.display.show_corner_values, false);
});

test("normalizeConfig show_compass_ring defaults to true and accepts false for rv_top", () => {
  const runtime = loadRuntime();
  const defaultCfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { mode: "rv_top" },
  });
  assert.equal(defaultCfg.display.show_compass_ring, true);

  const offCfg = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { mode: "rv_top", show_compass_ring: false },
  });
  assert.equal(offCfg.display.show_compass_ring, false);
});

test("rv_top mode smoothing system is not blocked by mode guard", () => {
  const runtime = loadRuntime();
  const CardClass = runtime.registry.get("rv-ha-lovelace-card");
  const card = new CardClass();
  card._render = () => {};
  card.setConfig({ type: "custom:rv-ha-lovelace-card", display: { mode: "rv_top" } });
  card._config = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    display: { mode: "rv_top" },
    entities: { pitch: "sensor.pitch", roll: "sensor.roll" },
  });
  card._hass = {
    states: {
      "sensor.pitch": { state: "1.0" },
      "sensor.roll": { state: "-0.5" },
    },
  };
  const model = card._buildModel();
  assert.equal(model.valid, true);
  // syncRoundTargets should work for rv_top (no mode guard)
  card._syncRoundTargets(model);
  assert.ok(card._roundModel, "smoothing model should be set for rv_top");
  assert.equal(card._roundModel.valid, true);
});

// ── computeMagHeading tests ──

test("computeMagHeading returns null for invalid inputs", () => {
  const { computeMagHeading } = loadRuntime().api;
  assert.equal(computeMagHeading(null, 1, 1, 0, 0), null);
  assert.equal(computeMagHeading(1, undefined, 1, 0, 0), null);
  assert.equal(computeMagHeading(1, 1, NaN, 0, 0), null);
  assert.equal(computeMagHeading(1, 1, 1, null, 0), null);
  assert.equal(computeMagHeading(1, 1, 1, 0, Infinity), null);
});

test("computeMagHeading returns null for near-zero mag vector (uncalibrated)", () => {
  const { computeMagHeading } = loadRuntime().api;
  assert.equal(computeMagHeading(0.1, 0.1, 0.1, 0, 0), null);
  assert.equal(computeMagHeading(0, 0, 0, 0, 0), null);
});

test("computeMagHeading flat sensor magX dominant → heading ≈ 0° (North)", () => {
  const { computeMagHeading } = loadRuntime().api;
  // Flat sensor (pitch=0, roll=0), magnetic field pointing along X (forward) → North
  const heading = computeMagHeading(50, 0, -40, 0, 0);
  assert.ok(heading !== null);
  assert.ok(Math.abs(heading) < 5 || Math.abs(heading - 360) < 5, `heading=${heading}, expected ≈ 0°`);
});

test("computeMagHeading flat sensor magY dominant → heading ≈ 270° (West)", () => {
  const { computeMagHeading } = loadRuntime().api;
  // Flat sensor, mag field pointing along +Y (left) → West (270°)
  // atan2(-my_h, mx_h) = atan2(-Y, 0) with Y positive → atan2(negative, 0) = -90° → 270°
  const heading = computeMagHeading(0, 50, -40, 0, 0);
  assert.ok(heading !== null);
  assert.ok(Math.abs(heading - 270) < 5, `heading=${heading}, expected ≈ 270°`);
});

test("computeMagHeading heading increases when rotating East (0→90°)", () => {
  const { computeMagHeading } = loadRuntime().api;
  // Flat sensor, field at 45° between X and -Y → should be ~45° East
  // East = -Y direction, so mag_y negative means East component
  const heading = computeMagHeading(50, -50, -40, 0, 0);
  assert.ok(heading !== null);
  assert.ok(heading > 30 && heading < 60, `heading=${heading}, expected ≈ 45°`);
});

test("computeMagHeading with real sensor data (mag_x=0.879, mag_y=102.148, mag_z=-119.238)", () => {
  const { computeMagHeading } = loadRuntime().api;
  const heading = computeMagHeading(0.879, 102.148, -119.238, 0, 0);
  assert.ok(heading !== null);
  // With Y strongly positive (left) and X near zero → heading should be near 270° (West)
  assert.ok(heading > 250 && heading < 290, `heading=${heading}, expected ≈ 270°`);
});

test("normalizeConfig defaults mag_x/y/z to empty string", () => {
  const { normalizeConfig } = loadRuntime().api;
  const config = normalizeConfig({ type: "custom:rv-ha-lovelace-card" });
  assert.equal(config.entities.mag_x, "");
  assert.equal(config.entities.mag_y, "");
  assert.equal(config.entities.mag_z, "");
});

test("resolvePitchRoll returns rawPitch and rawRoll", () => {
  const { resolvePitchRoll, readNumericState } = loadRuntime().api;
  const hass = {
    states: {
      "sensor.pitch": { state: "2.5" },
      "sensor.roll": { state: "-1.3" },
    },
  };
  const config = {
    entities: { pitch: "sensor.pitch", roll: "sensor.roll" },
    orientation: { invert_pitch: true, swap_axes: false },
  };
  const pr = resolvePitchRoll(hass, config, false);
  assert.equal(pr.rawPitch, 2.5, "rawPitch should be original sensor value");
  assert.equal(pr.rawRoll, -1.3, "rawRoll should be original sensor value");
  assert.equal(pr.pitch, -2.5, "pitch should be inverted");
  assert.equal(pr.roll, -1.3, "roll should not be inverted");
});

test("_buildModel uses mag heading when mag entities configured", () => {
  const runtime = loadRuntime();
  const CardClass = runtime.registry.get("rv-ha-lovelace-card");
  const card = new CardClass();
  card._render = () => {};
  card.setConfig({ type: "custom:rv-ha-lovelace-card" });
  card._config = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    entities: {
      pitch: "sensor.pitch",
      roll: "sensor.roll",
      yaw: "sensor.yaw",
      mag_x: "sensor.mag_x",
      mag_y: "sensor.mag_y",
      mag_z: "sensor.mag_z",
    },
  });
  card._hass = {
    states: {
      "sensor.pitch": { state: "0" },
      "sensor.roll": { state: "0" },
      "sensor.yaw": { state: "90" },
      "sensor.mag_x": { state: "50" },
      "sensor.mag_y": { state: "0" },
      "sensor.mag_z": { state: "-40" },
    },
  };
  const model = card._buildModel();
  assert.equal(model.headingFromMag, true, "heading should come from magnetometer");
  assert.ok(model.yawAvailable, "yaw should be available");
  // mag heading: X dominant, flat → ≈ 0°/360°
  assert.ok(model.heading < 5 || model.heading > 355, `heading=${model.heading}, expected ≈ 0°`);
  // yaw should equal heading when from mag
  assert.equal(model.yaw, model.heading, "yaw should equal heading when from mag");
});

test("_buildModel falls back to yaw when mag entities not configured", () => {
  const runtime = loadRuntime();
  const CardClass = runtime.registry.get("rv-ha-lovelace-card");
  const card = new CardClass();
  card._render = () => {};
  card.setConfig({ type: "custom:rv-ha-lovelace-card" });
  card._config = runtime.api.normalizeConfig({
    type: "custom:rv-ha-lovelace-card",
    entities: {
      pitch: "sensor.pitch",
      roll: "sensor.roll",
      yaw: "sensor.yaw",
    },
  });
  card._hass = {
    states: {
      "sensor.pitch": { state: "0" },
      "sensor.roll": { state: "0" },
      "sensor.yaw": { state: "90" },
    },
  };
  const model = card._buildModel();
  assert.equal(model.headingFromMag, false, "heading should NOT come from magnetometer");
  assert.ok(model.yawAvailable, "yaw should be available from gyro");
  assert.ok(Math.abs(model.heading - 90) < 0.01, `heading=${model.heading}, expected 90°`);
});
