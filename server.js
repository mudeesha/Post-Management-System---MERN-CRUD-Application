const express = require('express');
const mongoose = require('mongoose');
//convert json data to javascript object for server
const bodyParser = require('body-parser');
//to avoid cores error(when useing two ports by frontend and backend this error will occour)
const cors = require('cors');

const app = express();

//import routs
const postRouts = require('./routes/posts');

//app midelware
app.use(bodyParser.json());
app.use(cors());

//route midelware
app.use(postRouts);

//declare port to run application
const PORT = 8000;
const DB_URL = 'mongodb+srv://mudeesha:mudee6077@merncrud.zxcnfck.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB_URL)
.then(() => {
    console.log('Db connected');
})
.catch((err)=>console.log('DB connection error', err));

//listen application
app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
});