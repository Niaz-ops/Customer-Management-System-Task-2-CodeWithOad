function addHistory(action, details){


let history =
JSON.parse(localStorage.getItem("history"))
|| [];



let record = {


id: Date.now(),


action: action,


details: details,



user:
localStorage.getItem("currentUser")
||
"Unknown",



role:
localStorage.getItem("role")
||
"Guest",



date:
new Date().toLocaleString()



};



history.push(record);



localStorage.setItem(
"history",
JSON.stringify(history)
);



}