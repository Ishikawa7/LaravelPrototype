
var Json;
var Sessione;

init();


function init(){
  
  /*nascondo la sezione Preferiti all'inizio */
  if (document.querySelectorAll('#sectionPref div').length==0) {  
    let p = document.getElementById("sezionePreferiti");
    p.classList.add('hidden');
  }

  //Bottone informazioni Covid
  const btnInfocovid = document.getElementById("btnInfo");
  btnInfocovid.addEventListener('click',inforCorona);

  //Bottone informazioni Meteo
  const btnInfoMeteo = document.getElementById("btnInfoMeteo");
  btnInfoMeteo.addEventListener('click',inforMeteo('Catania'));

  fetchRequestSession()
  fetchRequestGrid();
}


/*Effettuo una chiamata asincrona per creare la griglia di elementi della sezione 'tutti gli elementi'*/
function fetchRequestGrid() {

  url="https://localhost/ConsegnaHM1/fetchRequest.php";
  var formData = new FormData();
  formData.append('fetchRequest', 'Grid');

  fetch(url,{method:'POST', body: formData })
  .then((res) =>res.json())
  .then(response =>{
    console.log(response);
    createGrid(response);  
  })
}


function fetchRequestSession(){

  url="https://localhost/ConsegnaHM1/fetchRequest.php";
  var formData = new FormData();
  formData.append('fetchRequest', 'Session');

  fetch(url,{method:'POST', body: formData })
  .then(function (response) {
    return response.text();
  })
  .then(body => {
    onBool(body)
  });

}

function onBool(response){
    setSession(response);   
}

function setSession(response){
    Sessione=response;
}


/*creo i vari elementi della griglia*/
function createGrid(json) { 

  let section = document.getElementById("grid");
  
  for(let i=0; i < json.length; i++) {
        
    const box = document.createElement('div');
    box.id = json[i]['CodProdotto'];
    box.classList.add("visible"); 

    const titolo = document.createElement('h1');
    titolo.textContent = json[i]['NomeProdotto'];

    const immagine = document.createElement('img');
    immagine.src = json[i]['PercorsoImg'];
 
    const pref = document.createElement('img');
    pref.id = "heart";
    pref.src = "./Immagini/unchecked_.png";
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
    if(Sessione=="True"){
      box.appendChild(pref);
      box.appendChild(textarea);
    }
  }

  fetchReviews();
}


/*Recensioni
E' possibile visualizzare le recensioni relative ad un articolo e scrivere una nuova recensione solo
se si è loggati*/
function fetchReviews(event){
  const URL = "products_reviews.php";
  fetch(URL).then(onResponseJson).then(refreshReview);
}

function fetchAddReview(event){
  const text = event.currentTarget.value;
  const id = event.target.parentNode.id;
  if(event.key === 'Enter'){
      event.currentTarget.value = "";
      text.replace(" ", "&");
      const URL = "products_addReview.php?text="+text+"&id="+id;
      console.log(URL);
      fetch(URL).then(onResponseJson).then(fetchReviews);
  }
}

function onResponseJson(response){
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
      return response.json();
  }
  console.error(response.statusText)
}

function refreshReview(json){
  console.log(json);
  const reviews = document.querySelectorAll(".recensioni");

  for(const r of reviews) {
      r.remove();        
  }

  if(json!==""){
      for(key in json){
          const div = document.getElementById(json[key].CodProdotto);
          
          const p = document.createElement("p");
          p.textContent = json[key].TestoRecensione+" (da utente "+json[key].CodUtente+")";
          p.classList.add("recensioni");
          div.appendChild(p);
      }
  }else{
      console.error("Nessuna informazione dal database");  
  }
}



