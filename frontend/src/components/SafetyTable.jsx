import React from 'react';
import { Eye, Clock, AlertCircle } from 'lucide-react';

export default function SafetyTable({ data, onView }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Data/Hora</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Setor</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Risco</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                <AlertCircle className="mx-auto mb-2 opacity-20" size={32} />
                Nenhuma análise registrada no turno atual.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 text-slate-500 font-medium flex items-center gap-2">
                  <Clock size={14} className="text-slate-300" /> {item.timestamp}
                </td>
                <td className="px-6 py-4 text-slate-700 font-bold">{item.setor}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    item.nivel_risco === 'Crítico' || item.nivel_risco === 'Alto'
                    ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {item.nivel_risco}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onView(item)}
                    className="p-2 hover:bg-amber-100 hover:text-amber-700 rounded-lg text-slate-400 transition-all"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
