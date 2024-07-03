document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch(`/listado`);
  const datos = await res.json();
  let listaHTML = document.querySelector(`#listado`);
  listaHTML.innerHTML = "";
  datos.forEach((registro) => {
    listaHTML.innerHTML += `
      <div class="lista__productos">
        <h4>${registro.nombre}</h4>
        <h4>${registro.origen}</h4>
        <h4>${registro.precio}</h4>
        <h4>${registro.urlimagen}</h4>
        <h4>${registro.nombre_categoria}</h4>
        <a href="/modificar/${registro.id}">modificar</a>
        <button onclick="eliminarProducto(${registro.id})">eliminar</button>  
      </div>
    `;
  });
});

async function eliminarProducto(id) {
  try {
    const res = await fetch(`/listado?idEliminar=${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      // Actualizar la lista después de eliminar
      location.reload(); // O puedes actualizar solo la sección relevante sin recargar la página completa
    } else {
      console.error('Error al eliminar el producto:', res.statusText);
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
}