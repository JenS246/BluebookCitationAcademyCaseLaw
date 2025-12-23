import React from 'react';
import { Trophy, Home, ArrowRight } from 'lucide-react';

interface LevelCompleteProps {
  xpEarned: number;
  onHome: () => void;
  onNextLevel: () => void;
  isLastLevel: boolean;
}

const LevelComplete: React.FC<LevelCompleteProps> = ({ xpEarned, onHome, onNextLevel, isLastLevel }) => {
  return (
    <div className="min-h-screen bg-legal-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-[0_0_50px_rgba(255,255,255,0.1)] animate-fade-in-up">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <Trophy className="w-12 h-12 text-yellow-600" />
        </div>
        
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">Level Complete!</h2>
        <p className="text-slate-500 mb-8">Excellent work, Counselor.</p>
        
        <div className="bg-legal-50 p-6 rounded-2xl mb-8 border border-slate-100">
          <span className="block text-sm text-slate-400 uppercase tracking-wider mb-1">Reputation Earned</span>
          <span className="text-4xl font-black text-legal-gold">+{xpEarned}</span>
        </div>

        <div className="space-y-3">
          {!isLastLevel && (
            <button 
              onClick={onNextLevel}
              className="w-full bg-legal-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-legal-800 transition-all flex items-center justify-center gap-2"
            >
              Next Challenge <ArrowRight className="w-5 h-5" />
            </button>
          )}
          
          <button 
            onClick={onHome}
            className="w-full bg-white border-2 border-slate-200 text-slate-600 py-4 rounded-xl font-bold text-lg hover:border-slate-400 hover:text-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" /> Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelComplete;