const express = require('express');

const problemListRoutes = require('./routes/problem-list');
const allergiesListRoutes = require('./routes/allergies');
const intolleranceRoutes = require('./routes/intollerance');


const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/problem-list', problemListRoutes);
app.use('/allergies', allergiesListRoutes);
app.use('/intollerances',intolleranceRoutes);

app.get('/', (req, res) => {
  res.send({msg : "Test endpoint for the icpc2 terminology service"});
});


app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});