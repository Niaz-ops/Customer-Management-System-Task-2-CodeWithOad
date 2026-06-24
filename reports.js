if(localStorage.getItem("login") !== "true"){
    window.location.href="login.html";
}
let customers = JSON.parse(localStorage.getItem("customers")) || [];

function loadReports(data){
let items = 0;
let advance = 0;
let installments = 0;
let remaining = 0;


let table = document.getElementById("reportTable");
table.innerHTML="";

if(data.length === 0){
table.innerHTML = `
<tr>
<td colspan="7" style="text-align:center">No Records Found</td>
</tr>
`;
}
data.forEach(c=>{
items += Number(c.totalItems);
advance += Number(c.advance);
let customerInstallments = 0;
if(c.installments){
c.installments.forEach(i=>{
customerInstallments += Number(i.amount);
});
}
installments += customerInstallments;
remaining += Number(c.remaining);
table.innerHTML += `
<tr>

<td>${c.date}</td>
<td>${c.name}</td>
<td>${c.totalItems}</td>
<td>${c.totalAmount}</td>
<td>${c.advance}</td>
<td>${customerInstallments}</td>
<td>${c.remaining}</td>

</tr>
`;
});
document.getElementById("customersCount").innerText=data.length;
document.getElementById("itemsSold").innerText=items;
document.getElementById("advanceTotal").innerText=advance;
document.getElementById("installmentTotal").innerText=installments;
document.getElementById("remainingTotal").innerText=remaining;
document.getElementById("collectionTotal").innerText =
advance + installments;
}
loadReports(customers);
function activeButton(type){

document.querySelectorAll(".report-filter button")
.forEach(btn=>{
    btn.classList.remove("active");
});

if(type==="daily"){
document.getElementById("dailyBtn").classList.add("active");
}

if(type==="10days"){
document.getElementById("tenDaysBtn").classList.add("active");
}

if(type==="monthly"){
document.getElementById("monthlyBtn").classList.add("active");
}

if(type==="all"){
document.getElementById("allBtn").classList.add("active");
}

}
function filterReport(type){
activeButton(type);
let today = new Date();
let filtered = customers.filter(c=>{
let purchaseDate = new Date(c.date);

if(type==="daily"){
    return (
    purchaseDate.getDate() === today.getDate() &&
    purchaseDate.getMonth() === today.getMonth() &&
    purchaseDate.getFullYear() === today.getFullYear()
    );
}
if(type==="10days"){
let difference =
(today - purchaseDate)/(1000*60*60*24);
return difference >=0 && difference <=10;
}
if(type==="monthly"){
return purchaseDate.getMonth() === today.getMonth()
&&
purchaseDate.getFullYear() === today.getFullYear();
}
return true;
});
loadReports(filtered);
}