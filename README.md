# Farmer Stripe

Este proyecto es una integración con Stripe para gestionar la visualización de cursos y el procesamiento de pagos.

## Estructura del Proyecto y descripción de Archivos

- `index.html`: Página principal que muestra los cursos disponibles.
- `css/`: Contiene los archivos CSS para el estilo de las páginas.
  - `cancel.css`: Estilos para la página de cancelación de pago.
  - `index.css`: Estilos para la página principal.
  - `success.css`: Estilos para la página de éxito de pago.
- `js/`: Contiene los archivos JavaScript.
  - `env.js`: Archivo que contiene las claves de la API de Stripe.
  - `script.js`: Script principal que gestiona la visualización de cursos y la integración con Stripe.
- `layout/`: Contiene las páginas de éxito y cancelación de pago.
  - `cancel.html`: Página que se muestra cuando el pago es cancelado.
  - `success.html`: Página que se muestra cuando el pago es exitoso.
- `.gitignore`: Archivo para ignorar archivos y directorios específicos en Git.
- `architecture_graphic.png`: Graficación de la arquitectura del proyecto.
- `README.md`: Este archivo.

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/jonathanvrag/farmer_stripe.git

   ```

2. Navega al directorio del proyecto:

   ```sh
   cd farmer_stripe

   ```

3. Crea un archivo dentro de la carpeta js llamado env.js, el cual debe tener la siguiente estructura:

   ```sh
   export default {
     public:
       'XXXXXXXXXXXXXXXXXXXXXX',
     secret:
       'XXXXXXXXXXXXXXXXXXXXXX',
   };
   ```

Cabe resaltar que dichas claves son obtenidas al crear una cuenta en Stripe, se debe loguear e ir a las
opciones de desarrollador, allí se podrá encontrar dicha información.

4. Dentro del dashboard de Stripe y estando logueado, se debe dirigir a la configuración/pagos/Checkout
   y Payment Links, allí se debe dirigir hasta al final y habilitar la opción: Habilitar la integración
   sólo de cliente (Dicho proceso se hace una sola vez).

## Uso

1. Abre el archivo index.html en tu navegador.
2. La página principal mostrará los cursos disponibles.
3. Haz clic en un curso para proceder al pago a través de Stripe.
4. Serás redirigido a la página de éxito o cancelación según el resultado del pago.

## Advertencia

Nota de Seguridad: No expongas la clave secreta de la API de Stripe en el cliente. Esta lógica debería estar en el servidor para evitar vulnerabilidades de seguridad.

## Lincencia

Código realizado por Jonathan Vera - 2025