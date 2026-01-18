import React, { useState } from 'react';
import { X, Lock, Mail, Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Decorative header blob */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-10"></div>
        
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Giriş Yap</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-posta Adresi</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  required
                  placeholder="ornek@ekoveri.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 focus:ring-4 focus:ring-gray-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Hesabıma Eriş'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Hesabınız yok mu? <a href="#" className="text-blue-600 font-semibold hover:underline">Kayıt Ol</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;