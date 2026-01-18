import React from 'react';
import { Percent, Users, Scale, DollarSign, Globe, BarChart2, Coins, Fuel } from 'lucide-react';
import { Metric, EconomicDataPoint, DataSource, GlobalMarketIndice, NewsItem } from './types';

// --- VERIFICATION SOURCES (The "15 Sources" Logic) ---
export const TRUSTED_SOURCES = [
  "Reuters (Global)", "Bloomberg Terminal", "Financial Times (UK)", "Wall Street Journal (US)",
  "Nikkei Asia (Japan)", "Xinhua Finance (China)", "Anadolu Ajansı (TR)", "TCMB Resmi Veri",
  "TÜİK", "Eurostat (EU)", "World Bank Data", "IMF Outlook", "Goldman Sachs Research",
  "Morgan Stanley Analytics", "CNBC Global"
];

// --- GLOBAL TICKER DATA ---
export const TICKER_DATA = [
  { symbol: 'BIST 100', value: '9,150.45', change: 1.2, isUp: true },
  { symbol: 'USD/TRY', value: '34.45', change: 0.12, isUp: true }, // Up is bad for currency usually, but visually green/red depends on context. Here standard market red/green.
  { symbol: 'EUR/TRY', value: '37.10', change: -0.05, isUp: false },
  { symbol: 'ALTIN (ONS)', value: '$2,045', change: 0.8, isUp: true },
  { symbol: 'BRENT PETROL', value: '$78.40', change: -1.2, isUp: false },
  { symbol: 'BITCOIN', value: '$98,500', change: 2.4, isUp: true },
  { symbol: 'S&P 500', value: '5,210.00', change: 0.5, isUp: true },
  { symbol: 'DAX', value: '18,400.20', change: -0.2, isUp: false },
];

// --- DATASETS ---

export const INFLATION_DATA: EconomicDataPoint[] = [
  { date: 'Ara 23', turkeyValue: 64.77, globalValue: 3.4 },
  { date: 'Mar 24', turkeyValue: 68.50, globalValue: 3.5 },
  { date: 'Haz 24', turkeyValue: 71.60, globalValue: 3.0 },
  { date: 'Eyl 24', turkeyValue: 49.38, globalValue: 2.4 },
  { date: 'Kas 24', turkeyValue: 47.09, globalValue: 2.7 },
  { date: 'Oca 25', turkeyValue: 44.20, globalValue: 2.6 },
];

export const GDP_GROWTH_DATA: EconomicDataPoint[] = [
  { date: '2021', turkeyValue: 11.4, globalValue: 6.2 },
  { date: '2022', turkeyValue: 5.5, globalValue: 3.4 },
  { date: '2023', turkeyValue: 4.5, globalValue: 3.1 },
  { date: '2024 (T)', turkeyValue: 3.2, globalValue: 3.2 },
  { date: '2025 (T)', turkeyValue: 3.0, globalValue: 3.3 },
];

export const UNEMPLOYMENT_DATA: EconomicDataPoint[] = [
  { date: 'Q1 23', turkeyValue: 9.9, globalValue: 4.8 },
  { date: 'Q2 23', turkeyValue: 9.7, globalValue: 4.9 },
  { date: 'Q3 23', turkeyValue: 9.2, globalValue: 4.9 },
  { date: 'Q4 23', turkeyValue: 8.8, globalValue: 5.0 },
  { date: 'Q1 24', turkeyValue: 8.7, globalValue: 4.9 },
  { date: 'Q2 24', turkeyValue: 8.6, globalValue: 5.0 },
];

// --- GLOBAL PULSE (New Feature) ---
export const GLOBAL_INDICES: GlobalMarketIndice[] = [
  { symbol: 'USA', name: 'ABD Ekonomisi', value: 'Güçlü Seyir', change: 2.5, region: 'USA', status: 'Bullish', sentiment: 'Fed Faiz İndirimi Beklentisi' },
  { symbol: 'EU', name: 'Euro Bölgesi', value: 'Durgunluk', change: -0.1, region: 'EU', status: 'Bearish', sentiment: 'Enerji Maliyetleri Baskısı' },
  { symbol: 'CHN', name: 'Çin Piyasası', value: 'Toparlanma', change: 4.2, region: 'ASIA', status: 'Bullish', sentiment: 'Teşvik Paketleri Etkisi' },
  { symbol: 'TR', name: 'Türkiye', value: 'Dengelenme', change: 1.1, region: 'TR', status: 'Neutral', sentiment: 'Sıkı Para Politikası' },
];

// --- CARDS ---

