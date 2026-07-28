// Part-a-advice.js

const getAdvice = async () => {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    console.log('Advice:', data.slip.advice);
};

getAdvice();


// Stretch part: Bonus

const getCatFact = async () => {
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    console.log('Cat Fact:', data.fact);
}

getCatFact();
