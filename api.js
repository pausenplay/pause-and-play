// =========================
// Pause & Play API
// =========================

const API_URL=https://script.google.com/macros/s/AKfycbwVVpKy9oZBYJGpN9u-iLn2tXF8b489ZceBbE_N1FFBs9mXvzCWiyaUcc0Mkm-qKcs9Uw/exec;

// ---------- Common GET ----------

async function apiGet(action, params = {}) {

    let url = API_URL + "?action=" + action;

    for (let key in params) {

        url += "&" + key + "=" + encodeURIComponent(params[key]);

    }

    const response = await fetch(url);

    return await response.json();

}


// ---------- Common POST ----------

async function apiPost(data) {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(data)

    });

    return await response.json();

}



// =========================
// MEMBER
// =========================

async function addMember(member) {

    return await apiPost(member);

}

async function getMember(memberid) {

    return await apiGet("getMember", {

        memberid: memberid

    });

}

async function getMembers() {

    return await apiGet("getAllMembers");

}

async function updateMember(member) {

    member.action = "update";

    return await apiPost(member);

}

async function renewMember(member) {

    member.action = "renew";

    return await apiPost(member);

}

async function deleteMember(memberid) {

    return await apiPost({

        action: "delete",

        memberid: memberid

    });

}



// =========================
// ATTENDANCE
// =========================

async function markAttendance(memberid) {

    return await apiGet("attendance", {

        memberid: memberid

    });

}

async function getAttendance() {

    return await apiGet("attendanceList");

}

async function getTodayAttendance() {

    return await apiGet("todayAttendance");

}



// =========================
// DASHBOARD
// =========================

async function getDashboard() {

    return await apiGet("dashboard");

}



// =========================
// REPORTS
// =========================

async function getReports() {

    return await apiGet("reports");

}

async function exportCSV() {

    return await apiGet("exportCSV");

}



// =========================
// LOGIN
// =========================

async function login(username, password) {

    return await apiPost({

        action: "login",

        username: username,

        password: password

    });

}

async function changePassword(oldPassword, newPassword) {

    return await apiPost({

        action: "changePassword",

        oldPassword: oldPassword,

        newPassword: newPassword

    });

}



// =========================
// SETTINGS
// =========================

async function getSettings() {

    return await apiGet("settings");

}

async function saveSettings(data) {

    data.action = "saveSettings";

    return await apiPost(data);

}



// =========================
// BACKUP
// =========================

async function backupDatabase() {

    return await apiGet("backup");

}

async function restoreDatabase() {

    return await apiGet("restore");

}
