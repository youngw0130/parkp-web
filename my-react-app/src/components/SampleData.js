export const priceData = Array.from({ length: 20 }, (_, i) => ({
    time: `T${i + 1}`,
    price: Math.round((100 + Math.sin(i / 3) * 8 + i * 0.5) * 100) / 100,
    volume: Math.floor(200 + Math.abs(Math.cos(i / 2)) * 800),
}))

export const newsItems = [
    { id: 1, title: '삼성전자, 3분기 실적 발표', source: '한겨레', time: '어제', score: 0.45, symbol: '005930' },
    { id: 2, title: '전기차 배터리 수요 증가', source: '연합뉴스', time: '오늘', score: -0.12, symbol: '000660' },
    { id: 3, title: '카카오, AI 투자 확대', source: '매일경제', time: '2시간 전', score: 0.32, symbol: '035720' },
    { id: 4, title: '반도체 업황 회복 전망', source: '조선일보', time: '3시간 전', score: 0.58, symbol: '000660' },
    { id: 5, title: '전기차 시장 성장 둔화', source: '한국경제', time: '5시간 전', score: -0.25, symbol: '005380' },
]