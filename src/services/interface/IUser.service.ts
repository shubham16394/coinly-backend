import IUser, { ReqUser } from "../../model/entity/user.entity";

export default interface IUserService {
    createUser(user: ReqUser): Promise<IUser>;
    getUserDetails(email: string): Promise<IUser | null>;
}