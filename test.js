const {
    deDE_parseViews,
    en_parseViews,
    esES_parseViews,
    es419_parseViews,
    frFR_parseViews,
    itIT_parseViews,
    ptPT_parseViews,
    ptBR_parseViews,
    nlNL_parseViews,
    ruRU_parseViews,
    ukUA_parseViews,
} = require("./low-go");

function test_deDE_parseViews() {
    let testCases = {
        "213 Aufrufe": 213,
        "1519 Aufrufe": 1519,
        "108.325 Aufrufe": 108325,
        "4,3 Mio. Aufrufe": 4300000,
        "4,8 Mrd. Aufrufe": 4800000000,
    };
    for (let [input, expected] of Object.entries(testCases)) {
        let actual = deDE_parseViews(input);
        console.assert(actual === expected, `deDE_parseViews failed for ${input} (${expected} should be ${actual})`);
    }
}

function test_en_parseViews() {
    let testCases = {
        "213 views": 213,
        "1.5K views": 1500,
        "108K views": 108000,
        "4.3M views": 4300000,
        "4.8B views": 4800000000,
    };
    for (let [input, expected] of Object.entries(testCases)) {
        let actual = en_parseViews(input);
        console.assert(actual === expected, `en_parseViews failed for ${input} (${expected} should be ${actual})`);
    }
}

function test_esES_parseViews() {
    let testCases = {
        "213 visualizaciones": 213,
        "1,5 K visualizaciones": 1500,
        "108 K visualizaciones": 108000,
        "4,3 M de visualizaciones": 4300000,
        "4867 M de visualizaciones": 4867000000,
    };
    for (let [input, expected] of Object.entries(testCases)) {
        let actual = esES_parseViews(input);
        console.assert(actual === expected, `esES_parseViews failed for ${input} (${expected} should be ${actual})`);
    }
}

function test_es419_parseViews() {
    let testCases = {
        "213 vistas": 213,
        "1.5 K vistas": 1500,
        "108 k vistas": 108000,
        "4.3 M de vistas": 4300000,
        "4867 M de vistas": 4867000000,
    };
    for (let [input, expected] of Object.entries(testCases)) {
        let actual = es419_parseViews(input);
        console.assert(actual === expected, `es419_parseViews failed for ${input} (${expected} should be ${actual})`);
    }
}

function test_frFR_parseViews() {
    let testCases = {
        "213 vues": 213,
        "1,5 k vues": 1500,
        "108 k vues": 108000,
        "4,3 M de vues": 4300000,
        "4,8 Md de vues": 4800000000,
    };
    for (let [input, expected] of Object.entries(testCases)) {
        let actual = frFR_parseViews(input);
        console.assert(actual === expected, `frFR_parseViews failed for ${input} (${expected} should be ${actual})`);
    }
}

function test_itIT_parseViews() {
    let testCases = {
        "213 visualizzazioni": 213,
        "1519 visualizzazioni": 1519,
        "108.325 visualizzazioni": 108325,
        "4,3 Mln di visualizzazioni": 4300000,
        "4,8 Mrd di visualizzazioni": 4800000000,
    };
    for (let [input, expected] of Object.entries(testCases)) {
        let actual = itIT_parseViews(input);
        console.assert(actual === expected, `itIT_parseViews failed for ${input} (${expected} should be ${actual})`);
    }
}

function test_nlNL_parseViews() {
    let testCases = {
        "213 weergaven": 213,
        "1,5K weergaven": 1500,
        "108K weergaven": 108000,
        "4,3 mln. weergaven": 4300000,
        "4,8 mld. weergaven": 4800000000,
    };
    for (let [input, expected] of Object.entries(testCases)) {
        let actual = nlNL_parseViews(input);
        console.assert(actual === expected, `nlNL_parseViews failed for ${input} (${expected} should be ${actual})`);
    }
}

function test_ptPT_parseViews() {
    let testCases = {
        "213 visualizações": 213,
        "1,5 mil visualizações": 1500,
        "108 mil visualizações": 108000,
        "4,3 M de visualizações": 4300000,
        "4,8 mM de visualizações": 4800000000,
    };
    for (let [input, expected] of Object.entries(testCases)) {
        let actual = ptPT_parseViews(input);
        console.assert(actual === expected, `ptPT_parseViews failed for ${input} (${expected} should be ${actual})`);
    }
}

function test_ptBR_parseViews() {
    let testCases = {
        "213 visualizações": 213,
        "1,5 mil visualizações": 1500,
        "108 mil visualizações": 108000,
        "4,3 mi de visualizações": 4300000,
        "4,8 bi de visualizações": 4800000000,
    };
    for (let [input, expected] of Object.entries(testCases)) {
        let actual = ptBR_parseViews(input);
        console.assert(actual === expected, `ptBR_parseViews failed for ${input} (${expected} should be ${actual})`);
    }
}

function test_ruRU_parseViews() {
    let testCases = {
        "213 просмотров": 213,
        "1,5 тыс. просмотров": 1500,
        "108 тыс. просмотров": 108000,
        "4,3 млн просмотров": 4300000,
        "4,8 млрд просмотров": 4800000000,
    };
    for (let [input, expected] of Object.entries(testCases)) {
        let actual = ruRU_parseViews(input);
        console.assert(actual === expected, `ruRU_parseViews failed for ${input} (${expected} should be ${actual})`);
    }
}

function test_ukUA_parseViews() {
    let testCases = {
        "213 переглядів": 213,
        "1,5 тис. переглядів": 1500,
        "108 тис. переглядів": 108000,
        "4,3 млн переглядів": 4300000,
        "4,8 млрд переглядів": 4800000000,
    };
    for (let [input, expected] of Object.entries(testCases)) {
        let actual = ukUA_parseViews(input);
        console.assert(actual === expected, `ukUA_parseViews failed for ${input} (${expected} should be ${actual})`);
    }
}

function test() {
    test_deDE_parseViews();
    test_en_parseViews();
    test_esES_parseViews();
    test_es419_parseViews();
    test_frFR_parseViews();
    test_itIT_parseViews();
    test_nlNL_parseViews();
    test_ptPT_parseViews();
    test_ptBR_parseViews();
    test_ruRU_parseViews();
    test_ukUA_parseViews();
}

test();
