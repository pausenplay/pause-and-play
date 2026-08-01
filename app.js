let nextMemberID =
Number(localStorage.getItem("nextID")) || 6007;
function generateMemberID(){
let id = "26PP0" + nextMemberID;
nextMemberID++;
localStorage.setItem(
"nextID",
nextMemberID
);
return id;
}
function calculateExpiry(start,plan){
let date=new Date(start);
if(plan=="1 Month")
date.setMonth(date.getMonth()+1);
if(plan=="3 Months")
date.setMonth(date.getMonth()+3);
if(plan=="6 Months")
date.setMonth(date.getMonth()+6);
if(plan=="12 Months")
date.setFullYear(date.getFullYear()+1);
return date.toISOString().split("T")[0];
}
function remainingDays(expiry){
let today=new Date();
let end=new Date(expiry);
let diff=end-today;
return Math.ceil(
diff/(1000*60*60*24)
);
}
