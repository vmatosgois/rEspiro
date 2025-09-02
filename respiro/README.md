# rEspiro

rEspiro é um projeto Next.js com TypeScript, focado em servir como base para uma API e interface web moderna.

## Objetivo

O projeto foi criado para servir de frontend da API rEspiro.

## Estrutura

- **src/app/**  
  - `layout.tsx`: Define o layout global da aplicação.
  - `page.tsx`: Página principal.
  - `globals.css`: Estilos globais.
  - `favicon.ico`: Ícone do site.

- **src/components/**  
  - `LayoutClientWrapper.tsx`: Gerencia o layout do lado do cliente.
  - `theme-provider.tsx`: Gerencia temas (dark/light).
  - `ui/`: Componentes de interface reutilizáveis.

- **src/hooks/**  
  - `use-device-type.ts`: Detecta tipo de dispositivo.
  - `use-orientation.ts`: Detecta orientação da tela.

- **src/lib/**  
  - `utils.ts`: Funções utilitárias.

- **public/**  
  Imagens e ícones estáticos.

- **.next/**  
  Build e cache gerados pelo Next.js.

- **Configuração**  
  - `.env`: Variáveis de ambiente.
  - `eslint.config.mjs`: Configuração de lint.
  - `next.config.ts`: Configuração do Next.js.
  - `tsconfig.json`: Configuração do TypeScript.
  - `postcss.config.js`: Configuração de CSS.

## Como usar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. O projeto estará disponível em [respiro-brown.vercel.app](http://respiro-brown.vercel.app).

## Scripts

- `dev`: Desenvolvimento
- `build`: Build de produção
- `start`: Produção
- `lint`: Lint
