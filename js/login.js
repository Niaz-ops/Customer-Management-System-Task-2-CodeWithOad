let users = JSON.parse(localStorage.getItem("users")) || [

{
email:"bihanoor444@gmail.com",
password:"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5",
role:"Super Admin",
attempts:0,
locked:false
},

{
email:"manager@gmail.com",
password:"03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4",
role:"Branch Manager",
attempts:0,
locked:false
}

];



localStorage.setItem(
"users",
JSON.stringify(users)
);



async function hashPassword(password){

let data =
new TextEncoder()
.encode(password);


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



async function login(){


let email  =
document.getElementById("username").value;


let password =
document.getElementById("password").value;



let users =
JSON.parse(
localStorage.getItem("users")
);



let user =
users.find(
u=>u.email===email
);



if(!user){

document.getElementById("error").innerText =
"User not found";

return;

}



if(user.locked){

alert(
"Account temporarily locked. Try again later"
);

return;

}



let hashedPassword =
await hashPassword(password);



if(user.password === hashedPassword){


user.attempts=0;


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


window.location.href="dashboard.html";


}

else{


user.attempts++;


if(user.attempts>=3){


user.locked=true;


alert(
"Account locked after 3 failed attempts"
);



setTimeout(()=>{


user.locked=false;
user.attempts=0;


localStorage.setItem(
"users",
JSON.stringify(users)
);


alert(
"Account unlocked. Try login again"
);


},5000);



}

else{


alert(
"Wrong password. Attempts left: "
+
(3-user.attempts)
);


}



localStorage.setItem(
"users",
JSON.stringify(users)
);


}

}