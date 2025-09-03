# rEspiro

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