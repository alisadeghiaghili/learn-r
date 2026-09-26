/**
 * Environment tree and plot stage rendering.
 */

/**
 * @param {HTMLElement} root
 * @param {{ name: string, class: string, type: string, length: number, preview: string }[]} rows
 * @param {Set<string>} previousNames
 */
export function renderEnvTree(root, rows, previousNames = new Set()) {
  root.replaceChildren();

  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "env-empty";
    empty.textContent = "Empty environment. Assign with <- to create objects.";
    root.append(empty);
    return;
  }

  for (const row of rows) {
    const el = document.createElement("div");
    el.className = "env-row";
    if (!previousNames.has(row.name)) {
      el.classList.add("is-new");
    }

    const name = document.createElement("span");
    name.className = "env-name";
    name.textContent = row.name;

    const klass = document.createElement("span");
    klass.className = "env-class";
    const len = Number.isFinite(row.length) ? ` len ${row.length}` : "";
    klass.textContent = `${row.class || row.type}${len}`;

    const prev = document.createElement("span");
    prev.className = "env-preview";
    prev.textContent = row.preview || "";
    prev.title = row.preview || "";

    el.append(name, klass, prev);
    root.append(el);
  }
}

/**
 * @param {HTMLImageElement} img
 * @param {HTMLElement} empty
 * @param {string|null} url
 * @param {(url: string|null) => void} [revoke]
 */
export function renderPlot(img, empty, url) {
  if (url) {
    img.src = url;
    img.hidden = false;
    empty.hidden = true;
  } else {
    img.removeAttribute("src");
    img.hidden = true;
    empty.hidden = false;
  }
}

/**
 * Switch viz tab.
 * @param {HTMLElement} vizRoot
 * @param {"env"|"plot"} which
 */
export function setVizTab(vizRoot, which) {
  const tabs = vizRoot.querySelectorAll(".viz-tab");
  for (const tab of tabs) {
    const active = tab.dataset.viz === which;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  }
  const envPane = vizRoot.querySelector("#viz-env");
  const plotPane = vizRoot.querySelector("#viz-plot");
  envPane.hidden = which !== "env";
  envPane.classList.toggle("is-active", which === "env");
  plotPane.hidden = which !== "plot";
  plotPane.classList.toggle("is-active", which === "plot");
}
