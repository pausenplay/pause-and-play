/************************************************
 * api.js
 * Pause & Play Membership System
 ************************************************/

// ========================================
// CHANGE ONLY THIS
// ========================================

const API_URL="YOUR_WEB_APP_URL";

// ========================================

const API={

token:localStorage.getItem("token")||"",


// ---------------- GET ----------------

async get(action,params={}){

params.action=action;

const url=new URL(API_URL);

Object.keys(params).forEach(key=>{

url.searchParams.append(key,params[key]);

});

const res=await fetch(url);

return await res.json();

},


// ---------------- POST ----------------

async post(action,data={}){

data.action=action;

if(this.token){

data.token=this.token;

}

const res=await fetch(API_URL,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});

return await res.json();

},


// ---------------- LOGIN ----------------

async login(username,password){

const res=await this.post("login",{

username,

password

});

if(res.success){

localStorage.setItem(

"token",

res.token

);

localStorage.setItem(

"role",

res.role

);

localStorage.setItem(

"username",

res.username

);

this.token=res.token;

}

return res;

},


// ---------------- LOGOUT ----------------

async logout(){

await this.post("logout",{

token:this.token

});

localStorage.clear();

location.href="index.html";

},


// ---------------- MEMBERS ----------------

members(){

return this.get("members");

},

member(id){

return this.get("member",{

memberid:id

});

},

saveMember(data){

return this.post(

"saveMember",

data

);

},

updateMember(data){

return this.post(

"updateMember",

data

);

},

deleteMember(id){

return this.post(

"deleteMember",

{

memberid:id

}

);

},

renewMember(data){

return this.post(

"renewMember",

data

);

},


// ---------------- ATTENDANCE ----------------

attendance(id){

return this.get(

"attendance",

{

memberid:id

}

);

},

attendanceList(){

return this.get(

"attendanceList"

);

},

memberAttendance(id){

return this.get(

"memberAttendance",

{

memberid:id

}

);

},


// ---------------- DASHBOARD ----------------

dashboard(){

return this.get(

"dashboard"

);

},


// ---------------- REPORTS ----------------

reports(){

return this.get(

"reports"

);

},

activeReport(){

return this.get(

"activeReport"

);

},

expiredReport(){

return this.get(

"expiredReport"

);

},


// ---------------- BILLING ----------------

savePayment(data){

return this.post(

"savePayment",

data

);

},

invoiceHistory(){

return this.get(

"invoiceHistory"

);

},

invoice(id){

return this.get(

"invoice",

{

invoice:id

}

);

},

todayRevenue(){

return this.get(

"todayRevenue"

);

},

monthlyRevenue(){

return this.get(

"monthlyRevenue"

);

},

paymentAnalytics(){

return this.get(

"paymentAnalytics"

);

},


// ---------------- SETTINGS ----------------

settings(){

return this.get(

"settings"

);

},

saveSettings(data){

return this.post(

"saveSettings",

data

);

},


// ---------------- STAFF ----------------

staff(){

return this.get(

"staffList"

);

},

createStaff(data){

return this.post(

"createStaff",

data

);

},


// ---------------- LOGS ----------------

logs(){

return this.get(

"logs"

);

},

todayLogs(){

return this.get(

"todayLogs"

);

},


// ---------------- NOTIFICATIONS ----------------

notifications(){

return this.get(

"notificationCount"

);

}

};
