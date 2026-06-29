/* ================= LOGIN SYSTEM ================= */



let defaultUsers = [

{

email:"bihanoor444@gmail.com",

password:
"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5",

role:"Super Admin",

attempts:0,

locked:false,

lastLogin:null

},



{

email:"manager@gmail.com",

password:
"03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",

role:"Branch Manager",

attempts:0,

locked:false,

lastLogin:null

}


];





let users =
JSON.parse(localStorage.getItem("users"));



if(!users){


localStorage.setItem(
"users",
JSON.stringify(defaultUsers)
);


}







async function hashPassword(password){


let data =
new TextEncoder().encode(password);



let hash =
await crypto.subtle.digest(
"SHA-256",
data
);



return Array.from(
new Uint8Array(hash)
)

.map(
b=>b.toString(16).padStart(2,"0")
)

.join("");

}





function togglePassword(){


let pass =
document.getElementById("password");



if(pass.type==="password")

pass.type="text";


else

pass.type="password";


}









async function login(){



let email =
document.getElementById("username")
.value.trim();



let password =
document.getElementById("password")
.value.trim();





let error =
document.getElementById("error");



error.innerHTML="";




if(email==="" || password===""){


error.innerHTML =
"Please enter email and password";


return;

}





let users =
JSON.parse(
localStorage.getItem("users")
);



let user =
users.find(
u=>u.email===email
);





if(!user){


error.innerHTML =
"Account not found";


return;


}







if(user.locked){


error.innerHTML =
"Account temporarily locked";


return;


}







let hashed =
await hashPassword(password);






if(user.password===hashed){



user.attempts=0;


user.lastLogin =
new Date()
.toLocaleString();




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
user.email
);




localStorage.setItem(
"users",
JSON.stringify(users)
);





// Login history


let history =
JSON.parse(
localStorage.getItem("history")
)||[];




history.push({

action:"Login",

user:user.email,

role:user.role,

details:"Successful login",

date:new Date()
.toLocaleString()

});



localStorage.setItem(
"history",
JSON.stringify(history)
);






window.location.href=
"dashboard.html";




}

else{



user.attempts++;





if(user.attempts>=3){


user.locked=true;


error.innerHTML=
"Account locked after 3 attempts";


setTimeout(()=>{


user.locked=false;

user.attempts=0;


localStorage.setItem(
"users",
JSON.stringify(users)
);


},5000);


}

else{


error.innerHTML=

"Wrong password. Attempts left: "
+
(3-user.attempts);


}



localStorage.setItem(
"users",
JSON.stringify(users)
);



}


}
function togglePassword(){

let password =
document.getElementById("password");


if(password.type==="password"){

password.type="text";

}
else{

password.type="password";

}

}