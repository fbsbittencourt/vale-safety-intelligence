import React, { useState } from 'react';
import axios from 'axios';
import { Send, Loader2, MapPin, FileText } from 'lucide-react';

export default function SafetyForm({ onSuccess }) {
    const [incidente, setIncidente] = useState({ setor: '', descricao: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/analisar-seguranca', incidente);

            // O backend retorna um JSON dentro de uma string na chave 'analise'
            const analiseProcessada = JSON.parse(response.data.analise);

            // Enviamos para o componente pai (App.jsx) os dados processados + o setor original
            onSuccess({
                ...analiseProcessada,
                setor: incidente.setor
            });

            // Limpa o formulário após o sucesso
            setIncidente({ setor: '', descricao: '' });
        } catch (err) {
            console.error("Erro na comunicação com o servidor:", err);
            setError("Não foi possível processar a análise. Verifique se o servidor Python está rodando.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo: Setor */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" /> Setor Operacional
                </label>
                <input
                    required
                    value={incidente.setor}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all placeholder:text-slate-400 text-slate-600 font-medium"
                    placeholder="Ex: Pátio de Estocagem - Porto de Tubarão"
                    onChange={(e) => setIncidente({ ...incidente, setor: e.target.value })}
                />
            </div>

            {/* Campo: Descrição */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <FileText size={16} className="text-slate-400" /> Descrição Detalhada
                </label>
                <textarea
                    required
                    value={incidente.descricao}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl h-40 outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all placeholder:text-slate-400 text-slate-600 font-medium resize-none"
                    placeholder="Descreva a anomalia, ruído ou risco identificado..."
                    onChange={(e) => setIncidente({ ...incidente, descricao: e.target.value })}
                />
            </div>

            {/* Alerta de Erro */}
            {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg font-medium">
                    {error}
                </div>
            )}

            {/* Botão de Submissão */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100 shadow-lg shadow-slate-200"
                style={{ backgroundColor: '#00949B' }}
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Analisando com IA...
                    </>
                ) : (
                    <>
                        <Send size={18} />
                        Enviar para Análise
                    </>
                )}
            </button>
        </form>
    );
}
