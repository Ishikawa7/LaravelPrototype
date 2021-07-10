<!doctype html>

  <html lang="it">

  <head>
    <meta charset="utf-8">
    <link href="user_info.css" rel="stylesheet" type="text/css"/> 
    <script src="user_info.js" defer = "true"></script>
  </head>

  
  <body>

    <noscript>
      <div><h2>Il tuo browser non supporta o ha disabilitato javascript </h2>
        <h1> Il sito non funzionera correttamente</h1>
      </div>  
   </noscript>

    <h1 id = "titolo">Informazioni utente</h1>
        <div id="user_info"> 
          
          <table  class = "tabella" style="width:40%"  id="user_info_table">
            <h2>• Acquisti con spedizioni non recenti</h2>
           <tr>
                    <th>Id acquisto</th>
                    <th>Acquisti con buono</th>
                    <th>Importo(€)</th>
          </tr>
          </table> 

          <span id="costoMedio"></span>

          <form action="index.php" method="get">
              <p>
                <input type="submit" class="button" value="Home"/> 
              </p>
          </form>

        </div> 
  </body>
</html>
