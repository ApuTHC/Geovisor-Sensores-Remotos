// Esconder las tablas mientras se procesan los datos
$("#tabla-procesos").hide();
$("#tabla-geologia").hide();
$("#tabla-rasgos").hide();
// Variables que tienen los iconos de las acciones que se pueden realizar desde las tablas
var iconoEditar = '<svg class="bi bi-pencil-square" width="1.1em" height="1.1em" viewBox="0 0 16 16" fill="orange" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
var iconoEliminar = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>'
// var iconoFigura = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>'
// var iconoFigura = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-globe2" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"/></svg>'
// var iconoFigura = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/><path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/></svg>'
var iconoFigura = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg>'

//Captura la fila en la que se da click para editar un registro o fila
var filaEditada; 

// Variables para manejar select dinámico en el form de acuerdo al campo que esté en la db
var subtipoMM1_BD;
var subtipoMM2_BD;
var rocaSuelo_BD;
var tipoMaterial_BD;
var codigoUGS_BD;
var registrosBD;
var codMpioRasgo_BD;
var mapaRasgos_BD;
var estadoActividad_BD;

// Chequear si ya se hizo la consulta a la db para cada clase o pestaña y asi solo realizar una consulta
var featuresProcesos = false;
var featuresGeologia = false;
var featuresRasgos = false;
var featuresGeomorfo = false;

// Manejar el mapa que se muestra por cada registro

var mapaFila;
var mapaFilaGenerado = false;
var mapaBaseIR;
var permitirGuardar = false;
var geoJSONEditado;
var filaLayerEditado;

//Identificar los id repetidos
var filasDatosRepetidos;
var tablaIdRepetidoCreada = false;
var idParteRepetidos = [];

// Funcion para cargar los datos de la db localmente

// const DBData = ()=> {
//     const db = fetch('db.json')
//     .then(response => response.json())
//     .then( (data) => {
//         return data.features
//     })
//     .catch(error => console.log(error));

//     return db

// }


// Variables que tienen los botones que se oprimiran como acciones para una fila
var btnEditarFila = `<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn' data-toggle='tooltip' title='Editar registro'>${iconoEditar}</button></div></div>`
var btnEliminarFila = `<div class='wrapper text-center'><div class='btn-group'><button class='btnEliminar btn' data-toggle='tooltip' title='Eliminar registro'>${iconoEliminar}</button></div></div>`
var btnMostrarFigura = `<div class='wrapper text-center'><div class='btn-group'><button class='btnFigura btn' data-toggle='tooltip' title='Visualizar figura'>${iconoFigura}</button></div></div>`


// Plantillas de las filas que se van a renderizar en las tablas, tienen que coincidir con las columnas en el HTML.

// Plantilla de las filas para la tabla procesos
const pFilasProcesos = (i, p, id) => {
    return `<tr>
    <td>${btnMostrarFigura}</td>
    <td>${btnEditarFila}</td>
    <td>${ id }</td>
    <td>${p?.ID_MOV || p?.nombre || '-'}</td>
    <td>${p?.ENCUESTAD  || p?.propietario ||'-'}</td>
    <td>${p?.COD_SIMMA || '-'}</td>
    <td>${p?.FECHA_REP || p?.fecha || '-'}</td>
    <td>${p?.FECHA_MOV  || '-'}</td>
    <td>${confEquivalencias[p?.ConfiFechaMM] || '-'}</td>
    <td>${p?.FTE_INFSEC  || '-'}</td>
    <td>${p?.ANOS  || '-'}</td>
    <td>${p?.DPTO  || '-'}</td>
    <td>${p?.REF_GEOGRF || '-'}</td>
    <td>${p?.VEREDA || '-'}</td>
    <td>${tipoMMEquivalencias[p?.Tipo_MM] || '-'}</td>
    <td>${tipoMM1Equivalencias[p?.TIPO_MOV1] || '-'}</td>
    <td>${p?.SUBTIPO_1 || '-'}</td>
    <td>${p?.TIPO_MOV2 || '-'}</td>
    <td>${p?.SUBTIPO_2 || '-'}</td>
    <td>${p?.PROF || '-'}</td>
    <td>${actividadEquivalencias[p?.ACTIVIDAD] || '-'}</td>
    <td>${estadoActEquivalencias[p?.ESTADO_ACT] || '-'}</td>
    <td>${estiloEquivalencias[p?.ESTILO] || '-'}</td>
    <td>${distribEquivalencias[p?.DISTRIBUC] || '-'}</td>
    <td>${parteMovEquivalencias[p?.PARTE] || '-'}</td>
    <td>${p?.ID_PARTE  || '-'}</td>
    <td>${p?.ETIQUETA || '-'}</td>
    <td>${p?.LITOLOGIA || '-'}</td>
    <td>${p?.ESPESOR || '-'}</td>
    <td>${p?.TAM_BLOQUE || '-'}</td>
    <td>${p?.COB_USO  || '-'}</td>
    <td>${p?.AN_GMF  || '-'}</td>
    <td>${p?.IMPORTANC || '-'}</td>
    <td>${p?.ELEM_EXPUE || '-'}</td>
    <td>${p?.DANO || '-'}</td>
    <td>${p?.AME_POT  || '-'}</td>
    <td>${varifEquivalencias[p?.VERIF_CAM] || '-'}</td>
    <td>${p?.OBSERVAC  || '-'}</td>
    <td>${p?.CUENCA || '-'}</td>
    <td>${p?.ID_FORMAT  || '-'}</td>
    <td>${p?.Cod_MM || '-'}</td>
    <td>${p?.Mapa || '-'}</td>
    <td>${p?.COD_MUN || '-'}</td>
    <td>${p?.NOM_MUN || p?.zona ||'-'}</td>
    <td>${p?.ALTITUD || '-'}</td>
    <td>${p?.ANCHO || '-'}</td>
    <td>${p?.AREA_M || '-'}</td>
    <td>${p?.DIRECCION || '-'}</td>
    <td>${p?.ESTE || '-'}</td>
    <td>${p?.ESTE_CUERP || '-'}</td>
    <td>${p?.ESTE_ESC || '-'}</td>
    <td>${p?.LONGITUD || '-'}</td>
    <td>${p?.NORTE || '-'}</td>
    <td>${p?.NORTE_CUER || '-'} </td>
    <td>${p?.NORTE_ESC|| '-'} </td>                                                       
    <td>${p?.VOLUMEN || '-'}</td>
    <td>${btnEliminarFila}</td>
</tr>`
   
}

// Plantilla de las filas para la tabla geologia
const pFilasGeologia = (i, p, id) => {
    return `<tr>
                <td>${btnMostrarFigura}</td>
                <td>${btnEditarFila}</td>
                <td>${id}</td>
                <td>${p?.NOM_MUN || '-'}</td>
                <td>${p?.Vereda || '-'}</td>
                <td>${p?.Nom_UGS || '-'}</td>
                <td>${p?.Tipo || '-'}</td>
                <td>${p?.TipoRocaSuelo || '-'}</td>
                <td>${p?.FormaCima || '-'}</td>
                <td>${p?.RelieveRelativo || '-'}</td>
                <td>${p?.InclinacionLadera || '-'}</td>
                <td>${p?.FormaLadera || '-'}</td>
                <td>${p?.Observaciones || '-'}</td>
                <td>${p?.Cod_UGS || '-'}</td>
                <td>${p?.Calidad_roca || '-'}</td>
                <td>${p?.Descripcion || '-'}</td>
                <td>${p?.Mapa || '-'}</td>
                <td>${p?.Propietario || '-'}</td>
                <td>${btnEliminarFila}</td>
           </tr>`
}

// Plantilla de las filas para la tabla geomorfologia
const pFilasGeomorfologia = (i, p, id) => {
    return `<tr>
            <td>${id}</td>
            <td>${p?.Nom_SGMF || "-"}</td>
            <td>${p?.Cod_SGMF || "-"}</td>
            <td>${p?.Ambiente || "-"}</td>
            <td>${p?.Descripcion || "-"}</td>
            <td>${p?.Mapa || "-"}</td>
            <td>${p?.COD_MUN || "-"}</td>
            <td>${p?.NOM_MUN || "-"}</td>
          </tr>`;                       
}

// Plantilla de las filas para la tabla estructuras
const pFilasEstructura = (i, p, id) => {
    return `<tr>
            <td>${id}</td>

            <td>${p?.Ambiente || "-"}</td>
            <td>${p?.COD_MUN || "-"}</td>
            <td>${p?.Cod_UGS || "-"}</td>
            <td>${p?.Descripcion || "-"}</td>
            <td>${p?.Mapa || "-"}</td>
            <td>${p?.NOM_MUN || "-"}</td>
            <td>${p?.Nom_SGMF || "-"}</td>
          </tr>`;

}

// Plantilla de las filas para la tabla rasgos
const pFilasRasgos = (i, p, id) => {
    return `<tr>
    <td>${btnMostrarFigura}</td>
    <td>${btnEditarFila}</td>
    <td>${id}</td>
    <td>${p?.Propietario || '-' }</td>
    <td>${codigoRasgoEquivalencia[p?.Cod_Rasgo] || '-' }</td>
    <td>${p?.Nom_Rasgo || '-' }</td>
    <td>${p?.Descripcion || '-' }</td>
    <td>${tipoRasgoEquivalencia[p?.Tipo] || '-' }</td>
    <td>${ambienteEquivalencia[p?.Ambiente] || '-' }</td>
    <td>${esVisible25k[p?.Visible_25K] || '-' }</td>
    <td>${p?.Mapa || '-' } </td>
    <td>${p?.COD_MUN || '-' }</td>
    <td>${p?.NOM_MUN || '-' }</td>
    <td>${btnEliminarFila}</td>
  </tr>`;
}


// -------------------------------- BOTON EDITAR --------------------------------

// Funciones para generar la edicion y actualizacion de las tablas en tiempo real con la base de datos. Cada  tabla tiene 2 funciones: Edicion y actualizaciòn

