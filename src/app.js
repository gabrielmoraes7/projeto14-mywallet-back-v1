import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/index.routes"

const app = express()

app.use(router)
app.use(express.json())
app.use(cors())
dotenv.config()

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})