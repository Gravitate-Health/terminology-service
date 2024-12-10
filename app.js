const express = require('express');

const pregnancyRoutes = require('./routes/pregnancy');



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