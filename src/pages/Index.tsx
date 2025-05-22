
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Lightbulb, RotateCcw, Trophy, Zap } from 'lucide-react';
import PuzzleGrid from '@/components/PuzzleGrid';
import AIHintSystem from '@/components/AIHintSystem';
import GameStats from '@/components/GameStats';

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [pattern, setPattern] = useState<number[]>([]);
  const [userSolution, setUserSolution] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Generate a pattern based on level difficulty
  const generatePattern = (level: number) => {
    const size = Math.min(3 + level, 6);
    const newPattern: number[] = [];
    
    // Create a mathematical sequence based on level
    for (let i = 0; i < size; i++) {
      if (level <= 2) {
        // Simple arithmetic progression
        newPattern.push((i * 2) % 8);
      } else if (level <= 4) {
        // Fibonacci-like sequence
        if (i < 2) newPattern.push(i + 1);
        else newPattern.push((newPattern[i-1] + newPattern[i-2]) % 8);
      } else {
        // More complex patterns
        newPattern.push((i * i + level) % 8);
      }
    }
    
    return newPattern;
  };

  const startGame = () => {
    setGameStarted(true);
    setPattern(generatePattern(currentLevel));
    setUserSolution([]);
    setIsCorrect(null);
    setShowHint(false);
  };

  const checkSolution = () => {
    const correct = pattern.every((val, idx) => val === userSolution[idx]);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + (currentLevel * 100) - (hintsUsed * 10));
      setTimeout(() => {
        setCurrentLevel(currentLevel + 1);
        setPattern(generatePattern(currentLevel + 1));
        setUserSolution([]);
        setIsCorrect(null);
        setShowHint(false);
      }, 2000);
    }
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setHintsUsed(0);
    setGameStarted(false);
    setPattern([]);
    setUserSolution([]);
    setIsCorrect(null);
    setShowHint(false);
  };

  const requestHint = () => {
    setShowHint(true);
    setHintsUsed(hintsUsed + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
              <Brain className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI Pattern Puzzle
              </h1>
              <p className="text-slate-400">Test your pattern recognition skills</p>
            </div>
          </div>
          
          <GameStats 
            level={currentLevel} 
            score={score} 
            hintsUsed={hintsUsed} 
          />
        </div>

        {!gameStarted ? (
          /* Welcome Screen */
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <div className="mb-6">
                <div className="inline-flex p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full mb-4">
                  <Zap className="h-12 w-12 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">AI-Powered Pattern Recognition</h2>
                <p className="text-slate-300 mb-6">
                  Decode complex patterns using logic and intuition. Our AI system will provide 
                  intelligent hints when you need them. Each level increases in complexity!
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <Brain className="h-6 w-6 text-purple-400 mb-2 mx-auto" />
                  <p className="font-semibold">Pattern Analysis</p>
                  <p className="text-slate-400">Identify mathematical sequences</p>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-blue-400 mb-2 mx-auto" />
                  <p className="font-semibold">AI Hints</p>
                  <p className="text-slate-400">Smart assistance when stuck</p>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <Trophy className="h-6 w-6 text-yellow-400 mb-2 mx-auto" />
                  <p className="font-semibold">Progressive Levels</p>
                  <p className="text-slate-400">Increasing difficulty</p>
                </div>
              </div>

              <Button 
                onClick={startGame} 
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg font-semibold"
              >
                Start Puzzle Challenge
              </Button>
            </Card>
          </div>
        ) : (
          /* Game Screen */
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Main Puzzle Area */}
              <div className="md:col-span-2">
                <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                        Level {currentLevel}
                      </Badge>
                      <h3 className="text-xl font-semibold">Find the Pattern</h3>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={requestHint}
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                      >
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Hint
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetGame}
                        className="border-slate-500/30 text-slate-400 hover:bg-slate-500/10"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>

                  <PuzzleGrid
                    pattern={pattern}
                    userSolution={userSolution}
                    onSolutionChange={setUserSolution}
                    isCorrect={isCorrect}
                  />

                  <div className="mt-6 flex justify-center">
                    <Button
                      onClick={checkSolution}
                      disabled={userSolution.length === 0}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8 py-2"
                    >
                      Check Solution
                    </Button>
                  </div>

                  {isCorrect !== null && (
                    <div className={`mt-4 p-4 rounded-lg text-center ${
                      isCorrect 
                        ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                        : 'bg-red-500/20 border border-red-500/30 text-red-300'
                    }`}>
                      {isCorrect ? '🎉 Correct! Moving to next level...' : '❌ Not quite right. Try again!'}
                    </div>
                  )}
                </Card>
              </div>

              {/* AI Hint Panel */}
              <div>
                <AIHintSystem
                  pattern={pattern}
                  currentLevel={currentLevel}
                  showHint={showHint}
                  onHintClose={() => setShowHint(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
