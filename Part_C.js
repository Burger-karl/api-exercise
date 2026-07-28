// part-c-safe.js

require('dotenv').config({ path: __dirname + '/.env' });

const safeFetch = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + process.env.RESTCOUNTRIES_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Server responded ' + response.status);
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

const runTests = async () => {
  const good = await safeFetch('https://api.adviceslip.com/advice');
  console.log('Good URL :', good);

  const badName = await safeFetch('https://api.restcountries.com/countries/v5/names.common/zzzzz');
  console.log('Bad name :', badName);

  const badSite = await safeFetch('https://not-a-real-site-xyz.com');
  console.log('Bad site :', badSite);
};

runTests();