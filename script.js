const formulario = document.getElementById('formulario');
const tablaBody = document.querySelector('#tabla-prestamos tbody');

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