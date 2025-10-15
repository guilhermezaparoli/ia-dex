# IA-Dex 🤖⚡

API REST para criação de monstros/pokémons personalizados utilizando Inteligência Artificial. O projeto permite que usuários criem suas próprias criaturas com descrições, tipos e imagens geradas por IA.

## 🚀 Tecnologias

- **Node.js** v20.11.0
- **TypeScript** - Tipagem estática
- **Fastify** - Framework web de alta performance
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **OpenAI API** - Geração de conteúdo com IA
- **Cloudinary** - Armazenamento de imagens
- **Argon2** - Hash de senhas
- **JWT** - Autenticação via tokens
- **Zod** - Validação de schemas
- **Vitest** - Testes unitários
- **Docker** - Containerização do banco de dados

## 📋 Funcionalidades

### Autenticação e Usuários
- [x] Cadastro de usuários
- [x] Autenticação com JWT
- [x] Refresh token
- [x] Logout
- [x] Buscar dados do usuário
- [x] Trocar senha

### Monstros/Pokémons
- [x] Criar monstro com IA (descrição, tipos, história, stats e imagem)
- [x] Listar todos os monstros da plataforma
- [x] Listar monstros criados pelo usuário
- [x] Buscar monstro por ID

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **SOLID**:

```
src/
├── @types/              # Definições de tipos TypeScript
├── constants/           # Constantes da aplicação
├── env/                 # Configuração de variáveis de ambiente
├── http/
│   ├── controller/      # Controllers (camada de apresentação)
│   │   ├── monsters/    # Endpoints de monstros
│   │   └── users/       # Endpoints de usuários
│   └── middlewares/     # Middlewares HTTP
├── repositories/        # Camada de dados
│   └── inMemoryRepositories/  # Repositórios para testes
├── usecases/           # Casos de uso (regras de negócio)
│   ├── error/          # Erros customizados
│   └── factories/      # Factories para injeção de dependência
└── utils/              # Utilitários
```

## 🔧 Configuração

### Pré-requisitos

- Node.js v20.11.0
- Docker e Docker Compose
- Conta OpenAI (para API Key)
- Conta Cloudinary (para upload de imagens)

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd ia-dex
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
NODE_ENV=dev
PORT=5555
DATABASE_URL=postgres://docker:docker@localhost:5432/ia-dex
OPENAI_API_KEY='sua-chave-openai'
JWT_SECRET='seu-secret-jwt'
CLOUDINARY_CLOUD_NAME='seu-cloud-name'
CLOUDINARY_API_KEY='sua-api-key'
CLOUDINARY_API_SECRET='seu-api-secret'
```

4. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

5. Execute as migrations:
```bash
npx prisma migrate deploy
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run start:dev
```

O servidor estará rodando em `http://localhost:5555`

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch
```

## 📦 Build e Deploy

```bash
# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 🔐 Autenticação

A API utiliza JWT para autenticação. Após o login, você receberá um token que deve ser enviado no header das requisições protegidas:

```
Authorization: Bearer <seu-token>
```

## 📊 Modelo de Dados

### User
- `id` - UUID
- `email` - String (único)
- `name` - String (único)
- `password_hash` - String
- `created_at` - DateTime

### Monster
- `id` - Integer
- `name` - String (único)
- `description` - String
- `story` - String (opcional)
- `image` - String (URL)
- `hp` - Integer (opcional)
- `attack` - Integer (opcional)
- `defense` - Integer (opcional)
- `speed` - Integer (opcional)
- `special_attack` - Integer (opcional)
- `special_defense` - Integer (opcional)
- `types` - Array de Types
- `user_id` - String (FK)
- `created_at` - DateTime

### Types (Enum)
NORMAL, FIRE, WATER, ELECTRIC, GRASS, ICE, FIGHTING, POISON, GROUND, FLYING, PSYCHIC, BUG, ROCK, GHOST, DRAGON, DARK, STEEL, FAIRY

## 🛣️ Rotas da API

### Usuários (`/users`)
- `POST /users` - Criar usuário
- `POST /users/sessions` - Login
- `PATCH /users/token/refresh` - Refresh token
- `POST /users/logout` - Logout
- `GET /users/me` - Buscar dados do usuário (autenticado)
- `PATCH /users/change-password` - Trocar senha (autenticado)

### Monstros (`/monsters`)
- `POST /monsters` - Criar monstro (autenticado)
- `GET /monsters` - Listar todos os monstros
- `GET /monsters/user` - Listar monstros do usuário (autenticado)
- `GET /monsters/:id` - Buscar monstro por ID

## 🎯 Regras de Negócio

- Senhas são hasheadas com Argon2
- Email e nome de usuário devem ser únicos
- Tokens JWT expiram após tempo configurado
- Monstros são criados com auxílio da OpenAI API
- Imagens são armazenadas no Cloudinary
- Rate limiting para prevenir abuso da API

## 📝 Scripts Disponíveis

- `npm run start:dev` - Inicia servidor em modo desenvolvimento com hot reload
- `npm run build` - Compila TypeScript e prepara para produção
- `npm start` - Inicia servidor em modo produção
- `npm test` - Executa testes
- `npm run test:watch` - Executa testes em modo watch

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

ISC

---

Desenvolvido com ⚡ por Guilherme Zaparoli Gomes