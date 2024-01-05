import mongoose from "mongoose";
import IDaoFactory from "../../model/dao/IDaoFactory";
import IExpenseDao from "../../model/dao/interface/IExpense.dao";
import IExpense from "../../model/entity/expense.entity";
import IExpenseService from "../interface/IExpense.service";

export default class ExpenseService implements IExpenseService {
    expenseDao!: IExpenseDao
    constructor(daoFactory: IDaoFactory) {
        this.expenseDao = daoFactory.getExpenseDao();
    }

    async addExpense(expense: IExpense): Promise<IExpense> {
        return await this.expenseDao.addExpense(expense);
    }

    async getDailyData(email: string, sDate: Date, eDate: Date): Promise<IExpense[]>{
        return await this.expenseDao.getDailyExpData(email, sDate, eDate);
    }

    async getMonthlyData(email: string, sDate: Date, eDate: Date): Promise<IExpense[]>{
        return await this.expenseDao.getMonthlyExpData(email, sDate, eDate);
    }

    async editExpense(expId: string, updateData: object): Promise<IExpense>{
        return await this.expenseDao.editExpense(expId, updateData);
    }

    async deleteExpense(expId: string): Promise<any> {
        return await this.expenseDao.deleteExpense(expId);
    }

    async getDailyCategoryData(email: string, sDate: Date, eDate: Date): Promise<any[]>{
        return await this.expenseDao.getDailyExpCategoryData(email, sDate, eDate);
    }

    async getMonthlyCategoryData(email: string, sDate: Date, eDate: Date): Promise<any[]>{
        return await this.expenseDao.getMonthlyExpCategoryData(email, sDate, eDate);
    }
}