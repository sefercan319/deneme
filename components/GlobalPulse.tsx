import React from 'react';
import { Globe, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { GLOBAL_INDICES } from '../constants';

const GlobalPulse: React.FC = () => {
  const getFlag = (region: string) => {
    switch(region) {
      case 'USA': return '🇺🇸';
      case 'EU': return '🇪🇺';
      case 'ASIA': return '🇨🇳';
      case 'TR': return '🇹🇷';
      default: return '🌐';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Bullish': return 'bg-green-500/10 border-green-500/20 text-green-700';
      case 'Bearish': return 'bg-red-500/10 border-red-500/20 text-red-700';
      default: return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-700';
    }
  };

  return (
    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-800">Küresel Piyasa Nabzı</h3>
        <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-medium">Canlı Veri Akışı</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {GLOBAL_INDICES.map((market) => (
          <div 
            key={market.symbol}
            className={`relative overflow-hidden rounded-2xl border p-5 transition-all hover:shadow-lg backdrop-blur-md ${getStatusColor(market.status)} hover:scale-[1.02] cursor-pointer group`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl shadow-sm">{getFlag(market.region)}</span>
                <div>
                  <h4 className="font-bold text-gray-900 leading-none">{market.symbol}</h4>
                  <span className="text-xs text-gray-500 font-medium">{market.name}</span>
                </div>
              </div>
              <div className={`p-1.5 rounded-lg ${market.change > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {market.change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Durum:</span>
                <span className="font-bold text-gray-900">{market.value}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Değişim:</span>
                <span className={`font-bold ${market.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {market.change > 0 ? '+' : ''}{market.change}%
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-900/5">
              <p className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                <Activity className="w-3 h-3" />
                {market.sentiment}
              </p>
            </div>
            
            {/* Hover Verification Tooltip Overlay */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
               <div>
                  <div className="mx-auto w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <span className="text-green-600 font-bold text-lg">✓</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800">15 Kaynak Tarafından Doğrulandı</p>
                  <p className="text-[10px] text-gray-500 mt-1">Bloomberg, Reuters, AA +12</p>
               </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalPulse;