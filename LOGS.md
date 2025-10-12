# 📋 Sistema de Logs

## Implementação

O projeto agora possui um sistema completo de logs usando **Pino** (logger nativo do Fastify).

## Logs Implementados

### 1. **Logs de Inicialização** (`server.ts`)
- ✅ Confirmação de início do servidor
- ✅ Porta e ambiente
- ❌ Erros de inicialização

### 2. **Logs de Variáveis de Ambiente** (`env/index.ts`)
- ✅ Validação bem-sucedida
- ❌ Erros de validação com lista de variáveis obrigatórias

### 3. **Logs de Banco de Dados** (`lib/prisma/index.ts`)
- ✅ Conexão bem-sucedida
- ❌ Falha na conexão
- 📊 Queries (apenas em desenvolvimento)

### 4. **Logs de Requisições HTTP** (`app.ts`)
- ⚠️ Erros de validação (400)
- ⚠️ Erros de aplicação (4xx)
- ❌ Erros internos (500) com detalhes completos:
  - URL e método
  - Headers
  - Body
  - Query params
  - Stack trace

### 5. **Logs de Controllers**
- `create-monsters.ts`: Criação de monstros e erros de IA
- `authenticate.ts`: Autenticação de usuários

## Como Visualizar os Logs na Render

### Opção 1: Dashboard da Render
1. Acesse https://dashboard.render.com
2. Selecione seu serviço
3. Clique na aba **"Logs"**
4. Os logs aparecerão em tempo real

### Opção 2: Render CLI
```bash
# Instalar CLI
npm install -g render-cli

# Login
render login

# Ver logs em tempo real
render logs -f <service-name>
```

## Níveis de Log

- **debug**: Informações detalhadas (apenas desenvolvimento)
- **info**: Informações gerais (startup, conexões)
- **warn**: Avisos (validações, erros esperados)
- **error**: Erros críticos (500, falhas de conexão)

## Configuração por Ambiente

### Desenvolvimento
- Logs coloridos e formatados
- Nível: `debug`
- Queries SQL visíveis

### Produção
- Logs em JSON
- Nível: `info`
- Apenas erros e warnings do banco

## Variáveis de Ambiente Necessárias

Certifique-se de que todas estão configuradas na Render:

```
NODE_ENV=production
PORT=<porta>
DATABASE_URL=<url-do-banco>
OPENAI_API_KEY=<sua-chave>
JWT_SECRET=<seu-secret>
CLOUDINARY_API_KEY=<sua-chave>
CLOUDINARY_API_SECRET=<seu-secret>
CLOUDINARY_CLOUD_NAME=<seu-nome>
```

## Debugando Erro 500

Com os logs implementados, você verá:

1. **Erro de variável de ambiente faltando**:
```
❌ Invalid environment variables:
{
  "OPENAI_API_KEY": { "_errors": ["Required"] }
}
```

2. **Erro de conexão com banco**:
```
❌ Database connection failed: Error: Can't reach database server
```

3. **Erro de tabelas não existem** (migrations não executadas):
```
The table `public.monsters` does not exist in the current database.
```
**Solução**: O script de build agora inclui `prisma migrate deploy` automaticamente.

4. **Erro em requisição**:
```json
{
  "level": "error",
  "msg": "Internal server error - 500",
  "url": "/api/monsters",
  "method": "POST",
  "err": {
    "message": "OpenAI API key not found",
    "stack": "..."
  }
}
```

## Próximos Passos

Após fazer deploy com os logs:
1. Acesse os logs na Render
2. Identifique o erro específico
3. Verifique se todas as variáveis de ambiente estão configuradas
4. Compartilhe o log do erro para análise mais detalhada
