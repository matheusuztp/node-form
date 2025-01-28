const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

const userValidationRules = [
  body('nome')
    .trim()
    .notEmpty().withMessage('Nome é obrigatório')
    .matches(/^[A-Za-z\s]+$/).withMessage('Nome não pode conter números'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido'),
  body('cep')
    .trim()
    .notEmpty().withMessage('CEP é obrigatório')
    .isNumeric().withMessage('CEP deve conter apenas números')
    .isLength({ min: 8, max: 8 }).withMessage('CEP deve ter 8 dígitos')
];

router.post('/register', userValidationRules, userController.registerUser);

router.get('/users', userController.getAllUsers);

router.get('/users/:id', userController.getUserById);

router.put('/users/:id', userValidationRules, userController.updateUser);

router.delete('/users/:id', userController.deleteUser);

module.exports = router;
