"use client";

import { useState } from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2Icon } from "lucide-react"
import { ModeToggle } from '@/components/ui/modetoggle';
import { toast } from "sonner";


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

  const [copyButtonText, setCopyButtonText] = useState("Copiar");

  /**
   * Função que copia o resultado da tabela para área de transferência
   * 
   * Se a operação for bem sucedida, muda o texto do botão para dar feedback
   * e volta ao texto original após 2 segundos.
   * Se a operação falhar, muda o texto do botão para "Erro!" e volta ao
   * texto original após 2 segundos.
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tableResult);
      setCopyButtonText("Copiado!"); // Muda o texto do botão para dar feedback
      setTimeout(() => {
        setCopyButtonText("Copiar"); // Volta ao texto original após 2 segundos
      }, 2000);
      toast("Resultado copiado para a área de transferência!");
    } catch (err) {
      console.error("Falha ao copiar:", err);
      setCopyButtonText("Erro!");
      setTimeout(() => {
        setCopyButtonText("Copiar");
      }, 2000);
    }
  };

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/report`, {
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
    <main className="flex min-h-screen flex-col items-center p-6">
      <body>
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-xl dark:border-1">
        <div className="flex items-center justify-center mb-4">
          <div className="absolute top-4 left-4">
            <ModeToggle />
          </div>
          <Image
            src="/logo_respiro.png" 
            alt="logo"
            width={75}  
            height={75} 
            className="inline-block mr-2"
          />
          <h1 className="text-3xl font-bold text-center mb-2">rEspiro</h1>
        </div>
        <p className="text-center mb-5">
          Para começar, preencha os campos abaixo. <br/>
          Ao Concluir, clique no botão &quot;Copiar&quot; ou na tabela para copiar para a área de transferência. <br/>
          Legenda: NI = Não Informado.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex justify-center">
              <div>
                <Label htmlFor="DATA" className="block text-sm">Data:</Label>
                <Input id="DATA" name="DATA" value={formData.DATA} onChange={handleChange}/>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-x-8 gap-y-4 items-end">
              {/* Labels da Coluna */}
              <Label variant="bold" size="md" className="border-b-2 border-gray-300 dark:border-gray-700 justify-center"> Pré-Broncodilatador</Label>
              <Label></Label>
              <Label variant="bold" size="md" className="border-b-2 border-gray-300 dark:border-gray-700 justify-center"> Pós-Broncodilatador</Label>

              {/* Linha CVF */}
              <div>
                <Label htmlFor="PRE_CVF">CVF:</Label>
                <Input id="PRE_CVF" name="PRE_CVF" value={formData.PRE_CVF} onChange={handleChange}/>
              </div>
              <div>
                <Label htmlFor="CVF_PREVISTO">Previsto:</Label>
                <Input id="CVF_PREVISTO" name="CVF_PREVISTO" value={formData.CVF_PREVISTO} onChange={handleChange}/>
              </div>
              <div>
                <Label htmlFor="POS_CVF">CVF:</Label>
                <Input id="POS_CVF" name="POS_CVF" value={formData.POS_CVF} onChange={handleChange}/>
              </div>

              {/* Linha FEV1 */}
              <div>
                <Label htmlFor="PRE_FEV1">FEV1:</Label>
                <Input id="PRE_FEV1" name="PRE_FEV1" value={formData.PRE_FEV1} onChange={handleChange}/>
              </div>
              <div>
                <Label htmlFor="FEV1_PREVISTO">Previsto:</Label>
                <Input id="FEV1_PREVISTO" name="FEV1_PREVISTO" value={formData.FEV1_PREVISTO} onChange={handleChange}/>
              </div>
              <div>
                <Label htmlFor="POS_FEV1">FEV1:</Label>
                <Input id="POS_FEV1" name="POS_FEV1" value={formData.POS_FEV1} onChange={handleChange}/>
              </div>

              {/* Linha FEV1/CVF */}
              <Label></Label>
              <div>
                <Label htmlFor="FEV1_CVF_PREVISTO" className="mr-1.5">Previsto FEV1/CVF:</Label>
                <Input id="FEV1_CVF_PREVISTO" name="FEV1_CVF_PREVISTO" value={formData.FEV1_CVF_PREVISTO} onChange={handleChange}/>
              </div>
              <Label></Label>

              {/* Linha FEF 25-75 */}
              <div>
                <Label htmlFor="PRE_FEF2575">FEF 25-75%:</Label>
                <Input id="PRE_FEF2575" name="PRE_FEF2575" value={formData.PRE_FEF2575} onChange={handleChange}/>
              </div>
              <div>
                <Label htmlFor="FEF2575_PREVISTO">Previsto:</Label>
                <Input id="FEF2575_PREVISTO" name="FEF2575_PREVISTO" value={formData.FEF2575_PREVISTO} onChange={handleChange}/>
              </div>
              <div>
                <Label htmlFor="POS_FEF2575">FEF 25-75%:</Label>
                <Input id="POS_FEF2575" name="POS_FEF2575" value={formData.POS_FEF2575} onChange={handleChange}/>
              </div>
            </div>
            
            <div className="flex gap-3 justify-center pt-6">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2Icon className="animate-spin"/>
                      Gerando...
                    </>
                  ) : (
                    'Concluir'
                  )}

                </Button>
                <Button type="button" onClick={handleCopy} disabled={ !tableResult || tableResult.length === 0 }>
                  {copyButtonText}
                </Button>
            </div>
          </div>
        </form>

        {error && <div className="mt-6 text-center text-red-500">{error}</div>}
        {tableResult && (
          <div className="mt-8 p-4 rounded-lg flex-col items-center bg-input/30">
            <h2 className="text-xl font-bold mb-4 text-center">Resultado</h2>
            <pre onClick={handleCopy} className="text-center text-sm whitespace-pre font-mono">{tableResult}</pre>
          </div>
        )}
      </div>
      </body>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        Desenvolvido por <a target="_blank" href="https://lattes.cnpq.br/8288344655179899">Victor Matos</a> para a <a target="_blank" href="https://www.ufs.br/">Universidade Federal de Sergipe</a>.<br />
        rEspiro é uma marca em processo de registro. Todos os direitos reservados.
      </footer>
    </main>
  );
}