import mongoose from "mongoose";

export default interface IUser {
    _id: mongoose.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isDeleted: boolean;
    googleMetaData?: object;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReqUser {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    isDeleted?: boolean;
    googleMetaData?: object;
}