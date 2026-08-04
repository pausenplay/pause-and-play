/*===========================================================
  APP CONFIG
===========================================================*/
const APP = {
  NAME: "Pause & Play",
  VERSION: "2.0",
  STORAGE: {
    USER: "gym_user",
    THEME: "gym_theme"
  }
};

/*===========================================================
  DOM READY & INITIALIZATION
===========================================================*/
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
  loadTheme();
  fillUserInfo();
});

function initializeApp() {
  DEV.log(APP.NAME + " Loaded");
  restoreTheme();
  restoreSession();
  initializeSidebar();
  initializeNavigation();
  initializeLoader();
  initializeDropdowns();
  initializeActiveMenu();
}

/*===========================================================
  PAGE LOADER
===========================================================*/
function initializeLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  });
}

function showLoading() {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.remove("hidden");
}

function hideLoading() {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hidden");
}

/*===========================================================
  SESSION & USER MANAGEMENT
===========================================================*/
const Session = {
  save(user) {
    sessionStorage.setItem(APP.STORAGE.USER, JSON.stringify(user));
  },
  get() {
    const user = sessionStorage.getItem(APP.STORAGE.USER);
    if (!user) return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },
  destroy() {
    sessionStorage.removeItem(APP.STORAGE.USER);
  }
};

function restoreSession() {
  const user = Session.get();
  if (!user) {
    const page = location.pathname.split("/").pop();
    if (page !== "index.html" && page !== "") {
      window.location.href = "index.html";
    }
    return;
  }
  window.currentUser = user;
}

function getCurrentUser() {
  return currentUser();
}

function currentUser() {
  return Session.get();
}

function logout() {
  if (!confirm("Logout now?")) return;
  Session.destroy();
  window.location.href = "index.html";
}

/*===========================================================
  USER INFO & ROLE MANAGEMENT
===========================================================*/
function fillUserInfo() {
  const user = currentUser();
  if (!user) return;

  const usernameEl = document.getElementById("userName") || document.getElementById("usernameDisplay");
  const userRoleEl = document.getElementById("userRole") || document.getElementById("roleDisplay");

  if (usernameEl) usernameEl.textContent = user.username || user.name || "User";
  if (userRoleEl) userRoleEl.textContent = user.role || "Staff";
}

function currentRole() {
  const user = currentUser();
  return user ? (user.role || "").toUpperCase() : "";
}

function isOwner() {
  return currentRole() === "OWNER";
}

function isStaff() {
  return currentRole() === "STAFF";
}

/*===========================================================
  PERMISSIONS & ACCESS CONTROL
===========================================================*/
const Permission = {
  OWNER: ["*"],
  STAFF: ["dashboard", "members", "attendance", "billing", "scanner"]
};

function hasPermission(module) {
  if (isOwner()) return true;
  return Permission.STAFF.includes(module.toLowerCase());
}

function protect(module) {
  if (isOwner()) return;
  if (!hasPermission(module)) {
    showToast("Access Denied", "error");
    setTimeout(() => {
      location.href = "dashboard.html";
    }, 1200);
  }
}

/*===========================================================
  SIDEBAR & NAVIGATION
===========================================================*/
function initializeSidebar() {
  const toggle = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".sidebar");
  if (!toggle || !sidebar) return;

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

function initializeActiveMenu() {
  const page = location.pathname.split("/").pop();
  document.querySelectorAll(".sidebar a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === page) {
      link.classList.add("active");
    }
  });
}

function initializeNavigation() {
  document.querySelectorAll("[data-page]").forEach(button => {
    button.onclick = function () {
      location.href = this.dataset.page;
    };
  });
}

function navigate(url) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    location.href = url;
  }, 180);
}

/*===========================================================
  DROPDOWNS
===========================================================*/
function initializeDropdowns() {
  document.querySelectorAll(".dropdown-btn").forEach(btn => {
    btn.onclick = function (e) {
      e.stopPropagation();
      this.parentElement.classList.toggle("active");
    };
  });

  window.addEventListener("click", () => {
    document.querySelectorAll(".dropdown").forEach(item => item.classList.remove("active"));
  });
}

/*===========================================================
  THEME MANAGEMENT
===========================================================*/
const Storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    const data = localStorage.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  }
};

