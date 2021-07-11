//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///////////////////////////////////   GET SESSIONE   //////////////////////////////////////////
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var Sessione = 'null';

function fetchSession(){
    fetch('get_session').then(response => {
        /* console.log(response); */
        return response.text();
    }).then(text => {
        /* console.log(text); */
        Sessione = text;
        /* console.log(Sessione); */
    }).then(fetchRequestGrid);
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///////////////////////////////////CARICAMENTO PRODOTTI//////////////////////////////////////////
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function fetchRequestGrid() {

    url="home/load_products";
  
    fetch(url).then((response) => {
       /*  console.log(response); */
        return response.json();
    })
    .then(json =>{
        /* console.log(json); */
        createGrid(json);  
    }).then(fetchReviews);
}

/*creo i vari elementi della griglia*/
function createGrid(json) { 
    
    let section = document.getElementById("grid");
    
    for(let i=0; i < json.length; i++) {
        
        const box = document.createElement('div');
        box.id = json[i]['id'];
        box.classList.add("visible"); 
        
        const titolo = document.createElement('h1');
        titolo.textContent = json[i]['NomeProdotto'];
        
        const immagine = document.createElement('img');
        immagine.src = json[i]['PercorsoImg'];
        
        const pref = document.createElement('img');
        pref.id = "heart";
        pref.src = "./css/unchecked_.png";
        pref.classList.add("cuore");
        pref.addEventListener('click',insertPref);
        
        const descrizione = document.createElement('p');
        descrizione.textContent = json[i]['Descrizione'];
        
        const prezzo = document.createElement('p'); 
        prezzo.textContent = json[i]['Prezzo'];
        
        descrizione.style.visibility="hidden";
        prezzo.style.visibility="hidden"; 
        
        const dettagli = document.createElement('button');
        dettagli.id = "btnDetails";
        dettagli.textContent = 'Clicca per piu dettagli';
        dettagli.addEventListener('click',mostraDettagli);
        
        const textarea = document.createElement('textarea');
        textarea.placeholder = "Inserisci una recensione";
        textarea.addEventListener("keypress", fetchAddReview);
        
        section.appendChild(box);
        box.appendChild(titolo);
        box.appendChild(immagine);
        box.appendChild(descrizione);
        box.appendChild(prezzo);
        box.appendChild(dettagli);    
        
        /*Se l'utente è loggato può inserire gli articoli nei preferiti e scrivere le recensioni*/

        if(Sessione=="user"){
            box.appendChild(pref);
            box.appendChild(textarea);
        }
    }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///////////////////////////////////    RECENSIONI     //////////////////////////////////////////
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/*Recensioni
E' possibile visualizzare le recensioni relative ad un articolo e scrivere una nuova recensione solo
se si è loggati*/
function fetchReviews(event){
    const URL = "home/load_reviews";
    fetch(URL).then(onResponseJson).then(refreshReview).then(getCuori);
}
  
function fetchAddReview(event){
    const text = event.currentTarget.value;
    const id = event.target.parentNode.id;
    if(event.key === 'Enter'){
        event.currentTarget.value = "";
        /* text.replace(" ", "&"); */
        const URL = "home/add_review/"+text+"/"+id;
        /* console.log(URL); */
        fetch(URL).then(onResponseJson).then(fetchReviews);
    }
}
  
function onResponseJson(response){
    /* console.log(response); */
    /* if (response.status >= 200 && response.status < 300) { */
        return response.json();
   /*  } */
    /* console.error(response.statusText); */
}

function refreshReview(json){
    /* console.log(json); */
    const reviews = document.querySelectorAll(".recensioni");

    for(const r of reviews) {
        r.remove();        
    }

    if(json!==""){
        for(key in json){
            /* console.log(key);
            console.log(json[key].CodProdotto); */
            const div = document.getElementById(json[key].CodProdotto);
            /* console.log(div); */
            const p = document.createElement("p");
            p.textContent = json[key].TestoRecensione+" (da utente "+json[key].CodUtente+")";
            p.classList.add("recensioni");
            div.appendChild(p);
        }
    }else{
        console.error("Nessuna informazione dal database");  
    }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///////////////////////////////////     PREFERITI     //////////////////////////////////////////
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/*Inserisco nella sezione Preferiti*/
/*E' possibile inserire un articolo nei Preferiti solo se si è loggati*/
function insertPref(event){  

    const pref = event.currentTarget;
  
    /*Cambio l'immagine del cuore*/
    pref.src="./css/checked_.png"; 
    pref.removeEventListener('click', insertPref);
    pref.addEventListener('click', removePref);
    
    /*Rendo visibile la sezione Preferiti nel caso in cui quello che inserisco è il primo dei Preferiti*/
    if(document.querySelectorAll('#sectionPref div').length==0){  
      sezionePreferiti.classList.remove('hidden');
      sezionePreferiti.classList.add('visible');
    }
    
    /*Seleziono il nodo 'padre' e la sezione dove voglio inserire il nodo,
    Poi inserisco il nodo nella sezione Preferiti.*/ 
  
    var source = pref.parentNode; 
    let section = document.getElementById("sectionPref"); 
  
    insertIntoPref(section,source);
    
}
  
/*Rimuovo dalla sezione Preferiti*/
function removePref(event) { 
    
    const pref = event.currentTarget;
    
    /*Cambio l'immagine del cuore*/
    pref.src = "./css/unchecked_.png"; 
    pref.removeEventListener('click', removePref);
    pref.addEventListener('click',insertPref);
  
    /*Seleziono il nodo 'padre' e trovo l'id. 
    Seleziono tutti i div della sezione Preferiti,
    li scorro e se trovo un div con lo stesso id lo rimuovo.*/
  
    var source = pref.parentNode; 
    var idSource = source.id; 
    const boxes = document.querySelectorAll('#sectionPref div'); 
    for(const box of boxes){ 
        if (box.id==idSource){ 
            box.remove();
            break;
        }
    }
    
    /*Poichè ho reso cliccabile il cuore nella sezione Preferiti, se l'utente elimina
    il preferito cioè clicca sul cuore, devo aggiornare il corrispettivo elemento della sezione
    "Tutti gli elementi".*/
    
    const griglia = document.querySelectorAll('#grid div'); 
    for(const div of griglia) {  
        if(div.id == idSource) {
            div.childNodes[5].src = "./css/unchecked_.png";
            div.childNodes[5].removeEventListener('click',removePref); 
            div.childNodes[5].addEventListener('click',insertPref);
        }
    }
    
    /*Nascondo la sezione Preferiti*/
    if (document.querySelectorAll('#sectionPref div').length==0) {  
        let p = document.getElementById("sezionePreferiti");
        p.classList.remove('visible');
        p.classList.add('hidden');
    }
}

/*creo la copia del nodo da inserire nei Preferiti*/
function insertIntoPref(section,source) {
  
    const box = document.createElement('div');
    box.id = source.id;
   
    const titolo = document.createElement('h1');
    titolo.textContent = source.childNodes[0].textContent;
  
    const immagine = document.createElement('img');
    immagine.src = source.childNodes[1].src;
  
    const pref = document.createElement('img');
    pref.id = "heart";
    pref.src =  source.childNodes[5].src;
    pref.classList.add("cuore");
    pref.addEventListener('click',removePref);
    pref.addEventListener('click', fetchRemove);
  
    const descrizione = document.createElement('p');
    descrizione.style.visibility="hidden";
    descrizione.id="descrizionePref";
    descrizione.textContent = source.childNodes[2].textContent;
  
    const prezzo = document.createElement('p'); 
    prezzo.style.visibility="hidden";
    prezzo.id="descrizionePref";
    prezzo.textContent = source.childNodes[3].textContent;
  
    const dettagli = document.createElement('button');
    dettagli.textContent = 'Clicca per piu dettagli';
    dettagli.addEventListener('click',mostraDettagli);
  
    box.appendChild(titolo);
    box.appendChild(immagine);
    box.appendChild(descrizione);
    box.appendChild(prezzo);
    box.appendChild(dettagli);
    box.appendChild(pref);
    section.appendChild(box);
}

function getCuori() {
    const bottone = document.querySelectorAll(".cuore");
    for(const b of bottone) {
        /* console.log(b); */
        b.addEventListener("click", fetchInsert);
    }
    /* console.log(bottone); */
}

function onResponseText(response){
/*     console.log(response);
    if (response.status >= 200 && response.status < 300) { */
        return response.text();
/*     }
    console.error(response.statusText); */
}

function fetchInsert(event){
    const img = event.currentTarget;
    /* console.log(img); */
    const div = img.parentNode;
    div.childNodes[5].removeEventListener("click", fetchInsert);
    div.childNodes[5].addEventListener("click", fetchRemove);
    /* console.log(div.childNodes[5]); */

   /*  console.log(div); */
    const codProdotto = div.id;
    /* console.log(codProdotto); */

    fetch("home/add_favourites/"+codProdotto).then(onResponseText).then(text=>{
        console.log(text);
    });
}

function fetchRemove(event){
    
    const img = event.currentTarget;
    
    img.removeEventListener("click", fetchRemove);
    img.addEventListener("click", fetchInsert);
    const div = img.parentNode;
    const codProdotto = div.id;
    
    fetch("home/remove_favourites/"+codProdotto).then(onResponseText).then(text=>{
        console.log(text);
  });
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///////////////////////////////////FUNZIONE DI RICERCA//////////////////////////////////////////
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/*Per effettuare la ricerca, porto il contenuto della casella di testo in minuscolo
per non avere errori di case sensitive. 
Poi seleziono tutti i div della griglia, li scorro, individuo il titolo e lo porto
in minuscolo per non avere errori di case sensitive.*/ 
function cerca(){
    var x = document.getElementById("ricerca");
    var input = x.value.toLowerCase();
    
    if (input!=""){
        const boxes = document.querySelectorAll('#grid div');  
      
        for(const box of boxes){ 
            let titolo = box.childNodes[0].textContent; 
            titolo = titolo.toLowerCase(); 

            if (!titolo.startsWith(input)) {
                box.classList.remove('visible');
                box.classList.add('hidden');  /*nascondo il div*/ 
            } else{
                box.classList.remove('hidden'); /*lo rendo visibile*/
                box.classList.add('visible');
            }
        }
    }else {
        const boxes = document.querySelectorAll('#grid div');
        for(const box of boxes){ 
            box.classList.remove('hidden');
            box.classList.add('visible');
        } 
    }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
///////////////////////////////////     DETTAGLI      //////////////////////////////////////////
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/*Ho usato visibility anzichè display in modo da allocare lo spazio ma 
non renderlo visibile*/
function mostraDettagli(event){

    let button = event.currentTarget;
    let parent = button.parentNode;

    button.textContent = "Nascondi dettagli";
    parent.childNodes[2].style.visibility= "visible";
    parent.childNodes[3].style.visibility= "visible"; 
    button.removeEventListener('click',mostraDettagli);
    button.addEventListener('click',nascondiDettagli);

}

function nascondiDettagli(event){

    let button=event.currentTarget; 
    let parent = button.parentNode;

    button.textContent="Clicca per piu dettagli";
    parent.childNodes[2].style.visibility= "hidden";
    parent.childNodes[3].style.visibility= "hidden"; 
    button.removeEventListener('click',nascondiDettagli);
    button.addEventListener('click',mostraDettagli);
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/////////////////////////////////// ATTIVATE AL CARICAMENTO//////////////////////////////////////////
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

fetchSession();
/* fetchRequestGrid();
setTimeout(fetchReviews,1000);
setTimeout(getCuori, 1500); */