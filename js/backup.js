function backupData(){
let backup = {
customers:
JSON.parse(localStorage.getItem("customers")) || [],
branches:
JSON.parse(localStorage.getItem("branches")) || [],
history:
JSON.parse(localStorage.getItem("history")) || [],
users:
JSON.parse(localStorage.getItem("users")) || []

};

let data =
JSON.stringify(backup,null,2);

let blob =
new Blob(
[data],
{
type:"application/json"
}
);

let link =
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
"CMS_Backup.json";

link.click();
alert("Backup downloaded successfully");

}
function restoreData(){
let file =
document.getElementById("restoreFile").files[0];

if(!file){
alert("Please select backup file");
return;

}

let reader =
new FileReader();

reader.onload=function(e){
let data =
JSON.parse(e.target.result);
localStorage.setItem(
"customers",
JSON.stringify(data.customers)
);
localStorage.setItem(
"branches",
JSON.stringify(data.branches)
);
localStorage.setItem(
"history",
JSON.stringify(data.history)
);


localStorage.setItem(
"users",
JSON.stringify(data.users)
);
document.getElementById("message").innerText =
"Data restored successfully";
};
reader.readAsText(file);
}