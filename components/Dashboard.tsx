import React from 'react';
import { Lock, Unlock, CheckCircle, ChevronRight, User, Star } from 'lucide-react';
import { Level, UserState } from '../types';

interface DashboardProps {
  levels: Level[];
  userState: UserState;
  onSelectLevel: (levelId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ levels, userState, onSelectLevel }) => {
  const currentLevel = levels[userState.currentLevelIndex];
  
  // Calculate Progress for display
  const progressPercent = (userState.completedLevels.length / levels.length) * 100;

  return (
    <div className="min-h-screen bg-legal-900 text-white p-4 md:p-8">
      {/* Header / Stats Bar */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="bg-legal-800 rounded-2xl p-6 border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-legal-700 rounded-full flex items-center justify-center border-2 border-legal-gold">
              <User className="w-8 h-8 text-legal-gold" />
            </div>
            <div>
              <h2 className="text-sm text-slate-400 uppercase tracking-wider">Current Rank</h2>
              <h1 className="text-2xl font-serif font-bold text-white">{userState.rank}</h1>
            </div>
          </div>

          <div className="flex-1 w-full md:max-w-md">
             <div className="flex justify-between text-sm mb-2">
               <span className="text-slate-400">Total Reputation</span>
               <span className="text-legal-gold font-mono font-bold">{userState.xp} Pts</span>
             </div>
             <div className="w-full h-3 bg-legal-900 rounded-full overflow-hidden border border-slate-700">
               <div 
                 className="h-full bg-gradient-to-r from-legal-gold to-yellow-300 transition-all duration-1000"
                 style={{ width: `${progressPercent}%` }}
               ></div>
             </div>
             <div className="flex justify-between text-xs mt-1 text-slate-500">
               <span>Level {userState.currentLevelIndex + 1}</span>
               <span>Level {levels.length}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Level Grid */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3">
          <span className="w-8 h-1 bg-legal-gold inline-block"></span>
          Areas of Practice
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, index) => {
            const isLocked = index > userState.currentLevelIndex;
            const isCompleted = userState.completedLevels.includes(level.id);
            const isCurrent = index === userState.currentLevelIndex;

            return (
              <button
                key={level.id}
                disabled={isLocked}
                onClick={() => onSelectLevel(level.id)}
                className={`
                  relative group text-left h-64 rounded-xl p-6 border transition-all duration-300 flex flex-col justify-between overflow-hidden
                  ${isLocked 
                    ? 'bg-legal-900 border-slate-800 opacity-60 cursor-not-allowed' 
                    : isCurrent 
                      ? 'bg-legal-800 border-legal-gold ring-2 ring-legal-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]' 
                      : 'bg-legal-800 border-slate-700 hover:border-slate-500'
                  }
                `}
              >
                {/* Background gradient for color */}
                <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full ${level.color}`}></div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`
                      w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold
                      ${isLocked ? 'bg-slate-800 text-slate-600' : `${level.color} text-white`}
                    `}>
                      {index + 1}
                    </span>
                    {isCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
                    {isLocked && <Lock className="w-5 h-5 text-slate-600" />}
                    {isCurrent && <Unlock className="w-5 h-5 text-legal-gold animate-pulse" />}
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-slate-500' : 'text-white'}`}>
                    {level.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>
                    {level.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-700/50 flex justify-between items-center">
                   <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <Star className="w-3 h-3" />
                      {level.questions.length * 100} Pts
                   </div>
                   {!isLocked && (
                     <span className="flex items-center text-sm font-semibold text-legal-gold group-hover:translate-x-1 transition-transform">
                       Enter <ChevronRight className="w-4 h-4 ml-1" />
                     </span>
                   )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;