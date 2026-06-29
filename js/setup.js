document.addEventListener("DOMContentLoaded", function(){


    let userRole =
    document.getElementById("userRole");


    let role =
    localStorage.getItem("role");


    if(userRole && role){

        userRole.innerText = role;

    }


});