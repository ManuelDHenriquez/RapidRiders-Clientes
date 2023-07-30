const cargar = (url) => {
    document.getElementById('informacion').src = url;
    //$('#informacion').attr("src",url);
}

$(document).ready(function () {
    $('.hijo').click( function () {
        $("#menu").prop( "checked", false );
        console.log($(this).attr('id'))
    })
})