/*==========================================================
  Pause & Play Management System
  File      : api.js
  Version   : 3.1
  Purpose   : Central API Client (Google Apps Script Backend)
==========================================================*/

"use strict";

/*==========================================================
  CONFIGURATION
==========================================================*/

const API = {
  URL: "https://script.google.com/macros/s/AKfycbw_2ACh6Ia5tBjepRVnaqsGwi8N9pVdSFf4HQOjVz5g9K8iSKgtzENTv4-Yyk3J_sCDEg/exec",
  TIMEOUT: 30000
};

/*==========================================================
  RESPONSE PARSER & BASE REQUEST HANDLERS
==========================================================*/

async function parseResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
  }
  return await response.json();
}

async function apiGet(action, params = {}) {
  const queryParams = new URLSearchParams({ action, ...params });
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API.TIMEOUT);

  try {
    const response = await fetch(`${API.URL}?${queryParams.toString()}`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal
    });
    return await parseResponse(response);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function apiPost(action, data = {}) {
  const payload = { action, ...data };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API.TIMEOUT);

  try {
    const response = await fetch(API.URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      redirect: "follow",
      signal: controller.signal,
      body: JSON.stringify(payload)
    });
    return await parseResponse(response);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function request(method, action, data = {}) {
  try {
    const httpMethod = method.toUpperCase();
    if (httpMethod === "GET") {
      return await apiGet(action, data);
    }
    if (httpMethod === "POST") {
      return await apiPost(action, data);
    }
    throw new Error("Invalid HTTP Method specified.");
  } catch (error) {
    console.error(`API Error [${action}]:`, error);
    let message = error.message || "Network error or server unreachable.";
    if (error.name === "AbortError") {
      message = "Request timed out. Please check your network connection.";
    }
    return {
      success: false,
      message: message
    };
  }
}

/*==========================================================
  AUTHENTICATION & STAFF MANAGEMENT
==========================================================*/

function login(username, password, role = "STAFF") {
  return request("POST", "login", { username, password, role });
}

function logout(token) {
  return request("POST", "logout", { token });
}

function changePassword(oldPassword, newPassword) {
  return request("POST", "changePassword", { oldPassword, newPassword });
}

function createStaff(staff) {
  return request("POST", "createStaff", staff);
}

function enableStaff(username) {
  return request("POST", "enableStaff", { username });
}

function disableStaff(username) {
  return request("POST", "disableStaff", { username });
}

function deleteStaff(username) {
  return request("POST", "deleteStaff", { username });
}

function getStaffList() {
  return request("GET", "staffList");
}

/*==========================================================
  MEMBERS MANAGEMENT
==========================================================*/

function saveMember(member) {
  return request("POST", "saveMember", member);
}

function updateMember(member) {
  return request("POST", "updateMember", member);
}

function renewMember(member) {
  return request("POST", "renewMember", member);
}

function deleteMember(memberid) {
  return request("POST", "deleteMember", { memberid });
}

function getMember(memberid) {
  return request("GET", "member", { memberid });
}

function getAllMembers() {
  return request("GET", "members");
}

function searchMember(keyword) {
  return request("GET", "searchMember", { keyword });
}

function getDashboard() {
  return request("GET", "dashboard");
}

function getMembershipStats() {
  return request("GET", "membershipStats");
}

function getRecentMembers() {
  return request("GET", "recentMembers");
}

function getExpiringSoon() {
  return request("GET", "expiringSoon");
}

/*==========================================================
  ATTENDANCE
==========================================================*/

function markAttendance(memberid) {
  return request("GET", "attendance", { memberid });
}

function attendanceList() {
  return request("GET", "attendanceList");
}

function memberAttendance(memberid) {
  return request("GET", "memberAttendance", { memberid });
}

function todayAttendance() {
  return request("GET", "todayAttendance");
}

function deleteAttendance(memberid, date) {
  return request("POST", "deleteAttendance", { memberid, date });
}

/*==========================================================
  BILLING & PAYMENTS
==========================================================*/

function savePayment(payment) {
  return request("POST", "savePayment", payment);
}

function cancelInvoice(invoice) {
  return request("POST", "cancelInvoice", { invoice });
}

function getInvoice(invoice) {
  return request("GET", "invoice", { invoice });
}

function invoiceHistory() {
  return request("GET", "invoiceHistory");
}

function todayRevenue() {
  return request("GET", "todayRevenue");
}

function monthlyRevenue() {
  return request("GET", "monthlyRevenue");
}

function yearlyRevenue() {
  return request("GET", "yearlyRevenue");
}

function paymentAnalytics() {
  return request("GET", "paymentAnalytics");
}

function searchInvoice(keyword) {
  return request("GET", "searchInvoice", { keyword });
}

/*==========================================================
  REPORTS
==========================================================*/

function reports() {
  return request("GET", "reports");
}

function activeReport() {
  return request("GET", "activeReport");
}

function expiredReport() {
  return request("GET", "expiredReport");
}

function monthlyJoining() {
  return request("GET", "monthlyJoining");
}

function planReport() {
  return request("GET", "planReport");
}

function exportCSV() {
  return request("GET", "exportCSV");
}

/*==========================================================
  SETTINGS & SYSTEM
==========================================================*/

function getSettings() {
  return request("GET", "settings");
}

function saveSettings(settings) {
  return request("POST", "saveSettings", settings);
}

function updateSetting(key, value) {
  return request("POST", "updateSetting", { key, value });
}

function systemInfo() {
  return request("GET", "systemInfo");
}

function backupDatabase() {
  return request("GET", "backup");
}

/*==========================================================
  NOTIFICATIONS
==========================================================*/

function expiryNotifications() {
  return request("GET", "expiryNotifications");
}

function birthdayNotifications() {
  return request("GET", "birthdayNotifications");
}

function inactiveMembers() {
  return request("GET", "inactiveMembers");
}

function notificationCount() {
  return request("GET", "notificationCount");
}

/*==========================================================
  HEALTH CHECK & SYSTEM INFO
==========================================================*/

async function pingServer() {
  try {
    const result = await request("GET", "systemInfo");
    return {
      success: true,
      server: result
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

function apiVersion() {
  return {
    version: "3.1",
    platform: "Google Apps Script",
    client: "Pause & Play Management System"
  };
}
