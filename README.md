# softwareTesting

## React-Express

Начал с фронтенда на React (`./client`) и бэкэнда на Express (`./api`).
Взял пример крестики-нолики с сайта и переворотил.

1. Экран 1: игрок крестик и игрок нолик могут ввести имена. `client` пойдет к `api` и попросит число их побед, если игрока не было в базе - зарегистрирует
2. Экран 1.5: пока не придет ответ, будет написано "Loading" <br>
3. Экран 2 <br>
3.1. первая строка: \[x-player-name\] \[x-score\] - \[o-score\] \[o-player-name\] <br>
3.2. вторая строка: имя победителя или имя того кто должен делать ход <br>
3.3. игровое поле <br>
3.4. внизу: кнопка "Finish" разлогинивает и, если игра закончилась, кнопка "Repeat", обновляющая поле

В случае победы `client` идет к `api` и обновляет результаты, счет в верхней строке меняется.

### Init

`~/softwareTesting/api$ npm update` <br>
`~/softwareTesting/client$ npm update`

### Run

`~/softwareTesting/api$ npm start` <br>
`~/softwareTesting/client$ npm start`

### Tests

* Обычные тесты `~/softwareTesting/client$ npm test ./test/*`
* Cypress `~/softwareTesting/client$ npx cypress open`
* Playwright `~/softwareTesting/client/playwright$ npx folio --param browserName=chromium`

## Spring

В `./backend` лежит spring-приложение. Для взаимодействия с ним клиента нужно изменить `./client/src/index.js`
и указать `"proxy": "http://localhost:8080"` в `./client/package.json`

## Actions

Добавил actions для FE и BE.

## Selenide

В `./selenide` есть UI-тесты
