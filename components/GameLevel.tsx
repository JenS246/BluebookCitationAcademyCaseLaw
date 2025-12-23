import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, X, AlertCircle, Trophy, BookOpen, FileText, Briefcase, MousePointer2, Edit3 } from 'lucide-react';
import { Level, Question, QuestionType, SimulationToken } from '../types';

interface GameLevelProps {
  level: Level;
  onComplete: (xpEarned: number) => void;
  onExit: () => void;
}

const GameLevel: React.FC<GameLevelProps> = ({ level, onComplete, onExit }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  // Multiple Choice State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  // Build Citation State
  const [builtCitation, setBuiltCitation] = useState<string[]>([]);
  const [availableSegments, setAvailableSegments] = useState<{id: string, text: string}[]>([]);
  // Simulation State
  const [simTokens, setSimTokens] = useState<SimulationToken[]>([]);
  const [activeTokenId, setActiveTokenId] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string, rule: string } | null>(null);
  const [xpEarned, setXpEarned] = useState(0);

  const currentQuestion = level.questions[currentQIndex];

  // Initialize state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setFeedback(null);
    setActiveTokenId(null);
    
    if (currentQuestion.type === QuestionType.BUILD_CITATION) {
      const allSegments = [
        ...(currentQuestion.citationSegments || []),
        ...(currentQuestion.distractorSegments || [])
      ].map((text, i) => ({ id: `${i}-${text}`, text }));
      setAvailableSegments(allSegments.sort(() => Math.random() - 0.5));
      setBuiltCitation([]);
    } else if (currentQuestion.type === QuestionType.SIMULATION && currentQuestion.simulationTokens) {
      // Deep copy tokens to avoid mutation of source data
      setSimTokens(JSON.parse(JSON.stringify(currentQuestion.simulationTokens)));
    }
  }, [currentQuestion]);

  const handleMultipleChoiceSubmit = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentQuestion.correctOptionIndex;
    handleResult(isCorrect, 100);
  };

  const handleBuildSubmit = () => {
    const correctString = (currentQuestion.citationSegments || []).join(' ');
    const userString = builtCitation.join(' ');
    handleResult(userString === correctString, 150);
  };

  const handleSimulationSubmit = () => {
    // Check if all tokens match their correct value
    const isCorrect = simTokens.every(t => t.display === t.correct);
    handleResult(isCorrect, 200);
  };

  const handleResult = (isCorrect: boolean, potentialXp: number) => {
    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: 'Correct! ' + currentQuestion.explanation,
        rule: currentQuestion.ruleReference || ''
      });
      setXpEarned(prev => prev + potentialXp);
    } else {
      setFeedback({
        type: 'error',
        message: 'Incorrect. ' + currentQuestion.explanation,
        rule: currentQuestion.ruleReference || ''
      });
    }
  };

  const handleSegmentClick = (segment: {id: string, text: string}) => {
    setAvailableSegments(prev => prev.filter(s => s.id !== segment.id));
    setBuiltCitation(prev => [...prev, segment.text]);
  };

  const handleBuiltSegmentClick = (text: string, index: number) => {
    setBuiltCitation(prev => prev.filter((_, i) => i !== index));
    setAvailableSegments(prev => [...prev, { id: `returned-${Math.random()}`, text }]);
  };

  const handleTokenClick = (token: SimulationToken, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent closing dropdown immediately
    if (token.isLocked || feedback) return;
    setActiveTokenId(activeTokenId === token.id ? null : token.id);
  };

  const handleTokenOptionSelect = (token: SimulationToken, option: string) => {
    setSimTokens(prev => prev.map(t => t.id === token.id ? { ...t, display: option } : t));
    setActiveTokenId(null);
  };

  const handleNext = () => {
    if (currentQIndex < level.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      onComplete(xpEarned);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 bg-legal-800 border-b border-slate-700 flex items-center justify-between px-6 shrink-0 z-20">
        <button onClick={onExit} className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Exit
        </button>
        <div className="flex flex-col items-center">
           <h2 className="text-white font-serif font-bold">{level.title}</h2>
           <div className="flex gap-1 mt-1">
             {level.questions.map((_, i) => (
               <div 
                key={i} 
                className={`w-8 h-1 rounded-full ${i <= currentQIndex ? 'bg-legal-gold' : 'bg-slate-700'}`}
               ></div>
             ))}
           </div>
        </div>
        <div className="text-legal-gold font-mono font-bold">
          {xpEarned} Pts
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 md:p-6 w-full max-w-6xl mx-auto overflow-hidden">
        
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden h-full max-h-[calc(100vh-8rem)]">
          {/* Question Header */}
          <div className="bg-slate-50 p-6 border-b border-slate-200 shrink-0">
             <div className="flex items-center gap-3 mb-2">
                <span className="bg-legal-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Question {currentQIndex + 1}
                </span>
                {currentQuestion.type === QuestionType.SIMULATION && (
                  <span className="text-legal-accent text-xs font-bold uppercase tracking-wider flex items-center gap-1 animate-pulse">
                     <Briefcase className="w-3 h-3" /> Partner Review
                  </span>
                )}
             </div>
             <h3 className="text-xl md:text-2xl font-serif text-slate-800 leading-snug">
               {currentQuestion.prompt}
             </h3>
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-100 p-4 md:p-8 relative">
            
            {/* Standard Quiz Layout */}
            {currentQuestion.type === QuestionType.MULTIPLE_CHOICE && (
              <div className="max-w-3xl mx-auto space-y-4">
                {currentQuestion.options?.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={feedback !== null}
                    onClick={() => setSelectedOption(idx)}
                    className={`
                      w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 bg-white shadow-sm
                      ${selectedOption === idx 
                        ? 'border-legal-gold bg-yellow-50 text-legal-900' 
                        : 'border-white hover:border-blue-200 text-slate-600'
                      }
                      ${feedback && idx === currentQuestion.correctOptionIndex ? '!border-green-500 !bg-green-50 !opacity-100' : ''}
                      ${feedback && selectedOption === idx && idx !== currentQuestion.correctOptionIndex ? '!border-red-500 !bg-red-50' : ''}
                      ${feedback && idx !== currentQuestion.correctOptionIndex ? 'opacity-50' : ''}
                    `}
                  >
                    <div className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold flex-shrink-0
                      ${selectedOption === idx ? 'border-legal-gold text-legal-gold' : 'border-slate-300 text-slate-300'}
                    `}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-lg font-medium">{option}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Builder Layout */}
            {currentQuestion.type === QuestionType.BUILD_CITATION && (
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="min-h-[100px] p-6 bg-white rounded-xl border-2 border-dashed border-slate-300 flex flex-wrap gap-2 items-center shadow-inner">
                   {builtCitation.length === 0 && <span className="text-slate-400 italic flex items-center gap-2"><MousePointer2 className="w-4 h-4"/> Tap blocks below to build citation...</span>}
                   {builtCitation.map((text, i) => (
                     <button 
                       key={i} 
                       disabled={feedback !== null}
                       onClick={() => handleBuiltSegmentClick(text, i)}
                       className="bg-legal-800 text-white px-3 py-2 rounded-lg shadow-md font-mono text-sm hover:bg-red-500 transition-colors animate-fade-in"
                     >
                       {text}
                     </button>
                   ))}
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {availableSegments.map((seg) => (
                    <button
                      key={seg.id}
                      disabled={feedback !== null}
                      onClick={() => handleSegmentClick(seg)}
                      className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg shadow-sm hover:border-legal-accent hover:text-legal-accent hover:shadow-md transition-all font-mono text-sm"
                    >
                      {seg.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Simulation Layout */}
            {currentQuestion.type === QuestionType.SIMULATION && currentQuestion.caseFile && (
               <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[500px]">
                 {/* Left Panel: Case File */}
                 <div className="lg:w-1/3 bg-[#fdfbf7] p-6 rounded-lg shadow-md border border-[#e2d5b5] flex flex-col font-serif">
                    <div className="border-b-2 border-legal-900 pb-2 mb-4">
                       <h4 className="text-legal-900 font-bold uppercase tracking-widest text-xs">Source Document</h4>
                       <h2 className="text-xl font-bold text-legal-900 mt-1">Case File Abstract</h2>
                    </div>
                    <div className="space-y-4 text-sm text-slate-800">
                       <div>
                         <span className="block font-bold text-slate-500 text-xs uppercase">Case Name</span>
                         {currentQuestion.caseFile.title}
                       </div>
                       <div>
                         <span className="block font-bold text-slate-500 text-xs uppercase">Court & Date</span>
                         {currentQuestion.caseFile.court}, {currentQuestion.caseFile.date}
                       </div>
                       <div>
                         <span className="block font-bold text-slate-500 text-xs uppercase">Source</span>
                         <span className="font-mono bg-slate-100 px-1">{currentQuestion.caseFile.source}</span>
                       </div>
                       {currentQuestion.caseFile.history && (
                         <div className="bg-red-50 p-2 rounded border border-red-100">
                           <span className="block font-bold text-red-800 text-xs uppercase">Subsequent History</span>
                           {currentQuestion.caseFile.history}
                         </div>
                       )}
                       <div className="mt-4 pt-4 border-t border-[#e2d5b5] italic text-slate-600">
                         "{currentQuestion.caseFile.facts}"
                       </div>
                    </div>
                 </div>

                 {/* Right Panel: Editor */}
                 <div className="lg:w-2/3 flex flex-col">
                    <div className="bg-white rounded-t-lg border border-slate-300 p-2 flex items-center justify-between gap-2 bg-slate-50">
                       <div className="flex items-center gap-2">
                         <div className="flex gap-1">
                           <div className="w-3 h-3 rounded-full bg-red-400"></div>
                           <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                           <div className="w-3 h-3 rounded-full bg-green-400"></div>
                         </div>
                         <span className="text-xs text-slate-500 ml-2 font-mono">Draft_Brief_vFinal.docx</span>
                       </div>
                       <span className="text-xs font-bold text-blue-600 animate-pulse uppercase tracking-wider hidden sm:block">Interactive Mode</span>
                    </div>
                    
                    <div 
                      className="flex-1 bg-white border-x border-b border-slate-300 p-6 md:p-8 shadow-inner font-mono text-sm leading-loose relative text-slate-800" 
                      onClick={() => setActiveTokenId(null)}
                    >
                       <div className="mb-6 bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center gap-2 text-blue-800 text-xs md:text-sm">
                          <Edit3 className="w-4 h-4" />
                          <span><strong>Task:</strong> Click the highlighted boxes below to edit the citation format.</span>
                       </div>

                       <span className="text-slate-400 select-none block mb-4">... argument regarding the interpretation of the statute. See </span>
                       
                       <div className="inline-block bg-slate-50 p-4 rounded-lg border border-slate-200 w-full" onClick={(e) => e.stopPropagation()}>
                          {simTokens.map((token) => {
                             const isHidden = token.display === '[Remove Text]';
                             return (
                              <div key={token.id} className="relative inline-block mr-1.5 mb-2 align-middle">
                                 {!isHidden && (
                                   <button
                                     disabled={token.isLocked || feedback !== null}
                                     onClick={(e) => handleTokenClick(token, e)}
                                     className={`
                                       px-3 py-1.5 rounded-md border-2 transition-all text-sm font-bold
                                       ${token.isLocked 
                                         ? 'bg-transparent border-transparent text-slate-600 cursor-default px-1' 
                                         : 'bg-white border-blue-300 text-slate-900 shadow-sm hover:border-blue-500 hover:shadow-md cursor-pointer animate-pulse'
                                       }
                                       ${activeTokenId === token.id ? 'ring-2 ring-legal-gold border-legal-gold bg-white z-10 !animate-none' : ''}
                                       ${feedback ? (token.display === token.correct ? '!text-green-800 !border-green-500 !bg-green-50 !animate-none' : '!text-red-800 !border-red-500 !bg-red-50 line-through decoration-2 !animate-none') : ''}
                                     `}
                                   >
                                     {token.display}
                                   </button>
                                 )}
                                 {isHidden && (
                                    <span className="text-slate-300 text-xs italic mx-2">[Removed]</span>
                                 )}

                                 {/* Dropdown */}
                                 {activeTokenId === token.id && (
                                   <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                     <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-xs font-bold text-slate-500">Select Correction</div>
                                     {token.options.map((opt) => (
                                       <button
                                         key={opt}
                                         onClick={() => handleTokenOptionSelect(token, opt)}
                                         className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 border-b border-slate-50 last:border-0 text-slate-800 ${token.display === opt ? 'bg-blue-50 font-semibold text-blue-700' : ''}`}
                                       >
                                         {opt}
                                       </button>
                                     ))}
                                   </div>
                                 )}
                              </div>
                            );
                          })}
                       </div>
                       <span className="text-slate-400 select-none block mt-4"> The court reasoned that...</span>
                    </div>
                 </div>
               </div>
            )}

          </div>

          {/* Footer / Feedback Area */}
          <div className="bg-white p-6 border-t border-slate-200 shrink-0 z-10">
             {!feedback ? (
               <button
                 onClick={() => {
                   if (currentQuestion.type === QuestionType.MULTIPLE_CHOICE) handleMultipleChoiceSubmit();
                   if (currentQuestion.type === QuestionType.BUILD_CITATION) handleBuildSubmit();
                   if (currentQuestion.type === QuestionType.SIMULATION) handleSimulationSubmit();
                 }}
                 disabled={
                   (currentQuestion.type === QuestionType.MULTIPLE_CHOICE && selectedOption === null) || 
                   (currentQuestion.type === QuestionType.BUILD_CITATION && builtCitation.length === 0)
                 }
                 className="w-full bg-legal-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-legal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
               >
                 {currentQuestion.type === QuestionType.SIMULATION ? 'Submit Brief for Review' : 'Submit Answer'}
               </button>
             ) : (
               <div className={`rounded-xl p-6 ${feedback.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${feedback.type === 'success' ? 'bg-green-200' : 'bg-red-200'}`}>
                      {feedback.type === 'success' ? <Check className="w-6 h-6 text-green-700" /> : <X className="w-6 h-6 text-red-700" />}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-lg mb-1 ${feedback.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                        {feedback.type === 'success' ? 'Correct!' : 'Incorrect'}
                      </h4>
                      <p className="text-slate-700 leading-relaxed mb-3">{feedback.message}</p>
                      {feedback.rule && (
                        <div className="inline-flex items-center gap-2 bg-white/50 px-3 py-1 rounded text-sm font-semibold text-slate-600">
                          <BookOpen className="w-4 h-4" /> Reference: {feedback.rule}
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={handleNext}
                    className="mt-6 w-full bg-legal-accent text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    {currentQIndex < level.questions.length - 1 ? 'Next Question' : 'Finish Level'} <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
               </div>
             )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default GameLevel;