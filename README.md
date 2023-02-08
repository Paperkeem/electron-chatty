# 💻 Chatting Desktop App
##### nextron과 firebase를 사용한 데스크탑 채팅 어플리케이션 입니다.

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

##### 🗓 1차 구현 일정 : 2023.02.06 - 2023.02.09

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

<br>

## 기술스택

> React, TypeScript, Next.js, Electron, firebase, ant-design

<br>


## 구현사항


## 회고

 - 리팩토링 하고 싶은 목록입니다.
- [ ] firebase 호출 함수 react-query로 refactoring
  <br />
- [ ] 중복 사용 함수를 custom hook으로 관리
  <br />
- [ ] Chat page 요소들 component로 분리
  <br />
