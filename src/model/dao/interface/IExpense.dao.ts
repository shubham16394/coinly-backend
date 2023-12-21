import IExpense from '../../entity/expense.entity';

export default interface IExpenseDao {
    addExpense(expense: IExpense): Promise<IExpense>;
    getDailyExpData(email: string, sDate: Date, eDate: Date): Promise<IExpense[]>;
    getMonthlyExpData(email: string, sDate: Date, eDate: Date): Promise<IExpense[]>;
}