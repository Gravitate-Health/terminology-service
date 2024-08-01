const csv = require('csvtojson');
const csvFilePath = './controllers/db/pregnancy.csv';
const csvSynonymsFilePath = './controllers/db/synonyms.csv';

function getAll(req,res) {
  let pregnancyList;

  csv().fromFile(csvFilePath).then((list)=>{
    console.log(list)
    pregnancyList = list;
  });

  csv().fromFile(csvSynonymsFilePath).then((list)=>{
    console.log(list)
    let result = [];
    result = pregnancyList;
    pregnancyList.forEach((pregnancyCode) => {
      let synonyms = list.filter((synonym) => {
        return (synonym.source_system == pregnancyCode.codesystem && synonym.source_code == pregnancyCode.code);
      });
      
      if(synonyms.length > 0) {
        synonyms.forEach((synonym) => {
          result.push({
            codesystem: synonym.target_system,
            code: synonym.target_code,
            desc_en: synonym.target_description_en,
            desc_es: synonym.target_description_es
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