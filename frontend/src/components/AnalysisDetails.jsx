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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parecer da Inteligência - 2 Colunas */}
        <div className="lg:col-span-2 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
            <ShieldAlert size={14} className="text-amber-500" /> Parecer da Inteligência Artificial
          </p>
          <div className="relative">
            <div className="absolute -left-1 top-0 bottom-0 w-1 bg-amber-500 rounded-full opacity-20"></div>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100 italic">
              "{data.resumo}"
            </p>
          </div>
        </div>

        {/* Normas Regulamentadoras - 1 Coluna */}
        <div className="lg:col-span-1 p-9 bg-slate-50 rounded-2xl border border-slate-100 h-fit shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
            <BookOpen size={14} /> Compliance & Normas
          </p>
          <div className="flex flex-wrap gap-2">
            {data.normas && data.normas.map((nr, idx) => (
              <span
                key={idx}
                className="bg-white text-slate-700 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-slate-200 shadow-sm transition-all hover:border-amber-200 hover:text-amber-700"
              >
                {nr}
              </span>
            ))}
          </div>
        </div>

        {/* Plano de Ação - Largura Total (3 Colunas) */}
        <div className="lg:col-span-3 bg-white border border-slate-100 p-6 shadow-sm rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-amber-500" /> Diretrizes e Plano de Ação
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {data.plano_acao && data.plano_acao.map((passo, idx) => (
              <li key={idx} className="flex gap-4 text-sm text-slate-600 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-[10px] border border-amber-100">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{passo}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* EPIs - Largura Total (3 Colunas) */}
        <div className="lg:col-span-3 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-200">
              <ShieldAlert size={18} />
            </div>
            <p className="text-[10px] font-black text-blue-900 uppercase tracking-tight">EPIs Obrigatórios</p>
          </div>
          <div className="bg-white/60 p-4 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 font-medium leading-relaxed">{data.recomendacao_epi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
