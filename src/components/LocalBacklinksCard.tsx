
import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Button } from '@/components/ui/button';
import { CompetitorData, LocalBusinessData } from '@/services/competitorData';
import { Progress } from '@/components/ui/progress';

interface BacklinkItem {
  source: string;
  linkText: string;
  authority: number;
  yours: boolean;
  competitor: boolean;
}

interface LocalBacklinksCardProps {
  yourBusiness: LocalBusinessData;
  competitor: CompetitorData;
}

export const LocalBacklinksCard = ({ yourBusiness, competitor }: LocalBacklinksCardProps) => {
  // Mock backlink data - in a real app, this would be fetched from an API
  const backlinkData: BacklinkItem[] = [
    { source: "localchamber.com", linkText: "Top Local Businesses", authority: 78, yours: true, competitor: true },
    { source: "cityguide.net", linkText: "Best Places in Town", authority: 64, yours: true, competitor: true },
    { source: "neighborhoodwatch.org", linkText: "Community Partners", authority: 55, yours: true, competitor: false },
    { source: "localreviewsite.com", linkText: "Featured Businesses", authority: 73, yours: false, competitor: true },
    { source: "townblog.com", linkText: "Local Recommendations", authority: 67, yours: false, competitor: true },
  ];

  return (
    <DashboardCard title="Local Backlink Analysis">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-1">Your Backlinks</div>
            <div className="text-2xl font-semibold text-seo-medium">{yourBusiness.localBacklinks}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">{competitor.name}'s Backlinks</div>
            <div className="text-2xl font-semibold">{competitor.localBacklinks}</div>
          </div>
        </div>
        <Button className="bg-seo-medium hover:bg-seo-dark text-white">View All</Button>
      </div>

      <div className="space-y-3">
        {backlinkData.map((backlink, index) => (
          <div key={index} className="border rounded-md p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{backlink.source}</span>
              <div className="flex items-center text-sm">
                <span className="mr-2">Authority:</span>
                <div className="flex items-center gap-2">
                  <Progress value={backlink.authority} className="w-20 h-2" />
                  <span>{backlink.authority}</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-2">"{backlink.linkText}"</div>
            <div className="flex gap-2">
              {backlink.yours && (
                <span className="text-xs px-2 py-0.5 bg-seo-light/20 text-seo-dark rounded-full">
                  Your Link
                </span>
              )}
              {backlink.competitor && (
                <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full">
                  Competitor Link
                </span>
              )}
              {!backlink.yours && (
                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                  Opportunity
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
