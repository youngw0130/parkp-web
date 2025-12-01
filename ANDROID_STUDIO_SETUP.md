# Android Studio 초기 설정 가이드 (완전 초보자용)

이 가이드는 React Native 프로젝트를 Android Studio에서 실행하기 위한 **처음부터 끝까지**의 설정 과정을 설명합니다.

---

## 📋 사전 준비사항

### 필수 설치 항목 확인
다음 항목들이 설치되어 있어야 합니다:
- ✅ **Node.js** (버전 20 이상) - [다운로드](https://nodejs.org/)
- ✅ **npm** 또는 **yarn** (Node.js와 함께 설치됨)
- ✅ **Java Development Kit (JDK)** - Android Studio 설치 시 자동 포함

**Node.js 설치 확인:**
```bash
node --version  # v20.x.x 이상이어야 함
npm --version   # 버전이 표시되면 정상
```

---

## 1단계: Android Studio 설치

### 1.1 Android Studio 다운로드 및 설치

1. **Android Studio 다운로드**
   - 공식 사이트: https://developer.android.com/studio
   - macOS용 `.dmg` 파일 다운로드

2. **설치 과정**
   - 다운로드한 `.dmg` 파일을 더블클릭
   - Android Studio 아이콘을 Applications 폴더로 드래그
   - Applications 폴더에서 Android Studio 실행

3. **첫 실행 설정**
   - "Welcome to Android Studio" 화면이 나타남
   - **"More Actions"** > **"SDK Manager"** 클릭
   - 또는 나중에 `Tools` > `SDK Manager`에서 접근 가능

### 1.2 Android SDK 설치

**SDK Platforms 탭:**
1. **SDK Platforms** 탭 선택
2. ✅ **Android 14.0 (API 34)** 또는 **Android 15.0 (API 35)** 체크
3. ✅ **Show Package Details** 체크하여 세부 항목 확인
4. ✅ **Android SDK Platform 34** 또는 **35** 체크 (필수)
5. ✅ **Google APIs** 또는 **Google Play** 체크 (선택사항)

**SDK Tools 탭:**
1. **SDK Tools** 탭 선택
2. 다음 항목들을 체크:
   - ✅ **Android SDK Build-Tools** (최신 버전, 필수)
   - ✅ **Android Emulator** (필수)
   - ✅ **Android SDK Platform-Tools** (필수)
   - ✅ **Android SDK Command-line Tools** (필수)
   - ✅ **Intel x86 Emulator Accelerator (HAXM installer)** (Intel Mac인 경우)
   - ✅ **Google Play services** (선택사항)
   - ✅ **Google Play Store** (선택사항)

3. **Apply** 클릭하여 설치 시작
   - 다운로드 및 설치에 시간이 걸릴 수 있습니다 (10-30분)
   - 완료될 때까지 대기

### 1.3 Android SDK 경로 확인

설치 완료 후 SDK 경로를 확인합니다:

1. Android Studio에서:
   - `Android Studio` > `Preferences` (또는 `Settings` - Windows/Linux)
   - `Appearance & Behavior` > `System Settings` > `Android SDK`
   - **"Android SDK Location"**에 표시된 경로 확인
   - 일반적으로: `/Users/[사용자명]/Library/Android/sdk`

2. 터미널에서 확인:
```bash
echo $ANDROID_HOME
# 또는
ls ~/Library/Android/sdk
```

### 1.4 환경 변수 설정

터미널에서 실행:

```bash
# ~/.zshrc 파일 열기 (macOS 기본 쉘)
nano ~/.zshrc

# 또는 bash를 사용하는 경우
# nano ~/.bash_profile
```

파일이 열리면 다음 내용을 **파일 끝에** 추가:

```bash
# Android SDK 환경 변수
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

**저장 및 적용:**
- `Ctrl + O` (저장)
- `Enter` (확인)
- `Ctrl + X` (종료)
- 다음 명령어로 적용:
```bash
source ~/.zshrc
```

**환경 변수 확인:**
```bash
echo $ANDROID_HOME
adb version  # adb가 인식되면 성공
```

## 2단계: Android Virtual Device (AVD) 생성

AVD는 Android 앱을 테스트할 수 있는 가상의 Android 기기입니다.

### 2.1 Device Manager 열기

1. Android Studio 실행
2. **"More Actions"** > **"Virtual Device Manager"** 클릭
   - 또는 상단 메뉴: `Tools` > `Device Manager`
   - 또는 Welcome 화면에서 직접 "Virtual Device Manager" 선택

### 2.2 가상 기기 생성

1. **"Create Device"** 버튼 클릭

2. **기기 선택 화면:**
   - **Phone** 카테고리 선택
   - **Pixel 5** 또는 **Pixel 6** 추천 (성능과 호환성 좋음)
   - 또는 원하는 기기 선택
   - **"Next"** 클릭

3. **시스템 이미지 선택:**
   - **Release Name** 열에서 **API Level 34 (Android 14)** 또는 **35 (Android 15)** 선택
   - **다운로드 아이콘 (↓)** 클릭하여 시스템 이미지 다운로드 (처음인 경우)
   - 다운로드 완료 후 해당 이미지 선택
   - **"Next"** 클릭

4. **AVD 구성 확인:**
   - AVD 이름 확인 (변경 가능)
   - **"Finish"** 클릭

### 2.3 AVD 테스트 실행

1. 생성된 AVD 목록에서 원하는 AVD 선택
2. **▶ (Play)** 버튼 클릭
3. 에뮬레이터가 시작됩니다 (처음 시작은 1-2분 소요)
4. Android 홈 화면이 나타나면 성공!

**에뮬레이터가 느린 경우:**
- AVD 설정에서 **Graphics**를 **Hardware - GLES 2.0**으로 변경
- 또는 더 가벼운 시스템 이미지 사용 (예: x86_64)

## 3단계: 프로젝트 준비 및 설정

### 3.1 프로젝트 의존성 설치

먼저 React Native 프로젝트의 Node.js 의존성을 설치합니다:

```bash
# 프로젝트 루트로 이동
cd /Users/ygw/parkp/MyInvestApp

# 의존성 설치 (처음 한 번만)
npm install

# 또는 yarn을 사용하는 경우
# yarn install
```

**설치 시간:** 5-10분 정도 소요될 수 있습니다.

### 3.2 local.properties 파일 생성

Android SDK 경로를 프로젝트에 알려주는 파일을 생성합니다:

```bash
# android 폴더로 이동
cd /Users/ygw/parkp/MyInvestApp/android

# local.properties 파일 생성
echo "sdk.dir=$HOME/Library/Android/sdk" > local.properties
```

**또는 수동으로 생성:**
1. `MyInvestApp/android` 폴더로 이동
2. `local.properties` 파일 생성 (텍스트 에디터 사용)
3. 다음 내용 입력:
```
sdk.dir=/Users/[사용자명]/Library/Android/sdk
```
⚠️ `[사용자명]`을 실제 사용자명으로 변경하세요!

**사용자명 확인 방법:**
```bash
whoami
```

### 3.3 Android Studio에서 프로젝트 열기

1. Android Studio 실행
2. **"Open"** 클릭
3. **중요:** `/Users/ygw/parkp/MyInvestApp/android` 폴더 선택
   - ❌ `MyInvestApp` 폴더가 아닙니다!
   - ✅ `MyInvestApp/android` 폴더입니다!
4. **"OK"** 클릭

### 3.4 Gradle 동기화

프로젝트를 열면 자동으로 Gradle 동기화가 시작됩니다:

1. **하단 상태바 확인:**
   - "Gradle sync in progress..." 메시지 확인
   - 진행률 표시줄 확인

2. **완료 대기:**
   - 처음에는 10-20분 정도 걸릴 수 있습니다
   - 인터넷 연결이 필요합니다 (의존성 다운로드)
   - "Gradle sync completed" 메시지가 나타나면 완료

**수동 동기화가 필요한 경우:**
- 상단 메뉴: `File` > `Sync Project with Gradle Files`
- 또는 상단 툴바의 동기화 아이콘 (🔄) 클릭

**Gradle 동기화 실패 시:**
- 인터넷 연결 확인
- Android Studio 재시작
- `File` > `Invalidate Caches / Restart` > `Invalidate and Restart`

## 4단계: Metro Bundler 실행

Metro Bundler는 React Native의 JavaScript 번들러입니다. 앱을 실행하기 전에 반드시 실행되어 있어야 합니다.

### 4.1 터미널에서 Metro Bundler 시작

**새 터미널 창을 열고** (기존 터미널과 별도로):

```bash
# 프로젝트 루트로 이동
cd /Users/ygw/parkp/MyInvestApp

# Metro Bundler 시작
npm start
```

**성공 메시지 예시:**
```
Metro waiting on exp://192.168.x.x:8081
```

또는
```
Welcome to Metro!
Fast - Scalable - Integrated

To reload the app press "r"
To open developer menu press "d"
```

### 4.2 Metro Bundler 확인

1. **터미널 확인:**
   - "Metro waiting on..." 메시지가 보이면 정상
   - 에러 메시지가 없으면 정상

2. **브라우저 확인 (선택사항):**
   - 브라우저에서 `http://localhost:8081` 접속
   - Metro bundler 상태 페이지가 표시되면 정상

**⚠️ 중요:**
- Metro Bundler는 **앱을 실행하는 동안 계속 실행**되어 있어야 합니다
- 이 터미널 창을 닫지 마세요!
- 앱을 종료할 때는 `Ctrl + C`로 Metro Bundler도 종료할 수 있습니다

## 5단계: 앱 실행

### 방법 1: Android Studio에서 실행 (추천)

**준비사항:**
1. ✅ AVD가 실행 중이어야 함 (Device Manager에서 ▶ 버튼으로 실행)
2. ✅ Metro Bundler가 실행 중이어야 함 (4단계 참고)
3. ✅ Android Studio에서 프로젝트가 열려 있어야 함

**실행 단계:**
1. Android Studio 상단 툴바 확인:
   - 실행 대상 드롭다운에서 **"app"** 선택되어 있는지 확인
   - 없으면 드롭다운을 클릭하여 "app" 선택

2. **▶ (Run)** 버튼 클릭
   - 또는 상단 메뉴: `Run` > `Run 'app'`
   - 또는 단축키: `Shift + F10` (Mac: `Ctrl + R`)

3. **빌드 진행 확인:**
   - 하단 "Build" 탭에서 빌드 진행 상황 확인
   - 처음 빌드는 5-10분 정도 걸릴 수 있습니다
   - "BUILD SUCCESSFUL" 메시지가 나타나면 성공

4. **앱 실행 확인:**
   - 에뮬레이터에 앱이 자동으로 설치되고 실행됩니다
   - "MyInvestApp" 앱이 에뮬레이터에 표시되면 성공!

### 방법 2: 터미널에서 실행

**준비사항:**
1. ✅ AVD가 실행 중이어야 함
2. ✅ Metro Bundler가 실행 중이어야 함 (다른 터미널에서)

**실행 단계:**
1. **새 터미널 창** 열기 (Metro Bundler와 별도로)

2. 다음 명령어 실행:
```bash
cd /Users/ygw/parkp/MyInvestApp
npm run android
```

3. 빌드 및 실행이 자동으로 진행됩니다
4. 에뮬레이터에 앱이 설치되고 실행됩니다

**두 방법의 차이:**
- **방법 1 (Android Studio):** 디버깅 도구 사용 가능, 로그 확인 용이
- **방법 2 (터미널):** 빠른 실행, 간단한 테스트에 적합

## 6단계: 문제 해결

### 문제 1: "SDK location not found" 오류

**증상:**
- Android Studio에서 "SDK location not found" 오류 메시지
- Gradle 동기화 실패

**해결:**
```bash
# android 폴더로 이동
cd /Users/ygw/parkp/MyInvestApp/android

# local.properties 파일 생성
echo "sdk.dir=$HOME/Library/Android/sdk" > local.properties

# 파일 내용 확인
cat local.properties
```

**확인:**
- `sdk.dir=/Users/[사용자명]/Library/Android/sdk` 형식이어야 함
- 사용자명이 올바른지 확인: `whoami`

### 문제 2: Gradle 빌드 실패

**증상:**
- "BUILD FAILED" 메시지
- Gradle 동기화 실패

**해결:**
```bash
# android 폴더로 이동
cd /Users/ygw/parkp/MyInvestApp/android

# Gradle 캐시 정리
./gradlew clean

# 프로젝트 루트로 돌아가기
cd ..

# 다시 실행
npm run android
```

**추가 해결 방법:**
- Android Studio: `File` > `Invalidate Caches / Restart` > `Invalidate and Restart`
- 인터넷 연결 확인 (의존성 다운로드 필요)

### 문제 3: Metro Bundler 포트 충돌

**증상:**
- "Port 8081 already in use" 오류
- Metro Bundler가 시작되지 않음

**해결:**
```bash
# 포트 8081 사용 중인 프로세스 찾기
lsof -ti:8081

# 프로세스 종료
lsof -ti:8081 | xargs kill -9

# Metro Bundler 다시 시작
cd /Users/ygw/parkp/MyInvestApp
npm start
```

**또는 다른 포트 사용:**
```bash
npm start -- --port 8082
```

### 문제 4: AVD가 시작되지 않음

**증상:**
- 에뮬레이터가 시작되지 않음
- "Emulator: Process finished with exit code 1" 오류

**해결:**
1. **HAXM 설치 확인 (Intel Mac):**
   - Android Studio > `Tools` > `SDK Manager`
   - `SDK Tools` 탭에서 **Intel x86 Emulator Accelerator (HAXM)** 설치 확인

2. **ARM 기반 시스템 이미지 사용 (Apple Silicon Mac):**
   - AVD 생성 시 ARM 기반 이미지 선택
   - 예: "arm64-v8a" 시스템 이미지

3. **에뮬레이터 재생성:**
   - Device Manager에서 기존 AVD 삭제
   - 새로운 AVD 생성

### 문제 5: "Command not found: adb"

**증상:**
- 터미널에서 `adb` 명령어를 인식하지 못함

**해결:**
```bash
# 환경 변수 다시 적용
source ~/.zshrc

# adb 확인
adb version

# 여전히 안 되면 경로 직접 확인
ls ~/Library/Android/sdk/platform-tools/adb

# 경로가 다르면 ~/.zshrc 파일 수정
nano ~/.zshrc
```

### 문제 6: "Could not connect to development server"

**증상:**
- 앱이 실행되지만 빨간 화면에 연결 오류 표시

**해결:**
1. **Metro Bundler 실행 확인:**
   - Metro Bundler가 실행 중인지 확인
   - 터미널에서 "Metro waiting on..." 메시지 확인

2. **에뮬레이터에서 수동 연결:**
   - 에뮬레이터에서 `Ctrl + M` (Mac: `Cmd + M`)
   - "Dev Settings" 선택
   - "Debug server host & port for device" 입력
   - `localhost:8081` 입력

3. **앱 재로드:**
   - 에뮬레이터에서 `R` 키 두 번 누르기
   - 또는 Dev Menu에서 "Reload" 선택

### 문제 7: Gradle 동기화가 너무 오래 걸림

**증상:**
- Gradle 동기화가 30분 이상 걸림

**해결:**
1. **인터넷 연결 확인**
2. **Gradle 캐시 정리:**
```bash
cd /Users/ygw/parkp/MyInvestApp/android
./gradlew clean --refresh-dependencies
```

3. **오프라인 모드 해제:**
   - Android Studio > `File` > `Settings` > `Build, Execution, Deployment` > `Gradle`
   - "Offline work" 체크 해제

### 문제 8: "Execution failed for task ':app:installDebug'"

**증상:**
- 빌드는 성공했지만 앱 설치 실패

**해결:**
1. **에뮬레이터 재시작**
2. **기존 앱 삭제:**
   - 에뮬레이터에서 "MyInvestApp" 앱 삭제
   - 다시 실행

3. **ADB 재시작:**
```bash
adb kill-server
adb start-server
```

## 7단계: 성공 확인

앱이 정상적으로 실행되면 다음을 확인할 수 있습니다:

### ✅ 성공 확인 체크리스트

- [ ] 에뮬레이터에 앱이 설치되고 실행됨
- [ ] "MyInvestApp" 앱이 에뮬레이터에 표시됨
- [ ] 하단 탭 네비게이션 표시 (대시보드, 관심종목, 뉴스, 알림, 모의투자)
- [ ] 대시보드 화면에 포트폴리오 정보 표시
- [ ] 화면 전환이 정상적으로 작동함
- [ ] 에러 메시지가 없음 (빨간 화면 없음)

### 🎉 축하합니다!

앱이 정상적으로 실행되었다면 Android Studio 설정이 완료된 것입니다!

---

## 8단계: 다음 단계

### 개발 환경 활용

1. **코드 수정 및 실시간 반영:**
   - `App.tsx` 또는 다른 파일 수정
   - 저장하면 자동으로 앱에 반영됨 (Fast Refresh)
   - 반영이 안 되면 `R` 키 두 번 누르기

2. **디버깅:**
   - Android Studio의 Logcat에서 로그 확인
   - `Console.log()` 출력 확인
   - 브레이크포인트 설정 가능

3. **실제 기기에서 테스트:**
   - USB 디버깅 활성화
   - 실제 Android 기기 연결
   - Android Studio에서 기기 선택하여 실행

### 유용한 단축키

**Android Studio:**
- **Run**: `Shift + F10` (Mac: `Ctrl + R`)
- **Stop**: `Ctrl + F2` (Mac: `Cmd + F2`)
- **Gradle 동기화**: `Ctrl + Shift + O` (Mac: `Cmd + Shift + O`)

**에뮬레이터:**
- **Reload**: `R` 키 두 번 누르기
- **Dev Menu**: `Ctrl + M` (Windows/Linux) 또는 `Cmd + M` (Mac)
- **개발자 옵션**: `Ctrl + M` > "Settings" > "Developer options"

**Metro Bundler (터미널):**
- **Reload**: `r` 키
- **Dev Menu**: `d` 키
- **종료**: `Ctrl + C`

---

## 📚 추가 리소스

### 공식 문서
- [React Native 공식 문서](https://reactnative.dev/docs/getting-started)
- [Android 개발자 가이드](https://developer.android.com/guide)
- [Android Studio 사용 가이드](https://developer.android.com/studio/intro)

### 유용한 명령어 모음

```bash
# 프로젝트 루트에서

# Metro Bundler 시작
npm start

# Android 앱 실행
npm run android

# iOS 앱 실행 (Mac만)
npm run ios

# 린트 검사
npm run lint

# 테스트 실행
npm test

# Android 빌드 정리
cd android && ./gradlew clean && cd ..

# 의존성 재설치
rm -rf node_modules && npm install
```

---

## 💡 팁

1. **성능 최적화:**
   - 에뮬레이터가 느리면 AVD 설정에서 RAM을 늘려보세요
   - Graphics를 "Hardware - GLES 2.0"으로 설정

2. **빠른 개발:**
   - Metro Bundler는 계속 실행해두세요
   - 코드 수정 후 자동으로 반영됩니다

3. **문제 발생 시:**
   - 먼저 이 가이드의 "문제 해결" 섹션 확인
   - Android Studio 재시작
   - 프로젝트 클린 빌드

4. **버전 관리:**
   - `package.json`에서 React Native 버전 확인
   - Android SDK 버전과 호환성 확인

---

## ✅ 설정 완료 체크리스트

전체 설정이 완료되었는지 확인하세요:

- [ ] Android Studio 설치 완료
- [ ] Android SDK 설치 완료 (API 34 이상)
- [ ] 환경 변수 설정 완료 (`ANDROID_HOME`)
- [ ] AVD 생성 완료
- [ ] 프로젝트 의존성 설치 완료 (`npm install`)
- [ ] `local.properties` 파일 생성 완료
- [ ] Android Studio에서 프로젝트 열기 완료
- [ ] Gradle 동기화 완료
- [ ] Metro Bundler 실행 성공
- [ ] 앱 실행 성공

**모든 항목이 체크되면 설정 완료입니다!** 🎉

