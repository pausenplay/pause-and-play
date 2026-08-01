// =========================
// Pause And Play API
// =========================

const API_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE";

// Get Member Details
async function getMemberAPI(memberid) {

    const response = await fetch(
        API_URL + "?action=getMember&memberid=" + encodeURIComponent(memberid)
    );

    return await response.json();
}

// Save Member
async function saveMemberAPI(member) {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(member)
    });

    return await response.json();
}

// Mark Attendance
async function attendanceAPI(memberid) {

    const response = await fetch(
        API_URL + "?action=attendance&memberid=" + encodeURIComponent(memberid)
    );

    return await response.json();
}

// Dashboard
async function dashboardAPI() {

    const response = await fetch(
        API_URL + "?action=dashboard"
    );

    return await response.json();
}
