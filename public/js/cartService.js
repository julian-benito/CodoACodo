function agregarAlCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("cafes"));
  console.log(memoria)
  let cuenta = 0;

  if(!memoria){
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("cafes", JSON.stringify([nuevoProducto]));
    cuenta = 1;
  } else {
    const indiceProducto = memoria.findIndex(cafe => cafe.id === producto.id);
    console.log(indiceProducto)
    const nuevaMemoria = memoria;
    if (indiceProducto === -1){
      nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
      cuenta = 1;
    } else {
      nuevaMemoria[indiceProducto].cantidad ++;
      cuenta = nuevaMemoria[indiceProducto].cantidad
    }
    localStorage.setItem("cafes", JSON.stringify(nuevaMemoria));
    return cuenta
  }
  actualizarNumeroCarrito()
}

function restarAlCarrito(producto){
  const memoria = JSON.parse(localStorage.getItem("cafes"));
  const indiceProducto = memoria.findIndex(cafe => cafe.id === producto.id);
  if(memoria[indiceProducto].cantidad === 1){
    memoria.splice(indiceProducto,1)
    localStorage.setItem("cafes", JSON.stringify(memoria));
  } else {
    memoria[indiceProducto].cantidad--;
    localStorage.setItem("cafes", JSON.stringify(memoria));
  }
}

/*Toma un producto, leagrega cantidad 1 y lo devuelve*/
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cuentaCarrito")
function actualizarNumeroCarrito(){
  const memoria = JSON.parse(localStorage.getItem("cafes"));
  if (memoria && memoria.length > 0){
  const cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0);
  cuentaCarritoElement.innerText = cuenta;
  } else {
    cuentaCarritoElement.innerText = 0;
  }
  
}

actualizarNumeroCarrito();