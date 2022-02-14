// ................................Variables
// Mapa Base
var map;
var mapaBase;
var mapaBaseLabels;
var openStreet;

// Auxiliares Lógicos
var auxCargaInfoAflor=0;
var auxMarcador=0;

// Mapas WMS
var atlasGeoWMS;
function Mapa(capa, active, transp) {
  this.capa = capa;
  this.active = active;
  this.transp = transp;
}
var mapaGeo = new Mapa(null,0,0.5);
var mapaFallas = new Mapa(null,0,0.5);

// Planchas Zona de Estudio
function Plancha(capa, active, name, data) {
  this.capa = capa;
  this.active = active;
  this.name = name;
  this.data = data;
  this.CargarPlancha = CargarPlancha;
}
var planchas = [
  new Plancha(null,0, "PlanchaC1N", PlanchaC1N),
  new Plancha(null,0, "PlanchaC1S", PlanchaC1S),
  new Plancha(null,0, "PlanchaC2N", PlanchaC2N),
  new Plancha(null,0, "PlanchaC2S", PlanchaC2S),
  new Plancha(null,0, "PlanchaC3N", PlanchaC3N),
  new Plancha(null,0, "PlanchaC3S", PlanchaC3S),
  new Plancha(null,0, "PlanchaC4N", PlanchaC4N),
  new Plancha(null,0, "PlanchaC4S", PlanchaC4S)
];
function CargarPlancha(Plancha) {
  this.capa = L.geoJson(Plancha)
  .setStyle({
    color: $('#cp' + this.name).colorpicker('getValue'),
    weight: 3
  }).bindPopup(this.name).on('click', toggleBounce).addTo(map);
}

// Marcadores & Icono 
var markerGroupCurso_2021_2;
var aflorIcon = new L.Icon({
  iconUrl: 'images/geomap/icons/icon-aflor.png',
  shadowUrl: 'images/geomap/icons/marker-shadow.png',
  iconSize: [35, 35],
  iconAnchor: [25, 50],
  shadowAnchor:[19,54],
  popupAnchor: [-7, -50]
});

// ................................Función PPAL

