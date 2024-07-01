document.addEventListener("DOMContentLoaded", function () {
  const contenedorProductos = document.getElementById("productos__container");
  const unidadesElement = document.getElementById("unidades");
  const precioElement = document.getElementById("precio");
  const carritoVacioElement = document.getElementById("carritoVacio");
  const totalesElement = document.getElementById("totales");
  const reiniciarCarritoElement = document.getElementById("reiniciar");

  function crearProductos() {
    contenedorProductos.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("cafes"));
    console.log(productos);
    if (productos && productos.length > 0) {
      productos.forEach((producto) => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "products__card";
        const imagenSrc = `./imagenes/Cafe/${producto.nombre}.png`
        nuevoProducto.innerHTML = `
        <img src="${imagenSrc}" alt="${producto.nombre}" class="card__img">
        <h5>${producto.nombre}</h5>
        <h6>$${producto.precio}</h6>
        <div class="card__price">
          <button>-</button>
          <span class="cantidad">${producto.cantidad}</span>
          <button>+</button>
        </div>
      `;

        contenedorProductos.appendChild(nuevoProducto);
        nuevoProducto
          .getElementsByTagName("button")[1]
          .addEventListener("click", (e) => {
            agregarAlCarrito(producto);
            crearProductos();
            actualizarTotales();
          });

        nuevoProducto
          .getElementsByTagName("button")[0]
          .addEventListener("click", (e) => {
            restarAlCarrito(producto);
            crearProductos();
            actualizarTotales();
          });
      });
    }
  }

  crearProductos();
  actualizarTotales();

  function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("cafes"));
    let unidades = 0;
    let precio = 0;
    if (productos && productos.length > 0) {
      productos.forEach((producto) => {
        unidades += producto.cantidad;
        precio += producto.precio * producto.cantidad;
      });
      unidadesElement.innerText = unidades;
      precioElement.innerText = precio;
    }
  }

  function revisarMensajeVacio(){
    const productos = JSON.parse(localStorage.getItem("cafes"));
    carritoVacioElement.classList.toggle("esconder", productos && productos.length>0);
    totales.classList.toggle("esconder", (!productos && productos.length>0));
  }

  revisarMensajeVacio();

  reiniciarCarritoElement.addEventListener('click', reiniciarCarrito);
  function reiniciarCarrito(){
    localStorage.removeItem("cafes");
    actualizarTotales();
    crearProductos();
  }
});
