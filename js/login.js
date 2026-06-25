let users = JSON.parse(localStorage.getItem("users")) || [

{
username:"admin",
password:btoa("12345"),
role:"Super Admin",
attempts:0,
lockedUntil:0
},

{
username:"manager",
password:btoa("1234"),
role:"Branch Manager",
attempts:0,
lockedUntil:0
}

];

localStorage.setItem("users", JSON.stringify(users));

function login(){
let username = document.getElementById("username").value;
let password = document.getElementById("password").value;
let users = JSON.parse(localStorage.getItem("users"));
let user = users.find(u => u.username === username);

if(!user){

document.getElementById("error").innerText =
"User not found";

clearLoginFields();

return;

}
if(user.lockedUntil && Date.now() < user.lockedUntil){

let remainingTime =
Math.ceil((user.lockedUntil - Date.now()) / 1000);

document.getElementById("error").innerText =
"Account locked. Try again after " 
+ remainingTime + " seconds";

clearLoginFields();

return;

}
if(user.password === btoa(password)){
user.attempts = 0;
user.lockedUntil = 0;
localStorage.setItem(
"login",
"true"
);

localStorage.setItem(
"role",
user.role
);

localStorage.setItem(
"currentUser",
user.username
);


localStorage.setItem(
"users",
JSON.stringify(users)
);

window.location.href="dashboard.html";

}
else{
user.attempts++;
if(user.attempts >= 3){
user.lockedUntil =
Date.now() + 5000;

user.attempts = 0;

document.getElementById("error").innerText =
"Too many attempts. Account locked for 5 seconds";

}
else{

document.getElementById("error").innerText =
"Wrong username and password. Attempts left: "
+
(3-user.attempts);

}

localStorage.setItem(
"users",
JSON.stringify(users)
);
clearLoginFields();
}

}

function clearLoginFields(){

document.getElementById("username").value="";
document.getElementById("password").value="";

}

window.onload = function(){
document.getElementById("username").value="";
document.getElementById("password").value="";

};