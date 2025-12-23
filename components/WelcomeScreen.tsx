import React from 'react';
import { BookOpen, Scale, Award } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-legal-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-legal-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-legal-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl w-full z-10 text-center space-y-8">
        <div className="flex justify-center mb-6">
          <div className="bg-legal-800 p-6 rounded-full border-4 border-legal-gold shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <Scale className="w-20 h-20 text-legal-gold" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-black text-white tracking-tight">
          <span className="text-legal-gold">Citation</span> Academy
        </h1>
        <p className="text-2xl text-slate-300 font-light tracking-widest uppercase border-b border-slate-700 pb-8 inline-block">
          Case Law Edition
        </p>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Welcome. The Academy awaits. Master the Bluebook (22nd Ed.) rules for case law <span className="text-legal-gold font-bold">to ascend the ranks of citation credibility</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
          <div className="bg-legal-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
            <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Learn Rules</h3>
            <p className="text-sm text-slate-400">Master Rule 10, Parties, Reporters, and History.</p>
          </div>
          <div className="bg-legal-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Build Reputation</h3>
            <p className="text-sm text-slate-400">Accurately cite cases to advance your professional standing.</p>
          </div>
          <div className="bg-legal-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
            <Scale className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Conquer Cases</h3>
            <p className="text-sm text-slate-400">State, Federal, Unreported, and more.</p>
          </div>
        </div>

        <button 
          onClick={onStart}
          className="group relative mt-12 px-12 py-5 bg-legal-gold hover:bg-yellow-500 text-legal-900 font-black text-xl tracking-wider rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.5)] overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            ENTER THE ACADEMY
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;