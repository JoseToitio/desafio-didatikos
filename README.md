# Projeto: Sistema de Gerenciamento de Produtos

Este projeto é uma aplicação full-stack desenvolvida com **Angular 19** no frontend e **Spring Boot** no backend. Ele permite o gerenciamento de produtos, incluindo criação, edição, listagem e remoção, com autenticação JWT.

## 🚀 Tecnologias Utilizadas

### Frontend:

- **Angular 19**
- **Tailwind CSS** (para estilização)
- **Angular Reactive Forms**
- **Angular Router**
- **HTTP Client** (para comunicação com a API)

### Backend:

- **Spring Boot**
- **Spring Security** (Autenticação JWT)
- **Spring Data JPA** (para acesso ao banco de dados)
- **MySQL**
- **Lombok** (para redução de boilerplate)

## ⚙️ Funcionalidades

- **Autenticação JWT**: Login e proteção de rotas
- **CRUD de Produtos**
  - Criar, listar, editar e remover produtos
  - Associação com cidades
- **Controle de Permissões**: Apenas usuários autenticados podem modificar os produtos
- **Consumo de API** via Angular

## 🔧 Configuração e Execução

### Backend (Spring Boot)

1. **Clone o repositório**:
   ```sh
   git clone git@github.com:JoseToitio/desafio-didatikos.git
   cd backend
   ```
2. **Configure o banco de dados** no `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/seu_banco
   spring.datasource.username=root
   spring.datasource.password=senha
   jwt.secret=c24cdfcebf6d88fba0d952f1b02551a63d2e7e282b8e136ec9d3442193482f57 // exemplo
   jwt.expiration=3600000000
   ```
3. **Execute a aplicação**:
   ```sh
   mvn spring-boot:run
   ```

### Frontend (Angular)

1. **Acesse a pasta frontend**:
   ```sh
   cd frontend
   ```
2. **Instale as dependências**:
   ```sh
   npm install
   ```
3. **Inicie o servidor de desenvolvimento**:
   ```sh
   ng serve
   ```
4. **Acesse no navegador**:
   ```sh
   http://localhost:4200
   ```

## 🛠️ Endpoints Principais

### Autenticação:

- `POST /users/login` → Autentica o usuário e retorna o token JWT
- `POST /users/register` → Registra um novo usuário

### Usuarios:

- `GET /users` → Lista todos os users
- `GET /users/{id}` → Busca um user específico
- `POST /users` → Cria um novo user (requer autenticação)
- `PUT /users/{id}` → Edita um user (requer autenticação)
- `DELETE /users/{id}` → Remove um user (requer autenticação)

### Produtos:

- `GET /produtos` → Lista todos os produtos
- `GET /produtos/{id}` → Busca um produto específico
- `POST /produtos` → Cria um novo produto (requer autenticação)
- `PUT /produtos/{id}` → Edita um produto (requer autenticação)
- `DELETE /produtos/{id}` → Remove um produto (requer autenticação)

## 🔒 Proteção de Rotas

- Usuários **não autenticados** não podem criar, editar ou remover produtos.
- O frontend verifica o token JWT e atualiza o estado de autenticação automaticamente.

