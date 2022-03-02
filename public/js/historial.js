$(document).ready(function () {
    footerTop();
    // linea();
    $(".lineamenu").css('padding-right',0);
    $(".lineaindice h4").css('margin-left', '-60px');
    
    $('.gotop').on('click', function (e) {
        e.preventDefault();
        if ($(window).scrollTop()!=0) {
            $('html, body').stop().animate({scrollTop:0},1000);
        }
    })

    $(".lineamenu").hover(function () {
        $(".lineamenu a").css('margin-left', 10);
        $(".lineamenu").css('padding-right', 10);
        $(".lineaindice h4").css('margin-left', '-200px');
            
    }, function () {
        $(".lineamenu a").css('margin-left', '-200px');
        $(".lineamenu").css('padding-right','45px');
        $(".lineaindice h4").css('margin-left', 0);
    }
    );


    // function linea(){
    //     if($(window).scrollTop() >= $(".ruta1").offset().top-300 ){
    //         $(".gotop").css('margin-right', '0px');
    //     }
    //     if ($(window).scrollTop() <= $(".ruta1").offset().top-500) {
    //         $(".banner-principal").css('background-image', 'url("images/main/lab.jpg")');
    //         $(".gotop").css('margin-right', '-60px');
    //     }
    //     else if ($(window).scrollTop() >= $(".ruta1").offset().top-300 && $(window).scrollTop() <= $(".ruta2").offset().top-300) {
    //         $(".banner-principal").css('background-image', 'url("images/geomap/M-CG-1/aflor.jpg")');
    //     }
    //     else if ($(window).scrollTop() >= $(".ruta2").offset().top-300 && $(window).scrollTop() <= $(".ruta3").offset().top-300) {
    //         $(".banner-principal").css('background-image', 'url("images/geomap/M-CG-2/aflor.jpg")');
    //     }
    //     else if ($(window).scrollTop() >= $(".ruta3").offset().top-300 && $(window).scrollTop() <= $(".ruta4").offset().top-300) {
    //         $(".banner-principal").css('background-image', 'url("images/geomap/M-CG-3/aflor.jpg")');
    //     }
    //     else if ($(window).scrollTop() >= $(".ruta4").offset().top-300 && $(window).scrollTop() <= $(".ruta5").offset().top-300) {
    //         $(".banner-principal").css('background-image', 'url("images/geomap/M-CG-4/aflor.jpg")');
    //     }
    //     else if ($(window).scrollTop() >= $(".ruta5").offset().top-300 && $(window).scrollTop() <= $(".ruta6").offset().top-300) {
    //         $(".banner-principal").css('background-image', 'url("images/geomap/M-CG-5/aflor.jpg")');
    //     }
    //     else if ($(window).scrollTop() >= $(".ruta6").offset().top-300 && $(window).scrollTop() <= $(".ruta7").offset().top-300) {
    //         $(".banner-principal").css('background-image', 'url("images/geomap/M-CG-6/aflor.jpg")');
    //     }
    //     else if ($(window).scrollTop() >= $(".ruta7").offset().top-300 && $(window).scrollTop() <= $(".ruta8").offset().top-300) {
    //         $(".banner-principal").css('background-image', 'url("images/geomap/M-CG-7/aflor.jpg")');
    //     }
    //     else if ($(window).scrollTop() >= $(".ruta8").offset().top-300 && $(window).scrollTop() <= $(".ruta9").offset().top-300) {
    //         $(".banner-principal").css('background-image', 'url("images/geomap/M-CG-8/aflor.jpg")');
    //     }
    //     else if ($(window).scrollTop() >= $(".ruta9").offset().top-300 && $(window).scrollTop() <= $(".ruta9").offset().top+1000) {
    //         $(".banner-principal").css('background-image', 'url("images/geomap/M-CG-9/aflor.jpg")');
    //     }
    // }

    
    $(window).resize(function () { 
        setTimeout(() => {
            footerTop();
            //linea();
        }, 50);
    });
    $(window).scroll(function () { 
        setTimeout(() => {
            footerTop();
            //linea();
        }, 50);

        if($(window).scrollTop() >= $("#semestres").offset().top-300 && $(window).scrollTop() <= $("footer").offset().top-$(window).height()){
            $(".gotop").css('margin-right', '0px');
        }else{
            $(".gotop").css('margin-right', '-60px');
        }
        
        if ($(window).scrollTop()<$("header").height() || $(window).scrollTop()>$("footer").offset().top-630) {
            $(".lineamenu").css('padding-right',0);
            $(".lineaindice h4").css('margin-left', '-200px');
        }else{
            $(".lineamenu a").css('margin-left', '-200px');
            $(".lineamenu").css('padding-right','45px');
            $(".lineaindice h4").css('margin-left', 0);
        } 

    });
});


