//VARIABLES
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear(); //nos trae el año actual
const min = max - 10; //no se venden autos de mas de 10 años de antiguedad

//generar objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//EVENTOS
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos); //muestra los autos al cargar

    //llena las opciones de años
    llenarSelect();
})

//event listener para los select de búsqueda
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', e =>{
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = parseInt(e.target.value);
    filtrarAuto();
});

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = parseInt(e.target.value);
    filtrarAuto();
});

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
});

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto();
});


//FUNCIONES

//función: muestra autos 
function mostrarAutos(autos){

    limpiarHTML(); //elimina el HTML previo

    autos.forEach( auto => {
        //destructuring
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} ${modelo} - Año ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        //insertar en el HTML
        resultado.appendChild(autoHTML);
    })
}

//función: limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//función: genera los años del select
function llenarSelect(){
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option'); //los SELECT tienen etiqueta 'option'
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega las opciones al SELECT
    }
}

//función: filtra en base a la busqueda
function filtrarAuto(){
    //función de alto nivel es una función que toma otra función (higher order function)
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    //revisa si hay almenos 1 dato en nuestro arreglo
    if(resultado.length){
        console.log(resultado);
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

//función: solo compara la marca
function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if( marca ){
        return auto.marca === marca;
    }
    return auto;
}

//función: filtra por año
function filtrarYear(auto){
    const {year} = datosBusqueda;
    if( year ){
        return auto.year === parseInt(year);
    }
    return auto;
}

//función: filtra por el minimo
function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if( minimo ){
        return auto.precio >= minimo;
    }
    return auto;
}

//función: filtrar por el maximo
function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if( maximo ){
        return auto.precio <= maximo;
    }
    return auto;
}

//función: filtrar por puertas
function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if( puertas ){
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}

//función: filtrar por transmisión
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if( transmision ){
        return auto.transmision === transmision;
    }
    return auto;
}

//función: filtrar por color
function filtrarColor(auto){
    const {color} = datosBusqueda;
    if( color ){
        return auto.color === color;
    }
    return auto;
}

//función: muestra mensaje de que no se encontraron resultados
function noResultado(){

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
}