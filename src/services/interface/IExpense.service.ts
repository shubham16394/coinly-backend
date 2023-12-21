import IExpense from "../../model/entity/expense.entity";

export default interface IExpenseService {
    addExpense(expense: IExpense): Promise<IExpense>;
    getDailyData(email: string, sDate: Date, eDate: Date): Promise<IExpense[]>;
    getMonthlyData(email: string, sDate: Date, eDate: Date): Promise<IExpense[]>
}