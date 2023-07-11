import bcrypt from 'bcrypt';
import { db } from '../database/connection.js';
import { schemaCadastro, schemaLogin } from '../schemas/user.schemas';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
  const { nome, email, senha, confirmaSenha } = req.body;

  // Validação de cadastro do usuário
  if (!nome || !email || !password) {
    return res.status(422).json({ message: 'Todos os campos são obrigatórios' });
  }

  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return res.status(422).json({ message: 'Email inválido' });
  } 

  if (password.length < 3) {
    return res.status(422).json({ message: 'A senha deve ter pelo menos 3 caracteres' });
  }


  const { error } = schemaCadastro.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    await db.collection('users').insertOne({
      nome,
      email,
      senha: hashedPassword,
      balance: 0,
      transactions: []
    });

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'Email já cadastrado' });
    } else {
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  // Validação dos dados do usuário
  const { error } = schemaLogin.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  try {
    const user = await db.collection('users').findOne({ email });
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    // Geração do token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);


    //Array que o user vai receber no front-end quando tiver sucesso no login
    res.json({ id: user._id,
                name: user.name,
                email: user.email,
                token });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
}; 

export { createUser, loginUser };