// Funcion para editar la informacion de un registro de la tabla procesos. Pasa las celdas de la fila seleccionada a un form modal para su edicion
const editarTablaProcesos = (obj, refTabla) => {
    // captura la fila seleccionada para editar, es decir todo el <tr> que la constituye
    filaEditada = refTabla.row($(obj).parents('tr'));
    // captura cada una de las celdas de una fila
    const fila = $('#tabla-procesos').dataTable().fnGetData($(obj).closest('tr'));   
    const id = fila[2];
    const idMov_1 = $(obj).closest('tr').find('td:eq(3)').text().trim();
    const encuestador_2 = $(obj).closest('tr').find('td:eq(4)').text().trim(); 
    const codSIMMA_3 = $(obj).closest('tr').find('td:eq(5)').text().trim();
    const fechaReporte_4 = $(obj).closest('tr').find('td:eq(6)').text().trim();
    const fechaMov_5 = $(obj).closest('tr').find('td:eq(7)').text().trim();
    const confiabilidad_6 = $(obj).closest('tr').find('td:eq(8)').text().trim();
    const confiabilidad_6_Cod = confiabilidad_6.split("-")[0].trim()
    const fuenteInfoSec_7 = $(obj).closest('tr').find('td:eq(9)').text().trim();
    const anioFuente_8 = $(obj).closest('tr').find('td:eq(10)').text().trim();
    const departamento_9 = $(obj).closest('tr').find('td:eq(11)').text().trim();
    const refGeografica_10 =  $(obj).closest('tr').find('td:eq(12)').text().trim();
    const vereda_11 = $(obj).closest('tr').find('td:eq(13)').text().trim();
    const tipoMM_12 = $(obj).closest('tr').find('td:eq(14)').text().trim();
    const tipoMM_12_Cod = tipoMM_12.split("-")[0].trim()
    const tipoMM1_13 = $(obj).closest('tr').find('td:eq(15)').text().trim();
    const tipoMM1_13_Cod = tipoMM1_13.split("-")[0].trim()
    const subTipoMM1_15 = $(obj).closest('tr').find('td:eq(16)').text().trim();
    const tipoMM2_14= $(obj).closest('tr').find('td:eq(17)').text().trim();
    const subTipoMM2_16 = $(obj).closest('tr').find('td:eq(18)').text().trim();
    const profundidad_25 = $(obj).closest('tr').find('td:eq(19)').text().trim();
    const actividad_17 = $(obj).closest('tr').find('td:eq(20)').text().trim();
    const actividad_17_Cod  = actividad_17.split("-")[0].trim();
    const estadoActividad_18 = $(obj).closest('tr').find('td:eq(21)').text().trim();
    const estadoActividad_18_Cod = estadoActividad_18.split("-")[0].trim();
    const estilo_19 = $(obj).closest('tr').find('td:eq(22)').text().trim();
    const estilo_19_Cod = estilo_19.split("-")[0].trim();
    const distrMM_20 = $(obj).closest('tr').find('td:eq(23)').text().trim();
    const distrMM_20_Cod = distrMM_20.split("-")[0].trim();
    const parteMM_21 = $(obj).closest('tr').find('td:eq(24)').text().trim();
    const parteMM_21_Cod = parteMM_21.split("-")[0].trim();
    const parteID_22 = $(obj).closest('tr').find('td:eq(25)').text().trim();
    const etiqueta_23 = $(obj).closest('tr').find('td:eq(26)').text().trim();
    const litologia_24 = $(obj).closest('tr').find('td:eq(27)').text().trim();
    const espesor_26 = $(obj).closest('tr').find('td:eq(28)').text().trim();
    const tamanoBloque_27 = $(obj).closest('tr').find('td:eq(29)').text().trim();
    const cobertura_28 = $(obj).closest('tr').find('td:eq(30)').text().trim();
    const geomorfologia_29 = $(obj).closest('tr').find('td:eq(31)').text().trim();
    const importancia_30 = $(obj).closest('tr').find('td:eq(32)').text().trim();
    const elemExpuestos_31 = $(obj).closest('tr').find('td:eq(33)').text().trim();
    const danosCausados_32 = $(obj).closest('tr').find('td:eq(34)').text().trim();
    const amenazaPotencial_33 = $(obj).closest('tr').find('td:eq(35)').text().trim();
    const verifCampo_34 = $(obj).closest('tr').find('td:eq(36)').text().trim();
    const verifCampo_34_Cod = verifCampo_34.split("-")[0].trim();
    const observaciones_35 = $(obj).closest('tr').find('td:eq(37)').text().trim();
    const cuenca_36 = $(obj).closest('tr').find('td:eq(38)').text().trim();
    const idFormato_37 = $(obj).closest('tr').find('td:eq(39)').text().trim();
    const codigoMM_38 = $(obj).closest('tr').find('td:eq(40)').text().trim();
    const mapa_39 = $(obj).closest('tr').find('td:eq(41)').text().trim();
    const codMpio_40 = $(obj).closest('tr').find('td:eq(42)').text().trim();
    const nombreMpio_41 = $(obj).closest('tr').find('td:eq(43)').text().trim();
    const altitud_42 = $(obj).closest('tr').find('td:eq(44)').text().trim();
    const ancho_43 = $(obj).closest('tr').find('td:eq(45)').text().trim();
    const areaMov_44 = $(obj).closest('tr').find('td:eq(46)').text().trim();
    const direccion_45 = $(obj).closest('tr').find('td:eq(47)').text().trim();
    const este_46 = $(obj).closest('tr').find('td:eq(48)').text().trim();
    const esteCuerp_47 = $(obj).closest('tr').find('td:eq(49)').text().trim();
    const esteEsc_48 = $(obj).closest('tr').find('td:eq(50)').text().trim();
    const longitud_49 = $(obj).closest('tr').find('td:eq(51)').text().trim();
    const norte_50 = $(obj).closest('tr').find('td:eq(52)').text().trim();
    const norteCuerp_51 = $(obj).closest('tr').find('td:eq(53)').text().trim();
    const norteEsc_52 = $(obj).closest('tr').find('td:eq(54)').text().trim();
    const volumen_53 = $(obj).closest('tr').find('td:eq(55)').text().trim();
    // inserta el mensaje que mostrarà cual fila se editara
    $("#id-edit-procesos").html("Registro con ID " + id)
    // pasa las celdas capturadas al form modal para su edicion
    $('#id').val(id);        
    $('#id-mov-1').val(idMov_1);
    $('#encuestador-2').val(encuestador_2);                
    $('#cod-simma-3').val(codSIMMA_3);
    $('#fecha-reporte-4').val(fechaReporte_4);
    $('#fecha-mov-5').val(fechaMov_5);
    $('#confiabilidad-6').val(confiabilidad_6_Cod);
    $('#fuente-infosec-7').val(fuenteInfoSec_7);
    $('#anio-infosec-8').val(anioFuente_8);
    $('#dpto-9').val(departamento_9);
    $('#ref-geografica-10').val(refGeografica_10);
    $('#vereda-11').val(vereda_11);
    $('#tipo-mm-12').val(tipoMM_12_Cod);
    $('#tipo-mm1-13').val(tipoMM1_13_Cod);
    $('#tipo-mm2-14').val(tipoMM2_14);
    $('#subtipo-mm1-15').val(subTipoMM1_15);
    $('#subtipo-mm2-16').val(subTipoMM2_16);
    $('#actividad-17').val(actividad_17_Cod);
    $('#estado-activdad-18').val(estadoActividad_18_Cod);
    $('#estilo-19').val(estilo_19_Cod);
    $('#distr-mm-20').val(distrMM_20_Cod);
    $('#parte-mm-21').val(parteMM_21_Cod);
    $('#id-parte-mm-22').val(parteID_22);
    $('#etiqueta-23').val(etiqueta_23);
    $('#litologia-24').val(litologia_24);
    $('#profundidad-25').val(profundidad_25);
    $('#espesor-26').val(espesor_26);
    $('#tamano-bloque-27').val(tamanoBloque_27);
    $('#cobertura-uso-28').val(cobertura_28);
    $('#geomorfologia-29').val(geomorfologia_29);
    $('#importancia-30').val(importancia_30);
    $('#elementos-exp-31').val(elemExpuestos_31);
    $('#danos-causados-32').val(danosCausados_32);
    $('#amen-potencial-33').val(amenazaPotencial_33);
    $('#verif-campo-34').val(verifCampo_34_Cod);
    $('#observaciones-35').val(observaciones_35);
    $('#cuenca-36').val(cuenca_36);
    $('#id-formato-37').val(idFormato_37);
    $('#codigo-mm-38').val(codigoMM_38);
    $('#mapa-39').val(mapa_39);
    $('#codigo-mpio-40').val(codMpio_40);
    $('#nombre-mpio-41').val(nombreMpio_41);
    $('#altitud-42').val(altitud_42);
    $('#ancho-43').val(ancho_43);
    $('#area-m-44').val(areaMov_44);
    $('#direccion-45').val(direccion_45);
    $('#este-46').val(este_46);
    $('#este-cuerp-47').val(esteCuerp_47);
    $('#este-esc-48').val(esteEsc_48);
    $('#longitud-49').val(longitud_49);
    $('#norte-50').val(norte_50);
    $('#norte-cuerp-51').val(norteCuerp_51);
    $('#norte-esc-52').val(norteEsc_52);
    $('#volumen-53').val(volumen_53);


    // captura algunos elementos de la tabla que se mostraran en un select dinamico en la tabla procesos
    subtipoMM1_BD = subTipoMM1_15;
    subtipoMM2_BD = subTipoMM2_16;
    estadoActividad_BD = estadoActividad_18_Cod;
    

}

