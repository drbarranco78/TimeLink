const $historialList = $('.lista-historial');
const $historialHeader = $('.historial h2');
const $mostrarHistorial = $('#mostrar-historial');
const $borrarHistorial = $('#borrar-historial');
$(document).ready(function () {
    // Obtén la fecha actual
    let fechaActual = new Date();

    // Extrae año, mes y día con métodos de Date
    let anio = fechaActual.getFullYear();
    let mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    let dia = String(fechaActual.getDate()).padStart(2, '0');

    // Crea el objeto Date con el formato deseado
    fechaActual = new Date(`${anio}-${mes}-${dia}`);

    // Convierte la fecha a un formato legible
    let opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let fechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesFecha);

    // Inserta la fecha en el HTML
    $('.fecha-actual').html(fechaFormateada);
});

let fechaInicio;

// Al hacer clic en "Comenzar jornada"
$("#btn-comenzar").click(function () {
    // Registrar la hora de inicio
    fechaInicio = new Date();
    const horaInicio = fechaInicio.toLocaleTimeString();
    agregarHistorial("Jornada Iniciada");
    // Actualizar mensaje de estado
    $(".mensaje-estado").html(`Jornada iniciada a las ${horaInicio}`);
    $('.historial h2').removeClass('d-none');
    // Ocultar "Comenzar jornada" y mostrar los otros botones
    $(this).addClass("d-none");
    $("#btn-detener").removeClass("d-none");
    $("#btn-descanso").removeClass("d-none");
});

// Al hacer clic en "Detener jornada"
$("#btn-detener").click(function () {
    const fechaFin = new Date();
    const horaFin = fechaFin.toLocaleTimeString();
    agregarHistorial("Jornada detenida");
    // Actualizar mensaje de estado
    $(".mensaje-estado").html(`Jornada finalizada a las ${horaFin}`);

    // Restaurar el estado inicial de los botones
    $(this).addClass("d-none");
    $("#btn-descanso").addClass("d-none");
    $("#btn-terminar-descanso").addClass("d-none");
    $("#btn-comenzar").removeClass("d-none");
});

// Al hacer clic en "Descanso"
$("#btn-descanso").click(function () {
    // Registrar la hora de inicio del descanso
    descansoInicio = new Date();
    const horaDescanso = descansoInicio.toLocaleTimeString();
    agregarHistorial("Descanso iniciado");
    // Actualizar mensaje de estado
    $(".mensaje-estado").html(`Descanso iniciado a las ${horaDescanso}`);

    // Ocultar botón "Descanso" y mostrar "Terminar descanso"
    $(this).addClass("d-none");
    $("#btn-terminar-descanso").removeClass("d-none");
});

// Al hacer clic en "Terminar descanso"
$("#btn-terminar-descanso").click(function () {
    const descansoFin = new Date();
    const horaDescansoFin = descansoFin.toLocaleTimeString();
    agregarHistorial("Descanso finalizado");
    // Actualizar mensaje de estado
    $(".mensaje-estado").html(`Descanso terminado a las ${horaDescansoFin}`);

    // Restaurar el estado inicial del descanso
    $(this).addClass("d-none");
    $("#btn-descanso").removeClass("d-none");
});

// Función para agregar un nuevo evento al historial con fecha, hora y mensaje
function agregarHistorial(mensaje) {
    const fecha = new Date();
    const fechaFormateada = `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
    const $li = $('<li></li>').text(`[${fechaFormateada}] - ${mensaje}`);
    $historialList.append($li);
}

// Lógica para mostrar/ocultar el historial
$('#mostrar-historial').click(function () {
    if ($historialList.is(':visible')) {
        $historialList.slideUp();
        $mostrarHistorial.html('<i class="fas fa-eye"></i>'); // Icono para mostrar
    } else {
        $historialList.slideDown();
        $mostrarHistorial.html('<i class="fas fa-eye-slash"></i>'); // Icono para ocultar
    }
});

// Lógica para borrar el historial
$('#borrar-historial').click(function () {
    $historialList.html(''); // Borra todos los elementos de la lista
});