// ================= LOGOUT =================

function logout(){

    // remove login information
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    localStorage.removeItem("currentUser");

    // go to login page
    window.location.href="login.html";

}