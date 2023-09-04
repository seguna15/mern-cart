const mongoose = require('mongoose');

const dbConnection = async () => {
    const connectionString = process.env.MONGOBD_URL;
    try {
        await mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        console.log('db connected')
    } catch (error) {
        console.log('db could not connect', error.message);
        process.exit(1);
    }
    
}

module.exports = dbConnection;

