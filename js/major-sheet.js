let customers =
JSON.parse(localStorage.getItem("customers")) || [];



function loadMajorSheet(search=""){


let table=document.getElementById("majorTable");


table.innerHTML="";


let totalSales=0;
let totalAdvance=0;
let totalRemaining=0;



customers
.filter(c=>{


return (

c.name.toLowerCase()
.includes(search)

||

c.id.toLowerCase()
.includes(search)

||

c.mobile.includes(search)

||

c.city.toLowerCase()
.includes(search)

);



})
.forEach(c=>{


let installmentTotal =
(c.installments || [])
.reduce(
(sum,i)=>sum+Number(i.amount),
0
);



totalSales += Number(c.totalAmount);

totalAdvance += Number(c.advance);

totalRemaining += Number(c.remaining);



table.innerHTML += `

<tr>

<td>${c.serial}</td>

<td>${c.id}</td>

<td>${c.name}</td>

<td>${c.mobile}</td>

<td>${c.branch || "-"}</td>

<td>${c.totalItems}</td>

<td>${c.totalAmount}</td>

<td>${c.advance}</td>

<td>${installmentTotal}</td>

<td>${c.remaining}</td>


<td>

<button onclick="openReceipt('${c.id}')">

Receipt

</button>


</td>


</tr>


`;


});



document.getElementById("totalCustomers")
.innerText=customers.length;


document.getElementById("totalSales")
.innerText=totalSales;


document.getElementById("totalAdvance")
.innerText=totalAdvance;


document.getElementById("totalRemaining")
.innerText=totalRemaining;



}



function searchMajorCustomer(){


let value =
document.getElementById("majorSearch")
.value
.toLowerCase();


loadMajorSheet(value);


}



function openReceipt(id){
let customer =
customers.find(c=>c.id===id);
if(!customer){
alert("Customer not found");
return;
}
generateReceipt(
customer,
0,
new Date().toLocaleDateString()
);
}
loadMajorSheet();