// Funcion para guardar la informacion modificada en el form modal
const actualizarTablaProcesos = (evnt) => {

            evnt.preventDefault();
            // captura los valores modificados y definitivos en el form modal de procesos
            let id = $.trim($('#id').val()); 
            let idMov = $.trim($('#id-mov-1').val());
            let encuestador = $.trim($('#encuestador-2').val() ) 
            let codSIMM  = $.trim($('#cod-simma-3').val());
            let fechaReport = $.trim($('#fecha-reporte-4').val());
            let fechaMov = $.trim($('#fecha-mov-5').val());
            let confiabilida = $.trim($('#confiabilidad-6').val());
            let fuenteInfoSe = $.trim($('#fuente-infosec-7').val());
            let anioFuente = $.trim($('#anio-infosec-8').val());
            let departamento = $.trim($('#dpto-9').val());
            let refGeografica = $.trim( $('#ref-geografica-10').val());
            let vereda = $.trim( $('#vereda-11').val());
            let tipoMM = $.trim( $('#tipo-mm-12').val());
            let tipoMM1 = $.trim( $('#tipo-mm1-13').val());
            let tipoMM2 = $.trim( $('#tipo-mm2-14').val());
            let subTipoMM1 = $.trim($('#subtipo-mm1-15').val());
            let subTipoMM2 = $.trim( $('#subtipo-mm2-16').val());
            let actividad = $.trim( $('#actividad-17').val());
            let estadoActividad = $.trim( $('#estado-activdad-18').val());
            let estilo = $.trim($('#estilo-19').val());
            let distrMM = $.trim( $('#distr-mm-20').val());
            let parteMM = $.trim( $('#parte-mm-21').val());
            let parteID = $.trim($('#id-parte-mm-22').val());
            let etiqueta = $.trim($('#etiqueta-23').val());
            let litologia = $.trim( $('#litologia-24').val());
            let profundidad = $.trim($('#profundidad-25').val());
            let espesor = $.trim($('#espesor-26').val());
            let tamanoBloque = $.trim($('#tamano-bloque-27').val());
            let cobertura = $.trim($('#cobertura-uso-28').val());
            let geomorfologia = $.trim($('#geomorfologia-29').val());
            let importancia = $.trim($('#importancia-30').val());
            let elemExpuestos = $.trim($('#elementos-exp-31').val());
            let danosCausados = $.trim($('#danos-causados-32').val());
            let amenazaPotencial = $.trim( $('#amen-potencial-33').val());
            let verifCampo = $.trim($('#verif-campo-34').val());
            let observaciones = $.trim( $('#observaciones-35').val());
            let cuenca = $.trim( $('#cuenca-36').val());
            let idFormato = $.trim( $('#id-formato-37').val());
            let codigoMM = $.trim( $('#codigo-mm-38').val());
            let mapa = $.trim($('#mapa-39').val());
            let codigoMpio = $.trim( $('#codigo-mpio-40').val());
            let nombreMpio =$.trim( $('#nombre-mpio-41').val());
            let altitud = $.trim( $('#altitud-42').val());
            let ancho = $.trim($('#ancho-43').val());
            let areaMov = $.trim($('#area-m-44').val());
            let direccion = $.trim($('#direccion-45').val());
            let este = $.trim($('#este-46').val());
            let esteCuerp = $.trim( $('#este-cuerp-47').val());
            let esteEsc = $.trim($('#este-esc-48').val());
            let longitud = $.trim( $('#longitud-49').val());
            let norte = $.trim($('#norte-50').val());
            let norteCuerp = $.trim($('#norte-cuerp-51').val());
            let norteEsc= $.trim($('#norte-esc-52').val());
            let volumen = $.trim($('#volumen-53').val());
            // asigna los valores modificados a cada variable (columna) de la base de datos del feature procesos
            const datos = {
                ID_MOV : idMov,  
                ENCUESTAD : encuestador, 
                COD_SIMMA : codSIMM,
                FECHA_REP : fechaReport, 
                FECHA_MOV : fechaMov,
                ConfiFechaMM :  confiabilida, 
                FTE_INFSEC : fuenteInfoSe,
                ANOS: anioFuente,  
                DPTO : departamento,
                REF_GEOGRF : refGeografica,
                VEREDA : vereda, 
                Tipo_MM : tipoMM , 
                TIPO_MOV1: tipoMM1,
                TIPO_MOV2 : tipoMM2, 
                SUBTIPO_1 : subTipoMM1 , 
                SUBTIPO_2 : subTipoMM2, 
                ACTIVIDAD : actividad, 
                ESTADO_ACT : estadoActividad , 
                ESTILO : estilo,
                DISTRIBUC : distrMM, 
                PARTE : parteMM, 
                ID_PARTE : parteID,
                ETIQUETA : etiqueta, 
                LITOLOGIA : litologia, 
                PROF: profundidad,
                ESPESOR : espesor ,  
                TAM_BLOQUE : tamanoBloque, 
                COB_USO : cobertura,
                AN_GMF : geomorfologia , 
                IMPORTANC : importancia , 
                ELEM_EXPUE : elemExpuestos , 
                DANO : danosCausados , 
                AME_POT : amenazaPotencial, 
                VERIF_CAM : verifCampo,
                OBSERVAC : observaciones , 
                CUENCA : cuenca , 
                ID_FORMAT : idFormato,
                Cod_MM : codigoMM , 
                Mapa : mapa , 
                COD_MUN : codigoMpio , 
                NOM_MUN : nombreMpio, 
                ALTITUD : altitud , 
                ANCHO : ancho , 
                AREA_M : areaMov , 
                DIRECCION : direccion, 
                ESTE : este , 
                ESTE_CUERP : esteCuerp , 
                ESTE_ESC : esteEsc , 
                LONGITUD : longitud,
                NORTE : norte, 
                NORTE_CUER : norteCuerp, 
                NORTE_ESC : norteEsc, 
                VOLUMEN : volumen 
            }

            confiabilidad_Cod = confEquivalencias[confiabilida]  || "-"
            tipoMM_Cod = tipoMMEquivalencias[tipoMM]  || "-"
            tipoMM1_Cod = tipoMM1Equivalencias[tipoMM1]  || "-"
            actividad_Cod = actividadEquivalencias[actividad]  || "-"
            estadoActividad_Cod = estadoActEquivalencias[estadoActividad]  || "-"
            estilo_Cod = estiloEquivalencias[estilo]  || "-"
            distrMM_Cod = distribEquivalencias[distrMM]  || "-"
            parteMM_Cod = parteMovEquivalencias[parteMM]  || "-"
            verifCampo_Cod = varifEquivalencias[verifCampo]  || "-"

            const datosFila = {
              ID_MOV : idMov,  
              ENCUESTAD : encuestador, 
              COD_SIMMA : codSIMM,
              FECHA_REP : fechaReport, 
              FECHA_MOV : fechaMov,
              ConfiFechaMM :  confiabilidad_Cod, 
              FTE_INFSEC : fuenteInfoSe,
              ANOS: anioFuente,  
              DPTO : departamento,
              REF_GEOGRF : refGeografica,
              VEREDA : vereda, 
              Tipo_MM :  tipoMM_Cod, 
              TIPO_MOV1: tipoMM1_Cod,
              SUBTIPO_1 : subTipoMM1,
              TIPO_MOV2 : tipoMM2, 
              SUBTIPO_2 : subTipoMM2,
              PROF: profundidad, 
              ACTIVIDAD : actividad_Cod, 
              ESTADO_ACT :  estadoActividad_Cod, 
              ESTILO : estilo_Cod,
              DISTRIBUC : distrMM_Cod, 
              PARTE : parteMM_Cod, 
              ID_PARTE : parteID,
              ETIQUETA : etiqueta, 
              LITOLOGIA : litologia, 
              ESPESOR : espesor ,  
              TAM_BLOQUE : tamanoBloque, 
              COB_USO : cobertura,
              AN_GMF : geomorfologia , 
              IMPORTANC : importancia , 
              ELEM_EXPUE : elemExpuestos , 
              DANO : danosCausados , 
              AME_POT : amenazaPotencial, 
              VERIF_CAM : verifCampo_Cod,
              OBSERVAC : observaciones , 
              CUENCA : cuenca , 
              ID_FORMAT : idFormato,
              Cod_MM : codigoMM , 
              Mapa : mapa , 
              COD_MUN : codigoMpio , 
              NOM_MUN : nombreMpio, 
              ALTITUD : altitud , 
              ANCHO : ancho , 
              AREA_M : areaMov , 
              DIRECCION : direccion, 
              ESTE : este , 
              ESTE_CUERP : esteCuerp , 
              ESTE_ESC : esteEsc , 
              LONGITUD : longitud,
              NORTE : norte, 
              NORTE_CUER : norteCuerp, 
              NORTE_ESC : norteEsc, 
              VOLUMEN : volumen 
          }
          
        return {
            datos : datos, 
            id : id, 
            datosFila : datosFila
            }

}

// Edicion y actualizacion de la tabla geologia
const editarTablaGeologia = (obj, apuntador) => {
    // captura la fila seleccionada para editar, es decir todo el <tr> que la constituye
    filaEditada = apuntador.row($(obj).parents('tr'));
    // captura cada una de las celdas de una fila
    const fila = $('#tabla-geologia').dataTable().fnGetData($(obj).closest('tr'));   
    const id = fila[2];
    const nombreMpio_1 = $(obj).closest('tr').find('td:eq(3)').text().trim();
    const vereda_2 = $(obj).closest('tr').find('td:eq(4)').text().trim(); 
    const nombreUGS_3 = $(obj).closest('tr').find('td:eq(5)').text().trim();
    const rocaSuelo_4 = $(obj).closest('tr').find('td:eq(6)').text().trim();
    const tipoMaterial_5 = $(obj).closest('tr').find('td:eq(7)').text().trim();
    const formaCima_6 = $(obj).closest('tr').find('td:eq(8)').text().trim();
    const relieveRelativo_7 = $(obj).closest('tr').find('td:eq(9)').text().trim();
    const inclinacionLadera_8 = $(obj).closest('tr').find('td:eq(10)').text().trim();
    const formaLadera_9 =  $(obj).closest('tr').find('td:eq(11)').text().trim();
    const observaciones_10 = $(obj).closest('tr').find('td:eq(12)').text().trim();
    const codigoUGS_11 = $(obj).closest('tr').find('td:eq(13)').text().trim();
    const calidadRoca_12 = $(obj).closest('tr').find('td:eq(14)').text().trim();
    const descripcion_13= $(obj).closest('tr').find('td:eq(15)').text().trim();
    const mapa_14 = $(obj).closest('tr').find('td:eq(16)').text().trim();
    const propietario_15 = $(obj).closest('tr').find('td:eq(17)').text().trim();
    // inserta el mensaje que mostrarà cual fila se editara en geologia
    $("#id-edit-geologia").html("Registro con ID " + id)
    // pasa las celdas capturadas al form modal de geologia para su edicion
    $('#id-geo').val(id);        
    $('#g-nombre-mpio-1').val(nombreMpio_1);
    $('#g-vereda-2').val(vereda_2);                
    $('#g-nombre-ugs-3').val(nombreUGS_3);
    $('#g-roca-suelo-4').val(rocaSuelo_4);
    $('#g-tipo-5').val(tipoMaterial_5);
    $('#g-forma-cima-6').val(formaCima_6);
    $('#relieve-relativo-7').val(relieveRelativo_7);
    $('#g-inclin-ladera-8').val(inclinacionLadera_8);
    $('#g-forma-ladera-10').val(formaLadera_9);
    $('#g-observaciones-11').val(observaciones_10);
    $('#g-codigo-ugs-12').val(codigoUGS_11);
    $('#g-calidad-13').val(calidadRoca_12);
    $('#g-descripcion-14').val(descripcion_13);
    $('#g-mapa-15').val(mapa_14);
    $('#g-propietario-16').val(propietario_15);
    
    // captura algunos elementos de la tabla que se mostraran en un select dinamico en la tabla geologia
    rocaSuelo_BD = rocaSuelo_4;
    tipoMaterial_BD = tipoMaterial_5;
    codigoUGS_BD = codigoUGS_11
    

    

}

// Funcion para guardar la informacion modificada en el form modal asociado a la tabla geologia
const actualizarTablaGeologia = (evnt) => {

    evnt.preventDefault();
    // captura los valores modificados y definitivos en el form modal de geologia
    let idGeo = $.trim($('#id-geo').val()); 
    let nombreMpio = $.trim($('#g-nombre-mpio-1').val());
    let vereda = $.trim($('#g-vereda-2').val()); 
    let nombreUGS  = $.trim($('#g-nombre-ugs-3').val());
    let sueloRoca = $.trim($('#g-roca-suelo-4').val());
    let tipo = $.trim($('#g-tipo-5').val());
    let formaCima = $.trim($('#g-forma-cima-6').val());
    let relieveRela = $.trim($('#relieve-relativo-7').val());
    let incliLadera = $.trim($('#g-inclin-ladera-8').val());
    let formaLadera = $.trim( $('#g-forma-ladera-10').val());
    let observaciones = $.trim( $('#g-observaciones-11').val());
    let codigoUGS = $.trim( $('#g-codigo-ugs-12').val());
    let calidad = $.trim( $('#g-calidad-13').val());
    let descripcion = $.trim( $('#g-descripcion-14').val());
    let mapa = $.trim($('#g-mapa-15').val());
    let propietarioGeo = $.trim($('#g-propietario-16').val());
    
    // asigna los valores modificados a cada variable (columna) de la base de datos del feature geologia
    const datos = {
        NOM_MUN : nombreMpio,
        Vereda : vereda,
        Nom_UGS : nombreUGS,
        Tipo : sueloRoca,
        TipoRocaSuelo : tipo,
        FormaCima : formaCima,
        RelieveRelativo : relieveRela,
        InclinacionLadera : incliLadera,
        FormaLadera : formaLadera,
        Observaciones : observaciones,
        Cod_UGS : codigoUGS,
        Calidad_roca : calidad,
        Descripcion : descripcion,
        Mapa : mapa,
        Propietario : propietarioGeo
        
    }

    const datosFila = {

      NOM_MUN : nombreMpio,
        Vereda : vereda,
        Nom_UGS : nombreUGS,
        Tipo : sueloRoca,
        TipoRocaSuelo : tipo,
        FormaCima : formaCima,
        RelieveRelativo : relieveRela,
        InclinacionLadera : incliLadera,
        FormaLadera : formaLadera,
        Observaciones : observaciones,
        Cod_UGS : codigoUGS,
        Calidad_roca : calidad,
        Descripcion : descripcion,
        Mapa : mapa,
        Propietario : propietarioGeo

    }

return {
    datos : datos, 
    id : idGeo,
    datosFila : datosFila
    }

}

