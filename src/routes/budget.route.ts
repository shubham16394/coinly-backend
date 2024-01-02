import * as express from "express";
import { Router } from "express";
import { authenticate } from "../misc/util";
import IBudgetController from "../controllers/interface/IBudget.controller";

let router: Router = express.Router();

export default class BudgetRoute {
    constructor(public budgetController: IBudgetController) {
        this.init();
    }

    public getRouter(): Router {
        return router;
    }

    private init() {

        router.post(
            "/:email/:date/:type/add",
            // authenticate,
            this.budgetController.add.bind(this.budgetController)
        );

        router.get(
            "/:email/:date/:type/get",
            // authenticate,
            this.budgetController.get.bind(this.budgetController)
        );

        router.put(
            "/:bId/update",
            // authenticate,
            this.budgetController.update.bind(this.budgetController)
        );

        router.delete(
            "/:bId/delete",
            // authenticate,
            this.budgetController.delete.bind(this.budgetController)
        )
    }



}  