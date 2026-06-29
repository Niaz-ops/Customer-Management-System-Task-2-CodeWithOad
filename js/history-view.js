let historyData =
JSON.parse(localStorage.getItem("history"))
|| [];




// DISPLAY HISTORY


function loadHistory(data = historyData){


let table =
document.getElementById("historyTable");


table.innerHTML="";



document.getElementById("historyCount")
.innerText=data.length;




if(data.length===0){


table.innerHTML=`

<tr>

<td colspan="7">

No Activity Found

</td>

</tr>

`;

return;

}





data.slice().reverse()
.forEach((h,index)=>{



table.innerHTML +=`


<tr>


<td>
${index+1}
</td>



<td>
${h.action}
</td>



<td>
${h.user}
</td>



<td>
${h.role}
</td>



<td>
${h.details}
</td>



<td>
${h.date}
</td>



<td>



${
localStorage.getItem("role")
==="Super Admin"

?

`

<button onclick="deleteHistory(${h.id})">

Delete

</button>

`

:

"View Only"

}



</td>


</tr>



`;



});



}








// DELETE ONE RECORD


function deleteHistory(id){



if(localStorage.getItem("role")
!=="Super Admin"){


alert(
"Only Super Admin can delete history"
);


return;


}




historyData =
historyData.filter(
h=>h.id!==id
);



saveHistory();


loadHistory();



}








// CLEAR ALL


function clearAllHistory(){



if(localStorage.getItem("role")
!=="Super Admin"){


alert(
"Only Super Admin can clear history"
);


return;

}



if(!confirm(
"Delete complete audit history?"
))

return;



localStorage.removeItem(
"history"
);



historyData=[];


loadHistory();



}








// SEARCH


function searchHistory(){


let value =
document.getElementById(
"searchHistory"
)
.value
.toLowerCase();




let filtered =
historyData.filter(h=>{


return(

h.action.toLowerCase()
.includes(value)

||

h.user.toLowerCase()
.includes(value)

||

h.details.toLowerCase()
.includes(value)

);


});

loadHistory(filtered);

}

// FILTER ACTION
function filterAction(){

let value =
document.getElementById(
"actionFilter"
)
.value;
if(value==="all"){
loadHistory(historyData);
return;
}
let filtered =
historyData.filter(
h=>h.action===value
);

loadHistory(filtered);

}

function saveHistory(){
localStorage.setItem(

"history",

JSON.stringify(historyData)

);
}

// PRINT


function printHistory(){

window.print();

}// EXPORT JSON


function exportHistory(){



let file =
new Blob(

[
JSON.stringify(
historyData,
null,
2
)
],

{
type:"application/json"
}

);

let link =
document.createElement("a");

link.href =
URL.createObjectURL(file);
link.download =
"CMS-Audit-History.json";
link.click();
}
loadHistory();