import IDaoFactory from "../../model/dao/IDaoFactory";
import IUserDao from "../../model/dao/interface/IUser.dao";
import IUser, { ReqUser } from "../../model/entity/user.entity";
import IUserService from "../interface/IUser.service";

export default class UserService implements IUserService {
    userDao!: IUserDao

    constructor(daoFactory: IDaoFactory){
        this.userDao = daoFactory.getUserDao();
    }

    async createUser(user: ReqUser): Promise<IUser> {
        return await this.userDao.createUser(user);
    }

    async getUserDetails(email: string): Promise<IUser | null> {
        return await this.userDao.getUserDetails(email);
    }
}