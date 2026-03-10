const CARD_TYPE = "wit-ha-lovelace-card";
const CARD_NAME = "WIT RV Level Lovelace Card";
const CARD_VERSION = "0.1.2";

const DEFAULT_GEOMETRY = {
  wheelbase_mm: 2000,
  track_front_mm: 1723,
  track_rear_mm: 1661,
};

const DEFAULT_DISPLAY = {
  max_tilt_deg: 5,
  level_tolerance_cm: 0.1,
  show_temperature: true,
  show_battery: true,
  show_corner_values: true,
};

const DEFAULT_ORIENTATION = {
  swap_axes: false,
  invert_pitch: false,
  invert_roll: false,
};

const DEFAULT_ENTITIES = {
  pitch: "sensor.easylevelrv_neigung_x",
  roll: "sensor.easylevelrv_neigung_y",
  temperature: "sensor.easylevelrv_temperatur",
  battery_soc: "sensor.easylevelrv_batterie",
};

const I18N = {
  de: {
    default_title: "Flair 920 - Wasserwaage",
    image_alt: "WIT Wohnmobil Nivellierung",
    general: "Allgemein",
    title: "Ueberschrift",
    image_url: "Basisbild URL (optional)",
    entities: "Entitaeten",
    pitch_entity: "Neigung X/Pitch",
    roll_entity: "Neigung Y/Roll",
    temp_entity: "Temperatur",
    batt_entity: "Batterie SoC",
    geometry: "Geometrie",
    wheelbase_mm: "Achsabstand (mm)",
    track_front_mm: "Spur vorne (mm)",
    track_rear_mm: "Spur hinten (mm)",
    display: "Anzeige",
    max_tilt_deg: "Max Tilt fuer Punkt (Grad)",
    level_tolerance_cm: "Nivellier-Toleranz (cm)",
    show_temperature: "Temperatur anzeigen",
    show_battery: "Batterie anzeigen",
    show_corner_values: "Eckwerte anzeigen",
    orientation: "Sensorausrichtung",
    swap_axes: "X/Y tauschen",
    invert_pitch: "Pitch invertieren",
    invert_roll: "Roll invertieren",
    not_available: "--",
    unit_cm: "cm",
    unit_deg: "deg",
  },
  en: {
    default_title: "Flair 920 - Level",
    image_alt: "WIT RV leveling",
    general: "General",
    title: "Title",
    image_url: "Base image URL (optional)",
    entities: "Entities",
    pitch_entity: "Inclination X/Pitch",
    roll_entity: "Inclination Y/Roll",
    temp_entity: "Temperature",
    batt_entity: "Battery SoC",
    geometry: "Geometry",
    wheelbase_mm: "Wheelbase (mm)",
    track_front_mm: "Front track (mm)",
    track_rear_mm: "Rear track (mm)",
    display: "Display",
    max_tilt_deg: "Max tilt for dot (deg)",
    level_tolerance_cm: "Level tolerance (cm)",
    show_temperature: "Show temperature",
    show_battery: "Show battery",
    show_corner_values: "Show corner values",
    orientation: "Sensor orientation",
    swap_axes: "Swap X/Y",
    invert_pitch: "Invert pitch",
    invert_roll: "Invert roll",
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
]);