// Edicion y actualizacion de la tabla rasgos

const editarTablaRasgos = (obj, apuntador) => {
  // captura la fila seleccionada para editar, es decir todo el <tr> que la constituye
  filaEditada = apuntador.row($(obj).parents('tr'));
  // captura cada una de las celdas de una fila
  const fila = $('#tabla-rasgos').dataTable().fnGetData($(obj).closest('tr'));   
  const id = fila[2];
  const propietario_1 = $(obj).closest('tr').find('td:eq(3)').text().trim();
  const codigoRasgo_2 = $(obj).closest('tr').find('td:eq(4)').text().trim(); 
  const codigoRasgo_2_Cod = codigoRasgo_2.split("-")[0].trim()
  const nombreRasgo_3 = $(obj).closest('tr').find('td:eq(5)').text().trim();
  const descripRasgo_4 = $(obj).closest('tr').find('td:eq(6)').text().trim();
  const tipoRasgo_5 = $(obj).closest('tr').find('td:eq(7)').text().trim();
  const tipoRasgo_5_Codi = tipoRasgo_5.split("-")[0].trim()
  const ambienteRasgo_6 = $(obj).closest('tr').find('td:eq(8)').text().trim();
  const ambienteRasgo_6_Cod = ambienteRasgo_6.split("-")[0].trim();
  const visibleRasgo_7 = $(obj).closest('tr').find('td:eq(9)').text().trim();
  const visibleRasgo_Cod = visibleRasgo_7.split("-")[0].trim();
  const mapaRasgo_8 =  $(obj).closest('tr').find('td:eq(10)').text().trim();
  const codMpioRasgo_9 = $(obj).closest('tr').find('td:eq(11)').text().trim();
  const nombreMpioRasgo_10 = $(obj).closest('tr').find('td:eq(12)').text().trim();
  // inserta el mensaje que mostrara cual fila se editara en rasgos
  $("#id-edit-rasgos").html("Registro con ID "+ id)
  // pasa las celdas capturadas al form modal de rasgos para su edicion
  $("#rasgo-id").val(id);
  $('#ras-propietario-1').val(propietario_1);        
  $('#ras-cod-rasgo-2').val(codigoRasgo_2_Cod);
  $('#ras-nombre-3').val(nombreRasgo_3);                
  $('#ras-descrip-4').val(descripRasgo_4);
  $('#ras-tipo-5').val(tipoRasgo_5_Codi);
  $('#ras-ambiente-6').val(ambienteRasgo_6_Cod);
  $('#ras-visible-7').val(visibleRasgo_Cod);
  $('#ras-mapa-8').val(mapaRasgo_8);
  $('#ras-cod-mpio-9').val(codMpioRasgo_9);
  $('#ras-nombre-mpio-10').val(nombreMpioRasgo_10);
   // captura algunos elementos de la tabla que se mostraran en un select dinamico en la tabla geologia
  codMpioRasgo_BD = codMpioRasgo_9;
  mapaRasgos_BD = mapaRasgo_8;
 
}

// Funcion para guardar la informacion modificada en el form modal asociado a la tabla rasgos
const actualizarTablaRasgos = (evnt) => {

  evnt.preventDefault();
  // captura los valores modificados y definitivos en el form modal de rasgos
  let idRasgo = $.trim($('#rasgo-id').val()); 
  let propietarioRas = $.trim($('#ras-propietario-1').val());
  let codRasgo = $.trim($('#ras-cod-rasgo-2').val()); 
  let nombreRasgo  = $.trim($('#ras-nombre-3').val());
  let descipRasgo = $.trim($('#ras-descrip-4').val());
  let tipoRasgo = $.trim($('#ras-tipo-5').val());
  let ambienteRasgo = $.trim($('#ras-ambiente-6').val());
  let visibleRasgo = $.trim($('#ras-visible-7').val());
  let mapaRasgo = $.trim($('#ras-mapa-8').val());
  let codMpioRasgo = $.trim( $('#ras-cod-mpio-9').val());
  let nombreMpioRasgo = $.trim( $('#ras-nombre-mpio-10').val());

  // asigna los valores modificados a cada variable (columna) de la base de datos del feature rasgos
  const datos = {
    Propietario : propietarioRas,
    Cod_Rasgo : codRasgo,
    Nom_Rasgo : nombreRasgo,
    Descripcion : descipRasgo,
    Tipo : tipoRasgo,
    Ambiente : ambienteRasgo,
    Visible_25K : visibleRasgo,
    Mapa  : mapaRasgo,
    COD_MUN : codMpioRasgo,
    NOM_MUN : nombreMpioRasgo

  }

  const codRasgo_Cod = codigoRasgoEquivalencia[codRasgo] || "-";
  const tipoRasgo_Cod = tipoRasgoEquivalencia[tipoRasgo] || "-";
  const ambienteRasgo_Cod = ambienteEquivalencia[ambienteRasgo] || "-";
  const visible25k_Cod = esVisible25k[visibleRasgo] || "-";

  const datosFila = {
    Propietario : propietarioRas,
    Cod_Rasgo : codRasgo_Cod,
    Nom_Rasgo : nombreRasgo,
    Descripcion : descipRasgo,
    Tipo : tipoRasgo_Cod,
    Ambiente : ambienteRasgo_Cod,
    Visible_25K : visible25k_Cod,
    Mapa  : mapaRasgo,
    COD_MUN : codMpioRasgo,
    NOM_MUN : nombreMpioRasgo

  }


return {
  datos : datos, 
  id : idRasgo, 
  datosFila : datosFila

  }

}

// Funcion para limpiar los datos antes de enviarse a la base de datosa
const depurarDatosEnvio = ( datos ) => {

    copiaDatos = {...datos}
    
    Object.keys(copiaDatos).forEach( ( key ) => {

        if(copiaDatos[key] === "-"){

            copiaDatos[key] = ""
        }
    })

    return copiaDatos
}

// Equivalencias de los codigos para los campos codificados almacenados en la BD

// Procesos

var confEquivalencias = {

  "01" : "01 - Exacta",
  "02" : "02 - Certeza mes/año",
  "03" : "03 - Certeza año",
  "04" : "04 - Confiabilidad baja",
  "05" : "05 - Incierta"
}


var tipoMM1Equivalencias = {

  "01" : "01 - Deslizamiento",
  "02" : "02 - Reptación ",
  "03" : "03 - Caida",
  "04" : "04 - Flujo"
}

var actividadEquivalencias = {

  "0" : "0 - No",
  "1" : "1 - Si"

}

var estadoActEquivalencias = {

  "01" : "01 - Activo",
  "02" : "02 - Reactivado",
  "03" : "03 - Suspendido",
  "04" : "04 - Latente",
  "05" : "05 - Estabilizado",
  "06" : "06 - Relicto"
}

var estiloEquivalencias = {

  "01" : "01 - Complejo",
  "02" : "02 - Compuesto",
  "03" : "03 - Múltiple",
  "04" : "04 - Sucesivo",
  "05" : "05 - Único"

}

var distribEquivalencias = {

  "01" : "01 - Retrogresivo",
  "02" : "02 - Avanzado",
  "03" : "03 - Ensanchado",
  "04" : "04 - Confinado",
  "05" : "05 - Creciente",
  "06" : "06 - Decreciente",
  "07" : "07 - Movil",

}

var parteMovEquivalencias = {

  "01" : "01 - Escarpe",
  "02" : "02 - Tránsito",
  "03" : "03 - Depósito",
  "04" : "04 - Cuerpo",
  "05" : "05 - Indefinido"

}

var varifEquivalencias = {

  "0" : "0 - No",
  "1" : "1 - Si"
}


var mpioEquivalencias = {

    17013 : "AGUADAS",
    17050 : "ARANZAZU",
    17272 : "FILADELFIA",
    17444 : "MARQUETALIA",
    17614 : "RIOSUCIO",
    17777 : "SUPÍA"
}

var tipoMMEquivalencias = {

    "01.01.01" : "01.01.01 - Deslizamiento activo verificado (escarpe)",
    "01.01.02" : "01.01.02 - Deslizamiento activo no verificado (escarpe)",
    "01.01.03" : "01.01.03 - Deslizamiento activo verificado (cuerpo)",
    "01.01.04" : "01.01.04 - Deslizamiento activo no verificado (cuerpo)",
    "01.01.05" : "01.01.05 - Deslizamiento activo verificado",
    "01.01.06" : "01.01.06 - Deslizamiento activo no verificado",
    "01.01.07" : "01.01.07 - Deslizamiento inactivo verificado (escarpe)",
    "01.01.08" : "01.01.08 - Deslizamiento inactivo no verificado (escarpe)",
    "01.01.09" : "01.01.09 - Deslizamiento inactivo verificado (cuerpo)",
    "01.01.10" : "01.01.10 - Deslizamiento inactivo no verificado (cuerpo)",
    "01.01.11" : "01.01.11 - Deslizamiento inactivo verificado",
    "01.01.12" : "01.01.12 - Deslizamiento inactivo no verificado",
    "01.01.17" : "01.01.17 - Deslizamiento activo verificada (tránsito)",
    "01.01.18" : "01.01.18 - Deslizamiento activo no verificada (tránsito)",
    "01.01.19" : "01.01.19 - Deslizamiento inactivo verificada (tránsito)",
    "01.01.20" : "01.01.20 - Deslizamiento inactivo no verificada (tránsito)",
    "01.02.01" : "01.02.01 - Caída activa verificada (escarpe)",
    "01.02.02" : "01.02.02 - Caída activa no verificada (escarpe)",
    "01.02.03" : "01.02.03 - Caída activa verificada (cuerpo)",
    "01.02.04" : "01.02.04 - Caída activa no verificada (cuerpo)",
    "01.02.05" : "01.02.05 - Caída activa verificada",
    "01.02.06" : "01.02.06 - Caída activa no verificada",
    "01.02.07" : "01.02.07 - Caída inactiva verificada (escarpe)",
    "01.02.08" : "01.02.08 - Caída inactiva no verificada (escarpe)",
    "01.02.09" : "01.02.09 - Caída inactiva verificada (cuerpo)",
    "01.02.10" : "01.02.10 - Caída inactiva no verificada (cuerpo)",
    "01.02.11" : "01.02.11 - Caída inactiva verificada",
    "01.02.12" : "01.02.12 - Caída inactiva no verificada",
    "01.02.17" : "01.02.17 - Caída activa verificada (tránsito)",
    "01.02.18" : "01.02.18 - Caída activa no verificada (tránsito)",
    "01.02.19" : "01.02.19 - Caída inactiva verificada (tránsito)",
    "01.02.20" : "01.02.20 - Caída inactiva no verificada (tránsito)",
    "01.03.01" : "01.03.01 - Volcamiento activo verificado (escarpe)",
    "01.03.02" : "01.03.02 - Volcamiento activo no verificado (escarpe)",
    "01.03.03" : "01.03.03 - Volcamiento activo verificado (cuerpo)",
    "01.03.04" : "01.03.04 - Volcamiento activo no verificado (cuerpo)",
    "01.03.05" : "01.03.05 - Volcamiento activo verificado",
    "01.03.06" : "01.03.06 - Volcamiento activo no verificado",
    "01.03.07" : "01.03.07 - Volcamiento inactivo verificado (escarpe)",
    "01.03.08" : "01.03.08 - Volcamiento inactivo no verificado (escarpe)",
    "01.03.09" : "01.03.09 - Volcamiento inactivo verificado (cuerpo)",
    "01.03.10" : "01.03.10 - Volcamiento inactivo no verificado (cuerpo)",
    "01.03.11" : "01.03.11 - Volcamiento inactivo verificado",
    "01.03.12" : "01.03.12 - Volcamiento inactivo no verificado",
    "01.04.01" : "01.04.01 - Avenida torrencial verificada (zona tránsito)",
    "01.04.02" : "01.04.02 - Avenida torrencial no verificada (zona tránsito)",
    "01.04.03" : "01.04.03 - Avenida torrencial verificada (zona depósito)",
    "01.04.04" : "01.04.04 - Avenida torrencial no verificada (zona depósito)",
    "01.04.05" : "01.04.05 - Flujo activo verificado (escarpe)",
    "01.04.06" : "01.04.06 - Flujo activo no verificado (escarpe)",
    "01.04.07" : "01.04.07 - Flujo activo verificado (cuerpo)",
    "01.04.08" : "01.04.08 - Flujo activo no verificado (cuerpo)",
    "01.04.09" : "01.04.09 - Flujo activo verificado",
    "01.04.10" : "01.04.10 - Flujo activo no verificado",
    "01.04.11" : "01.04.11 - Flujo inactivo verificado (escarpe)",
    "01.04.12" : "01.04.12 - Flujo inactivo no verificado (escarpe)",
    "01.04.13" : "01.04.13 - Flujo inactivo verificado (cuerpo)",
    "01.04.14" : "01.04.14 - Flujo inactivo no verificado (cuerpo)",
    "01.04.15" : "01.04.15 - Flujo inactivo verificado ",
    "01.04.16" : "01.04.16 - Flujo inactivo no verificado",
    "01.04.21" : "01.04.21 - Flujo activo  verificado (tránsito)",
    "01.04.22" : "01.04.22 - Flujo activo no verificado (tránsito)",
    "01.04.23" : "01.04.23 - Flujo inactivo verificado (tránsito)",
    "01.04.24" : "01.04.24 - Flujo inactivo no verificado (tránsito)",
    "01.05.01" : "01.05.01 - Reptación superficial verificada",
    "01.05.02" : "01.05.02 - Reptación superficial no verificada",
    "01.05.03" : "01.05.03 - Reptación profunda verificada",
    "01.05.04" : "01.05.04 - Reptación profunda no verificada"

}

