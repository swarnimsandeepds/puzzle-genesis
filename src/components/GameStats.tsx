
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Lightbulb, TrendingUp } from 'lucide-react';

interface GameStatsProps {
  level: number;
  score: number;
  hintsUsed: number;
}

const GameStats = ({ level, score, hintsUsed }: GameStatsProps) => {
  const getPerformanceRating = () => {
    const efficiency = score - (hintsUsed * 10);
    if (efficiency >= level * 90) return { rating: 'Excellent', color: 'text-green-400', icon: '🏆' };
    if (efficiency >= level * 70) return { rating: 'Good', color: 'text-blue-400', icon: '⭐' };
    if (efficiency >= level * 50) return { rating: 'Fair', color: 'text-yellow-400', icon: '👍' };
    return { rating: 'Learning', color: 'text-orange-400', icon: '📚' };
  };

  const performance = getPerformanceRating();

  return (
    <Card className="p-4 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-slate-400">Level</span>
          </div>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
            {level}
          </Badge>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1">
            <Target className="h-4 w-4 text-green-400" />
            <span className="text-xs text-slate-400">Score</span>
          </div>
          <div className="text-lg font-bold text-green-400">
            {score.toLocaleString()}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1">
            <Lightbulb className="h-4 w-4 text-blue-400" />
            <span className="text-xs text-slate-400">Hints</span>
          </div>
          <div className="text-lg font-bold text-blue-400">
            {hintsUsed}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            <span className="text-xs text-slate-400">Rating</span>
          </div>
          <div className={`text-sm font-semibold ${performance.color}`}>
            {performance.icon} {performance.rating}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameStats;