export const METRICS: Metric[] = [
  {
    id: 'tr-inflation',
    title: 'TÜFE (Yıllık)',
    value: '%47.09',
    change: -1.49,
    isPositiveBad: true,
    icon: <Percent className="w-5 h-5 text-white" />,
    color: 'red',
    description: 'Tüketici Fiyat Endeksi yıllık değişim oranı.',
    verifiedBy: 16,
    confidenceScore: 99
  },
  {
    id: 'tr-policy-rate',
    title: 'Politika Faizi',
    value: '%50.00',
    change: 0,
    isPositiveBad: false,
    icon: <Scale className="w-5 h-5 text-white" />,
    color: 'blue',
    description: 'TCMB bir hafta vadeli repo ihale faiz oranı.',
    verifiedBy: 15,
    confidenceScore: 100
  },
  {
    id: 'usd-try',
    title: 'USD/TRY',
    value: '34.45 ₺',
    change: 0.12,
    isPositiveBad: true,
    icon: <DollarSign className="w-5 h-5 text-white" />,
    color: 'green', 
    description: 'Bankalararası piyasa satış kuru.',
    verifiedBy: 22,
    confidenceScore: 98
  },
  {
    id: 'unemployment',
    title: 'İşsizlik Oranı',
    value: '%8.6',
    change: -0.1,
    isPositiveBad: true,
    icon: <Users className="w-5 h-5 text-white" />,
    color: 'yellow',
    description: 'Mevsim etkisinden arındırılmış işsizlik oranı.',
    verifiedBy: 12,
    confidenceScore: 95
  },
];

export const TABLE_DATA = [
  { indicator: 'GSYİH Büyüme', turkey: '%3.2', world: '%3.2', status: 'Paralel Seyir' },
  { indicator: 'İşsizlik (Genç Nüfus)', turkey: '%16.3', world: '%10.5', status: 'Yapısal Risk' },
  { indicator: 'Enflasyon (TÜFE)', turkey: '%47.1', world: '%2.7', status: 'Yüksek Ayrışma' },
  { indicator: 'Politika Faizi', turkey: '%50.0', world: '%4.5 (Fed)', status: 'Sıkı Duruş' },
  { indicator: 'Cari Açık / GSYİH', turkey: '-%1.1', world: '-%0.4', status: 'Dengelenme' },
  { indicator: 'CDS Primi (Risk)', turkey: '265 bp', world: 'N/A', status: 'İyileşme Trendi' },
];

// --- NEWS WITH GLOBAL CONTEXT ---

export const EXPANDED_NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: "TCMB Faiz Kararı ve Sıkılaşma Mesajı",
    date: "10 dk önce",
    summary: "Para Politikası Kurulu, enflasyonla mücadele kapsamında faizleri sabit tutarken, likidite adımlarının devam edeceğini vurguladı.",
    category: "Türkiye",
    originCountry: "TR",
    originSource: "TCMB / AA",
    verificationScore: 100,
    verifyingSourcesCount: 18
  },
  {
    id: 2,
    title: "Fed Başkanı Powell'dan 'Sabır' Vurgusu",
    date: "35 dk önce",
    summary: "ABD Merkez Bankası Başkanı, faiz indirimleri için acele edilmeyeceğini, verilerin izleneceğini belirtti. Piyasalar bu açıklamayı şahin algıladı.",
    category: "Global",
    originCountry: "USA",
    originSource: "Bloomberg",
    verificationScore: 98,
    verifyingSourcesCount: 24
  },
  {
    id: 3,
    title: "Çin Emlak Sektöründe Yeni Teşvik Paketi",
    date: "1 saat önce",
    summary: "Çin hükümeti, konut piyasasını canlandırmak için 2 trilyon Yuan değerinde yeni bir likidite paketi açıkladı. Asya borsaları ralli yaptı.",
    category: "Global",
    originCountry: "CN",
    originSource: "Xinhua / Reuters",
    verificationScore: 92,
    verifyingSourcesCount: 12
  },
  {
    id: 4,
    title: "Altın Fiyatlarında Jeopolitik Baskı",
    date: "2 saat önce",
    summary: "Ortadoğu'daki gerilimlerin artmasıyla güvenli liman talebi arttı. Ons altın 2.050 dolar seviyesini test ediyor.",
    category: "Emtia",
    originCountry: "UK",
    originSource: "Financial Times",
    verificationScore: 96,
    verifyingSourcesCount: 15
  },
  {
    id: 5,
    title: "Bitcoin ETF'lerine Rekor Giriş",
    date: "3 saat önce",
    summary: "Spot Bitcoin ETF'lerine haftalık bazda 2.1 milyar dolar net giriş gerçekleşti. Kurumsal ilgi artarak devam ediyor.",
    category: "Kripto",
    originCountry: "USA",
    originSource: "CoinDesk / CNBC",
    verificationScore: 94,
    verifyingSourcesCount: 10
  }
];

export const DATA_SOURCES: DataSource[] = [
  {
    name: "TÜİK (TR)",
    description: "Türkiye Resmi İstatistik Kurumu",
    url: "https://www.tuik.gov.tr",
    lastUpdated: "Anlık",
    reliabilityScore: 10
  },
  {
    name: "Bloomberg (Global)",
    description: "Küresel Finansal Veri Terminali",
    url: "https://www.bloomberg.com",
    lastUpdated: "Anlık",
    reliabilityScore: 9.8
  },
  {
    name: "Reuters (Global)",
    description: "Uluslararası Haber ve Veri Sağlayıcı",
    url: "https://www.reuters.com",
    lastUpdated: "Anlık",
    reliabilityScore: 9.9
  },
  {
    name: "Eurostat (EU)",
    description: "Avrupa Birliği İstatistik Ofisi",
    url: "https://ec.europa.eu/eurostat",
    lastUpdated: "Günlük",
    reliabilityScore: 9.7
  }
];