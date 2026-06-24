let customers = JSON.parse(localStorage.getItem("customers")) || [];
function loadMajorSheet(){
let table = document.getElementById("majorTable");
let totalSales = 0;
let totalAdvance = 0;
let totalRemaining = 0;
table.innerHTML = "";
customers.forEach(c => {
totalSales += Number(c.totalAmount);
totalAdvance += Number(c.advance);
totalRemaining += Number(c.remaining);
table.innerHTML += `
<tr>
<td>${c.serial}</td>
<td>${c.id}</td>
<td>${c.name}</td>
<td>${c.totalItems}</td>
<td>${c.totalAmount}</td>
<td>${c.advance}</td>
<td>${c.remaining}</td>
</tr>
`;
});
document.getElementById("totalCustomers").innerText = customers.length;
document.getElementById("totalSales").innerText = totalSales;
document.getElementById("totalAdvance").innerText = totalAdvance;
document.getElementById("totalRemaining").innerText = totalRemaining;
}
loadMajorSheet();