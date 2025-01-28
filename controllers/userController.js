const { validationResult } = require('express-validator');
const users = require('../models/userModel');
const { validateCEP } = require('../services/cepService');

const emailExists = (email) => {
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { nome, email, cep } = req.body;

  if (emailExists(email)) {
    return res.status(400).json({ errors: [{ msg: 'Email já existe', param: 'email' }] });
  }

  const cepValidation = await validateCEP(cep);
  if (!cepValidation.isValid) {
    return res.status(400).json({ errors: [{ msg: 'CEP inválido', param: 'cep' }] });
  }

  const user = {
    id: users.length + 1,
    nome,
    email,
    cep,
    endereco: cepValidation.data,
    criadoEm: new Date()
  };

  users.push(user);

  return res.status(201).json({ message: 'Usuário registrado com sucesso', user });
};

const getAllUsers = (req, res) => {
  return res.status(200).json({ users });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  return res.status(200).json({ user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userIndex = users.findIndex(u => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const { nome, email, cep } = req.body;

  if (users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== parseInt(id))) {
    return res.status(400).json({ errors: [{ msg: 'Email já existe', param: 'email' }] });
  }

  const cepValidation = await validateCEP(cep);
  if (!cepValidation.isValid) {
    return res.status(400).json({ errors: [{ msg: 'CEP inválido', param: 'cep' }] });
  }

  users[userIndex] = {
    ...users[userIndex],
    nome,
    email,
    cep,
    endereco: cepValidation.data,
    atualizadoEm: new Date()
  };

  return res.status(200).json({ message: 'Usuário atualizado com sucesso', user: users[userIndex] });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  users.splice(userIndex, 1);

  return res.status(200).json({ message: 'Usuário deletado com sucesso' });
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};