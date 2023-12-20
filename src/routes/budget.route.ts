import * as express from "express";
import { Request, Response, Router } from "express";
import IBudgetController from "../controllers/interface/IBudget.controller";

let router: Router = express.Router();

export default class BudgetRoute {
    constructor(public budgetController: IBudgetController) {
    }

    public getRouter(): Router {
        return router;
    }



}  