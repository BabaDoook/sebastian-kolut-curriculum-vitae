# HTML5 version

## Uruchomienie statycznej strony

Możesz podać folder `html5` jako katalog statyczny w dowolnym serwerze WWW.

Przykład z prostym serwerem:

```sh
npx serve html5
```

## Formularz kontaktowy

Formularz jest przygotowany do działania na hostingu statycznym i wysyła dane do zewnętrznego endpointu (np. Formspree).

1. Załóż formularz w Formspree i skopiuj adres endpointu (format: `https://formspree.io/f/XYZ`).
2. W pliku `html5/index.html` podmień atrybuty `action` oraz `data-endpoint` w tagu `<form>` na swój adres.

Po uzupełnieniu adresu formularz będzie działał bez backendu.
