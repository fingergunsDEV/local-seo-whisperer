
import React from 'react';
import { DashboardCard } from './DashboardCard';
import { CompetitorData } from '@/services/competitorData';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface OptimizationItem {
  name: string;
  yourScore: number;
  competitorScore: number;
  maxScore: number;
}

interface GBPOptimizationCardProps {
  competitor: CompetitorData;
}

export const GBPOptimizationCard = ({ competitor }: GBPOptimizationCardProps) => {
  // Mock data for GBP optimization metrics - in a real app, this would come from API
  const optimizationItems: OptimizationItem[] = [
    { name: "Business Information", yourScore: 85, competitorScore: 95, maxScore: 100 },
    { name: "Photos & Media", yourScore: 70, competitorScore: 90, maxScore: 100 },
    { name: "Reviews & Responses", yourScore: 65, competitorScore: 85, maxScore: 100 },
    { name: "Posts & Updates", yourScore: 40, competitorScore: 80, maxScore: 100 },
    { name: "Q&A Management", yourScore: 60, competitorScore: 75, maxScore: 100 },
  ];

  return (
    <DashboardCard title={`Google Business Profile - vs ${competitor.name}`}>
      <div className="space-y-4">
        {optimizationItems.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">{item.name}</span>
              <span className="text-sm text-gray-600">{item.maxScore} pts</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">You</span>
                <span className="text-xs font-medium">{item.yourScore}%</span>
              </div>
              <Progress 
                value={(item.yourScore / item.maxScore) * 100} 
                className="h-2 bg-gray-200"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">{competitor.name}</span>
                <span className={cn(
                  "text-xs font-medium",
                  item.competitorScore > item.yourScore ? "text-red-500" : "text-green-500"
                )}>
                  {item.competitorScore}%
                  {item.competitorScore > item.yourScore ? 
                    ` (+${item.competitorScore - item.yourScore}%)` : 
                    item.competitorScore < item.yourScore ? 
                    ` (-${item.yourScore - item.competitorScore}%)` : ''}
                </span>
              </div>
              <Progress 
                value={(item.competitorScore / item.maxScore) * 100} 
                className="h-2 bg-gray-200"
              />
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
