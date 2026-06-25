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
<td><button onclick="reopenCustomer('${c.id}')">Reopen</button></td>
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