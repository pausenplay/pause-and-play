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
  DOM READY
===========================================================*/

document.addEventListener("DOMContentLoaded", initializeApp);


/*===========================================================
  INITIALIZE APPLICATION
===========================================================*/

function initializeApp() {

    console.log(APP.NAME + " Loaded");

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


/*===========================================================
  SESSION
===========================================================*/

function restoreSession() {

    const user = sessionStorage.getItem(APP.STORAGE.USER);

    if (!user) {

        const page = location.pathname.split("/").pop();

        if (page !== "index.html" && page !== "") {

            window.location.href = "index.html";

        }

        return;

    }

    try {

        window.currentUser = JSON.parse(user);

    }

    catch {

        sessionStorage.clear();

        window.location.href = "index.html";

    }

}


/*===========================================================
  LOGOUT
===========================================================*/

function logout() {

    if (!confirm("Logout now?")) return;

    sessionStorage.removeItem(APP.STORAGE.USER);

    window.location.href = "index.html";

}


/*===========================================================
  SIDEBAR
===========================================================*/

function initializeSidebar() {

    const toggle = document.getElementById("menuToggle");

    const sidebar = document.querySelector(".sidebar");

    if (!toggle || !sidebar) return;

    toggle.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

}


/*===========================================================
  ACTIVE MENU
===========================================================*/

function initializeActiveMenu() {

    const page = location.pathname.split("/").pop();

    document.querySelectorAll(".sidebar a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === page) {

            link.classList.add("active");

        }

    });

}


/*===========================================================
  NAVIGATION
===========================================================*/

function initializeNavigation() {

    document.querySelectorAll("[data-page]").forEach(button => {

        button.onclick = function () {

            location.href = this.dataset.page;

        };

    });

}


/*===========================================================
  DROPDOWN
===========================================================*/

function initializeDropdowns() {

    document.querySelectorAll(".dropdown-btn").forEach(btn => {

        btn.onclick = function (e) {

            e.stopPropagation();

            this.parentElement.classList.toggle("active");

        };

    });

    window.addEventListener("click", () => {

        document.querySelectorAll(".dropdown")

            .forEach(item => item.classList.remove("active"));

    });

}


/*===========================================================
  THEME
===========================================================*/

function restoreTheme() {

    const theme =

        localStorage.getItem(APP.STORAGE.THEME);

    if (theme === "dark") {

        document.body.classList.add("dark");

    }

}


function toggleTheme() {

    document.body.classList.toggle("dark");

    localStorage.setItem(

        APP.STORAGE.THEME,

        document.body.classList.contains("dark")

            ? "dark"

            : "light"

    );

}


/*===========================================================
  PAGE TITLE
===========================================================*/

function setPageTitle(title) {

    document.title =

        title +

        " | Pause & Play";

}


/*===========================================================
  DATE
===========================================================*/

function formatDate(date) {

    return new Date(date)

        .toLocaleDateString(

            "en-IN"

        );

}


/*===========================================================
  TIME
===========================================================*/

function currentTime() {

    return new Date()

        .toLocaleTimeString(

            "en-IN"

        );

}


/*===========================================================
  USER
===========================================================*/

function getCurrentUser() {

    return window.currentUser;

}


/*===========================================================
  UTILITIES
===========================================================*/

function $(id) {

    return document.getElementById(id);

}

function show(id) {

    const el = $(id);

    if (el)

        el.classList.remove("hidden");

}

function hide(id) {

    const el = $(id);

    if (el)

        el.classList.add("hidden");

}

/*===========================================================
  TOAST NOTIFICATION
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

        case "success":
            return "bx bxs-check-circle";

        case "error":
            return "bx bxs-x-circle";

        case "warning":
            return "bx bxs-error-circle";

        default:
            return "bx bxs-bell";

    }

}


/*===========================================================
  MODAL
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

    if (e.target.id === "closeModal") {

        closeModal();

    }

    if (e.target.id === "modalOk") {

        closeModal();

    }

});


/*===========================================================
  LOADING
===========================================================*/

function showLoading() {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.classList.remove("hidden");

    }

}

function hideLoading() {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.classList.add("hidden");

    }

}


/*===========================================================
  FORM VALIDATION
===========================================================*/

function required(value) {

    return value !== null &&
           value !== undefined &&
           value.toString().trim() !== "";

}

function validateMobile(number) {

    return /^[6-9]\d{9}$/.test(number);

}

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/*===========================================================
  CONFIRM
===========================================================*/

function confirmAction(message) {

    return confirm(message);

}


/*===========================================================
  COPY TEXT
===========================================================*/

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

        showToast("Copied Successfully");

    }

    catch {

        showToast("Unable to Copy", "error");

    }

}


/*===========================================================
  DOWNLOAD JSON
===========================================================*/

function downloadJSON(data, filename) {

    const blob = new Blob(

        [JSON.stringify(data, null, 2)],

        { type: "application/json" }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);

}


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
  API ERROR
===========================================================*/

