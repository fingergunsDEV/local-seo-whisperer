
export interface KeywordData {
  keyword: string;
  position: number;
  monthlySearches: number;
  difficulty: number;
  change: number;
}

export interface CompetitorData {
  id: string;
  name: string;
  website: string;
  ranking: number;
  gbpOptimizationScore: number;
  localBacklinks: number;
  reviewScore: number;
  reviewCount: number;
  keywords: KeywordData[];
}

export interface LocalBusinessData {
  id: string;
  name: string;
  website: string;
  ranking: number;
  gbpOptimizationScore: number;
  localBacklinks: number;
  reviewScore: number;
  reviewCount: number;
  keywords: KeywordData[];
}

// Mock data for your business
export const yourBusinessData: LocalBusinessData = {
  id: "your-business",
  name: "Your Business",
  website: "yourbusiness.com",
  ranking: 4,
  gbpOptimizationScore: 82,
  localBacklinks: 65,
  reviewScore: 4.5,
  reviewCount: 86,
  keywords: [
    { keyword: "local coffee shop", position: 4, monthlySearches: 720, difficulty: 45, change: 2 },
    { keyword: "best coffee downtown", position: 3, monthlySearches: 590, difficulty: 38, change: 1 },
    { keyword: "artisan coffee shop", position: 5, monthlySearches: 480, difficulty: 42, change: -1 },
    { keyword: "specialty coffee near me", position: 6, monthlySearches: 890, difficulty: 55, change: 0 },
  ]
};

// Mock data for competitors
export const competitorsData: CompetitorData[] = [
  {
    id: "competitor-1",
    name: "Bean Haven",
    website: "beanhaven.com",
    ranking: 2,
    gbpOptimizationScore: 95,
    localBacklinks: 120,
    reviewScore: 4.7,
    reviewCount: 132,
    keywords: [
      { keyword: "local coffee shop", position: 1, monthlySearches: 720, difficulty: 45, change: 0 },
      { keyword: "best coffee downtown", position: 2, monthlySearches: 590, difficulty: 38, change: 1 },
      { keyword: "artisan coffee shop", position: 2, monthlySearches: 480, difficulty: 42, change: 0 },
      { keyword: "specialty coffee near me", position: 3, monthlySearches: 890, difficulty: 55, change: 2 },
    ]
  },
  {
    id: "competitor-2",
    name: "Caffeine Corner",
    website: "caffeinecorner.com",
    ranking: 3,
    gbpOptimizationScore: 87,
    localBacklinks: 84,
    reviewScore: 4.3,
    reviewCount: 107,
    keywords: [
      { keyword: "local coffee shop", position: 2, monthlySearches: 720, difficulty: 45, change: 1 },
      { keyword: "best coffee downtown", position: 5, monthlySearches: 590, difficulty: 38, change: -2 },
      { keyword: "artisan coffee shop", position: 4, monthlySearches: 480, difficulty: 42, change: 1 },
      { keyword: "specialty coffee near me", position: 8, monthlySearches: 890, difficulty: 55, change: -1 },
    ]
  },
  {
    id: "competitor-3",
    name: "Brew Masters",
    website: "brewmasters.com",
    ranking: 1,
    gbpOptimizationScore: 97,
    localBacklinks: 156,
    reviewScore: 4.9,
    reviewCount: 203,
    keywords: [
      { keyword: "local coffee shop", position: 3, monthlySearches: 720, difficulty: 45, change: 1 },
      { keyword: "best coffee downtown", position: 1, monthlySearches: 590, difficulty: 38, change: 0 },
      { keyword: "artisan coffee shop", position: 1, monthlySearches: 480, difficulty: 42, change: 0 },
      { keyword: "specialty coffee near me", position: 1, monthlySearches: 890, difficulty: 55, change: 1 },
    ]
  }
];

// Get all competitors
export const getCompetitors = (): CompetitorData[] => {
  return competitorsData;
};

// Get your business data
export const getYourBusiness = (): LocalBusinessData => {
  return yourBusinessData;
};

// Get specific competitor
export const getCompetitor = (id: string): CompetitorData | undefined => {
  return competitorsData.find(competitor => competitor.id === id);
};

// Get keyword ranking comparison
export const getKeywordComparison = (): Record<string, { keyword: string, competitors: { name: string, position: number, change: number }[] }> => {
  const keywordMap: Record<string, { keyword: string, competitors: { name: string, position: number, change: number }[] }> = {};
  
  // Initialize with your business keywords
  yourBusinessData.keywords.forEach(({ keyword }) => {
    keywordMap[keyword] = {
      keyword,
      competitors: [
        { name: yourBusinessData.name, position: yourBusinessData.keywords.find(k => k.keyword === keyword)?.position || 0, change: yourBusinessData.keywords.find(k => k.keyword === keyword)?.change || 0 }
      ]
    };
  });
  
  // Add competitor data
  competitorsData.forEach(competitor => {
    competitor.keywords.forEach(({ keyword, position, change }) => {
      if (keywordMap[keyword]) {
        keywordMap[keyword].competitors.push({ name: competitor.name, position, change });
      }
    });
  });
  
  return keywordMap;
};
