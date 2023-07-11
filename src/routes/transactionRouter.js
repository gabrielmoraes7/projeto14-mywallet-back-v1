const express = require('express');
import { Router } from "express"
import { listTransactions, addTransaction } from "../controllers/transactionController"
import { schemaMiddleware } from "../middlewares/schemaMiddleware"
import { schemaTransacao } from "../schemas/transaction.schemas"
import { authMiddleware } from "../middlewares/authMiddleware"

const useRouter = express.Router();

useRouter.post(
  '/nova-transacao',
  authMiddleware,addTransaction
);
useRouter.get('/transacoes', authMiddleware,listTransactions);

export default useRouter