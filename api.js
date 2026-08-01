const API_URL="YOUR_GOOGLE_APPS_SCRIPT_URL";

async function saveMember(){

const member={

memberid:newMemberID(),

name:document.getElementById("name").value,

mobile:document.getElementById("mobile").value,

plan:document.getElementById("plan").value,

startdate:document.getElementById("startdate").value,

expiry:expiryDate(

document.getElementById("startdate").value,

document.getElementById("plan").value

),

status:"ACTIVE"

};

await saveMemberAPI(member);

alert("Member Saved");

location.reload();

}

async function getMemberAPI(memberid){

const response=await fetch(
API_URL+"?action=getMember&memberid="+memberid
);

return await response.json();

}

async function attendanceAPI(memberid){

const response=await fetch(
API_URL+"?action=attendance&memberid="+memberid
);

return await response.json();

}
