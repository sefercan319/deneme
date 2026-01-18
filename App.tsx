import React, { useState } from 'react';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import ChartSection from './components/ChartSection';
import DataTable from './components/DataTable';
import AIAnalysis from './components/AIAnalysis';
import SourceFooter from './components/SourceFooter';
import NewsFeed from './components/NewsFeed';
import LoginModal from './components/LoginModal';
import GlobalTicker from './components/GlobalTicker';
import GlobalPulse from './components/GlobalPulse';
import { METRICS } from './constants';
import { ShieldCheck } from 'lucide-react';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden flex flex-col">
      
      {/* 1. Global Ticker (Very Top) */}
      <GlobalTicker />

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[#f8f9fa]"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-blue-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70"></div>
        <div className="absolute top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-red-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-yellow-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-60"></div>
      </div>

      <Header 
        onNavigate={scrollToSection} 
        onLoginClick={() => setIsLoginModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
      />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={() => setIsLoggedIn(true)}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* MARKET SECTION */}
        <div id="market" className="scroll-mt-24">
          
          {/* Enhanced Hero Section */}
          <div className="mb-12 text-center lg:text-left flex flex-col lg:flex-row items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-4 animate-fade-in-up">
                 <ShieldCheck className="w-3.5 h-3.5" />
                 EkoVeri Trust™ Teknolojisi ile Doğrulandı
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4 leading-tight">
                Global Ekonomi <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  İstihbarat Paneli
                </span>
              </h2>
              <p className="max-w-2xl text-lg text-gray-500 leading-relaxed">
                TÜİK, Bloomberg, Reuters ve 15+ uluslararası kaynaktan anlık teyitli makroekonomik veriler ve yapay zeka analizleri.
              </p>
            </div>
            <div className="text-right hidden lg:block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 shadow-sm border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Global Veri Akışı Aktif
              </span>
            </div>
          </div>

          {/* 2. Global Pulse (New Visualization) */}
          <GlobalPulse />

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {METRICS.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Charts Section */}
          <ChartSection />
        </div>

        {/* NEWS SECTION */}
        <NewsFeed />

        {/* REPORTS/ANALYSIS SECTION */}
        <div id="reports" className="scroll-mt-24">
           {/* AI Analysis Section */}
           <AIAnalysis />

           {/* Detailed Data Table */}
           <DataTable />
        </div>

        {/* Sources & Footer */}
        <SourceFooter />

        {/* Simple Copyright Footer */}
        <footer className="py-6 text-center text-sm text-gray-400 border-t border-gray-200/50 flex flex-col items-center gap-2">
          <p>© 2024 EkoVeri Analitik. Global Financial Intelligence.</p>
          <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
             {/* Mock Partner Logos (Just text/circles for now) */}
             <span className="text-xs font-bold">Bloomberg Partner</span>
             <span className="text-xs font-bold">Reuters API</span>
             <span className="text-xs font-bold">TÜİK Verified</span>
          </div>
        </footer>

      </main>
    </div>
  );
}

export default App;