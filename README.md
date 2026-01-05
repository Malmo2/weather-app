# Weather App — enkel väderfrontend ☁️

Ett webbprojekt för att söka och visa väderdata via Open‑Meteo, med en enkel vy för aktuell väderstatus, tim‑ och dygnsprognos samt några detaljkort (feels‑like, luftkvalitet, nederbörd, pressure med mera).

---

## Snabböversikt

- Modern, modulär frontend (ES modules, inga bundlers nödvändiga för enkel körning).
- Sökning via Open‑Meteo geokodning, prognoser från Open‑Meteo och luftkvalitetsdata.
- Lokalt lagrad sökhistorik (localStorage), mörkt läge, och grundläggande tillgänglighet (ARIA-attribut).

---

## Funktioner ✅

- Sök och visa aktuell temperatur, luftfuktighet, vind, nederbörd och UV.
- 7‑dagars prognos och timvis prognos.
- Detaljkort: Average, Feels‑like, UV, Visibility, Humidity, Pressure, Air quality, Precipitation.
- Bakgrundsbilder eller video baserat på väder (Pexels-stöd).
- Enkla enhetstester med Jest finns under `js/tests/`.

---

## Teknologi & beroenden 🔧

- Ren JavaScript (ES modules), moderna webbläsare.
- CSS + Font Awesome (ikoner) + Leaflet (karta).
- Test: Jest (devDependency i `package.json`).

---

## Kör lokalt (snabbt)


1. Öppna `index.html` i din webbläsare (dubbelklick eller via Live Server i VS Code).

eller

1. Kör en enkel filserver, t.ex. med npm:

   ```bash
   npm install -g serve
   serve -s .
   ```

2. Öppna den serverade sidan i webbläsaren.

---

## Tester 🧪

Testfilernas plats: `js/tests/`.

Kör testerna (lokalt):

```bash
npm install
npm test
```

Testskriptet i `package.json` använder Jest (JSDOM). Om du inte kör Node-tester behöver du inte installera något för att köra appen i webbläsaren.

---

## API:er & nycklar 🌐

- Geokodning: `https://geocoding-api.open-meteo.com/v1/search`
- Prognos: `https://api.open-meteo.com/v1/forecast`
- Luftkvalitet: `https://air-quality-api.open-meteo.com/v1/air-quality`
- Valfri bakgrund via Pexels (se `js/backgroundService.js`)

Notera: Pexels kräver en API-nyckel. I `js/backgroundService.js` finns en variabel `PEXELS_API_KEY` — byt ut eller konfigurera den på ett säkert sätt i produktionsprojekt.

---

## Projektstruktur (kort)

- `index.html` — huvudvyn
- `style.css` — globala stilar
- `maintest.js` — appens samlingspunkt (event-listeners, init)
- `js/` — applikationskod
  - `weatherService.js` — wrapper för Open‑Meteo anrop
  - `7dayforecast/`, `Hourlyforecast/` — prognoslogik och rendering
  - `data/` — bygg och uppdatera detaljvydata
  - `rendering/` & `newjs/rendering/` — helpers för att skapa kort/element
  - `utils/` — hjälpfunktioner (t.ex. enkel rate-limit i `ApiFilter.js`)
- `js/tests/` — Jest-tester
- `newjs/` — experimentell/refaktorerad kod (valfri)

---

## Tillgänglighet & kvalitet

- Grundläggande ARIA-användning i sökfält, dynamiska uppdateringar använder `aria-live` där det är lämpligt.
- Enkla enhetstester finns; fler tester rekommenderas för kritisk logik.

---

## Kända detaljer / tips ⚠️

- Enkel rate-limit i `js/utils/ApiFilter.js` (sparar tidsstämplar per URL). Kommentaren i filen säger 60s men koden använder 10s (10000 ms) — dubbelkolla om du vill strikt 60s.
- Pexels-nyckeln är hårdkodad i `js/backgroundService.js` — byt ut eller använd miljövariabler i produktionsprojekt.

---

## Bidra

- Forka repot och öppna en PR med tydlig beskrivning.
- För större ändringar: öppna först en issue för att diskutera förslag.
