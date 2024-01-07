import IBudgetDao from "../interface/IBudget.dao";
import IBudget from "../../entity/budget.entity";
import mongoose, { Connection } from "mongoose";
import { BudgetSchema } from "../schema/budget.model";

type BudgetType = IBudget & mongoose.Document;

export default class BudgetDao implements IBudgetDao {
  budegtModel: mongoose.Model<BudgetType>;

  constructor(connection: Connection) {
    this.budegtModel = connection.model<BudgetType>("Budget", BudgetSchema);
  }

  async add(
    email: string,
    date: Date,
    type: string,
    budgetData: object
  ): Promise<IBudget> {
    const data: IBudget = await this.budegtModel.create({
      email,
      type,
      createdAt: date,
      ...budgetData,
    });
    return data;
  }

  async get(
    email: string,
    startDate: Date,
    endDate: Date,
    type: string
  ): Promise<IBudget[]> {
    const query = this.getQuery(email, startDate, endDate, type);
    console.log(`Get budget type ${type}`, JSON.stringify(query));
    const data: IBudget[] = await this.budegtModel.aggregate(query);
    return data;
  }

  getQuery(email: string, startDate: Date, endDate: Date, type: string) {
    const query = [
      {
        $match: {
          email,
          type,
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          name: 1,
          value: 1,
          type: 1,
          isDeleted: 1,
          createdBy: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];
    return query;
  }

  async update(bId: string, updateBudgetData: object): Promise<IBudget> {
    const data: IBudget = await this.budegtModel.findByIdAndUpdate(
      bId,
      updateBudgetData,
      { upsert: true, new: true }
    );
    return data;
  }

  async delete(bId: string): Promise<any> {
    const data: any = await this.budegtModel.findByIdAndDelete(
      bId,
      { includeResultMetadata: true }
    );
    return data;
  }

}
