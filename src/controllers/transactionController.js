import { ObjectId } from 'mongodb';
import { db } from '../database/connection.js';

const addTransaction = async (req, res) => {
  const { type, value, description } = req.body;
  const userId = req.userId;

  // Validação dos dados da transação
  if (!type || !['entrada', 'saida'].includes(type)) {
    return res.status(422).json({ message: 'Tipo inválido' });
  }

  if (!value || typeof value !== 'number' || value <= 0) {
    return res.status(422).json({ message: 'Valor inválido' });
  }

  if (!description || typeof description !== 'string') {
    return res.status(422).json({ message: 'Descrição inválida' });
  }


  try {
    const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const transaction = { type, value, description };
    const balance = user.balance + (type === 'entrada' ? value : -value);

    await db.collection('users').updateOne(
      { _id: ObjectId(userId) },
      { $push: { transactions: transaction }, $set: { balance } }
    );

    res.status(201).json({ message: 'Transação adicionada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar transação' });
  }
};

const listTransactions = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user.transactions);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar transações' });
  }
};

export { addTransaction, listTransactions };
