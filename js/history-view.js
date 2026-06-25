let historyData =
JSON.parse(localStorage.getItem("history")) || [];



function loadHistory(data = historyData){


let table =
document.getElementById("historyTable");


table.innerHTML="";



if(data.length===0){

table.innerHTML=`

<tr>
<td colspan="7">
No History Found
</td>
</tr>

`;

return;

}



data.forEach((h,index)=>{


table.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${h.action}</td>

<td>${h.user || "Unknown"}</td>

<td>${h.role || "-"}</td>

<td>${h.details}</td>

<td>${h.date}</td>


<td>

${
localStorage.getItem("role")==="Super Admin"

?

`<button onclick="deleteHistory(${index})">
Delete
</button>`

:

"View Only"

}

</td>


</tr>

`;

});


}



function deleteHistory(index){


if(localStorage.getItem("role") !== "Super Admin"){

alert(
"Only Super Admin can delete history"
);

return;

}


let confirmDelete =
confirm("Delete this history record?");


if(!confirmDelete){
return;
}



historyData.splice(index,1);


localStorage.setItem(
"history",
JSON.stringify(historyData)
);


loadHistory();

}




function clearAllHistory(){


if(localStorage.getItem("role") !== "Super Admin"){

alert(
"Only Super Admin can clear history"
);

return;

}


if(!confirm("Delete all history?")){
return;
}


localStorage.removeItem("history");


historyData=[];


loadHistory();

}




function searchHistory(){


let value =
document.getElementById("searchHistory")
.value
.toLowerCase();



let filtered = historyData.filter(h=>{


return (

(h.user || "")
.toLowerCase()
.includes(value)

||

(h.action || "")
.toLowerCase()
.includes(value)

||

(h.details || "")
.toLowerCase()
.includes(value)

);


});


loadHistory(filtered);


}


loadHistory();