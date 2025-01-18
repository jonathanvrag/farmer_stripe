/**
 * Este script gestiona la visualización de cursos y la integración con Stripe para procesar pagos.
 *
 * **Flujo del código:**
 * 1. **Obtiene las claves de la API de Stripe:** Importa las claves desde `env.js`. **ADVERTENCIA:** Exponer la clave secreta en el cliente es una vulnerabilidad de seguridad. Esta lógica debería estar en el servidor.
 * 2. **Obtiene productos y precios:** Realiza dos llamadas a la API de Stripe para obtener la lista de productos y sus precios.
 * 3. **Crea las tarjetas de cursos:** Itera sobre los precios, busca el producto correspondiente y crea una tarjeta para cada curso con su información (imagen, nombre y precio).
 * 4. **Añade las tarjetas al DOM:** Inserta las tarjetas de cursos en el elemento con el ID 'courses'.
 * 5. **Gestiona los clics en las tarjetas:**  Cuando se hace clic en una tarjeta, redirige al usuario a la página de pago de Stripe con el `priceId` correspondiente.
 * 6. **Manejo de errores:** Muestra un mensaje de error en el DOM si ocurre algún problema durante la solicitud a la API de Stripe o en el proceso de pago.
 *
 * **Dependencias:**
 * - `env.js`: Contiene las claves de la API de Stripe.
 * - Stripe.js: Librería de Stripe para la integración del proceso de pago.
 * - Un elemento HTML con el ID 'courses' para mostrar las tarjetas.
 * - Un template HTML con el ID 'coursesCard-template' para crear las tarjetas.
 */

import KEYS from './env.js';

const $courses = document.getElementById('courses');
const $template = document.getElementById('coursesCard-template').content;
const $fragment = document.createDocumentFragment();
const options = { headers: { Authorization: `Bearer ${KEYS.secret}` } };

// Función para formatear el precio
const formatPrice = num => `${num.slice(0, -2)}.${num.slice(-2)}`;

let products, prices;

// Obtiene productos y precios de la API de Stripe
Promise.all([
  fetch('https://api.stripe.com/v1/products', options),
  fetch('https://api.stripe.com/v1/prices', options),
])
  .then(responses => Promise.all(responses.map(res => res.json())))
  .then(json => {
    products = json[0].data;
    prices = json[1].data;

    // Encuentra el producto correspondiente al precio
    prices.forEach(element => {
      let productData = products.filter(
        product => product.id === element.product
      );

      // Rellena la plantilla con la información del producto y el precio
      $template
        .querySelector('.coursesCard-template--card')
        .setAttribute('data-price', element.id);
      $template.querySelector('img').src = productData[0].images[0];
      $template.querySelector('img').alt = productData[0].name;
      $template.querySelector('figcaption').innerHTML = `${
        productData[0].name
      } ${formatPrice(
        element.unit_amount_decimal
      )} ${element.currency.toUpperCase()}`;

      let $clone = document.importNode($template, true);
      $fragment.appendChild($clone);
    });

    $courses.appendChild($fragment);
  })
  // Manejo básico de errores
  .catch(error => {
    let message = error.statusText || 'An error occurred in the request';

    $courses.innerHTML = `Error ${error.status}: ${message}`;
  });

// Manejador de clics para redirigir al checkout de Stripe
document.addEventListener('click', event => {
  if (event.target.matches('.coursesCard-template--card *')) {
    let priceId = event.target.parentElement.getAttribute('data-price');

    Stripe(KEYS.public)
      .redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'payment', // Modo de pago único, para manejar un pago recurrente escribir 'subscription'
        successUrl: 'http://127.0.01:5500/layout/success.html',
        cancelUrl: 'http://127.0.01:5500/layout/cancel.html',
      })
      .then(response => {
        if (response.error) {
          // Manejo básico de errores de Stripe
          $courses.insertAdjacentElement('afterend', response.error.message);
        }
      });
  }
});
