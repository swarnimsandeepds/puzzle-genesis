
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, X, Lightbulb, Zap } from 'lucide-react';

interface AIHintSystemProps {
  pattern: number[];
  currentLevel: number;
  showHint: boolean;
  onHintClose: () => void;
}

const AIHintSystem = ({ pattern, currentLevel, showHint, onHintClose }: AIHintSystemProps) => {
  // Generate intelligent hints based on the pattern
  const generateHint = () => {
    if (pattern.length === 0) return "No pattern detected yet.";

    const differences = [];
    for (let i = 1; i < pattern.length; i++) {
      differences.push(pattern[i] - pattern[i - 1]);
    }

    if (currentLevel <= 2) {
      // Simple arithmetic progression hints
      if (differences.every(d => d === differences[0])) {
        return `🔍 **Pattern Analysis**: This sequence increases by ${differences[0]} each step. Look for the arithmetic progression!`;
      }
      return "🔍 **Pattern Analysis**: Try looking at the difference between consecutive numbers.";
    } else if (currentLevel <= 4) {
      // Fibonacci-like hints
      const isFibonacci = pattern.length >= 3 && 
        pattern.slice(2).every((val, i) => val === (pattern[i] + pattern[i + 1]) % 8);
      
      if (isFibonacci) {
        return "🔍 **Pattern Analysis**: Each number is the sum of the two previous numbers (with wraparound). This is a Fibonacci-like sequence!";
      }
      return "🔍 **Pattern Analysis**: Look at how each number relates to the previous two numbers. Consider addition with modular arithmetic.";
    } else {
      // Complex patterns
      return "🔍 **Pattern Analysis**: This is a quadratic sequence. Try looking at the relationship between the position and value: position² + level offset.";
    }
  };

  const getAIPersonality = () => {
    const personalities = [
      "🤖 **AI Assistant**: I've analyzed thousands of patterns. Here's what I found...",
      "🧠 **Neural Network**: My pattern recognition algorithms suggest...",
      "⚡ **Logic Engine**: After processing the sequence, I recommend...",
      "🔮 **Pattern Oracle**: The mathematical essence reveals..."
    ];
    return personalities[currentLevel % personalities.length];
  };

  if (!showHint) {
    return (
      <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="text-center">
          <div className="inline-flex p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-4">
            <Brain className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
          <p className="text-slate-400 text-sm mb-4">
            Need help? I can analyze the pattern and provide intelligent hints to guide you.
          </p>
          <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
            <Lightbulb className="h-5 w-5 text-yellow-400 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Hint system ready</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold">AI Hint</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onHintClose}
          className="text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-300 mb-2">{getAIPersonality()}</p>
          <p className="text-white">{generateHint()}</p>
        </div>

        <div className="p-3 bg-slate-700/50 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-300 mb-2">Strategy Tips:</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>• Look for mathematical relationships</li>
            <li>• Consider position-based patterns</li>
            <li>• Try modular arithmetic (wraparound)</li>
            <li>• Check for recursive sequences</li>
          </ul>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Brain className="h-4 w-4" />
          <span>AI confidence: {85 + (currentLevel * 2)}%</span>
        </div>
      </div>
    </Card>
  );
};

export default AIHintSystem;