var tipoCodMM = {
  "Deslizamiento activo verificado (escarpe)" : '01.01.01',
  "Deslizamiento activo no verificado (escarpe)" : '01.01.02',
  "Deslizamiento activo verificado (cuerpo)" : '01.01.03',
  "Deslizamiento activo no verificado (cuerpo)" : '01.01.04',
  "Deslizamiento activo verificado" : '01.01.05',
  "Deslizamiento activo no verificado" : '01.01.06',
  "Deslizamiento inactivo verificado (escarpe)" : '01.01.07',
  "Deslizamiento inactivo no verificado (escarpe)" : '01.01.08',
  "Deslizamiento inactivo verificado (cuerpo)" : '01.01.09',
  "Deslizamiento inactivo no verificado (cuerpo)" : '01.01.10',
  "Deslizamiento inactivo verificado" : '01.01.11',
  "Deslizamiento inactivo no verificado" : '01.01.12',
  "Deslizamiento activo verificado (tránsito)" : '01.01.17',
  "Deslizamiento activo no verificado (tránsito)" : '01.01.18',
  "Deslizamiento inactivo verificado (tránsito)" : '01.01.19',
  "Deslizamiento inactivo no verificado (tránsito)" : '01.01.20',
  "Caída activa verificada (escarpe)" : '01.02.01',
  "Caída activa no verificada (escarpe)" : '01.02.02',
  "Caída activa verificada (cuerpo)" : '01.02.03',
  "Caída activa no verificada (cuerpo)" : '01.02.04',
  "Caída activa verificada" : '01.02.05',
  "Caída activa no verificada" : '01.02.06',
  "Caída inactiva verificada (escarpe)" : '01.02.07',
  "Caída inactiva no verificada (escarpe)" : '01.02.08',
  "Caída inactiva verificada (cuerpo)" : '01.02.09',
  "Caída inactiva no verificada (cuerpo)" : '01.02.10',
  "Caída inactiva verificada" : '01.02.11',
  "Caída inactiva no verificada" : '01.02.12',
  "Caída activa verificada (tránsito)" : '01.02.17',
  "Caída activa no verificada (tránsito)" : '01.02.18',
  "Caída inactiva verificada (tránsito)" : '01.02.19',
  "Caída inactiva no verificada (tránsito)" : '01.02.20',
  "Volcamiento activo verificado (escarpe)" : '01.03.01',
  "Volcamiento activo no verificado (escarpe)" : '01.03.02',
  "Volcamiento activo verificado (cuerpo)" : '01.03.03',
  "Volcamiento activo no verificado (cuerpo)" : '01.03.04',
  "Volcamiento activo verificado" : '01.03.05',
  "Volcamiento activo no verificado" : '01.03.06',
  "Volcamiento inactivo verificado (escarpe)" : '01.03.07',
  "Volcamiento inactivo no verificado (escarpe)" : '01.03.08',
  "Volcamiento inactivo verificado (cuerpo)" : '01.03.09',
  "Volcamiento inactivo no verificado (cuerpo)" : '01.03.10',
  "Volcamiento inactivo verificado" : '01.03.11',
  "Volcamiento inactivo no verificado" : '01.03.12',
  "Avenida torrencial verificada (zona tránsito)" : '01.04.01',
  "Avenida torrencial no verificada (zona tránsito)" : '01.04.02',
  "Avenida torrencial verificada (zona depósito)" : '01.04.03',
  "Avenida torrencial no verificada (zona depósito)" : '01.04.04',
  "Flujo activo verificado (escarpe)" : '01.04.05',
  "Flujo activo no verificado (escarpe)" : '01.04.06',
  "Flujo activo verificado (cuerpo)" : '01.04.07',
  "Flujo activo no verificado (cuerpo)" : '01.04.08',
  "Flujo activo verificado" : '01.04.09',
  "Flujo activo no verificado" : '01.04.10',
  "Flujo inactivo verificado (escarpe)" : '01.04.11',
  "Flujo inactivo no verificado (escarpe)" : '01.04.12',
  "Flujo inactivo verificado (cuerpo)" : '01.04.13',
  "Flujo inactivo no verificado (cuerpo)" : '01.04.14',
  "Flujo inactivo verificado" : '01.04.15',
  "Flujo inactivo no verificado" : '01.04.16',
  "Flujo activo  verificado (tránsito)" : '01.04.21',
  "Flujo activo no verificado (tránsito)" : '01.04.22',
  "Flujo inactivo verificado (tránsito)" : '01.04.23',
  "Flujo inactivo no verificado (tránsito)" : '01.04.24',
  "Reptación superficial verificada" : '01.05.01',
  "Reptación superficial no verificada" : '01.05.02',
  "Reptación profunda verificada" : '01.05.03',
  "Reptación profunda no verificada" : '01.05.04',
};

// Rasgos

var codigoRasgoEquivalencia = {

  "02.01.01" : "02.01.01 - Lomo lineal o lomo de falla",
  "02.01.02" : "02.01.02 - Silleta de falla",
  "02.01.03" : "02.01.03 - Valle en copa de vino",
  "02.01.04" : "02.01.04 - Trinchera de falla",
  "02.01.05" : "02.01.05 - Basculamiento",
  "02.01.06" : "02.01.06 - Laguna de falla",
  "02.01.07" : "02.01.07 - Berma de falla",
  "02.01.08" : "02.01.08 - Cambio de pendiente",
  "02.01.09" : "02.01.09 - Drenaje obturado",
  "02.01.10" : "02.01.10 - Drenaje controlado",
  "02.01.11" : "02.01.11 - Drenaje deflectado",
  "02.01.12" : "02.01.12 - Escarpe de falla",
  "02.01.13" : "02.01.13 - Faceta trapezoidal",
  "02.01.14" : "02.01.14 - Faceta triangular",
  "02.01.15" : "02.01.15 - Gancho de flexión",
  "02.01.16" : "02.01.16 - Hombrera de falla",
  "02.01.17" : "02.01.17 - Silleta dibujada",
  "02.01.18" : "02.01.18 - Drenaje desviado",
  "02.01.19" : "02.01.19 - Gancho de falla",
  "02.01.20" : "02.01.20 - Cuchilla lineal",
  "02.02.01" : "02.02.01 - Camino de ganado",
  "02.02.02" : "02.02.02 - Cicatriz o corona de MM reciente",
  "02.02.03" : "02.02.03 - Cicatriz o corona de MM antiguo",
  "02.02.04" : "02.02.04 - Drenaje torrencial",
  "02.02.05" : "02.02.05 - Escarpe",
  "02.02.06" : "02.02.06 - Erosión en cárcava (dirección)",
  "02.02.07" : "02.02.07 - Erosión en cárcava (contorno)",
  "02.02.08" : "02.02.08 - Erosión en surco",
  "02.02.09" : "02.02.09 - Escarpe secundario de MM",
  "02.02.10" : "02.02.10 - Escarpe de caída",
  "02.02.11" : "02.02.11 - Faceta de erosión",
  "02.02.12" : "02.02.12 - Grietas de tensión",
  "02.02.13" : "02.02.13 - Grietas (longitudinales, transversales o radiales)",
  "02.02.14" : "02.02.14 - Hondonada",
  "02.02.15" : "02.02.15 - Lóbulo de solifluxión",
  "02.02.16" : "02.02.16 - Erosión remontante",
  "02.04.01" : "02.04.01 - Erosión lateral",
  "02.04.02" : "02.04.02 - Escarpe de terraza",
  "02.04.03" : "02.04.03 - Meandro abandonado",
  "02.04.04" : "02.04.04 - Punto de quiebre",
  "02.04.05" : "02.04.05 - Estrechamiento de drenaje",
  "02.04.06" : "02.04.06 - Dirección de avance por desborde",
  "02.04.07" : "02.04.07 - Dirección de flujo",
  "02.09.01" : "02.09.01 - Cantera activa",
  "02.09.02" : "02.09.02 - Cantera inactiva",
  "02.09.03" : "02.09.03 - Corte de talud"

}

var tipoRasgoEquivalencia = {

  "01" : "01 - Estructural",
  "02" : "02 - Geomorfológico",
  "03" : "03 - Geomorfológico-Estructural"

}

var ambienteEquivalencia = {
  "02.01" : "02.01 - Estructural",
  "02.02" : "02.02 - Denudacional",
  "02.03" : "02.03 - Volcánico",
  "02.04" : "02.04 - Fluvial",
  "02.05" : "02.05 - Glacial",
  "02.06" : "02.06 - Marino",
  "02.07" : "02.07 - Eólico",
  "02.08" : "02.08 - Kárstico",
  "02.09" : "02.09 - Antrópico"

}

var esVisible25k = {
  "0" : "0 - NO",
  "1" : "1 - SÍ"
}


// Geologia



// Funcion para actualizar el campo input del nombre municipio desde un select la lista de codigos
const selectMpio = () => {
    
    const codMpio = $('#codigo-mpio-40').val()
    const mpio = mpioEquivalencias[codMpio]
 
    $('#nombre-mpio-41').val($.trim(mpio)) 

}

