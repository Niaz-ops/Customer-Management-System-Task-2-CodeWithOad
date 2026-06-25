let customers =
JSON.parse(localStorage.getItem("customers")) || [];


function customerLogin(){

let id =
document.getElementById("customerId").value;

let mobile =
document.getElementById("mobile").value;


let customer =
customers.find(c =>
c.id === id &&
c.mobile === mobile
);


if(!customer){

document.getElementById("error").innerText =
"Invalid Customer ID or Mobile Number";

return;

}


showAccount(customer);

}



function showAccount(customer){


let box =
document.getElementById("account");


box.innerHTML = `

<h2>Welcome ${customer.name}</h2>


<p>
Customer ID:
<b>${customer.id}</b>
</p>


<p>
Total Amount:
Rs ${customer.totalAmount}
</p>


<p>
Advance Paid:
Rs ${customer.advance}
</p>


<p>
Remaining Balance:
Rs ${customer.remaining}
</p>


<h3>Installment History</h3>


<table border="1">

<tr>
<th>Date</th>
<th>Amount</th>
</tr>

${
customer.installments.map(i=>`

<tr>
<td>${i.date}</td>
<td>Rs ${i.amount}</td>
</tr>

`).join("")
}

</table>


<button onclick="printReceipt()">
Download / Print Receipt
</button>

`;

}



function printReceipt(){

window.print();

}