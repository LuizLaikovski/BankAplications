
<h1 align="center" style="font-weight: bold;">API BANK 💻</h1>

![LICENSE__BADGE](https://img.shields.io/github/license/LuizLaikovski/BankAplications?style=for-the-badge)
![TYPESCRIPT__BADGE](https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript)
![EXPRESS.JS](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NODE_BADGE](https://img.shields.io/badge/node.js-24.1.0-43853D?style=for-the-badge&logo=node.js)
![MONGODB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![PROJECT__BADGE](https://img.shields.io/badge/📱Visit_this_project-000?style=for-the-badge&logo=project)
![PRS_BADGE](https://img.shields.io/badge/PRs-welcome-green?style=for-the-badge)


<h2 id="started">📌 Sobre</h2>

Esta aplicação é uma API Bancaria e tem como objetivo praticar meus conhecimentos em express e typescript. Ela foi desenvolvida de maneira independente.

<h2 id="started">🚀 Como usar</h2>

Você deve clonar o repositório em sua maquina e executar ele.

<h3>Pré-Requisitos</h3>

Você deve possuir instalado em sua maquina:

- [NodeJS](https://nodejs.org/pt)
- [Git](https://git-scm.com/install)

<h3>Clonando</h3>

Como clonar o projeto

```bash
git clone https://github.com/LuizLaikovski/BankAplications.git
```

<h3>Como Executar</h3>

```bash
cd api-rest
npm install
npm run dev
```

<h2 id="routes">📍 Rotas da Aplicação</h2>


### Rotas de Usuário (`/user`)

As rotas de usuário são responsáveis pela autenticação, gerenciamento de contas e funcionalidades específicas do usuário, como a gestão de chaves PIX favoritas.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/user/newUser` | **Criação de Novo Usuário.** Registra um novo usuário no sistema. |
| `POST` | `/user/login` | **Login do Usuário.** Autentica um usuário existente, retornando um token de acesso (presumivelmente JWT). |
| `GET` | `/user/` | **Obter Todos os Usuários.** Retorna uma lista de todos os usuários cadastrados. **Requer autenticação.** |
| `GET` | `/user/:idUser` | **Obter Usuário por ID.** Retorna os dados de um usuário específico, identificado pelo seu ID. **Requer autenticação.** |
| `PUT` | `/user/:idUser` | **Atualizar Usuário.** Atualiza as informações de um usuário específico. **Requer autenticação.** |
| `PUT` | `/user/update/password` | **Atualizar Senha.** Permite que o usuário altere sua senha. **Requer autenticação.** |
| `DELETE` | `/user/delete/:id` | **Deletar Usuário.** Remove um usuário do sistema, identificado pelo seu ID. **Requer autenticação.** |
| `POST` | `/user/favoritekeypix` | **Adicionar Chave PIX Favorita.** Adiciona uma nova chave PIX à lista de favoritas do usuário. **Requer autenticação.** |
| `DELETE` | `/user/unfavoritekey` | **Remover Chave PIX Favorita.** Remove uma chave PIX da lista de favoritas do usuário. **Requer autenticação.** |

### Rotas de Transação (`/transaction`)

As rotas de transação lidam com a criação, consulta, atualização e exclusão de transações financeiras.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/transaction/newTransaction` | **Criar Nova Transação.** Registra uma nova transação financeira (ex: depósito, saque, transferência). **Requer autenticação.** |
| `GET` | `/transaction/findOne/:id` | **Obter Transação por ID.** Retorna os detalhes de uma transação específica, identificada pelo seu ID. **Requer autenticação.** |
| `GET` | `/transaction/` | **Obter Todas as Transações.** Retorna uma lista de todas as transações registradas no sistema. **Requer autenticação.** |
| `PUT` | `/transaction/updateTransaction/:id` | **Atualizar Transação.** Atualiza os detalhes de uma transação específica. **Requer autenticação.** |
| `DELETE` | `/transaction/delete/:id` | **Deletar Transação.** Remove uma transação do sistema, identificada pelo seu ID. **Requer autenticação.** |

### Estrutura da Aplicação

A aplicação segue uma estrutura modular, com as rotas sendo definidas em arquivos separados e montadas no arquivo principal (`app.ts`):

*   **Rotas de Usuário:** Montadas sob o prefixo `/user`.
*   **Rotas de Transação:** Montadas sob o prefixo `/transaction`.

A porta padrão de execução da API é `8080`.

**Exemplo de URL Base:** `http://localhost:8080`

**Exemplo de Rota Completa (Login):** `POST http://localhost:8080/user/login`


<h2 id="colab">🤝 Colaboradores</h2>

Agradeço a todos os contribuintes do projeto.

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/160736729?v=4" width="100px;" alt="Fernanda Kipper Profile Picture"/><br>
        <sub>
          <b>Luiz Laikovski</b>
        </sub>
      </a>
    </td>
