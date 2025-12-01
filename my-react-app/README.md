# 주식 데이터 시각화 플랫폼

실시간/과거 주가 데이터, 거래량, 기업 뉴스, 지표 등을 모아서 대시보드 형태로 보여주는 서비스입니다.

## 주요 기능

### 1. 개인화 대시보드 & 포트폴리오 관리
- 보유 종목과 관심종목 기반 수익률, 변동성, 위험도 실시간 표시
- 포트폴리오 가치, 일일 손익, 변동성 등 KPI 대시보드
- 보유 종목별 상세 정보 및 수익률 계산

### 2. 실시간 뉴스 & 감성 분석
- 기업 뉴스, 공시 수집
- 긍정/부정 감성 스코어 시각화
- 필터링 기능 (전체/긍정/부정)

### 3. AI 기반 이상징후 탐지 & 알림
- 거래량 급등락, 주가 급변 등 이상 신호 자동 탐지
- 사용자 맞춤 알림 제공
- 알림 타입별 분류 (거래량/가격/뉴스)

### 4. 가상 모의투자 (Paper Trading)
- 실제 시세 기반 가상 자금으로 매매 연습
- 매수/매도 주문 기능
- 거래 내역 조회
- 전략 백테스팅 (준비 중)

### 5. 커뮤니티 & 소셜 트레이딩
- 종목별 인기 토론방
- 전문가 포트폴리오 팔로우
- 인기 투자자들의 수익률 공유

### 6. 관심종목 관리
- 관심종목 추가/관리
- 실시간 가격 및 등락률 모니터링

## 기술 스택

- **React 19** - UI 라이브러리
- **Vite** - 빌드 도구
- **React Router** - 라우팅
- **Tailwind CSS** - 스타일링
- **Recharts** - 차트 라이브러리
- **date-fns** - 날짜 처리

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── KpiCard.jsx
│   ├── PriceChart.jsx
│   ├── NewsList.jsx
│   ├── PortfolioTable.jsx
│   ├── AlertPanel.jsx
│   ├── TradeForm.jsx
│   └── ...
├── pages/              # 페이지 컴포넌트
│   ├── Dashboard.jsx
│   ├── Watchlist.jsx
│   ├── News.jsx
│   ├── Alerts.jsx
│   ├── PaperTrading.jsx
│   └── Community.jsx
├── context/            # 상태 관리
│   └── AppContext.jsx
└── App.jsx            # 메인 앱 컴포넌트
```

## 주요 페이지

- **Dashboard** (`/`) - 메인 대시보드, 포트폴리오 요약
- **Watchlist** (`/watchlist`) - 관심종목 관리
- **News** (`/news`) - 뉴스 & 감성 분석
- **Alerts** (`/alerts`) - 이상징후 알림
- **Paper Trading** (`/paper-trading`) - 가상 모의투자
- **Community** (`/community`) - 커뮤니티 & 소셜 트레이딩

## 향후 개발 계획

- [ ] 실제 주식 API 연동
- [ ] 실시간 데이터 스트리밍
- [ ] 백테스팅 엔진 구현
- [ ] 사용자 인증 및 포트폴리오 저장
- [ ] 모바일 반응형 개선
- [ ] 차트 기능 확장 (기술적 지표 추가)
