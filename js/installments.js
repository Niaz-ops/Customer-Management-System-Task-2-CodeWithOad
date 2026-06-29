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
let paymentTime = new Date().toLocaleString();
customer.installments.push({amount: amount,date: date,time: paymentTime
});

let totalPaid = (customer.advance || 0) +
customer.installments.reduce((sum, i) => sum + i.amount, 0);
customer.remaining = customer.totalAmount - totalPaid;
localStorage.setItem("customers", JSON.stringify(customers));

addHistory("Installment Received",id + " Rs " + amount);
generateReceipt(customer, amount, date);
generatePDF(
customer,
amount,
date
);

alert("Payment added successfully");
showHistory(customer);
}
function showHistory(customer){
let box = document.getElementById("history");
box.innerHTML = "<h4>Customer: " + customer.name + "</h4>";
customer.installments.forEach((p, index) => {
box.innerHTML += `
<p>${index + 1}.${p.date}${p.time}-Rs ${p.amount}</p>
`;
});
}

function generateReceipt(customer, amount, date){

let receipt = `
================================
CUSTOMER MANAGEMENT SYSTEM
================================

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

================================
Thank you.
================================
`;


// Save last receipt
localStorage.setItem(
    "lastReceipt",
    receipt
);


// Print Receipt
let openReceipt = confirm(
    "Print receipt?"
);


if(openReceipt){

    let printWindow = window.open(
        "",
        "_blank",
        "width=600,height=700"
    );


    if(printWindow){

        printWindow.document.write(`
        <html>
        <head>
        <title>Payment Receipt</title>

        <style>
        body{
            font-family: Arial;
            padding:30px;
        }

        pre{
            font-size:18px;
        }

        button{
            padding:10px 20px;
            background:green;
            color:white;
            border:none;
            cursor:pointer;
        }
        </style>

        </head>

        <body>

        <pre>${receipt}</pre>

        </body>
        </html>
        `);


        printWindow.document.close();

        printWindow.focus();

        printWindow.print();

        printWindow.close();


    }else{

        alert(
        "Popup blocked. Please allow popups."
        );

    }

}


// WhatsApp Sharing

let sendWhatsApp = confirm(
    "Send receipt on WhatsApp?"
);


if(sendWhatsApp){

    let message = encodeURIComponent(receipt);


    window.open(
        "https://wa.me/?text=" + message,
        "_blank"
    );

}

}
function generatePDF(customer,amount,date){


const {jsPDF}=window.jspdf;


let doc=new jsPDF();


doc.setFontSize(18);

doc.text(
"Installment Receipt",
20,
20
);



doc.setFontSize(12);


doc.text(
"Customer Name: "+customer.name,
20,
40
);


doc.text(
"Customer ID: "+customer.id,
20,
50
);



doc.text(
"Payment Date: "+date,
20,
60
);



doc.text(
"Amount Received: Rs "+amount,
20,
70
);



doc.text(
"Remaining Balance: Rs "+customer.remaining,
20,80
);
doc.save(
"Receipt-"+customer.id+".pdf"
);


}