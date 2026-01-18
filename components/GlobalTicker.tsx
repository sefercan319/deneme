import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { TICKER_DATA } from '../constants';

const GlobalTicker: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white overflow-hidden py-2 relative z-[60] border-b border-gray-800">
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
      
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Render twice for seamless loop */}
        {[...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 mx-6 text-sm font-medium">
            <span className="text-gray-400">{item.symbol}</span>
            <span className="text-white font-bold">{item.value}</span>
            <span className={`flex items-center text-xs ${item.isUp ? 'text-green-400' : 'text-red-400'}`}>
              {item.isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              %{Math.abs(item.change)}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default GlobalTicker;