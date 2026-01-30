# HTML5 version

## Uruchomienie statycznej strony

Możesz podać folder `html5` jako katalog statyczny w dowolnym serwerze WWW.

Przykład z prostym serwerem:

```sh
npx serve html5
```

## Formularz kontaktowy

Formularz wysyła dane na endpoint `POST /api/contact`. Upewnij się, że backend działa i ma skonfigurowane dane SMTP.

Aby uruchomić backend:

```sh
cd backend
npm install
cp .env.example .env
npm run start
```

W pliku `.env` ustaw prawidłowe dane SMTP.
