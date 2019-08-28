//Listado de Tweets
const listaTweets = document.getElementById('lista-tweet');



eventListener();

//eventos
function eventListener() {
    //Evento Click Btn Guardar
    document.getElementById('formulario').addEventListener('submit', agregarTweet);
    document.querySelector('#lista-tweet').addEventListener('click',eliminaTweet);
    document.addEventListener('DOMContentLoaded',cargaTweets);
}

function cargaTweets(){
    if (localStorage.getItem('tweet') === null) {
        tweets = [];
    } else {

        let info = getLocalStorage();
        console.log(Object.keys(info));
        info.forEach(element => {
            listaTweets.innerHTML += `
            <div class="row  mt-2">
                <div class="col-10">
                    <strong>${element}</strong>
                </div>
                <div class="col-2">
                    <button class=" btn btn-danger btn-sm borrar-tweet text-right"><i class="fas fa-times"></i></button>
                </div>
            </div>`;
        });
        }
}

function agregarTweet(e) {

    e.preventDefault();
    let tweet = document.getElementById('tweet').value;
    console.log('click submit'+tweet);
    
    listaTweets.innerHTML += `
        <div class="row  mt-2">
            <div class="col-10">
                <strong>${tweet}</strong>
            </div>
            <div class="col-2">
                <button class=" btn btn-danger btn-sm borrar-tweet text-right"><i class="fas fa-times"></i></button>
            </div>
        </div>`;

    //LocalStorage
    let dato = pushTweets(tweet);
    addLocalStorage(dato);
    
}

function eliminaTweet(e){
    let tweetBorrar;
    let listatweets = getLocalStorage();
    if ((e.target.classList.contains('borrar-tweet')) || (e.target.classList.contains('fa-times')) ) {
        //console.log(e.target.className);
        if (e.target.classList.contains('borrar-tweet')) {
            console.log(e.target.parentElement.parentElement.innerText);
            tweetBorrar = e.target.parentElement.parentElement.innerText;
            e.target.parentElement.parentElement.remove();
        }
        if (e.target.classList.contains('fa-times')) {
            console.log(e.target.parentElement.parentElement.parentElement.innerText);
            tweetBorrar = e.target.parentElement.parentElement.parentElement.innerText;
            e.target.parentElement.parentElement.parentElement.remove();
        }
        listatweets.forEach(function (element, index) {
            if (tweetBorrar === element) {
                listatweets.splice(index, 1);
                console.log(index);
            }
        });
        addLocalStorage(listatweets);
    }
   
}

function pushTweets(nuevotweet){
    let tweets = getLocalStorage();
    tweets.push(nuevotweet);
    return tweets;
}

function addLocalStorage(tweet){
localStorage.setItem('tweet',JSON.stringify(tweet));
}

function getLocalStorage(){
    let tweets;
    if (localStorage.getItem('tweet') === null) {
         tweets = [];
    }else{
        let info = localStorage.getItem('tweet');
        tweets = JSON.parse(info);
    }
    
    return tweets;
}