function footerTop() {
    var aux =$(".contenido-pagina").height()+$(".contenido-pagina").offset().top;
    $('footer').css('top',aux);
}

var planchas = [];

function CargarInfo() {  
    $("#semestres").append(
        '<h2>Semestres</h2>'
    );   
    for (var i = 0; i < semestres["count"]; i++) {
        $("#semestres").append(
            '<a class="but" onclick="cargarSemestre(id)" id="semestre_'+i+'">'+semestres["semestre_"+i]+'</a>'
        );
    }    
    for (let i = 0; i < semestres["count"]; i++) {
        plancha=[];
        for (let k = 1; k < 5; k++) {
            marks=[];
            for (let j = 0; j < marcadores[semestres["semestre_"+i]]["count"]; j++) {
              if (marcadores[semestres["semestre_"+i]]["mark_"+j].plancha == ("C"+k)) {
                marks.push(marcadores[semestres["semestre_"+i]]["mark_"+j]);
              }
            }
            plancha[k-1]=marks;
        }
        planchas[i]=plancha;
    }   
    setTimeout(() => {
        footerTop();
        //linea();
    }, 50);
}

var semestreId;

function cargarSemestre(semestre) {
    semestreId = semestre.split("_")[1];
    $("#planchas").empty();
    $("#planchas").append(
        '<h2>Planchas</h2>'
    ); 
    for (var i = 0; i < 4; i++) {
        var num =i+1;
        if(planchas[semestreId][i].length != 0){
            $("#planchas").append(
                '<a class="but" onclick="cargarPlancha(id)" id="plancha_'+i+'">C'+num+'</a>'
            );   
        }
    }
    setTimeout(() => {
        footerTop();
        //linea();
    }, 50);
}

var planchaId;
function cargarPlancha(plancha) {
    $("#listaAflor").empty();
    planchaId = plancha.split("_")[1];
    for (let i = 0; i < planchas[semestreId][planchaId].length; i++) {
        var mark = planchas[semestreId][planchaId][i];
        var class1;
        var class2;

        if(i%2){
            class1='descript col-12 col-md-6';
            class2='foto col-12 col-md-6';
        }else{
            class1='descript order-2 col-12 col-md-6';
            class2='foto order-1 col-12 col-md-6';
        }

        var rocas='';
        
        for (let j = 0; j < mark.rocas; j++) {
            rocas += '<div class="foto">';
            rocas += '<img id="macro_'+j+'" src="'+mark['roca_'+j]+'">';
            rocas += '<p class="sb-text" id="descri_roca_'+j+'"> '+mark['descri_roca_'+j]+'</p>';
            rocas += '</div>';
        }

        $("#listaAflor").append(
            '<div id="aflor'+i+'" class="timeline-item row aflor'+i+'">'+
                '<div class="año col-12">'+
                    '<h2>'+mark.nombre+'</h2>'+
                    '<p>'+mark.recolectors+'</p>'+
                    '<p>'+mark.fecha+'</p>'+
                    '<p class="descrigene">'+mark.descrigene+'</p>'+
                '</div>'+
                '<div class="'+class1+'">'+
                    rocas+
                '</div>'+
                '<div class="'+class2+'">'+
                    '<p>'+mark.descriaflor+'</p>'+
                    '<img class="img-banner" src="'+mark.aflor+'">'+
                    '<p>'+mark.descriestruct+'</p>'+
                    '<img class="img-banner" src="'+mark.aflorzoom+'">'+
                    '<p>'+mark.descrimeteor+'</p>'+
                '</div>'+
            '</div>'
        );

        $(".lineamenu").append(
            '<a href="#aflor'+i+'">'+mark.cod+'</a>'
        );
        
    }
    $('.lineamenu a').on('click', function (e) {
        e.preventDefault();
        var seccion = $($(this).attr('href')).offset().top; //Distancia entre el top y el elemento
        console.log(seccion);
        if ($(this).attr('href') == '#ruta0' ) {
            seccion= seccion- 250;
        }else if($(window).width()<559) {
            seccion= seccion - 200;
        }else if($(window).width()>=559) {
            seccion= seccion - 67;
        }
        $('html, body').stop().animate({scrollTop:seccion},1000);
    });
    $(".img-banner").hover(function() {
        console.log($( this ).attr("src"));
        $(".main-banner .banner-principal").css("background-image","url("+ $( this ).attr("src") + ")");
        
    });
    setTimeout(() => {
        footerTop();
        //linea();
    }, 50);
}