# RVuzov Converter for Schedulty

Переводит расписание из формата rvuzov в Schedulty

## Использование

```bash
npm i @schedulty/rvuzov-converter
```

```typescript
import { RVuzov2Schedulty } from '@schedulty/rvuzov-converter';

RVuzov2Schedulty(
    // Ссылка на эндпоинт rvuzov
    process.env.RVUZOV_API_URL,
    // Токен Schedulty
    process.env.SCHEDULTY_TOKEN
);
```