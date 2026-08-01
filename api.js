const API_URL="YOUR_GOOGLE_APPS_SCRIPT_URL";

async function saveMemberAPI(member){

const response=await fetch(API_URL,{
method:"POST",
body:JSON.stringify(member)
});

return await response.json();

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
