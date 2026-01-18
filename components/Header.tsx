import React from 'react';
import { BarChart3, UserCircle2, LogOut } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onLoginClick, isLoggedIn, onLogout }) => {
  
  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate('market')}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20 text-white group-hover:scale-105 transition-transform duration-300">
               <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-blue-700 transition-colors">
                Eko<span className="text-blue-600">Veri</span>
              </h1>
            </div>
          </div>

          {/* Navigation / Actions */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={(e) => handleNavClick(e, 'market')}
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
            >
              Piyasa
            </button>
            <button 
              onClick={(e) => handleNavClick(e, 'news')}
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
            >
              Haberler
            </button>
            <button 
              onClick={(e) => handleNavClick(e, 'reports')}
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full"
            >
              Raporlar
            </button>
            
            <div className="pl-4 border-l border-gray-200">
              {isLoggedIn ? (
                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
                  <span className="text-sm font-semibold text-gray-700">Can Yılmaz</span>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    title="Çıkış Yap"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                  <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-md">
                    <span className="text-xs font-bold">CY</span>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={onLoginClick}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 active:scale-95 flex items-center gap-2"
                >
                  <UserCircle2 className="w-4 h-4" />
                  Giriş Yap
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;