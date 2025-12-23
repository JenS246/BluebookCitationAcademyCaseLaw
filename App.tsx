import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import GameLevel from './components/GameLevel';
import LevelComplete from './components/LevelComplete';
import { LEVELS } from './data/gameData';
import { UserState, RANKS } from './types';

// Simple persistence
const loadState = (): UserState => {
  const saved = localStorage.getItem('citationAcademyState');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    currentLevelIndex: 0,
    xp: 0,
    completedLevels: [],
    rank: RANKS[0].name
  };
};

const saveState = (state: UserState) => {
  localStorage.setItem('citationAcademyState', JSON.stringify(state));
};

enum AppView {
  WELCOME,
  DASHBOARD,
  GAME,
  LEVEL_COMPLETE
}

function App() {
  const [view, setView] = useState<AppView>(AppView.WELCOME);
  const [userState, setUserState] = useState<UserState>(loadState());
  const [activeLevelId, setActiveLevelId] = useState<string | null>(null);
  const [lastXpEarned, setLastXpEarned] = useState(0);

  // Update Rank based on XP
  useEffect(() => {
    const newRank = RANKS.slice().reverse().find(r => userState.xp >= r.minXp)?.name || RANKS[0].name;
    if (newRank !== userState.rank) {
      setUserState(prev => {
        const newState = { ...prev, rank: newRank };
        saveState(newState);
        return newState;
      });
    }
  }, [userState.xp]);

  const handleStart = () => {
    setView(AppView.DASHBOARD);
  };

  const handleSelectLevel = (levelId: string) => {
    setActiveLevelId(levelId);
    setView(AppView.GAME);
  };

  const handleLevelComplete = (xp: number) => {
    setLastXpEarned(xp);
    
    setUserState(prev => {
      // Add XP
      const newXp = prev.xp + xp;
      
      // Unlock next level if this was the latest unlocked one
      const currentIdx = LEVELS.findIndex(l => l.id === activeLevelId);
      const isNewComplete = !prev.completedLevels.includes(activeLevelId!);
      
      let nextLevelIndex = prev.currentLevelIndex;
      if (isNewComplete && currentIdx === prev.currentLevelIndex && currentIdx < LEVELS.length - 1) {
        nextLevelIndex = currentIdx + 1;
      }

      const newState = {
        ...prev,
        xp: newXp,
        completedLevels: isNewComplete ? [...prev.completedLevels, activeLevelId!] : prev.completedLevels,
        currentLevelIndex: nextLevelIndex
      };
      
      saveState(newState);
      return newState;
    });

    setView(AppView.LEVEL_COMPLETE);
  };

  const handleLevelExit = () => {
    setView(AppView.DASHBOARD);
    setActiveLevelId(null);
  };

  const handleNextLevel = () => {
    const currentIdx = LEVELS.findIndex(l => l.id === activeLevelId);
    if (currentIdx < LEVELS.length - 1) {
      const nextLevel = LEVELS[currentIdx + 1];
      setActiveLevelId(nextLevel.id);
      setView(AppView.GAME);
    } else {
      setView(AppView.DASHBOARD);
    }
  };

  // Render Logic
  switch (view) {
    case AppView.WELCOME:
      return <WelcomeScreen onStart={handleStart} />;
    
    case AppView.DASHBOARD:
      return (
        <Dashboard 
          levels={LEVELS} 
          userState={userState} 
          onSelectLevel={handleSelectLevel} 
        />
      );

    case AppView.GAME:
      const level = LEVELS.find(l => l.id === activeLevelId);
      if (!level) return <div>Error loading level</div>;
      return (
        <GameLevel 
          level={level} 
          onComplete={handleLevelComplete} 
          onExit={handleLevelExit} 
        />
      );

    case AppView.LEVEL_COMPLETE:
      const currentIdx = LEVELS.findIndex(l => l.id === activeLevelId);
      const isLast = currentIdx === LEVELS.length - 1;
      return (
        <LevelComplete 
          xpEarned={lastXpEarned} 
          onHome={() => setView(AppView.DASHBOARD)} 
          onNextLevel={handleNextLevel}
          isLastLevel={isLast}
        />
      );

    default:
      return <div>Unknown State</div>;
  }
}

export default App;