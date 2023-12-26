import express from "express";
import path from "path";
import session from "express-session";
import MongoHandler from "./dbConnection";
import mongoose, { Schema } from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
const MongoStore = require("connect-mongo");
import { Strategy as LocalStrategy } from "passport-local";
const cors = require("cors");
const app = express();
let connection: mongoose.Connection;
import { compare } from "./misc/util";

import UserRoute from "./routes/user.route";
import BudgetRoute from "./routes/budget.route";
import ExpenseRoute from "./routes/expense.route";

import UserService from "./services/impl/user.service";
import BudgetService from "./services/impl/budget.service";
import ExpenseService from "./services/impl/expense.service";
import IUserService from "./services/interface/IUser.service";
import IBudgetService from "./services/interface/IBudget.service";
import IExpenseService from "./services/interface/IExpense.service";

import UserController from "./controllers/impl/user.controller";
import ExpenseController from "./controllers/impl/expense.controller";
import BudgetController from "./controllers/impl/budget.controller";
import IUserController from "./controllers/interface/IUser.controller";
import IBudgetController from "./controllers/interface/IBudget.controller";
import IExpenseController from "./controllers/interface/IExpense.controller";

import DaoFactory from "./model/dao/factory";
import IDaoFactory from "./model/dao/IDaoFactory";

let userRouter: UserRoute;
let budgetRouter: BudgetRoute;
let expenseRouter: ExpenseRoute;

let baseUrl = "/coinly";

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist/coinly')));

async function createAndStartServer() {
  connection = await setupDBConnection();

  const mongoStoreOptions = {
    client: connection.getClient(),
    stringify: true,
  };

  const mongoStore = MongoStore.create(mongoStoreOptions);

  const sess: any = {
    secret: "CoinlyS3cr3t",
    resave: true,
    saveUninitialized: false,
    name: "coinly",
    store: mongoStore,
    cookie: {
      httpOnly: false,
      secure: true, // make true for not showing cookie in client
      sameSite: "none",
    },
  };

  app.use(session(sess));

  app.use(passport.initialize());
  app.use(passport.session());

  setDependencies(connection);

  app.listen(PORT, function () {
    console.log(`Coinly server started on port ${PORT}`);
  });
}

async function setupDBConnection() {
  const dbConnection = new MongoHandler();
  return dbConnection.setupDBConnection();
}

function setDependencies(connection: mongoose.Connection) {
  const daoFactory: IDaoFactory = new DaoFactory(connection);

  const authenticateUser = async (
    email: string,
    password: string,
    done: any
  ) => {
    const user = await daoFactory.getUserDao().getUserDetails(email);
    if (user && user?.password) {
      if (compare(password, user?.password)) {
        done(null, user);
      } else {
        done(new Error("Credentials are not matched"), null);
      }
    } else {
      done(new Error("User not found"), null);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", 
        passwordField: "password",
      },
      authenticateUser
    )
  );

  passport.serializeUser(function (user: any, done) {
    try {
      console.log("serializeUser", user);
      done(null, user._id);
    } catch (error) {
      console.error("Error during serialization:", error);
      done(error);
    }
  });

  passport.deserializeUser(async function (_id: mongoose.Schema.Types.ObjectId, done: any) {
    try {
      console.log("deserializeUser called", _id);
      const user = await daoFactory.getUserDao().findById(_id);
      if (user) {
        done(null, user);
      } else {
        done(new Error("User not found"), null);
      }
    } catch (err) {
      console.log('Error during serialization:', err)
      done(err, null);
    }
  });

  const userService: IUserService = new UserService(daoFactory);
  const userController: IUserController = new UserController(userService);
  userRouter = new UserRoute(userController);

  const budgetService: IBudgetService = new BudgetService(daoFactory);
  const budgetController: IBudgetController = new BudgetController(
    budgetService
  );
  budgetRouter = new BudgetRoute(budgetController);

  const expenseService: IExpenseService = new ExpenseService(daoFactory);
  const expenseController: IExpenseController = new ExpenseController(
    expenseService
  );
  expenseRouter = new ExpenseRoute(expenseController);

  setRoutes();
}

function setRoutes() {
  app.use(baseUrl + "/user", userRouter.getRouter());
  app.use(baseUrl + "/budget", budgetRouter.getRouter());
  app.use(baseUrl + "/expense", expenseRouter.getRouter());
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist/coinly/index.html'));
  });
}

createAndStartServer();
