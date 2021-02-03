const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');



// Configuring the database
const dbConfig = require('./app/configs/database.config.js');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())



mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
const menuRouter = require("./app/routes/routes.menu");
app.use('/menu', menuRouter)

const sousmenuRouter = require('./app/routes/routes.sousmenu')
app.use('/sousmenu', sousmenuRouter);

const suppRouter = require('./app/routes/routes.supp');
app.use('/supp', suppRouter)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})