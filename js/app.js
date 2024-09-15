const contenedor = document.getElementById('contenedor');

// Lista de imágenes de la carpeta
const imagenes = [
  '../mitienda/media/sinfondo/01_slider-02SINFONDO.png',
  '../mitienda/media/sinfondo/01_slider-01_slider-05.jpg',
  '../mitienda/media/sinfondo/01_slider-06sinfondo.png',
  '../mitienda/media/sinfondo/01_slider-07SINFONDO.png',
  '../mitienda/media/sinfondo/alfajores-sablee_05-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/biscottis-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/brioche-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/cheesecake-maracuya_01-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/choco-amargo-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/choux-chocolate-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/cremona_01-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/cruffin-arandanos-merengue_01-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/focaccia-berenjenas-1-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/fresh-lucia_02-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/macarons_01-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/medialuna_01-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/pain-au-chocolat_02-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/rombo-pastelera-400x301SINFONDO.png',
  '../mitienda/media/sinfondo/Tarta-de-Espinaca-400x301SINFONDO.png',
  // Agrega tantas imágenes como quieras
];



// Ancho y alto de las imágenes
const anchoImagen = 300; // Ajusta el tamaño de las imágenes
const altoImagen = 300; // Ajusta el tamaño de las imágenes

// Array para llevar el control de las posiciones ocupadas
let posicionesOcupadas = [];

// Función para verificar si una posición está libre
function posicionLibre(nuevaPosicion) {
  return !posicionesOcupadas.some(pos => Math.abs(pos - nuevaPosicion) < anchoImagen);
}

// Función para crear una imagen cayendo
function crearImagenCayendo() {
  const img = document.createElement('img');

  // Selecciona una imagen al azar de la lista
  const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
  img.src = imagenAleatoria;
  img.classList.add('imagen-cayendo');

  // Intentar encontrar una posición libre para la nueva imagen
  let posicionX;
  let intentos = 0;
  do {
    posicionX = Math.random() * (contenedor.offsetWidth - anchoImagen);
    intentos++;
  } while (!posicionLibre(posicionX) && intentos < 100);

  if (intentos >= 100) return; // Si no se encuentra posición después de varios intentos, se aborta

  // Añadir la nueva posición ocupada
  posicionesOcupadas.push(posicionX);

  // Posiciona la imagen en la posición calculada
  img.style.left = `${posicionX}px`;
  img.style.top = `-${altoImagen}px`; // Comienza fuera de la pantalla en el eje Y

  // Añade la animación
  contenedor.appendChild(img);

  // Elimina la imagen y su posición ocupada cuando termine la caída
  setTimeout(() => {
    contenedor.removeChild(img);

    // Remover la posición ocupada una vez que la imagen se haya eliminado
    posicionesOcupadas = posicionesOcupadas.filter(pos => pos !== posicionX);
  }, 5000); // Duración de la animación
}

// Genera nuevas imágenes cada cierto intervalo
setInterval(crearImagenCayendo, 1000); // Ajusta el intervalo para controlar la cantidad de imágenes