$(document).ready(function () {
  // Ajustando el mapa
  $('.map').css('height', $('footer').offset().top+26);
  $(".sidebar").css('height', $('footer').offset().bottom);
  $(window).resize(function () { 
    $('.map').css('height', $('footer').offset().top+1);
    $(".sidebar").css('height', $('footer').offset().bottom);
  });

  // Cargando Mapa Base
  map = L.map('map').setView([5.917053, -75.655911], 13);
  mapaBase = L.esri.basemapLayer('Imagery').addTo(map);
  mapaBaseLabels = L.esri.basemapLayer('ImageryLabels');
  map.addLayer(mapaBaseLabels);
  openStreet = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
  });


  // Cargando Atlas Geológico y PopUp de Descripción
  var MySource = L.WMS.Source.extend({
    'showFeatureInfo': function (latlng, info) {
      if (!this._map) {
        return;
      }
      var esto = info.split("\n").join("");
      esto = esto.split("</th>").join("");
      esto = esto.split("<tr>").join("");
      esto = esto.split("</tr>").join("");
      esto = esto.split("</td>").join("");
      var separadores = ['<th>', '<td>'];
      var array = esto.split(new RegExp(separadores.join('|'), 'g'));
      var mensaje = "Vacio";
      var y = latlng + "";
      y = y.replace("LatLng", "");
      y = y.replace("(", "");
      y = y.replace(")", "");
      if (array.length == 1) {
        mensaje = "<b>Latitud y Longitud:</b> [" + y + "] ";
      }

      if (array.length == 21) {
        mensaje = "<b><big>Unidad Cronoestratigráfica</big></b> <br>" +
          "<b>Símbolo: </b>" + array[13] + "<br>" +
          "<b>Litología: </b>" + array[14] + "<br>" +
          "<b>Edad: </b>" + array[15] + "<br>";
        if (array[16].length > 7) {
          mensaje = mensaje + "<b>Nombre Común: </b>" + array[16] + "<br>";
        }
        if (array[17].length > 7) {
          mensaje = mensaje + "<b>Comentarios: </b>" + array[17] + "<br>";
        }
        mensaje = mensaje + "<b>Latitud y Longitud:</b> [" + y + "] ";
      }

      if (array.length == 15) {
        if (array[4].length == 16) {
          mensaje = "<b><big>Falla</big></b> <br>" +
            "<b>Tipo: </b>" + array[10] + "<br>";
        }
        if (array[11].length > 7) {
          mensaje = mensaje + "<b>Nombre Común: </b>" + array[11] + "<br>";
        }
        if (array[12].length > 7) {
          mensaje = mensaje + "<b>Comentarios: </b>" + array[12] + "<br>";
        }
      }

      if (array.length == 35) {
        mensaje = "<b><big>Unidad Cronoestratigráfica</big></b> <br>" +
          "<b>Símbolo: </b>" + array[13] + "<br>" +
          "<b>Litología: </b>" + array[14] + "<br>" +
          "<b>Edad: </b>" + array[15] + "<br>";
        if (array[16].length > 7) {
          mensaje = mensaje + "<b>Nombre Común: </b>" + array[16] + "<br>";
        }
        if (array[17].length > 7) {
          mensaje = mensaje + "<b>Comentarios: </b>" + array[17] + "<br>";
        }
        mensaje = mensaje + "<b>Latitud y Longitud:</b> [" + y + "] <br>";

        if (array[24].length == 16) {
          mensaje = mensaje + "<b><big>Falla</big></b> <br>" +
            "<b>Tipo: </b>" + array[30] + "<br>";
        }
        if (array[31].length > 7) {
          mensaje = mensaje + "<b>Nombre Común: </b>" + array[31] + "<br>";
        }
        if (array[32].length > 7) {
          mensaje = mensaje + "<b>Comentarios: </b>" + array[32] + "<br>";
        }
      }

      this._map.openPopup(mensaje, latlng);

    }
  });

  atlasGeoWMS = new MySource("https://srvags.sgc.gov.co/arcgis/services/Atlas_Geologico_2015/Atlas_Geologico_Colombiano_2015/MapServer/WMSServer?", {
    opacity: 0.5,
    format: 'image/png',
    transparent: true,
    version: '1.3.0', //wms version (ver get capabilities)
    info_format: "text/html",
    attribution: "Servicio Geológico Colombiano"
  });

  // Asignando las Capas del Atlas Geológico
  mapaGeo.capa = atlasGeoWMS.getLayer("0");
  mapaFallas.capa = atlasGeoWMS.getLayer("2");

  // Asignando y Ajustando las Transparencias de las Capas del Atlas Geológico
  var slidercol = $("#transpGeocol")[0];
  var outputcol = $("#valTranspGeocol")[0];
  outputcol.innerHTML = slidercol.value;
  slidercol.oninput = function () {
    outputcol.innerHTML = this.value;
    mapaGeo.transp = (100 - parseInt(this.value)) / 100;
    if (mapaGeo.capa != null && mapaGeo.active == 2) {
      mapaGeo.capa.setOpacity(mapaGeo.transp);
    }
  }

  var sliderfallas = $("#transpFallas")[0];
  var outputfallas = $("#valTranspFallas")[0];
  outputfallas.innerHTML = sliderfallas.value;
  sliderfallas.oninput = function () {
    outputfallas.innerHTML = this.value;
    mapaFallas.transp = (100 - parseInt(this.value)) / 100;
    if (mapaFallas.capa != null && mapaFallas.active == 2) {
      mapaFallas.capa.setOpacity(mapaFallas.transp);
    }
  }
  
  // Cargando las Planchas del Área de Estudio
  for (let i = 0; i < planchas.length; i++) {
    $("#btn"+planchas[i].name).click(function () {
      if (planchas[i].active == 0) {
        planchas[i].active = 1;
        planchas[i].CargarPlancha(planchas[i].data);
      } else if (planchas[i].active == 1) {
        map.removeLayer(planchas[i].capa);
        planchas[i].active = 0;
      }
    }); 
    
    $('#cp'+planchas[i].name).colorpicker().on('colorpickerChange colorpickerCreate', function (e) {
      if (planchas[i].capa != null && planchas[i].active == 1) {
        planchas[i].capa.setStyle({
          color: e.value
        });
      }
    });
  }

  // Cargando y Dibujando Marcadores de Afloramientos
  CargarMapa();

  // Función que Controla los Acordeones de la Barra Derecha
  var coll = $(".collapsible");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }

});

