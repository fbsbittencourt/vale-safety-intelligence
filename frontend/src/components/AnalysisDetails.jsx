import React from 'react';
import { CheckCircle2, ShieldAlert, BookOpen } from 'lucide-react';

export default function AnalysisDetails({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Cabeçalho de Identificação */}
      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Setor Identificado</p>
          <h4 className="text-slate-900 font-bold">{data.setor}</h4>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gravidade</p>
          <span className={`text-xs font-bold uppercase ${data.nivel_risco === 'Crítico' || data.nivel_risco === 'Alto' ? 'text-red-600' : 'text-amber-600'}`}>
            {data.nivel_risco}
          </span>
        </div>
      </div>
      
      {/* Bloco de Normas Regulamentadoras (O que faltava) */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 flex items-center gap-1">
          <BookOpen size={12} /> Normas Regulamentadoras Aplicáveis
        </p>
        <div className="flex flex-wrap gap-2">
          {data.normas && data.normas.map((nr, idx) => (
            <span 
              key={idx} 
              className="bg-slate-200 text-slate-700 px-2 py-1 rounded-md text-[10px] font-black border border-slate-300 shadow-sm"
            >
              {nr}
            </span>
          ))}
        </div>
      </div>

      {/* Resumo Técnico */}
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase">Parecer da Inteligência</p>
        <p className="text-sm text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-100 italic">
          "{data.resumo}"
        </p>
      </div>

      {/* Plano de Ação */}
      <div className="bg-white border-l-4 border-amber-500 p-6 shadow-sm rounded-r-xl">
        <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-amber-500" /> Plano de Ação Recomendado
        </h4>
        <ul className="space-y-3">
          {data.plano_acao && data.plano_acao.map((passo, idx) => (
            <li key={idx} className="flex gap-3 text-sm text-slate-600">
              <span className="font-bold text-amber-600">{idx + 1}.</span>
              {passo}
            </li>
          ))}
        </ul>
      </div>

      {/* EPIs */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
        <div className="p-2 bg-blue-500 rounded-lg text-white shadow-md shadow-blue-100">
          <ShieldAlert size={16} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-blue-800 uppercase">EPIs de Segurança Obrigatórios</p>
          <p className="text-sm text-blue-700 font-medium mt-1">{data.recomendacao_epi}</p>
        </div>
      </div>
    </div>
  );
}
