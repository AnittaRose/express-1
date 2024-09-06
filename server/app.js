const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('../client'));
app.use(express.json());

async function mongoconnect(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database connection established...");
    }catch (error) {
        console.log("database connection error:",error)
    }
}

let users = new mongoose.Schema({
    name: String,
    email:String,
    // age:Number,
    password:String,
});

app.get('/test',
    (req,res,next)=> {
        console.log("first middelware");
        next();
    },
    (req,res,next)=> {
        console.log("second middelware");
        next();
    },
    (req,res,next)=>{
        console.log("Third middelware");
        res.status(200).send("success");
    }
)
app.post('/submit',(req,res)=>
{
    let body = req.body;
    console.log("body :",body);
})

app.listen(process.env.PORT,() =>{
    console.log(`server running at http://localhost:${process.env.PORT}`);
})