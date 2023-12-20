import IExpenseService from "../../services/interface/IExpense.service";
import IExpenseController from "../interface/IExpense.controller";
import { Request, Response, NextFunction } from "express";
import { sendReponse } from "../../misc/util"; 
import IExpense from "../../model/entity/expense.entity";


export default class ExpenseController implements IExpenseController {
    constructor(public expenseService: IExpenseService) {}

    async addExpense(req: Request, res: Response): Promise<void> {
        const email = req.params?.email;
        const date = new Date(req.params?.date);
        // const dateType = req.params?.datetype;
        const expense: IExpense = {
            email,
            value: req.body?.value,
            comment: req.body?.comment,
            type: req.body?.type,
            isDeleted: false,
            createdBy: req.body?.createdBy,
            createdAt: date,
            updatedAt: new Date()
        };

        const expenseData = await this.expenseService.addExpense(expense);
        sendReponse(res, 201, "Expense added successfully", true, expenseData)
    }

}