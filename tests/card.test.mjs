import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CARD_SOURCE = path.resolve(__dirname, "../dist/wit-ha-lovelace-card.js");

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
      currentScript: { src: "https://example.local/hacsfiles/wit-ha-lovelace-card/wit-ha-lovelace-card.js" },
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
  assert.equal(runtime.api.CARD_TYPE, "wit-ha-lovelace-card");
});

test("supports plain and custom-prefixed card types", () => {
  const runtime = loadRuntime();
  assert.equal(runtime.api.isSupportedCardType("wit-ha-lovelace-card"), true);
  assert.equal(runtime.api.isSupportedCardType("custom:wit-ha-lovelace-card"), true);
  assert.equal(runtime.api.isSupportedCardType("custom:other-card"), false);
});

test("version in package and card source are in sync", () => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8"));
  const runtime = loadRuntime();
  assert.equal(runtime.api.CARD_VERSION, pkg.version);
});

test("normalizeConfig applies defaults", () => {
  const runtime = loadRuntime();
  const cfg = runtime.api.normalizeConfig({ type: "custom:wit-ha-lovelace-card" });

  assert.equal(cfg.entities.pitch, "sensor.easylevelrv_neigung_x");
  assert.equal(cfg.geometry.wheelbase_mm, 2000);
  assert.equal(cfg.display.max_tilt_deg, 5);
  assert.equal(cfg.display.text_size_mode, "auto");
  assert.equal(cfg.orientation.swap_axes, false);
});

test("normalizeConfig keeps valid text_size_mode and falls back for invalid values", () => {
  const runtime = loadRuntime();

  const validCfg = runtime.api.normalizeConfig({
    type: "custom:wit-ha-lovelace-card",
    display: { text_size_mode: "large" },
  });
  assert.equal(validCfg.display.text_size_mode, "large");

  const invalidCfg = runtime.api.normalizeConfig({
    type: "custom:wit-ha-lovelace-card",
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

test("computeLeveling keeps diagonal raise mapping for YAML parity", () => {
  const runtime = loadRuntime();
  const result = runtime.api.computeLeveling(0, 5, {
    wheelbase_mm: 2000,
    track_front_mm: 1700,
    track_rear_mm: 1600,
  });

  const minZ = Math.min(result.z_fl, result.z_fr, result.z_rl, result.z_rr);
  assert.equal(result.raise_fl, Math.max(0, result.z_rr - minZ));
  assert.equal(result.raise_fr, Math.max(0, result.z_rl - minZ));
  assert.equal(result.raise_rl, Math.max(0, result.z_fr - minZ));
  assert.equal(result.raise_rr, Math.max(0, result.z_fl - minZ));
});

test("clampTiltForLeveling caps extreme angles for stable rendering", () => {
  const runtime = loadRuntime();
  assert.equal(runtime.api.clampTiltForLeveling(5), 5);
  assert.equal(runtime.api.clampTiltForLeveling(120), 30);
  assert.equal(runtime.api.clampTiltForLeveling(-120), -30);
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
  assert.equal(runtime.customCards[0].type, "wit-ha-lovelace-card");
  assert.equal(runtime.customCards[0].preview, false);
});
