
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { CompetitorSidebar } from '@/components/CompetitorSidebar';
import { CompetitorRankingCard } from '@/components/CompetitorRankingCard';
import { KeywordComparisonCard } from '@/components/KeywordComparisonCard';
import { GBPOptimizationCard } from '@/components/GBPOptimizationCard';
import { LocalBacklinksCard } from '@/components/LocalBacklinksCard';
import { ReviewComparisonCard } from '@/components/ReviewComparisonCard';
import { CompetitorData, getCompetitors, getYourBusiness } from '@/services/competitorData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorData>(getCompetitors()[0]);
  const competitors = getCompetitors();
  const yourBusiness = getYourBusiness();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <CompetitorSidebar 
          selectedCompetitor={selectedCompetitor} 
          onSelectCompetitor={setSelectedCompetitor} 
        />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-heading font-bold text-seo-dark mb-2">
              Local SEO Competitor Analysis
            </h1>
            <p className="text-gray-600">
              Analyzing your business against <span className="font-semibold">{selectedCompetitor.name}</span> to identify opportunities and gaps.
            </p>
          </div>
          
          {/* Overview section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <CompetitorRankingCard yourBusiness={yourBusiness} competitors={competitors} />
            </div>
            <div>
              <GBPOptimizationCard competitor={selectedCompetitor} />
            </div>
          </div>
          
          {/* Detailed analysis tabs */}
          <Tabs defaultValue="keywords" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="keywords">
              <div className="grid grid-cols-1 gap-6">
                <KeywordComparisonCard />
              </div>
            </TabsContent>
            
            <TabsContent value="backlinks">
              <div className="grid grid-cols-1 gap-6">
                <LocalBacklinksCard yourBusiness={yourBusiness} competitor={selectedCompetitor} />
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="grid grid-cols-1 gap-6">
                <ReviewComparisonCard yourBusiness={yourBusiness} competitor={selectedCompetitor} />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
