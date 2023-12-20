import IDaoFactory from "../../model/dao/IDaoFactory";
import IBudgetService from "../interface/IBudget.service";
import IBudgetDao from "../../model/dao/interface/IBudget.dao";

export default class BudgetService implements IBudgetService {
    budgetDao!: IBudgetDao;
    constructor(daoFactory: IDaoFactory) {
        this.budgetDao = daoFactory.getBudgetDao();
    }
}