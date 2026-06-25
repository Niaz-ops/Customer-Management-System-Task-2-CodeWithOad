function logout(){

localStorage.removeItem("login");
localStorage.removeItem("role");
localStorage.removeItem("currentUser");
window.location.href="login.html";

}

if(localStorage.getItem("login") !== "true"){
    window.location.href="login.html";
}