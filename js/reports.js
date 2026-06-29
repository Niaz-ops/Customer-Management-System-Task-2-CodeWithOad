let customers =
JSON.parse(localStorage.getItem("customers")) || [];


let branches =
JSON.parse(localStorage.getItem("branches")) || [];



let currentData = customers;



// LOAD BRANCH DROPDOWN

function loadBranchFilter(){


let select =
document.getElementById("branchFilter");


branches.forEach(branch=>{


select.innerHTML += `

<option value="${branch.code}">
${branch.name}
</option>

`;


});


}





// LOAD REPORT


function loadReports(data){


currentData=data;


let table =
document.getElementById("reportTable");


table.innerHTML="";



let items=0;

let advance=0;

let installments=0;

let remaining=0;



if(data.length===0){


table.innerHTML=`

<tr>

<td colspan="9">

No Records Found

</td>

</tr>

`;


}




data.forEach(customer=>{


let paid=0;



(customer.installments || [])
.forEach(i=>{

paid += Number(i.amount);

});



items += Number(customer.totalItems || 0);


advance += Number(customer.advance || 0);


installments += paid;


remaining += Number(customer.remaining || 0);



table.innerHTML += `


<tr>


<td>
${customer.date}
</td>


<td>
${customer.id}
</td>


<td>
${customer.name}
</td>


<td>
${customer.branch || "-"}
</td>


<td>
${customer.totalItems}
</td>


<td>
Rs ${customer.totalAmount}
</td>


<td>
Rs ${customer.advance}
</td>


<td>
Rs ${paid}
</td>


<td>
Rs ${customer.remaining}
</td>


</tr>



`;


});





document.getElementById("customersCount").innerText=
data.length;


document.getElementById("itemsSold").innerText=
items;


document.getElementById("advanceTotal").innerText=
advance;


document.getElementById("installmentTotal").innerText=
installments;


document.getElementById("remainingTotal").innerText=
remaining;



document.getElementById("collectionTotal").innerText=
advance+installments;


}






// DATE FILTERS


function filterReport(type){



let today=new Date();



let result=customers.filter(c=>{


let date=new Date(c.date);



if(type==="daily"){


return date.toDateString()
===
today.toDateString();


}



if(type==="10days"){


let diff=
(today-date)
/86400000;


return diff>=0 && diff<=10;


}




if(type==="monthly"){


return date.getMonth()
===
today.getMonth()
&&
date.getFullYear()
===
today.getFullYear();


}



return true;



});



document.getElementById("reportTitle")
.innerText=
type.toUpperCase()+" REPORT";



loadReports(result);



}





// BRANCH REPORT


function filterBranchReport(){


let branch=
document.getElementById("branchFilter")
.value;



if(branch==="all"){


loadReports(customers);

return;


}



let data =
customers.filter(c=>
c.branch===branch
);



let name =
document.querySelector(
"#branchFilter option:checked"
).text;



document.getElementById("reportTitle")
.innerText=
name+" REPORT";



loadReports(data);



}






// SEARCH


function searchReport(){


let value =
document.getElementById("searchReport")
.value
.toLowerCase();



let data =
currentData.filter(c=>


c.name.toLowerCase()
.includes(value)


||

c.id.toLowerCase()
.includes(value)


||

(c.branch||"")
.toLowerCase()
.includes(value)



);



loadReports(data);


}







function printReport(){

window.print();

}





document.addEventListener(
"DOMContentLoaded",
()=>{


loadBranchFilter();


loadReports(customers);


});