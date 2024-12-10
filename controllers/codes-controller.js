const csv = require('csvtojson');

async function getAll(req,res) {
  let pregnancyList;

  let csvPregFile = await fetch("https://raw.githubusercontent.com/Gravitate-Health/terminology-service/main/controllers/db/codes.csv")
    .then(response => response.text())
    .then(text => text);

  let csvSynonymsFile = await fetch("https://raw.githubusercontent.com/Gravitate-Health/terminology-service/main/controllers/db/synonyms.csv")
    .then(response => response.text())
    .then(text => text);

  csv().fromString(csvPregFile).then((list)=>{
    console.log(list)
    pregnancyList = list;
  });

  csv().fromString(csvSynonymsFile).then((list)=>{
    console.log(list)
    let result = [];
    result = pregnancyList;
    pregnancyList.forEach((pregnancyCode) => {
      let synonyms = list.filter((synonym) => {
        return (synonym.source_system == pregnancyCode.codesystem && synonym.source_code == pregnancyCode.code);
      });
      
      if(synonyms.length > 0) {
        synonyms.forEach((synonym) => {
          linkedTerm = pregnancyList.filter((pregnancyCode) => {
            return (pregnancyCode.codesystem == synonym.source_system && pregnancyCode.code == synonym.source_code);
          })
          result.push({
            codesystem: synonym.target_system,
            code: synonym.target_code,
            descr_en: synonym.target_description_en,
            descr_es: synonym.target_description_es,
            synonym_of: {
              codesystem: synonym.source_system,
              code: synonym.source_code,
              descr_en: linkedTerm[0].descr_en,
              descr_es: linkedTerm[0].descr_es
            }
          });
        });
      }
    });

    res.status(200).json(result);
  });
}
module.exports = {
  getAll
}