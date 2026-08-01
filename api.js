const API_URL="YOUR_GOOGLE_APPS_SCRIPT_URL";


async function saveMemberAPI(member){

let res=await fetch(API_URL,{
method:"POST",
body:JSON.stringify(member)
});

return await res.json();

}


async function getMemberAPI(memberid){

let res=await fetch(
API_URL+"?action=getMember&memberid="+memberid
);

return await res.json();

}


async function updateMemberAPI(member){

let res=await fetch(API_URL,{
method:"POST",
body:JSON.stringify({
action:"update",
data:member
})
});

return await res.json();

}


async function dashboardAPI(){

let res=await fetch(
API_URL+"?action=dashboard"
);

return await res.json();

}
