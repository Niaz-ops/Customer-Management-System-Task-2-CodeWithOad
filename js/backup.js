// ================= BACKUP SYSTEM =================


function backupData(){


let role = localStorage.getItem("role");


if(role !== "Super Admin"){

alert(
"Only Super Admin can create backup"
);

return;

}



let backup = {


backupDate:
new Date().toLocaleString(),


customers:
JSON.parse(
localStorage.getItem("customers")
) || [],


branches:
JSON.parse(
localStorage.getItem("branches")
) || [],


history:
JSON.parse(
localStorage.getItem("history")
) || [],


users:
JSON.parse(
localStorage.getItem("users")
) || [],


serialNumber:
JSON.parse(
localStorage.getItem("serialNumber")
) || 1



};



let data =
JSON.stringify(
backup,
null,
2
);



let blob =
new Blob(
[data],
{
type:"application/json"
}
);



let url =
URL.createObjectURL(blob);



let link =
document.createElement("a");


link.href=url;


link.download =
"CMS_Backup_"+Date.now()+".json";


link.click();



URL.revokeObjectURL(url);



showMessage(
"Backup downloaded successfully"
);



addHistory(
"Backup Created",
"System data backup generated"
);



}




// ================= RESTORE DATA =================


function restoreData(){


let role =
localStorage.getItem("role");



if(role !== "Super Admin"){


alert(
"Only Super Admin can restore data"
);


return;


}



let file =
document.getElementById(
"restoreFile"
).files[0];



if(!file){


alert(
"Please select backup file"
);


return;


}



let reader =
new FileReader();



reader.onload=function(e){


try{


let data =
JSON.parse(
e.target.result
);



if(!data.customers){


alert(
"Invalid backup file"
);

return;

}



localStorage.setItem(
"customers",
JSON.stringify(data.customers)
);



localStorage.setItem(
"branches",
JSON.stringify(data.branches || [])
);



localStorage.setItem(
"history",
JSON.stringify(data.history || [])
);



localStorage.setItem(
"users",
JSON.stringify(data.users || [])
);



localStorage.setItem(
"serialNumber",
JSON.stringify(
data.serialNumber || 1
)
);



showMessage(
"Data restored successfully. Refresh page."
);



addHistory(
"Backup Restored",
"System data restored"
);



}
catch(error){


alert(
"Invalid backup file format"
);


}


};



reader.readAsText(file);


}




// ================= MESSAGE =================


function showMessage(text){


let msg =
document.getElementById(
"message"
);


if(msg){

msg.innerText=text;

}


}