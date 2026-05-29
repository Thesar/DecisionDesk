const STORAGE_KEY = "decisiondesk-decisions";

const seedDecisions = [
  { id: 1, name: "Price Change", type: "price", value: 10, risk: 0.2 },
  { id: 2, name: "Hiring", type: "hiring", value: 5000, risk: 0.3 },
  { id: 3, name: "Marketing", type: "marketing", value: 2000, risk: 0.25 },
  { id: 4, name: "Expansion", type: "investment", value: 10000, risk: 0.5 },
  { id: 5, name: "Discount", type: "price", value: 5, risk: 0.15 },
];

const viewConfig = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Përmbledhje e vendimeve, riskut dhe vlerës totale.",
    label: "Dashboard",
    insight: "All decisions are visible.",
    text: "Use the dashboard to start the demo, then move into Decisions for CRUD.",
  },
  decisions: {
    title: "Decisions",
    subtitle: "Menaxho vendimet e biznesit me validim, ruajtje CSV dhe CRUD live.",
    label: "Decisions",
    insight: "CRUD flow is ready.",
    text: "Add, list, edit and delete decisions from this screen.",
  },
  projects: {
    title: "Projects",
    subtitle: "Vendimet e investimeve dhe projekteve strategjike.",
    label: "Projects",
    insight: "Project-related decisions are filtered.",
    text: "This view focuses on investment and strategic decisions.",
    types: ["investment", "strategic"],
  },
  initiatives: {
    title: "Initiatives",
    subtitle: "Marketing, hiring dhe nisma operacionale.",
    label: "Initiatives",
    insight: "Initiatives are filtered by type.",
    text: "Useful for showing how the same data can be organized by business area.",
    types: ["marketing", "hiring", "operational"],
  },
  risks: {
    title: "Risks",
    subtitle: "Vendime me risk më të lartë se 0.30.",
    label: "Risk Review",
    insight: "High risk decisions need attention.",
    text: "This button now filters the table to show only high risk items.",
    filter: (decision) => decision.risk > 0.3,
  },
  actions: {
    title: "Actions",
    subtitle: "Vendime që kanë nevojë për follow-up.",
    label: "Action Queue",
    insight: "Pending and review items are highlighted.",
    text: "This view shows decisions that are not fully approved yet.",
    filter: (decision) => decision.risk >= 0.25,
  },
  reports: {
    title: "Reports",
    subtitle: "Raport i shpejtë për vlerën, riskun dhe tipet kryesore.",
    label: "Report Summary",
    insight: "Report view summarizes the current portfolio.",
    text: "Use the Export button to generate a browser download of the visible table.",
  },
  analytics: {
    title: "Analytics",
    subtitle: "Vendimet e renditura sipas vlerës.",
    label: "Analytics",
    insight: "Highest value decisions appear first.",
    text: "This view sorts the visible decisions by value for quick comparison.",
    sort: (a, b) => b.value - a.value,
  },
  documents: {
    title: "Documents",
    subtitle: "Dokumentim dhe materiale për demo.",
    label: "Documents",
    insight: "README, demo plan and output backup are ready.",
    text: "For Vercel demo, the UI works with local browser data; locally it connects to C# API and CSV.",
  },
};

const state = {
  decisions: [],
  editingId: null,
  usesApi: true,
  activeView: "dashboard",
};

const elements = {
  rows: document.querySelector("#decisionRows"),
  emptyState: document.querySelector("#emptyState"),
  typeFilter: document.querySelector("#typeFilter"),
  searchInput: document.querySelector("#searchInput"),
  topSearchInput: document.querySelector("#topSearchInput"),
  filterButton: document.querySelector("#filterButton"),
  exportButton: document.querySelector("#exportButton"),
  form: document.querySelector("#decisionForm"),
  formTitle: document.querySelector("#formTitle"),
  formMessage: document.querySelector("#formMessage"),
  decisionId: document.querySelector("#decisionId"),
  nameInput: document.querySelector("#nameInput"),
  typeInput: document.querySelector("#typeInput"),
  descriptionInput: document.querySelector("#descriptionInput"),
  valueInput: document.querySelector("#valueInput"),
  riskInput: document.querySelector("#riskInput"),
  ownerInput: document.querySelector("#ownerInput"),
  resetButton: document.querySelector("#resetButton"),
  cancelButton: document.querySelector("#cancelButton"),
  resetDataButton: document.querySelector("#resetDataButton"),
  totalDecisions: document.querySelector("#totalDecisions"),
  pendingDecisions: document.querySelector("#pendingDecisions"),
  highRisk: document.querySelector("#highRisk"),
  totalValue: document.querySelector("#totalValue"),
  activeFilter: document.querySelector("#activeFilter"),
  statusPill: document.querySelector("#statusPill"),
  pageTitle: document.querySelector("#pageTitle"),
  pageSubtitle: document.querySelector("#pageSubtitle"),
  insightLabel: document.querySelector("#insightLabel"),
  insightTitle: document.querySelector("#insightTitle"),
  insightText: document.querySelector("#insightText"),
  notificationButton: document.querySelector("#notificationButton"),
  helpButton: document.querySelector("#helpButton"),
};

async function loadDecisions() {
  try {
    const response = await fetch("/api/decisions", { headers: { Accept: "application/json" } });
    const contentType = response.headers.get("content-type") || "";

    if (!response.ok || !contentType.includes("application/json")) {
      throw new Error("API unavailable");
    }

    state.decisions = await response.json();
    state.usesApi = true;
  } catch {
    state.decisions = loadLocalDecisions();
    state.usesApi = false;
  }

  updateModeLabel();
  syncTypeFilter();
  render();
}

function loadLocalDecisions() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    saveLocalDecisions(seedDecisions);
    return [...seedDecisions];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [...seedDecisions];
  } catch {
    saveLocalDecisions(seedDecisions);
    return [...seedDecisions];
  }
}

function saveLocalDecisions(decisions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
}

function updateModeLabel() {
  elements.statusPill.textContent = state.usesApi ? "Demo Ready" : "Vercel Demo";
}

function syncTypeFilter() {
  const currentValue = elements.typeFilter.value;
  const types = [...new Set(state.decisions.map((decision) => decision.type))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  elements.typeFilter.innerHTML = '<option value="">All Types</option>';

  for (const type of types) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    elements.typeFilter.append(option);
  }

  elements.typeFilter.value = types.includes(currentValue) ? currentValue : "";
}

function setView(viewName) {
  state.activeView = viewName;
  elements.typeFilter.value = "";
  syncSearch(elements.searchInput.value);

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName && button.classList.contains("nav-item"));
  });

  render();
}

function getVisibleDecisions() {
  const config = viewConfig[state.activeView] || viewConfig.dashboard;
  const type = elements.typeFilter.value.toLowerCase();
  const search = elements.searchInput.value.trim().toLowerCase();

  let decisions = state.decisions.filter((decision) => {
    const matchesViewTypes = !config.types || config.types.includes(decision.type.toLowerCase());
    const matchesViewFilter = !config.filter || config.filter(decision);
    const matchesType = !type || decision.type.toLowerCase() === type;
    const matchesSearch =
      !search ||
      decision.name.toLowerCase().includes(search) ||
      decision.type.toLowerCase().includes(search) ||
      getOwner(decision).toLowerCase().includes(search) ||
      String(decision.id).includes(search);

    return matchesViewTypes && matchesViewFilter && matchesType && matchesSearch;
  });

  if (config.sort) {
    decisions = [...decisions].sort(config.sort);
  }

  return decisions;
}

function render() {
  const visibleDecisions = getVisibleDecisions();
  renderViewText(visibleDecisions);
  renderMetrics(visibleDecisions);
  renderRows(visibleDecisions);
}

function renderViewText(visibleDecisions) {
  const config = viewConfig[state.activeView] || viewConfig.dashboard;
  elements.pageTitle.textContent = config.title;
  elements.pageSubtitle.textContent = config.subtitle;
  elements.insightLabel.textContent = config.label;
  elements.insightTitle.textContent = config.insight;
  elements.insightText.textContent = `${config.text} Showing ${visibleDecisions.length} item(s).`;
}

