const mongoose = require('mongoose');

const connnectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongo connected');
    } catch (error) {
        console.log('Count not connect to mongoDb');
    }
}

module.exports = connnectDb;