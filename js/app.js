//Variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []


//EventListeners
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit',agregarTweet)
    
    //Cuando el documento esta listo 
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [] // Esto significa que si el primer dato es null se asigna el segundo

        crearHTML();
    })
}

//Funciones

function agregarTweet(e){
    e.preventDefault()

    //TextArea donde el usuario escribe
    const tweet = formulario.children[1].value

    //Validar tweet
    if(!tweet.trim()){
        mostrarError('No se permiten Tweets vacios')

        return;//Evita que se ejecuten mas lineas de codigo
    }

    //
    const tweetObj = {
        id: Date.now(),
        tweet // es igual a tweet: tweet
    }

    //Añadir el tweet a el array de tweets
    tweets = [...tweets, tweetObj]
    
    crearHTML();

    //Reiniciar el formulario

    formulario.reset();
}

//Mostrando mensaje de error
function mostrarError(error){

    const mensajeError = document.createElement('P')
    mensajeError.textContent = error;

    mensajeError.classList.add('error')

    //Insertando el error
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)

    //Elimino la alerta despues de 2 segundos
    setTimeout(()=>{
        mensajeError.remove();
    },2000)
}

//Creo el HTML de los tweets hechos
function crearHTML(){

    limpiarHTML()

    //Extraigo el array que esta en el localStorage
    if(tweets.length > 0){
        tweets.forEach(x =>{
            //Agregar un boton de eliminar 
            const btnEiminar = document.createElement('a')
            btnEiminar.classList.add('borrar-tweet')
            btnEiminar.textContent = 'X';

            //Añadir la funcion de elimninar
            btnEiminar.onclick = ()=>{
                borrarTweet(x.id);
            }

            //Crear el HTML
            const li = document.createElement('li')

            //Añadir el texto
            li.textContent = `
                ${x.tweet} 
            `;

            //Asignar el boton
            li.appendChild(btnEiminar)

            //Insertarlo en el html
            listaTweets.appendChild(li)
        })
    }

    sincronizarStorage();
}

//Agrega los tweets actuales al storage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets))
}

function limpiarHTML(){

    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

//Elimina un tweeet
function borrarTweet(id){
    //Filtro el tweet por el id que quiero eliminar
    tweets = tweets.filter(x => id !== x.id)
    
    crearHTML();
}