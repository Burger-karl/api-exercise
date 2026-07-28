# API Exercise — async/await + fetch

## APIs used

- **Advice Slip API** — `https://api.adviceslip.com/advice` — random advice text (Part A, Part D, Mini Project)
- **Cat Facts API** — `https://catfact.ninja/fact` — random cat fact (Part A stretch, Part D)
- **REST Countries API (v5)** — `https://api.restcountries.com/countries/v5/names.common/{name}` — country data by name (Part B, Part C, Part D, Mini Project)
  - This project originally targeted the REST Countries v3.1 endpoint, which was free and keyless.
    That version was deprecated partway through development. The current v5 endpoint requires a
    free API key (`Authorization: Bearer YOUR_KEY` header). A key is used here and loaded from a
    local `.env` file — it is **not** committed to this repo.

## Setup

1. Install dependencies:
   ```
   npm install dotenv
   ```
2. Create a `.env` file in this folder (same folder as the `.js` files) containing:
   ```
   RESTCOUNTRIES_API_KEY=your_key_here
   ```
   Get a free key at restcountries.com/sign-up. `.env` is listed in `.gitignore` and is never pushed.

## How to run each file

All files use plain Node.js (v18+, since `fetch` is built in). Run each with:

```
node part-a-advice.js
node part-b-country.js
node part-c-safe.js
node part-d-dashboard.js
node mini-project-country-explorer.js
```

- **part-a-advice.js** — fetches and prints a random Advice Slip quote.
- **part-b-country.js** — `getCountryInfo(name)`, returns a clean object with name, capital,
  population, region, and currency for a given country. Includes `?.` / `??` so a country with
  no listed capital shows `'Unknown'` instead of crashing.
- **part-c-safe.js** — `safeFetch(url)`, wraps a fetch in try/catch, checks `response.ok`, and
  always returns `{ ok: true, data }` or `{ ok: false, message }` instead of throwing.
- **part-d-dashboard.js** — `loadDashboard()`, fetches Advice Slip, Cat Facts, and REST Countries
  at the same time with `Promise.all`, prints a combined dashboard, and times the run.
- **mini-project-country-explorer.js** — combines `getCountryInfo` (reused from Part B) and a
  random advice quote via `Promise.all` into a printed country profile card, with a graceful
  failure message for an unrecognized country name.

## AI use disclosure

I used Claude (Anthropic) while working on this exercise, specifically to help debug two problems
that came up in **Part B** and carried through into **Part D**:

1. The REST Countries `v3.1` endpoint named in the original exercise sheet turned out to be
   deprecated. My code was crashing with `Cannot read properties of undefined (reading 'name')`
   because the API was returning a deprecation-notice object instead of country data. Claude
   helped me identify this from the error and the raw JSON I printed, and pointed me to the
   current `v5` endpoint and its authentication requirement.
2. After switching to `v5`, I had a second bug where my API key wasn't being loaded from my
   `.env` file (`dotenv` reported `injected env (0)`). Claude helped me diagnose this as a file
   path issue and fix it using `path: __dirname + '/.env'` so the key loads regardless of which
   folder the terminal is opened from.

All function logic (`getCountryInfo`, `safeFetch`, `loadDashboard`, the Mini Project) was written
and understood by me, following the patterns taught in the async/await and fetch lessons. AI was
used for debugging real API/environment issues that came up during testing, not for generating the
assignment logic itself.