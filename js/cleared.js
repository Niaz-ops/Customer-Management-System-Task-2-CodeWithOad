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
<td>Rs ${c.totalAmount}</td>
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
customer.remaining = customer.totalAmount;
localStorage.setItem("customers",JSON.stringify(customers));
alert("Customer account reopened");
loadClearedCustomers();
}
loadClearedCustomers();