function renderMetrics(visibleDecisions) {
  const totalValue = visibleDecisions.reduce((sum, decision) => sum + decision.value, 0);
  const highRisk = visibleDecisions.filter((decision) => decision.risk > 0.3).length;
  const pending = visibleDecisions.filter((decision) => getStatus(decision).label !== "Approved").length;

  elements.totalDecisions.textContent = visibleDecisions.length;
  elements.pendingDecisions.textContent = pending;
  elements.highRisk.textContent = highRisk;
  elements.totalValue.textContent = formatValue(totalValue);
  elements.activeFilter.textContent = elements.typeFilter.value || viewConfig[state.activeView].label;
}

function renderRows(visibleDecisions) {
  elements.rows.innerHTML = "";
  elements.emptyState.hidden = visibleDecisions.length > 0;

  for (const decision of visibleDecisions) {
    const status = getStatus(decision);
    const owner = getOwner(decision);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="id-cell">DEC-${String(decision.id).padStart(3, "0")}</td>
      <td>${escapeHtml(decision.name)}</td>
      <td><span class="type-chip">${escapeHtml(decision.type)}</span></td>
      <td><span class="owner-cell"><span class="avatar">${initials(owner)}</span>${escapeHtml(owner)}</span></td>
      <td>${formatValue(decision.value)}</td>
      <td><span class="risk-chip ${riskClass(decision.risk)}">${riskLabel(decision.risk)}</span></td>
      <td><span class="status-chip ${status.className}">${status.label}</span></td>
      <td>${getUpdatedDate(decision)}</td>
      <td>
        <div class="action-group">
          <button class="row-button edit" type="button" data-action="edit" data-id="${decision.id}">Edit</button>
          <button class="row-button delete" type="button" data-action="delete" data-id="${decision.id}">Delete</button>
        </div>
      </td>
    `;
    elements.rows.append(tr);
  }
}

async function saveDecision(event) {
  event.preventDefault();

  const payload = {
    name: elements.nameInput.value.trim(),
    type: elements.typeInput.value.trim(),
    value: Number(elements.valueInput.value),
    risk: Number(elements.riskInput.value),
  };

  const validationMessage = validateDecision(payload);

  if (validationMessage) {
    showMessage(validationMessage, "error");
    return;
  }

  if (state.usesApi) {
    const saved = await saveDecisionWithApi(payload);

    if (!saved) {
      return;
    }
  } else {
    saveDecisionLocally(payload);
  }

  showMessage(state.editingId ? "Vendimi u përditësua." : "Vendimi u shtua.", "success");
  resetForm();
  await loadDecisions();
}

async function saveDecisionWithApi(payload) {
  const url = state.editingId ? `/api/decisions/${state.editingId}` : "/api/decisions";
  const method = state.editingId ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Ruajtja dështoi." }));
    showMessage(error.message, "error");
    return false;
  }

  return true;
}

function saveDecisionLocally(payload) {
  if (state.editingId) {
    state.decisions = state.decisions.map((decision) =>
      decision.id === state.editingId
        ? { ...decision, name: payload.name, value: payload.value }
        : decision
    );
  } else {
    const nextId = state.decisions.length ? Math.max(...state.decisions.map((decision) => decision.id)) + 1 : 1;
    state.decisions = [...state.decisions, { ...payload, id: nextId }];
  }

  saveLocalDecisions(state.decisions);
}

function validateDecision(decision) {
  if (!decision.name) {
    return "Emri nuk mund të jetë bosh.";
  }

  if (!decision.type) {
    return "Tipi nuk mund të jetë bosh.";
  }

  if (decision.name.includes(",") || decision.type.includes(",")) {
    return "Emri dhe tipi nuk duhet të përmbajnë presje.";
  }

  if (decision.value <= 0) {
    return "Vlera duhet të jetë më e madhe se 0.";
  }

  if (decision.risk < 0) {
    return "Risku nuk mund të jetë negativ.";
  }

  return "";
}

function editDecision(id) {
  const decision = state.decisions.find((item) => item.id === id);

  if (!decision) {
    return;
  }

  state.editingId = id;
  elements.formTitle.textContent = "Update Decision";
  elements.decisionId.value = decision.id;
  elements.nameInput.value = decision.name;
  elements.typeInput.value = decision.type;
  elements.valueInput.value = decision.value;
  elements.riskInput.value = decision.risk;
  elements.ownerInput.value = getOwner(decision);
  elements.descriptionInput.value = `${decision.name} decision for ${decision.type} planning.`;
  elements.typeInput.disabled = true;
  elements.riskInput.disabled = true;
  elements.nameInput.focus();
}

async function deleteDecision(id) {
  const decision = state.decisions.find((item) => item.id === id);

  if (!decision) {
    return;
  }

  const confirmed = window.confirm(`A dëshironi ta fshini "${decision.name}"?`);

  if (!confirmed) {
    return;
  }

  if (state.usesApi) {
    const response = await fetch(`/api/decisions/${id}`, { method: "DELETE" });

    if (!response.ok) {
      showMessage("Fshirja dështoi.", "error");
      return;
    }
  } else {
    state.decisions = state.decisions.filter((item) => item.id !== id);
    saveLocalDecisions(state.decisions);
  }

  showMessage("Vendimi u fshi.", "success");
  resetForm();
  await loadDecisions();
}

function resetForm() {
  state.editingId = null;
  elements.form.reset();
  elements.descriptionInput.value = "";
  elements.formTitle.textContent = "Add Decision";
  elements.typeInput.disabled = false;
  elements.riskInput.disabled = false;
}

function syncSearch(value) {
  elements.searchInput.value = value;
  elements.topSearchInput.value = value;
}

function exportVisibleDecisions() {
  const rows = getVisibleDecisions();
  const header = ["ID", "Name", "Type", "Owner", "Value", "Risk", "Status"];
  const lines = rows.map((decision) => [
    decision.id,
    decision.name,
    decision.type,
    getOwner(decision),
    decision.value,
    decision.risk,
    getStatus(decision).label,
  ]);
  const csv = [header, ...lines]
    .map((line) => line.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "decisiondesk-export.csv";
  link.click();
  URL.revokeObjectURL(url);
  showMessage("Raporti u eksportua.", "success");
}

function resetDemoData() {
  saveLocalDecisions(seedDecisions);

  if (!state.usesApi) {
    state.decisions = [...seedDecisions];
    syncTypeFilter();
    render();
  }

  showMessage("Demo data u rikthye.", "success");
}

function showMessage(message, type) {
  elements.formMessage.textContent = message;
  elements.formMessage.className = `form-message ${type}`;
}

function getOwner(decision) {
  const owners = ["Julia Smith", "Michael Kim", "Aisha Carter", "David Huang", "Sarah Reed"];
  return owners[(decision.id - 1) % owners.length];
}

function getStatus(decision) {
  if (decision.risk > 0.35) {
    return { label: "Pending", className: "status-pending" };
  }

  if (decision.risk >= 0.25) {
    return { label: "In Review", className: "status-review" };
  }

  return { label: "Approved", className: "status-approved" };
}

function getUpdatedDate(decision) {
  const day = String(6 + decision.id).padStart(2, "0");
  return `May ${day}, 2026`;
}

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatValue(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function riskLabel(risk) {
  if (risk > 0.3) {
    return `High (${risk})`;
  }

  if (risk >= 0.2) {
    return `Medium (${risk})`;
  }

  return `Low (${risk})`;
}

function riskClass(risk) {
  if (risk > 0.3) {
    return "risk-high";
  }

  if (risk >= 0.2) {
    return "risk-medium";
  }

  return "risk-low";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

elements.form.addEventListener("submit", saveDecision);
elements.resetButton.addEventListener("click", () => {
  resetForm();
  showMessage("", "");
});
elements.cancelButton.addEventListener("click", () => {
  resetForm();
  showMessage("Forma u anulua.", "success");
});
elements.filterButton.addEventListener("click", () => setView("risks"));
elements.exportButton.addEventListener("click", exportVisibleDecisions);
elements.resetDataButton.addEventListener("click", resetDemoData);
elements.notificationButton.addEventListener("click", () => setView("risks"));
elements.helpButton.addEventListener("click", () => {
  setView("documents");
  showMessage("Plan B: përdor README, demo-plan dhe export-in e tabelës.", "success");
});
elements.typeFilter.addEventListener("change", render);
elements.searchInput.addEventListener("input", (event) => {
  syncSearch(event.target.value);
  render();
});
elements.topSearchInput.addEventListener("input", (event) => {
  syncSearch(event.target.value);
  render();
});
elements.rows.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);

  if (button.dataset.action === "edit") {
    editDecision(id);
  }

  if (button.dataset.action === "delete") {
    deleteDecision(id);
  }
});

loadDecisions();
