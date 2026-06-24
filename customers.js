let customers = JSON.parse(localStorage.getItem("customers")) || [];
let deletedCustomer = null;
let undoContainer = null;
let editId = null;
let serialNumber = JSON.parse(localStorage.getItem("serialNumber")) || 1;
function addCustomer(){

let name = document.getElementById("name").value;
let father = document.getElementById("father").value;
let mobile = document.getElementById("mobile").value;
let city = document.getElementById("city").value;
let previousId = document.getElementById("previousId").value;
let date = document.getElementById("date").value;
let totalItems = Number(document.getElementById("totalItems").value);
let totalAmount = Number(document.getElementById("totalAmount").value);
let advance = Number(document.getElementById("advance").value);
if(
    name === "" || father === "" || mobile === "" || city === "" || totalAmount === 0 || totalItems === 0 || date === 0)
    {
    alert("Please fill all customer information before adding.");
    let confirmSave = confirm("Some information is missing. Do you still want to save?");

    if(!confirmSave){
    return;
}}
let remaining = totalAmount - advance;
if(editId !== null){
let customer = customers.find(c => c.id === editId);
customer.name = name;
customer.father = father;
customer.mobile = mobile;
customer.city = city;
customer.date = date;
customer.totalItems = totalItems;
customer.totalAmount = totalAmount;
customer.advance = advance;
customer.remaining = remaining;

editId = null;
document.querySelector(".form button").innerText = "Add Customer";
}else
{
if(previousId !== ""){
let exists = customers.some(c => c.id === previousId);
if(!exists){
alert("Previous Customer ID does not exist");
return;
}
}

let customer = {
serial: serialNumber,
id: previousId !== "" ? previousId : "CUST-" + Date.now(),
name,
father,
mobile,
city,
date,
totalItems,
totalAmount,
advance,
remaining
};
customers.push(customer);
serialNumber++;
localStorage.setItem(
"serialNumber",
JSON.stringify(serialNumber)
);

}
localStorage.setItem("customers",JSON.stringify(customers));
renderTable();

document.getElementById("name").value = "";
document.getElementById("father").value = "";
document.getElementById("mobile").value = "";
document.getElementById("city").value = "";
document.getElementById("date").value = "";
document.getElementById("totalItems").value = "";
document.getElementById("totalAmount").value = "";
document.getElementById("advance").value = "";
document.getElementById("previousId").value = "";

}

function renderTable(){
let table = document.getElementById("customerTable");
table.innerHTML = "";
customers.forEach((c) => {
table.innerHTML += `
<tr>
<td>${c.serial}</td>
<td>${c.id}</td>
<td>${c.name}</td>
<td>${c.mobile}</td>
<td>${c.city}</td>
<td>${c.date}</td>
<td>${c.totalItems}</td>
<td>${c.totalAmount}</td>
<td>${c.advance}</td>
<td>${c.remaining}</td>
<td>
<button onclick="editCustomer('${c.id}')">Edit</button>
<button onclick="deleteCustomer('${c.id}')">Delete</button>
</td>
</tr>
`;
});
}
let deletedIndex = null;
function deleteCustomer(id){
deletedIndex = customers.findIndex(c => c.id == id);
deletedCustomer = customers[deletedIndex];
customers.splice(deletedIndex,1);
localStorage.setItem("customers",JSON.stringify(customers));
renderTable();
showUndoButton();
}
renderTable();

function editCustomer(id){
let customer = customers.find(c => c.id == id);

document.getElementById("name").value = customer.name;
document.getElementById("father").value = customer.father;
document.getElementById("mobile").value = customer.mobile;
document.getElementById("city").value = customer.city;
document.getElementById("date").value = customer.date;
document.getElementById("totalItems").value = customer.totalItems;
document.getElementById("totalAmount").value = customer.totalAmount;
document.getElementById("advance").value = customer.advance;

editId = id;
document.querySelector(".form button").innerText = "Update Customer";
}

function showUndoButton(){

if(undoContainer){
    undoContainer.remove();
}

undoContainer = document.createElement("div");
undoContainer.innerHTML = `
<div style=" background:#ffe0e0; padding:10px; margin:10px 0; border:1px solid red;
display:flex; justify-content:space-between; align-items:center;">

<span>Customer deleted successfully</span>

<button style=" background:orange; border:none; padding:5px 10px; cursor:pointer;">Undo</button>
</div>
`;

document.querySelector(".main").prepend(undoContainer);
undoContainer.querySelector("button").onclick = function(){

customers.splice(
    deletedIndex,
    0,
    deletedCustomer
);
localStorage.setItem("customers",JSON.stringify(customers));
renderTable();
undoContainer.remove();
};
setTimeout(() => {
    if(undoContainer){   undoContainer.remove();
    }
}, 5000);
}

function searchCustomer(){
let searchValue = document.getElementById("searchInput").value.toLowerCase();
let table = document.getElementById("customerTable");
table.innerHTML = "";
let filteredCustomers = customers.filter((c)=>{
return (
c.name.toLowerCase().includes(searchValue) || c.id.toString().includes(searchValue) ||
c.mobile.includes(searchValue) || c.father.toLowerCase().includes(searchValue) ||
c.city.toLowerCase().includes(searchValue)
);
});

filteredCustomers.forEach((c)=>{ table.innerHTML += `
<tr>
<td>${c.id}</td>
<td>${c.name}</td>
<td>${c.mobile}</td>
<td>${c.totalAmount}</td>
<td>${c.advance}</td>
<td>${c.remaining}</td>
<td>
<button onclick="editCustomer('${c.id}')">Edit</button>
<button onclick="deleteCustomer('${c.id}')">Delete</button>
</td>
</tr>
`;});

}