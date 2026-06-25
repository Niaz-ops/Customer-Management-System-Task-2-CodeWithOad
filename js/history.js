function addHistory(action, details){
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let record = {
        id: "TRANS-" + Date.now(),
        user: localStorage.getItem("currentUser") || "Unknown",
        role: localStorage.getItem("role") || "Unknown",
        action: action,
        details: details,
        dateTime: new Date().toLocaleString()
    };
    history.push(record);
    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );
}
