let nextMemberID = 6007;
document.addEventListener("DOMContentLoaded", function () {
    const member = document.getElementById("memberid");
    if(member){
        member.innerHTML="Member ID : 26PP0"+nextMemberID;
    }
});
function saveMember(){
    let member={
        memberid:"26PP0"+nextMemberID,
        name:document.getElementById("name").value,
        mobile:document.getElementById("mobile").value,
        plan:document.getElementById("plan").value,
        startdate:document.getElementById("startdate").value
    };
    console.log(member);
    alert("Member Saved Successfully");
    nextMemberID++;
}
