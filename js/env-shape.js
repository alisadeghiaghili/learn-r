/**
 * Normalize WebR `toJs()` list-of-lists into plain env rows.
 * Pure — no WebR import — unit-testable in Node.
 *
 * @param {any} js
 * @returns {{ name: string, class: string, type: string, length: number, preview: string }[]}
 */
export function normalizeEnvList(js) {
  const items = extractItems(js);
  const rows = [];

  for (const item of items) {
    const row = toPlainRecord(item);
    if (!row || !row.name) continue;
    rows.push({
      name: String(row.name),
      class: String(row.class ?? ""),
      type: String(row.type ?? ""),
      length: Number(row.length ?? 0),
      preview: String(row.preview ?? ""),
    });
  }
  return rows;
}

function extractItems(js) {
  if (!js) return [];
  if (Array.isArray(js)) return js;
  if (js.values && Array.isArray(js.values)) return js.values;
  return [js];
}

function toPlainRecord(item) {
  if (!item) return null;
  if (item instanceof Map) {
    const rec = {};
    for (const [k, v] of item.entries()) rec[k] = unwrap(v);
    return unpackNamedList(rec);
  }
  if (typeof item === "object") {
    const rec = {};
    for (const [k, v] of Object.entries(item)) rec[k] = unwrap(v);
    return unpackNamedList(rec);
  }
  return null;
}

function unpackNamedList(rec) {
  if ("name" in rec && typeof rec.name === "string") return rec;
  if (Array.isArray(rec.values) && rec.names) {
    const names = Array.isArray(rec.names)
      ? rec.names
      : Array.isArray(rec.names.values)
        ? rec.names.values
        : [];
    const out = {};
    names.forEach((n, i) => {
      out[String(n)] = unwrap(rec.values[i]);
    });
    return out;
  }
  return rec;
}

function unwrap(v) {
  if (!v || typeof v !== "object") return v;
  if (!("values" in v) || !Array.isArray(v.values)) return v;
  if (v.type === "string") {
    return v.values.length === 1 ? String(v.values[0]) : v.values.map(String);
  }
  if (v.values.length === 1) return unwrap(v.values[0]);
  return v.values.map(unwrap);
}