const selectMpioRasgos = () => {
    
  const codMpio = $('#ras-cod-mpio-9').val()
  const mpio = mpioEquivalencias[codMpio]

  $('#ras-nombre-mpio-10').val($.trim(mpio)) 

}

// ----- select dinamicos del form modal

// Funcion para actualizar el campo input del tipo de MeM desde un select con la lista de codigos
const selectMM = ()  => {

    const TipoMM = $("#codigo-mm-38").val()
    $("#tipo-mm-12").val(TipoMM)
}

// Funcion para actualizar el campo input del tipo de rasgo desde un select con la lista de codigos
const selectRasgos = () => {

  const codRasgo = $("#ras-cod-rasgo-2").val()
  const rasgo = codigoRasgoEquivalencia[codRasgo]

  $("#ras-nombre-3").val(rasgo)
}

// Funciones para insertar dinamicamente la lista de opciones de acuerdo al campo este en la base de datos

// Mostrar los subtipos1 de MeM segun el tipo de MeM 1 dado desde la base de datos
const selectSubtipoMM1 = () => {

    $("#subtipo-mm1-15").empty();

  if ($("#tipo-mm1-13").val() == '01') {
    $("#subtipo-mm1-15").append(
      '<option value="Rotacional">Rotacional</option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Traslacional">Traslacional </option>'
    );
    
  }
  else if ($("#tipo-mm1-13").val() == '-') {
    $("#subtipo-mm1-15").append(
        '<option value="-"> - Vacío - </option>'
    );

    }
  
  else if ($("#tipo-mm1-13").val() == '04') {
    $("#subtipo-mm1-15").append(
      '<option value="No Aplica"> No Aplica </option>'+
      '<option value="Flujo de lodo"> Flujo de lodo </option>'+
      '<option value="Flujo de tierra"> Flujo de tierra </option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Flujo de detritos"> Flujo de detritos </option>'
    );
  }else if ($("#tipo-mm1-13").val() == '03') {
    $("#subtipo-mm1-15").append(
      '<option value="Caída de Suelo">Caída de Suelo</option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Caída de Roca">Caída de Roca</option>'
    );
  }else if ($("#tipo-mm1-13").val() == '02') {
    $("#subtipo-mm1-15").append(
      '<option value="Reptación de suelos">Reptación de suelos</option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Solifluxión">Solifluxión</option>'
    );

}}

// Mostrar los subtipos2 de MeM segun el tipo de MeM 2 dado desde la base de datos
const selectSubtipoMM2 = () => {

    $("#subtipo-mm2-16").empty();

  if ($("#tipo-mm2-14").val() == 'Deslizamiento') {
    $("#subtipo-mm2-16").append(
      '<option value="Rotacional">Rotacional</option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Traslacional">Traslacional </option>'
    );
    
  }
  else if ($("#tipo-mm2-14").val() == '-') {
    $("#subtipo-mm2-16").append(
        '<option value="-">- Vacío -</option>'
    );

    }
  
  else if ($("#tipo-mm2-14").val() == 'Flujo') {
    $("#subtipo-mm2-16").append(
      '<option value="No Aplica"> No Aplica </option>'+
      '<option value="Flujo de lodo"> Flujo de lodo </option>'+
      '<option value="Flujo de tierra"> Flujo de tierra </option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Flujo de detritos"> Flujo de detritos </option>'
    );
  }else if ($("#tipo-mm2-14").val() == 'Caída') {
    $("#subtipo-mm2-16").append(
      '<option value="Caída de Suelo">Caída de Suelo</option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Caída de Roca">Caída de Roca</option>'
    );
  }else if ($("#tipo-mm2-14").val() == 'Reptación') {
    $("#subtipo-mm2-16").append(
      '<option value="Reptación de suelos">Reptación de suelos</option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Solifluxión">Solifluxión</option>'
    );

}else if ($("#tipo-mm2-14").val() == 'No Aplica') {
    $("#subtipo-mm2-16").append(
        '<option value="No Aplica"> No Aplica </option>'
    );

}}

const selectActividad = () => {

    $("#estado-activdad-18").empty();
  
    if ($("#actividad-17").val() == '0') {
      $("#estado-activdad-18").append(
        '<option value="04">04 - Latente</option>' +
        '<option value="05">05 - Estabilizado</option>'+
        '<option value="06">06 - Relicto</option>'
      );
    }else if ($("#actividad-17").val() == '1') {
      $("#estado-activdad-18").append(
        '<option value="01">01 - Activo</option>'+
        '<option value="02">02 - Reactivado</option>'+
        '<option value="03">03 - Suspendido</option>'
      );
    }
}

const etiquetaDinamica = () => {
  
  let etiquetaEdicion ='';

  if ($("#tipo-mm1-13").val() == '01') {
    etiquetaEdicion = 'd';
  }else if ($("#tipo-mm1-13").val() == '04') {
    etiquetaEdicion = 'f';
  }else if ($("#tipo-mm1-13").val() == '03') {
    etiquetaEdicion = 'c';
  }else if ($("#tipo-mm1-13").val() == '02') {
    etiquetaEdicion = 'r';
    etiquetaEdicion += ($("#profundidad-25").val() == 'Superficia') ? 's' : 'p';
  }

  if ($("#subtipo-mm1-15").val() == 'Rotacional') {
    etiquetaEdicion += 'r'
    etiquetaEdicion += ($("#profundidad-25").val() == 'Superficia') ? 's' : 'p';
  } else if ($("#subtipo-mm1-15").val() == 'Traslacional') {
    etiquetaEdicion += 't'
    etiquetaEdicion += ($("#profundidad-25").val() == 'Superficia') ? 's' : 'p';
  } else if ($("#subtipo-mm1-15").val() == 'Caída de Suelo') {
    etiquetaEdicion += 's'
  } else if ($("#subtipo-mm1-15").val() == 'Caída de Roca') {
    etiquetaEdicion += 'r'
  } else if ($("#subtipo-mm1-15").val() == 'Flujo de lodo') {
    etiquetaEdicion += 'l'
  } else if ($("#subtipo-mm1-15").val() == 'Flujo de tierra') {
    etiquetaEdicion += 't'
  } else if ($("#subtipo-mm1-15").val() == 'Flujo de detritos') {
    etiquetaEdicion += 'd'
  }

  if ($("#tipo-mm1-13").val() !== '02') {
    if ($("#parte-mm-21").val() == '01') {
      etiquetaEdicion += '-e'
    } else if ($("#parte-mm-21").val() == '03' || $("#parte-mm-21").val() == '04') {
      etiquetaEdicion += '-d'
    } else if ($("#parte-mm-21").val() == '05') {
      etiquetaEdicion += '-n'
    } 
  }
  $("#etiqueta-23").val(etiquetaEdicion);
}

const tipoMMDinamico = () => {

  var tipoEdicion = '';

  if ($("#tipo-mm1-13").val() == '01') {
    tipoEdicion = 'Deslizamiento';
    tipoEdicion += ($("#actividad-17").val() == '0') ? ' inactivo' : ' activo';
    tipoEdicion += ($("#verif-campo-34").val() == '0') ? ' no verificado' : ' verificado';
  }else if ($("#tipo-mm1-13").val() == '04') {
    tipoEdicion = 'Flujo';
    tipoEdicion += ($("#actividad-17").val() == '0') ? ' inactivo' : ' activo';
    tipoEdicion += ($("#verif-campo-34").val() == '0') ? ' no verificado' : ' verificado';
  }else if ($("#tipo-mm1-13").val() == '03') {
    tipoEdicion = 'Caída';
    tipoEdicion += ($("#actividad-17").val() == '0') ? ' inactiva' : ' activa';
    tipoEdicion += ($("#verif-campo-34").val() == '0') ? ' no verificada' : ' verificada';
  }else if ($("#tipo-mm1-13").val() == '02') {
    tipoEdicion = 'Reptación';
    tipoEdicion += ($("#profundidad-25").val() == 'Superficia') ? ' superficial' : ' profunda';
    tipoEdicion += ($("#verif-campo-34").val() == '0') ? ' no verificada' : ' verificada';
  }

  if ($("#tipo-mm1-13").val() !== '02') {
    if ($("#parte-mm-21").val() == '01') {
      tipoEdicion += ' (escarpe)';
    }else if ($("#parte-mm-21").val() == '02') {
      tipoEdicion += ' (tránsito)';
    }else if ($("#parte-mm-21").val() == '03' || $("#parte-mm-21").val() == '04') {
      tipoEdicion += ' (cuerpo)';
    }
  }
  

  $("#codigo-mm-38").val(tipoCodMM[tipoEdicion])
  $("#tipo-mm-12").val(tipoCodMM[tipoEdicion]);

}

const idParteDinamico = () =>{
  $("#id-parte-mm-22").val( $("#id-mov-1").val()+ "-" + $("#parte-mm-21").val())
}

// -> UGS

const TipoUGS_tablas = () => {

  if ($("#g-roca-suelo-4").val() === 'Roca'){
    $("#g-tipo-5").empty().append(
      '<option value="Ígnea">Ígnea</option>'+
      '<option value="Sedimentaria">Sedimentaria</option>'+
      '<option value="Metamórfica">Metamórfica</option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Volcanosedimentaria">Volcanosedimentaria</option>'
    );

    $("#g-forma-cima-6").empty().append(
      '<option value="Aguda">Aguda</option>'+
      '<option value="Subaguda">Subaguda</option>'+
      '<option value="Redondeada">Redondeada</option>'+
      '<option value="Subredondeada">Subredondeada</option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Plana">Plana</option>'
    )
    $("#g-forma-ladera-10").empty().append(
      '<option value="Recta">Recta</option>'+
      '<option value="Cóncava">Cóncava</option>'+
      '<option value="Convexa">Convexa</option>'+
      '<option value="Irregular o escalonada">Irregular o escalonada</option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Compleja">Compleja</option>'
    )
    $("#g-calidad-13").empty().append(
      '<option value="1">1 - Muy Mala</option>'+
      '<option value="2">2 - Mala</option>'+
      '<option value="3">3 - Regular</option>'+
      '<option value="4">4 - Buena</option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="5">5 - Muy Buena</option>'
    )
 
  }else if($("#g-roca-suelo-4").val() === 'Suelo'){
    $("#g-tipo-5").empty().append(
      '<option value="Residual">Residual</option>'+
      '<option value="Volcanosedimentario">Volcanosedimentario</option>'+
      '<option value="Coluvial">Coluvial</option>'+
      '<option value="Aluvial">Aluvial</option>'+
      '<option value="-"> - Vacío - </option>' +
      '<option value="Aluvio - Torrencial">Aluvio - Torrencial</option>'
    );

    $("#g-forma-cima-6").empty().append(
      '<option value="No Aplica">No Aplica</option>'
    )
    $("#g-forma-ladera-10").empty().append(
      '<option value="No Aplica">No Aplica</option>'
    )
    $("#g-calidad-13").empty().append(
      '<option value="No Aplica">No Aplica</option>'
    )
  }
}
  
