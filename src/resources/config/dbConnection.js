const mongoose = require('mongoose');

// Connect to MongoDB
const connectDb = async () =>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected : ", connect.connection.host,"DB name : ", connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDb;