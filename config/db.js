const mongoose = require('mongoose');
const connectDB = async function (){
    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        // const conn = new Mongo().getDb(process.env.MONGODB_URL);
        console.log("Databse connected: " + conn.connection.host);
    } catch (error){
        console.log("Cannot connect to MongoDB");
        console.log(error);
    }
}
module.exports = connectDB;