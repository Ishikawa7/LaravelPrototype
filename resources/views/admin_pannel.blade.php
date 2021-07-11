<!doctype html>

  <html lang="it">

  <head>
    <meta charset="utf-8">
    <script src="admin_pannel.js" defer= "true"></script>
    <link href="{{url('css/admin_pannel.css')}}" rel="stylesheet" type="text/css"/> 
  </head>
  
  <body>

    <noscript>
      <div><h2>Il tuo browser non supporta o ha disabilitato javascript </h2>
        <h1> Il sito non funzionera correttamente</h1>
      </div>  
   </noscript>

    <h1 id = "titolo">Pannello Admin</h1>
    <div id="admin_info">
       <table class = "tabella" style="width:40%" id="admin_table">
          <h2>• Visualizzazione degli acquisti di utenti che hanno speso piu' di 100€ in spedizioni
                    e che hanno almeno una volta<br> acquistato senza buono</h2>
        <tr>
            <th>Codice<br> acquisto</th>
            <th>Importo(€)</th>
            <th>Id utente</th>
        </tr>
       </table>

       <div id="saldi">
           <button id="inizio_saldi" class = "button"> Applica sconti di fine stagione</button>
       </div>

       <form action="{{url('home')}}" method="get">
          <p>
            <input type="submit" class="button" value="Homepage"/> 
          </p>
       </form> 
  
    </div>
  </body>
</html>