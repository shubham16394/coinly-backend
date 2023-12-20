import IExpense from '../../entity/expense.entity';

export default interface IExpenseDao {
    addExpense(expense: IExpense): Promise<IExpense>;
}