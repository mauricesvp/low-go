// All recommended videos with less than <LIMIT> views will be removed.
// This limit can be changed in the extension settings.
let LIMIT = 100;
let START_ON_ANY_SUBDOMAIN = true;
let RATE_LIMIT = 100; // minimum delay between calls in ms
let parse_views;
let last = +new Date();

let supported_languages = {
    "de-DE": deDE_parseViews,
    en: en_parseViews,
    "en-GB": en_parseViews,
    "es-ES": esES_parseViews,
    "es-419": es419_parseViews,
    "es-US": es419_parseViews,
    "fr-FR": frFR_parseViews,
    "it-IT": itIT_parseViews,
    "nl-NL": nlNL_parseViews,
    "pt-BR": ptBR_parseViews,
    "pt-PT": ptPT_parseViews,
    "ru-RU": ruRU_parseViews,
    "uk-UA": ukUA_parseViews,
};

function checkURL() {
    let url = window.location.href;
    if (url === "https://www.youtube.com/") return true;
    if (url.startsWith("https://www.youtube.com/watch?")) return true;
    return false;
}

function removeVideosFromElement() {
    if (START_ON_ANY_SUBDOMAIN && !checkURL()) return;
    const now = +new Date();
    if (now - last <= RATE_LIMIT) return;
    last = now;

    node = document.body;
    let elements = Array.prototype.slice.call(node.getElementsByTagName("ytd-rich-item-renderer"), 0);
    let elements_ = Array.prototype.slice.call(node.getElementsByTagName("ytd-compact-video-renderer"), 0);
    let allElements = elements.concat(elements_);
    for (let i = 0; i < allElements.length; i++) {
        let views = allElements[i].getElementsByClassName("inline-metadata-item style-scope ytd-video-meta-block")[0];

        let viewCountVideo;
        if (views) {
            viewCountVideo = parse_views(views.innerText);
            if (viewCountVideo >= LIMIT) {
                continue;
            }
        } else {
            continue;
        }

        let title = allElements[i].querySelector("yt-formatted-string#video-title");
        if (title === null) {
            title = allElements[i].querySelector("span#video-title");
        }
        console.log("(Low-Go) Removing: " + title.innerText.trim() + " (" + viewCountVideo + " views).");
        allElements[i].parentNode.removeChild(allElements[i]);
    }
}

// Language specific view count parsing functions.

function deDE_parseViews(views) {
    views = views.replace(" Aufrufe", "");
    views = views.replace(".", "");
    let factor = 1;
    if (views.includes("Mio")) {
        views = views.replace(" Mio", "");
        views = views.replace(",", ".");
        factor = 1000000;
    } else if (views.includes("Mrd")) {
        views = views.replace(" Mrd", "");
        views = views.replace(",", ".");
        factor = 1000000000;
    }
    return parseFloat(views) * factor;
}

function en_parseViews(views) {
    views = views.replace(" views", "");
    let factor = 1;
    if (views.includes("K")) {
        views = views.replace("K", "");
        factor = 1000;
    } else if (views.includes("M")) {
        views = views.replace("M", "");
        factor = 1000000;
    } else if (views.includes("B")) {
        views = views.replace("B", "");
        factor = 1000000000;
    }
    return parseFloat(views) * factor;
}

function es419_parseViews(views) {
    views = views.replace(" vistas", "");
    let factor = 1;
    if (views.includes(" k") || views.includes(" K")) {
        views = views.replace(" k", "");
        views = views.replace(" K", "");
        factor = 1000;
    } else if (views.includes(" M de")) {
        views = views.replace(" M de", "");
        factor = 1000000;
    }
    return parseFloat(views) * factor;
}

function esES_parseViews(views) {
    views = views.replace(" visualizaciones", "");
    views = views.replace(",", ".");
    let factor = 1;
    if (views.includes(" K")) {
        views = views.replace(" K", "");
        factor = 1000;
    } else if (views.includes(" M de")) {
        views = views.replace(" M de", "");
        factor = 1000000;
    }
    return parseFloat(views) * factor;
}

function frFR_parseViews(views) {
    views = views.replace(" vues", "");
    let factor = 1;
    if (views.includes(" k")) {
        views = views.replace(" k", "");
        factor = 1000;
    } else if (views.includes(" M de")) {
        views = views.replace(" M de", "");
        factor = 1000000;
    } else if (views.includes(" Md de")) {
        views = views.replace(" Md de", "");
        factor = 1000000000;
    }
    views = views.replace(",", ".");
    return parseFloat(views) * factor;
}

