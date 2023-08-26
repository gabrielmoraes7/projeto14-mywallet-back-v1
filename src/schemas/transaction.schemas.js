import Joi from 'joi';

export const schemaTransacao = Joi.object({
    tipo: Joi.string().valid('entrada', 'saida').required(),
    valor: Joi.number().positive().precision(2).required(),
    descricao: Joi.string().required()
  });