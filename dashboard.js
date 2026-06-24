let customers = JSON.parse(localStorage.getItem("customers")) || [];
let totalAmount = 0;
let received = 0;
let remaining = 0;

customers.forEach(c => {
    totalAmount += Number(c.totalAmount || 0);
    received += Number(c.advance || 0);
    if(c.installments){
        c.installments.forEach(i=>{
            received += Number(i.amount);
        });
    }
    remaining += Number(c.remaining || 0);
});
document.getElementById("totalCustomers").innerText = customers.length;

document.getElementById("totalAmount").innerText ="Rs. " + totalAmount.toLocaleString();
document.getElementById("received").innerText ="Rs. " + received.toLocaleString();
document.getElementById("remaining").innerText ="Rs. " + remaining.toLocaleString();