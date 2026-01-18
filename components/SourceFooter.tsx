import React from 'react';
import { Database, ExternalLink, ShieldCheck } from 'lucide-react';
import { DATA_SOURCES } from '../constants';

const SourceFooter: React.FC = () => {
  return (
    <section className="mt-16 mb-8">
      <div className="rounded-2xl bg-white/50 border border-white/60 p-8 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-6 text-gray-800">
           <Database className="w-5 h-5 text-blue-600" />
           <h3 className="text-lg font-bold">Veri Kaynakları ve Metodoloji</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DATA_SOURCES.map((source, idx) => (
            <div key={idx} className="group relative p-4 rounded-xl bg-white/40 border border-white/50 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900 text-sm">{source.name}</h4>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                {source.description}
              </p>
              <div className="flex items-center text-[10px] text-gray-400 font-medium">
                <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />
                Son Güncelleme: {source.lastUpdated}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200/50 text-center">
          <p className="text-xs text-gray-400 max-w-3xl mx-auto">
            Bu platformdaki veriler, kamuya açık resmi kaynaklardan derlenmiştir. EkoVeri Analitik, verilerin anlık doğruluğunu garanti etmez. 
            Finansal kararlar almadan önce lütfen resmi kurumların (TCMB, TÜİK, vb.) orijinal raporlarını inceleyiniz.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SourceFooter;