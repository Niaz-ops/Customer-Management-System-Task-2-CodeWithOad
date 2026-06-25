let customers = JSON.parse(localStorage.getItem("customers")) || [];

function addInstallment(){
let id = document.getElementById("customerId").value;
let amount = Number(document.getElementById("amount").value);
let date = document.getElementById("payDate").value;

if(!id || !amount || !date){
alert("Please fill all fields");
return;
}

let customer = customers.find(c => c.id === id);
if(!customer){
alert("Customer not found");
return;
}
customer.installments = customer.installments || [];
customer.installments.push({ amount, date });
let totalPaid = (customer.advance || 0) +
customer.installments.reduce((sum, i) => sum + i.amount, 0);
customer.remaining = customer.totalAmount - totalPaid;
localStorage.setItem("customers", JSON.stringify(customers));

addHistory("Installment Received",id + " Rs " + amount);
generateReceipt(customer, amount, date);

alert("Payment added successfully");
showHistory(customer);
}
function showHistory(customer){
let box = document.getElementById("history");
box.innerHTML = "<h4>Customer: " + customer.name + "</h4>";
customer.installments.forEach((p, index) => {
box.innerHTML += `
<p>${index + 1}. ${p.date} - Rs ${p.amount}</p>
`;
});
}

function generateReceipt(customer, amount, date){

let receipt = `

CUSTOMER MANAGEMENT SYSTEM

Customer Name:
${customer.name}

Customer ID:
${customer.id}

Payment Date:
${date}

Amount Received:
Rs ${amount}

Remaining Balance:
Rs ${customer.remaining}


Thank you.

`;

localStorage.setItem(
"lastReceipt",
receipt
);


let openReceipt = confirm(
" Print receipt?"
);

if(openReceipt){

printWindow.print();
printWindow.close();

}

let whatsapp =
confirm("Send receipt on WhatsApp?");


if(whatsapp){

window.open(
"https://wa.me/?text=" + message
);

}

}