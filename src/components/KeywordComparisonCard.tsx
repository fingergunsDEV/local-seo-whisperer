
import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getKeywordComparison } from '@/services/competitorData';
import { cn } from '@/lib/utils';

export const KeywordComparisonCard = () => {
  const keywordData = Object.values(getKeywordComparison());

  return (
    <DashboardCard title="Keyword Position Comparison">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Keyword</TableHead>
              <TableHead className="text-center">Monthly Searches</TableHead>
              {keywordData[0]?.competitors.map(comp => (
                <TableHead key={comp.name} className="text-center">
                  {comp.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {keywordData.map(item => (
              <TableRow key={item.keyword}>
                <TableCell className="font-medium">{item.keyword}</TableCell>
                <TableCell className="text-center">
                  {/* Using first keyword data since the monthly searches are the same for all */}
                  {item.competitors[0]?.name === "Your Business" ? 
                    getYourBusiness().keywords.find(k => k.keyword === item.keyword)?.monthlySearches :
                    getCompetitors()[0].keywords.find(k => k.keyword === item.keyword)?.monthlySearches}
                </TableCell>
                {item.competitors.map(comp => (
                  <TableCell key={comp.name} className="text-center">
                    <div className="inline-flex items-center">
                      <span className={cn(
                        "font-semibold",
                        comp.position <= 3 ? "text-green-600" :
                        comp.position <= 10 ? "text-amber-600" : "text-red-600"
                      )}>
                        {comp.position}
                      </span>
                      <span className={cn(
                        "ml-1 text-xs",
                        comp.change > 0 ? "text-green-600" :
                        comp.change < 0 ? "text-red-600" : "text-gray-500"
                      )}>
                        {comp.change > 0 ? `+${comp.change}` :
                         comp.change < 0 ? comp.change : ""}
                      </span>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardCard>
  );
};

import { getYourBusiness, getCompetitors } from '@/services/competitorData';
