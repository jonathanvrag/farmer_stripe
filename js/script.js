import KEYS from './env.js';

const $courses = document.getElementById('courses');
const $template = document.getElementById('coursesCard-template').content;
const $fragment = document.createDocumentFragment();
const options = { headers: { Authorization: `Bearer ${KEYS.secret}` } };

let products, prices;

Promise.all([
  fetch('https://api.stripe.com/v1/products', options),
  fetch('https://api.stripe.com/v1/prices', options),
])
  .then(responses => Promise.all(responses.map(res => res.json())))
  .then(json => {
    products = json[0].data;
    prices = json[1].data;

    prices.forEach(element => {
      let productData = products.filter(
        product => product.id === element.product
      );

      $template.querySelector('.coursesCard-template--card').setAttribute('data-price', element.id);
      $template.querySelector('img').src = productData[0].images[0];
      $template.querySelector('img').alt = productData[0].name;
      $template.querySelector('figcaption').innerHTML = `${productData[0].name} ${element.unit_amount_decimal} ${element.currency}`

      let $clone = document.importNode($template, true);
      $fragment.appendChild($clone);
    });

    $courses.appendChild($fragment);
  });
