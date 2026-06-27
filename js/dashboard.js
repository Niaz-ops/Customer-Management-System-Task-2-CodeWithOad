function logout(){
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    localStorage.removeItem("currentUser");
    window.location.href="login.html";
}
let customers = JSON.parse(localStorage.getItem("customers")) || [];

function loadDashboard(){
let totalAmount = 0;
let received = 0;
let remaining = 0;
let installmentsCount = 0;
let todayCollection = 0;

let today = new Date()
.toISOString()
.split("T")[0];

customers.forEach(c=>{

totalAmount += Number(c.totalAmount || 0);
received += Number(c.advance || 0);
remaining += Number(c.remaining || 0);

if(c.installments){
c.installments.forEach(i=>{
installmentsCount++;
received += Number(i.amount || 0);

if(i.date === today){
todayCollection += Number(i.amount || 0);
}
});
}});


if(document.getElementById("totalCustomers"))
document.getElementById("totalCustomers").innerText =
customers.length;

if(document.getElementById("totalAmount"))
document.getElementById("totalAmount").innerText =
"Rs. " + totalAmount.toLocaleString();

if(document.getElementById("received"))
document.getElementById("received").innerText =
"Rs. " + received.toLocaleString();

if(document.getElementById("remaining"))
document.getElementById("remaining").innerText =
"Rs. " + remaining.toLocaleString();

if(document.getElementById("totalSales"))
document.getElementById("totalSales").innerText =
"Rs. " + totalAmount.toLocaleString();

if(document.getElementById("totalReceived"))
document.getElementById("totalReceived").innerText =
"Rs. " + received.toLocaleString();

if(document.getElementById("totalRemaining"))
document.getElementById("totalRemaining").innerText =
"Rs. " + remaining.toLocaleString();

if(document.getElementById("totalInstallments"))
document.getElementById("totalInstallments").innerText =
installmentsCount;

if(document.getElementById("todayCollection"))
document.getElementById("todayCollection").innerText =
"Rs. " + todayCollection.toLocaleString();
loadRecentCustomers();
}

function loadRecentCustomers(){
let table = document.getElementById("recentCustomers");

if(!table)
return;
table.innerHTML="";
let recent = customers.slice(-5).reverse();
recent.forEach(c=>{
table.innerHTML += `

<tr>
<td>${c.id}</td>
<td>${c.name}</td>
<td>Rs. ${Number(c.totalAmount).toLocaleString()}</td>
<td>Rs. ${Number(c.remaining).toLocaleString()}</td>
</tr>
`;});
}
loadDashboard();