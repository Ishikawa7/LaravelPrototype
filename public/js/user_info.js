
/*Creo ogni elemento della tabella dal json ritornato dalla fetch ed anche le informazioni sui costi medi */
function dislay_media_acquisti(json){
    console.log(json);
    if(json!=="" && json!= null){
        const span = document.getElementById("costoMedio");
        const p_media_aquisti_senza_buono = document.createElement("h2");
        const p_media_aquisti_con_buono = document.createElement("h2");
        p_media_aquisti_senza_buono.textContent = " • Costo medio per acquisto senza buono: "+json[0].avg;
        p_media_aquisti_con_buono.textContent = " • Costo medio per acquisto con buono: "+json[1].avg;
        span.appendChild(p_media_aquisti_senza_buono);
        span.appendChild(p_media_aquisti_con_buono);
    }else{
        console.error("Nessuna informazione dal database");  
    }
}

function dislay_acquisti_spedizioni_non_recenti(json){
    const table = document.getElementById("user_info_table");
    console.log(json);
    if(json!=="" && json!= null){
        for (index in json){
            const tr = document.createElement("tr");
    
            const td_id = document.createElement("td");
            td_id.textContent = json[index].id;
            tr.appendChild(td_id);
    
            const td_conBuono = document.createElement("td");
            if(json[index].conBuono===0){ td_conBuono.textContent = "senza buono"} else {td_conBuono.textContent = "con buono"}
            tr.appendChild(td_conBuono);
    
            const td_importo = document.createElement("td");
            td_importo.textContent = json[index].importo;
            tr.appendChild(td_importo);
            
            table.appendChild(tr);
        }
    }else{
        console.error("Nessuna informazione dal database"); 
    }
}

function onResponseJson(response){
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    }
    console.error(response.statusText)
}

function fetch_acquisti_spedizioni_non_recenti(){
    const URL = "user_info/acquisti_spedizioni_non_recenti";
    fetch(URL).then(onResponseJson).then(dislay_acquisti_spedizioni_non_recenti);
}

function fetch_media_acquisti(){
    const URL = "user_info/media_acquisti";
    fetch(URL).then(onResponseJson).then(dislay_media_acquisti);
    
}

fetch_acquisti_spedizioni_non_recenti();
fetch_media_acquisti();