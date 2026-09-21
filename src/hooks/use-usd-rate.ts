import { useEffect, useState } from 'react';

/** Cotação de referência usada enquanto a cotação real não chega (ou se as APIs falharem). */
export const FALLBACK_USD_BRL = 5.1;

const CACHE_KEY = 'pa-usd-brl-rate';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora

interface RateSource {
  url: string;
  parse: (payload: unknown) => number;
}

const SOURCES: RateSource[] = [
  {
    url: 'https://economia.awesomeapi.com.br/json/last/USD-BRL',
    parse: (payload) => Number((payload as { USDBRL?: { bid?: string } })?.USDBRL?.bid),
  },
  {
    url: 'https://open.er-api.com/v6/latest/USD',
    parse: (payload) => Number((payload as { rates?: { BRL?: number } })?.rates?.BRL),
  },
];

export interface UsdRate {
  /** Quantos reais valem 1 dólar. */
  rate: number;
  /** true quando a cotação veio de uma das APIs (e não do valor de referência). */
  isLive: boolean;
  /** Momento em que a cotação foi obtida. */
  updatedAt: Date | null;
}

interface CachedRate {
  rate: number;
  fetchedAt: number;
}

const readCache = (): CachedRate | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedRate;
    if (!Number.isFinite(parsed.rate) || parsed.rate <= 0) return null;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeCache = (rate: number, fetchedAt: number) => {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ rate, fetchedAt }));
  } catch {
    // sessionStorage indisponível (modo privado, etc.) — segue sem cache
  }
};

const fetchRate = async (signal: AbortSignal): Promise<number | null> => {
  for (const source of SOURCES) {
    try {
      const response = await fetch(source.url, { signal });
      if (!response.ok) continue;
      const rate = source.parse(await response.json());
      if (Number.isFinite(rate) && rate > 0) return rate;
    } catch (error) {
      if (signal.aborted) return null;
      // tenta a próxima fonte
    }
  }
  return null;
};

/** Busca a cotação atual do dólar (USD -> BRL), com cache de 1h e valor de referência como fallback. */
export const useUsdRate = (): UsdRate => {
  const [state, setState] = useState<UsdRate>(() => {
    const cached = readCache();
    return cached
      ? { rate: cached.rate, isLive: true, updatedAt: new Date(cached.fetchedAt) }
      : { rate: FALLBACK_USD_BRL, isLive: false, updatedAt: null };
  });

  useEffect(() => {
    if (readCache()) return;

    const controller = new AbortController();
    fetchRate(controller.signal).then((rate) => {
      if (rate === null || controller.signal.aborted) return;
      const fetchedAt = Date.now();
      writeCache(rate, fetchedAt);
      setState({ rate, isLive: true, updatedAt: new Date(fetchedAt) });
    });

    return () => controller.abort();
  }, []);

  return state;
};
