import IBudget from '../../entity/budget.entity';

export default interface IBudgetDao {
    add(email: string, date: Date, type: string, budgetData: object): Promise<IBudget>;
    get(email: string, startDate: Date, endDate: Date, type: string): Promise<IBudget[]>;
    update(bId: string, updateBudgetData: object): Promise<IBudget>;
    delete(bId: string): Promise<any>;
}