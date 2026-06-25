function addHistory(action, details){

let history =
JSON.parse(localStorage.getItem("history")) || [];


history.push({

id: Date.now(),

user: localStorage.getItem("currentUser") || "Unknown",

role: localStorage.getItem("role") || "-",

action: action,

details: details,

date: new Date().toLocaleString()

});


localStorage.setItem(
"history",
JSON.stringify(history)
);

}