/*Inserisco nella sezione Preferiti*/
/*E' possibile inserire un articolo nei Preferiti solo se si è loggati*/
function insertPref(event){  

  const pref = event.currentTarget;

  /*Cambio l'immagine del cuore*/
  pref.src="./Immagini/checked_.png"; 
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
  pref.src = "./Immagini/unchecked_.png"; 
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
      div.childNodes[5].src = "./Immagini/unchecked_.png";
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




/*Covid-19
L'API che ho utilizzato mi permette di interfacciarmi con un servizio chiamato "Covid-19"
per il quale non è prevista nessuna autenticazione.
La richiesta è HTTP GET e la risposta è in formato json. 
Il json contiene le informazione relative al Covid di 190 Stati e anche le informazioni globali.
Creo una lista vuota e la riempio con i nomi dei vari Stati presenti nel json.
Questa lista servirà poi per permettere all'utente di scegliere tramite interfaccia,
lo Stato di cui desidera avere le informazioni.
Io permetto di far scegliere lo Stato tramite una "select". Tramite l'evento della select "onchange",
ho la possibilità di capire quale Paese è stato scelto dall'utente, cerco le informazioni relative a quel
Paese all'interno del json e mostro i dati a schermo.
Oltre a mostrare i dati relativi allo Stato selezionato dall'utente, mostro sempre anche le informazioni 
a livello gloabale sul Covid-19. 
Per rendere più comprensibili i dati del json, sia quelli globali che quelli relativi ai vari Stati,
li ho tradotti in Italiano e formattati in modo corretto.
*/

function inforCorona(){
  const corona_api_endpoint = "covid.php"
  fetch(corona_api_endpoint).then(onResponse).then(onJson);
}

function onResponse(response) {
  return response.json();
}

function onJson(json) {
  Json = json;
  console.log(json);

  const section = document.getElementById("sectionInfoCorona");
  section.classList.remove('hidden');
  section.classList.add('visible');

  //Creo lista Stati
  let list=[];
  for( index in json.Countries){
    list.push(json.Countries[index].Country);
  }
  
  const sect = document.getElementById("selectCountry");
  for(country of list){
    const elemento = document.createElement('option');
    elemento.id="option";
    elemento.value=country;
    elemento.textContent = country;
    sect.appendChild(elemento);
  }

  //Global
  const global= json.Global;
  
  const infoGlobal = document.getElementById("infoGlobal");
  
  const divInfo = document.createElement('div');
  divInfo.id="divInfo";
  
  const elemento = document.createElement('h1');
  elemento.textContent = "Informazioni globali" ;
  divInfo.appendChild(elemento);
  
  for(info in global){
    const elemento = document.createElement('h2');

    if(info=="Date"){
      elemento.textContent = 'Data: ' +  Json.Countries[index][info].split("T")[0];
    } 
    if(info == 'NewConfirmed') {
      elemento.textContent = 'Nuovi casi confermati: ' + Json.Global[info];
    }
    if(info == 'NewDeaths') {
      elemento.textContent = 'Nuovi deceduti: ' + Json.Global[info];
    }
    if(info == 'NewRecovered') {
      elemento.textContent = 'Nuovi ricoveri: ' + Json.Global[info];
    }
    if(info == 'TotalConfirmed') {
      elemento.textContent = 'Totale casi confermati: ' + Json.Global[info];
    }
    if(info == 'TotalDeaths') {
      elemento.textContent = 'Totale deceduti: ' + Json.Global[info];
    }
    if(info == 'TotalRecovered') {
      elemento.textContent = 'Totale ricoveri: ' +  Json.Global[info]; 
    }
    divInfo.appendChild(elemento);
  }
  infoGlobal.appendChild(divInfo); 
  
  const btnInfocovid = document.getElementById("btnInfo");
  btnInfocovid.removeEventListener('click',inforCorona);
  btnInfocovid.addEventListener('click',closeInfo);

}

function closeInfo(){
  
  const element = document.getElementById('divInfoCountry');
  if(element!=null){
    element.remove();
  }
  const divInfo = document.getElementById('divInfo');
  divInfo.remove();

  const sectionCorona = document.getElementById("sectionInfoCorona");
  sectionCorona.classList.remove('visible');
  sectionCorona.classList.add('hidden');
  
  const btnInfocovid = document.getElementById("btnInfo");
  btnInfocovid.removeEventListener('click',closeInfo);
  btnInfocovid.addEventListener('click',inforCorona);
}

function infoCountry(){ 
  
  const element = document.getElementById('divInfoCountry');
  if(element!=null){
    element.remove();
  }

  var tipo = document.getElementById("selectCountry");
  const country = tipo.value;
  
  for( index in Json.Countries)
  {
    if(Json.Countries[index].Country == country){
      
      const div = document.getElementById("infoCountry");
  
      const divInfo = document.createElement('div');
      divInfo.id="divInfoCountry";

      const elemento = document.createElement('h1');
      elemento.textContent = "Informazioni "+ country;
      divInfo.appendChild(elemento);
      
      for(info in Json.Countries[index]){
        if (info == "ID" || info == "Premium"){
          continue;
        }
        const elemento = document.createElement('h2');
        
        if(info=="Date"){
          elemento.textContent = 'Data: ' +  Json.Countries[index][info].split("T")[0] ;
        } 
        if(info == 'Country') {
          elemento.textContent = 'Stato: ' + Json.Countries[index][info];
        }
        if(info == 'CountryCode') {
          elemento.textContent = 'Prefisso internazionale: ' + Json.Countries[index][info];
        }
        if(info == 'NewConfirmed') {
        elemento.textContent = 'Nuovi casi confermati: ' + Json.Countries[index][info];
        }
        if(info == 'NewRecovered') {
          elemento.textContent = 'Nuovi ricoveri: ' + Json.Countries[index][info];
          }
        if(info == 'NewDeaths') {
          elemento.textContent = 'Nuovi deceduti: ' + Json.Countries[index][info];
          }
        if(info == 'TotalConfirmed') {
          elemento.textContent = 'Totale casi confermati: ' + Json.Countries[index][info];
          }
        if(info == 'TotalDeaths') {
          elemento.textContent = 'Totale deceduti: ' + Json.Countries[index][info];
          }
        if(info == 'TotalRecovered') {
          elemento.textContent = 'Totale ricoveri: ' +  Json.Countries[index][info]; 
          } 
        divInfo.appendChild(elemento);
      }
      div.appendChild(divInfo);
    }
  }
}


/*Meteo
L'API che ho utilizzato mi permette di interfacciarmi con un servizio chiamato "OpenWeather", 
il quale fornisce informazioni relative al meteo e per il quale è prevista un'autenticazione con API key
che ho ottenuto registrandomi al servizio.
La richiesta è HTTP GET e la risposta è in formato json.
Nella richiesta HTTP oltre ad inserire la chiave di autenticazione, ho inserito anche la città di cui
desidero avere le informazioni meteo. In questo caso ho scelto come città Catania.
Nel json, quindi, arriveranno solo le informazioni relative al meteo di Catania 
che poi mostro all'interno dell'interfaccia.
Per rendere più comprensibili i dati del json, li ho tradotti in Italiano e formattati in modo corretto.
*/

function meteoCitta(citta){
    inforMeteo(citta)
}

function inforMeteo(citta) {
  const URL = "meteo.php?city_name="+citta;
  fetch(URL).then(onResponseMeteo).then(onJsonMeteo);
}

function onResponseMeteo(response) {
 return response.json();
}

function onJsonMeteo(json) {
  console.log(json);

  const sectionMeteo = document.getElementById("sectionMeteo");
  sectionMeteo.classList.remove('hidden');
  sectionMeteo.classList.add('visible');

  const main = json.main;
  
  const infoMain = document.getElementById("infoMain");
  
  const el = document.getElementById('divInfoM');

  if(el != null) {
    el.remove();
  }

  const divInfoM = document.createElement('div');
  divInfoM.id="divInfoM";


  
  const elementoM = document.createElement('h1');
  elementoM.textContent = "Meteo "+json['name'];
  divInfoM.appendChild(elementoM);
  
  for(info in main) {
    const elementoM = document.createElement('h2');

    if(info == 'humidity') {
      elementoM.textContent = 'Umidità' + ': ' + json.main[info];
    }
    if(info == 'pressure') {
      elementoM.textContent = 'Pressione' + ': ' + json.main[info];
    }
    if(info == 'temp') {
      elementoM.textContent = 'Temperatura (K)' + ': ' + json.main[info];
    }
    if(info == 'temp_max') {
      elementoM.textContent = 'Temperatura Massima (K)' + ': ' + json.main[info];
    }
    if(info == 'temp_min') {
      elementoM.textContent = 'Temperatura Minima (K)' + ': ' + json.main[info];
    }
    divInfoM.appendChild(elementoM); 
  }
   infoMain.appendChild(divInfoM);
  
  const btnInfoMeteo = document.getElementById("btnInfoMeteo");
  btnInfoMeteo.removeEventListener('click',inforMeteo);
  //btnInfoMeteo.addEventListener('click',closeInfoMeteo);
}
/*
function closeInfoMeteo() {
    const elementoM = document.getElementById('divInfoM');

    if(elementoM != null) {
      elementoM.remove();
    }
  
    const sectionMeteo = document.getElementById("sectionMeteo");
    sectionMeteo.classList.remove('visible');
    sectionMeteo.classList.add('hidden');
    
    const btnInfoMeteo = document.getElementById("btnInfoMeteo");
    btnInfoMeteo.removeEventListener('click',closeInfoMeteo);
    btnInfoMeteo.addEventListener('click',inforMeteo('Catania'));
}
*/


// Registrazione

/*In fase di registrazione controllo se l'email ha la giusta struttura, effettuo una chiamata asincrona verso il database
per controllare se quell'email è già esistente*/
function checkEmail(email)
{  
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isEmail= re.test(String(email).toLowerCase());
    if(!isEmail)
    {
      document.getElementById("logemail").style.color='red';  
      document.getElementById('logemail').innerHTML="&nbsp&nbsp&nbsp&nbsp Email non corretta";  
      
    }else{
    
      url="https://localhost/ConsegnaHM1/fetchRequest.php";
      var formData = new FormData();
      formData.append('fetchRequest', 'checkEmail');
      formData.append('email',email);
      var admin=document.getElementById("mycheck").checked;
      formData.append('admin',String(admin));

      fetch(url,{method:'POST', body: formData })
      .then((res) =>res.json())
      .then(response =>{
        console.log(response);  
        if (response.exists==false){
          document.getElementById("logemail").style.color='green'; 
          document.getElementById('logemail').innerHTML="&nbsp&nbsp&nbsp&nbsp Email corretta e mai usata";
        }else{
          document.getElementById("logemail").style.color='red';  
          document.getElementById('logemail').innerHTML="&nbsp&nbsp&nbsp&nbsp Email gia usata";  
        }
        
      })
      
    }
}

/*Eseguo dei controlli sulla struttura della password*/
function checkPsw(value){
  const checkminuscolo = /[a-z]/;
  const checkmaiuscolo= /[A-Z]/; 
  const checknumero= /[0-9]/;

  const minuscolo = checkminuscolo.test(String(value));
  const maiuscolo = checkmaiuscolo.test(String(value));
  const numero = checknumero.test(String(value));
      
  if (minuscolo && maiuscolo && numero && value.length >= 5) {
    document.getElementById("p1").style.color='green';  
    document.getElementById('p1').innerHTML="&nbsp&nbsp&nbsp&nbsp Password conforme alle specifiche"
  }
  else
  {
    document.getElementById("p1").style.color='red';  
    document.getElementById('p1').innerHTML="&nbsp&nbsp&nbsp&nbsp Password non conforme alle specifiche"
  }
}

/*Controllo se le due password inserite sono uguali*/
function checkPsw1(value){

  var pass1 = document.getElementById('pass1').value;
  if(value!=pass1){
    document.getElementById("p2").style.color='red';
    document.getElementById("p2").innerHTML ="&nbsp&nbsp&nbsp&nbsp Le due password devono coincidere  ";
  }else{
      document.getElementById("p2").style.color='green';
      document.getElementById("p2").innerHTML ="&nbsp&nbsp&nbsp&nbsp Le due password coincidono";
  }	
}

function clickAdmin(){
  var email=document.getElementById("email").value;
  if(email!=""){
    checkEmail(email)
  }
}



//Preferiti

function getCuori() {
  const bottone = document.querySelectorAll(".cuore");
  for(const b of bottone) {
    console.log(b);
    b.addEventListener("click", fetchInsert);
  }
  console.log(bottone);
}

function onResponseText(response){
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
      return response.text();
  }
  console.error(response.statusText);
}

function fetchInsert(event){
  const img = event.currentTarget;
  console.log(img);
  const div = img.parentNode;
  div.childNodes[5].removeEventListener("click", fetchInsert);
  div.childNodes[5].addEventListener("click", fetchRemove);
  console.log(div.childNodes[5]);

  console.log(div);
  const codProdotto = div.id;
  console.log(codProdotto);

  const URL = "pref_insert.php?codProdotto=" + codProdotto;
  fetch(URL).then(onResponseText).then(text=>{
      console.log(text);
  });
}

function fetchRemove(event){
    
    const img = event.currentTarget;
    
    img.removeEventListener("click", fetchRemove);
    img.addEventListener("click", fetchInsert);
    const div = img.parentNode;
    const codProdotto = div.id;
    
    const URL = "pref_remove.php?codProdotto=" + codProdotto;
    fetch(URL).then(onResponseText).then(text=>{
        console.log(text);
  });
}

setTimeout(getCuori, 1000);




