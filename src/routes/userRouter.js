import { Router } from "express"
import { getUser, signin, signup } from "../controllers/userC   ontroller.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { schemaUsuario } from "../schemas/usuario.schemas.js"
import { validateAuth } from "../middlewares/validateAuth.js"

const userRouter = Router()

userRouter.post("/sign-up", validateSchema(schemaUsuario), signup)
userRouter.post("/sign-in", signin)
userRouter.get("/usuario-logado", validateAuth, getUser)

export default userRouter