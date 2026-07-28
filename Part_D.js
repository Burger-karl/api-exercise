// // part-d-dashboard.js

require('dotenv').config({ path: __dirname + '/.env' });

// const loadDashboard = async () => {
//   try {
//     const [adviceRes, factRes, countryRes] = await Promise.all([
//       fetch('https://api.adviceslip.com/advice'),
//       fetch('https://catfact.ninja/fact'),
//       fetch('https://api.restcountries.com/countries/v5/names.common/Nigeria', {
//         headers: { Authorization: 'Bearer ' + process.env.RESTCOUNTRIES_API_KEY }
//       })
//     ]);

//     const [adviceData, factData, countryData] = await Promise.all([
//       adviceRes.json(),
//       factRes.json(),
//       countryRes.json()
//     ]);

//     const country = countryData.data.objects[0];

//     return {
//       advice: adviceData.slip.advice,
//       fact: factData.fact,
//       countryName: country.names.common,
//       countryCapital: country.capitals[0].name
//     };
//   } catch (error) {
//     console.log('Could not load dashboard right now:', error.message);
//     return null;
//   }
// };

// const printDashboard = async () => {
//   const start = Date.now();
//   const dashboard = await loadDashboard();
//   const end = Date.now();

//   if (dashboard) {
//     console.log('Your Daily Dashboard:');
//     console.log('Advice :', dashboard.advice);
//     console.log('Fact   :', dashboard.fact);
//     console.log('Country:', dashboard.countryName, '(capital: ' + dashboard.countryCapital + ')');
//   }

//   console.log('Loaded in', end - start, 'ms');
// };

// printDashboard();


// stretch — timing comparison

const loadDashboardSequential = async () => {
  const start = Date.now();

  const adviceRes = await fetch('https://api.adviceslip.com/advice');
  const adviceData = await adviceRes.json();

  const factRes = await fetch('https://catfact.ninja/fact');
  const factData = await factRes.json();

  const countryRes = await fetch('https://api.restcountries.com/countries/v5/names.common/Nigeria', {
    headers: { Authorization: 'Bearer ' + process.env.RESTCOUNTRIES_API_KEY }
  });
  const countryData = await countryRes.json();

  const end = Date.now();
  console.log('Sequential took', end - start, 'ms');
};

loadDashboardSequential();