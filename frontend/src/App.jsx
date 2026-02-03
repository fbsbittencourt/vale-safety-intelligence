import React, { useState } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

import SafetyTable from './components/SafetyTable';
import AnalysisModal from './components/AnalysisModal';
import SafetyForm from './components/SafetyForm';
import AnalysisDetails from './components/AnalysisDetails';

function App() {
  const [analyses, setAnalyses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const handleNewAnalysis = (newAnalysis) => {
    const analysisWithMeta = {
      ...newAnalysis,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    setAnalyses([analysisWithMeta, ...analyses]);
    setIsFormOpen(false);
  };

  const handleViewDetails = (analysis) => {
    setSelectedAnalysis(analysis);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
              Vale <span className="text-amber-500 not-italic">Safety</span>
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Intelligence Dashboard</p>
          </div>
          
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            <Plus size={20} /> Nova Análise
          </button>
        </header>

        <main>
          <SafetyTable data={analyses} onView={handleViewDetails} />
        </main>

        {/* MODAL DE CADASTRO */}
        <AnalysisModal 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
          title="Novo Registro de Ocorrência"
        >
          <SafetyForm onSuccess={handleNewAnalysis} />
        </AnalysisModal>

        {/* MODAL DE DETALHES */}
        <AnalysisModal 
          isOpen={isDetailsOpen} 
          onClose={() => setIsDetailsOpen(false)} 
          title="Relatório Técnico de Segurança"
        >
          <AnalysisDetails data={selectedAnalysis} />
        </AnalysisModal>
      </div>
    </div>
  );
}

export default App;
