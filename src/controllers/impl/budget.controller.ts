import IBudgetService from "../../services/interface/IBudget.service";
import IBudgetController from "../interface/IBudget.controller";
import { Request, Response } from "express";
import { sendReponse, getStartEndDate } from "../../misc/util"; 


export default class BudgetController implements IBudgetController {
    constructor(public budgetService: IBudgetService) {}

    async add(req: Request, res: Response): Promise<void> {
        try{
            const email = req.params?.email;
            const date = new Date(req.params?.date);
            const type = req.params?.type;
            const budgetData = req.body?.budgetData;
            const data = await this.budgetService.add(email, date, type, budgetData);
            sendReponse(res, 201, `Successfully created ${type}`, true, data)    
        }
        catch(err) {
            console.log(`Error in adding ${req.params?.type} data`, err);
            sendReponse(res, 500, "Internal Server Error", false);
        }
    }

    async get(req: Request, res: Response): Promise<void> {
        try{
            const email = req.params?.email;
            const date = new Date(req.params?.date);
            const type = req.params?.type;
            const { startDate, endDate } = getStartEndDate(date);
            console.log(`get budget data ${type}`, 'req.params?.date', req.params?.date, 'date', date, 'startDate', startDate, 'endDate', endDate);
            const data = await this.budgetService.get(email, startDate, endDate, type);
            sendReponse(res, 201, `Successfully got ${type} data`, true, data)    
        }
        catch(err) {
            console.log(`Error in getting ${req.params?.type} data`, err);
            sendReponse(res, 500, "Internal Server Error", false);
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try{
            const bId = req.params?.bId;
            const updateBudgetData = req.body?.updateBudgetData;
            const data = await this.budgetService.update(bId, updateBudgetData);
            sendReponse(res, 201, `Successfully updated budgetdata`, true, data)    
        }
        catch(err) {
            console.log(`Error in updating budgetdata`, err);
            sendReponse(res, 500, "Internal Server Error", false);
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try{
            const bId = req.params?.bId;
            const data = await this.budgetService.delete(bId);
            sendReponse(res, 201, `Successfully deleted budgetdata`, true, data)    
        }
        catch(err) {
            console.log(`Error in deleting budgetdata`, err);
            sendReponse(res, 500, "Internal Server Error", false);
        }
    }



}