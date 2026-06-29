let customers = JSON.parse(localStorage.getItem("customers")) || [];
function loadClearedCustomers(){
let table = document.getElementById("clearedTable");
table.innerHTML="";
let clearedCustomers = customers.filter(c => 
Number(c.remaining) === 0
);
if(clearedCustomers.length === 0){
table.innerHTML = `
<tr>
<td colspan="6">No cleared customers found</td>
</tr>
`;
return;
}
clearedCustomers.forEach(c=>{
let history="";
if(c.installments && c.installments.length>0){
c.installments.forEach((p,index)=>{
history += 
`
<p>${index+1}. ${p.date} - Rs ${p.amount}</p>
`;
});
}else{
    history="No Installment";
}
table.innerHTML +=`
<tr>
<td>${c.id}</td>
<td>${c.name}</td>
<td>${c.mobile}</td>
<td>Rs ${Number(c.totalAmount).toLocaleString()}</td>
<td>${history}</td>
<td>
<button onclick="printHistory('${c.id}')">Print</button>
<button onclick="downloadPDF('${c.id}')">PDF</button>
<button onclick="reopenCustomer('${c.id}')">Reopen</button>
</td>
</tr>
`;
});
}

function reopenCustomer(id){

let customer = customers.find(c=>c.id===id);

if(!customer){
    return;
}

let paidAmount = Number(customer.advance || 0);

if(customer.installments){

customer.installments.forEach(p=>{
    paidAmount += Number(p.amount);
});

}
customer.remaining =
Number(customer.totalAmount) - paidAmount;


localStorage.setItem(
"customers",
JSON.stringify(customers)
);

if(typeof addHistory === "function"){

addHistory(
"Customer Reopened",
customer.id + " - " + customer.name
);

}
alert(
"Customer account reopened successfully"
);


loadClearedCustomers();

}
loadClearedCustomers();

function saveNewPurchase(){

let id = prompt("Enter Customer ID");


let customer =
customers.find(c=>c.id===id);


if(!customer){

alert("Customer not found");
return;

}


let amount =
Number(document.getElementById("newAmount").value);


let items =
Number(document.getElementById("newItems").value);


let date =
document.getElementById("newDate").value;



if(!amount || !date){

alert("Fill purchase details");

return;

}



// keep old history

customer.previousPurchases =
customer.previousPurchases || [];



customer.previousPurchases.push({

amount:customer.totalAmount,
date:customer.date,
items:customer.totalItems

});



// new purchase

customer.totalAmount = amount;

customer.totalItems = items;

customer.date = date;

customer.advance = 0;

customer.installments=[];

customer.remaining = amount;



localStorage.setItem(
"customers",
JSON.stringify(customers)
);



addHistory(
"New Purchase Added",
customer.id
);



alert(
"Customer account reopened with same ID"
);


loadClearedCustomers();

}

function printHistory(id){


let customer =
customers.find(c=>c.id===id);


let text = 
`
Customer Name:
${customer.name}


Customer ID:
${customer.id}


Payment History:

`;


customer.installments.forEach(i=>{

text +=
`
${i.date}  Rs ${i.amount}
`;

});


let win =
window.open("");

win.document.write(
`
<pre>${text}</pre>
`
);
win.document.close();
win.focus();
win.print();
}
function downloadPDF(id){
alert(
"PDF generation can be connected using jsPDF library"
);

}