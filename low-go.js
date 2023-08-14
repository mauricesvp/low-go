// All recommended videos with less than <LIMIT> views will be removed.
// This limit can be changed in the extension settings.
let LIMIT = 100;

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
};

let parse_views;
let viewCount;
let observer;
const config = { attributes: false, childList: true, subtree: false };

function removeVideosFromElement(node) {
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
        console.log("(Low-Go) Removing: " + title.innerText + " (" + viewCountVideo + " views).");
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

// ------------------------------

function observerCallback(mutationList, observer) {
    removeVideosFromElement(mutationList[0].target);
}

function addObservers() {
    let recommendedVideos = document.querySelector("div#primary ytd-rich-grid-renderer div#contents");
    let relatedVideos = document.querySelector("div#related div#contents");
    if (relatedVideos) {
        observer.observe(relatedVideos, config);
        return;
    } else if (recommendedVideos) {
        observer.observe(recommendedVideos, config);
        return;
    }
    window.setTimeout(addObservers, 200);
}

function main() {
    if (typeof window === "undefined") {
        return;
    }
    viewCount = browser.storage.local.get("viewCount");
    viewCount.then((res) => {
        if (res.viewCount === undefined) {
            return;
        }
        LIMIT = res.viewCount;
    });

    let lang = document.documentElement.lang;
    parse_views = supported_languages[lang];

    if (parse_views === undefined) {
        throw new Error("Language '" + lang + "' not supported.");
    }
    observer = new MutationObserver(observerCallback);

    addObservers();
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
    };
}
