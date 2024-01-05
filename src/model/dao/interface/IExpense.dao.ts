import IExpense from '../../entity/expense.entity';

export default interface IExpenseDao {
    addExpense(expense: IExpense): Promise<IExpense>;
    getDailyExpData(email: string, sDate: Date, eDate: Date): Promise<IExpense[]>;
    getMonthlyExpData(email: string, sDate: Date, eDate: Date): Promise<IExpense[]>;
    editExpense(expId: string, updateData: object): Promise<IExpense>;
    deleteExpense(expId: string): Promise<any>;
    getDailyExpCategoryData(email: string, sDate: Date, eDate: Date): Promise<any[]>;
    getMonthlyExpCategoryData(email: string, sDate: Date, eDate: Date): Promise<any[]>;
}