# HTML5 version

## Uruchomienie statycznej strony

Możesz podać folder `html5` jako katalog statyczny w dowolnym serwerze WWW.

Przykład z prostym serwerem:

```sh
npx serve html5
```

## Formularz kontaktowy

Formularz jest przygotowany do działania na hostingu statycznym i wysyła dane do zewnętrznego endpointu (np. Web3Forms).

1. Załóż formularz w Web3Forms i skopiuj klucz dostępu (`access_key`).
2. W pliku `html5/index.html` uzupełnij wartość pola `access_key` oraz upewnij się, że atrybuty `action` i `data-endpoint` wskazują na `https://api.web3forms.com/submit`.

Po uzupełnieniu adresu formularz będzie działał bez backendu.
