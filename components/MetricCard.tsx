import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, ShieldCheck } from 'lucide-react';
import { Metric } from '../types';

interface MetricCardProps {
  metric: Metric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const isPositive = metric.change > 0;
  const isNegative = metric.change < 0;
  const isNeutral = metric.change === 0;

  const colorMap = {
    blue: 'bg-blue-500 shadow-blue-500/30',
    red: 'bg-red-500 shadow-red-500/30',
    yellow: 'bg-yellow-400 shadow-yellow-400/30',
    green: 'bg-green-500 shadow-green-500/30',
  };

  let trendColorClass = 'text-gray-500';
  if (isPositive) {
    trendColorClass = metric.isPositiveBad ? 'text-red-500' : 'text-green-500';
  } else if (isNegative) {
    trendColorClass = metric.isPositiveBad ? 'text-green-500' : 'text-red-500';
  }

  return (
    <div className="relative overflow-visible rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-xl group">
      
      {/* Verification Badge (Absolute Top Right) */}
      {metric.verifiedBy && (
        <div className="absolute top-3 right-3 group/tooltip">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 cursor-help">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-900 text-white text-[10px] p-2 rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-20 shadow-lg">
             <p className="font-bold text-green-400 mb-1">✓ Doğrulanmış Veri</p>
             <p className="text-gray-300">Bu veri {metric.verifiedBy} farklı resmi kaynaktan (TÜİK, TCMB, Eurostat...) teyit edilmiştir.</p>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{metric.title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{metric.value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[metric.color]} text-white shadow-md mt-4`}>
          {metric.icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        <span className={`flex items-center text-sm font-semibold ${trendColorClass}`}>
          {isPositive && <ArrowUpRight className="w-4 h-4 mr-1" />}
          {isNegative && <ArrowDownRight className="w-4 h-4 mr-1" />}
          {isNeutral && <Minus className="w-4 h-4 mr-1" />}
          {Math.abs(metric.change)}%
        </span>
        <span className="text-xs text-gray-400 ml-2">Geçen aya göre</span>
      </div>
      
      {/* Background decoration */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10 blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none ${colorMap[metric.color].split(' ')[0]}`}></div>
    </div>
  );
};

export default MetricCard;