function itIT_parseViews(views) {
    views = views.replace(" visualizzazioni", "");
    views = views.replace(".", "");
    views = views.replace(",", ".");
    let factor = 1;
    if (views.includes(" Mln di")) {
        views = views.replace(" Mln di", "");
        factor = 1000000;
    } else if (views.includes(" Mrd di")) {
        views = views.replace(" Mrd di", "");
        factor = 1000000000;
    }
    return parseFloat(views) * factor;
}

function nlNL_parseViews(views) {
    views = views.replace(" weergaven", "");
    let factor = 1;
    if (views.includes("K")) {
        views = views.replace("K", "");
        factor = 1000;
    } else if (views.includes(" mln.")) {
        views = views.replace(" mln.", "");
        factor = 1000000;
    } else if (views.includes(" mld.")) {
        views = views.replace(" mld.", "");
        factor = 1000000000;
    }
    views = views.replace(",", ".");
    return parseFloat(views) * factor;
}

function ptBR_parseViews(views) {
    views = views.replace(" visualizações", "");
    views = views.replace(".", "");
    views = views.replace(",", ".");
    let factor = 1;
    if (views.includes(" mil")) {
        views = views.replace(" mil", "");
        factor = 1000;
    } else if (views.includes(" mi de")) {
        views = views.replace(" mi de", "");
        factor = 1000000;
    } else if (views.includes(" bi de")) {
        views = views.replace(" bi de", "");
        factor = 1000000000;
    }
    return parseFloat(views) * factor;
}

function ptPT_parseViews(views) {
    views = views.replace(" visualizações", "");
    views = views.replace(".", "");
    views = views.replace(",", ".");
    let factor = 1;
    if (views.includes(" mil")) {
        views = views.replace(" mil", "");
        factor = 1000;
    } else if (views.includes(" M de")) {
        views = views.replace(" M de", "");
        factor = 1000000;
    } else if (views.includes(" mM de")) {
        views = views.replace(" mM de", "");
        factor = 1000000000;
    }
    return parseFloat(views) * factor;
}

function ruRU_parseViews(views) {
    views = views.replace(" просмотров", "");
    views = views.replace(".", "");
    views = views.replace(",", ".");
    let factor = 1;
    if (views.includes("тыс")) {
        views = views.replace("тыс", "");
        factor = 1000;
    } else if (views.includes("млн")) {
        views = views.replace("млн", "");
        factor = 1000000;
    } else if (views.includes("млрд")) {
        views = views.replace("млрд", "");
        factor = 1000000000;
    }
    return parseFloat(views) * factor;
}

function ukUA_parseViews(views) {
    views = views.replace(" переглядів", "");
    views = views.replace(".", "");
    views = views.replace(",", ".");
    let factor = 1;
    if (views.includes("тис")) {
        views = views.replace("тис", "");
        factor = 1000;
    } else if (views.includes("млн")) {
        views = views.replace("млн", "");
        factor = 1000000;
    } else if (views.includes("млрд")) {
        views = views.replace("млрд", "");
        factor = 1000000000;
    }
    return parseFloat(views) * factor;
}

// ------------------------------

function main() {
    if (typeof window === "undefined") {
        return;
    }
    let viewCount = browser.storage.local.get("viewCount");
    viewCount.then((res) => {
        if (res.viewCount === undefined) {
            return;
        }
        LIMIT = res.viewCount;
    });

    let startOnAnySubdomain = browser.storage.local.get("startOnAnySubdomain");
    startOnAnySubdomain.then((res) => {
        if (res.startOnAnySubdomain === undefined) {
            return;
        }
        START_ON_ANY_SUBDOMAIN = res.startOnAnySubdomain;
    });

    let lang = document.documentElement.lang;
    parse_views = supported_languages[lang];

    if (parse_views === undefined) {
        throw new Error("Language '" + lang + "' not supported.");
    }

    const config = { attributes: false, childList: true, subtree: true };
    let observer = new MutationObserver(removeVideosFromElement);

    document.body.addEventListener("yt-navigate-finish", () => {
        observer.disconnect();
        if (!START_ON_ANY_SUBDOMAIN && !checkURL()) return;
        observer.observe(document.body, config);
    });
}

main();

if (typeof window === "undefined") {
    module.exports = {
        deDE_parseViews,
        en_parseViews,
        es419_parseViews,
        esES_parseViews,
        frFR_parseViews,
        itIT_parseViews,
        nlNL_parseViews,
        ptBR_parseViews,
        ptPT_parseViews,
        ruRU_parseViews,
        ukUA_parseViews,
    };
}
