import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, RefreshCw } from 'lucide-react';
import { getEconomicAnalysis } from '../services/geminiService';
import { MarketAnalysisResponse } from '../types';
import { METRICS } from '../constants';

const AIAnalysis: React.FC = () => {
  const [analysis, setAnalysis] = useState<MarketAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      // Create a prompt string from constants
      const metricsSummary = METRICS.map(m => `${m.title}: ${m.value}`).join(', ');
      const result = await getEconomicAnalysis(metricsSummary);
      setAnalysis(result);
    } catch (err) {
      setError("Analiz yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    if(!analysis) {
       // Optional: Auto fetch on load, or let user click button to save tokens.
       // Let's auto fetch for "Dashboard" feel.
       fetchAnalysis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl p-8 my-10">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-pink-500 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
               <Sparkles className="w-6 h-6 text-yellow-300" />
             </div>
             <h2 className="text-2xl font-bold">Yapay Zeka Piyasa Analizi</h2>
          </div>
          <button 
            onClick={fetchAnalysis}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors backdrop-blur disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
            {loading ? 'Analiz Ediliyor...' : 'Yenile'}
          </button>
        </div>

        {loading ? (
           <div className="space-y-4 animate-pulse">
             <div className="h-4 bg-white/20 rounded w-3/4"></div>
             <div className="h-4 bg-white/20 rounded w-1/2"></div>
             <div className="h-4 bg-white/20 rounded w-full"></div>
           </div>
        ) : error ? (
           <div className="p-4 bg-red-500/30 rounded-xl border border-red-500/50">
             {error}
           </div>
        ) : analysis ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-blue-200 uppercase text-xs font-bold tracking-wider mb-2">Özet Durum</h4>
              <p className="text-lg leading-relaxed text-blue-50 font-light">
                {analysis.summary}
              </p>
              
              <h4 className="text-blue-200 uppercase text-xs font-bold tracking-wider mt-6 mb-2">6 Aylık Öngörü</h4>
              <p className="text-sm text-blue-100 opacity-90">
                {analysis.outlook}
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
               <h4 className="text-yellow-300 uppercase text-xs font-bold tracking-wider mb-4">Temel Risk Faktörleri</h4>
               <ul className="space-y-3">
                 {analysis.risks.map((risk, idx) => (
                   <li key={idx} className="flex items-start gap-3">
                     <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></span>
                     <span className="text-sm text-blue-50">{risk}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        ) : null}
        
        <div className="mt-6 flex items-center gap-2 opacity-60 text-xs">
           <span className="px-2 py-0.5 border border-white/30 rounded">Gemini 3 Flash</span>
           <span>tarafından oluşturulmuştur. Finansal yatırım tavsiyesi değildir.</span>
        </div>

      </div>
    </div>
  );
};

export default AIAnalysis;