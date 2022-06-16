// ................................Variables
// Mapa Base
var map;
var mapaBase;
var openStreet;

// Auxiliares carga marcadores
var layerMarkers = [];
var auxCargaInfoAflor = 0;
var allData = L.layerGroup();
var layerEdit=null;
var layergeojson = null;
var layergeojsonAnterior = null;
var coloranterior ='';
var colorguardar = false;
var notNewAnterior = false;
var idLayer ='nuevo';
var claseLayer = 'nuevo';
var savelayer;
var forma = null;
var searchCtrl;
var editMode = false;
var sidebarLeft = false;
var cutMode = false;
var marcadores;
var semestres;
var countRocks;
var fileAflor = null;
var fileZoom = null;
var urlRockCheck = [];
var fileRock =[];
// Opciones del Spin
var spinOpts = {
  lines: 10, // The number of lines to draw
  length: 15, // The length of each line
  width: 10, // The line thickness
  radius: 5, // The radius of the inner circle
  scale: 0.55, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1.1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-more', // The CSS animation name for the lines
  direction: -1, // 1: clockwise, -1: counterclockwise
  color: '#f9ae00', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  //top: '50%', // Top position relative to parent
  //left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  //position: 'absolute', // Element positioning
};
//Iconos Marcadores
var IconDefault = L.icon({
  iconUrl: 'css/images/marker-icon.png'
});
var IconSelect = L.icon({
  iconUrl: 'css/images/marker-resaltado.png'
});

