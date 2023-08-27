let login = [];
let user = "";
let psw = "";

$("#login").click(() => {
    user = $("#usrLogin").val();
    psw = $("#usrPsw").val();
    loginUsuario(user, psw);
    
});
const loginUsuario = async (user, psw) => {
    let respuesta = await fetch("http://localhost:3000/clientes/login",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json", //MIME Type
        },
        body: JSON.stringify(
            {
                "usuario": `${user}`,
                "contrasena": `${psw}`
            }
        )
    });
    let usuarioRespuesta = await respuesta.json();
    let usuario = usuarioRespuesta.usuario;
    console.log(usuario);

    if (usuario){
        let nombre = usuario.nombre + " " + usuario.apellido;
        localStorage.setItem("id", usuario._id);
        localStorage.setItem("usuario", nombre);
        localStorage.setItem("apellido", usuario.apellido);
        localStorage.setItem("correo", usuario.correoElectronico);
        localStorage.setItem("foto", usuario.fotoPerfl);
        localStorage.setItem("telefonoUser", usuario.telefono);
        localStorage.setItem("nTarjeta", usuario.numeroTarjeta);
        localStorage.setItem("expira", usuario.expira);
        localStorage.setItem("cvv", usuario.cvv);
        window.location.href = `../menu/menu.html`;
    }else{
        alert("Usuario o contraseña incorrectos");
    }
};

