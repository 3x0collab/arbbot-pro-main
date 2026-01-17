import { useState, useEffect, useCallback } from 'react';

export interface FundingRate {
  exchange: string;
  rate: number;
}

export interface CoinData {
  symbol: string;
  fundingRates: FundingRate[];
  oiRank: number;
}

export interface ProcessedArbitrageData {
  symbol: string;
  oiRank: number;
  oiRankLabel: 'High' | 'Mid' | 'Low';
  longExchange: string;
  longRate: number;
  shortExchange: string;
  shortRate: number;
  netSpread: number;
  annualizedReturn: number;
  dailyProfit: number;
  lastUpdated: Date;
}

interface ApiResponse {
  funding_rates: Record<string, Record<string, number>>;
  oi_rankings: Record<string, number>;
}

const MOCK_DATA: ApiResponse = {
  funding_rates: {
    BTC: { binance: -1, bybit: 5, okx: 3, deribit: 4, bitget: 2 },
    ETH: { binance: 2, bybit: 8, okx: 5, deribit: 6, bitget: 3 },
    SOL: { binance: -3, bybit: 12, okx: 8, deribit: 10, bitget: 6 },
    DOGE: { binance: 5, bybit: 15, okx: 10, deribit: 12, bitget: 8 },
    XRP: { binance: 1, bybit: 6, okx: 4, deribit: 5, bitget: 2 },
    AVAX: { binance: -2, bybit: 10, okx: 7, deribit: 8, bitget: 5 },
    MATIC: { binance: 3, bybit: 9, okx: 6, deribit: 7, bitget: 4 },
    LINK: { binance: 0, bybit: 7, okx: 5, deribit: 6, bitget: 3 },
    ARB: { binance: -4, bybit: 14, okx: 9, deribit: 11, bitget: 7 },
    OP: { binance: 2, bybit: 11, okx: 8, deribit: 9, bitget: 5 },
    PEPE: { binance: 8, bybit: 25, okx: 18, deribit: 20, bitget: 15 },
    WIF: { binance: 10, bybit: 30, okx: 22, deribit: 25, bitget: 18 },
    SUI: { binance: 4, bybit: 16, okx: 11, deribit: 13, bitget: 9 },
    APT: { binance: -1, bybit: 8, okx: 5, deribit: 6, bitget: 3 },
    INJ: { binance: 3, bybit: 12, okx: 8, deribit: 10, bitget: 6 },
  },
  oi_rankings: {
    BTC: 1, ETH: 2, SOL: 3, DOGE: 5, XRP: 4,
    AVAX: 8, MATIC: 7, LINK: 6, ARB: 10, OP: 9,
    PEPE: 15, WIF: 20, SUI: 12, APT: 11, INJ: 14,
  },
};

const getOiRankLabel = (rank: number): 'High' | 'Mid' | 'Low' => {
  if (rank <= 5) return 'High';
  if (rank <= 15) return 'Mid';
  return 'Low';
};

const processApiData = (data: ApiResponse): ProcessedArbitrageData[] => {
  const results: ProcessedArbitrageData[] = [];

  for (const [symbol, rates] of Object.entries(data.funding_rates)) {
    const exchanges = Object.entries(rates);
    if (exchanges.length < 2) continue;

    // Find min (long) and max (short) rates
    let minRate = Infinity, maxRate = -Infinity;
    let minExchange = '', maxExchange = '';

    for (const [exchange, rate] of exchanges) {
      const normalizedRate = rate / 100; // Convert to percentage
      if (normalizedRate < minRate) {
        minRate = normalizedRate;
        minExchange = exchange;
      }
      if (normalizedRate > maxRate) {
        maxRate = normalizedRate;
        maxExchange = exchange;
      }
    }

    const netSpread = maxRate - minRate;
    const oiRank = data.oi_rankings[symbol] || 99;

    results.push({
      symbol,
      oiRank,
      oiRankLabel: getOiRankLabel(oiRank),
      longExchange: minExchange,
      longRate: minRate,
      shortExchange: maxExchange,
      shortRate: maxRate,
      netSpread,
      annualizedReturn: netSpread * 3 * 365,
      dailyProfit: netSpread * 3,
      lastUpdated: new Date(),
    });
  }

  // Sort by spread (highest first)
  return results.sort((a, b) => b.netSpread - a.netSpread);
};

export const useFundingData = (refreshInterval = 60000) => {
  const [data, setData] = useState<ProcessedArbitrageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // Try to fetch from API first
      const response = await fetch('https://api.loris.tools/funding', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const apiData: ApiResponse = await response.json();
      const processed = processApiData(apiData);
      setData(processed);
      setError(null);
    } catch (err) {
      // Fallback to mock data if API fails
      console.warn('API fetch failed, using mock data:', err);
      const processed = processApiData(MOCK_DATA);
      setData(processed);
      setError('Using cached data (API unavailable)');
    } finally {
      setIsLoading(false);
      setLastFetch(new Date());
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { data, isLoading, error, lastFetch, refetch: fetchData };
};
