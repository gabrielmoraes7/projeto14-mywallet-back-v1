import bcrypt from 'bcrypt';
import { db } from '../database/connection.js';
import { v4 as uuid } from 'uuid';  //biblioteca que gera o token utilizado pelo usuario para rodar pelo app enquanto logado

export async function signup(req, res) {
  const { name, email, password } = req.body

  try {
    const user = await db.colectio("users").findOne({ email})

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