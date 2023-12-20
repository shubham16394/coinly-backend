import IBudgetDao from "../interface/IBudget.dao";
import IBudget from "../../entity/budget.entity";
import mongoose, { Connection } from "mongoose";
import { BudgetSchema } from "../schema/budget.model";

type BudgetType = IBudget & mongoose.Document;

export default class BudgetDao implements IBudgetDao {
    budegtModel: mongoose.Model<BudgetType>;

    constructor(connection: Connection) {
        this.budegtModel = connection.model<BudgetType>('Budget', BudgetSchema);
    }
} 