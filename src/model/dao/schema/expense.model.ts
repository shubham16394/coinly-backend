import mongoose = require('mongoose');
import moment from 'moment-timezone';

export const ExpenseSchema: mongoose.Schema = new mongoose.Schema({
    email: {type: String, ref: 'users', required: true},
    value: {type: Number, required: true}, 
    type: {type: String, required: true}, // => housing, grocery, dineout, transportation, childcare, petcare, health, debtpay, entertainment, cellphonewifi, membership, travel
    comment: {type: String}, 
    idDeleted: {type: Boolean, default: false},
    createdBy: {type: String, required: true, default: 'user'}, // => user, system
    createdAt: {type: Date, default: moment.tz(new Date(), 'Asia/Kolkata').toDate()},
    updatedAt: {type: Date, default: moment.tz(new Date(), 'Asia/Kolkata').toDate()}
});