document.addEventListener("DOMContentLoaded", async function () {
  try {
    const res = await fetch(`/tienda`);
    if (!res.ok) {
      throw new Error('Error en la conexion');
    }
    const datos = await res.json();
    let contenedorProductos = document.getElementById("productos__container");

    function crearProductos(productos) {
      productos.forEach((registro) => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "products__card";
        const imagenSrc = `./imagenes/Cafe/${registro.nombre}.png`
        nuevoProducto.innerHTML = `
          <img src="${imagenSrc}" alt="${registro.nombre}" class="card__img">
          <div class="card__texts">
            <h5>${registro.nombre}</h5>
            <h6>${registro.origen}</h6>
            <h4>${registro.nombre_categoria}</h4>
            <div class="card__price">
              <h6>$${registro.precio}</h6>
              <button class="agregar-carrito" data-nombre="${registro.nombre}" data-precio="${registro.precio}">Añadir</button>
            </div>
          </div>
        `;

        contenedorProductos.appendChild(nuevoProducto);
        nuevoProducto.getElementsByTagName("button")[0].addEventListener('click', () => agregarAlCarrito(registro));
      });
    }

    crearProductos(datos);
  } catch (error) {
    console.error('Error fetching productos:', error);
  }
});

