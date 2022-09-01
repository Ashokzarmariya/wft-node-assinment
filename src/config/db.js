require("dotenv").config();
const mongoose = require("mongoose")

const dataBase = process.env.MONGODB_ATLAST;

const connect = () => {
 
 return mongoose.connect("mongodb+srv://ashokzarmariya:Priyanshi5254@cluster0.ex5hlxv.mongodb.net/?retryWrites=true&w=majority");
 
}

module.exports = connect; 

//mongodb+srv://ashokzarmariya:Priyanshi5254@cluster0.ex5hlxv.mongodb.net/?retryWrites=true&w=majority