// ................................Funciones para Cargar, Mostrar y Ocultar los Marcadores

function CargarMapa() {

  markerGroupCurso_2021_2 = L.layerGroup().addTo(map);

  for (var i = 0; i < marca.length; i++) {
    var marcador = marca[i];
    var latlong = marcador.pos.split(", ");
    var lat = parseFloat(latlong[0]);
    var long = parseFloat(latlong[1]);
    L.marker([lat, long], {
      icon: aflorIcon
    }).addTo(markerGroupCurso_2021_2)
    .bindPopup(marcador.cod + " : " + marcador.nombre + "<br>" + marcador.pos).on('click', toggleBounce);
  }

  $("#curso_2021_2").prop("checked", true);

}

function borrarMarket(id) {

  if ($("#" + id).prop('checked')) {
    if (id == "curso_2021_2") {
      markerGroupCurso_2021_2.addTo(map);
    }
  } else {
    if (id == "curso_2021_2") {
      map.removeLayer(markerGroupCurso_2021_2);
    }
  }
}

// ................................Funciones para Cargar y Cambiar el Mapa Base 

function setBasemap(basemap) {

  var basemap = basemaps.value;

  if (mapaBase) {
    map.removeLayer(mapaBase);
  }

  if (basemap != 'Street') {
    mapaBase = L.esri.basemapLayer(basemap);
  }

  if (basemap == 'Street') {
    mapaBase = openStreet;
  }

  map.addLayer(mapaBase);

  if (mapaBaseLabels) {
    map.removeLayer(mapaBaseLabels);
  }

  if (basemap == 'ShadedRelief' ||
    basemap == 'Gray' ||
    basemap == 'DarkGray' ||
    basemap == 'Imagery'
  ) {
    mapaBaseLabels = L.esri.basemapLayer(basemap + 'Labels');
    map.addLayer(mapaBaseLabels);
  }
}

// ................................Funciones de las Barras Laterales

// Funciones para Cargar la Info del Afloramiento Escogido
function toggleBounce(e) {
    var coo = this.getLatLng();
    var coor = coo.lat + ", " + coo.lng;
    for (var i = 0; i < marca.length; i++) {
      if (marca[i].pos == coor) {
        auxMarcador=marca[i];
      }
    } 
    if(auxCargaInfoAflor==0){
      setTimeout(Recarga(), 100);
    }
    if (auxMarcador==auxCargaInfoAflor) {
      setTimeout(Recarga(), 100);
    }else{
      auxCargaInfoAflor=auxMarcador;
    }
    CargarLado();   
}

function CargarLado() {
  var mark2 = auxMarcador;
  $('#titulo').html(''+ mark2.nombre);
  $('#descrigene').html(''+mark2.descrigene);
  $('#descriaflor').html(''+mark2.descriaflor);
  $('#descriestruct').html(''+mark2.descriestruct);
  $('#descrimeteor').html(''+mark2.descrimeteor);
  $('#descrimacro').html(''+mark2.descrimacro);
  $('#descrimacro1').html(''+mark2.descrimacro1);
  $('#descrimacro2').html(''+mark2.descrimacro2);
  $('#recolectors').html(''+mark2.recolectors);
  $('#fecha').html(''+mark2.fecha);
  $("#aflor1").attr('src' , 'images/geomap/' + mark2.cod + '/aflor.jpg').addClass("img-fluid");
  $("#aflor2").attr('src' , 'images/geomap/' + mark2.cod + '/aflorzoom.jpg').addClass("img-fluid");
  $("#macro1").attr('src' , 'images/geomap/' + mark2.cod + '/macro.jpg').addClass("img-fluid");
  $("#macro2").attr('src' , 'images/geomap/' + mark2.cod + '/macro1.jpg').addClass("img-fluid");
  $("#macro3").attr('src' , 'images/geomap/' + mark2.cod + '/macro2.jpg').addClass("img-fluid");
  $("#macro3").attr('src' , 'images/geomap/' + mark2.cod + '/macro2.jpg').addClass("img-fluid");
}

