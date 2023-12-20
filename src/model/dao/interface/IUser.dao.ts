import mongoose from 'mongoose';
import IUser, { ReqUser } from '../../entity/user.entity';

export default interface IUserDao {
    createUser(user: ReqUser): Promise<IUser>;
    getUserDetails(email: string): Promise<IUser | null>;
    findById(_id: mongoose.ObjectId): Promise<IUser | null>;
}