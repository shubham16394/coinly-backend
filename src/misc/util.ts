
import bcrypt = require("bcryptjs");
import { NextFunction, Request, Response } from "express";

export function encrypt(arg: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(arg, salt);
    return hash;    
}

export function compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash);
}

export function sendReponse(res: Response, code: number, message: string, status: boolean, data?: any) {
    const resData: any = { message, status };
    if(data) resData.data = data;
    return res.status(code).send(resData);
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    console.log('req.user user route', req.user)
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
}