function restoreTheme() {
  const theme = localStorage.getItem(APP.STORAGE.THEME);
  if (theme === "dark") {
    document.body.classList.add("dark");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    APP.STORAGE.THEME,
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

function applyTheme(theme) {
  document.body.classList.remove("dark");
  if (theme === "dark") {
    document.body.classList.add("dark");
  }
  Storage.set(APP.STORAGE.THEME, theme);
}

function loadTheme() {
  const theme = Storage.get(APP.STORAGE.THEME) || "light";
  applyTheme(theme);
}

/*===========================================================
  TOAST NOTIFICATIONS
===========================================================*/
function showToast(message, type = "success", duration = 3000) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;">
      <i class="${toastIcon(type)}"></i>
      <div>${message}</div>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

function toastIcon(type) {
  switch (type) {
    case "success": return "bx bxs-check-circle";
    case "error": return "bx bxs-x-circle";
    case "warning": return "bx bxs-error-circle";
    default: return "bx bxs-bell";
  }
}

/*===========================================================
  MODALS
===========================================================*/
function openModal(title, message) {
  const modal = document.getElementById("modal");
  if (!modal) return;

  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = message;
  modal.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.classList.remove("active");
}

document.addEventListener("click", function (e) {
  if (e.target.id === "closeModal" || e.target.id === "modalOk") {
    closeModal();
  }
});

/*===========================================================
  FORM VALIDATION
===========================================================*/
function required(value) {
  return value !== null && value !== undefined && value.toString().trim() !== "";
}

function validateMobile(number) {
  return /^[6-9]\d{9}$/.test(number);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function confirmAction(message) {
  return confirm(message);
}

/*===========================================================
  DATE & TIME UTILITIES
===========================================================*/
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN");
}

function formatDateTime(date) {
  return new Date(date).toLocaleString("en-IN");
}

function currentTime() {
  return new Date().toLocaleTimeString("en-IN");
}

function liveClock(id) {
  const clock = document.getElementById(id);
  if (!clock) return;

  setInterval(() => {
    clock.innerText = new Date().toLocaleTimeString("en-IN");
  }, 1000);
}

function liveDate(id) {
  const label = document.getElementById(id);
  if (!label) return;

  label.innerText = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

/*===========================================================
  FORMATTING & UTILITIES
===========================================================*/
function $(id) {
  return document.getElementById(id);
}

function show(id) {
  const el = $(id);
  if (el) el.classList.remove("hidden");
}

function hide(id) {
  const el = $(id);
  if (el) el.classList.add("hidden");
}

function setPageTitle(title) {
  document.title = title + " | Pause & Play";
}

function money(value) {
  return Number(value).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR"
  });
}

function number(value) {
  return Number(value).toLocaleString("en-IN");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied Successfully");
  } catch {
    showToast("Unable to Copy", "error");
  }
}

function filterTable(inputId, tableId) {
  const search = document.getElementById(inputId).value.toLowerCase();
  const rows = document.querySelectorAll(`#${tableId} tbody tr`);

  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(search) ? "" : "none";
  });
}

/*===========================================================
  DATA IMPORT / EXPORT & BACKUP
===========================================================*/
function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportCSV(filename, data) {
  if (!Array.isArray(data) || data.length === 0) return;

  const headers = Object.keys(data[0]);
  let csv = headers.join(",") + "\n";

  data.forEach(row => {
    csv += headers.map(h => row[h]).join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportExcel(filename, data) {
  exportCSV(filename + ".csv", data);
}

function printElement(id) {
  const element = document.getElementById(id);
  if (!element) return;

  const printWindow = window.open("", "_blank");
  printWindow.document.write("<html><head><title>Print</title></head><body>");
  printWindow.document.write(element.outerHTML);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}

async function downloadBackup() {
  const backup = {
    exported: new Date(),
    user: currentUser(),
    version: APP.VERSION
  };
  downloadJSON(backup, "backup.json");
}

/*===========================================================
  GLOBAL API WRAPPER
===========================================================*/
const Api = {
  async get(action, ...params) {
    try {
      showLoading();
      const response = await apiGet(action, ...params);
      hideLoading();
      return response;
    } catch (error) {
      hideLoading();
      apiError(error);
      return null;
    }
  },
  async post(action, data) {
    try {
      showLoading();
      const response = await apiPost(action, data);
      hideLoading();
      return response;
    } catch (error) {
      hideLoading();
      apiError(error);
      return null;
    }
  }
};

function apiError(error) {
  console.error(error);
  showToast("Server Error", "error");
}

/*===========================================================
  AUTO LOGOUT (IDLE TIMER)
===========================================================*/
let idleTimer;
const IDLE_LIMIT = 30 * 60 * 1000; // 30 minutes

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    showToast("Session Expired", "warning");
    setTimeout(() => {
      logout();
    }, 1500);
  }, IDLE_LIMIT);
}

["click", "mousemove", "keydown", "touchstart", "scroll"].forEach(event => {
  window.addEventListener(event, resetIdleTimer);
});
resetIdleTimer();

/*===========================================================
  NETWORK STATUS
===========================================================*/
window.addEventListener("online", () => {
  showToast("Internet Connected");
});

window.addEventListener("offline", () => {
  showToast("Internet Disconnected", "warning");
});

/*===========================================================
  KEYBOARD SHORTCUTS
===========================================================*/
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "d") {
    e.preventDefault();
    toggleTheme();
  }
  if (e.key === "Escape") {
    closeModal();
  }
});

/*===========================================================
  DEVELOPER LOGGING & SYSTEM INFO
===========================================================*/
const DEV = {
  enabled: true,
  log(...args) {
    if (this.enabled) console.log("[APP]", ...args);
  },
  warn(...args) {
    if (this.enabled) console.warn("[WARNING]", ...args);
  },
  error(...args) {
    if (this.enabled) console.error("[ERROR]", ...args);
  }
};

function appVersion() {
  return APP.VERSION;
}

function appName() {
  return APP.NAME;
}

function systemInfo() {
  return {
    app: APP.NAME,
    version: APP.VERSION,
    browser: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    online: navigator.onLine
  };
}

window.addEventListener("load", () => {
  DEV.log("Application Started");
  DEV.log(systemInfo());
});

/*===========================================================
  GLOBAL ERROR HANDLERS
===========================================================*/
window.onerror = function (message, source, line, column, error) {
  DEV.error(message, source, line, column, error);
};

window.addEventListener("unhandledrejection", function (event) {
  DEV.error(event.reason);
});
