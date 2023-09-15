const express = require('express');

const problemListRoutes = require('./routes/problem-list');
const allergiesListRoutes = require('./routes/allergies');
const intolleranceRoutes = require('./routes/intollerance');
const pregnancyRoutes = require('./routes/pregnancy');


const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/icpc2/problem-list', problemListRoutes);

app.use('/snomed/allergies', allergiesListRoutes);
app.use('/snomed/intollerances',intolleranceRoutes);
app.use('/snomed/pregnancy',pregnancyRoutes);

app.get('/', (req, res) => {
  res.send({msg : "Test endpoint for the icpc2 terminology service"});
});


app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});