let idCliente = localStorage.getItem("id");
let nombreCliente = localStorage.getItem("usuario");
console.log(idCliente);

const obtenerOrdenesCliente = async (idCliente) => {
    let respuesta = await fetch(`http://localhost:3000/clientes/${idCliente}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json", //MIME Type
        }
    });
    let cliente = await respuesta.json();
    console.log(cliente.profile.ordenes);
    let perfil = cliente.profile;
    let ordenes = cliente.profile.ordenes;
    console.log(perfil);
    $("#ordenes").empty();
    ordenes.forEach(orden => {
        let estado = "Entregado";
        let estadocolor = "success";
        if(orden.entregado == false){
            estado = "Pendiente";
            estadocolor = "warning";
        }
        let divEstado = `<div class="col-8 text-${estadocolor} text-start"><p>${estado}</p></div>`;
        $("#ordenes").append(
            ` <div class="col-12 detalles">
                <div class="row">
                    <div class="col-8">
                        <div class="row">
                            <div class="col-12">
                                Orden #${orden.idOrden}
                            </div>
                            <div class="col-12">${nombreCliente}</div>
                        </div>
                    </div>
                    <div class="col-4 text-end align-middle">
                        <div class="row mb-2">
                            <div class="col-12">
                                Total: <br>Lps. ${orden.total}
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="row text-end">
                            ${divEstado}
                            <div class="col-4 tex-end">
                                <button class="btn btn-sm btn-${estadocolor} rounded-pill" style="font-size: x-small;" onclick="cargarOrden('${orden.idOrden}')">Ver Mas</button>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>`
        );
    });
}
obtenerOrdenesCliente(idCliente);


cargarOrden = async (idOrden) => {
    let orden = await fetch(`http://localhost:3000/pedidos/${idOrden}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json", //MIME Type
        }
    });
    let productos = await orden.json();
    pedidos = productos.pedidos;
    console.log(pedidos);
    $("#mdlCompras").modal('show');
    $("#productosCarrito").empty();
    totalPedido = 0;
    pedidos.forEach(pedido => {
        totalPedido += pedido.total;
        $("#productosCarrito").append(
            `<div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <h3>${pedido.nombreProducto}</h3>
                        <div class="row">
                            <div class="col-8">${pedido.descripcion}</div>
                            <div class="col-4 text-end">${pedido.cantidad}</div>
                        </div>
                    </div>
                    <div class="col-12 text-end">Lps. ${pedido.total}</div>
                    <hr>
                </div>
            </div>`
        );
    });
    $("#totalPedido").text(`${totalPedido}`);
}

$("#btnCerrarCarrito").click(() => {
    $("#mdlCompras").modal('hide');
});