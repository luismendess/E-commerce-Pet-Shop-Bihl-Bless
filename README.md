# Petshop Bihlbless

Um e-commerce completo de petshop desenvolvido com Next.js, React e TypeScript.

## Guia Completo de Instalação e Configuração

### 1. Preparação do Ambiente de Desenvolvimento

#### Instalando Node.js (Necessário para executar o projeto)
1. Acesse [Node.js](https://nodejs.org/)
2. Baixe a versão LTS (Long Term Support) - Recomendada para maior estabilidade
3. Execute o instalador:
   - Windows: Next > Next > Finish
   - Mac: Siga as instruções do instalador
   - Linux: Use o gerenciador de pacotes da sua distribuição ou nvm
4. Verifique a instalação abrindo o terminal (Command Prompt no Windows) e digite:
```bash
node --version  # Deve mostrar algo como v18.x.x
npm --version   # Deve mostrar algo como 8.x.x
```

#### Instalando Git (Necessário para baixar o projeto)
1. Acesse [Git](https://git-scm.com/)
2. Baixe e instale:
   - Windows: Mantenha as opções padrão durante a instalação
   - Mac: Use o instalador .dmg
   - Linux: Use `sudo apt-get install git` (Ubuntu/Debian)
3. Configure seu Git (substitua com suas informações):
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### 2. Configurando o Projeto

#### Clonando o Repositório
```bash
# Navegue até a pasta onde quer o projeto
cd Documents  # ou outro local de sua preferência

# Clone o repositório
git clone [URL do seu repositório]

# Entre na pasta do projeto
cd petshop_bihlbless
```

#### Instalando Dependências
Abra o terminal na pasta do projeto e execute os comandos na ordem:

```bash
# Instala todas as dependências listadas no package.json
npm install

# Caso algumas dependências específicas não estejam no package.json:
npm install next@latest react@latest react-dom@latest
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npm install @types/node @types/react @types/react-dom typescript
npm install @radix-ui/react-icons
npm install @radix-ui/react-slot
npm install clsx
npm install lucide-react
npm install tailwind-merge
```

#### Configurando Variáveis de Ambiente
1. Crie um arquivo chamado `.env.local` na raiz do projeto
2. Adicione as variáveis necessárias:
```env
NEXT_PUBLIC_API_URL=sua_url_api
# Adicione outras variáveis conforme necessário
```

### 3. Estrutura do Projeto Explicada

```
petshop_bihlbless/
├── app/                    # Páginas e rotas da aplicação
│   ├── carrinho/          # Página do carrinho
│   ├── contato/           # Página de contato
│   ├── login/             # Página de login
│   ├── produtos/          # Páginas de produtos
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes de interface
│   ├── cart-badge.tsx    # Badge do carrinho
│   ├── footer.tsx        # Rodapé
│   └── header.tsx        # Cabeçalho
├── contexts/             # Contextos do React
│   └── cart-context.tsx  # Contexto do carrinho
├── hooks/                # Hooks personalizados
├── lib/                  # Utilitários
└── public/              # Arquivos estáticos
    └── images/          # Imagens do projeto
```

### 4. Executando o Projeto

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# O site estará disponível em http://localhost:3000
```

### 5. Comandos Úteis

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Cria uma build de produção
npm run build

# Inicia o servidor de produção
npm start

# Executa o linter
npm run lint
```

### 6. Solução de Problemas Comuns

#### Erro: Module not found
```bash
# Limpe o cache e reinstale as dependências
npm cache clean --force
rm -rf node_modules
rm -rf .next
npm install
```

#### Erro com Imagens
1. Verifique se o caminho está correto:
   - Correto: `/images/logo.jpg`
   - Incorreto: `@/public/images/logo.jpg`
2. Verifique se a imagem existe na pasta correta
3. Certifique-se que está usando o componente Image corretamente:
```jsx
import Image from 'next/image'

<Image
  src="/images/logo.jpg"
  alt="Descrição"
  width={80}
  height={80}
/>
```

#### Erro: TypeScript
1. Verifique se os tipos estão instalados:
```bash
npm install -D @types/react @types/node @types/react-dom
```
2. Certifique-se que o `tsconfig.json` está configurado corretamente

#### Erro no Tailwind
1. Verifique se o arquivo `tailwind.config.js` existe
2. Recrie o arquivo de configuração:
```bash
npx tailwindcss init -p
```

### 7. Tecnologias Utilizadas

- **Next.js**: Framework React para produção
- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Superset JavaScript com tipagem
- **Tailwind CSS**: Framework CSS utilitário
- **Radix UI**: Componentes primitivos acessíveis
- **Lucide React**: Biblioteca de ícones
- **Clsx**: Utilitário para construção de classes condicionais

### 8. Manutenção e Atualizações

Para manter o projeto atualizado:
```bash
# Verifica atualizações disponíveis
npm outdated

# Atualiza todas as dependências
npm update

# Atualiza uma dependência específica
npm install [nome-do-pacote]@latest
```

### 9. Suporte e Contribuição

Para reportar problemas ou sugerir melhorias:
1. Abra uma issue no GitHub
2. Descreva detalhadamente o problema ou sugestão
3. Inclua passos para reproduzir o problema
4. Adicione screenshots se necessário

Para mais informações ou dúvidas, entre em contato através das issues do GitHub.
