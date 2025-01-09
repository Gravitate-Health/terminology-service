const papa = require('papaparse');

async function getAll(req,res) {
  let codesList = [];

  let codesResponse = await fetch("https://raw.githubusercontent.com/Gravitate-Health/terminology-service/main/controllers/db/codes.csv")

  let csvCodesFile = await codesResponse.text();

  let synonymResponse = await fetch("https://raw.githubusercontent.com/Gravitate-Health/terminology-service/main/controllers/db/synonyms.csv")

  let csvSynonymsFile = await synonymResponse.text();

  codesList = papa.parse(csvCodesFile, {header: true, skipEmptyLines: true}).data;
  
  let synonymsList = papa.parse(csvSynonymsFile, {header: true, skipEmptyLines: true}).data;

  let result = codesList.map((term) => {
    let synonyms = synonymsList.filter((synonym) => synonym.source_system === term.codesystem && synonym.source_code === term.code);

    if (synonyms.length === 0) {
      return term;
    }

    return {
      ...term,
      synonyms
    }
  });

  res.status(200).send(result);
}
module.exports = {
  getAll
}