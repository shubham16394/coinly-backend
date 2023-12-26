import { NextFunction, Request, Response } from "express";
import IUser, { ReqUser } from "../../model/entity/user.entity";
import IUserService from "../../services/interface/IUser.service";
import IUserController from "../interface/IUser.controller";
import * as EmailValidator from "email-validator";
import { encrypt, sendReponse } from "../../misc/util";
import passport from "passport";

export default class UserController implements IUserController {
  constructor(public userService: IUserService) {}

  async createUser(req: Request, res: Response): Promise<void> {
    const user: ReqUser = {
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      email: req.body?.email,
      password: encrypt(req.body?.password),
      confirmPassword: req.body?.confirmPassword,
      isDeleted: false,
    };

    await this.userService.createUser(user);
    sendReponse(res, 201, "Signup successful", true);
  }

  validateUserData(req: Request, res: Response, next: NextFunction): void {
    const body = req?.body;

    console.log("Signup req body", body);

    if (!(body?.firstName && typeof body?.firstName === "string")) {
        sendReponse(res, 403, "firstName should be string", false);
    }
    if (!(body?.lastName && typeof body?.lastName === "string")) {
        sendReponse(res, 403, "lastName should be string", false);
    }
    if (
      !(
        body?.email &&
        typeof body?.email === "string" &&
        EmailValidator.validate(body?.email)
      )
    ) {
      sendReponse(res, 403, "Provide a valid email", false);
    }
    if (body?.password && body?.password !== body?.confirmPassword) {
        sendReponse(res, 403, "Passwords did not match", false);
    } else {
      next();
    }
  }

  async getUserDetails(req: Request, res: Response): Promise<void> {
    const email = req?.params?.email;
    if (!email) {
      res.status(403).send({ message: "Provide a valid email", status: false });
    } else {
      const userData = await this.userService.getUserDetails(email);
      if (userData) {
          sendReponse(res, 201, "User found", true);

      } else {
        sendReponse(res, 404, "User not found", false);

      }
    }
  }

  authenticate(req: Request, res: Response) {
    passport.authenticate(
      "local",
      {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true,
      },
      (err: Error, user: IUser, info: any) => {
        console.log('Login status', 'err', err, 'user', user, 'info', info);
        if (err) {
          return sendReponse(res, 401, "Unauthorized", false);
        } else {
          req.login(user, (loginErr) => {
            if (loginErr) {
              return sendReponse(res, 500, "Login Failed", false);
            }
            return sendReponse(res, 201, "Login Successful", true);
          });
        }
      }
    )(req, res);
  }

  logout = (req: Request, res: Response) => {
    req.logout((err: any) => {
      console.log("Error occurred during logout", err);
    });
    res.redirect("/login");
  };
}
