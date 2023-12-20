import IDaoFactory from "./IDaoFactory";
import IUserDao from "./interface/IUser.dao";
import IBudgetDao from "./interface/IBudget.dao";
import IExpenseDao from "./interface/IExpense.dao";

import { Connection } from "mongoose";
import UserDao from "./impl/user.dao";
import ExpenseDao from "./impl/expense.dao";
import BudgetDao from "./impl/budget.dao";
export default class DaoFactory implements IDaoFactory{

    userDao: IUserDao;
    expenseDao: IExpenseDao;
    budgetDao: IBudgetDao;

    constructor(connection: Connection) {
        this.userDao = new UserDao(connection);
        this.expenseDao = new ExpenseDao(connection);
        this.budgetDao = new BudgetDao(connection);
    }

    public getUserDao(): IUserDao {
        return this.userDao;
    }

    public getExpenseDao(): IExpenseDao {
        return this.expenseDao;
    }

    public getBudgetDao(): IBudgetDao {
        return this.budgetDao;
    }

}