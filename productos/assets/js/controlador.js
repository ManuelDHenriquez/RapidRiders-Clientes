//Modales
let carrito = new bootstrap.Modal(document.getElementById("mdlCarrito"), {});
let modalAdd = new bootstrap.Modal(document.getElementById("mdlAdd"), {});
let modalPago = new bootstrap.Modal(document.getElementById("mdlPago"), {});

//Botones
let btnCarrito = document.getElementById("btnCarrito");
let cerrarCarrito = document.getElementById("btnCerrarCarrito");
let nombreProduct = document.getElementById("nomProduct");
let cerrarAdd = document.getElementById("btnCerrarAdd");
let procesar = document.getElementById("btnProcesar");
let CerrarPago = document.getElementById("btnCerrarPago");

//Funcionalidades de texto y varios
let cantidadAdd = document.getElementById('txtCantidad');
let totalAdd = document.getElementById('total');
let precioProducto = 0;

btnCarrito.addEventListener('click', function() {
    carrito.show();
});

cerrarCarrito.addEventListener('click', function() {
    carrito.hide();
});
cerrarAdd.addEventListener('click', function() {
    modalAdd.hide();
});

const addProducto = (idProd, precioProd, nombreProd) => {
    cantidadAdd.value = 1;
    nombreProduct.innerHTML = nombreProd;
    totalAdd.innerHTML = precioProd;
    precioProducto = precioProd;
    modalAdd.show();
    console.log(idProd);
    console.log(precioProd);
}

cantidadAdd.onchange = function() {
    let nuevaCantidad = cantidadAdd.value;
    let nuevoTotal = nuevaCantidad * precioProducto;
    totalAdd.innerHTML = nuevoTotal;
    console.log(nuevoTotal);
}

procesar.addEventListener('click', function() {
    carrito.hide();
    modalPago.show();
});

CerrarPago.addEventListener('click', function() {
    carrito.show();
    modalPago.hide();
});