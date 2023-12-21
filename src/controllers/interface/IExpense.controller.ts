import { Request, Response, NextFunction } from "express";

export default interface IExpenseController {
    addExpense(req: Request, res: Response): Promise<void>;
    getExpenseData(req: Request, res: Response): Promise<void>;
}