function detectScriptBasePath() {
  if (typeof document === "undefined") return "";

  const scriptFromCurrent = document.currentScript?.src || "";
  if (scriptFromCurrent.includes("wit-ha-lovelace-card.js")) {
    return scriptFromCurrent.slice(0, scriptFromCurrent.lastIndexOf("/"));
  }

  const scripts = document.querySelectorAll?.("script[src]") || [];
  for (const script of scripts) {
    const src = String(script?.src || "");
    if (src.includes("wit-ha-lovelace-card.js")) {
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
const DEFAULT_IMAGE_CANDIDATES = uniq([
  SCRIPT_BASE ? `${SCRIPT_BASE}/rv_top_flair.png` : "",
  "/hacsfiles/wit-ha-lovelace-card/rv_top_flair.png",
  "/local/community/wit-ha-lovelace-card/rv_top_flair.png",
  "/local/wit-ha-lovelace-card/rv_top_flair.png",
  SCRIPT_BASE ? `${SCRIPT_BASE}/wit-rv-top.svg` : "",
  "/hacsfiles/wit-ha-lovelace-card/wit-rv-top.svg",
  "/local/community/wit-ha-lovelace-card/wit-rv-top.svg",
  "/local/wit-ha-lovelace-card/wit-rv-top.svg",
]);

const DEFAULT_ICON_CANDIDATES = uniq([
  SCRIPT_BASE ? `${SCRIPT_BASE}/wit-icon.svg` : "",
  "/hacsfiles/wit-ha-lovelace-card/wit-icon.svg",
  "/local/community/wit-ha-lovelace-card/wit-icon.svg",
  "/local/wit-ha-lovelace-card/wit-icon.svg",
]);

function resolveLanguage(hass) {
  const raw = String(hass?.locale?.language || hass?.language || "").toLowerCase();
  return raw.startsWith("de") ? "de" : "en";
}

function t(lang, key) {
  return I18N[lang]?.[key] || I18N.en[key] || key;
}

function clampNumber(value, min, max, fallback) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.max(min, Math.min(max, num));
}

function normalizeConfig(config) {
  const raw = config || {};
  const normalized = {
    type: `custom:${CARD_TYPE}`,
    title: "",
    image: "",
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
  normalized.display.show_temperature = Boolean(normalized.display.show_temperature);
  normalized.display.show_battery = Boolean(normalized.display.show_battery);
  normalized.display.show_corner_values = Boolean(normalized.display.show_corner_values);

  normalized.orientation.swap_axes = Boolean(normalized.orientation.swap_axes);
  normalized.orientation.invert_pitch = Boolean(normalized.orientation.invert_pitch);
  normalized.orientation.invert_roll = Boolean(normalized.orientation.invert_roll);

  return normalized;
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

function resolvePitchRoll(hass, config) {
  const pitchEntity = config?.entities?.pitch || "";
  const rollEntity = config?.entities?.roll || "";

  let pitch = readNumericState(hass, pitchEntity);
  let roll = readNumericState(hass, rollEntity);

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

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fmtOne(value) {
  if (!Number.isFinite(value)) return "0.0";
  return (Math.round(value * 10) / 10).toFixed(1);
}

class WitHaLovelaceCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = undefined;
    this._config = normalizeConfig({});
    this._imageIdx = 0;
    this._domReady = false;
    this._nodes = {};
    this._cachedTrackedEntityIds = null;
    this._boundWrapperClick = this._onWrapperClick.bind(this);
  }

  static getStubConfig() {
    return {
      type: `custom:${CARD_TYPE}`,
      title: "",
    };
  }

  static getConfigElement() {
    return document.createElement("wit-ha-lovelace-card-editor");
  }

  setConfig(config) {
    if (!config || !isSupportedCardType(config.type)) {
      throw new Error(`Invalid configuration for ${CARD_TYPE}`);
    }
    this._config = normalizeConfig(config);
    this._cachedTrackedEntityIds = null;
    this._imageIdx = 0;
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
    if (this._nodes.wrapper) {
      this._nodes.wrapper.removeEventListener("click", this._boundWrapperClick);
    }
    if (this._nodes.img) {
      this._nodes.img.onerror = null;
    }
    this._domReady = false;
  }

  getCardSize() {
    const width = this.offsetWidth || this.getBoundingClientRect().width || 0;
    if (!width) return 8;
    const imageHeight = (width * 1093) / 550;
    const headerHeight = 56;
    return Math.max(8, Math.ceil((imageHeight + headerHeight) / 50));
  }

  _lang() {
    return resolveLanguage(this._hass);
  }

  _t(key) {
    return t(this._lang(), key);
  }

  _resolveImageUrl() {
    if (this._config.image) return this._config.image;
    const idx = Math.max(0, Math.min(DEFAULT_IMAGE_CANDIDATES.length - 1, this._imageIdx));
    return DEFAULT_IMAGE_CANDIDATES[idx] || "";
  }

  _onImageError = () => {
    if (this._config.image) return;
    if (this._imageIdx < DEFAULT_IMAGE_CANDIDATES.length - 1) {
      this._imageIdx += 1;
      this._render();
      return;
    }
    console.error(`${CARD_NAME}: failed to load base image`, DEFAULT_IMAGE_CANDIDATES);
  };

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
    const pr = resolvePitchRoll(this._hass, this._config);
    const level = pr.valid ? computeLeveling(pr.pitch, pr.roll, this._config.geometry) : null;
    const maxTilt = this._config.display.max_tilt_deg || DEFAULT_DISPLAY.max_tilt_deg;

    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const dotNx = pr.valid ? clamp((-pr.roll) / maxTilt) : 0;
    const dotNy = pr.valid ? clamp((-pr.pitch) / maxTilt) : 0;

    const tol = this._config.display.level_tolerance_cm;
    const corners = {
      fl: {
        raise: level ? level.raise_fl : null,
        levelOk: Boolean(level && level.raise_fl <= tol),
      },
      fr: {
        raise: level ? level.raise_fr : null,
        levelOk: Boolean(level && level.raise_fr <= tol),
      },
      rl: {
        raise: level ? level.raise_rl : null,
        levelOk: Boolean(level && level.raise_rl <= tol),
      },
      rr: {
        raise: level ? level.raise_rr : null,
        levelOk: Boolean(level && level.raise_rr <= tol),
      },
    };

    return {
      valid: pr.valid,
      pitch: pr.pitch,
      roll: pr.roll,
      dotNx,
      dotNy,
      corners,
      tempText: this._formatRawEntity(this._config.entities.temperature, this._t("not_available")),
      battText: this._formatRawEntity(this._config.entities.battery_soc, this._t("not_available")),
    };
  }

  _onWrapperClick(ev) {
    const clickable = ev.target?.closest?.("[data-entity-key]");
    if (!clickable) return;
    const key = String(clickable.dataset.entityKey || "");
    const entityId = this._config.entities?.[key] || "";
    if (entityId) this._emitMoreInfo(entityId);
  }

  _hasValidDomReferences() {
    if (!this._domReady || !this.shadowRoot) return false;
    if (!this._nodes || !this._nodes.wrapper) return false;
    if (typeof this.shadowRoot.contains === "function" && !this.shadowRoot.contains(this._nodes.wrapper)) return false;
    return true;
  }

  _ensureDom() {
    if (this._hasValidDomReferences()) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card { overflow: hidden; }
        .wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 550 / 1093;
          background: #9bc4d6;
          border-radius: 16px;
          overflow: hidden;
        }
        img.base {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
        .overlay {
          position: absolute;
          color: #111;
          text-shadow: 0 0 4px rgba(255,255,255,0.92);
          font-family: Arial, sans-serif;
          z-index: 2;
        }
        .clickable { cursor: pointer; }
        .temp { top: 2%; left: 7%; font-size: clamp(14px, 2.7vw, 22px); }
        .batt { top: 2%; right: 7%; font-size: clamp(14px, 2.7vw, 22px); }
        .title {
          top: 8%;
          left: 50%;
          transform: translateX(-50%);
          font-size: clamp(15px, 4.8vw, 40px);
          font-weight: 500;
          white-space: nowrap;
        }
        .pitch {
          bottom: 8%;
          left: 51%;
          transform: translateX(-50%);
          font-size: clamp(26px, 8.2vw, 54px);
          font-weight: 500;
        }
        .roll {
          right: 5%;
          top: 50%;
          transform: translateY(-50%);
          font-size: clamp(26px, 8.2vw, 54px);
          font-weight: 500;
        }
        .dot {
          position: absolute;
          width: 8.4%;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background: #ff1b1b;
          border: 2px solid #2f2828;
          box-shadow: 0 0 8px rgba(0,0,0,0.5);
          left: 50%;
          top: 49%;
          transform: translate(-50%, -50%);
          z-index: 3;
          pointer-events: none;
        }
        .corner {
          position: absolute;
          width: 10%;
          text-align: center;
          z-index: 3;
        }
        .corner.fl { top: 27%; left: 18%; transform: translate(-50%, -50%); }
        .corner.fr { top: 27%; right: 18%; transform: translate(50%, -50%); }
        .corner.rl { bottom: 30%; left: 18%; transform: translate(-50%, 50%); }
        .corner.rr { bottom: 30%; right: 18%; transform: translate(50%, 50%); }
        .corner .marker {
          margin: 0 auto;
          width: 100%;
          aspect-ratio: 1 / 1;
        }
        .corner .marker.level {
          border-radius: 50%;
          background: #00c853;
          box-shadow: 0 0 8px rgba(0,0,0,0.45);
        }
        .corner .marker.raise {
          width: 0;
          height: 0;
          border-left: 1.8vw solid transparent;
          border-right: 1.8vw solid transparent;
          border-bottom: 2.9vw solid #ff1744;
        }
        .corner-value {
          position: absolute;
          font-size: clamp(16px, 5vw, 34px);
          font-weight: 500;
          color: #111;
          text-shadow: 0 0 4px rgba(255,255,255,0.92);
          z-index: 2;
        }
        .cv-fl { top: 31%; left: 18%; transform: translate(-50%, -50%); }
        .cv-fr { top: 31%; right: 18%; transform: translate(50%, -50%); }
        .cv-rl { bottom: 24%; left: 18%; transform: translate(-50%, 50%); }
        .cv-rr { bottom: 24%; right: 18%; transform: translate(50%, 50%); }
      </style>
      <ha-card>
        <div class="wrapper">
          <img class="base" alt="" />
          <div class="overlay temp clickable" data-entity-key="temperature"></div>
          <div class="overlay batt clickable" data-entity-key="battery_soc"></div>
          <div class="overlay title"></div>
          <div class="overlay pitch clickable" data-entity-key="pitch"></div>
          <div class="overlay roll clickable" data-entity-key="roll"></div>
          <div class="dot"></div>

          <div class="corner fl"><div class="marker"></div></div>
          <div class="corner fr"><div class="marker"></div></div>
          <div class="corner rl"><div class="marker"></div></div>
          <div class="corner rr"><div class="marker"></div></div>

          <div class="corner-value cv-fl"></div>
          <div class="corner-value cv-fr"></div>
          <div class="corner-value cv-rl"></div>
          <div class="corner-value cv-rr"></div>
        </div>
      </ha-card>
    `;

    const wrapper = this.shadowRoot.querySelector(".wrapper");
    const nodes = {
      wrapper,
      img: this.shadowRoot.querySelector("img.base"),
      temp: this.shadowRoot.querySelector(".temp"),
      batt: this.shadowRoot.querySelector(".batt"),
      title: this.shadowRoot.querySelector(".title"),
      pitch: this.shadowRoot.querySelector(".pitch"),
      roll: this.shadowRoot.querySelector(".roll"),
      dot: this.shadowRoot.querySelector(".dot"),
      flm: this.shadowRoot.querySelector(".corner.fl .marker"),
      frm: this.shadowRoot.querySelector(".corner.fr .marker"),
      rlm: this.shadowRoot.querySelector(".corner.rl .marker"),
      rrm: this.shadowRoot.querySelector(".corner.rr .marker"),
      flv: this.shadowRoot.querySelector(".cv-fl"),
      frv: this.shadowRoot.querySelector(".cv-fr"),
      rlv: this.shadowRoot.querySelector(".cv-rl"),
      rrv: this.shadowRoot.querySelector(".cv-rr"),
    };

    nodes.img.onerror = this._onImageError;
    wrapper.addEventListener("click", this._boundWrapperClick);

    this._nodes = nodes;
    this._domReady = true;
  }

  _update() {
    if (!this._domReady) return;

    const title = this._config.title || this._t("default_title");
    const model = this._buildModel();

    const imageUrl = this._resolveImageUrl();
    if (this._nodes.img?.dataset.src !== imageUrl) {
      this._nodes.img.dataset.src = imageUrl;
      this._nodes.img.src = imageUrl;
    }
    this._nodes.img.alt = this._t("image_alt");

    this._nodes.title.textContent = title;

    this._nodes.temp.hidden = !this._config.display.show_temperature;
    this._nodes.batt.hidden = !this._config.display.show_battery;
    this._nodes.temp.textContent = model.tempText;
    this._nodes.batt.textContent = model.battText;

    const pitchText = model.valid ? `${fmtOne(model.pitch)} ${this._t("unit_deg")}` : `${this._t("not_available")} ${this._t("unit_deg")}`;
    const rollText = model.valid ? `${fmtOne(model.roll)} ${this._t("unit_deg")}` : `${this._t("not_available")} ${this._t("unit_deg")}`;
    this._nodes.pitch.textContent = pitchText;
    this._nodes.roll.textContent = rollText;

    const dotX = 50 + model.dotNx * 12;
    const dotY = 49 + model.dotNy * 12;
    this._nodes.dot.style.left = `${dotX}%`;
    this._nodes.dot.style.top = `${dotY}%`;

    const updateCorner = (markerNode, valueNode, corner) => {
      markerNode.className = "marker";
      markerNode.classList.add(corner.levelOk ? "level" : "raise");
      if (this._config.display.show_corner_values) {
        valueNode.hidden = false;
        const value = corner.raise === null ? 0 : corner.raise;
        valueNode.textContent = `${fmtOne(value)} ${this._t("unit_cm")}`;
      } else {
        valueNode.hidden = true;
      }
    };

    updateCorner(this._nodes.flm, this._nodes.flv, model.corners.fl);
    updateCorner(this._nodes.frm, this._nodes.frv, model.corners.fr);
    updateCorner(this._nodes.rlm, this._nodes.rlv, model.corners.rl);
    updateCorner(this._nodes.rrm, this._nodes.rrv, model.corners.rr);
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

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: Arial, sans-serif; }
        .grid { display: grid; gap: 14px; }
        .section { border: 1px solid #dcdcdc; border-radius: 10px; padding: 12px; }
        h3 { margin: 0 0 10px 0; font-size: 16px; }
        .row { display: grid; gap: 6px; margin-bottom: 8px; }
        .row.inline { grid-template-columns: 1fr 1fr; gap: 10px; }
        label { font-size: 13px; color: #3a3a3a; }
        input[type="text"], input[type="number"] {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #c9c9c9;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 14px;
        }
        .check { display: flex; align-items: center; gap: 8px; margin: 6px 0; }
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
          <div class="row inline">
            <div><label>${escapeHtml(this._t("max_tilt_deg"))}</label><input id="max_tilt_deg" data-group="display" type="number" step="0.1" value="${escapeHtml(c.display.max_tilt_deg)}" /></div>
            <div><label>${escapeHtml(this._t("level_tolerance_cm"))}</label><input id="level_tolerance_cm" data-group="display" type="number" step="0.1" value="${escapeHtml(c.display.level_tolerance_cm)}" /></div>
          </div>
          <label class="check"><input id="show_temperature" data-group="display" type="checkbox" ${c.display.show_temperature ? "checked" : ""} /> ${escapeHtml(this._t("show_temperature"))}</label>
          <label class="check"><input id="show_battery" data-group="display" type="checkbox" ${c.display.show_battery ? "checked" : ""} /> ${escapeHtml(this._t("show_battery"))}</label>
          <label class="check"><input id="show_corner_values" data-group="display" type="checkbox" ${c.display.show_corner_values ? "checked" : ""} /> ${escapeHtml(this._t("show_corner_values"))}</label>
        </div>

        <div class="section">
          <h3>${escapeHtml(this._t("orientation"))}</h3>
          <label class="check"><input id="swap_axes" data-group="orientation" type="checkbox" ${c.orientation.swap_axes ? "checked" : ""} /> ${escapeHtml(this._t("swap_axes"))}</label>
          <label class="check"><input id="invert_pitch" data-group="orientation" type="checkbox" ${c.orientation.invert_pitch ? "checked" : ""} /> ${escapeHtml(this._t("invert_pitch"))}</label>
          <label class="check"><input id="invert_roll" data-group="orientation" type="checkbox" ${c.orientation.invert_roll ? "checked" : ""} /> ${escapeHtml(this._t("invert_roll"))}</label>
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

if (!customElements.get("wit-ha-lovelace-card-editor")) {
  customElements.define("wit-ha-lovelace-card-editor", WitHaLovelaceCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === CARD_TYPE)) {
  window.customCards.push({
    type: CARD_TYPE,
    name: CARD_NAME,
    description: "RV leveling visualization card for WIT tilt sensors.",
    preview: false,
    documentationURL: "https://github.com/othorg/wit-ha-lovelace-card",
    icon: DEFAULT_ICON_CANDIDATES[0] || "mdi:caravan",
  });
}

window.__WIT_CARD_TEST_API = {
  CARD_TYPE,
  CARD_VERSION,
  normalizeConfig,
  computeLeveling,
  resolvePitchRoll,
  readNumericState,
  clampNumber,
  isSupportedCardType,
};

console.info(`%c${CARD_NAME} %c${CARD_VERSION}`, "color:#0b75b7;font-weight:700", "color:#666;font-weight:400");
