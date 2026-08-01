const API_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";


async function apiGet(action, value=""){

let url = API_URL + "?action=" + action;

if(value!=""){

url += "&memberid=" + value;

}

let response = await fetch(url);

return await response.json();

}



async function apiPost(data){

let response = await fetch(API_URL,{

method:"POST",

body:JSON.stringify(data)

});


return await response.json();

}



async function addMember(data){

return await apiPost(data);

}



async function getMember(id){

return await apiGet("getMember",id);

}



async function getMembers(){

return await apiGet("getAllMembers");

}



async function updateMember(data){

data.action="update";

return await apiPost(data);

}



async function renewMember(data){

data.action="renew";

return await apiPost(data);

}



async function getDashboard(){

return await apiGet("dashboard");

}
