// src/api/newsApi.js
import http from './http';

const NEWS_API_BASE = 'https://newsapi.org/v2';
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

console.log('[NEWS] apiKey:', apiKey ? 'OK (no null)' : 'FALTA');

export async function getLatamWeatherNewsEverything() {
  try {
    const resp = await http.get(`${NEWS_API_BASE}/everything`, {
      params: {
        q: 'clima OR "cambio climático" OR "ola de calor" OR tormenta OR lluvia OR weather',
        language: 'es',
        sortBy: 'publishedAt',
        pageSize: 5,
        apiKey,
      },
    });

    console.log(
      '[NEWS everything] status:',
      resp.data.status,
      'total:',
      resp.data.totalResults,
    );

    const articles = (resp.data.articles || []).map((a) => ({
      ...a,
      region: 'Noticias en español',
    }));

    return articles;
  } catch (error) {
    console.error('[NEWS everything] Error:', error);
    return [];
  }
}