const csv = require('csvtojson');
const csvFilePath = './controllers/db/Simplification.csv';

function getAll(req,res) {

  csv().fromFile(csvFilePath).then((list)=>{
    console.log(list)
    return res.status(200).send(list);
  });
}
module.exports = {
  getAll
}