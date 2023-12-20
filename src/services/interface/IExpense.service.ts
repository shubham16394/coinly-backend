import IExpense from "../../model/entity/expense.entity";

export default interface IExpenseService {
    addExpense(expense: IExpense): Promise<IExpense>
}