// ---------> Datos
// Declaración del objeto 'CapaDatos'
function CapaDatos(capa, figuras, database, active, clase, name, color) {
  this.capa = capa;
  this.figuras = figuras;
  this.database = database;
  this.active = active;
  this.clase = clase;
  this.name = name;
  this.color = color;
  this.CargarCapaDatos = CargarCapaDatos;
}
var capasDatos = [
  //new CapaDatos(null,[],null,0,'mapa','Procesos Morfodinámicos','#2ecc71'),
];
function CargarDatos() {
  database.ref().child("semestres").get().then((snapshot) => {
    if (snapshot.exists()) {
      semestres = snapshot.val();
      for (let i = 0; i < semestres["count"]; i++) {
        capasDatos.push(new CapaDatos(null,[],null,0,'marcadores', semestres["semestre_"+i] ,'#2ecc71'));
      }
      for (let i = 1; i < semestres["count"]; i++) {
        var indexMap = capasDatos.push(new CapaDatos(null,[],null,0,'geomapas', semestres["semestre_"+i] ,'#2ecc71'));
        indexMap = indexMap - 1;
        $("#lista_capas_descargar").empty();
        $("#lista_capas_descargar").append(
              '<h3>Mapa Geológico</h3>' +
              '<label for="tipo_descarga_'+ indexMap +'">Descargar en Formato: </label>' +
              '<select id="tipo_descarga_'+ indexMap +'" class="form-control select-mpios">' +
                  '<option value="shp">Shapefile</option>' +
                  '<option value="geojson">GeoJSON</option>' +
              '</select>'+
              '<a class="btn-descargar" id="clase_descarga_'+ indexMap +'" onclick="CargarDatosDescarga(id, this)" type="button" >  <i class="fas fa-layer-group"></i>   Cargar la Capa </a>'+
              '<a class="btn-descargar" id="clasea_descarga_'+ indexMap +'" onclick="DescargarDatos(id, this)" type="button" >  <i class="fas fa-file-download"></i>   Descargar </a>'
        );
      }
      for (let i = 0; i < capasDatos.length; i++) {
        if(capasDatos[i].clase === 'marcadores'){
          $("#list_mark").append(
            '<li class="content-list first">'+
                '<label class="switch">'+
                    '<input type="checkbox" id="forma_' + i + '" onChange="toggleDatos(id)">'+
                    '<span class="slider round"></span>'+
                '</label>'+
                '<a>  ' + capasDatos[i].name + '</a>'+
            '</li>'
          );
          $("#forma_"+i).prop("checked", false);
        }else if(capasDatos[i].clase === 'geomapas'){
          $("#list_aflora").append(
            '<li class="content-list first">'+
                '<label class="switch">'+
                    '<input type="checkbox" id="forma_' + i + '" onChange="toggleDatos(id)">'+
                    '<span class="slider round"></span>'+
                '</label>'+
                '<a>  ' + capasDatos[i].name + '</a>'+
            '</li>'
          );
          $("#forma_"+i).prop("checked", false);
        }
      
        
      }
  
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}
function toggleDatos(id) {
  var num = id.split("_")[1];
  console.log(capasDatos[num].active)
  if (capasDatos[num].active == 0) {
    capasDatos[num].active = 2;
    capasDatos[num].CargarCapaDatos();
  } else if (capasDatos[num].active == 1){
    capasDatos[num].active = 2;
    capasDatos[num].capa.addTo(map);
  } else if (capasDatos[num].active == 2){
    capasDatos[num].active = 1;
    map.removeLayer(capasDatos[num].capa);
  }

}
function CargarCapaDatos() {
  map.spin(true, spinOpts);
  this.capa = L.layerGroup();
  this.capa.addTo(map);
  if (this.clase === 'marcadores') {
    database.ref().child(this.clase+'/'+this.name).get().then((snapshot) => {
      if (snapshot.exists()) {
        this.database = snapshot.val();
        console.log(snapshot.val());
        for (let i = 0; i < this.database.count.count; i++) {
          if (this.database['mark_'+i]?.activo) {
            this.figuras.push(this.database['mark_'+i]['layergeojson']);
            L.extend(this.database['mark_'+i]['layergeojson'].properties, {
              id: this.database["mark_"+i]["id"],
              clase: this.clase,
              semestre: this.name
            });
            // console.log(i);
            L.geoJson(this.database['mark_'+i]['layergeojson'],{
                onEachFeature: function (feature, layer) {
                  feature.layer = layer;
                  layer.bindPopup(popupMarks);
                }
              })
              .bindPopup(popupMarks)
              .addTo(this.capa)
              .addTo(allData)
              .on('click', function(e) {
                EditExistMark(e);
              });           
          }
        }
        console.log(this.figuras);
        console.log(this.capa.toGeoJSON());
        console.log(allData.toGeoJSON());
        searchCtrl.indexFeatures(allData.toGeoJSON(), ['cod','id','nombre', 'grupo', 'clase',"nombreUGS", "codigoUGS", "tipoUGS", "recolectors", "plancha"]);
        map.spin(false);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  if (this.clase === 'geomapas') {
    database.ref().child(this.clase+'/'+this.name).get().then((snapshot) => {
      if (snapshot.exists()) {
        this.database = snapshot.val();
        console.log(snapshot.val());
        for (let i = 0; i < this.database.count.count; i++) {
          if (this.database['feat_'+i]?.activo) {
            this.figuras.push(this.database['feat_'+i]['layergeojson']);
            L.extend(this.database['feat_'+i]['layergeojson'].properties, {
              id: this.database["feat_"+i]["id"],
              clase: this.clase,
              semestre: this.name
            });
            // console.log(i);
            L.geoJson(this.database['feat_'+i]['layergeojson'],{
                onEachFeature: function (feature, layer) {
                  feature.layer = layer;
                  layer.bindPopup(popupMaps);
                }
              })
              .bindPopup(popupMaps)
              .setStyle({color: this.database['feat_'+i]['layergeojson'].properties.color})
              .addTo(this.capa)
              .addTo(allData)
              .on('click', function(e) {
                EditExistMap(e);
              });           
          }
        }
        console.log(this.figuras);
        console.log(this.capa.toGeoJSON());
        console.log(allData.toGeoJSON());
        searchCtrl.indexFeatures(allData.toGeoJSON(), ['cod','id','nombre', 'grupo', 'clase',"nombreUGS", "codigoUGS", "tipoUGS", "recolectors", "plancha"]);
        map.spin(false);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}
// ****PESTAÑA DESCARGAR DATOS
// Función para cargar los datos desde Descargar Datos y dejarlos almacenados
function CargarDatosDescarga(id, obj){
  const num_descarga = id.split("_")[2];
  if (capasDatos[num_descarga].active == 0) {
    capasDatos[num_descarga].active = 2;
    capasDatos[num_descarga].CargarCapaDatos();
    $("#forma_"+num_descarga).prop("checked", true);
  } else if (capasDatos[num_descarga].active == 1) {
    capasDatos[num_descarga].active = 2;
    capasDatos[num_descarga].capa.addTo(map);
    $("#forma_"+num_descarga).prop("checked", true);
  }
}
function DescargarDatos(id, obj) {
  const num_descarga = id.split("_")[2];
  if (capasDatos[num_descarga].active == 0) {
    alert("Por favor active la capa que desea descargar.")
  } else{
    let filtrotipo = $("#tipo_descarga_" + num_descarga).val();
    DescargarDatosJSON(capasDatos[num_descarga].database, capasDatos[num_descarga].clase, filtrotipo )
  }
}
// Función para descargar un archivo
function saveToFile(content, filename) {
  var file = filename + '.json';
  console.log(content)
  saveAs(new File([JSON.stringify(content, getCircularReplacer())], file, {
    type: "text/plain;charset=utf-8"
  }), file);
}
//Función que filtra los datos según el mpio seleccionado y construye el geojson
function DescargarDatosJSON(baseDatos, clase, filtrotipo){
  let capas = L.layerGroup();
  let copiaDatos = {...baseDatos}

  for (let j = 0; j < copiaDatos["count"]["count"]; j++) {
    if (copiaDatos["feat_"+j]?.activo) {
      let temp = copiaDatos["feat_"+j]["layergeojson"];
      L.geoJson(temp).addTo(capas);
      // temp["geometry"]["coordinates"].pop();
    }
  }
  
  let archivoFinal = capas.toGeoJSON();
  //Eliminar el campos no deseados
  for(let k= 0; k < archivoFinal.features.length; k++ ){
    delete archivoFinal["features"][k].layer;
    delete archivoFinal["features"][k]["properties"]["_feature"];

    archivoFinal["features"][k]["id"] = k;
  }

  if (filtrotipo === 'shp') {
    var options = {
      folder: 'Capa_'+ clase+ "_" +dateFormat(new Date(),'Y-m-d'),
      types: {
          point: clase+ "_" +dateFormat(new Date(),'Y-m-d'),
          polygon: clase+ "_" +dateFormat(new Date(),'Y-m-d'),
          polyline: clase+ "_" +dateFormat(new Date(),'Y-m-d')
      }
  }
    shpwrite.download(archivoFinal, options);
  } else {
    saveToFile(archivoFinal, 'Capa_'+ clase + "_" +dateFormat(new Date(),'Y-m-d')); //Generar el archivo descargable
  }

  capas = null;
  copiaDatos = null;
  
}
// Función para eliminar el error de referencia cíclica de un json
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
// Función que define los popup de las figuras según su clase
function popupMarks(layer) {
  if (!editMode) {
    if (layer.feature.properties.clase == 'marcadores') {
      return L.Util.template('<p><strong>Estación</strong>: {cod}.<br>'+ 
                              '<strong>Nombre</strong>: {nombre}.<br>'+
                              '<strong>Grupo</strong>: {grupo}.<br>'+
                              '<strong>ID en la Base de Datos</strong>: {id}.<br>', layer.feature.properties);
    }
  }
}
function popupMaps(layer) {
  if (!editMode) {
    if (layer.feature.properties.clase == 'geomapas') {
      return L.Util.template('<p><strong>Codigo</strong>: {Cod_UGS}.<br>'+ 
                              '<strong>Nombre</strong>: {Nom_UGS}.<br>'+
                              '<strong>Tipo</strong>: {Tipo_UGS}.<br>'+
                              '<strong>Descripción</strong>: {Descri_UGS}.<br>'+
                              '<strong>Grupo</strong>: {grupo}.<br>'+
                              '<strong>ID en la Base de Datos</strong>: {id}.<br>', layer.feature.properties);
    }
  }
}


// ---------> Insumos
// Declaración del objeto 'Capas'
function Capas(capa, curva, active, name, url) {
  this.capa = capa;
  this.curva = curva;
  this.active = active;
  this.name = name;
  this.url = url;
  this.CargarCapaPlanchas = CargarCapaPlanchas;
}
// Array con el nombre de las planchas topográficas 25K
var namePlanchas = [  
  '166IIC1',
  '166IIC2',
  '166IIC3',
  '166IIC4',
];
// Array con las curvas de nivel y drenajes dobles y sencillos de las planchas
var planchas = [
  new Capas(null,1,0,'Curvas166IIC1','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Curva_Nivel_166IIC1/MapServer'),
  new Capas(null,1,0,'Drenajes166IIC1','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Drenaje_Sencillo_166IIC1/MapServer'),
  new Capas(null,1,0,'DrenajesD166IIC1','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Drenaje_Doble_166IIC1/MapServer'),
  new Capas(null,1,0,'Vias166IIC1','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Via_166IIC1/MapServer'),
 
  new Capas(null,1,0,'Curvas166IIC2','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Curva_Nivel_166IIC2/MapServer'),
  new Capas(null,1,0,'Drenajes166IIC2','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Drenaje_Sencillo_166IIC2/MapServer'),
  new Capas(null,1,0,'DrenajesD166IIC2','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Drenaje_Doble_166IIC2/MapServer'),
  new Capas(null,1,0,'Vias166IIC2','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Via_166IIC2/MapServer'),
 
  new Capas(null,1,0,'Curvas166IIC3','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Curva_Nivel_166IIC3/MapServer'),
  new Capas(null,1,0,'Drenajes166IIC3','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Drenaje_Sencillo_166IIC3/MapServer'),
  new Capas(null,1,0,'DrenajesD166IIC3','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Drenaje_Doble_166IIC3/MapServer'),
  new Capas(null,1,0,'Vias166IIC3','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Via_166IIC3/MapServer'),
 
  new Capas(null,1,0,'Curvas166IIC4','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Curva_Nivel_166IIC4/MapServer'),
  new Capas(null,1,0,'Drenajes166IIC4','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Drenaje_Sencillo_166IIC4/MapServer'),
  new Capas(null,1,0,'DrenajesD166IIC4','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Drenaje_Doble_166IIC4/MapServer'),
  new Capas(null,1,0,'Vias166IIC4','https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Via_166IIC4/MapServer'),
];
// Array com las grillas de las planchas 25k
var insumosGenerales = [
  new Mapa(null,'grilla','Grilla Planchas 25K',1,0,0.5, grilla),
  new Mapa(null,'labels','Etiquetas y Límites Políticos',4,0,0.5, null),
];
var morfometrias = [
  new Mapa(null,'hillAlos','Hillshade - ALOS PALSAR',2,0,0.5, 'https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/Hillshade/MapServer'),
  new Mapa(null,'dem','DEM - ALOS PALSAR',2,0,0.5, 'https://tiles.arcgis.com/tiles/gTVMpnerZFjZtXQb/arcgis/rest/services/DEM/MapServer'),
];
// Función para dibujar los botones y acordiones de los insumos
function CargarInsumos() {

  // Cargando las Curvas de nivel y Drenajes dobles y sencillos de las planchas 25K de la Zona de Estudio
  for (let i = 0; i < namePlanchas.length; i++) {
    
    var content = '<li>'+
                    '<button type="button" class="collapsible coll_plancha">Plancha '+ namePlanchas[i] +'</button>'+
                      '<div class="content">'+
                        '<ul>';
    var aux = 4 * i;
    for (let j = 0; j < 4; j++) {
      var capa = planchas[j+aux];
      content += '<li class="content-list first">'+
                    '<div class="group_plancha">'+
                        '<label class="switch">'+
                            '<input type="checkbox" id="btn_'+capa.name+'">'+
                            '<span class="slider round"></span>'+
                        '</label>';
      if (j==0) {
        content += '<a class="a_plancha">Curvas de Nivel</a>';
      }else if (j==1) {
        content += '<a class="a_plancha">Drenajes</a>';
      }else if (j==2) {
        content += '<a class="a_plancha">Drenajes Dobles</a>';
      }else{
        content += '<a class="a_plancha">Vías</a>';
      }
      content +=  '</div>'+
                '</li>'
    }
    content +=    '</ul>'+
                '</div>'+
              '</li>';
    $("#lista_insumos").append(content);
    
  }
  for (let i = 0; i < planchas.length; i++) {
    $("#btn_"+planchas[i].name).click(function () {
      if (planchas[i].active == 0) {
        planchas[i].active = 1;
        planchas[i].CargarCapaPlanchas();
      } else if (planchas[i].active == 1) {
        planchas[i].active = 0;
        map.removeLayer(planchas[i].capa);
      }
    }); 
  }

  // Cargando Insumos generales
  for (let i = 0; i < insumosGenerales.length; i++) {
    
    if (insumosGenerales[i].aux == 4) {
      insumosGenerales[i].capa = L.esri.basemapLayer('ImageryLabels');
      $("#lista_generales").append(
        '<li class="content-list first">'+
          '<label class="switch">'+
              '<input type="checkbox" id="btn_'+insumosGenerales[i].alias +'_'+i+'">'+
              '<span class="slider round"></span>'+
          '</label>'+
          ' '+insumosGenerales[i].name+
        '</li>'
      );
    } else{
        var text;
        var propiedad;
        var color;
        var weight;
        if (insumosGenerales[i].name == 'Grilla Planchas 25K') {
          text ='Plancha: ';
          propiedad ='Plancha';
          color = '#000000';
          weight = 5;
        } 
  
        insumosGenerales[i].capa = new L.geoJson(insumosGenerales[i].url, {
          // snapIgnore: true,
          onEachFeature: function(feature, layer) {
            if (feature.properties) {
              layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
              }).join("<br />"), {
                maxHeight: 200
              });
              layer.bindTooltip(text+feature.properties[propiedad], 
                {
                    permanent: false, 
                    direction: 'top',
                    sticky: true,
                }
              );
            }
          }
        }).setStyle({color: color, weight: weight}); 

        $("#lista_generales").append(
          '<li class="content-list first">'+
            '<label class="switch">'+
                '<input type="checkbox" id="btn_'+insumosGenerales[i].alias +'_'+i+'">'+
                '<span class="slider round"></span>'+
            '</label>'+
            ' '+insumosGenerales[i].name+
            '<div class="slidecontainer">'+
                '<input type="range" min="0" max="100" value="0" class="sliderb" id="transp_'+insumosGenerales[i].alias+'_'+i+'">'+
                '<p>Transparencia: <span id="valTransp_'+insumosGenerales[i].alias+'_'+i+'"></span>%</p>'+
            '</div>'+
          '</li>'
        );
      
        var slider = $("#transp_"+insumosGenerales[i].alias+'_'+i)[0];
        var output = $("#valTransp_"+insumosGenerales[i].alias+'_'+i)[0];
        output.innerHTML = slider.value;
        slider.oninput = function () {
          var id = parseInt($(this).attr('id').split('_')[2]);
          var output = $("#valTransp_"+insumosGenerales[id].alias+"_"+id)[0];
          output.innerHTML = this.value;
          insumosGenerales[id].transp = (100 - parseInt(this.value)) / 100;
          if (insumosGenerales[id].capa != null && insumosGenerales[id].active == 1) {
              insumosGenerales[id].capa.setStyle({opacity : insumosGenerales[id].transp});
          }
        }
      
    }
    $("#btn_"+insumosGenerales[i].alias+'_'+i).click(function () {
      var id = parseInt($(this).attr('id').split('_')[2]);
      if (insumosGenerales[id].active == 0) {
        insumosGenerales[id].active = 1;
        if(insumosGenerales[id].aux == 1){
          insumosGenerales[id].CargarCapaMapa();
        } else{
          insumosGenerales[id].capa.addTo(map);
        }
      } else if (insumosGenerales[id].active == 1) {
        insumosGenerales[id].active = 0;
        insumosGenerales[id].RemoverCapaMapa();
      }
    });

  }
  
   // Cargando Morfometrias
  for (let i = 0; i < morfometrias.length; i++) {
    
    if (morfometrias[i].aux == 2) {
      morfometrias[i].capa = L.esri.tiledMapLayer({
        url: morfometrias[i].url
      });
      
      $("#lista_morfos").append(
        '<li class="content-list first">'+
          '<label class="switch">'+
              '<input type="checkbox" id="btn_'+morfometrias[i].alias +'_'+i+'">'+
              '<span class="slider round"></span>'+
          '</label>'+
          ' '+morfometrias[i].name+
        '</li>'
      );
    }
    
    $("#btn_"+morfometrias[i].alias+'_'+i).click(function () {
      var id = parseInt($(this).attr('id').split('_')[2]);
      if (morfometrias[id].active == 0) {
        morfometrias[id].active = 1;
        if(morfometrias[id].aux == 1){
          morfometrias[id].CargarCapaMapa();
        } else{
          morfometrias[id].capa.addTo(map);
        }
      } else if (morfometrias[id].active == 1) {
        morfometrias[id].active = 0;
        morfometrias[id].RemoverCapaMapa();
      }
    });

  }


}
// Funciones para cargar las capas de los insumos
function CargarCapaPlanchas() {
    
    this.capa = L.esri.tiledMapLayer({
      url: this.url
    }).addTo(map);
    
    // this.capa.on('mouseout', function (e) {
    //   document.getElementById('info-pane').innerHTML = 'Hover to Inspect';
    // });
    this.capa.on('mouseover', function (e) {
      //alert(e.layer.feature.properties.ALTURA_SOB);
    });

}
function CargarCapaInfoSec() {
    
    this.capa = L.esri.Cluster.featureLayer({
      url: this.url, 
      onEachFeature: function(feature, layer) {
        if (feature.properties) {
          layer.bindPopup(Object.keys(feature.properties).map(function(k) {
            return k + ": " + feature.properties[k];
          }).join("<br />"), {
            maxHeight: 200
          });
        }
      }
    }).addTo(map);

}


// ---------> Mapas
// Declaración del objeto 'Mapa'
function Mapa(capa, alias, name, aux, active, transp, url) {
  this.capa = capa;
  this.alias = alias;
  this.name = name;
  this.aux = aux;
  this.active = active;
  this.transp = transp;
  this.url = url;
  this.CargarCapaMapa = CargarCapaMapa;
  this.RemoverCapaMapa = RemoverCapaMapa;
  this.CargarCapaInfoSec = CargarCapaInfoSec;
}
// Variables y Array de los Mapas
var atlasGeoWMS;
var mapasGenerales =[
  new Mapa(null,'Geocol','Mapa Geológico de Colombia',0,0,0.5,null),
  new Mapa(null,'Fallas','Mapa de Fallas Regionales',0,0,0.5,null),
];
// Función para Mostrar los Mapas
function CargarCapaMapa() {
  this.capa.addTo(map);
  if (this.name == 'Mapa Geológico de Colombia' || this.name == 'Mapa de Fallas Regionales') {
    this.capa.setOpacity(this.transp);
  } else {
    this.capa.setStyle({fillOpacity : this.transp});
  }
}
// Función para Remover los Mapas
function RemoverCapaMapa() {
  map.removeLayer(this.capa);
}
// Función para Dibujar botones y Cargar los Mapas además establecer la Opacidad
function CargarMapas() {
  // Cargando las Capas del Mapa Geológico Colombiano
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
  
  for (let i = 0; i < mapasGenerales.length; i++) {
    if (mapasGenerales[i].name == 'Mapa Geológico de Colombia') {
      mapasGenerales[i].capa = atlasGeoWMS.getLayer("0");
    } else if (mapasGenerales[i].name == 'Mapa de Fallas Regionales') {
      mapasGenerales[i].capa = atlasGeoWMS.getLayer("2");
    } else {
      mapasGenerales[i].capa = L.esri.featureLayer({
        url: mapasGenerales[i].url,
      }).bindPopup(function (layer) {
        if (mapasGenerales[i].name == 'Mapa UGS 100K de la Zona') {
          return L.Util.template('<p><strong>'+layer.feature.properties.Código+'</strong>: {Unidad}.<br>'+ 
                                    '<strong>Litología</strong>: '+layer.feature.properties.Litología+'.<br>'+
                                    '<strong>Textura-Fábrica</strong>: {TextFabric}.<br>'+
                                    '<strong>Resistencia</strong>: {Resistenci}.<br>', layer.feature.properties);
        }else if(mapasGenerales[i].name == 'Mapa de Macrounidades Geomorfológicas'){
          return L.Util.template('<p><strong>Relieve</strong>: {Relieve}.<br>'+ 
                                  '<strong>Macrounidad</strong>: {Macrounida}.<br>', layer.feature.properties);
        }
      });
    }

    $("#ul_mapas").append(
      '<li class="content-list first">'+
        '<label class="switch">'+
            '<input type="checkbox" id="btn_'+mapasGenerales[i].alias +'_'+i+'">'+
            '<span class="slider round"></span>'+
        '</label>'+
        ' '+mapasGenerales[i].name+
        '<div class="slidecontainer">'+
            '<input type="range" min="0" max="100" value="50" class="sliderb" id="transp_'+mapasGenerales[i].alias+'_'+i+'">'+
            '<p>Transparencia: <span id="valTransp_'+mapasGenerales[i].alias+'_'+i+'"></span>%</p>'+
        '</div>'+
      '</li>'
    );

    var slider = $("#transp_"+mapasGenerales[i].alias+'_'+i)[0];
    var output = $("#valTransp_"+mapasGenerales[i].alias+'_'+i)[0];
    output.innerHTML = slider.value;
    slider.oninput = function () {
      var id = parseInt($(this).attr('id').split('_')[2]);
      var output = $("#valTransp_"+mapasGenerales[id].alias+"_"+id)[0];
      output.innerHTML = this.value;
      mapasGenerales[id].transp = (100 - parseInt(this.value)) / 100;
      if (mapasGenerales[id].capa != null && mapasGenerales[id].active == 1) {
        if (mapasGenerales[id].name == 'Mapa Geológico de Colombia' || mapasGenerales[id].name == 'Mapa de Fallas Regionales') {
          mapasGenerales[id].capa.setOpacity(mapasGenerales[id].transp);
        } else {
          mapasGenerales[id].capa.setStyle({fillOpacity : mapasGenerales[id].transp});
        }
      }
    }
    $("#btn_"+mapasGenerales[i].alias+'_'+i).click(function () {
      var id = parseInt($(this).attr('id').split('_')[2]);
      if (mapasGenerales[id].active == 0) {
        mapasGenerales[id].active = 1;
        mapasGenerales[id].CargarCapaMapa();
      } else if (mapasGenerales[id].active == 1) {
        mapasGenerales[id].active = 0;
        mapasGenerales[id].RemoverCapaMapa();
      }
    });
  }  
}


// ................................Función PPAL
$(document).ready(function () {

  //------> Cargando Entidad Mapa (Leaflet)
  map = L.map('map').setView([5.914053, -75.655911], 13);
  // Añadiendo carreteras al mapa base
  // mapaBaseLabels1 = L.esri.basemapLayer('ImageryTransportation');
  // map.addLayer(mapaBaseLabels1);
    
  //------> Cargando dos de los Mapa Base
  // Cargando el OSM
  openStreet = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
  });
  // Cargando el Google Maps
  google = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: 'Google',
            maxZoom: 21
  });
  // Estableciendo como mapa base el Google Maps
  setBasemap("Google");

  //------> Cargando Controladores de las Herramientas del Visor
  // Cargando la Escala
  CargarEscala();
  // Cargando la Herramienta de Regla
  CargarRegla();
  // Cargando los Logos
  //CargarLogos();
  // Cargando la Herramienta de Dibujo
  CargarDraw();
  // Cargando la Barra de Busqueda
  CargarSearch();
  // Cargando Herramienta de Estilos
  CargarStyles();

  //------> Cargando los Datos, Municipio,Insumos y Mapas del Área de Estudio
  // Cargando los Botones de los Datos del Visor
  CargarDatos();
  // Cargando Insumos
  CargarInsumos();
  // Cargando Mapas
  CargarMapas();
  // Cargando Botón Split
  CargarBtnSplit();

  // Mostrando los municipios de la zona de estudio
  Acordiones();
  insumosGenerales[0].capa.addTo(map);
  insumosGenerales[0].active = 1;
  $("#btn_grilla_0").prop("checked", true);
  // $("#btn_hillAlos_2").prop("checked", true);
  

});

 
// ................................Funciones para Cargar los Controladores de las Herramientas del Visor
// Escala
function CargarEscala() {
  L.control.scale({
    metric: true,
    imperial: false,
    position: 'bottomleft'
  }).addTo(map);
}
// Regla
function CargarRegla() {
  var options = {
    position: 'topleft',         // Leaflet control position option
    circleMarker: {               // Leaflet circle marker options for points used in this plugin
      color: 'red',
      radius: 2
    },
    lineStyle: {                  // Leaflet polyline options for lines used in this plugin
      color: 'red',
      dashArray: '1,6'
    },
    lengthUnit: {                 // You can use custom length units. Default unit is kilometers.
      display: 'meters',              // This is the display value will be shown on the screen. Example: 'meters'
      decimal: 2,                 // Distance result will be fixed to this value. 
      factor: 1000,               // This value will be used to convert from kilometers. Example: 1000 (from kilometers to meters)  
      label: 'Distancia:'           
    },
    angleUnit: {
      display: '&deg;',           // This is the display value will be shown on the screen. Example: 'Gradian'
      decimal: 2,                 // Bearing result will be fixed to this value.
      factor: null,                // This option is required to customize angle unit. Specify solid angle value for angle unit. Example: 400 (for gradian).
      label: 'Azimut:'
    }
  };
  L.control.ruler(options).addTo(map);
}
// Logos
function CargarLogos() {
  for (let i = 0; i < 1; i++) {

    var url;
    var position;
    var width;
    if(i == 0){
      url = '../images/LOGO_FINAL_V2.png';
      position = 'bottomleft';
      width = '75px';
    }else if(i == 1){
      url = '../images/logo_SGC_blanco.png';
      position = 'bottomright';
      width = '150px';
    }
    L.control.Watermark = L.Control.extend({
      onAdd:function(map){
        var img = L.DomUtil.create('img');
        img.src = url;
        img.style.width = width;
        return img;
      },
      onRemove:function(map){},
    });
    L.control.watermark = function(opts){
      return new L.control.Watermark(opts);
    };
    L.control.watermark({position: position}).addTo(map);
  }
}
// Dibujo
function CargarDraw() {
  var drawnPolygons = L.featureGroup().addTo(map);
  var drawnLines = L.featureGroup().addTo(map);
  var polygons = [];
  drawnItems = L.featureGroup().addTo(map);
  map.pm.setLang('es');
  map.on('pm:create', function (e) {
    console.log('create primero');
    if (!cutMode) {
      var layer = e.layer;
      console.log(layer.toGeoJSON());
      var geojson = layer.toGeoJSON();
      var geom = turf.getGeom(geojson);
      if (geom.type == 'Polygon') {
        polygons.push(geom);
        drawnPolygons.addLayer(layer);
        layer.on('click', EditNewMap);
      }else if (geom.type == 'Point'){
        layer.on('click', EditNewMark);
        drawnItems.addLayer(layer);
      }else{
        drawnItems.addLayer(layer);
      }
    } else{
      var layer = e.layer;
      var geojson = layer.toGeoJSON();
      var geom = turf.getGeom(geojson);
      if (geom.type == 'Polygon') {
        polygons.push(geom);
        drawnPolygons.addLayer(layer);
      } else if (geom.type == 'LineString') {
        var line = geom;
        drawnLines.addLayer(layer);
        drawnPolygons.clearLayers();
        var newPolygons = [];
        polygons.forEach(function(polygon, index) {
          var cutDone = false;
          var layer;
          var upperCut = cutPolygon(polygon, line, 1, 'upper');
          var lowerCut = cutPolygon(polygon, line, -1, 'lower');
          if ((upperCut != null) && (lowerCut != null)) {
            cutMode = false;
            drawnLines.clearLayers();
            layer = L.geoJSON(upperCut, {
              style: function(feature) {
                return {
                  color: 'red'
                };
              }
            }).addTo(drawnPolygons).on('click', EditNewMap);
            layer = L.geoJSON(lowerCut, {
              style: function(feature) {
                return {
                  color: '#3388ff'
                };
              }
            }).addTo(drawnPolygons).on('click', EditNewMap);
            cutDone = true;
          }
          if (cutDone) {
            newPolygons.push(upperCut.geometry);
            newPolygons.push(lowerCut.geometry);
          } else {
            drawnLines.clearLayers();
            newPolygons.push(polygon);
            layer = L.geoJSON(polygon, {
              style: function(feature) {
                return {
                  color: '#3388ff'
                };
              }
            }).addTo(drawnPolygons).on('click', EditNewMap);
          }
        });
        polygons = newPolygons;
      }
    }
  });
  map.on('pm:drawstart', (e) => {
    editMode = true;
  });
  map.on('pm:drawend', (e) => {
    editMode = false;
    cutMode = false;
    console.log('end primero');
  });
  map.pm.addControls({
    position: 'topright',
    drawMarker: true,
    drawPolyline: true,
    drawRectangle: false,
    drawPolygon: true,
    drawCircle: false,
    drawCircleMarker: false,
    editMode: false,
    dragMode:false,
    cutPolygon:false,
    removalMode: true,
    rotateMode: false
  });
}
// Barra de Busqueda
function CargarSearch() {
  searchCtrl = L.control.fuseSearch()
  searchCtrl.addTo(map);
  $(".leaflet-fusesearch-control a").append('<i class="icon_search fas fa-search-location"></i>');
  $(".leaflet-fusesearch-panel").height($(window).height()-$("header").height()-20);  
  $(window).resize(function () { 
    $(".leaflet-fusesearch-panel").height($(window).height()-$("header").height()-20);
  });
}
// Estilos
function CargarStyles() {
  var styleEditor = L.control.styleEditor({
    openOnLeafletDraw: true,
    showTooltip: false,
    position: 'topright',
    useGrouping: false
  });
  map.addControl(styleEditor);
}
// Boton Split
function CargarBtnSplit() {

  map.pm.Toolbar.copyDrawControl('Line', {
    name: 'LineCopy',
    block: 'edit',
    title: 'Cortar Polígonos',
    className: 'cut',
    onClick: () => {
      console.log('click primero');
      cutMode = true;
    },
  });

  $(".cut").append('<span class="fa fa-cut cuts"></span>');

}
function cutPolygon(polygon, line, direction, id) {
  var j;
  var polyCoords = [];
  var cutPolyGeoms = [];
  var retVal = null;

  if ((polygon.type != 'Polygon') || (line.type != 'LineString')) return retVal;

  var intersectPoints = turf.lineIntersect(polygon, line);
  var nPoints = intersectPoints.features.length;
  if ((nPoints == 0) || ((nPoints % 2) != 0)) return retVal;

  var offsetLine = turf.lineOffset(line, (0.01 * direction), {
    units: 'kilometers'
  });

  for (j = 0; j < line.coordinates.length; j++) {
    polyCoords.push(line.coordinates[j]);
  }
  for (j = (offsetLine.geometry.coordinates.length - 1); j >= 0; j--) {
    polyCoords.push(offsetLine.geometry.coordinates[j]);
  }
  polyCoords.push(line.coordinates[0]);
  var thickLineString = turf.lineString(polyCoords);
  var thickLinePolygon = turf.lineToPolygon(thickLineString);

  var clipped = turf.difference(polygon, thickLinePolygon);
  for (j = 0; j < clipped.geometry.coordinates.length; j++) {
    var polyg = turf.polygon(clipped.geometry.coordinates[j]);
    var overlap = turf.lineOverlap(polyg, line, {
      tolerance: 0.005
    });
    if (overlap.features.length > 0) {
      cutPolyGeoms.push(polyg.geometry.coordinates);
    }
  }

  if (cutPolyGeoms.length == 1)
    retVal = turf.polygon(cutPolyGeoms[0], {
      id: id
    });
  else if (cutPolyGeoms.length > 1) {
    retVal = turf.multiPolygon(cutPolyGeoms, {
      id: id
    });
  }

  return retVal;
}


// ................................Funciones de los formularios
// Función para resaltar la figura seleccionada

function ResaltarFeat(newFeat, notNew) {
  var colorSelect = '#fff';
  if (!editMode) {
    if(layergeojsonAnterior==newFeat){
  
    }else if(layergeojsonAnterior == null){
      layergeojsonAnterior = newFeat
      notNewAnterior = notNew;
    }else{
      var geojson = layergeojsonAnterior.toGeoJSON();
      var geom = turf.getGeom(geojson);
      if (geom.type == 'Polygon' ||  geom.type == 'FeatureCollection') {
        var colorant;
        console.log(Object.entries(geojson.properties).length);
        if (Object.entries(geojson.properties).length === 0) {
          if(colorguardar){
            colorguardar = false;
            colorant = coloranterior;
          }else{
            colorant = '#3388ff';
          }
        }else{
          colorant = geojson.properties.color;
        }
        layergeojsonAnterior.setStyle({weight:3, color : colorant, fillColor: colorant, fillOpacity:0.2})
        layergeojsonAnterior.pm.disable();
      }else if (geom.type == 'Point'){
        layergeojsonAnterior.pm.disable();
        layergeojsonAnterior.setIcon(IconDefault);
      }
    }
    layergeojsonAnterior = newFeat;
    notNewAnterior = notNew;
    var geojson = newFeat.toGeoJSON();
    var geom = turf.getGeom(geojson);
    console.log(geom);
    if (geom.type == 'Polygon' ||  geom.type == 'FeatureCollection') {
      newFeat.setStyle({weight:6, color : colorSelect, fillColor: colorSelect, fillOpacity:0.2})
    }else if (geom.type == 'Point'){
      newFeat.setIcon(IconSelect);
    }  
    newFeat.pm.enable({
      allowSelfIntersection: true,
    });
    newFeat.on('pm:edit', (e) => {
      layergeojson = e.layer.toGeoJSON();
    });
  }
}
// Función que se llama al seleccionar una figura nueva
function EditNewMark() {

  idLayer = "nuevo_mark";
  claseLayer = "nuevo_mark";
  layerEdit = this;
  layergeojson = this.toGeoJSON();
  ResaltarFeat(this, false);
  countRocks=0;
  fileAflor = null;
  fileZoom = null;
  fileRock = [];
  urlRockCheck = [];

  $("#listSidebarLeft").empty();
  $("#listSidebarLeft").append(
    '<li class="title" id="titulo">Formulario Afloramiento</li>'+
    '<li class="sub-title">Nombre de la Estación<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="nombre" class="form-control"rows="1"></textarea><i>("Estación ##, Grupo # Semestre 202#-#")</i></li>'+
    '<li class="sub-title">Código de la Estación<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="codigo" class="form-control"rows="1"></textarea><i>("E##-G#-2#-#")</i></li>'+
    '<li class="sub-title">Ubicación del Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="descrigene" class="form-control"rows="2"></textarea><i>(Descripción lo mas detallada posible de la ubicación del afloramiento)</i></li>'+
    '<li class="sub-title">Foto del Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="form_foto"><input type="file" id="fotoAflor" onchange="handleFilesAflor(this.files, id)"><br><i>(Formato .jpg)</i></li>'+
    '<li class="sub-title">Descripción del Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="descriaflor" class="form-control"rows="2"></textarea><i>(Descripción detallada del afloramiento)</i></li>'+
    '<li class="sub-title">Estructuras del Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="descriestruct" class="form-control"rows="2"></textarea><i>(Descripción detallada de las estructuras presentes en el afloramiento)</i></li>'+
    '<li class="sub-title">Foto de Detalle Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="form_foto"><input type="file" id="fotoAflor" onchange="handleFilesZoom(this.files, id)"><br><i>(Formato .jpg)</i></li>'+
    '<li class="sub-title">Meteorización del Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="descrimeteor" class="form-control"rows="2"></textarea><i>(Descripción detallada de la meteorización presente en el afloramiento)</i></li>'+
    '<li class="sub-title">Descripción Litologías</li>'+
    '<a class="btn-descargar" id="btnGuardarMark" onclick="AñadirRok()" type="button"><i class="fas fa-plus"></i> Añadir Litología </a>'+
    '<div id="rocas"></div>'+
    '<li class="sub-title">Equipo de Trabajo<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="recolectors" class="form-control"rows="2"></textarea><i>(Ingrese los nombres de los integrantes de su grupo de trabajo)</i></li>'+
    '<li class="sub-title">Plancha<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="plancha" class="form-control"rows="1"></textarea><i>(Escriba el nombre de la plancha donde se encuentre la estación)</i></li>'+
    '<li class="sub-title">Fecha</li>'+
    '<li class="sb-text"> <input type="date" class="form-control" id="fecha"></li>'+

    '<a class="btn-descargar" id="markSave" onclick="GuardarMark()" type="button"><i class="fas fa-save"></i> Guardar </a>'
    );
    $("#fecha").val(dateFormat(new Date(),'Y-m-d'));

  if (!sidebarLeft) {
    Recarga();
  }
}
function AñadirRok() {
  $("#rocas").append(
    '<li class="sub-title">Descripción Litología '+ (countRocks+1) +'<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="des_rok_'+ countRocks +'" class="form-control"rows="2"> </textarea><i>(Descripción detallada de la roca)</i></li>'+
    '<li class="sub-title">Foto Litología '+ (countRocks+1) +'<sup style="color : red">*</sup></li>'+
    '<li class="foto_rok form_foto" ><input type="file" id="foto_rok_'+ countRocks +'" onchange="handleFilesRok(this.files, id)"><br><i>(Formato .jpg)</i></li>'
  );
  countRocks++;
}
function handleFilesAflor(files, id){
  fileAflor = files[0];
}
function handleFilesZoom(files, id){
  fileZoom = files[0];
}
function handleFilesRok(files, id){
  var auxRocks = parseInt(id.split('_')[2]);
  fileRock[auxRocks] = files[0];
  urlRockCheck[auxRocks] = false;
}

function EditNewMap() {

  idLayer = "nuevo_map";
  claseLayer = "nuevo_map";
  layerEdit = this;
  layergeojson = this.toGeoJSON();
  ResaltarFeat(this, false);
  console.log(layergeojson);
  if(layergeojson.type == 'FeatureCollection'){
    layergeojson = layergeojson.features[0];
    delete layergeojson.properties.id;
  }
  console.log(layergeojson);

  MostrarFormMap();
  if (!sidebarLeft) {
    Recarga();
  }
}
function MostrarFormMap() {
  $("#listSidebarLeft").empty();
  $("#listSidebarLeft").append(
    '<li class="title" id="titulo">Formulario Unidad Geológica</li>'+
    '<li class="sub-title">Nombre de la Unidad<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <input id="nombreUGS" type="text" class="form-control"> </input><i>("Nombre la Unidad")</i></li>'+
    '<li class="sub-title">Código de la Unidad<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <input id="codigoUGS" type="text" class="form-control"> </input><i>(Asignele un Código a la Unidad)</i></li>'+
    '<li class="sub-title">Tipo de Roca o Depósito<sup style="color : red">*</sup></li>'+
    '<li><div class="form-group">'+
        '<select class="form-control" id="tipoUGS" maxlength="10">'+
            '<option value="Roca Ígnea">Roca Ígnea</option>'+
            '<option value="Roca Sedimentaria">Roca Sedimentaria</option>'+
            '<option value="Roca Metamórfica">Roca Metamórfica</option>'+
            '<option value="Roca Volcanosedimentaria">Roca Volcanosedimentaria</option>'+
            '<option value="Aluviones Recientes">Aluviones Recientes</option>'+
            '<option value="Llanura Aluvial">Llanura Aluvial</option>'+
            '<option value="Abanicos o Conos">Abanicos o Conos</option>'+
            '<option value="Terrazas">Terrazas</option>'+
            '<option value="Flujos (lodo, tierra, escombros)">Flujos (lodo, tierra, escombros)</option>'+
            '<option value="Talus">Talus</option>'+
        '</select>'+
    '</div></li>'+
    '<li class="sub-title">Descripción de la Unidad<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="descriUGS" class="form-control "rows="3"> </textarea><i>(Descripción lo mas detallada posible de las razones o características por las cuales se identificó esta unidad)</i></li>'+
    '<li class="sub-title">Color de la Unidad<sup style="color : red">*</sup></li>'+
    '<li>'+
      '<div id="cp_UGS" class="input-group inp_plancha" data-color="rgb(255, 255, 255)">'+
        '<span class="input-group-text colorpicker-input-addon span_plancha"><i></i></span>'+
      '</div>'+
    '</li>'+
    '<li class="sub-title">Equipo de Trabajo<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="recolectors" class="form-control"rows="2"> </textarea><i>(Ingrese los nombres de los integrantes de su grupo de trabajo)</i></li>'+
    '<li class="sub-title">Plancha<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="plancha" class="form-control"rows="1"> </textarea><i>(Escriba el nombre de la plancha donde se encuentre la estación)</i></li>'+
    '<li class="sub-title">Fecha</li>'+
    '<li class="sb-text"> <input type="date" class="form-control" id="fecha"></li>'+

    '<a class="btn-descargar" id="markSave" onclick="GuardarMap()" type="button"><i class="fas fa-save"></i> Guardar </a>'
    );
    $("#fecha").val(dateFormat(new Date(),'Y-m-d'));

    $('#cp_UGS').colorpicker().on('colorpickerChange colorpickerCreate', function (e) {    
      layerEdit.setStyle({
        color: e.value,
        fillColor: e.value
      });
    });
    
}
// Función que se llama al seleccionar una figura ya existente
function EditExistMark(e) {

  layerEdit = e.layer; 
  layergeojson = e.layer.toGeoJSON();
  idLayer = layergeojson.properties.id;
  claseLayer = layergeojson.properties.clase;
  semestreLayer = layergeojson.properties.semestre;
  ResaltarFeat(e.layer, true);
  console.log(e.layer.toGeoJSON());


  $("#listSidebarLeft").empty();
  $("#listSidebarLeft").append(
    '<li class="title" id="titulo">Elija el Afloramiento</li>'+
    '<li class="sub-title">Ubicación del Afloramiento</li>'+
    '<li class="sb-text" id="descrigene"> Ubicación Afloramiento</li>'+
    '<li><img class="img-fluid" id="aflor1"></li>'+
    '<li class="sub-title">Descripción del Afloramiento</li>'+
    '<li class="sb-text" id="descriaflor"> Descripción Afloramiento</li>'+
    '<li class="sub-title">Estructuras del Afloramiento</li>'+
    '<li class="sb-text" id="descriestruct"> Estructuras Afloramiento</li>'+
    '<li class="last-img"><img class="img-fluid" id="aflor2"></li>'+
    '<li class="sub-title">Meteorización del Afloramiento</li>'+
    '<li class="sb-text" id="descrimeteor"> Meteorización Afloramiento</li>'+
    '<li class="sub-title">Descripción Litologías</li>'+
    '<div id="rocas"></div>'+
    '<li class="sub-title">Equipo de Trabajo</li>'+
    '<li class="sb-text" id="recolectors"> Recolectores</li>'+
    '<li class="sub-title">Fecha</li>'+
    '<li class="sb-text" id="fecha"> Fecha</li>'+

    '<a class="btn-descargar" id="markEdit" onclick="EditarMark()" type="button"><i class="fas fa-edit"></i> Editar </a>'
  );

  $('#titulo').html(''+ layergeojson.properties.nombre);
  $('#descrigene').html(''+layergeojson.properties.des_pos);
  $('#descriaflor').html(''+layergeojson.properties.des_aflor);
  $('#descriestruct').html(''+layergeojson.properties.des_struct);
  $('#descrimeteor').html(''+layergeojson.properties.des_meteor);
  $('#recolectors').html(''+layergeojson.properties.grupo);
  $('#fecha').html(''+layergeojson.properties.fecha);
  $("#aflor1").attr('src' , layergeojson.properties.aflor);
  $("#aflor2").attr('src' , layergeojson.properties.aflorzoom);
  $("#plancha").attr('src' , layergeojson.properties.plancha);
  $("#rocas").empty();
  for (let i = 0; i < layergeojson.properties.rocas; i++) {
    $("#rocas").append(
      '<li class="sb-img"><img id="macro_'+i+'" src="'+layergeojson.properties['roca_'+i]+'"></li>'+
      '<li class="sb-text" id="descri_roca_'+i+'"> '+layergeojson.properties['des_rok_'+i]+'</li>'  //'<li class="sb-text"> <textarea id="des_rok_'+ countRocks +'" class="form-control"rows="2"> </textarea><i>(Descripción detallada de la roca)</i></li>'+
      );
  }

  if (!sidebarLeft) {
    Recarga();
  }
}
function EditExistMap(e) {

  layerEdit = e.layer; 
  layergeojson = e.layer.toGeoJSON();
  idLayer = layergeojson.properties.id;
  claseLayer = layergeojson.properties.clase;
  semestreLayer = layergeojson.properties.semestre;
  ResaltarFeat(e.layer, true);
  console.log(e.layer.toGeoJSON());
  MostrarFormMap();
  $("#listSidebarLeft").append(
    '<a class="btn-descargar" id="delete" onclick="EliminarFeat()" type="button"><i class="fas fa-times"></i> Eliminar </a>'
  );
  $("#nombreUGS").val(layergeojson.properties.Nom_UGS);
  $("#codigoUGS").val(layergeojson.properties.Cod_UGS);
  $("#tipoUGS").val(layergeojson.properties.Tipo_UGS);
  $("#descriUGS").val(layergeojson.properties.Descri_UGS);
  $("#recolectors").val(layergeojson.properties.grupo);
  $("#fecha").val(layergeojson.properties.fecha);
  $("#plancha").val(layergeojson.properties.plancha);
  $("#cp_UGS i" ).css( 'background',layergeojson.properties.color);
  if (!sidebarLeft) {
    Recarga();
  }
}
// Función para modificar los textos: pone mayúscula en cada palabra
function ArreglarMayus(text) {
  text = text.toLowerCase();
  var output = '';
  var input = text;
  var words = input.split(/\s+/); //Convertira el valor en un array, donde el separador es 1 o mas espacios en blanco

  $.each(words, function(index, value) {
    var a = value.charAt(); //Sacamos la primera letra
    var b = value.slice(1); //Sacamos el resto de la palabra
    var word = a.toUpperCase() + b; //Pasamos la primera letra a mayúscula y concatenamos
    
    output += word;
    
    // Si no es el ultimo item, agregamos un espacio en blanco
    if(index != (words.length - 1)){
      output += ' ';
    }
  })
  return output;
}
// Función para validar que los campos estén diligenciados
function validar(id) {
  valor = $('#'+id).val().split(' ').join('');
  if (valor.length == 0) {
    return false;
  }else{
    return true;
  }
}


// Función para guardar una figura en la clase geomorfo
function GuardarMark(){
  if (layergeojson !== null && claseLayer == 'nuevo_mark') {
    var isCorrect = true;
    var idsMark = ["descrigene", "descriaflor", "descriestruct", "descrimeteor", "recolectors", "codigo", "nombre", "plancha"];
    for (let i = 0; i < idsMark.length; i++) {
      if(!validar(idsMark[i])){
        isCorrect = false;
      }
    }
    if (fileAflor == null || fileZoom == null) {
      isCorrect = false;
    }
    for (let j = 0; j < countRocks; j++) {
      var idAux = 'des_rok_'+j
      if (!validar(idAux)) {
        isCorrect = false;
      }
      if (fileRock[j] == null || fileRock[j] == undefined || fileRock[j] == '') {
        isCorrect = false;
      }
    }

    if (isCorrect) {
      map.spin(true, spinOpts);
      for (let i = 0; i < countRocks; i++) {
        layergeojson.properties['des_rok_'+i] = $("#des_rok_"+i).val()     
      }
      
      var cod = $("#codigo").val();
      var grupo = $("#codigo").val().split('-')[1];

      L.extend(layergeojson.properties, {
        des_pos: $("#descrigene").val(),
        des_aflor: $("#descriaflor").val(),
        des_struct: $("#descriestruct").val(),
        des_meteor: $("#descrimeteor").val(),
        grupo: $("#recolectors").val(),
        fecha: $("#fecha").val(),
        nombre: $("#nombre").val(),
        cod: cod,
        plancha: $("#plancha").val(),
        rocas: countRocks  
      });

      database.ref().child("semestres").get().then((snapshot) => {
        if (snapshot.exists()) {
          semestres = snapshot.val();
          var semestreCount = semestres['count'] - 1;
          storageRef.child('semestre_'+semestreCount+'/'+grupo+'/'+cod+'/aflor.jpg').put(fileAflor).then((snapshot) => {
            storageRef.child('semestre_'+semestreCount+'/'+grupo+'/'+cod+'/aflor.jpg').getDownloadURL().then(function(url) {
              layergeojson.properties['aflor'] = url;
              storageRef.child('semestre_'+semestreCount+'/'+grupo+'/'+cod+'/aflorzoom.jpg').put(fileZoom).then((snapshot) => {
                storageRef.child('semestre_'+semestreCount+'/'+grupo+'/'+cod+'/aflorzoom.jpg').getDownloadURL().then(function(url) {
                  layergeojson.properties['aflorzoom'] = url;
                  if (fileRock.length>0) {
                    for (let i = 0; i < fileRock.length; i++) {
                      storageRef.child('semestre_'+semestreCount+'/'+grupo+'/'+cod+'/roca_'+i+'.jpg').put(fileRock[i]).then((snapshot) => {
                        storageRef.child('semestre_'+semestreCount+'/'+grupo+'/'+cod+'/roca_'+i+'.jpg').getDownloadURL().then(function(url) {
                          layergeojson.properties['roca_'+i] = url;
                          console.log(url);
                          urlRockCheck[i] = true;
                          ImgSaved();
                        }).catch(function(error) {
                          console.log(error);
                        });
                      }); 
                    }
                  }else{
                    GuardarenBD();
                  }
                }).catch(function(error) {
                  console.log(error);
                });
              });
            }).catch(function(error) {
              console.log(error);
            });
          });
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }else{
      alert("Por Favor Llene Todos los Campos y Agregue Todas las Fotos");
    }
  }
  if (layergeojson == null) {
    alert("Seleccione el Marcador a Guardar");
  }
  if (claseLayer != 'nuevo_mark') {
    alert("Esto No es un Marcador");
  }
}
function GuardarMark1(){
  
    var isCorrect = true;
    var idsMark = ["descrigene", "descriaflor", "descriestruct", "descrimeteor", "recolectors", "plancha"];
    for (let i = 0; i < idsMark.length; i++) {
      if(!validar(idsMark[i])){
        isCorrect = false;
      }
    }

    if (isCorrect) {
      map.spin(true, spinOpts);

      savelayer = layergeojson;
      var semestre = layergeojson.properties.semestre;

      delete savelayer.properties.semestre;
      delete savelayer.properties.id;
      delete savelayer.properties.clase;
      delete savelayer.properties._feature;
      delete savelayer.layer;

      L.extend(layergeojson.properties, {
        des_pos: $("#descrigene").val(),
        des_aflor: $("#descriaflor").val(),
        des_struct: $("#descriestruct").val(),
        des_meteor: $("#descrimeteor").val(),
        grupo: $("#recolectors").val(),
        fecha: $("#fecha").val(),
        plancha: $("#plancha").val(),
        
      });

      layergeojson.properties.id = idLayer;  
      layergeojson.properties.semestre = semestre;  
      layergeojson.properties.clase = claseLayer;   
      
      var semestreCount = semestres['count'] - 1;
    
      
      database.ref("marcadores/"+semestre+"/mark_"+idLayer).set({
        id: idLayer,
        uid: uid,
        activo: true,
        layergeojson : savelayer
      });
      map.spin(false);
      
      alert("Guardado con Éxito");                                                
    


      
    }else{
      alert("Por Favor Llene Todos los Campos y Agregue Todas las Fotos");
    }
  

}

function EditarMark(){
  $("#listSidebarLeft").empty();
  $("#listSidebarLeft").append(

    '<li class="sub-title">Ubicación del Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="descrigene" class="form-control"rows="2"> </textarea><i>(Descripción lo mas detallada posible de la ubicación del afloramiento)</i></li>'+
    '<li class="sub-title">Foto del Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="form_foto"><img class="img-fluid" id="aflor1"></li>'+
    '<li class="sub-title">Descripción del Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="descriaflor" class="form-control"rows="2"> </textarea><i>(Descripción detallada del afloramiento)</i></li>'+
    '<li class="sub-title">Estructuras del Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="descriestruct" class="form-control"rows="2"> </textarea><i>(Descripción detallada de las estructuras presentes en el afloramiento)</i></li>'+
    '<li class="sub-title">Foto de Detalle Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="form_foto"><img class="img-fluid" id="aflor2"></li>'+
    '<li class="sub-title">Meteorización del Afloramiento<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="descrimeteor" class="form-control"rows="2"> </textarea><i>(Descripción detallada de la meteorización presente en el afloramiento)</i></li>'+
    '<li class="sub-title">Descripción Litologías</li>'+
    '<div id="rocas"></div>'+
    '<li class="sub-title">Equipo de Trabajo<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="recolectors" class="form-control"rows="2"> </textarea><i>(Ingrese los nombres de los integrantes de su grupo de trabajo)</i></li>'+
    '<li class="sub-title">Plancha<sup style="color : red">*</sup></li>'+
    '<li class="sb-text"> <textarea id="plancha" class="form-control"rows="1"> </textarea><i>(Escriba el nombre de la plancha donde se encuentre la estación)</i></li>'+
    '<li class="sub-title">Fecha</li>'+
    '<li class="sb-text"> <input type="date" class="form-control" id="fecha"></li>'+

    '<a class="btn-descargar" id="markSave" onclick="GuardarMark1()" type="button"><i class="fas fa-save"></i> Guardar </a>'+
    '<a class="btn-descargar" id="delete" onclick="EliminarFeat()" type="button"><i class="fas fa-times"></i> Eliminar </a>'
    );

    $('#titulo').html(''+ layergeojson.properties.nombre);
  $('#descrigene').html(''+layergeojson.properties.des_pos);
  $('#descriaflor').html(''+layergeojson.properties.des_aflor);
  $('#descriestruct').html(''+layergeojson.properties.des_struct);
  $('#descrimeteor').html(''+layergeojson.properties.des_meteor);
  $('#recolectors').html(''+layergeojson.properties.grupo);
  $('#fecha').html(''+layergeojson.properties.fecha);
  $("#aflor1").attr('src' , layergeojson.properties.aflor);
  $("#aflor2").attr('src' , layergeojson.properties.aflorzoom);
  $("#plancha").attr('src' , layergeojson.properties.plancha);
  $("#fecha").val(dateFormat(new Date(),'Y-m-d'));
  $("#rocas").empty();
  for (let i = 0; i < layergeojson.properties.rocas; i++) {
    $("#rocas").append(
      '<li class="sb-img"><img id="macro_'+i+'" src="'+layergeojson.properties['roca_'+i]+'"></li>'+
      '<li class="sb-text" id="descri_roca_'+i+'"> '+layergeojson.properties['des_rok_'+i]+'</li>'
    );
  }
    
}

function ImgSaved() {
  if (!urlRockCheck.includes(false)) {
    GuardarenBD();
  }
}

function GuardarenBD() {
  var semestreCount = semestres['count'] - 1;
  database.ref().child("marcadores/"+semestres['semestre_'+semestreCount]+"/count").get().then((snapshot) => {
    if (snapshot.exists()) {
      var aux = snapshot.val();
      var newCount = parseInt(aux["count"])+1;
      database.ref("marcadores/"+semestres['semestre_'+semestreCount]+"/count").set({
        count : newCount
      });
      database.ref("marcadores/"+semestres['semestre_'+semestreCount]+"/mark_"+aux["count"]).set({
        id: aux["count"],
        uid: uid,
        activo: true,
        layergeojson : layergeojson
      });
      map.spin(false);
      
      alert("Guardado con Éxito");                                                
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

function GuardarMap() {
  if (layergeojson !== null && claseLayer == 'nuevo_map') {
    var isCorrect = true;
    var idsMark = ["nombreUGS", "codigoUGS", "tipoUGS", "descriUGS", "recolectors", "plancha"];
    for (let i = 0; i < idsMark.length; i++) {
      if(!validar(idsMark[i])){
        isCorrect = false;
      }
    }

    if (isCorrect) {
      map.spin(true, spinOpts);
      

      var colorsito = $('#cp_UGS').colorpicker('getValue').replace("rgb(","");
      console.log(colorsito );
      colorsito = colorsito.replace(")","");
      console.log(colorsito );
      colorsito = colorsito.split(",");

      colorsito1 = "#" + ((1 << 24) + (parseInt(colorsito[0]) << 16) + (parseInt(colorsito[1]) << 8) + parseInt(colorsito[2])).toString(16).slice(1);


      L.extend(layergeojson.properties, {
        Nom_UGS: $("#nombreUGS").val(),
        Cod_UGS: $("#codigoUGS").val(),
        Tipo_UGS: $("#tipoUGS").val(),
        Descri_UGS: $("#descriUGS").val(),
        grupo: $("#recolectors").val(),
        fecha: $("#fecha").val(),
        plancha: $("#plancha").val(),
        color: colorsito1,
      });
      colorguardar = true;
      coloranterior = colorsito1;

      database.ref().child("semestres").get().then((snapshot) => {
        if (snapshot.exists()) {
          semestres = snapshot.val();
          var semestreCount = semestres['count'] - 1;
          database.ref().child("geomapas/"+semestres['semestre_'+semestreCount]+"/count").get().then((snapshot) => {
            if (snapshot.exists()) {
              var aux = snapshot.val();
              var newCount = parseInt(aux["count"])+1;
              database.ref("geomapas/"+semestres['semestre_'+semestreCount]+"/count").set({
                count : newCount
              });
              database.ref("geomapas/"+semestres['semestre_'+semestreCount]+"/feat_"+aux["count"]).set({
                id: aux["count"],
                uid: uid,
                activo: true,
                layergeojson : layergeojson
              });
              map.spin(false);
              alert("Guardado con Éxito");                                                
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }else{
      alert("Por Favor Llene Todos los Campos");
    }
  }
  if (layergeojson !== null && claseLayer == 'geomapas') {
    var isCorrect = true;
    var idsMark = ["nombreUGS", "codigoUGS", "tipoUGS", "descriUGS", "recolectors", "plancha"];
    for (let i = 0; i < idsMark.length; i++) {
      if(!validar(idsMark[i])){
        isCorrect = false;
      }
    }

    if (isCorrect) {
      map.spin(true, spinOpts);
      


      var colorsito = $('#cp_UGS').colorpicker('getValue').replace("rgb(","");
      console.log(colorsito );
      colorsito = colorsito.replace(")","");
      console.log(colorsito );
      colorsito = colorsito.split(",");

      colorsito1 = "#" + ((1 << 24) + (parseInt(colorsito[0]) << 16) + (parseInt(colorsito[1]) << 8) + parseInt(colorsito[2])).toString(16).slice(1);
      
      layergeojson.properties.Nom_UGS = $("#nombreUGS").val();
      layergeojson.properties.Cod_UGS = $("#codigoUGS").val();
      layergeojson.properties.Tipo_UGS = $("#tipoUGS").val();
      layergeojson.properties.Descri_UGS = $("#descriUGS").val();
      layergeojson.properties.grupo = $("#recolectors").val();
      layergeojson.properties.fecha = $("#fecha").val();
      layergeojson.properties.plancha = $("#plancha").val();
      layergeojson.properties.color = colorsito1;
      
      
      
      var savelayer = layergeojson;
      var semestre = layergeojson.properties.semestre;

      delete savelayer.properties.semestre;
      delete savelayer.properties.id;
      delete savelayer.properties.clase;
      delete savelayer.properties._feature;
      delete savelayer.layer;
    
      database.ref("geomapas/"+semestre+"/feat_"+idLayer).set({
        id: idLayer,
        uid: uid,
        activo: true,
        layergeojson : savelayer
      });
      map.spin(false);
      alert("Guardado con Éxito");  
      layergeojson.properties.id = idLayer;  
      layergeojson.properties.semestre = semestre;  
      layergeojson.properties.clase = claseLayer;                                    
    }else{
      alert("Por Favor Llene Todos los Campos");
    }
  }
  if (layergeojson == null) {
    alert("Seleccione el polígono a Guardar");
  }

}



// Función para eliminar una figura
function EliminarFeat() {
  if (true) {
    delete layergeojson.properties.clase;
    delete layergeojson.properties.id;
    delete layergeojson.properties.semestre;
    delete layergeojson.layer;
    delete layergeojson.properties._feature;
    var clasAux;
    if (claseLayer == 'marcadores') {
      clasAux = 'mark_';
    }else{
      clasAux = 'feat_';
    }

    database.ref(claseLayer+'/'+semestreLayer+'/'+clasAux+idLayer).set({
      id: idLayer,
      uid: uid,
      activo: false,
      layergeojson : layergeojson
    });
    map.removeLayer(layerEdit);
    alert('Borrado con Exito');
  } else{
    alert('Usted no posee los permisos necesarios para borrar esta Figura');
  }  

}


// ................................Funciones para Cargar y Cambiar el Mapa Base 
function setBasemap(basemap) {

  var basemap = basemaps.value;
  if (mapaBase) {
    map.removeLayer(mapaBase);
  }

  if (basemap != 'Street' && basemap != 'Google' && basemap != 'Hillshade' ) {
    mapaBase = L.esri.basemapLayer(basemap);
  }

  if (basemap == 'Street') {
    mapaBase = openStreet;
  }
  if (basemap == 'Google') {
    mapaBase = google;
    mapaBaseLabels = L.esri.basemapLayer('ImageryLabels');
    map.addLayer(mapaBaseLabels);
  }
  
  if (basemap == 'Hillshade') {
    mapaBase = L.esri.Vector.vectorBasemapLayer('ArcGIS:Hillshade:Light', {
      apiKey : 'AAPK858e9fb220874181a8cee37c6c7c05e0JFjKsdmGsd2C7oV31x1offnFB9ia6ew61D9N_tANtlZny5LFO1hIU6Xj2To6eiUp',
    });
    mapaBase.addTo(map);
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
// Funciones para cargar Barra Lateral Izquierda
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
      sidebarLeft = false;
      $('.btn-afloramiento').toggleClass('active');
      $('.sidebar-left').toggleClass('active');
      $('body').toggleClass('overy_not');
    }else{
      if ($('.btn-capas').hasClass('active')) {
        $('.btn-capas').toggleClass('active');
        $('.sidebar-right').toggleClass('active');
        $('body').toggleClass('overy_not');
      }
      sidebarLeft = true;
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
// Función para el funcionamiento de los acordiones de las barras
function Acordiones() {

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
  
  var coll = $(".coll_ins");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = $(".cont_ins");
      document.getElementById("cont_ins").style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';      
    });
  }
  
  var coll = $(".coll_plancha");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = $(".cont_plancha");
      document.getElementById("cont_plancha").style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';      
      var content = $(".cont_ins");
      document.getElementById("cont_ins").style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';
    });
  }
  
  var coll = $(".coll_muni");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = $(".cont_muni");
      document.getElementById("cont_muni").style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';      
    });
  }

  var coll = $(".coll_descarga");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = $(".cont_descargas");
      document.getElementById("cont_descargas").style.maxHeight = (content.height() + this.nextElementSibling.scrollHeight) +'px';      
    });
  }

}


// ................................Funciones para carga de archivos
// Función para la carga de archivos KML
function handleFileKML(f) {
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
          console.log(track.toGeoJSON());
          track.setStyle({opacity : 1});  
          track.addTo(map);  
          map.fitBounds(track.getBounds());
          featureFiles.push(track);
          GraficarBotonFiles(f);
          // Adjust map to show the kml
        });
    };
  })(f);
  reader.readAsDataURL(f); 
}
// Función para la carga de archivos SHP comprimidos en .zip
function handleFileSHP(f) {
  var reader = new FileReader();
  reader.onload = (function (theFile) {
    return function (e) {

      var shpfile = new L.Shapefile(e.target.result, {
        onEachFeature: function(feature, layer) {
          if (feature.properties) {
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
              return k + ": " + feature.properties[k];
            }).join("<br />"), {
              maxHeight: 200
            });
          }
        }
      });
      shpfile.setStyle({opacity : 1});  
      shpfile.addTo(map);  
      // map.fitBounds(shpfile.getBounds());
      featureFiles.push(shpfile);
      GraficarBotonFiles(f);
      shpfile.once("data:loaded", function() {
        console.log("finished loaded shapefile");
      });   

    };
  })(f);
  reader.readAsArrayBuffer(f);
}
// Función para la carga de archivos GeoJSON
function handleFileGeoJSON(f) {
  
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {

        var obj = JSON.parse(e.target.result);
        
        var geoJSON = new L.geoJson(obj, {
          onEachFeature: function(feature, layer) {
            if (feature.properties) {
              layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
              }).join("<br />"), {
                maxHeight: 200
              });
            }
          }
        });
        geoJSON.setStyle({opacity : 1});  
        geoJSON.addTo(map);  
        map.fitBounds(geoJSON.getBounds());
        featureFiles.push(geoJSON);
        GraficarBotonFiles(f);
      };
    })(f);
    reader.readAsText(f);
  
}
// Función para la carga de archivos Raster con extensión .tif
function handleFileRaster(f) {
  
  var reader = new FileReader();
  reader.readAsArrayBuffer(f);
  reader.onloadend = function() {
    var arrayBuffer = reader.result;
    parseGeoraster(arrayBuffer).then(georaster => {

      console.log("georaster:", georaster);
      var layer = new GeoRasterLayer({
          georaster: georaster,
          opacity: 0.7,
          resolution: 256
      });
      console.log("layer:", layer);
      layer.addTo(map);
      map.fitBounds(layer.getBounds());
      featureFiles.push(layer);
      GraficarBotonFilesRaster(f);
    });
  };
  
}
// Funciones que controlan el input donde se suben los archivos
$('#files').change(function(evt) {
  var files = evt.target.files; // FileList object

  for (var i = 0, f; f = files[i]; i++) {
    if (f.name.slice(-3) === 'zip') {
      handleFileSHP(f);
    }else if (f.name.slice(-3) === 'kml') {
      handleFileKML(f);
    }else if (f.name.slice(-4) === 'json') {
      handleFileGeoJSON(f);
    }else if (f.name.slice(-3) === 'tif') {
      handleFileRaster(f);
    }else{
      alert('Tipo de archivo incorrecto');
    }
  }
});
var featureFiles = [];
var featuresCount = 0;
$(".custom-file-input").on("change", function() {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
function GraficarBotonFiles(f) {
  $("#list").append(
    '<li class="content-list first">'+
      '<label class="switch">'+
          '<input type="checkbox" checked id="file_' + featuresCount + '" onChange="toggleDatosFiles(id)">'+
          '<span class="slider round"></span>'+
      '</label>'+
      '<a>  '+escape(f.name)+'</a>'+
      '<div id="cp_'+ featuresCount +'" class="input-group inp_plancha" data-color="rgb(255, 255, 255)">'+
        '<span class="input-group-text colorpicker-input-addon span_plancha"><i></i></span>'+
      '</div>'+
      '<div class="slidecontainer">'+
          '<input type="range" min="0" max="100" value="0" class="sliderb" id="transp_file_'+featuresCount+'">'+
          '<p>Transparencia: <span id="valTransp_file_'+featuresCount+'"></span>%</p>'+
      '</div>'+
    '</li>'
  );
  var slider = $("#transp_file_"+featuresCount)[0];
  var output = $("#valTransp_file_"+featuresCount)[0];
  output.innerHTML = slider.value;
  slider.oninput = function () {
    var id = parseInt($(this).attr('id').split('_')[2]);
    var output = $("#valTransp_file_"+id)[0];
    output.innerHTML = this.value;
    var transpa = (100 - parseInt(this.value)) / 100;
    if ($('#file_' + id).prop('checked')) {
      featureFiles[id].setStyle({opacity : transpa});
    }
  }
  $('#cp_'+featuresCount).colorpicker().on('colorpickerChange colorpickerCreate', function (e) {
    var id = parseInt($(this).attr('id').split('_')[1]);
    if ($('#file_' + id).prop('checked')) {
      featureFiles[id].setStyle({
        color: e.value,
        fillColor: e.value
      });
    }
  });
  document.getElementById("archi").style.maxHeight = $("#archi").height()+150+"px";
  $("#archi").height($("#archi").height()+150);
  featuresCount++;
}
function GraficarBotonFilesRaster(f) {
  $("#list").append(
    '<li class="content-list first">'+
      '<label class="switch">'+
          '<input type="checkbox" checked id="file_' + featuresCount + '" onChange="toggleDatosFiles(id)">'+
          '<span class="slider round"></span>'+
      '</label>'+
      '<a>  '+escape(f.name)+'</a>'+
    '</li>'
  );
  document.getElementById("archi").style.maxHeight = $("#archi").height()+100+"px";
  $("#archi").height($("#archi").height()+100);
  featuresCount++;
}
function toggleDatosFiles(id){
  var num = id.split("_")[1];
  console.log('entra');
  if ($('#'+id).prop('checked')){
    featureFiles[num].addTo(map);
  } else{
    map.removeLayer(featureFiles[num]);
  }
}


// ................................Funciones para el manejo y edición de la base de datos
// GuardarNuevoShape(filadelfia,'procesos',2345);
function GuardarNuevoShape(newGeoJSON, newClase, count) {
  var newCount = count;
  for (let i = 0; i < newGeoJSON['features'].length; i++) {
    delete newGeoJSON['features'][i].properties.FID;           
    // database.ref('features/'+newClase+'/feature_'+newCount).set({
    //   id: newCount,
    //   activo : true,
    //   uid: 'oK5YiHYUkEUq1U9YDcy8NCkNaHq1',
    //   layergeojson : newGeoJSON['features'][i],
    // });
      
    newCount++;
  }

   console.log(newGeoJSON);
  // database.ref('features/'+newClase+'/count').set({
  //   count : newCount
  // });
}

// GenerarPolygon();
function GenerarPolygon() {
  var newproces = L.layerGroup();
    for (let j = 0; j < base_clase["count"]["count"]; j++) {
      if (base_clase["feature_"+j]["activo"] && base_clase["feature_"+j]["layergeojson"]["geometry"]["type"] !== 'LineString') {
        var temp = base_clase["feature_"+j]["layergeojson"]; 
        L.geoJson(temp).addTo(newproces);
      }
    }
    console.log(newproces.toGeoJSON());
    console.log(base_clase);
}

// GenerarLinestring();
function GenerarLinestring() {
  var newproces = L.layerGroup();
  for (let j = 0; j < base_clase["count"]["count"]; j++) {
    if (base_clase["feature_"+j]["activo"] && base_clase["feature_"+j]["layergeojson"]["geometry"]["type"] !== 'Polygon') {      
      var temp = base_clase["feature_"+j]["layergeojson"];
      L.geoJson(temp).addTo(newproces);
    }
  }
  console.log(newproces.toGeoJSON());
  console.log(base_clase);
}








