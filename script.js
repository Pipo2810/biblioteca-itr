const baseDeDatosLibros = [
  { 
    titulo: "Física (Sexta edición)", 
    autor: "Wilson, Buffa, Lou", 
    estado: "Disponible", 
    img: "https://acdn-us.mitiendanube.com/stores/001/797/785/products/fisica1-a18a0851d854b7617516662055365274-640-0.webp" 
  },
  { 
    titulo: "GATEWAY TO THE WORLD B1", 
    autor: "Macmillan", 
    estado: "Prestado", 
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmvQZj-tRy1DunR4Ii4XF6VEe5EBoVcr2ZSUnPwK_ti9Z58EjtiwYwnrDB&s=10" 
  },
  { 
    titulo: "LENGUA Y LITERATURA 2", 
    autor: "EDELVIVES CONVERGENTE", 
    estado: "Disponible", 
    img: "https://http2.mlstatic.com/D_NQ_NP_894529-MLU74345608212_022024-O.webp" 
  },
  { 
    titulo: "Kidnapped", 
    autor: "Robert Louis Stevenson", 
    estado: "Disponible", 
    img: "https://www.blackcat-cideb.com/uploads/2017/03/122-122_46fcbf54e97b7146f78ef93f146ab326.jpg" 
  },
  { 
    titulo: "GOLD EXPERIENCE A2", 
    autor: "Pearson", 
    estado: "Disponible", 
    img: "https://http2.mlstatic.com/D_NQ_NP_693773-MLM46081836849_052021-O.webp" 
  },
  { 
    titulo: "GOLD EXPERIENCE B1", 
    autor: "Pearson", 
    estado: "Prestado", 
    img: "https://sbslibreria.vtexassets.com/arquivos/ids/5080919/QVmGDNAokv5Jbiisc1IqcFv-53A-.jpg?v=638855656250800000" 
  },
  { 
    titulo: "GATEWAY TO THE WORLD A1", 
    autor: "Macmillan", 
    estado: "Disponible", 
    img: "https://bcllibros.com.ar/wp-content/uploads/2022/01/Gateway-to-the-World-A1-Sb.jpg" 
  },
  { 
    titulo: "HISTORIA DESDE LAS PRIMERAS SOCIEDADES HASTA EL SIGLO XV", 
    autor: "Kapelusz", 
    estado: "Disponible", 
    img: "https://http2.mlstatic.com/D_NQ_NP_676619-MLA83393182527_032025-O.webp" 
  },
  { 
    titulo: "HISTORIA. DESDE LAS PRIMERAS SOCIEDADES HASTA EL FIN DE LA EDAD MEDIA", 
    autor: "Santillana", 
    estado: "Prestado", 
    img: "https://storage-aws-production.publica.la/santillana-educacion/issues/2018/12/OTUEUb2neHc1kxi5/1556659404_cover.jpg" 
  }
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