import mongoose = require('mongoose');
import moment from 'moment-timezone';

export const BudgetSchema: mongoose.Schema = new mongoose.Schema({
    email: {type: String, ref: 'users', required: true},
    name: {type: String, required: true},
    value: {type: Number, required: true},
    type: {type: String, required: true}, // => income, expense, saving
    idDeleted: {type: Boolean, default: false},
    createdBy: {type: String, required: true, default: 'user'}, // => user, system
    createdAt: {type: Date, default: moment.tz(new Date(), 'Asia/Kolkata').toDate()},
    updatedAt: {type: Date, default: moment.tz(new Date(), 'Asia/Kolkata').toDate()}
});