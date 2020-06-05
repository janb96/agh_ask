let mongoose = require('mongoose');

const Temperature = new mongoose.Schema({
    temperature: {
        type: Object,
        required: true
    },
    dateOfTemperature: {
        type: Date,
        required: true
    }
});

mongoose.model('Temperature', Temperature);

module.exports = mongoose.model('Temperature');