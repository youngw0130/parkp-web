# Alpha Vantage API 설정

## 환경변수 설정 (권장)

### React 웹앱
```bash
cd my-react-app
touch .env.local
# .env.local 파일에 추가: VITE_ALPHA_VANTAGE_API_KEY=X0UGJ3LDUPAL7458
```

### React Native 앱
```bash
cd MyInvestApp
touch .env
# .env 파일에 추가: ALPHA_VANTAGE_API_KEY=X0UGJ3LDUPAL7458
```

자세한 내용: `ENV_SETUP_GUIDE.txt` 참고

## 기본 사용법
```javascript
import { getStockQuote } from './utils/alphaVantageApi';
const data = await getStockQuote('AAPL');
```

## 중요
- `.env` 파일은 Git에 커밋 금지 (.gitignore에 추가됨)
- 프로덕션에서는 다른 API 키 사용
- API 제한: 무료 분당 5회, 일일 100회

