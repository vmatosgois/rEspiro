from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import SpirometryData
from engine import main_processing
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:3000",  # O endereço do seu frontend Next.js
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

@app.post("/report")
async def generate_table(data: SpirometryData):
    """
    Recebe dados de espirometria, processa-os e retorna uma tabela formatada.
    """
    valores_dict = data.model_dump() # Transforma o modelo base em um dicionário normal
    
    table = main_processing(valores_dict)
    
    # Retorna a tabela em um formato JSON
    return {"tabela": table}

@app.get("/")
async def root():
    return {"message": "API de geração de tabelas de espirometria."}
