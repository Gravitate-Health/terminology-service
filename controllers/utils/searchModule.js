const stringSimilarity = require("string-similarity");

function searchLeaflet(title,entries ) {
    let res = {value: null, bestSimilarity: 0.0};
    entries.forEach(entry => {
        let similarity = stringSimilarity.compareTwoStrings(title, entry.resource.entry[0].resource.title);
        if(res.bestSimilarity < similarity){
            res.value = entry.resource.entry[0].resource;
            res.bestSimilarity = similarity;
        }
    });
    if(res.bestSimilarity > 0){
        return res.value;
    }
    else {
        return null;
    }
}

module.exports = {
    searchLeaflet
}