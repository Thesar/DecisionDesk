const state = {
  decisions: [],
  editingId: null,
};

const elements = {
  rows: document.querySelector("#decisionRows"),
  emptyState: document.querySelector("#emptyState"),
  typeFilter: document.querySelector("#typeFilter"),
  searchInput: document.querySelector("#searchInput"),
  refreshButton: document.querySelector("#refreshButton"),
  form: document.querySelector("#decisionForm"),
  formTitle: document.querySelector("#formTitle"),
  formMessage: document.querySelector("#formMessage"),
  decisionId: document.querySelector("#decisionId"),
  nameInput: document.querySelector("#nameInput"),
  typeInput: document.querySelector("#typeInput"),
  valueInput: document.querySelector("#valueInput"),
  riskInput: document.querySelector("#riskInput"),
  resetButton: document.querySelector("#resetButton"),
  totalDecisions: document.querySelector("#totalDecisions"),
  highRisk: document.querySelector("#highRisk"),
  totalValue: document.querySelector("#totalValue"),
  activeFilter: document.querySelector("#activeFilter"),
};

async function loadDecisions() {
  const response = await fetch("/api/decisions");

  if (!response.ok) {
    showMessage("Nuk u lexuan vendimet.", "error");
    return;
  }

  state.decisions = await response.json();
  syncTypeFilter();
  render();
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

function getVisibleDecisions() {
  const type = elements.typeFilter.value.toLowerCase();
  const search = elements.searchInput.value.trim().toLowerCase();

  return state.decisions.filter((decision) => {
    const matchesType = !type || decision.type.toLowerCase() === type;
    const matchesSearch =
      !search ||
      decision.name.toLowerCase().includes(search) ||
      decision.type.toLowerCase().includes(search) ||
      String(decision.id).includes(search);

    return matchesType && matchesSearch;
  });
}

function render() {
  const visibleDecisions = getVisibleDecisions();
  renderMetrics(visibleDecisions);
  renderRows(visibleDecisions);
}

function renderMetrics(visibleDecisions) {
  const totalValue = visibleDecisions.reduce((sum, decision) => sum + decision.value, 0);
  const highRisk = visibleDecisions.filter((decision) => decision.risk > 0.3).length;

  elements.totalDecisions.textContent = visibleDecisions.length;
  elements.highRisk.textContent = highRisk;
  elements.totalValue.textContent = formatValue(totalValue);
  elements.activeFilter.textContent = elements.typeFilter.value || "All";
}

function renderRows(visibleDecisions) {
  elements.rows.innerHTML = "";
  elements.emptyState.hidden = visibleDecisions.length > 0;

  for (const decision of visibleDecisions) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="id-cell">DEC-${String(decision.id).padStart(3, "0")}</td>
      <td>${escapeHtml(decision.name)}</td>
      <td><span class="type-chip">${escapeHtml(decision.type)}</span></td>
      <td>${formatValue(decision.value)}</td>
      <td><span class="risk-chip ${riskClass(decision.risk)}">${riskLabel(decision.risk)} (${decision.risk})</span></td>
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
    return;
  }

  showMessage(state.editingId ? "Vendimi u përditësua." : "Vendimi u shtua.", "success");
  resetForm();
  await loadDecisions();
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

  const response = await fetch(`/api/decisions/${id}`, { method: "DELETE" });

  if (!response.ok) {
    showMessage("Fshirja dështoi.", "error");
    return;
  }

  showMessage("Vendimi u fshi.", "success");
  resetForm();
  await loadDecisions();
}

function resetForm() {
  state.editingId = null;
  elements.form.reset();
  elements.formTitle.textContent = "Add Decision";
  elements.typeInput.disabled = false;
  elements.riskInput.disabled = false;
}

function showMessage(message, type) {
  elements.formMessage.textContent = message;
  elements.formMessage.className = `form-message ${type}`;
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
    return "High";
  }

  if (risk >= 0.2) {
    return "Medium";
  }

  return "Low";
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

elements.form.addEventListener("submit", saveDecision);
elements.resetButton.addEventListener("click", () => {
  resetForm();
  showMessage("", "");
});
elements.refreshButton.addEventListener("click", loadDecisions);
elements.typeFilter.addEventListener("change", render);
elements.searchInput.addEventListener("input", render);
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
