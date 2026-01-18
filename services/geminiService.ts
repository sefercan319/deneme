import { GoogleGenAI, Type } from "@google/genai";
import { MarketAnalysisResponse } from "../types";
import { INFLATION_DATA, GDP_GROWTH_DATA, UNEMPLOYMENT_DATA, TABLE_DATA } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to format complex data for the prompt
const formatDetailedContext = (currentMetrics: string) => {
  const latestInflation = INFLATION_DATA[INFLATION_DATA.length - 1];
  const latestGDP = GDP_GROWTH_DATA[GDP_GROWTH_DATA.length - 1];
  const latestUnemployment = UNEMPLOYMENT_DATA[UNEMPLOYMENT_DATA.length - 1];

  return `
    ÖZET METRİKLER:
    ${currentMetrics}

    DETAYLI VERİ SETLERİ:
    - Son Enflasyon (TÜFE): %${latestInflation.turkeyValue} (Global: %${latestInflation.globalValue})
    - Son GSYİH Tahmini: %${latestGDP.turkeyValue} (Global: %${latestGDP.globalValue})
    - Son İşsizlik: %${latestUnemployment.turkeyValue} (OECD: %${latestUnemployment.globalValue})
    
    EK TABLO ANALİZİ:
    ${JSON.stringify(TABLE_DATA.map(t => `${t.indicator}: TR ${t.turkey} vs World ${t.world} -> ${t.status}`))}
  `;
};

export const getEconomicAnalysis = async (currentMetrics: string): Promise<MarketAnalysisResponse> => {
  const fullContext = formatDetailedContext(currentMetrics);

  const prompt = `
    Sen uzman bir Baş Ekonomistsin. Aşağıdaki Türkiye ve Dünya ekonomisi verilerini analiz et.
    
    VERİ SETİ:
    ${fullContext}
    
    GÖREV:
    1. Veriler arasındaki korelasyonu (örn: Enflasyon vs Faiz vs İşsizlik) dikkate al.
    2. "Tarafsız" ve "Gerçekçi" bir dil kullan. Asla politik olma, sadece veriyi yorumla.
    3. Yanıtı JSON formatında döndür.

    Tonlama: Analitik, Profesyonel, Yatırımcı Dostu.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "Makroekonomik durumun 2-3 cümlelik net özeti." },
            outlook: { type: Type.STRING, description: "Gelecek 6 ay için veri odaklı öngörü." },
            risks: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Ekonomiyi tehdit eden 3 somut risk."
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Boş yanıt alındı.");
    
    return JSON.parse(text) as MarketAnalysisResponse;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      summary: "Veri seti şu anda analiz edilemiyor. Bağlantı hatası.",
      outlook: "Veri eksikliği nedeniyle öngörü oluşturulamadı.",
      risks: ["API Bağlantı Hatası", "Veri Kaynağı Erişimi"]
    };
  }
};