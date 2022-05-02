'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// OLD WAY OF MAKING REQUEST
const renderCountry = (data, classes = '') => {
  const html = `
  <article class="country ${classes}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1_000_000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name} LANG</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name} CUR</p>
  </div>
</article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};
// const getDataCountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', 'https://restcountries.com/v2/name/' + country);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);
//   });
// };

// CALLBACK HELL
// const getDataCountryAndNeighbour = function (country) {
//   // AJAX call 1
//   const request = new XMLHttpRequest();
//   request.open('GET', 'https://restcountries.com/v2/name/' + country);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // render country 1
//     renderCountry(data);

//     // Get neighbour country (2)
//     const neighbour = data.borders?.[0];
//     // if(!neighbour) return

//     // AJAX call country (2)
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', 'https://restcountries.com/v2/alpha/' + neighbour);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getDataCountryAndNeighbour('usa');
// getDataCountryAndNeighbour('lithuania');
// Another example of Callback hell
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//         setTimeout(() => {
//           console.log('5 seconds passed');
//           setTimeout(() => {
//             console.log('6 seconds passed');
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

const getCountry = function (country) {
  fetch('https://restcountries.com/v2/name/' + country)
    .then(response => response.json())
    .then(([data]) => {
      renderCountry(data);
      const neighbour = data.borders?.[0];
      return fetch('https://restcountries.com/v2/alpha/' + neighbour);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 🚫🚫🚫`);
      renderError(`Something went wrong  🚫🚫🚫 ${err.message}`);
      location.reload();
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', () => {
  getCountry('portugal');
});
