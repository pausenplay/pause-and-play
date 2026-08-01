async function loadAttendance(){
let search=document
.getElementById("search")
.value
.toLowerCase();
let data=await getAttendance();
let html="";
data.forEach(a=>{
if(a.memberid.toLowerCase().includes(search)){
html+=`
<div class="card">
<b>${a.memberid}</b>
<p>${a.name}</p>
<p>${a.date}</p>
<p>${a.time}</p>
</div>
`;
}
});
attendanceList.innerHTML=html;
}
loadAttendance();
