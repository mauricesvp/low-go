function saveOptions(e) {
    browser.storage.local.set({
        viewCount: document.querySelector("#viewCount").value,
    });
    e.preventDefault();
}

function restoreOptions() {
    let gettingItem = browser.storage.local.get("viewCount");
    gettingItem.then((res) => {
        document.querySelector("#viewCount").value = res.viewCount || 100;
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
