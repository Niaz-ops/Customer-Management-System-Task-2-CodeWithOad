/* ================= CUSTOMER PORTAL ================= */


let customers =
JSON.parse(localStorage.getItem("customers")) || [];



let currentCustomer = null;



// ================= LOGIN =================


function customerLogin(){


let id =
document.getElementById("customerId").value.trim();


let mobile =
document.getElementById("mobile").value.trim();



let error =
document.getElementById("error");



error.innerHTML="";



if(id==="" || mobile===""){


error.innerHTML =
"Please enter Customer ID and Mobile Number";

return;

}




let customer =
customers.find(c=>


c.id === id &&
c.mobile === mobile


);



if(!customer){


error.innerHTML =
"Invalid Customer ID or Mobile Number";


return;

}



currentCustomer = customer;



localStorage.setItem(
"portalCustomer",
JSON.stringify(customer)
);



showAccount(customer);


}





// ================= SHOW ACCOUNT =================


function showAccount(customer){



let account =
document.getElementById("account");



let installmentTotal = 0;



if(customer.installments){


customer.installments.forEach(i=>{

installmentTotal += Number(i.amount);

});


}




let totalPaid =
Number(customer.advance || 0)
+
installmentTotal;



let progress = 0;


if(customer.totalAmount > 0){


progress =
(totalPaid / customer.totalAmount) * 100;


}




account.innerHTML = `



<h2>
Welcome ${customer.name}
</h2>



<div class="customer-info">


<p>
<b>Customer ID:</b>
${customer.id}
</p>


<p>
<b>Mobile:</b>
${customer.mobile}
</p>


<p>
<b>Branch:</b>
${customer.branch || "-"}
</p>



<p>
<b>Total Purchase:</b>
Rs ${Number(customer.totalAmount).toLocaleString()}
</p>



<p>
<b>Advance Paid:</b>
Rs ${Number(customer.advance).toLocaleString()}
</p>



<p>
<b>Installments Paid:</b>
Rs ${installmentTotal.toLocaleString()}
</p>



<p>
<b>Remaining Balance:</b>
Rs ${Number(customer.remaining).toLocaleString()}
</p>


</div>





<h3>
Payment Progress
</h3>



<div class="progress-box">

<div class="progress-bar"
style="width:${progress}%">

${progress.toFixed(0)}%

</div>

</div>







<h3>
Installment History
</h3>



<table>


<tr>

<th>
Date
</th>


<th>
Amount
</th>


</tr>



${
customer.installments && customer.installments.length > 0

?

customer.installments.map(i=>`

<tr>

<td>
${i.date}
</td>


<td>
Rs ${Number(i.amount).toLocaleString()}
</td>


</tr>

`).join("")


:

`

<tr>

<td colspan="2">

No Payment History

</td>

</tr>

`

}



</table>





<button onclick="printReceipt()">

🖨 Print Receipt

</button>



<button onclick="portalLogout()">

Logout

</button>



`;



}








// ================= PRINT RECEIPT =================


function printReceipt(){



if(!currentCustomer){

alert(
"Please login first"
);

return;

}



let customer =
currentCustomer;



let installmentTotal=0;



customer.installments?.forEach(i=>{

installmentTotal += Number(i.amount);

});





let receipt = `


================================

INSTALLMENT PRO RECEIPT

================================



Customer Name:

${customer.name}



Customer ID:

${customer.id}



Mobile:

${customer.mobile}



Total Amount:

Rs ${customer.totalAmount}



Advance:

Rs ${customer.advance}



Installments Paid:

Rs ${installmentTotal}



Remaining:

Rs ${customer.remaining}



================================

Thank You

================================


`;




let win =
window.open(
"",
"_blank"
);



win.document.write(`

<html>

<head>

<title>
Receipt
</title>

</head>


<body>


<pre>

${receipt}

</pre>


</body>


</html>


`);



win.print();


}







// ================= LOGOUT =================



function portalLogout(){


currentCustomer=null;


localStorage.removeItem(
"portalCustomer"
);



document.getElementById("account").innerHTML=

`

<h3>
Customer Account Information
</h3>


<p>
Login to view your details.
</p>

`;


document.getElementById("customerId").value="";

document.getElementById("mobile").value="";



}






// ================= AUTO LOGIN =================



window.onload=function(){


let saved =
JSON.parse(
localStorage.getItem("portalCustomer")
);



if(saved){


currentCustomer=saved;

showAccount(saved);


}


};