const TipoUGS1_tablas = () => {

    $("#g-codigo-ugs-12").empty();
  
    if ($("#g-tipo-5").val() === "Ígnea") {
      $("#g-codigo-ugs-12").append(
        '<option value="Rd">Rd - Roca Dura</option>'+
        '<option value="YR001">YR001</option>'+
        '<option value="YR002">YR002</option>'+
        '<option value="YR003">YR003</option>'+
        '<option value="-"> - Vacío - </option>' +
        '<option value="YR004">YR004</option>'
      )
    }else if ($("#g-tipo-5").val() === "Sedimentaria") {
      $("#g-codigo-ugs-12").append(
        '<option value="-"> - Vacío - </option>' +
        '<option value="Ri">Ri - Roca Intermedia</option>'
      )
    }else if ($("#g-tipo-5").val() === "Metamórfica") {
      $("#g-codigo-ugs-12").append(
        '<option value="-"> - Vacío - </option>' +
        '<option value="Rb">Rb - Roca Blanda</option>'
      )
    }else if ($("#g-tipo-5").val() === "Volcanosedimentaria") {
      $("#g-codigo-ugs-12").append(
        '<option value="-"> - Vacío - </option>' +
        '<option></option>'
      )
    }else if ($("#g-tipo-5").val() === "Residual") {
      $("#g-codigo-ugs-12").append(
        '<option value="-"> - Vacío - </option>' +
        '<option value="Sr">Sr - Residual</option>'
      )
    }else if ($("#g-tipo-5").val() === "Volcanosedimentario") {
      $("#g-codigo-ugs-12").append(
        '<option value="-"> - Vacío - </option>' +
        '<option value="Svi-Svo-Svc">Svi-Svo-Svc - Ignimbritas, oleada piroclástica, caídas piroclásticas</option>'+
        '<option value="Svl-Sva">Svl-Sva - Lahar, avalancha de escombros</option>'
      )
    }else if ($("#g-tipo-5").val() === "Aluvial") {
      $("#g-codigo-ugs-12").append(
        '<option value="-"> - Vacío - </option>' +
        '<option value="Sar-Saca">Sar-Saca - Aluviones recientes y de cauce activo</option>'+
        '<option value="Sall">Sall - Llanura aluvial</option>'+
        '<option value="Saa-Sac">Saa-Sac - Abanicos o conos</option>'+
        '<option value="Sat">Sat - Terrazas</option>'+
        '<option value="Saft">Saft - Fluviotorrenciales</option>'
      )
    }else if ($("#g-tipo-5").val() === "Coluvial") {
      $("#g-codigo-ugs-12").append(
        '<option value="-"> - Vacío - </option>' +
        '<option value="Sco">Sco - Coluvial</option>'+
        '<option value="Saa-Sac">Saa-Sac - Talus, Serrubios</option>'+
        '<option value="S">S - Flujos (lodo, tierra, escombros)</option>'
      )
    }else if ($("#g-tipo-5").val() === "Aluvio - Torrencial") {
      $("#g-codigo-ugs-12").append(
        '<option value="-"> - Vacío - </option>' +
        '<option></option>'
      )
    }
    
  }



// Funciones que ayudan a que se puedan editar dinámicamente los
// campos del form en el modal para cada tabla (i.e Procesos, UGS,)

const funcsFormDinamicoProcesos = () =>{

    selectSubtipoMM1();
    selectSubtipoMM2();
    aparearValoresDinamic(subtipoMM1_BD, "subtipo-mm1-15");
    aparearValoresDinamic(subtipoMM1_BD, "subtipo-mm1-15");
    selectActividad();
    aparearValoresDinamic(estadoActividad_BD, "estado-activdad-18");


}

const funcsCamposDinamicosUGS = () =>{

    aparearValoresDinamic(rocaSuelo_BD, "g-roca-suelo-4");
    TipoUGS_tablas();
    aparearValoresDinamic(tipoMaterial_BD, "g-tipo-5");
    TipoUGS1_tablas();
    aparearValoresDinamic(codigoUGS_BD, "g-codigo-ugs-12");
    

}


const funcsCamposDinamicosRasgos = () =>{

  // aparearValoresDinamic(codMpioRasgo_BD, "ras-cod-mpio-9")

  // aparearValoresDinamic(mapaRasgos_BD, "ras-mapa-8")

}



// Función para seleccionar dentro de las opciones el valor que está en la tabla (BD)

const aparearValoresDinamic = (valorDB, idSelect) => {

    $(`select#${idSelect} option[value="${valorDB}"]`).attr("selected","selected")

}


const eliminarTablaProcesos = (obj) => {

  const fila = $('#tabla-procesos').dataTable().fnGetData($(obj).closest('tr'));
  const id = fila[2];
  const encuestador = $(obj).closest('tr').find('td:eq(4)').text().trim();
  const idMov = $(obj).closest('tr').find('td:eq(3)').text().trim();
  $("#confir-eliminar-procesos").html("¿Está seguro que quiere eliminar el registro con ID #" + id + " realizado por " + encuestador + " (" + idMov + ")?")   
  return id

}


const eliminarTablaGeologia = (obj) => {

  const fila = $('#tabla-geologia').dataTable().fnGetData($(obj).closest('tr'));   
  const id = fila[2];
  const propietario = $(obj).closest('tr').find('td:eq(17)').text().trim();

  $("#confir-eliminar-geologia").html("¿Está seguro que quiere eliminar el registro UGS con ID #" + id + " realizado por " + propietario + "?")   
  
  return id
 
}


const eliminarTablaRasgos = (obj) => {

  const fila = $('#tabla-rasgos').dataTable().fnGetData($(obj).closest('tr'));     
  const id = fila[2];
  const propietario = $(obj).closest('tr').find('td:eq(3)').text().trim();

  $("#confir-eliminar-rasgos").html("¿Está seguro que quiere eliminar el rasgo con ID #" + id + " realizado por " + propietario + "?");
  
  return id
 
}


const selectBaseMapIR = (elem)=> {

  const nombreMapaBase = elem?.value || elem
  console.log(nombreMapaBase)
  
  if(mapaBaseIR){
    mapaFila.removeLayer(mapaBaseIR)
  }

  if(nombreMapaBase == "Google"){
    mapaBaseIR = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
      attribution: 'Google',
      maxZoom: 21
    });

    mapaBaseIR.addTo(mapaFila);
  
  }
  else if( nombreMapaBase == "Street"){
    mapaBaseIR = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    });

    mapaBaseIR.addTo(mapaFila)
  }

  else if( nombreMapaBase == "Imagery"){

    // mapaBaseIR = L.esri.basemapLayer("Imagery").addTo(mapaFila);
    mapaBaseIR = L.esri.Vector.vectorBasemapLayer('ArcGIS:Imagery', {
      apiKey : 'AAPK2d56ccacb97c41e7802530bc80e7bed9co1SDvvFum9eBZ7LokyiSZrk3yQ56k6gObSLeYOgKN7CoZAA2Qwfw-2E6aX_eGSF',
    });
    mapaBaseIR.addTo(mapaFila)
    // L.esri.basemapLayer("ImageryLabels").addTo(mapaFila);
    // L.esri.basemapLayer("ImageryTransportation").addTo(mapaFila);

  }

  else if( nombreMapaBase == "Hillshade"){

    mapaBaseIR = L.esri.Vector.vectorBasemapLayer('ArcGIS:Hillshade:Light', {
      apiKey : 'AAPK2d56ccacb97c41e7802530bc80e7bed9co1SDvvFum9eBZ7LokyiSZrk3yQ56k6gObSLeYOgKN7CoZAA2Qwfw-2E6aX_eGSF',
    });

    mapaBaseIR.addTo(mapaFila)
  }


}

// Función principal que genera las tablas

const generarTabla = function(datos, 
                              tablaId,
                              plantillaFilas, 
                              categoriaDB, 
                              funcEditar, 
                              funcActualizar, 
                              modalEditar, 
                              funcFormDinamico, 
                              modalEliminar, 
                              funcEliminar, 
                              mapa, 
                              modalFigura) {                          
    
    let render = '';
    const tabla = document.querySelector('#' + tablaId + ' tbody');

    for(let i = 0; i < datos.count.count; i++){
        const feature = datos["feature_" + i];
        if(feature?.activo){
            const id = feature.id;
            const p = feature.layergeojson.properties;
            render = render +  plantillaFilas(i, p, id);
        }    
    }
    tabla.innerHTML = render

    // Inicializacion de la tabla que se va a mostrar cuando el codigo html se renderice en el DOM

    $(document).ready(function () {

     var apuntadorTabla = $('#' + tablaId).DataTable({
            "ordering": false,
            "processing": true,
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
            "rowCallback": function(row, data){
              for(let i = 0; i< data.length; i++){
                if(data[i] === "-"){
                  $(row).find(`td:eq(${i})`).css("background-color", "rgba(255, 199, 199, 0.5)")
                }
              }},
            "initComplete": function(){  
                $('#' + tablaId ).wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");

              }
        });

        // Generar encabezados de filtrado para cada columna
        apuntadorTabla.columns().every( function () {
          let columna = this;
          if($( columna.header()).hasClass("text-search")){
            $(`<input class="buscador-header" type="search" placeholder="Filtrar por ${this.header().textContent}" />`)
            .on('search', function(){
              $(this).css('background-color', 'white')
              $(this).val('');
              columna.search(this.value).draw();
            })
            .appendTo($(this.header()).empty())
            .on('keyup change', function() {
              if(columna.value !== this.value){
                columna
                .search(this.value)
                .draw();
              }
            this.value !== "" ? $(this).css('background-color', '#f9aa32') : $(this).css('background-color', 'white')  
            });
          }else if($( columna.header()).hasClass("select-search")){
            var select = $('<select class="buscador-header" ><option value=""></option></select>')
            .appendTo( $(columna.header()).empty() )
            .on( 'change', function () {

              this.value !== "" ? $(this).css('background-color', '#f9aa32') : $(this).css('background-color', 'white')  
                var val = $.fn.dataTable.util.escapeRegex(
                    $(this).val()
                );

                columna
                    .search( val ? '^'+val+'$' : '', true, false )
                    .draw();
            } );

        columna.data().unique().sort().each( function ( d, j ) {
            select.append( '<option value="'+d+'">'+d+'</option>' )
        } );
          }
      } );

        $('.dataTables_length').addClass('bs-select');
        
        // Edición de los campos de la tabla en el form al darle click al btn editar
        $('#' + tablaId).on("click", ".btnEditar", function(){
          funcEditar(this, apuntadorTabla); // Traslado de la info de latabla al form
          funcFormDinamico(); // Actualización dinámico de los campos select
          $('#' + modalEditar).modal('show');
        } );

        let coleccionCategoria = database.ref().child(`features/${categoriaDB}`)

        // Actualización de los campos de la tabla y de la BD al guardar el form de edición
        $('#'+ modalEditar +' form').submit(function(e){
            let { datos, id, datosFila }  = funcActualizar(e)

            // Primeras col que no son de la DB (btn editar y ID)
            const primerasColumnas = { 
              btnVerFigura : btnMostrarFigura,
              btnEditar : btnEditarFila,
              idFila : id
            } 
            // Ultimas columnas que no son de la DB (btn eliminar)
            const ultimasColumnas = {
              btnEliminar : btnEliminarFila
            } 

            datosParaTabla = Object.values({
              ...primerasColumnas, 
              ...datosFila, 
              ...ultimasColumnas
            })
            
            // Dibujar los datos modificados en la tabla
            apuntadorTabla.row(filaEditada).data(datosParaTabla).draw();

            // Limpiar los datos que se enviarán a la db
            const datosEnvio = depurarDatosEnvio(datos) 
            infoActualizada = {}
            infoActualizada[`/feature_${id}/layergeojson/properties`] = datosEnvio;

            // Envio de la información editada a la BD
            coleccionCategoria.update(infoActualizada); 
            
            notice(`Se ha editado exitosamente el registro ${id}`, {
              type: 'warning', 
			        position: 'topright', 
			        appendType: 'append',
			        closeBtn: false,
			        autoClose: 3000,
			        className: '',
            })

            id = '';
            $('#' + modalEditar).modal('hide');
        })
        
        $('#' + tablaId).on("click", ".btnEliminar", function(e){
          e.preventDefault()
          if(univel === 'admin' || univel > 1){
            const idEliminar =  funcEliminar(this)
            const filaCapturada = $(this).parents('tr')
            $('#' + modalEliminar).modal('show');

            $('#' + modalEliminar).on("click", "button.eliminar-final", function(e){
              e.preventDefault()
              $('#' + modalEliminar).modal('hide');
              database.ref().child(`features/${categoriaDB}/feature_${idEliminar}/activo`).set(false)
              apuntadorTabla.row(filaCapturada).remove().draw();

              notice(`Se ha eliminado exitosamente el registro ${idEliminar}`, {
                type: 'danger',
                position: 'topright', 
                appendType: 'append',
                closeBtn: false,
                autoClose: 3000,
                className: '',
              })
            });

          }else{
            notice("Para eliminar un registro debe solicitar permiso. Sólo los usuario nivel 2, 3 y administradores pueden eliminar.", {
              type: 'secondary', 
              position: 'topcenter', 
              appendType: 'append',
              closeBtn: false,
              autoClose: 3000,
              className: '',
            })
          }
        });

        $("#"+ tablaId).on("click", ".btnFigura", function(e){
          e.preventDefault();
          $("#"+ modalFigura).modal("show");
        
          if(mapaFilaGenerado){
            mapaFila.remove()
          }
          
          const fila = $("#" + tablaId).dataTable().fnGetData($(this).closest('tr'))
          filaLayerEditado = fila[2];

          let mensajeModalFiguras = "";
          let idModalFiguras = "";


          switch(categoriaDB){
            case "procesos":
              mensajeModalFiguras = "Procesos morfodinámicos"
              idModalFiguras = datos["feature_"+ filaLayerEditado]["layergeojson"]["properties"].ID_PARTE + " |";

              break;
            case "geologia":
              mensajeModalFiguras = "Unidades Geológicas Superficiales (UGS)"
              break;
            case "rasgos":
              mensajeModalFiguras = "Rasgos"
              break;
          }

          $("#titulo-visualizar-figura-"+categoriaDB).html(
            `${idModalFiguras} ${mensajeModalFiguras} | ID ${filaLayerEditado}`
          )

          
          generarMapaFigura(datos,     
                            mapa,
                            categoriaDB );    
          
        })

        // Tabla ok para mostrar
        $("#cargando-tabla-" + categoriaDB).hide();
        $("#tabla-" + categoriaDB).show();

         // Desplegar lista de id repetidos
         $("#id-repetidos").click(function(e){
          e.preventDefault();
          if(!tablaIdRepetidoCreada){
            let todosIdParte = apuntadorTabla.column(25).data().toArray();
            //let todoId = apuntadorTabla.column(2).data().toArray();
            
            todosIdParte.forEach((el, index) =>{
              if(todosIdParte.indexOf(el)!= todosIdParte.lastIndexOf(el)){  
                if(!(idParteRepetidos.includes(el))){
                  idParteRepetidos.push(el);
                  filasDatosRepetidos = filasDatosRepetidos + `<tr><td>${el}</td></tr>`
                }
              }
            })
          }
          $("#total-repetidos").html(`Total registros con ID Parte repetidos: ${idParteRepetidos.length}`)
          idParteRepetidos=[];
          
          $("#id-repetido-modal").modal("show");
          $("#tabla-id-repetido tbody").html(filasDatosRepetidos)
          tablaIdRepetidoCreada = true;
        })

        // Resetear campos de busquedad
        $("#limpiar-campos-" + categoriaDB).click(function(e){
          e.preventDefault();
          $(`#tabla-${categoriaDB} input.buscador-header`).val('').css("background-color", "white");
          $(`#tabla-${categoriaDB} select.buscador-header`).val('').css("background-color", "white");
          apuntadorTabla.columns().every( function () {
            this.search('').draw();
        })
      })

      });
}



