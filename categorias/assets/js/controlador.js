const cargarCategorias = async () => {
    let respuesta = await fetch("http://localhost:3000/categorias", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    });
    let categorias = await respuesta.json();
    console.log(categorias);
    $("#categoriasDisp").empty();
    categorias.forEach(categoria => {   
        $("#categoriasDisp").append(`
            <div class="col-3 rounded-pill text-center m-1 category" id="${categoria._id}" onclick="(cargarEmpresas('${categoria._id}'))">
                <img src="../assets/${categoria.icono}"
                    alt="" style="width: 80px; height: 80px; border-radius: 50%;">
                <p>${categoria.nombreCategoria}</p>
            </div>
        `);
    });
};
cargarCategorias();

const cargarEmpresas = async (id) => {
    let respuesta = await fetch(`http://localhost:3000/categorias/${id}/empresas`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    });
    let empresas = await respuesta.json();
    empresas = empresas.empresas;
    console.log(empresas);

    $("#restaurantes").empty();
    empresas.forEach(empresa => {
        let stars = "";
        for (let i = 0; i < empresa.calificacion; i++) {
            stars += `<i class="fas fa-star"></i>`;
        }
        $("#restaurantes").append(
            `<div class="col-5 m-2 text-center restaurantes" id="restaurante-1" onclick="cargarProductos('${id}','${empresa.id}')">
                <div class="row">
                    <div class="col-md-12 img-restaurante mb-2" style="background-image: url('../assets/${empresa.logo}'); height: 100px;">
                    </div>
                    <div class="col-md-12 info-restaurante">
                        <div class="row">
                            <div class="col-6 text-start">
                                ${empresa.nombreEmpresa} 
                            </div>
                            <div class="col-6 text-center">
                                ${stars}
                                Clasificación
                            </div>
                            <div class="col-12 text-start">
                                ${empresa.descripcion}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        );
    });

};



const cargarProductos = (id, idEmpresa) => {
    localStorage.setItem("idCategoria",id);
    localStorage.setItem("idEmpresa",idEmpresa);
    window.location.href = `../productos/productos.html`;
}


