import mongoose = require('mongoose');
import { isDateInUTC, getISTTime } from "../../../misc/util"; 

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    googleMetaData: {type: Object},
    idDeleted: {type: Boolean, default: false},
    // createdAt: {type: Date, default: isDateInUTC(new Date()) ? getISTTime(new Date()) : new Date()},
    // updatedAt: {type: Date, default: isDateInUTC(new Date()) ? getISTTime(new Date()) : new Date()}
    createdAt: {type: Date, default: getISTTime(new Date().toISOString())},
    updatedAt: {type: Date, default: getISTTime(new Date().toISOString())}
});