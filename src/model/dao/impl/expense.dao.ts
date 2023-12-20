import mongoose, { Connection } from "mongoose";
import IExpenseDao from "../interface/IExpense.dao";
import IExpense from "../../entity/expense.entity";
import { ExpenseSchema } from "../schema/expense.model";

type ExpenseType = IExpense & mongoose.Document;

export default class ExpenseDao implements IExpenseDao {
    expenseModel: mongoose.Model<ExpenseType>
    constructor(connection: Connection) {
        this.expenseModel = connection.model<ExpenseType>('Expense', ExpenseSchema);
    }

    async addExpense(expense: IExpense): Promise<IExpense> {
        const expenseData = await this.expenseModel.create(expense);
        return expenseData;
    }
}