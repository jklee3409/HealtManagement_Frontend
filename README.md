### **Frontend README.md**

# FitWell Frontend

## 프로젝트 소개 📋
FitWell의 프론트엔드 애플리케이션은 React를 기반으로 한 개인화된 건강 관리 웹 서비스입니다.  
로그인, 회원가입, 식단 및 운동 기록, 피드백 분석 등 다양한 UI 기능을 제공합니다.

---

## 기술 스택 🔧
- **언어**: JavaScript (ES6+)
- **프레임워크**: React
- **상태 관리**: Redux
- **스타일링**: TailwindCSS
- **빌드 도구**: Vite
- **API 통신**: Axios

---

## 주요 화면 🖥️
### 1. **로그인 및 회원가입**
- **카카오 로그인**을 활용한 간편 로그인.  
- 회원가입 시 기본적인 신체 정보와 건강 목표 설정 가능.

### 2. **홈페이지**
- 서비스 소개 및 주요 기능 간략 안내. 페이드인 애니메이션을 통한 부드러운 UI 구현  
- 로그인 상태에 따라 '로그아웃', '대시보드' 버튼 활성화.

### 3. **대시보드**
- **식단 및 운동 기록** 입력: 간단한 UI로 데이터 기록 가능.  
- **주간 및 월간 리포트** 시각화: 차트로 건강 상태 확인.
![report](https://github.com/user-attachments/assets/e7f5f041-4263-4a61-a674-ea5ef7f6cc5f)
![input](https://github.com/user-attachments/assets/0ce12311-38db-48b5-997d-1f0c0f58c61d)

### 4. **피드백 분석**
- ChatGPT API를 통한 개인화된 피드백 제공.
  ![feedback](https://github.com/user-attachments/assets/8458de3b-29d1-4da5-bf9a-91f8a4a91269)

---

## 프로젝트 구조 📂
```plaintext
src
├── components         # 재사용 가능한 컴포넌트
├── pages              # 주요 페이지 (Signup, Dashboard 등)
├── redux              # Redux 상태 관리
├── services           # API 호출 관련 코드
└── styles             # TailwindCSS 스타일 설정
