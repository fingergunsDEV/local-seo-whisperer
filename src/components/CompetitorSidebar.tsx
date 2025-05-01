
import React from 'react';
import { Button } from '@/components/ui/button';
import { CompetitorData, getCompetitors, getYourBusiness } from '@/services/competitorData';
import { cn } from '@/lib/utils';

interface CompetitorSidebarProps {
  selectedCompetitor: CompetitorData | null;
  onSelectCompetitor: (competitor: CompetitorData) => void;
}

export const CompetitorSidebar = ({ selectedCompetitor, onSelectCompetitor }: CompetitorSidebarProps) => {
  const competitors = getCompetitors();
  const yourBusiness = getYourBusiness();
  
  return (
    <aside className="w-64 border-r border-gray-200 h-full bg-gray-50 p-4">
      <h2 className="font-heading text-lg font-semibold mb-4 text-seo-dark">Competitors</h2>
      
      <div className="mb-6">
        <div className="p-3 bg-white rounded-md border-l-4 border-seo-medium shadow-sm mb-2">
          <h3 className="font-medium text-seo-dark">{yourBusiness.name}</h3>
          <p className="text-xs text-gray-600 mt-1">Ranking: #{yourBusiness.ranking}</p>
        </div>
      </div>

      <div className="space-y-2">
        {competitors.map(competitor => (
          <Button
            key={competitor.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left h-auto py-3 font-normal",
              selectedCompetitor?.id === competitor.id ? "bg-seo-light/10 text-seo-dark" : ""
            )}
            onClick={() => onSelectCompetitor(competitor)}
          >
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{competitor.name}</h3>
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  competitor.ranking === 1 ? "bg-yellow-100 text-yellow-800" :
                  competitor.ranking <= 3 ? "bg-green-100 text-green-800" : 
                  "bg-gray-100 text-gray-800"
                )}>
                  #{competitor.ranking}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{competitor.website}</p>
            </div>
          </Button>
        ))}
        
        <Button variant="outline" className="w-full mt-4 text-seo-medium border-seo-medium hover:bg-seo-light/10">
          Add Competitor
        </Button>
      </div>
    </aside>
  );
};
