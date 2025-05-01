
import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Progress } from '@/components/ui/progress';
import { CompetitorData, LocalBusinessData } from '@/services/competitorData';

interface CompetitorRankingCardProps {
  yourBusiness: LocalBusinessData;
  competitors: CompetitorData[];
}

export const CompetitorRankingCard = ({ yourBusiness, competitors }: CompetitorRankingCardProps) => {
  // Combine your business with competitors for ranking
  const allBusinesses = [...competitors, yourBusiness].sort((a, b) => a.ranking - b.ranking);
  
  // Get max values for normalization
  const maxBacklinks = Math.max(...allBusinesses.map(b => b.localBacklinks));
  const maxReviews = Math.max(...allBusinesses.map(b => b.reviewCount));
  
  return (
    <DashboardCard title="Local SEO Ranking Overview">
      <div className="space-y-4">
        {allBusinesses.map((business, index) => {
          const isYourBusiness = business.id === yourBusiness.id;
          
          return (
            <div 
              key={business.id}
              className={cn(
                "p-3 rounded-md border",
                isYourBusiness ? "border-seo-light bg-seo-light/5" : "border-gray-200"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold",
                    index === 0 ? "bg-yellow-400 text-yellow-900" : 
                    index === 1 ? "bg-gray-300 text-gray-700" : 
                    index === 2 ? "bg-amber-700 text-amber-100" : 
                    "bg-gray-200 text-gray-600"
                  )}>
                    {index + 1}
                  </span>
                  <h3 className={cn(
                    "font-medium",
                    isYourBusiness ? "text-seo-dark font-semibold" : "text-gray-700"
                  )}>
                    {business.name}
                  </h3>
                  {isYourBusiness && (
                    <span className="text-xs bg-seo-medium text-white px-2 py-0.5 rounded-full">
                      You
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-600">
                  Score: {business.gbpOptimizationScore}%
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Backlinks:</span>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(business.localBacklinks / maxBacklinks) * 100} 
                      className="w-24 h-2" 
                    />
                    <span>{business.localBacklinks}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reviews:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500">{business.reviewScore.toFixed(1)}★</span>
                    <span>({business.reviewCount})</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
};

import { cn } from '@/lib/utils';
