
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

export function getStartEndDate(date: Date) {
    const startDate = new Date(new Date(date.setHours(0,0,0,0)).setDate(1));
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1);
    const lastDayOfMonth = new Date((firstDayOfNextMonth as any) - 1);
    const endDate = new Date(lastDayOfMonth.setHours(23,59,59,999));
    return {startDate, endDate};
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    console.log('req.user user route', req.user)
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
}
