const API_URL="https://script.google.com/macros/s/AKfycbwVVpKy9oZBYJGpN9u-iLn2tXF8b489ZceBbE_N1FFBs9mXvzCWiyaUcc0Mkm-qKcs9Uw/exec";
let nextMemberID = localStorage.getItem("nextMemberID");
if(nextMemberID==null){
nextMemberID=6007;
}else{
nextMemberID=parseInt(nextMemberID);
}
async function saveMember(){
let member={
memberid:"26PP0"+nextMemberID,
name:document.getElementById("name").value,
mobile:document.getElementById("mobile").value,
plan:document.getElementById("plan").value,
startdate:document.getElementById("startdate").value,
expiry:"",
status:"ACTIVE"
};
await fetch(API_URL,{
method:"POST",
body:JSON.stringify(member)
});
alert("Member Saved");
nextMemberID++;
localStorage.setItem("nextMemberID",nextMemberID);
location.reload();
}
function generateQRCode(memberID){
    document.getElementById("memberid").innerHTML=memberID;
    new QRCode(document.getElementById("qrcode"),{
        text:memberID,
        width:220,
        height:220
    });
}
function viewMember(memberid){
let members=JSON.parse(localStorage.getItem("members"))||[];
let member=members.find(x=>x.memberid===memberid);
if(!member){
alert("Member Not Found");
return;
}
document.getElementById("memberID").innerHTML="Member ID : "+member.memberid;
document.getElementById("memberName").innerHTML="Name : "+member.name;
document.getElementById("memberMobile").innerHTML="Mobile : "+member.mobile;
document.getElementById("memberPlan").innerHTML="Plan : "+member.plan;
document.getElementById("memberStart").innerHTML="Start Date : "+member.startdate;
}
async function searchAttendance(){
let id=document.getElementById("memberSearch").value;
let res=await fetch(API_URL+"?memberid="+id);
let data=await res.json();
document.getElementById("result").innerHTML=
`
<div class="card">
<h2>${data.name}</h2>
<p>${data.memberid}</p>
<p>${data.plan}</p>
<p>${data.status}</p>
<button onclick="markAttendance('${data.memberid}')">
Mark Attendance
</button>
</div>
`;
}
