
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="font-heading font-bold text-2xl text-seo-dark">
          <span>Local</span>
          <span className="text-seo-light">SEO</span>
          <span className="text-seo-medium">Whisperer</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <Input 
            type="text" 
            placeholder="Search competitors..." 
            className="pr-8 focus:ring-seo-light" 
          />
        </div>
        <Button variant="outline" className="border-seo-medium text-seo-medium hover:bg-seo-light hover:text-white">
          Add Competitor
        </Button>
      </div>
    </header>
  );
};
