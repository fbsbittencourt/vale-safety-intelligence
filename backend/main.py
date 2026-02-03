from fastapi import FastAPI
from pydantic import BaseModel
from google import genai
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

# Inicializa o cliente Gemini com a nova lib
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

# Configuração de CORS para permitir comunicação com o React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# incidente = {
#     "descricao": "Um trabalhador escorregou em uma área molhada sem sinalização adequada, resultando em uma lesão no tornozelo.",
#     "setor": "Mineração"
# }

class Incidente(BaseModel):
    descricao: str
    setor: str

@app.post("/analisar-seguranca")
async def analisar_seguranca(incidente: Incidente):
    prompt = f"""
    Analise o incidente de segurança na Vale abaixo e responda EXCLUSIVAMENTE em formato JSON.
    Setor: {incidente.setor}
    Relato: {incidente.descricao}

    O JSON deve seguir rigorosamente esta estrutura:
    {{
      "nivel_risco": "Baixo | Médio | Alto | Crítico",
      "resumo": "Resumo técnico",
      "normas": ["NR-10", "NR-12", "NR-22"], 
      "plano_acao": ["Passo 1", "Passo 2", "Passo 3"],
      "recomendacao_epi": "Lista de EPIs"
    }}
    
    Nota: Identifique as Normas Regulamentadoras (NRs) brasileiras aplicáveis a este caso específico.
    """
    
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    
    texto_limpo = response.text.replace('```json', '').replace('```', '').strip()
    return {"analise": texto_limpo}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
