const express =  require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(json());

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(() => {
    console.log("Database connected");
}).catch(err => console.log(err));

app.get('/', (req, res) => {
    res.json({"message": "Dhananjay Brahmane"});
})

// 
// require notes routes
require('./apps/routes/notes.routes')(app)
// 

app.listen(8000, ()=> {
    console.log("listening to the server");
})