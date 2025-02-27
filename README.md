# Pet Shop Bihl Bless - Plataforma E-commerce

## Sobre o Projeto

Sistema de e-commerce desenvolvido para o Pet Shop Bihl Bless, como extensão à matéria Dsenvolvimento de Aplicações Web, utilizando Next.js 15.1.7, React 19, Prisma e MySQL.
A plataforma oferece gerenciamento completo de produtos, sistema de autenticação, carrinho de compras e painel administrativo.

## Tecnologias Principais

- Next.js 15.1.7
- React 19.0.0
- Prisma 6.4.1
- MySQL
- NextAuth.js 4.24.11
- Tailwind CSS 3.4.1
- Typescript 5.7.3

## Pré-requisitos

### Requisitos de Sistema

1. Node.js (versão 18.x ou superior)
2. MySQL (versão 8.0 ou superior)
3. Git

### Ferramentas Recomendadas

- Visual Studio Code
- MySQL Workbench (para gerenciamento do banco de dados)
- Insomnia ou Postman (para testar as APIs)

## Instalação

### 1. Preparando o Ambiente MySQL

```sql
-- Acessar o MySQL
mysql -u root -p

-- Criar o banco de dados
CREATE DATABASE petshop;
```

### 2. Clonando e Instalando o Projeto

```bash
# Clonar o repositório
git clone [URL_DO_REPOSITÓRIO]
cd petshop

# Instalar dependências
npm install
```

### 3. Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/petshop"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="GERE_UMA_CHAVE_SECRETA"
```

### 4. Configuração do Banco de Dados

```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar as migrações
npx prisma migrate dev

# (Opcional) Popular o banco com dados iniciais
npx prisma db seed
```

### 5. Iniciando o Projeto

```bash
# Iniciar em modo desenvolvimento
npm run dev

# O projeto estará disponível em http://localhost:3000
```

## Estrutura do Projeto

### Diretórios Principais

```
petshop/
├─ app/                    # Rotas e páginas
│  ├─ admin/              # Área administrativa
│  ├─ api/                # Endpoints da API
│  ├─ produtos/           # Páginas de produtos
│  └─ layout.tsx          # Layout principal
├─ components/            # Componentes React
├─ contexts/              # Contextos (carrinho, usuário)
├─ hooks/                 # Hooks personalizados
├─ lib/                   # Utilitários
├─ prisma/               # Configuração do banco
└─ public/               # Arquivos estáticos
```

### Estrutura do Banco de Dados

O projeto utiliza dois modelos principais:

1. User (Usuários)

```prisma
model User {
  id        String    @id @default(cuid())
  name      String
  email     String    @unique
  password  String
  isAdmin   Boolean   @default(false)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  lastLogin DateTime?
  products  Product[]
}
```

2. Product (Produtos)

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  price       Float
  description String?
  image       String?
  category    String
  stock       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  createdBy   String
  user        User     @relation(fields: [createdBy], references: [id])
}
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Construir para produção
npm run build

# Iniciar em produção
npm run start

# Verificar qualidade do código
npm run lint
```

## Deploy

### Preparação para Produção

1. Configure um servidor MySQL

   - Recomendamos serviços como AWS RDS, DigitalOcean ou PlanetScale
   - Atualize a variável DATABASE_URL com a nova conexão

2. Deploy no Vercel

   - Conecte seu repositório GitHub
   - Configure as variáveis de ambiente:
     - DATABASE_URL
     - NEXTAUTH_SECRET
     - NEXTAUTH_URL

3. Execute as migrações no banco de produção

```bash
npx prisma migrate deploy
```

### Backup do Banco de Dados

```bash
# Exportar
mysqldump -u root -p petshop > backup.sql

# Importar
mysql -u root -p petshop < backup.sql
```

## Solução de Problemas Comuns

### Erro de Conexão com o Banco

1. Verifique se o MySQL está rodando
2. Confirme as credenciais no .env
3. Teste a conexão:

```bash
mysql -u root -p
```

### Erro nas Migrações do Prisma

```bash
# Resetar o banco (cuidado: apaga dados)
npx prisma migrate reset

# Verificar status
npx prisma migrate status
```

### Problemas com Dependências

```bash
# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules
rm -rf .next
npm install
```

## Licença

Este projeto é privado e proprietário. Todos os direitos reservados.
