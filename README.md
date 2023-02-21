# 💻 Chatting Desktop App
## [📌 어플리케이션 설치 파일 주소](https://drive.google.com/file/d/18x0_UbnMEXArY6vtA2_knRuqfL19Kxu8/view?usp=sharing)

<div align="center">
   <img width="500px" src="https://user-images.githubusercontent.com/107424974/217604421-2cdf8c7b-5e12-4f46-877b-951068988226.gif"/>
   <br />
   <img width="500px" src="https://user-images.githubusercontent.com/107424974/217604436-a235bf68-b29f-4b46-a974-f1a8e75d01aa.gif"/>
   <br />
   <img width="500px" src="https://user-images.githubusercontent.com/107424974/217604655-c7f347ab-51b4-4bd0-bf91-ac91365287b9.gif"/>
<br />

##### 🗓 구현 일정 : 2023.02.06 - 2023.02.22
  
</div>

</br>

## 목차

1. [프로젝트 실행 방법](#프로젝트-실행-방법)
2. [구현사항](#구현사항)
3. [회고](#회고)

</br>

## 프로젝트 실행 방법

<br>

1. 의존 패키지를 설치합니다.
```bash
npm install
```

2. 파이어 베이스 사용을 위해서 renderer 폴더 하위에 .env 파일을 생성하고 다음과 같은 내용을 추가합니다.
```bash
NEXT_PUBLIC_API=
NEXT_PUBLIC_FIRE_DOMAIN=
NEXT_PUBLIC_FIRE_DATABASE=
NEXT_PUBLIC_FIRE_PROJECT_ID=
```

3. 서버를 실행합니다.
```bash
npm run dev
```

etc. chatty APP에서 이용할 수 있는 테스트 계정 정보입니다.
```bash
email=admin@gmail.com / password=1234567
email=test@gmail.com / password=1234567
email=ahha@gmail.com / password=1234567
```

<br>

## 기술스택

> React, TypeScript, Next.js, Electron, firebase, react-query, ant-design

<br>


## 구현사항

- [x] 회원가입
  <br />
- [x] 로그인
  <br />
- [x] 유저 목록
  <br />
- [x] 1:1 채팅
  <br />
- [x] 그룹채팅
  <br />

#### 1. firebase authentication을 이용한 회원가입, 로그인

https://github.com/Paperkeem/nextron-chatty/blob/9e0d467763a7ea841c3608d2ed60f12b9f39747c/renderer/src/apis/firebase.tsx#L24-L52

- 회원 가입 시, `updateProfile`함수를 체이닝 해 firebase user 정보에 내가 기입한 별명을 `displayName`으로 저장
- 에러 발생 시, `throw new Error`로 에러를 넘겨 로그인 페이지에서 처리

https://github.com/Paperkeem/nextron-chatty/blob/9e0d467763a7ea841c3608d2ed60f12b9f39747c/renderer/src/apis/firebase.tsx#L59-L70
https://github.com/Paperkeem/nextron-chatty/blob/9e0d467763a7ea841c3608d2ed60f12b9f39747c/renderer/src/context/AuthContext.tsx#L11-L32

- 로그인 시 firebase의 `onAuthStateChanged` 함수를 이용해 current user 정보를 받아오도록 구현
- 에러를 대비하여 유저 정보를 localStorage에 이중으로 저장
- context api를 이용해 유저 정보를 전역으로 관리

#### 2. react-query를 이용해 firebase api 호출 / refetchInterval 설정을 통해 폴링 구현

https://github.com/Paperkeem/nextron-chatty/blob/9e0d467763a7ea841c3608d2ed60f12b9f39747c/renderer/pages/chat/%5BroomId%5D.tsx#L17-L20
https://github.com/Paperkeem/nextron-chatty/blob/9e0d467763a7ea841c3608d2ed60f12b9f39747c/renderer/src/hooks/useChat.tsx#L11-L32

- react query의 `refetchInterval을 1000`으로 설정하여 서버 `polling`을 구현
- 같은 query key를 쓰는 함수끼리 custom hook으로 묶어 관리 용이성 증대
- 메세지를 보낼 시에는 useMutation을 이용해 `채팅방 데이터 동기화`를 구현

#### 3. 채팅방 내 중복되는 로직은 custom hook으로 만들어 관리 

https://github.com/Paperkeem/nextron-chatty/blob/9e0d467763a7ea841c3608d2ed60f12b9f39747c/renderer/pages/chat/%5BroomId%5D.tsx#L22-L27
https://github.com/Paperkeem/nextron-chatty/blob/9e0d467763a7ea841c3608d2ed60f12b9f39747c/renderer/src/hooks/useMsg.tsx#L3-L20
https://github.com/Paperkeem/nextron-chatty/blob/9e0d467763a7ea841c3608d2ed60f12b9f39747c/renderer/src/hooks/useScroll.tsx#L3-L11

- 1:1 채팅방과 그룹 채팅방에서 동일하게 쓰이는 input event와 scroll 이벤트를 custom hook으로 관리