var generarMapaFigura = ( datos, mapa, categoriaDB)=> {

  mapaFila =  L.map(mapa);
  mapaFilaGenerado = true;
  permitirGuardar = false;

  $("#guardar-figura-" + categoriaDB).addClass("ocultar-guardar")
  $("#mapas_base_"+categoriaDB).val("Google");
  selectBaseMapIR("Google");

  
  setTimeout(()=>{

    const geoJSONFila = datos["feature_" + filaLayerEditado]["layergeojson"]
    const layerFila = L.geoJSON(geoJSONFila)
    layerFila.addTo(mapaFila)
    mapaFila.fitBounds(layerFila.getBounds());

    if(mapaFila.getZoom() == 0) {
      const {lat, lng} = L.polygon(geoJSONFila["geometry"]["coordinates"]).getBounds().getCenter();
      mapaFila.setView([lng, lat], 17)
    }

    mapaFila.pm.setLang('es');
    mapaFila.pm.addControls({
    position: 'topright',
    drawMarker: false,
    drawPolyline: false,
    drawRectangle: false,
    drawPolygon: false,
    drawCircle: false,
    drawCircleMarker: false,
    editMode: true,
    dragMode:true,
    cutPolygon:false,
    removalMode: false,
    rotateMode: false
    });

      // layerFila.bindPopup("")

      layerFila.on('pm:edit', (e)=> {
        geoJSONEditado = e.layer.toGeoJSON();
        !permitirGuardar && $("#guardar-figura-" + categoriaDB).removeClass("ocultar-guardar")
        permitirGuardar = true;
        console.log(geoJSONEditado)
        console.log("Se está editando la capa")

        
      })

      layerFila.on('pm:dragend', (e) =>{
        geoJSONEditado = e.layer.toGeoJSON();
        !permitirGuardar && $("#guardar-figura-" + categoriaDB).removeClass("ocultar-guardar")
        permitirGuardar = true;
        console.log(geoJSONEditado)
        console.log("Se terminó de arrastrar arrastrando")
      
      })

      $("#guardar-figura-" + categoriaDB).on("click", (evnt)=>{
        
        evnt.preventDefault();

        $(".alert-warning.fade").remove()
        $(".guardar-layer").addClass("ocultar-guardar")
        permitirGuardar = false;
        console.log("Se ha guardado la figura" + filaLayerEditado + "en la db de " + categoriaDB)
        console.log(geoJSONEditado)
        const guardarCambiosLayer = geoJSONEditado.geometry.coordinates
        datos["feature_" + filaLayerEditado]["layergeojson"]["geometry"]["coordinates"] = guardarCambiosLayer
        database.ref()
          .child(`features/${categoriaDB}/feature_${filaLayerEditado}/layergeojson/geometry/coordinates`)
          .set(guardarCambiosLayer)
        
        notice("Se guardaron los cambios", {
          type: 'warning', 
          position: 'topcenter', 
          appendType: 'append',
          closeBtn: false,
          autoClose: 1000,
          className: '',
        })
      })


    mapaFila.invalidateSize()
    
  }, 150)

}

$("#boton-inicio").click(function(e){
  e.preventDefault();
  $("#logos-foot").addClass("toggle-logos")

})

$("#boton-procesos").click(function(){
  $("#logos-foot").removeClass("toggle-logos")

  if(!featuresProcesos){

    database.ref().child("features/procesos").get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Realizando consulta a bd procesos")
        procesos = snapshot.val();
        generarTabla(
          procesos, 
          "tabla-procesos", 
          pFilasProcesos, 
          "procesos", 
          editarTablaProcesos, 
          actualizarTablaProcesos, 
          "modal-procesos", 
          funcsFormDinamicoProcesos, 
          "eliminar-modal-procesos", 
          eliminarTablaProcesos, 
          "mapa-procesos", 
          "figura-modal-proc"
          )
        featuresProcesos = true;
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      $("#cargando-tabla-procesos .spinner-msj").html("Hubo un problema en el servidor al tratar de recuperar los datos de procesos. Recargue la página e inténtelo de nuevo. ")
      console.error(error);
    });
    
    // const {procesos} =  await DBData()
    // generarTabla(
    //   procesos, 
    //   "tabla-procesos", 
    //   pFilasProcesos, 
    //   "procesos", 
    //   editarTablaProcesos, 
    //   actualizarTablaProcesos, 
    //   "modal-procesos", 
    //   funcsFormDinamicoProcesos, 
    //   "eliminar-modal-procesos", 
    //   eliminarTablaProcesos, 
    //   "mapa-procesos", 
    //   "figura-modal-proc")

    featuresProcesos = true;
  }
})


$("#boton-geologia").click(function(){

  $("#logos-foot").removeClass("toggle-logos")
  
  if(!featuresGeologia){

    database.ref().child("features/geologia").get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Realizando consulta a bd geologia")
        geologia = snapshot.val();

        generarTabla(geologia, 
          "tabla-geologia", 
          pFilasGeologia, 
          "geologia", 
          editarTablaGeologia, 
          actualizarTablaGeologia, 
          "modal-geologia" , 
          funcsCamposDinamicosUGS, 
          "eliminar-modal-geologia", 
          eliminarTablaGeologia, 
          "mapa-geologia", 
          "figura-modal-geo")
        featuresGeologia = true;
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      $("#cargando-tabla-geologia .spinner-msj").html("Hubo un problema en el servidor al tratar de recuperar los datos de geología. Recargue la página e inténtelo de nuevo.")
      console.error(error);
    });


    // const {geologia} = await DBData();
    // generarTabla(geologia, 
    //             "tabla-geologia", 
    //             pFilasGeologia, 
    //             "geologia", 
    //             editarTablaGeologia, 
    //             actualizarTablaGeologia, 
    //             "modal-geologia" , 
    //             funcsCamposDinamicosUGS, 
    //             "eliminar-modal-geologia", 
    //             eliminarTablaGeologia, 
    //             "mapa-geologia", 
    //             "figura-modal-geo")

    featuresGeologia = true
  }
})


$("#boton-rasgo").click(function(){

  $("#logos-foot").removeClass("toggle-logos")

  if(!featuresRasgos){

    database.ref().child("features/rasgos").get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Realizando consulta a bd rasgos")
        rasgos = snapshot.val();

        generarTabla(rasgos, 
          "tabla-rasgos", 
          pFilasRasgos, 
          "rasgos", 
          editarTablaRasgos, 
          actualizarTablaRasgos, 
          "modal-rasgos", 
          funcsCamposDinamicosRasgos, 
          "eliminar-modal-rasgos", 
          eliminarTablaRasgos, 
          "mapa-rasgos", 
          "figura-modal-ras")
        featuresRasgos = true;
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      $("#cargando-tabla-rasgos .spinner-msj").html("Hubo un problema en el servidor al tratar de recuperar los datos de rasgos. Recargue la página e inténtelo de nuevo.")
      console.error(error);
    });


    // const {rasgos} = await DBData();
    // generarTabla(rasgos, 
    //             "tabla-rasgos", 
    //             pFilasRasgos, 
    //             "rasgos", 
    //             editarTablaRasgos, 
    //             actualizarTablaRasgos, 
    //             "modal-rasgos", 
    //             funcsCamposDinamicosRasgos, 
    //             "eliminar-modal-rasgos", 
    //             eliminarTablaRasgos, 
    //             "mapa-rasgos", 
    //             "figura-modal-ras")

    featuresRasgos = true
  }
})






                 