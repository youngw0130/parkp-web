# MyInvest - 주식 투자 플랫폼 (하이브리드)

주식 데이터 시각화 플랫폼의 웹 버전과 모바일 앱 버전을 함께 개발하는 하이브리드 프로젝트입니다.

## 프로젝트 구조

```
parkp/
├── my-react-app/          # React 웹 앱
├── MyInvestApp/           # React Native 모바일 앱
└── shared/                # 공통 코드 (Context, Types, Utils)
    └── src/
        └── context/       # AppContext (웹/앱 공유)
```

## 공통 코드 (shared)

웹과 앱이 공유하는 로직과 타입 정의:
- `AppContext`: 포트폴리오, 뉴스, 알림, 모의투자 등 전역 상태 관리
- TypeScript로 작성되어 타입 안정성 보장

## 웹 앱 (my-react-app)

React + Vite 기반 웹 애플리케이션

### 실행 방법
```bash
cd my-react-app
npm install
npm run dev
```

### 주요 기능
- 대시보드 (포트폴리오 요약)
- 관심종목 관리
- 실시간 뉴스 & 감성 분석
- AI 기반 이상징후 탐지 & 알림
- 가상 모의투자
- 커뮤니티 & 소셜 트레이딩

## 모바일 앱 (MyInvestApp)

React Native 기반 iOS/Android 앱

### 실행 방법

#### iOS
```bash
cd MyInvestApp
npm install
cd ios && pod install && cd ..
npm run ios
```

#### Android
```bash
cd MyInvestApp
npm install
npm run android
```

### 주요 기능
- 대시보드 (포트폴리오 요약)
- 관심종목 관리
- 실시간 알림 (푸시 알림)
- 모의투자
- 차트 시각화

## 설치된 라이브러리

### 웹 앱
- React 19
- Vite
- React Router
- Tailwind CSS
- Recharts

### 모바일 앱
- React Native 0.82
- React Navigation (Bottom Tabs)
- React Native Chart Kit
- React Native SVG
- AsyncStorage

## 개발 가이드

### 공통 코드 수정
`shared/src/` 폴더의 코드를 수정하면 웹과 앱 모두에 반영됩니다.

### 웹 전용 기능
웹 앱의 `my-react-app/src/` 폴더에 구현

### 앱 전용 기능
모바일 앱의 `MyInvestApp/src/` 폴더에 구현

## 향후 계획

- [ ] 웹 앱도 shared 코드 사용하도록 마이그레이션
- [ ] 실시간 데이터 스트리밍 (WebSocket)
- [ ] 푸시 알림 구현
- [ ] 차트 라이브러리 통합
- [ ] 백엔드 API 연동
- [ ] 사용자 인증 및 데이터 동기화

