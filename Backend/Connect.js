const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const Mongo = process.env.MONGODB_URI;

const connectdb = async()=>{
    const conn = await mongoose.connect(Mongo).then(()=>{
        console.log('mongodb connected')
    }).catch((error)=>{
        console.log(error);
    })
    }

module.exports = connectdb;    