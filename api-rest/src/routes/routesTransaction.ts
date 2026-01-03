import express from "express";
import { createTransaction, deleteTransaction, getAllTransactions, getTransaction, getValueUser, updateTransaction } from "../controller/transactionController.js";
import { apiKeyGuard } from "../middlewares/apiKey.middleware.js";


const routesTransaction = express.Router();

routesTransaction.use(apiKeyGuard);

routesTransaction.post("/newTransaction", createTransaction);
routesTransaction.get("/findOne/:id", getTransaction);
routesTransaction.get("/", getAllTransactions);
routesTransaction.get("/balance", getValueUser);
routesTransaction.put("/updateTransaction/:id", updateTransaction);
routesTransaction.delete("/delete/:id", deleteTransaction);

export default routesTransaction;