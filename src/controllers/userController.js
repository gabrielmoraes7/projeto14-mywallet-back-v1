import bcrypt from 'bcrypt';                      
import { db } from '../database/connection.js';   //banco de dados
import { v4 as uuid } from 'uuid';                //biblioteca que gera o token utilizado pelo usuario para rodar pelo app enquanto logado

export async function signup(req, res) {
  const { name, email, password } = req.body

  try {
    const user = await db.collection("users").findOne({ email})

    if(user){
      return res.status(409).send("E-mail já foi cadastrado!")
    }
      
      const hash = bcrypt.hashSync(password, 10)

      await db.collection("users").insertOne({ name, email, password: hash})
      res.sendStatus(201)

  }catch{
    res.status(500).send(err.message)
  }
}

export async function login(req, res) {
  const { email, password } = req.body

  try {
      const user = await db.collection("users").findOne({ email })
      if (!user) return res.status(404).send("E-mail não cadastrado!")

      const isPasswordCorrect = bcrypt.compareSync(password, user.password)
      if (!isPasswordCorrect) return res.status(401).send("Senha incorreta")

      const token = uuid()
      await db.collection("sessions").insertOne({ token, userId: user._id })

      res.send({ token, userName: user.name })

  } catch (err) {
      res.status(500).send(err.message)
  }
}

export async function logout(req, res) {
  const token = res.locals.session.token

  try {
      await db.collection("session").deleteOne({ token })
      res.sendStatus(200)
  } catch (err) {
      res.status(500).send(err.message)
  }
}