import { Router } from "express"
import userRouter from "./userRouter"
import transactionRouter from "./transactionRouter"

const router = Router()

router.use(userRouter)
router.use(transactionRouter)

export default router 

