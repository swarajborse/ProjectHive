// script.js
(() => {
  // Character sets
  const SETS = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+[]{}|;:,.<>?/~`-=",
  };

  // Elements
  const passwordOutput = document.getElementById("passwordOutput");
  const lengthRange = document.getElementById("lengthRange");
  const lengthValue = document.getElementById("lengthValue");
  const upper = document.getElementById("upper");
  const lower = document.getElementById("lower");
  const numbers = document.getElementById("numbers");
  const symbols = document.getElementById("symbols");
  const generateBtn = document.getElementById("generateBtn");
  const copyBtn = document.getElementById("copyBtn");
  const saveBtn = document.getElementById("saveBtn");
  const meterFill = document.getElementById("meterFill");
  const strengthLabel = document.getElementById("strengthLabel");
  const saveForm = document.getElementById("saveForm");
  const saveLabel = document.getElementById("saveLabel");
  const savedList = document.getElementById("savedList");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const themeToggle = document.getElementById("themeToggle");

  // LocalStorage keys
  const LS_SAVED = "pwgen_saved";
  const LS_THEME = "pwgen_theme";

  // Helper: random integer
  function randInt(max) {
    return Math.floor(Math.random() * max);
  }

  // Generate password
  function generatePassword(length) {
    const chosenSets = [];
    if (upper.checked) chosenSets.push(SETS.upper);
    if (lower.checked) chosenSets.push(SETS.lower);
    if (numbers.checked) chosenSets.push(SETS.numbers);
    if (symbols.checked) chosenSets.push(SETS.symbols);

    if (!chosenSets.length) {
      alert("Select at least one character type.");
      return "";
    }

    // Ensure at least one from each chosen set for better strength
    const guaranteed = chosenSets.map(s => s[randInt(s.length)]);
    let allChars = chosenSets.join("");
    let remaining = length - guaranteed.length;
    let resultChars = [];

    for (let i = 0; i < remaining; i++) {
      resultChars.push(allChars[randInt(allChars.length)]);
    }

    // merge guaranteed and remaining and shuffle
    resultChars = resultChars.concat(guaranteed);
    // Fisher-Yates shuffle
    for (let i = resultChars.length - 1; i > 0; i--) {
      const j = randInt(i + 1);
      [resultChars[i], resultChars[j]] = [resultChars[j], resultChars[i]];
    }

    return resultChars.join("");
  }

  // Strength estimator (simple, intuitive)
  function estimateStrength(pw) {
    let pool = 0;
    if (/[A-Z]/.test(pw)) pool += 26;
    if (/[a-z]/.test(pw)) pool += 26;
    if (/[0-9]/.test(pw)) pool += 10;
    if (/[^A-Za-z0-9]/.test(pw)) pool += 32;

    // entropy bits ~ length * log2(pool)
    let bits = pw.length * (pool ? Math.log2(pool) : 0);
    // normalize into 0-100
    const score = Math.max(0, Math.min(100, Math.round((bits / 60) * 100)));

    let label = "Too weak";
    if (score < 25) label = "Weak";
    else if (score < 50) label = "Fair";
    else if (score < 75) label = "Good";
    else label = "Excellent";

    return { score, label, bits: Math.round(bits) };
  }

  // Update strength UI
  function updateStrengthUI(pw) {
    if (!pw) {
      meterFill.style.width = "0%";
      strengthLabel.textContent = "—";
      meterFill.style.background = "transparent";
      return;
    }
    const { score, label } = estimateStrength(pw);
    meterFill.style.width = `${score}%`;
    strengthLabel.textContent = label;
    // color mapping
    if (score < 25) meterFill.style.background = "#ff5f5f";
    else if (score < 50) meterFill.style.background = "#ffb86b";
    else if (score < 75) meterFill.style.background = "#ffd86b";
    else meterFill.style.background = "#7cf59b";
  }

  // Save/Load saved passwords
  function loadSaved() {
    try {
      const raw = localStorage.getItem(LS_SAVED);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  function saveSaved(list) {
    localStorage.setItem(LS_SAVED, JSON.stringify(list));
  }

  function renderSaved() {
    const items = loadSaved();
    savedList.innerHTML = "";
    if (!items.length) {
      savedList.innerHTML = `<li class="saved-item" aria-hidden="true">No saved passwords yet.</li>`;
      return;
    }
    items.forEach((it, idx) => {
      const li = document.createElement("li");
      li.className = "saved-item";
      const meta = document.createElement("div");
      meta.className = "saved-meta";
      meta.innerHTML = `<strong>${escapeHtml(it.label || "Untitled")}</strong><div style="font-size:0.85rem;color:var(--muted)">${escapeHtml(it.value)}</div><div style="font-size:0.75rem;color:var(--muted)">${new Date(it.date).toLocaleString()}</div>`;
      const actions = document.createElement("div");
      actions.style.display = "flex";
      actions.style.gap = "6px";
      const copy = document.createElement("button");
      copy.className = "btn small";
      copy.textContent = "Copy";
      copy.addEventListener("click", () => {
        copyToClipboard(it.value);
        flash(copy, "Copied!");
      });
      const use = document.createElement("button");
      use.className = "btn small";
      use.textContent = "Use";
      use.addEventListener("click", () => {
        passwordOutput.value = it.value;
        updateStrengthUI(it.value);
      });
      const del = document.createElement("button");
      del.className = "btn small";
      del.textContent = "Delete";
      del.addEventListener("click", () => {
        const itemsNow = loadSaved();
        itemsNow.splice(idx, 1);
        saveSaved(itemsNow);
        renderSaved();
      });
      actions.appendChild(copy);
      actions.appendChild(use);
      actions.appendChild(del);
      li.appendChild(meta);
      li.appendChild(actions);
      savedList.appendChild(li);
    });
  }

  // Utilities
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  function copyToClipboard(text) {
    if (!navigator.clipboard) {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      ta.remove();
      return;
    }
    return navigator.clipboard.writeText(text);
  }

  function flash(el, text = "Done") {
    const original = el.textContent;
    el.textContent = text;
    setTimeout(() => (el.textContent = original), 1200);
  }

  // Theme
  function initTheme() {
    const saved = localStorage.getItem(LS_THEME);
    if (saved === "dark") {
      document.body.classList.add("dark");
      themeToggle.checked = true;
    } else {
      document.body.classList.remove("dark");
      themeToggle.checked = false;
    }
  }
  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem(LS_THEME, "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem(LS_THEME, "light");
    }
  });

  // Events
  lengthRange.addEventListener("input", () => {
    lengthValue.textContent = lengthRange.value;
  });

  generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const len = parseInt(lengthRange.value, 10);
    const pw = generatePassword(len);
    passwordOutput.value = pw;
    updateStrengthUI(pw);
  });

  // generate on load
  window.addEventListener("load", () => {
    initTheme();
    lengthValue.textContent = lengthRange.value;
    // initial generate
    const initial = generatePassword(parseInt(lengthRange.value, 10));
    passwordOutput.value = initial;
    updateStrengthUI(initial);
    renderSaved();
  });

  // real-time strength update if someone edits the output (rare)
  passwordOutput.addEventListener("input", (e) => {
    updateStrengthUI(e.target.value);
  });

  copyBtn.addEventListener("click", async () => {
    if (!passwordOutput.value) return;
    try {
      await copyToClipboard(passwordOutput.value);
      flash(copyBtn, "Copied!");
    } catch {
      flash(copyBtn, "Copy");
    }
  });

  // Save current
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const current = passwordOutput.value;
    if (!current) { alert("No password to save."); return; }
    const labelText = saveLabel.value.trim();
    const list = loadSaved();
    list.unshift({ value: current, label: labelText || "Untitled", date: new Date().toISOString() });
    saveSaved(list);
    saveLabel.value = "";
    renderSaved();
    flash(saveBtn, "Saved!");
  });

  // Save via form (label + save)
  saveForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveBtn.click();
  });

  clearAllBtn.addEventListener("click", () => {
    if (!confirm("Clear all saved passwords?")) return;
    localStorage.removeItem(LS_SAVED);
    renderSaved();
  });

})();
