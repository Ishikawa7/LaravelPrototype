
/*Creo ogni elemento della tabella dal json ritornato dalla fetch ed anche le informazioni sui costi medi */
function dislayUserInfo(json){
    console.log(json);
    if(json!=="" && json!= null){
        const table = document.getElementById("user_info_table");
        const span = document.getElementById("costoMedio");
        const p_media_aquisti_senza_buono = document.createElement("h2");
        const p_media_aquisti_con_buono = document.createElement("h2");
        p_media_aquisti_senza_buono.textContent = " • Costo medio per acquisto senza buono: "+json[0].avg;
        p_media_aquisti_con_buono.textContent = " • Costo medio per acquisto con buono: "+json[1].avg;
        span.appendChild(p_media_aquisti_senza_buono);
        span.appendChild(p_media_aquisti_con_buono);
        
        const n = Object.keys(json).length;
        for (i=2; i<n; i++){
            const tr = document.createElement("tr");

            const td_id = document.createElement("td");
            td_id.textContent = json[i].id;
            tr.appendChild(td_id);

            const td_conBuono = document.createElement("td");
            if(json[i].conBuono===0){ td_conBuono.textContent = "senza buono"} else {td_conBuono.textContent = "con buono"}
            tr.appendChild(td_conBuono);

            const td_importo = document.createElement("td");
            td_importo.textContent = json[i].importo;
            tr.appendChild(td_importo);
            
            table.appendChild(tr);
        }
    }else{
        console.error("Nessuna informazione dal database");  
    }
}

function onResponseJson(response){
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    }
    console.error(response.statusText)
}

function fetchUserInfo(event){
    const URL = "user_info.php";
    fetch(URL).then(onResponseJson).then(dislayUserInfo);
}

fetchUserInfo();