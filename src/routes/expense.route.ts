import * as express from "express";
import { Router } from "express";
import { authenticate } from "../misc/util";
import IExpenseController from "../controllers/interface/IExpense.controller";

let router: Router = express.Router();

export default class ExpenseRoute {
    constructor(public expenseController: IExpenseController) {
        this.init();
    }

    public getRouter(): Router {
        return router;
    }

    private init() {
        router.post(
            "/:email/:date/addexpense",
            authenticate,
            this.expenseController.addExpense.bind(this.expenseController)
        );

        router.get(
            "/:email/:date/:datetype/getexpdata",
            authenticate,
            this.expenseController.getExpenseData.bind(this.expenseController)
        );

        router.put(
            "/:expId/editexp",
            authenticate,
            this.expenseController.editExpense.bind(this.expenseController)
        );

        router.delete(
            "/:expId/deleteexp",
            authenticate,
            this.expenseController.deleteExpense.bind(this.expenseController)
        )

        router.get(
            "/:email/:date/:datetype/getexpcatdata",
            authenticate,
            this.expenseController.getExpCategoryData.bind(this.expenseController)
        )

    }

} 