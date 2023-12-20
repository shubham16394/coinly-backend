import IUserDao from "./interface/IUser.dao";
import IBudgetDao from "./interface/IBudget.dao";
import IExpenseDao from "./interface/IExpense.dao";

export default interface IDaoFactory {
    getUserDao(): IUserDao;
    getBudgetDao(): IBudgetDao;
    getExpenseDao(): IExpenseDao;
}