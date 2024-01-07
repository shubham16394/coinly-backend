import mongoose = require('mongoose');
import moment from 'moment-timezone';

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    googleMetaData: {type: Object},
    idDeleted: {type: Boolean, default: false},
    createdAt: {type: Date, default: moment.tz(new Date(), 'Asia/Kolkata').toDate()},
    updatedAt: {type: Date, default: moment.tz(new Date(), 'Asia/Kolkata').toDate()}
});