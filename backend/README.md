# Web-ларёк — базовая часть бэкенда

Node.js + Express + TypeScript + Mongoose. Реализованы обязательные шаги 1–5.

## Первый запуск

1. Установите Node.js и MongoDB (при локальном запуске MongoDB должен работать на порте 27017).
2. Перейдите в папку `backend`.
3. Запустите `npm install` (первый раз обновит `package-lock.json` для новых зависимостей).
4. Скопируйте `.env.example` в `.env` и укажите актуальный `DB_ADDRESS`.
5. Выполните `npm run dev` для hot reload или `npm run start` для обычного запуска.

Проверка: `npm run build` и `npm run lint`.

## API

- `GET /product`: ответ `{ "items": [...], "total": N }`.
- `POST /product`: создаёт товар, JSON-поля `title`, `image: {fileName, originalName}`, `category`, необязательные `description`, `price`.
- `POST /order`: проверяет заказ, возвращает `{ "id": "UUID", "total": N }`. Заказ в БД не записывается по требованиям базовой части.

В каталоге `.dump/product.json` находятся стартовые товары (загрузите их через MongoDB Compass или отправляйте по одному через POST). Изображения находятся в `src/public/images` и доступны по `/images/имя-файла`.

Логи создаются в `backend/request.log` и `backend/error.log` (оба игнорируются Git).
Дополнительные маршруты авторизации и админки не реализованы: это вторая, необязательная часть задания.
