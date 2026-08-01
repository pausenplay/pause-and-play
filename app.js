let nextMemberID=Number(localStorage.getItem("nextMemberID"))||6007;

function newMemberID(){

let id="26PP0"+nextMemberID;

nextMemberID++;

localStorage.setItem("nextMemberID",nextMemberID);

return id;

}

function expiryDate(start,plan){

let d=new Date(start);

switch(plan){

case "1 Month":

d.setMonth(d.getMonth()+1);

break;

case "3 Months":

d.setMonth(d.getMonth()+3);

break;

case "6 Months":

d.setMonth(d.getMonth()+6);

break;

case "12 Months":

d.setMonth(d.getMonth()+12);

break;

}

return d.toISOString().split("T")[0];

}
