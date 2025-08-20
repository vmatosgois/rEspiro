"use client"; // roda no navegador do usuário

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    DATA: "",
    PRE_CVF: "",
    CVF_PREVISTO: "",
    POS_CVF: "",
    PRE_FEV1: "",
    FEV1_PREVISTO: "",
    POS_FEV1: "",
    PRE_FEV1_CVF: "",
    FEV1_CVF_PREVISTO: "",
    POS_FEV1_CVF: "",
    PRE_FEF2575: "",
    FEF2575_PREVISTO: "",
    POS_FEF2575: "",
    FEF2575_CVF: "",
  });

  // Aqui guardaremos o resultado da API
  const [tableResult, setTableResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Função para enviar os dados para a API Python ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede que o formulário recarregue a página
    setIsLoading(true);
    setError("");
    setTableResult("");

    try {
      const response = await fetch(String(`${process.env.NEXT_PUBLIC_BACKEND_URL}/report`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('A resposta da rede não foi boa.');
      }

      const result = await response.json();
      setTableResult(result.tabela);

    } catch (err) {
      setError('Falha ao comunicar com a API. Verifique se ela está rodando.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-2">rEspiro</h1>
        <p className="text-center text-gray-400 mb-8">Para começar, preencha os campos abaixo.</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex justify-center">
              <div>
                <label htmlFor="DATA" className="block text-sm">Data:</label>
                <input id="DATA" name="DATA" value={formData.DATA} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded p-2 mt-1 w-48"/>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-x-8 gap-y-4 items-end">
              {/* Labels da Coluna */}
              <div className="font-bold text-gray-400">Pré Broncodilatador</div>
              <div className="font-bold text-gray-400"></div>       {/* Deixei essa coluna vazia */}
              <div className="font-bold text-gray-400">Pós Broncodilatador</div>

              {/* Linha CVF */}
              <div>
                <label htmlFor="PRE_CVF">CVF:</label>
                <input id="PRE_CVF" name="PRE_CVF" value={formData.PRE_CVF} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded p-2 mt-1 w-full"/>
              </div>
              <div>
                <label htmlFor="CVF_PREVISTO">Previsto:</label>
                <input id="CVF_PREVISTO" name="CVF_PREVISTO" value={formData.CVF_PREVISTO} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded p-2 mt-1 w-full"/>
              </div>
              <div>
                <label htmlFor="POS_CVF">CVF:</label>
                <input id="POS_CVF" name="POS_CVF" value={formData.POS_CVF} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded p-2 mt-1 w-full"/>
              </div>

              {/* Linha FEV1 */}
              <div>
                <label htmlFor="PRE_FEV1">FEV1:</label>
                <input id="PRE_FEV1" name="PRE_FEV1" value={formData.PRE_FEV1} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded p-2 mt-1 w-full"/>
              </div>
              <div>
                <label htmlFor="FEV1_PREVISTO">Previsto:</label>
                <input id="FEV1_PREVISTO" name="FEV1_PREVISTO" value={formData.FEV1_PREVISTO} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded p-2 mt-1 w-full"/>
              </div>
              <div>
                <label htmlFor="POS_FEV1">FEV1:</label>
                <input id="POS_FEV1" name="POS_FEV1" value={formData.POS_FEV1} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded p-2 mt-1 w-full"/>
              </div>

              {/* Linha FEV1/CVF */}
              <div className="col-span-3 text-center">
                <label htmlFor="FEV1_CVF_PREVISTO" className="mr-1.5">Previsto FEV1/CVF:</label>
                <input id="FEV1_CVF_PREVISTO" name="FEV1_CVF_PREVISTO" value={formData.FEV1_CVF_PREVISTO} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded p-2 mt-1 w-48"/>
              </div>

              {/* Linha FEF 25-75 */}
              <div>
                <label htmlFor="PRE_FEF2575">FEF 25-75%:</label>
                <input id="PRE_FEF2575" name="PRE_FEF2575" value={formData.PRE_FEF2575} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded p-2 mt-1 w-full"/>
              </div>
              <div>
                <label htmlFor="FEF2575_PREVISTO">Previsto:</label>
                <input id="FEF2575_PREVISTO" name="FEF2575_PREVISTO" value={formData.FEF2575_PREVISTO} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded p-2 mt-1 w-full"/>
              </div>
              <div>
                <label htmlFor="POS_FEF2575">FEF 25-75%:</label>
                <input id="POS_FEF2575" name="POS_FEF2575" value={formData.POS_FEF2575} onChange={handleChange} className="bg-gray-700 border border-gray-600 rounded p-2 mt-1 w-full"/>
              </div>
            </div>
            
            <div className="flex justify-center pt-6">
                <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg disabled:bg-gray-500">
                  {isLoading ? 'Gerando...' : 'Concluir'}
                </button>
            </div>
          </div>
        </form>

        {error && <div className="mt-6 text-center text-red-500">{error}</div>}
        {tableResult && (
          <div className="mt-8 p-4 bg-gray-900 rounded-lg flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center">Resultado</h2>
            <pre className="text-center text-sm whitespace-pre-wrap font-mono">{tableResult}</pre>
          </div>
        )}
      </div>
    </main>
  );
}