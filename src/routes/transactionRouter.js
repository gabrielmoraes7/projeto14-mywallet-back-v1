import { Router } from "express"
import { createTransaction, deleteTransaction, editTransaction, getTransactions } from "../controllers/transaction.controller.js"
import { schemaValidation } from "../middlewares/schemaMiddleware"
import { transactionSchema } from "../schemas/transaction.schemas.js"
import { validateAuth } from "../middlewares/authMiddleware"

const transactionRouter = Router()

transactionRouter.post("/transactions", validateAuth, schemaValidation(transactionSchema), createTransaction)
transactionRouter.get("/transactions", validateAuth, getTransactions)
transactionRouter.delete("/transactions/:id", deleteTransaction)
transactionRouter.put("/transactions/:id", schemaValidation(transactionSchema), editTransaction)