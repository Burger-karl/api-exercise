// mini-project-country-explorer.js

require('dotenv').config({ path: __dirname + '/.env' });

const getCountryInfo = async (name) => {
  const response = await fetch(
    'https://api.restcountries.com/countries/v5/names.common/' + name,
    {
      headers: {
        Authorization: 'Bearer ' + process.env.RESTCOUNTRIES_API_KEY
      }
    }
  );

  const json = await response.json();
  const country = json.data.objects[0];

  if (!country) {
    throw new Error('Country not found: ' + name);
  }

  return {
    name: country.names.common,
    capital: country.capitals?.[0]?.name ?? 'Unknown',
    population: country.population.toLocaleString(),
    region: country.region,
    currency: country.currencies?.[0]?.name ?? 'Unknown'
  };
};

const getAdviceOfTheDay = async () => {
  const response = await fetch('https://api.adviceslip.com/advice');
  const data = await response.json();
  return data.slip.advice;
};

const exploreCountry = async (name) => {
  try {
    const [country, advice] = await Promise.all([
      getCountryInfo(name),
      getAdviceOfTheDay()
    ]);

    return { ok: true, country, advice };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

const printProfileCard = (result) => {
  if (!result.ok) {
    console.log('Could not build profile card:', result.message);
    return;
  }

  const country = result.country;
  console.log('===== Country Profile =====');
  console.log('Name      :', country.name);
  console.log('Capital   :', country.capital);
  console.log('Population:', country.population);
  console.log('Region    :', country.region);
  console.log('Currency  :', country.currency);
  console.log('Advice of the day:', result.advice);
};

const run = async () => {
  const good = await exploreCountry('Nigeria');
  printProfileCard(good);

  const bad = await exploreCountry('zzzzz');
  printProfileCard(bad);
};

run();