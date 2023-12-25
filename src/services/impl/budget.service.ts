import IDaoFactory from "../../model/dao/IDaoFactory";
import IBudgetService from "../interface/IBudget.service";
import IBudgetDao from "../../model/dao/interface/IBudget.dao";
import IBudget from "../../model/entity/budget.entity";

export default class BudgetService implements IBudgetService {
    budgetDao!: IBudgetDao;
    constructor(daoFactory: IDaoFactory) {
        this.budgetDao = daoFactory.getBudgetDao();
    }

    async add(email: string, date: Date, type: string, budgetData: object): Promise<IBudget> {
        return await this.budgetDao.add(email, date, type, budgetData);
    }

    async get(email: string, startDate: Date, endDate: Date, type: string): Promise<IBudget[]> {
        return await this.budgetDao.get(email, startDate, endDate, type);
    }

    async update(bId: string, updateBudgetData: object): Promise<IBudget> {
        return await this.budgetDao.update(bId, updateBudgetData);
    }

    async delete(bId: string): Promise<any> {
        return await this.budgetDao.delete(bId);
    }

}