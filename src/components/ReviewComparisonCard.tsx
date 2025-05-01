
import React from 'react';
import { DashboardCard } from './DashboardCard';
import { CompetitorData, LocalBusinessData } from '@/services/competitorData';
import { Progress } from '@/components/ui/progress';

interface ReviewDistribution {
  stars: number;
  count: number;
  percentage: number;
}

interface ReviewComparisonCardProps {
  yourBusiness: LocalBusinessData;
  competitor: CompetitorData;
}

export const ReviewComparisonCard = ({ yourBusiness, competitor }: ReviewComparisonCardProps) => {
  // Generate mock review distributions
  const generateReviewDistribution = (totalCount: number, averageScore: number): ReviewDistribution[] => {
    const distribution: ReviewDistribution[] = [];
    
    // Create an approximation of a bell curve centered around the average score
    const total = totalCount;
    let remaining = total;
    
    for (let stars = 5; stars >= 1; stars--) {
      let percentage: number;
      
      if (stars === 5) {
        percentage = averageScore >= 4.8 ? 0.7 : averageScore >= 4.5 ? 0.5 : averageScore >= 4.0 ? 0.3 : 0.1;
      } else if (stars === 4) {
        percentage = averageScore >= 4.5 ? 0.2 : averageScore >= 4.0 ? 0.4 : averageScore >= 3.5 ? 0.3 : 0.15;
      } else if (stars === 3) {
        percentage = averageScore >= 4.0 ? 0.05 : averageScore >= 3.5 ? 0.15 : averageScore >= 3.0 ? 0.4 : 0.2;
      } else if (stars === 2) {
        percentage = averageScore >= 4.0 ? 0.03 : averageScore >= 3.0 ? 0.1 : 0.25;
      } else { // stars === 1
        percentage = averageScore >= 4.0 ? 0.02 : averageScore >= 3.0 ? 0.05 : 0.2;
      }
      
      // Adjust for last item to ensure sum is 100%
      if (stars === 1) {
        let count = remaining;
        distribution.push({ stars, count, percentage: count / total });
      } else {
        let count = Math.round(total * percentage);
        if (count > remaining) count = remaining;
        remaining -= count;
        distribution.push({ stars, count, percentage: count / total });
      }
    }
    
    return distribution;
  };
  
  const yourDistribution = generateReviewDistribution(yourBusiness.reviewCount, yourBusiness.reviewScore);
  const competitorDistribution = generateReviewDistribution(competitor.reviewCount, competitor.reviewScore);

  return (
    <DashboardCard title="Review Performance Comparison">
      <div className="space-y-6">
        <div className="flex justify-between mb-2">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Your Rating</div>
            <div className="text-2xl font-semibold text-seo-medium">
              {yourBusiness.reviewScore.toFixed(1)}★ <span className="text-sm font-normal text-gray-600">({yourBusiness.reviewCount})</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">{competitor.name}'s Rating</div>
            <div className="text-2xl font-semibold">
              {competitor.reviewScore.toFixed(1)}★ <span className="text-sm font-normal text-gray-600">({competitor.reviewCount})</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Your Review Distribution</h4>
          <div className="space-y-2">
            {yourDistribution.map((dist) => (
              <div key={`your-${dist.stars}`} className="flex items-center gap-2">
                <span className="w-10 text-sm">{dist.stars}★</span>
                <Progress value={dist.percentage * 100} className="h-2 flex-grow" />
                <span className="text-sm text-gray-600 w-16">{dist.count} ({Math.round(dist.percentage * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">{competitor.name}'s Review Distribution</h4>
          <div className="space-y-2">
            {competitorDistribution.map((dist) => (
              <div key={`comp-${dist.stars}`} className="flex items-center gap-2">
                <span className="w-10 text-sm">{dist.stars}★</span>
                <Progress value={dist.percentage * 100} className="h-2 flex-grow" />
                <span className="text-sm text-gray-600 w-16">{dist.count} ({Math.round(dist.percentage * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};
