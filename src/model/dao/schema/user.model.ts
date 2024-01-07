import mongoose = require('mongoose');

export const UserSchema: mongoose.Schema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    googleMetaData: {type: Object},
    idDeleted: {type: Boolean, default: false},
    createdAt: {type: Date, default: new Date()},
    updatedAt: {type: Date, default: new Date()}
});