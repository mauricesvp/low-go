if (typeof browser === "undefined") {
    throw new Error("browser is undefined");
}

function saveValue(e) {
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

function saveStart(e) {
    let valueStartOnAnySubdomain = document.getElementById("startOnAnySubdomain").checked;
    if (valueStartOnAnySubdomain === undefined) {
        return;
    }
    browser.storage.local.set({
        startOnAnySubdomain: valueStartOnAnySubdomain,
    });
    e.preventDefault();
}

function restoreOptions() {
    let getViewCount = browser.storage.local.get("viewCount");
    getViewCount.then((res) => {
        document.querySelector("#viewCount").value = res.viewCount || 100;
        document.querySelector(".label").innerText = "Current Limit: <" + res.viewCount || 100;
    });
    let getStartOnAnySubdomain = browser.storage.local.get("startOnAnySubdomain");
    getStartOnAnySubdomain.then((res) => {
        if (res.startOnAnySubdomain === undefined) {
            document.querySelector("#startOnAnySubdomain").checked = true;
            return;
        }
        document.querySelector("#startOnAnySubdomain").checked = res.startOnAnySubdomain;
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveValue);
document.querySelector("input[name=startOnAnySubdomain]").addEventListener("change", saveStart);
