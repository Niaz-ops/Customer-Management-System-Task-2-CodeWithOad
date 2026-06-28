function toggleSidebar(){
let sidebar=document.querySelector(".sidebar");
sidebar.classList.toggle("active");
}

function openSidebar(){

document
.getElementById("sidebar")
.classList.add("active");

}



function closeSidebar(){

document
.getElementById("sidebar")
.classList.remove("active");

}