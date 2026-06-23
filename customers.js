let customers = JSON.parse(localStorage.getItem("customers")) || [];
let deletedCustomer = null;
let undoContainer = null;
let editId = null;
function addCustomer(){

let name = document.getElementById("name").value;
let father = document.getElementById("father").value;
let mobile = document.getElementById("mobile").value;
let city = document.getElementById("city").value;

let total = Number(document.getElementById("total").value);
let advance = Number(document.getElementById("advance").value);
if(
    name === "" || father === "" || mobile === "" || city === "" || total === 0
){
    alert("Please fill all customer information before adding.");
    return;
}
let remaining = total - advance;
if(editId !== null){
let customer = customers.find(c => c.id == editId);
customer.name = name;
customer.father = father;
customer.mobile = mobile;
customer.city = city;
customer.total = total;
customer.advance = advance;
customer.remaining = remaining;

editId = null;
document.querySelector(".form button").innerText = "Add Customer";
}else
{
let customer = {
id: Date.now(),
name,
father,
mobile,
city,
total,
advance,
remaining
};
customers.push(customer);
}
localStorage.setItem("customers",JSON.stringify(customers));
renderTable();

document.getElementById("name").value = "";
document.getElementById("father").value = "";
document.getElementById("mobile").value = "";
document.getElementById("city").value = "";
document.getElementById("total").value = "";
document.getElementById("advance").value = "";

}

function renderTable(){
let table = document.getElementById("customerTable");
table.innerHTML = "";
customers.forEach((c) => {
table.innerHTML += `
<tr>
<td>${c.id}</td>
<td>${c.name}</td>
<td>${c.mobile}</td>
<td>${c.city}</td>
<td>${c.total}</td>
<td>${c.advance}</td>
<td>${c.remaining}</td>
<td>
<button onclick="editCustomer(${c.id})">Edit</button>
<button onclick="deleteCustomer(${c.id})">Delete</button>
</td>
</tr>
`;
});
}
function deleteCustomer(id){
deletedCustomer = customers.find(c => c.id == id);
customers = customers.filter(c => c.id != id);
localStorage.setItem("customers", JSON.stringify(customers));
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
document.getElementById("total").value = customer.total;
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
customers.push(deletedCustomer);
localStorage.setItem("customers", JSON.stringify(customers));
renderTable();
undoContainer.remove();

};
setTimeout(() => {
    if(undoContainer){   undoContainer.remove();
    }
}, 5000);

}