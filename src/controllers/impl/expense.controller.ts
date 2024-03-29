import IExpenseService from "../../services/interface/IExpense.service";
import IExpenseController from "../interface/IExpense.controller";
import { Request, Response } from "express";
import { sendReponse, getStartEndDate } from "../../misc/util"; 
import IExpense from "../../model/entity/expense.entity";
import moment from 'moment-timezone';


export default class ExpenseController implements IExpenseController {
    constructor(public expenseService: IExpenseService) {}

    async addExpense(req: Request, res: Response): Promise<void> {
        try{
            const email = req.params?.email;
            const date = new Date(req.params?.date);
            const expense: IExpense = {
                email,
                value: req.body?.value,
                comment: req.body?.comment,
                type: req.body?.type,
                createdAt: moment.tz(date, 'Asia/Kolkata').toDate()
            };
    
            const expenseData = await this.expenseService.addExpense(expense);
            sendReponse(res, 201, "Expense added successfully", true, expenseData);    
        }
        catch(err) {
            console.log('Error in adding expense data', err);
            sendReponse(res, 500, "Internal Server Error", false);
        }
    }

    async getExpenseData(req: Request, res: Response): Promise<void> {
        try{
            const email = req.params?.email;
            const date = new Date(req.params?.date);
            const istMoment = moment.tz(date, 'Asia/Kolkata');
            const dateType = req.params?.datetype;
            if(dateType === 'daily') {
                const startDate = istMoment.clone().startOf('day').toDate();
                const endDate = istMoment.clone().endOf('day').toDate();
                const expData = await this.expenseService.getDailyData(email, startDate, endDate);
                sendReponse(res, 201, "Successfully got daily expense data", true, expData);
    
            }
            else if(dateType === 'monthly') {
                const { startDate, endDate } = getStartEndDate(date);
                const expData = await this.expenseService.getMonthlyData(email, startDate, endDate);
                sendReponse(res, 201, "Successfully got monthly expense data", true, expData);
            }    
        }
        catch(err) {
            console.log('Error in getting expense data', err);
            sendReponse(res, 500, "Internal Server Error", false);
        }
    }

    async editExpense(req: Request, res: Response): Promise<void> {
        try {
            const expId = req.params?.expId;
            const updateData = req.body?.updateData;
            const updatedExpData = await this.expenseService.editExpense(expId, updateData);
            sendReponse(res, 201, "Successfully updated expense data", true, updatedExpData);
        }
        catch(err) {
            console.log('Error in updating expense data', err);
            sendReponse(res, 500, "Internal Server Error", false);
        }
    }

    async deleteExpense(req: Request, res: Response): Promise<void> {
        try {
            const expId = req.params?.expId;
            const deletedData = await this.expenseService.deleteExpense(expId);
            sendReponse(res, 201, "Successfully deleted expense data", true, deletedData);
        }
        catch(err) {
            console.log('Error in deleting expense data', err);
            sendReponse(res, 500, "Internal Server Error", false);
        }
    }

    async getExpCategoryData(req: Request, res: Response): Promise<void> {
        try {
            const email = req.params?.email;
            const date = new Date(req.params?.date);
            const istMoment = moment.tz(date, 'Asia/Kolkata');
            const dateType = req.params?.datetype;
            if(dateType === 'daily') {
                const startDate = istMoment.clone().startOf('day').toDate();
                const endDate = istMoment.clone().endOf('day').toDate();
                const expData = await this.expenseService.getDailyCategoryData(email, startDate, endDate);
                sendReponse(res, 201, "Successfully got daily expense category data", true, expData);
            }
            else if(dateType === 'monthly') {
                const { startDate, endDate } = getStartEndDate(date);
                const expData = await this.expenseService.getMonthlyCategoryData(email, startDate, endDate);
                sendReponse(res, 201, "Successfully got monthly expense category data", true, expData);
            }    
        }
        catch(err) {
            console.log('Error in getting expense caategory data', err);
            sendReponse(res, 500, "Internal Server Error", false);
        }
    }


}