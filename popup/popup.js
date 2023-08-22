if (typeof browser === "undefined") {
    throw new Error("browser is undefined");
}

function saveOptions(e) {
    let value = document.querySelector("#viewCount").value;
    if (value === "" || /\D/.test(value) || value < 0) {
        return;
    }
    browser.storage.local.set({
        viewCount: value,
    });
    document.querySelector(".label").innerText = "Current Limit: <" + value;
    e.preventDefault();
}

function restoreOptions() {
    let gettingItem = browser.storage.local.get("viewCount");
    gettingItem.then((res) => {
        document.querySelector("#viewCount").value = res.viewCount || 100;
        document.querySelector(".label").innerText = "Current Limit: <" + res.viewCount || 100;
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
