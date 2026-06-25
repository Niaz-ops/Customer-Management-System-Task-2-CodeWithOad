let role = localStorage.getItem("role");
function checkPermission(permission){

let permissions = {
"Super Admin":[
"add",
"edit",
"delete",
"installment",
"reports",
"print"
],

"Branch Manager":[
"add",
"edit",
"installment",
"reports",
"print"
]

};

if(
!permissions[role] ||
!permissions[role].includes(permission)
){
return false;
}

return true;

}