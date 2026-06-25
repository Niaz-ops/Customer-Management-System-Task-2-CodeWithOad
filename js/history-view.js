let historyData = 
JSON.parse(localStorage.getItem("history")) || [];



function loadHistory(data){


let table =
document.getElementById("historyTable");


table.innerHTML="";



if(data.length===0){


table.innerHTML=`

<tr>

<td colspan="6">
No History Found
</td>

</tr>

`;

return;

}



data.forEach((h,index)=>{


table.innerHTML += `

<tr>

<td>${h.id || index+1}</td>

<td>${h.user || "Unknown"}</td>

<td>${h.role || "-"}</td>

<td>${h.action}</td>

<td>${h.details}</td>

<td>${h.dateTime || h.date}</td>


</tr>


`;

});

}

function searchHistory(){


let value =
document.getElementById("searchHistory")
.value
.toLowerCase();



let filtered =
historyData.filter(h=>{


return(

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

loadHistory(historyData);