import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { INFLATION_DATA, GDP_GROWTH_DATA, UNEMPLOYMENT_DATA } from '../constants';
import { EconomicDataPoint } from '../types';

interface ChartCardProps {
  title: string;
  subtitle: string;
  colorInfo: { color: string; label: string };
}

// Reusable Internal Component for Consistent Look
const ChartCard: React.FC<React.PropsWithChildren<ChartCardProps>> = ({ 
  title, 
  subtitle, 
  colorInfo, 
  children 
}) => (
  <div className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/50 shadow-xl p-6 lg:p-8 flex flex-col h-[400px]">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg lg:text-xl font-bold text-gray-800 flex items-center gap-3">
        <span className={`w-2 h-8 rounded-full`} style={{ backgroundColor: colorInfo.color }}></span>
        {title}
      </h3>
      <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-500 uppercase tracking-wide">
        {subtitle}
      </span>
    </div>
    <div className="flex-1 w-full min-h-0">
      {children}
    </div>
  </div>
);

const ChartSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 my-10">
      
      {/* 1. Inflation Chart (Red - Urgency) */}
      <ChartCard 
        title="Enflasyon Trendi" 
        subtitle="Yıllık TÜFE %"
        colorInfo={{ color: '#EA4335', label: 'Enflasyon' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={INFLATION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTurkeyInf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EA4335" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#EA4335" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            <Area 
              type="monotone" 
              dataKey="turkeyValue" 
              name="Türkiye (%)" 
              stroke="#EA4335" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTurkeyInf)" 
            />
            <Area 
              type="monotone" 
              dataKey="globalValue" 
              name="Dünya (%)" 
              stroke="#9CA3AF" 
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="transparent" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 2. GDP Growth Chart (Green - Growth) */}
      <ChartCard 
        title="GSYİH Büyüme" 
        subtitle="Yıllık Değişim"
        colorInfo={{ color: '#34A853', label: 'Büyüme' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={GDP_GROWTH_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
             <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} dy={10} />
             <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} />
             <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
             <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
             <Bar dataKey="turkeyValue" name="Türkiye" fill="#34A853" radius={[4, 4, 0, 0]} barSize={20} />
             <Bar dataKey="globalValue" name="Dünya Ort." fill="#FBBC05" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* 3. Unemployment Chart (Blue - People/Corporate) - This is the NEW chart */}
      <ChartCard 
        title="İşsizlik Oranı" 
        subtitle="Mevsimsel Arındırılmış"
        colorInfo={{ color: '#4285F4', label: 'İşsizlik' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={UNEMPLOYMENT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTurkeyEmp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4285F4" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#4285F4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} domain={[0, 'auto']} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            <Area 
              type="monotone" 
              dataKey="turkeyValue" 
              name="Türkiye (%)" 
              stroke="#4285F4" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTurkeyEmp)" 
            />
             <Area 
              type="monotone" 
              dataKey="globalValue" 
              name="OECD Ort. (%)" 
              stroke="#FBBC05" 
              strokeWidth={2}
              fillOpacity={0} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
};

export default ChartSection;