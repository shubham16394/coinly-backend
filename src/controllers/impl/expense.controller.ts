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

    async getExpenseData(req: Request, res: Response): Promise<void> {
        try{
            const email = req.params?.email;
            const date = new Date(req.params?.date);
            const dateType = req.params?.datetype;
            if(dateType === 'daily') {
                const startDate = new Date(date.setHours(0,0,0,0));
                const endDate = new Date(date.setHours(23,59,59,999));
                const expData = await this.expenseService.getDailyData(email, startDate, endDate);
                sendReponse(res, 201, "Successfully got daily expense data", true, expData);
    
            }
            else if(dateType === 'monthly') {
                const startDate = new Date(new Date(date.setHours(0,0,0,0)).setDate(1));
                const currentMonth = date.getMonth();
                const currentYear = date.getFullYear();
                const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1);
                const lastDayOfMonth = new Date((firstDayOfNextMonth as any) - 1);
                const endDate = new Date(lastDayOfMonth.setHours(23,59,59,999));
                const expData = await this.expenseService.getMonthlyData(email, startDate, endDate);
                sendReponse(res, 201, "Successfully got monthly expense data", true, expData);
            }    
        }
        catch(err) {
            console.log('Error in getting expense data', err);
            sendReponse(res, 500, "Internal Server Error", false);
        }
    }


}