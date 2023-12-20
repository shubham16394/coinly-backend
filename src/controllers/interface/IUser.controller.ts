import { NextFunction, Request, Response } from "express";

export default interface IUserController {
    authenticate(req: Request, res: Response): void;
    logout(req: Request, res: Response): void;
    createUser(req: Request, res: Response): Promise<void>;
    validateUserData(req: Request, res: Response, next: NextFunction): void;
    getUserDetails(req: Request, res: Response): Promise<void>;
}