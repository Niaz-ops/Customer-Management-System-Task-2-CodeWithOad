function login(){
let username = document.getElementById("username").value;
let password = document.getElementById("password").value;
if(username === "admin" && password === "12345"){
    localStorage.setItem("login", "true");
    window.location.href = "dashboard.html";
}else{
    document.getElementById("error").innerText = "Invalid username or password";
}
}