const mongoose = require('mongoose');
const config = require('config');
module.exports = async() => {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected........');
    } catch (e) {
        console.log(e);
        console.log('Refused to Connect');
    }
};