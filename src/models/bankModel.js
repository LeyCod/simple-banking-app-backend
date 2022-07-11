const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    fistname: String,
    lastname: String,
    age: Number,
    balance: Number,
});

const Bank = mongoose.model('account', accountSchema);

exports.Bank = Bank;