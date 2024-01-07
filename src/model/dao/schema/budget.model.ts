import mongoose = require('mongoose');
import { isDateInUTC, getISTTime } from "../../../misc/util"; 

export const BudgetSchema: mongoose.Schema = new mongoose.Schema({
    email: {type: String, ref: 'users', required: true},
    name: {type: String, required: true},
    value: {type: Number, required: true},
    type: {type: String, required: true}, // => income, expense, saving
    idDeleted: {type: Boolean, default: false},
    createdBy: {type: String, required: true, default: 'user'}, // => user, system
    createdAt: {type: Date, default: isDateInUTC(new Date()) ? getISTTime(new Date()) : new Date()},
    updatedAt: {type: Date, default: isDateInUTC(new Date()) ? getISTTime(new Date()) : new Date()}
});