# rEspiro

Projeto composto por duas partes: API (Python) e Frontend (Next.js + TypeScript).

---

## API (`/api`)

Backend em Python para processamento e fornecimento de dados de Espirometrias para gerar texto em ASCII, monoespaçado de fácil inserção em qualquer sistema de Prontuário Eletrônico do Paciente.

### Estrutura de Arquivos

```
api/
├── api.py
├── engine.py
├── models.py
├── requirements.txt
└── vercel.json
```

- **api.py**  
  Arquivo principal da API.  
  - Inicializa o servidor web (ex: Flask ou FastAPI).
  - Define as rotas HTTP que recebem requisições do frontend.
  - Chama funções do `engine.py` para processar dados.
  - Retorna respostas em JSON.

- **engine.py**  
  Centraliza a lógica de negócio e processamento.
  - Recebe dados em formato JSON e retorna tabela em ASCII.  
  - Realiza validações, cálculos ou integrações com outros serviços.

- **models.py**  
  Define os modelos de dados usados na API.  
  - Estruturas/classes para representar entidades.
  - Validações de campos e métodos auxiliares.

- **requirements.txt**  
  Relação das bibliotecas Python necessárias (ex: FastAPI, pydantic).

- **vercel.json**  
  Configura o deploy da API na plataforma Vercel (ex: definição de entrada, rotas).

### Como usar

1. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
2. Configure as variáveis em `.env`.
3. Execute a API:
   ```bash
   python api.py
   ```

---

## Frontend (`/respiro`)

Interface web desenvolvida com Next.js e TypeScript.

### Estrutura de Arquivos

```
respiro/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── favicon.ico
│   ├── components/
│   │   ├── LayoutClientWrapper.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui/
│   ├── hooks/
│   │   ├── use-device-type.ts
│   │   └── use-orientation.ts
│   └── lib/
│       └── utils.ts
├── public/
├── .next/
├── .env
├── eslint.config.mjs
├── next.config.ts
├── tsconfig.json
└── postcss.config.js
```

- **src/app/**  
  Layout global, página principal, estilos e ícone.

- **src/components/**  
  Gerenciamento de layout, temas e componentes de interface.

- **src/hooks/**  
  Hooks para detecção de dispositivo e orientação.

- **src/lib/**  
  Funções utilitárias.

- **public/**  
  Imagens e ícones estáticos.

- **Configuração**
  - `.env`: Variáveis de ambiente.
  - `eslint.config.mjs`: Lint.
  - `next.config.ts`: Next.js.
  - `tsconfig.json`: TypeScript.
  - `postcss.config.js`: CSS.

### Como usar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse em [respiro-brown.vercel.app](http://respiro-brown.vercel.app).

---

## Scripts Frontend

- `dev`: Desenvolvimento
- `build`: Build de produção
- `start`: Produção