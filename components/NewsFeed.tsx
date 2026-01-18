import React, { useState } from 'react';
import { Newspaper, Calendar, ArrowRight, ShieldCheck, Globe2, Layers, Bitcoin, Fuel } from 'lucide-react';
import { EXPANDED_NEWS_ITEMS, TRUSTED_SOURCES } from '../constants';

const NewsFeed: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'Tümü' | 'Türkiye' | 'Global' | 'Emtia' | 'Kripto'>('Tümü');
  const [hoveredVerificationId, setHoveredVerificationId] = useState<number | null>(null);

  const filteredNews = activeCategory === 'Tümü' 
    ? EXPANDED_NEWS_ITEMS 
    : EXPANDED_NEWS_ITEMS.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'Tümü', icon: <Layers className="w-4 h-4" /> },
    { id: 'Türkiye', icon: <img src="https://flagcdn.com/tr.svg" className="w-4 h-4 rounded-full object-cover" alt="TR" /> },
    { id: 'Global', icon: <Globe2 className="w-4 h-4" /> },
    { id: 'Emtia', icon: <Fuel className="w-4 h-4" /> },
    { id: 'Kripto', icon: <Bitcoin className="w-4 h-4" /> },
  ];

  return (
    <div className="my-16 scroll-mt-24" id="news">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
           <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Newspaper className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Doğrulanmış Ekonomi Gündemi</h3>
          </div>
          <p className="text-gray-500 text-sm max-w-lg">
            Yapay zeka algoritmamız, 15+ farklı uluslararası kaynaktan gelen verileri tarar, 
            çapraz kontrol yapar ve size en doğru haberi sunar.
          </p>
        </div>

        <div className="flex p-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.id 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat.icon}
              {cat.id}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredNews.map((news) => (
          <div key={news.id} className="group flex flex-col justify-between p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            
            {/* Top Badge Row */}
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-2">
                 {/* Source Flag */}
                 <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-50 border border-gray-100">
                    <img 
                      src={`https://flagcdn.com/${news.originCountry.toLowerCase()}.svg`} 
                      className="w-4 h-3 rounded-[2px] object-cover shadow-sm" 
                      alt={news.originCountry}
                    />
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{news.originCountry}</span>
                 </div>
                 {/* Translation Badge */}
                 {news.originCountry !== 'TR' && (
                    <span className="text-[10px] px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md font-medium border border-indigo-100">
                      EN → TR Çeviri
                    </span>
                 )}
               </div>

               {/* Verification Badge (Interactive) */}
               <div 
                 className="relative"
                 onMouseEnter={() => setHoveredVerificationId(news.id)}
                 onMouseLeave={() => setHoveredVerificationId(null)}
               >
                 <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-100 cursor-help">
                   <ShieldCheck className="w-3.5 h-3.5" />
                   <span className="text-xs font-bold">% {news.verificationScore}</span>
                 </div>
                 
                 {/* Tooltip for Verified Sources */}
                 {hoveredVerificationId === news.id && (
                   <div className="absolute top-8 right-0 w-64 p-3 bg-gray-900 text-white text-xs rounded-xl z-20 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                     <div className="font-bold mb-2 pb-2 border-b border-gray-700 flex justify-between">
                       <span>Doğrulayan Kaynaklar</span>
                       <span className="text-green-400">{news.verifyingSourcesCount}/15</span>
                     </div>
                     <ul className="space-y-1 text-gray-300">
                       {TRUSTED_SOURCES.slice(0, 5).map((source, i) => (
                         <li key={i} className="flex items-center gap-2">
                           <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                           {source}
                         </li>
                       ))}
                       <li className="italic text-gray-500 mt-1">+ {news.verifyingSourcesCount - 5} diğer kaynak</li>
                     </ul>
                   </div>
                 )}
               </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 font-medium">
                 <span className="text-gray-500">{news.originSource}</span>
                 <span>•</span>
                 <span className="flex items-center"><Calendar className="w-3 h-3 mr-1"/> {news.date}</span>
              </div>

              <h4 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                {news.title}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                {news.summary}
              </p>
            </div>
            
            {/* Footer Action */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{news.category}</span>
              <button className="flex items-center text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors group/btn">
                Analizi Oku
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;