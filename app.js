const express = require('express');

const problemListRoutes = require('./routes/problem-list');
const vihRoutes = require('./routes/vih');
const allergiesListRoutes = require('./routes/allergies');
const intolleranceRoutes = require('./routes/intollerance');
const pregnancyRoutes = require('./routes/pregnancy');
const diabetesRoutes = require('./routes/diabetes');
const medicationInteractionRoutes = require('./routes/medication-interaction');



const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



app.use('/snomed/pregnancy',pregnancyRoutes);


app.get('/', (req, res) => {
  res.send({msg : "Test endpoint for the terminology service"});
});


app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});