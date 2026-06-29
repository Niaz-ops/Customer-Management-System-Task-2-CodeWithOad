// ================= LOGIN CHECK =================


let currentPage =
window.location.pathname;



if(
localStorage.getItem("login") !== "true"
&&
!currentPage.includes("login.html")
){

window.location.href="login.html";

}



// ================= ROLE PERMISSION =================


let role =
localStorage.getItem("role");



function checkPermission(permission){


let permissions = {


"Super Admin":[

"add",
"edit",
"delete",
"installment",
"reports",
"print",
"branch",
"backup"

],



"Branch Manager":[

"add",
"edit",
"installment",
"reports",
"print"

]

};



if(!permissions[role]){

return false;

}



return permissions[role].includes(permission);


}