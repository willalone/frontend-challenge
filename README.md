# Кошачий пинтерест

Тестовое задание: галерея на [The Cat API](https://thecatapi.com), макет — [Figma](https://www.figma.com/design/rayuMVOs0czRkfK5UUoW2s/Тестовое-для-front-end-стажёров).

## Запуск

```bash
npm install
npm run dev
```

Сборка: `npm run build`, превью: `npm run preview`.

Тесты: `npm test`. Storybook: `npm run storybook`.

## Что сделано по ТЗ

- По умолчанию вкладка «Все котики».
- Избранное: добавить / убрать, список в `localStorage`.
- Вкладка «Любимые котики» — только избранное.
- Бесконечная подгрузка при скролле (без «шторма» запросов на короткой странице).
- Адаптивная вёрстка, `prefers-reduced-motion`, фокус с клавиатуры.

## Деплой

GitHub Actions собирает `dist` и публикует на GitHub Pages (ветка `main`). В репозитории: **Settings → Pages → Source: GitHub Actions**.

`vite.config.ts`: `base: './'` — чтобы статика открывалась по пути вида `username.github.io/frontend-challenge/`.

## Нюансы

- Запросы идут в браузере на `api.thecatapi.com` и CDN картинок. Из части сетей (в т.ч. РФ) без VPN запросы могут долго висеть или не проходить — это сеть, не баг приложения. Проверка у работодателя с GitHub Pages обычно в нормальной среде.
- На устройствах без hover (тач) кнопка избранного всегда видна, чтобы можно было нажать пальцем.

## Github Pages
https://willalone.github.io/frontend-challenge/
