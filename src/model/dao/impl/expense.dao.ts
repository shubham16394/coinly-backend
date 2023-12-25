import mongoose, { Connection } from "mongoose";
import IExpenseDao from "../interface/IExpense.dao";
import IExpense from "../../entity/expense.entity";
import { ExpenseSchema } from "../schema/expense.model";

type ExpenseType = IExpense & mongoose.Document;

export default class ExpenseDao implements IExpenseDao {
  expenseModel: mongoose.Model<ExpenseType>;
  constructor(connection: Connection) {
    this.expenseModel = connection.model<ExpenseType>("Expense", ExpenseSchema);
  }

  async addExpense(expense: IExpense): Promise<IExpense> {
    const expenseData = await this.expenseModel.create(expense);
    return expenseData;
  }

  async getDailyExpData(
    email: string,
    sDate: Date,
    eDate: Date
  ): Promise<IExpense[]> {
    const query = this.getDailyQuery(email, sDate, eDate);
    const expData = await this.expenseModel.aggregate(query);
    return expData;
  }

  async getMonthlyExpData(
    email: string,
    sDate: Date,
    eDate: Date
  ): Promise<IExpense[]> {
    const query = this.getMonthlyQuery(email, sDate, eDate);
    const expData = await this.expenseModel.aggregate(query);
    return expData;
  }

  getDailyQuery(email: string, sDate: Date, eDate: Date) {
    const query = [
      {
        $match: {
          email,
          createdAt: { $gte: sDate, $lte: eDate },
        },
      },
      {
        $project: {
          hour: { $hour: "$createdAt" },
          formattedHour: {
            $concat: [
              {
                $toString: {
                  $cond: {
                    if: { $gte: [{ $hour: "$createdAt" }, 12] },
                    then: { $subtract: [{ $hour: "$createdAt" }, 12] },
                    else: { $hour: "$createdAt" },
                  },
                },
              },
              " ",
              {
                $cond: {
                  if: { $gte: [{ $hour: "$createdAt" }, 12] },
                  then: "PM",
                  else: "AM",
                },
              },
            ],
          },
          value: 1,
          type: 1,
          comment: 1,
          email: 1,
          createdAt: 1,
          updatedAt: 1,
          createdBy: 1,
        },
      },
    ];
    return query;
  }

  getMonthlyQuery(email: string, sDate: Date, eDate: Date) {
    const query = [
      {
        $match: {
          email,
          createdAt: { $gte: sDate, $lte: eDate },
        },
      },
      {
        $project: {
          _id: 1,
          date: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$createdAt",
            },
          },
          hour: { $hour: "$createdAt" },
          value: 1,
          type: 1,
          comment: 1,
          email: 1,
          createdAt: 1,
          updatedAt: 1,
          createdBy: 1,
        },
      },
      {
        $project: {
          date: 1,
          formattedHour: {
            $concat: [
              {
                $toString: {
                  $cond: {
                    if: { $gte: ["$hour", 12] },
                    then: { $subtract: ["$hour", 12] },
                    else: "$hour",
                  },
                },
              },
              " ",
              {
                $cond: {
                  if: { $gte: ["$hour", 12] },
                  then: "PM",
                  else: "AM",
                },
              },
            ],
          },
          _id: 1,
          value: 1,
          type: 1,
          comment: 1,
          email: 1,
          createdAt: 1,
          updatedAt: 1,
          createdBy: 1,
        },
      },
    ];
    return query;
  }

  async editExpense(expId: string, updateData: object): Promise<IExpense> {
    const updatedExpData: IExpense = await this.expenseModel.findByIdAndUpdate(expId, updateData, {new: true, upsert: true});
    return updatedExpData;
  }

  async deleteExpense(expId: string): Promise<any> {
    const deletedData: any = await this.expenseModel.findByIdAndDelete(expId, {includeResultMetadata: true});
    return deletedData;
  }
}
