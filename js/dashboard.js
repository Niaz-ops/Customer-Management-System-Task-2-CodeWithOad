document.addEventListener("DOMContentLoaded",function(){
let buttons=document.querySelectorAll(".filter-btn");
buttons.forEach(btn=>{
btn.addEventListener("click",function(){
buttons.forEach(b=>{
b.classList.remove("selected");
});
this.classList.add("selected");
let filter=this.innerText;


loadDashboard(filter);
});
});
loadDashboard("All Branches");


});

function loadDashboard(filter){
let customers =
JSON.parse(localStorage.getItem("customers")) || [];
let filteredCustomers =
filterData(customers,filter);
let items=0;
let advance=0;
let installments=0;
let remaining=0;




filteredCustomers.forEach(c=>{


items += Number(c.totalItems || 0);


advance += Number(c.advance || 0);



if(c.installments){


c.installments.forEach(i=>{


installments += Number(i.amount || 0);


});


}



remaining += Number(c.remaining || 0);



});



let collection =
advance + installments;




document.getElementById("itemsSold").innerText =
items;



document.getElementById("advance").innerText =
"Rs " + advance.toLocaleString();



document.getElementById("installments").innerText =
"Rs " + installments.toLocaleString();



document.getElementById("collection").innerText =
"Rs " + collection.toLocaleString();



document.getElementById("remaining").innerText =
"Rs " + remaining.toLocaleString();



}







function filterData(customers,filter){



let today = new Date();



if(filter==="All Branches"){

return customers;

}



if(filter==="Daily"){


return customers.filter(c=>{


let date=new Date(c.date);


return date.toDateString() === today.toDateString();


});


}





if(filter==="10 Days"){



return customers.filter(c=>{


let date=new Date(c.date);


let difference =
(today-date)/(1000*60*60*24);



return difference>=0 && difference<=10;


});


}





if(filter==="Monthly"){



return customers.filter(c=>{


let date=new Date(c.date);


return (

date.getMonth()===today.getMonth()

&&

date.getFullYear()===today.getFullYear()

);
});
}

return customers;


}