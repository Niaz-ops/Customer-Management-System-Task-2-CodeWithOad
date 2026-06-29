let branches =
JSON.parse(localStorage.getItem("branches")) || [];


let editBranchId = null;




// ================= ADD / UPDATE BRANCH =================


function addBranch(){


let name =
document.getElementById("branchName")
.value
.trim();


let code =
document.getElementById("branchCode")
.value
.trim()
.toUpperCase();




if(name==="" || code===""){


alert("Please fill all fields");

return;


}





let exists =
branches.some(b=>

b.code===code &&
b.id!==editBranchId

);



if(exists){


alert(
"Branch code already exists"
);


return;


}






if(editBranchId){



let branch =
branches.find(
b=>b.id===editBranchId
);



branch.name=name;

branch.code=code;



addHistory(
"Branch Updated",
name
);



editBranchId=null;



document.getElementById("branchBtn")
.innerText="Add Branch";



}




else{


let branch={


id:Date.now(),

name:name,

code:code


};



branches.push(branch);



addHistory(
"Branch Created",
name+" ("+code+")"
);



}






saveBranches();


clearForm();


displayBranches();



}





// ================= SAVE =================


function saveBranches(){


localStorage.setItem(

"branches",

JSON.stringify(branches)

);


}







// ================= DISPLAY =================


function displayBranches(search=""){



let table =
document.getElementById("branchTable");



table.innerHTML="";




let data =
branches.filter(b=>{


return(

b.name.toLowerCase()
.includes(search)


||

b.code.toLowerCase()
.includes(search)


);


});





document.getElementById("branchCount")
.innerText =
branches.length;






if(data.length===0){



table.innerHTML=`

<tr>

<td colspan="4">

No Branch Found

</td>

</tr>

`;

return;


}






data.forEach((b,index)=>{


table.innerHTML += `


<tr>


<td>
${index+1}
</td>


<td>
${b.name}
</td>


<td>
${b.code}
</td>


<td>



<button onclick="editBranch(${b.id})">

Edit

</button>




${
localStorage.getItem("role")
==="Super Admin"

?

`

<button 
class="delete"
onclick="deleteBranch(${b.id})">

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





// ================= EDIT =================


function editBranch(id){



let branch =
branches.find(
b=>b.id===id
);



if(!branch)
return;




document.getElementById("branchName")
.value =
branch.name;



document.getElementById("branchCode")
.value =
branch.code;



editBranchId=id;



document.getElementById("branchBtn")
.innerText=
"Update Branch";



}





// ================= DELETE =================


function deleteBranch(id){



if(localStorage.getItem("role")
!=="Super Admin"){


alert(
"Only Super Admin can delete branches"
);


return;


}



let confirmDelete =
confirm(
"Are you sure you want to delete this branch?"
);

if(!confirmDelete)
return;
let branch =
branches.find(
b=>b.id===id
);

branches =
branches.filter(
b=>b.id!==id
);

saveBranches();

addHistory(
"Branch Deleted",
branch.name
);

displayBranches();
}
// ================= SEARCH =================

function searchBranch(){
let value =
document.getElementById("branchSearch")
.value
.toLowerCase();

displayBranches(value);
}

function clearForm(){
document.getElementById("branchName")
.value="";
document.getElementById("branchCode")
.value="";
}
displayBranches();