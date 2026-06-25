let branches = JSON.parse(localStorage.getItem("branches")) || [];

function addBranch(){

let name = document.getElementById("branchName").value;
let code = document.getElementById("branchCode").value;


if(name==="" || code===""){
alert("Please fill all fields");
return;
}
let exists = branches.some((b)=>b.code === code);
if(exists){
alert("Branch code already exists");
return;
}

let branch = {
id: Date.now(),
name:name,
code:code
};
branches.push(branch);
localStorage.setItem("branches",JSON.stringify(branches));
displayBranches();
document.getElementById("branchName").value="";
document.getElementById("branchCode").value="";
}
function displayBranches(){
let table=document.getElementById("branchTable");
table.innerHTML="";
branches.forEach((b,index)=>{
table.innerHTML += `
<tr>
<td>${index+1}</td>
<td>${b.name}</td>
<td>${b.code}</td>
<td>${localStorage.getItem("role") === "Super Admin"?
`<button onclick="deleteBranch(${b.id})">Delete</button>`:"View Only"
}
</td>
</tr>
`;
});
}

function deleteBranch(id){
let role = localStorage.getItem("role");
if(role !== "Super Admin"){
    alert("Only Super Admin can delete branches");
    return;
}
branches = branches.filter((b)=>b.id !== id);
localStorage.setItem("branches",JSON.stringify(branches));
displayBranches();
}
displayBranches();