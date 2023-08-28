import { Router } from "express"
import { login, signup } from "../controllers/userController.js"
import { validateSchema } from "../middlewares/authMiddleware"
import { schemaCadastro, schemaLogin } from "../schemas/user.schemas"

const userRouter = Router()

userRouter.post("/sign-up", validateSchema(schemaCadastro), signup)
userRouter.post("/sign-in", validateSchema(schemaLogin),login)

export default userRouter