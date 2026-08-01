let nextMemberID = 6007;
document.addEventListener("DOMContentLoaded", function () {
    const member = document.getElementById("memberid");
    if(member){
        member.innerHTML="Member ID : 26PP0"+nextMemberID;
    }
});
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
    location.reload();
}
