import IUserDao from "../interface/IUser.dao";
import IUser, { ReqUser } from "../../entity/user.entity";
import { UserSchema } from "../schema/user.model";
import mongoose, { Connection } from "mongoose";

type UserType = IUser & mongoose.Document;


export default class UserDao implements IUserDao {
    userModel: mongoose.Model<UserType>;
    constructor(connection: Connection) {
        this.userModel = connection.model<UserType>('User', UserSchema);
    }

    async createUser(user: ReqUser): Promise<IUser> {
        const userData = await this.userModel.create(user);
        return userData;
    }

    async getUserDetails(email: string): Promise<IUser | null> {
        const userData = await this.userModel.findOne({email});
        if(userData) {
            return userData;
        }
        else {
            return null;
        }
    }

    async findById(_id: mongoose.Schema.Types.ObjectId): Promise<IUser | null> {
        const userData = await this.userModel.findById(_id)
        return userData;
    }
}