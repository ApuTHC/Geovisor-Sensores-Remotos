

const tematicas = document.getElementById('tematicas');
const tema = document.querySelectorAll('li.tema>a');
const listaTemas = Array.apply(null, tema);


listaTemas.forEach( (tema) => {
    tema.addEventListener('click', () => {
        temaSeleccionado = tematicas.getElementsByClassName('seleccionado');
        if(temaSeleccionado.length > 0){
            temaSeleccionado[0].className = temaSeleccionado[0].className.replace("seleccionado", ""); 
        }
        tema.className += " seleccionado";
    })
})



$(window).on('load', function(){
    $(".tabla-princ").fadeIn(1000);
});


