let serialNumber = JSON.parse(localStorage.getItem("serialNumber")) || 1;
let customers = JSON.parse(localStorage.getItem("customers")) || [];
let branches = JSON.parse(localStorage.getItem("branches")) || [];

let deletedCustomer = null;
let deletedIndex = null;
let editId = null;


// ================= ADD / UPDATE CUSTOMER =================

function addCustomer(){

let name = document.getElementById("name").value;
let father = document.getElementById("father").value;
let mobile = document.getElementById("mobile").value;
let city = document.getElementById("city").value;
let branch = document.getElementById("branch").value;
let previousId = document.getElementById("previousId").value;
let date = document.getElementById("date").value;
let totalItems = Number(document.getElementById("totalItems").value);
let totalAmount = Number(document.getElementById("totalAmount").value);
let advance = Number(document.getElementById("advance").value);


if(name==="" || father==="" || mobile==="" || city==="" || date===""){

alert("Please fill required fields");
return;

}


let remaining = totalAmount - advance;


// UPDATE CUSTOMER

if(editId !== null){

let customer = customers.find(c=>c.id===editId);


if(!customer){
alert("Customer not found");
return;
}


customer.name=name;
customer.father=father;
customer.mobile=mobile;
customer.city=city;
customer.branch=branch;
customer.date=date;
customer.totalItems=totalItems;
customer.totalAmount=totalAmount;
customer.advance=advance;
customer.remaining=remaining;


addHistory(
"Customer Updated",
customer.id+" - "+customer.name
);


editId=null;

document.getElementById("addCustomerBtn").innerText=
"Add Customer";

}


// ADD NEW CUSTOMER

else{


let customer={

serial: serialNumber,

id:
previousId!==""?
previousId:
"CUST-"+Date.now(),

name,
father,
mobile,
city,
branch,
date,
totalItems,
totalAmount,
advance,
remaining,

installments:[]

};



customers.push(customer);
serialNumber++;

localStorage.setItem(
    "serialNumber",
    JSON.stringify(serialNumber)
);


addHistory(
"Customer Added",
customer.name
);


}


localStorage.setItem(
"customers",
JSON.stringify(customers)
);


clearForm();

renderTable();

}



// ================= CLEAR FORM =================

function clearForm(){

let fields=[

"name",
"father",
"mobile",
"city",
"previousId",
"date",
"totalItems",
"totalAmount",
"advance"

];


fields.forEach(id=>{

let element=document.getElementById(id);

if(element){
element.value="";
}

});


}



// ================= DISPLAY TABLE =================


function renderTable(){

let table=document.getElementById("customerTable");

if(!table)
return;


table.innerHTML="";


customers.forEach(c=>{


table.innerHTML+=`

<tr>

<td>${c.serial}</td>

<td>${c.id}</td>

<td>${c.name}</td>

<td>${c.mobile}</td>

<td>${c.city}</td>

<td>${c.branch || "-"}</td>

<td>${c.date}</td>

<td>${c.totalItems}</td>

<td>${c.totalAmount}</td>

<td>${c.advance}</td>

<td>${c.remaining}</td>


<td>

<button onclick="editCustomer('${c.id}')">
Edit
</button>


${
checkPermission("delete")
?
`
<button onclick="deleteCustomer('${c.id}')">
Delete
</button>
`
:
""
}


</td>


</tr>


`;

});


}



// ================= EDIT CUSTOMER =================


function editCustomer(id){


let customer =
customers.find(c=>c.id===id);


if(!customer){

alert("Customer not found");

return;

}



document.getElementById("name").value=
customer.name;

document.getElementById("father").value=
customer.father;

document.getElementById("mobile").value=
customer.mobile;

document.getElementById("city").value=
customer.city;

document.getElementById("branch").value=
customer.branch || "";

document.getElementById("date").value=
customer.date;

document.getElementById("totalItems").value=
customer.totalItems;

document.getElementById("totalAmount").value=
customer.totalAmount;

document.getElementById("advance").value=
customer.advance;


editId=id;


document.getElementById("addCustomerBtn").innerText=
"Update Customer";


window.scrollTo({
top:0,
behavior:"smooth"
});


}



// ================= DELETE CUSTOMER =================


function deleteCustomer(id){


let customer =
customers.find(c=>c.id===id);



if(!customer)
return;



deletedCustomer=customer;


deletedIndex=
customers.findIndex(c=>c.id===id);



customers.splice(
deletedIndex,
1
);



localStorage.setItem(
"customers",
JSON.stringify(customers)
);



addHistory(
"Customer Deleted",
customer.id
);



renderTable();


showUndo(customer);


}




// ================= UNDO DELETE =================


function showUndo(customer){


let table =
document.getElementById("customerTable");


let row=document.createElement("tr");


row.id="undoRow";


row.innerHTML=`

<td colspan="12">

${customer.name} deleted


<button id="undoBtn">
Undo
</button>


</td>

`;



table.prepend(row);



document.getElementById("undoBtn").onclick=function(){


let exists =
customers.some(
c=>c.id===customer.id
);



if(exists){

alert("Already restored");
return;

}



customers.splice(
deletedIndex,
0,
customer
);



localStorage.setItem(
"customers",
JSON.stringify(customers)
);



addHistory(
"Customer Restored",
customer.id
);



row.remove();


renderTable();


};



setTimeout(()=>{


if(document.getElementById("undoRow"))
{

document.getElementById("undoRow").remove();

}


},5000);


}




// ================= SEARCH =================


function searchCustomer(){


let value =
document.getElementById("searchInput")
.value
.toLowerCase();



let table =
document.getElementById("customerTable");


table.innerHTML="";



customers.filter(c=>{


return(

c.name.toLowerCase().includes(value)

||

c.id.toLowerCase().includes(value)

||

c.mobile.includes(value)

||

c.city.toLowerCase().includes(value)


);


}).forEach(c=>{


table.innerHTML+=`

<tr>

<td>${c.id}</td>

<td>${c.name}</td>

<td>${c.mobile}</td>

<td>${c.totalAmount}</td>

<td>${c.advance}</td>

<td>${c.remaining}</td>


<td>

<button onclick="editCustomer('${c.id}')">
Edit
</button>


<button onclick="deleteCustomer('${c.id}')">
Delete
</button>


</td>


</tr>


`;


});


}



// ================= LOAD BRANCHES =================


function loadBranches(){


let select =
document.getElementById("branch");


if(!select)
return;



select.innerHTML=
`
<option value="">
Select Branch
</option>
`;



branches.forEach(b=>{


select.innerHTML+=

`

<option value="${b.code}">
${b.name}
</option>

`;

});


}



// ================= START =================


loadBranches();

renderTable();



if(
!checkPermission("add")
)

{

let btn=
document.getElementById("addCustomerBtn");


if(btn)
btn.style.display="none";


}