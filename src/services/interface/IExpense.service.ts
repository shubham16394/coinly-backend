import IExpense from "../../model/entity/expense.entity";

export default interface IExpenseService {
    addExpense(expense: IExpense): Promise<IExpense>;
    getDailyData(email: string, sDate: Date, eDate: Date): Promise<IExpense[]>;
    getMonthlyData(email: string, sDate: Date, eDate: Date): Promise<IExpense[]>;
    editExpense(expId: string, updateData: object): Promise<IExpense>;
    deleteExpense(expId: string): Promise<any>;
    getDailyCategoryData(email: string, sDate: Date, eDate: Date): Promise<any[]>;
    getMonthlyCategoryData(email: string, sDate: Date, eDate: Date): Promise<any[]>;
}