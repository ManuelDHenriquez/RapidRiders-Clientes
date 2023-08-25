$("#btnRegistrar").click(function(){
    let contrasenaNueva = $("#txtContrasena").val();
    let contrasenaConfirmada = $("#txtRepetir").val();
    if ( contrasenaNueva == "" ) {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Debe ingresar una contraseña'
        })
        return;
    }else if (contrasenaConfirmada == ""){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Debe confirmar la contraseña'
        })
        return;
    }else if (contrasenaNueva != contrasenaConfirmada){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Contraseñas no coinciden'
        })
        return;
    }
    let registro = {
        "nombre": $("#txtNombre").val(),
        "apellido": $("#txtApellido").val(),
        "identificacion": $("#txtID").val(),
        "fotoPerfil": "",
        "telefono": $("#txtTelefono").val(),
        "correoElectronico": $("#txtEmail").val(),
        "contrasena": $("#txtContrasena").val(),
        "numeroTarjeta": $("#txtTarjeta").val(),
        "expira": $("#txtExpira").val(),
        "cvv": $("#txtCVV").val(),
        "ordenes": []
    };
    console.log(registro);
    registrarUsuario(registro);
});

const registrarUsuario = async (registro) => {
    let respuesta = await fetch("http://localhost:3000/clientes",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json", //MIME Type
        },
        body: JSON.stringify(registro)
    });
    let usuario = await respuesta.json();
    console.log(usuario);
    if (usuario._id){
        Swal.fire({
            title: 'Usuario registrado con éxito!',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'Perfecto!',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                window.location.href = `../login/login.html`;
            } else if (result.isDenied) {
                window.location.href = `../login/login.html`;
            }
          })
    }else{
        alert("Usuario o contraseña incorrectos");
    }
}