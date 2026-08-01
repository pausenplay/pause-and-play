let nextMemberID = localStorage.getItem("nextMemberID");
if(nextMemberID==null){
nextMemberID=6007;
}else{
nextMemberID=parseInt(nextMemberID);
}
function saveMember() {
    let member = {
        memberid: "26PP0" + nextMemberID,
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        plan: document.getElementById("plan").value,
        startdate: document.getElementById("startdate").value
    };
    let members = JSON.parse(localStorage.getItem("members")) || [];
    members.push(member);
    localStorage.setItem("members", JSON.stringify(members));
    alert("Member Saved Successfully");
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
