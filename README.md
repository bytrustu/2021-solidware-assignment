# Solidware Assignment

## Skills
> CLIENT: Typescript, React, NextJS, Redux, Redux-saga, StyledComponent  
> SERVER: Typescript, NodeJS, Express, MySQL

## Demo Link
http://133.186.159.157:3005

## Command
1. git clone https://github.com/bytrustu/solidware-assignment
2. cd ./client && npm install && npm run dev
3. open new terminal
4. cd ./server && npm install && npm run dev
5. open browser and go to "http://localhost:3005"

## Video
[![유튜브 영상](https://i.imgur.com/fkh4Yvs.png)](https://youtu.be/wQnJ_V-ZFBQ)

## ETC
1. 현 프로젝트에 모바일 대응은 적용하지 않았습니다.
2. 참가 명단에 동일한 이름이 있으면 `중복 처리` 하였습니다.  
3. 그룹 생성 조건이 안될 경우 `에러 메세지` 처리하였습니다.
4. 이름 입력의 경우 `5글자 제한`을 두었습니다.
5. 최소인원, 그룹 수는 `최대 10까지 제한`을 두었습니다. (코드 구현상 기능으로는 제한은 없습니다.)
6. 이전 팀을 생성한 목록은 `우측 사이드`에서 확인 가능합니다.
7. 이전 팀 정보 중 삭제된 인원은 `빨간색 백그라운드로` 표시하였습니다.
8. 팀 정보는 생성된 케이스별로 인원을 `랜덤으로 분배` 하여 표시하도록 하였습니다.
9. 참가 명단과 최근 팀 생성 목록은 `스켈레톤 UI`를 적용하였습니다.
10. 팀 생성과 팀 정보 호출 시 빠르게 연산 되더라도 `사용자 경험`을 위해 1~2초 로딩 지연시간을 주었습니다.