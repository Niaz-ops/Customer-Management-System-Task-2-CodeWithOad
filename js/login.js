let users = [
    {
        username:"admin",
        password:"12345",
        role:"Super Admin"
    },
    {
        username:"manager",
        password:"1234",
        role:"Branch Manager"
    }
];

function login(){
let username = document.getElementById("username").value;
let password = document.getElementById("password").value;
let user = users.find(u =>
    u.username === username &&
    u.password === password
);
if(user){
    localStorage.setItem("login","true");
    localStorage.setItem("role", user.role);
    window.location.href="dashboard.html";
}else{
document.getElementById("error").innerText ="Invalid username or password";
}
}