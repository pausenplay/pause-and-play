/*==========================================================
  Pause & Play Gym Management System
  File      : api.js
  Version   : 3.0
  Purpose   : Central API Client
==========================================================*/

"use strict";

/*==========================================================
  CONFIGURATION
==========================================================*/

const API = {

    URL: "https://script.google.com/macros/s/AKfycbzSpiMEBHgiq9iGzou2beyjRejwVvmqbhZ7KNbogG53oZD6eKmKsP5ZP4jCiu-bhpPLug/exec",

    TIMEOUT: 30000

};

/*==========================================================
  RESPONSE PARSER
==========================================================*/

async function parseResponse(response) {

    if (!response.ok) {

        throw new Error(

            "HTTP " + response.status

        );

    }

    return await response.json();

}

/*==========================================================
  GET REQUEST
==========================================================*/

async function apiGet(action, params = {}) {

    params.action = action;

    const query = new URLSearchParams(params);

    const response = await fetch(

        API.URL + "?" + query.toString(),

        {

            method: "GET",

            cache: "no-store"

        }

    );

    return parseResponse(response);

}

/*==========================================================*
* POST REQUEST
*==========================================================*/
async function apiPost(action, data = {}) {
    data.action = action;
    const response = await fetch(API.URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return parseResponse(response);
}
/*==========================================================
  SAFE REQUEST
==========================================================*/

async function request(method, action, data = {}) {

    try {

        if (method === "GET") {

            return await apiGet(

                action,

                data

            );

        }

        return await apiPost(

            action,

            data

        );

    }

    catch (error) {

        console.error(error);

        return {

            success: false,

            message: error.message

        };

    }

}
/*==========================================================
  PART 2
  AUTHENTICATION
==========================================================*/

function login(username, password) {

    return request("GET", "login", {

        username,

        password

    });

}

function logout(token) {

    return request("POST", "logout", {

        token

    });

}

function changePassword(oldPassword, newPassword) {

    return request("POST", "changePassword", {

        oldPassword,

        newPassword

    });

}

function createStaff(staff) {

    return request("POST", "createStaff", staff);

}

function enableStaff(username) {

    return request("POST", "enableStaff", {

        username

    });

}

function disableStaff(username) {

    return request("POST", "disableStaff", {

        username

    });

}

function deleteStaff(username) {

    return request("POST", "deleteStaff", {

        username

    });

}

function getStaffList() {

    return request("GET", "staffList");

}


/*==========================================================
  MEMBERS
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

    return request("POST", "deleteMember", {

        memberid

    });

}

function getMember(memberid) {

    return request("GET", "member", {

        memberid

    });

}

function getAllMembers() {

    return request("GET", "members");

}

function searchMember(keyword) {

    return request("GET", "searchMember", {

        keyword

    });

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

    return request("GET", "attendance", {

        memberid

    });

}

function attendanceList() {

    return request("GET", "attendanceList");

}

function memberAttendance(memberid) {

    return request("GET", "memberAttendance", {

        memberid

    });

}

function todayAttendance() {

    return request("GET", "todayAttendance");

}

function deleteAttendance(memberid, date) {

    return request("POST", "deleteAttendance", {

        memberid,

        date

    });

}


/*==========================================================
  END OF PART 2
==========================================================*/

/*==========================================================
  PART 3
  BILLING • REPORTS • SETTINGS • BACKUP • NOTIFICATIONS
==========================================================*/


/*==========================================================
  BILLING
==========================================================*/

function savePayment(payment){

    return request("POST","savePayment",payment);

}

function cancelInvoice(invoice){

    return request("POST","cancelInvoice",{

        invoice

    });

}

function getInvoice(invoice){

    return request("GET","invoice",{

        invoice

    });

}

function invoiceHistory(){

    return request("GET","invoiceHistory");

}

function todayRevenue(){

    return request("GET","todayRevenue");

}

function monthlyRevenue(){

    return request("GET","monthlyRevenue");

}

function yearlyRevenue(){

    return request("GET","yearlyRevenue");

}

function paymentAnalytics(){

    return request("GET","paymentAnalytics");

}

function searchInvoice(keyword){

    return request("GET","searchInvoice",{

        keyword

    });

}


/*==========================================================
  REPORTS
==========================================================*/

function reports(){

    return request("GET","reports");

}

function activeReport(){

    return request("GET","activeReport");

}

function expiredReport(){

    return request("GET","expiredReport");

}

function monthlyJoining(){

    return request("GET","monthlyJoining");

}

function planReport(){

    return request("GET","planReport");

}

function exportCSV(){

    return request("GET","exportCSV");

}


/*==========================================================
  SETTINGS
==========================================================*/

function getSettings(){

    return request("GET","settings");

}

function saveSettings(settings){

    return request("POST","saveSettings",settings);

}

function updateSetting(key,value){

    return request("POST","updateSetting",{

        key,

        value

    });

}

function systemInfo(){

    return request("GET","systemInfo");

}


/*==========================================================
  BACKUP
==========================================================*/

function backupDatabase(){

    return request("GET","backup");

}


/*==========================================================
  NOTIFICATIONS
==========================================================*/

function expiryNotifications(){

    return request("GET","expiryNotifications");

}

function birthdayNotifications(){

    return request("GET","birthdayNotifications");

}

function inactiveMembers(){

    return request("GET","inactiveMembers");

}

function notificationCount(){

    return request("GET","notificationCount");

}


/*==========================================================
  HEALTH CHECK
==========================================================*/

async function pingServer(){

    try{

        const result=await request("GET","systemInfo");

        return{

            success:true,

            server:result

        };

    }

    catch(error){

        return{

            success:false,

            message:error.message

        };

    }

}


/*==========================================================
  VERSION
==========================================================*/

function apiVersion(){

    return{

        version:"3.0",

        platform:"Google Apps Script",

        client:"Pause & Play"

    };

}


/*==========================================================
  END OF API.JS
==========================================================*/
