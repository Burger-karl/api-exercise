
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

  return {
    name: country.names.common,
    capital: country.capitals?.[0]?.name ?? 'Unknown',
    population: country.population.toLocaleString(),
    region: country.region,
    currency: country.currencies?.[0]?.name ?? 'Unknown'
  };
};

const runExamples = async () => {
  const nigeria = await getCountryInfo('Nigeria');
  console.log(nigeria);

  const japan = await getCountryInfo('Japan');
  console.log(japan);
};

runExamples();
