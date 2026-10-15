const baseDeDatosLibros = [
  { titulo: "Física (Sexta edición)", autor: "Wilson, Buffa, Lou", estado: "Disponible", img: "https://via.placeholder.com/100x130/003366/ffffff?text=Fisica" },
  { titulo: "GATEWAY TO THE WORLD B1", autor: "Macmillan", estado: "Prestado", img: "https://via.placeholder.com/100x130/003366/ffffff?text=Gateway+B1" },
  { titulo: "LENGUA Y LITERATURA 2", autor: "EDELVIVES CONVERGENTE", estado: "Disponible", img: "https://via.placeholder.com/100x130/003366/ffffff?text=Lengua+2" },
  { titulo: "Kidnapped", autor: "Robert Louis Stevenson", estado: "Disponible", img: "https://via.placeholder.com/100x130/003366/ffffff?text=Kidnapped" },
  { titulo: "GOLD EXPERIENCE A2", autor: "Pearson", estado: "Disponible", img: "https://via.placeholder.com/100x130/003366/ffffff?text=Gold+A2" },
  { titulo: "GOLD EXPERIENCE B1", autor: "Pearson", estado: "Prestado", img: "https://via.placeholder.com/100x130/003366/ffffff?text=Gold+B1" },
  { titulo: "GATEWAY TO THE WORLD A1", autor: "Macmillan", estado: "Disponible", img: "https://via.placeholder.com/100x130/003366/ffffff?text=Gateway+A1" },
  { titulo: "HISTORIA DESDE LAS PRIMERAS SOCIEDADES HASTA EL SIGLO XV", autor: "Kapelusz", estado: "Disponible", img: "https://via.placeholder.com/100x130/003366/ffffff?text=Historia+1" },
  { titulo: "HISTORIA. DESDE LAS PRIMERAS SOCIEDADES HASTA EL FIN DE LA EDAD MEDIA", autor: "Santillana", estado: "Prestado", img: "https://via.placeholder.com/100x130/003366/ffffff?text=Historia+2" }
];

const inputBuscador = document.querySelector('.buscador input');
const btnBuscar = document.querySelector('.btn-buscar');
const catalogoContenedor = document.getElementById('catalogoLibros');
const formulario = document.getElementById('formulario');
const tablaBody = document.querySelector('#tabla-prestamos tbody');

function mostrarLibros(lista) {
  catalogoContenedor.innerHTML = "";

  if (lista.length === 0) {
    catalogoContenedor.innerHTML = "<p>No se encontraron libros con ese título o autor.</p>";
    return;
  }

  lista.forEach(libro => {
    const claseEstado = libro.estado === "Disponible" ? "disponible" : "prestado";
    const libroHTML = `
      <div class="libro">
        <img src="${libro.img}" alt="${libro.titulo}">
        <h3>${libro.titulo}</h3>
        <p>${libro.autor}</p>
        <span class="${claseEstado}">${libro.estado}</span>
      </div>
    `;
    catalogoContenedor.innerHTML += libroHTML;
  });
}

function buscarLibros() {
  const texto = inputBuscador.value.toLowerCase().trim();

  if (texto === "") {
    mostrarLibros(baseDeDatosLibros.slice(0, 3));
    return;
  }

  const resultados = baseDeDatosLibros.filter(libro => 
    libro.titulo.toLowerCase().includes(texto) || 
    libro.autor.toLowerCase().includes(texto)
  );

  mostrarLibros(resultados);
}

inputBuscador.addEventListener('keyup', buscarLibros);
btnBuscar.addEventListener('click', buscarLibros);

mostrarLibros(baseDeDatosLibros.slice(0, 3));

formulario.addEventListener('submit', function(e) {
  e.preventDefault();

  const alumno = document.getElementById('alumno').value;
  const curso = document.getElementById('curso').value;
  const libro = document.getElementById('libro').value;
  const fecha = document.getElementById('fecha').value;

  const nuevaFila = document.createElement('tr');

  nuevaFila.innerHTML = `
    <td>${alumno}</td>
    <td>${curso}</td>
    <td>${libro}</td>
    <td>${fecha}</td>
    <td>En Préstamo</td>
    <td><button class="btn-devolver" onclick="eliminarFila(this)">Devolver Libro</button></td>
  `;

  tablaBody.appendChild(nuevaFila);
  formulario.reset();
});

function eliminarFila(boton) {
  const fila = boton.parentElement.parentElement;
  fila.remove();
}