import IBudgetService from "../../services/interface/IBudget.service";
import IBudgetController from "../interface/IBudget.controller";
import { Request, Response, NextFunction } from "express";
import { sendReponse } from "../../misc/util"; 


export default class BudgetController implements IBudgetController {
    constructor(public budgetService: IBudgetService) {}

}