import mongoose = require('mongoose');

export const ExpenseSchema: mongoose.Schema = new mongoose.Schema({
    email: {type: String, ref: 'users', required: true},
    value: {type: Number, required: true}, 
    type: {type: String, required: true}, // => housing, grocery, dineout, transportation, childcare, petcare, health, debtpay, entertainment, cellphonewifi, membership, travel
    comment: {type: String}, 
    idDeleted: {type: Boolean, default: false},
    createdBy: {type: String, required: true, default: 'user'}, // => user, system
    createdAt: {type: Date, default: new Date()},
    updatedAt: {type: Date, default: new Date()}
});