function Recarga() {
  if (!$('.btn-afloramiento').hasClass('active')) {
    $('body').attr('class','izq');
  }
  setTimeout(function(){ sidebarControl('afloramiento') },20);
}

// Funciones para Abrir y Cerrar SideBars
$(".btn-afloramiento").click(function (e) { 
  e.preventDefault();
  setTimeout(function(){ sidebarControl('afloramiento') },20);
});

$(".btn-capas").click(function (e) { 
  e.preventDefault();
  sidebarControl('capas');
});

function sidebarControl(btn) {
  if (btn=='capas') {
    if ($('.btn-capas').hasClass('active')) {
      $('.btn-capas').toggleClass('active');
      $('.sidebar-right').toggleClass('active');
      $('body').toggleClass('overy_not');
    }else{
      if ($('.btn-afloramiento').hasClass('active')) {
        $('.btn-afloramiento').toggleClass('active');
        $('.sidebar-left').toggleClass('active');
        $('body').toggleClass('overy_not');
      }
      $('.btn-capas').toggleClass('active');
      $('.sidebar-right').toggleClass('active');
      $('body').toggleClass('overy_not');
    }
  }
  if (btn=='afloramiento') {
    if ($('.btn-afloramiento').hasClass('active')) {
      $('.btn-afloramiento').toggleClass('active');
      $('.sidebar-left').toggleClass('active');
      $('body').toggleClass('overy_not');
    }else{
      if ($('.btn-capas').hasClass('active')) {
        $('.btn-capas').toggleClass('active');
        $('.sidebar-right').toggleClass('active');
        $('body').toggleClass('overy_not');
      }
      $('.btn-afloramiento').toggleClass('active');
      $('.sidebar-left').toggleClass('active');
      $('body').toggleClass('overy_not');
    }
  }
}

$(".sb-close-l").click(function () {
  auxCargaInfoAflor=0;
  setTimeout(function(){ sidebarControl('afloramiento') },20);
});

$(".sb-close-r").click(function () {
  sidebarControl('capas');
});

// ................................Funciones para Cargar las Capas del Atlas Geológico

$("#btnGeocol").click(function () {
  if (mapaGeo.active == 0) {
    mapaGeo.active = 2;
    setTimeout(cargarGeocol, 10);
  } else if (mapaGeo.active == 1) {
    cargarGeocol();
    mapaGeo.active = 2;
  } else if (mapaGeo.active == 2) {
    map.removeLayer(mapaGeo.capa);
    mapaGeo.active = 1;
  }
});

function cargarGeocol() {
  mapaGeo.capa.addTo(map);
  mapaGeo.capa.setOpacity(mapaGeo.transp);
}

$("#btnFallas").click(function () {
  if (mapaFallas.active == 0) {
    mapaFallas.active = 2;
    setTimeout(cargarFallas, 10);
  } else if (mapaFallas.active == 1) {
    cargarFallas();
    mapaFallas.active = 2;
  } else if (mapaFallas.active == 2) {
    map.removeLayer(mapaFallas.capa);
    mapaFallas.active = 1;
  }
});

function cargarFallas() {
  mapaFallas.capa.addTo(map);
  mapaFallas.capa.setOpacity(mapaFallas.transp);
}

// ................................Funciones para carga de archivos KML

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
      f.size, ' bytes, last modified: ',
      f.lastModifiedDate.toLocaleDateString(), '</li>');
  }
  document.getElementById("archi").style.maxHeight = "0px";
  document.getElementById("archi").style.maxHeight = "378px";
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

  for (var i = 0, f; f = files[i]; i++) {

    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {

        fetch(e.target.result)
          .then(res => res.text())
          .then(kmltext => {
            // Create new kml overlay
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');
            const track = new L.KML(kml);
            map.addLayer(track);
            // Adjust map to show the kml
            const bounds = track.getBounds();
            map.fitBounds(bounds);
          });
      };
    })(f);
    reader.readAsDataURL(f);

  }
}
document.getElementById('files').addEventListener('change', handleFileSelect, false);