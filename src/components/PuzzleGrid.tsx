
import React from 'react';
import { Card } from '@/components/ui/card';

interface PuzzleGridProps {
  pattern: number[];
  userSolution: number[];
  onSolutionChange: (solution: number[]) => void;
  isCorrect: boolean | null;
}

const PuzzleGrid = ({ pattern, userSolution, onSolutionChange, isCorrect }: PuzzleGridProps) => {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
  ];

  const handleCellClick = (index: number, colorIndex: number) => {
    const newSolution = [...userSolution];
    newSolution[index] = colorIndex;
    onSolutionChange(newSolution);
  };

  return (
    <div className="space-y-6">
      {/* Pattern Display */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-slate-300">Pattern to Complete:</h4>
        <div className="flex gap-3 justify-center mb-6">
          {pattern.map((colorIndex, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-12 h-12 rounded-lg ${colors[colorIndex]} shadow-lg border-2 border-white/20 transition-all duration-300 hover:scale-105`}
              />
              <span className="text-xs text-slate-400 mt-1 block">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User Solution Input */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-slate-300">Your Solution:</h4>
        <div className="flex gap-3 justify-center mb-6">
          {pattern.map((_, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                  userSolution[index] !== undefined
                    ? `${colors[userSolution[index]]} border-white/20 hover:scale-105`
                    : 'border-dashed border-slate-500 bg-slate-700/50 hover:bg-slate-600/50'
                } ${isCorrect === true && userSolution[index] !== undefined ? 'ring-2 ring-green-400' : ''}
                ${isCorrect === false && userSolution[index] !== undefined ? 'ring-2 ring-red-400' : ''}`}
                onClick={() => {
                  // Cycle through colors
                  const nextColor = userSolution[index] !== undefined 
                    ? (userSolution[index] + 1) % colors.length 
                    : 0;
                  handleCellClick(index, nextColor);
                }}
              />
              <span className="text-xs text-slate-400 mt-1 block">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-slate-400">Available Colors:</h4>
        <div className="flex gap-2 justify-center flex-wrap">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-md ${color} cursor-pointer shadow-sm border border-white/20 transition-all duration-200 hover:scale-110`}
              title={`Color ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-slate-400">
        💡 Click on solution squares to cycle through colors
      </div>
    </div>
  );
};

export default PuzzleGrid;
