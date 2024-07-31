const csv = require('csvtojson');
const csvFilePath = './controllers/db/pregnancy.csv';

function getAll(req,res) {

  csv().fromFile(csvFilePath).then((list)=>{
    console.log(list)
    return res.status(200).send(list);
  });
}
module.exports = {
  getAll
}