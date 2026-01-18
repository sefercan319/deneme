import React from 'react';
import { TABLE_DATA } from '../constants';

const DataTable: React.FC = () => {
  return (
    <div className="rounded-3xl bg-white/60 backdrop-blur-lg border border-white/50 shadow-lg overflow-hidden my-8">
      <div className="p-6 border-b border-gray-100 bg-white/40">
        <h3 className="text-lg font-bold text-gray-800">Detaylı Ekonomik Göstergeler</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">İndikatör</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Türkiye</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Dünya (Ort.)</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum Analizi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {TABLE_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{row.indicator}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">{row.turkey}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.world}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${row.status.includes('Kritik') ? 'bg-red-100 text-red-800' : 
                      row.status.includes('İyileşme') || row.status.includes('Dengeli') ? 'bg-green-100 text-green-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;