function apiError(error) {

    console.error(error);

    showToast(

        "Server Error",

        "error"

    );

}


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
  SEARCH FILTER
===========================================================*/

function filterTable(inputId, tableId) {

    const search =

        document
        .getElementById(inputId)
        .value
        .toLowerCase();

    const rows =

        document
        .querySelectorAll(`#${tableId} tbody tr`);

    rows.forEach(row => {

        row.style.display =

            row.innerText.toLowerCase().includes(search)

            ? ""

            : "none";

    });

}
/*===========================================================
  STORAGE MANAGER
===========================================================*/

const Storage={

    set(key,value){

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    get(key){

        const data=localStorage.getItem(key);

        if(!data) return null;

        try{

            return JSON.parse(data);

        }

        catch{

            return data;

        }

    },

    remove(key){

        localStorage.removeItem(key);

    },

    clear(){

        localStorage.clear();

    }

};


/*===========================================================
  SESSION MANAGER
===========================================================*/

const Session={

    save(user){

        sessionStorage.setItem(

            APP.STORAGE.USER,

            JSON.stringify(user)

        );

    },

    get(){

        const user=sessionStorage.getItem(

            APP.STORAGE.USER

        );

        if(!user) return null;

        return JSON.parse(user);

    },

    destroy(){

        sessionStorage.removeItem(

            APP.STORAGE.USER

        );

    }

};


/*===========================================================
  CURRENT USER
===========================================================*/

function currentUser(){

    return Session.get();

}


/*===========================================================
  ROLE
===========================================================*/

function currentRole(){

    const user=currentUser();

    if(!user) return "";

    return (user.role||"").toUpperCase();

}


/*===========================================================
  ROLE CHECK
===========================================================*/

function isOwner(){

    return currentRole()==="OWNER";

}

function isStaff(){

    return currentRole()==="STAFF";

}


/*===========================================================
  PERMISSION ENGINE
===========================================================*/

const Permission={

    OWNER:[
        "*"
    ],

    STAFF:[

        "dashboard",

        "members",

        "attendance",

        "billing",

        "scanner"

    ]

};


function hasPermission(module){

    if(isOwner()) return true;

    return Permission.STAFF.includes(

        module.toLowerCase()

    );

}


/*===========================================================
  PAGE PROTECTION
===========================================================*/

function protect(module){

    if(isOwner()) return;

    if(!hasPermission(module)){

        showToast(

            "Access Denied",

            "error"

        );

        setTimeout(()=>{

            location.href="dashboard.html";

        },1200);

    }

}


/*===========================================================
  AUTO LOGOUT
===========================================================*/

let idleTimer;

const IDLE_LIMIT=30*60*1000;

function resetIdleTimer(){

    clearTimeout(idleTimer);

    idleTimer=setTimeout(()=>{

        showToast(

            "Session Expired",

            "warning"

        );

        setTimeout(()=>{

            logout();

        },1500);

    },IDLE_LIMIT);

}


[
"click",
"mousemove",
"keydown",
"touchstart",
"scroll"
].forEach(event=>{

    window.addEventListener(

        event,

        resetIdleTimer

    );

});

resetIdleTimer();


/*===========================================================
  THEME MANAGER
===========================================================*/

function applyTheme(theme){

    document.body.classList.remove(

        "dark"

    );

    if(theme==="dark"){

        document.body.classList.add(

            "dark"

        );

    }

    Storage.set(

        APP.STORAGE.THEME,

        theme

    );

}


function loadTheme(){

    const theme=

    Storage.get(

        APP.STORAGE.THEME

    )||"light";

    applyTheme(theme);

}


/*===========================================================
  PAGE TRANSITION
===========================================================*/

function navigate(url){

    document.body.classList.add(

        "fade-out"

    );

    setTimeout(()=>{

        location.href=url;

    },180);

}


/*===========================================================
  ACTIVE USER INFO
===========================================================*/

function fillUserInfo(){

    const user=currentUser();

    if(!user) return;

    document.querySelectorAll(

        "[data-user-name]"

    ).forEach(el=>{

        el.innerText=user.name;

    });

    document.querySelectorAll(

        "[data-user-role]"

    ).forEach(el=>{

        el.innerText=user.role;

    });

}


/*===========================================================
  CLOCK
===========================================================*/

function liveClock(id){

    const clock=document.getElementById(id);

    if(!clock) return;

    setInterval(()=>{

        clock.innerText=

        new Date()

        .toLocaleTimeString(

            "en-IN"

        );

    },1000);

}


/*===========================================================
  DATE
===========================================================*/

function liveDate(id){

    const label=document.getElementById(id);

    if(!label) return;

    label.innerText=

    new Date()

    .toLocaleDateString(

        "en-IN",

        {

            weekday:"long",

            day:"numeric",

            month:"long",

            year:"numeric"

        }

    );

}


/*===========================================================
  INITIALIZE COMMON UI
===========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadTheme();

        fillUserInfo();

    }

);
