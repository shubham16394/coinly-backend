import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { authenticate } from "../misc/util"; 
import IUserController from "../controllers/interface/IUser.controller";

let router: Router = express.Router();

export default class UserRoute {
  constructor(
    public userController: IUserController
  ) {
    this.init();
  }

  public getRouter(): Router {
    return router;
  }

  private init() {
    router.post(
      "/signup",
      this.userController.validateUserData.bind(this.userController),
      this.userController.createUser.bind(this.userController)
    );

    router.post(
      "/login",
      this.userController.authenticate.bind(this.userController)
    );

    router.get(
      "/logout",
      this.userController.logout.bind(this.userController)
    );

    router.get(
      "/:email/getuserdetails",
      authenticate,
      this.userController.getUserDetails.bind(this.userController)
    );
  }

}
