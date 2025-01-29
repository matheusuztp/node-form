# Cadastro de Usuários

## Descrição

Permite cadastrar, listar e editar usuários com validações específicas, incluindo verificação de CEP via API externa.

## Tecnologias

- **Backend:**
    - Node.js
    - Express.js
    - Express Validator
    - Axios

- **Frontend:**
    - HTML5
    - CSS3
    - JavaScript

## Funcionalidades

- **Cadastro de Usuários:**
    - Campos: Nome, Email, CEP.
    - Validações: Nome sem números, Email válido e único, CEP numérico de 8 dígitos verificado pela [Brasil API](https://brasilapi.com.br/).

- **Listagem e Edição:**
    - Exibe usuários cadastrados.
    - Permite editar dados ao clicar no usuário.

## Estrutura do Projeto

```
node-form/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── public/
│   ├── index.js
│   └── package.json
└── README.md
```

## Como Executar

### Pré-requisitos

- **Node.js** [Download](https://nodejs.org/)
- **Git** [Download](https://git-scm.com/)

### Passos

1. **Clone o Repositório:**
     ```bash
     git clone https://github.com/matheusuztp/node-form.git
     cd node-form
     ```

2. **Instale as Dependências:**
     ```bash
     npm install
     ```

3. **Inicie o Servidor:**
     ```bash
     node index.js
     ```
     Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Endpoints da API

- **POST /api/register**
    - Registra um novo usuário.
    - **Body:**
        ```json
        {
            "nome": "Nome do Usuário",
            "email": "email@exemplo.com",
            "cep": "84061112"
        }
        ```

- **GET /api/users**
    - Lista todos os usuários.

- **GET /api/users/:id**
    - Detalha um usuário específico.

- **PUT /api/users/:id**
    - Atualiza dados de um usuário.
    - **Body:**
        ```json
        {
            "nome": "Nome Atualizado",
            "email": "novoemail@exemplo.com",
            "cep": "84061112"
        }
        ```

## Frontend

Página HTML simples que interage com o backend para cadastrar, listar, editar e deletar usuários com validações no cliente.