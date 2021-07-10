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

//URL: 'https://api.covid19api.com/summary'  

//Bottone informazioni Covid
const btnInfocovid = document.getElementById("btnInfo");
btnInfocovid.addEventListener('click',inforCorona);

function inforCorona(){
    const corona_api_endpoint = "home/covid_api";
    fetch(corona_api_endpoint).then(onResponse).then(onJson);
}
  
function onResponse(response) {
    console.log(response);
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
  