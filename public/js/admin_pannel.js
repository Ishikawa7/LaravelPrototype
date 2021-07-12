 function successOrNot(text)
   {
   if(text=="success"){
        alert("Saldi settati con successo!");
    }else{
       alert("Saldi non settati con successo o gia' settati");  
    }
  }


/*Creo una riga per ogni elemento utilizzando il json che ha restituito la fetch*/ 
function dyslayAdminStats(json){
    console.log(json);
    if(json!==""){
        const table = document.getElementById("admin_table");
        for (key in json){
            const tr = document.createElement("tr");

            const td_id = document.createElement("td");
            td_id.textContent = json[key].id;
            tr.appendChild(td_id);

            const td_importo = document.createElement("td");
            td_importo.textContent = json[key].importo;
            tr.appendChild(td_importo);

            const td_utente = document.createElement("td");
            td_utente.textContent = json[key].utente;
            tr.appendChild(td_utente);
            
            table.appendChild(tr);
        }
    }else{
        console.error("Nessuna informazione dal database");  
    }
}

function onResponseText(response){
    if (response.status >= 200 && response.status < 300) {
        return response.text();
    }
    console.error(response.statusText)
}

function onResponseJson(response){
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    }
    console.error(response.statusText)
}

/*Quando si verifica l'evento queste due funzioni fanno partire le relative chiamate asincrone*/ 
function fetchSales(event){
    const URL = "admin_pannel/admin_sales";
    fetch(URL).then(onResponseText).then(successOrNot);
}

function fetchStats(event){
    const URL = "admin_pannel/admin_stats";
    fetch(URL).then(onResponseJson).then(dyslayAdminStats);
}

const button = document.getElementById("inizio_saldi");
button.addEventListener("click",fetchSales);
fetchStats();