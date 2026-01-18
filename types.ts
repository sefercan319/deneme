import React from 'react';

export interface EconomicDataPoint {
  date: string;
  turkeyValue: number;
  globalValue: number;
}

export interface Metric {
  id: string;
  title: string;
  value: string;
  change: number;
  isPositiveBad?: boolean;
  icon: React.ReactNode;
  color: 'blue' | 'red' | 'yellow' | 'green';
  description?: string;
  verifiedBy?: number; // Number of sources verifying this
  confidenceScore?: number; // 0-100
}

export interface MarketAnalysisResponse {
  summary: string;
  outlook: string;
  risks: string[];
}

export interface DataSource {
  name: string;
  description: string;
  url: string;
  lastUpdated: string;
  countryFlag?: string;
  reliabilityScore: number; // 1-10
}

export interface GlobalMarketIndice {
  symbol: string;
  name: string;
  value: string;
  change: number;
  region: 'USA' | 'EU' | 'ASIA' | 'TR';
  status: 'Bullish' | 'Bearish' | 'Neutral';
  sentiment: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  category: 'Türkiye' | 'Global' | 'Emtia' | 'Kripto';
  originCountry: string; // e.g., 'US', 'DE', 'CN'
  originSource: string; // e.g., 'Bloomberg'
  verificationScore: number; // e.g., 98 (out of 100)
  verifyingSourcesCount: number; // e.g., 15
}

export enum Region {
  TURKEY = 'TURKEY',
  GLOBAL = 'GLOBAL'
}