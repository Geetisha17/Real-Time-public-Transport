const mongoose = require('mongoose');

const connnectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongo connected');
    } catch (error) {
        console.log('Cannot connect to mongoDb ',error.message);
    }
}

module.exports = connnectDb;