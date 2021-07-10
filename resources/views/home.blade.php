<!DOCTYPE html>

<html>
    
   <head>
      <meta charset="utf-8">
      <title>Luxury Shopping</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css?family=Lora:400,400i|Open+Sans:400,700" rel="stylesheet"> 
      <link rel="stylesheet" href="{{url('css/index.css')}}">
      <script type="text/javascript" src='script.js' defer="true"></script>
      
   </head>
<body> 

    <noscript>
      <div><h2>Il tuo browser non supporta o ha disabilitato javascript </h2>
        <h1> Il sito non funzionera correttamente</h1>
      </div>  
   </noscript>
        	
   <div id="messaggio"></div>


    <header>
      <nav> 
        <a id="logo">Il lusso a portata di click!</a> 
        
        <div id="links">
          <a class="button" href="{{url('home')}}">Home</a>

          @if(@isset($result)==1) {
            
            <a class="button" href="admin_pannel.html">Pannello Admin</a>
            <a class="button" href="logout.php">Logout</a>
          } 
          @elseif(@isset($result)==2) {     
              <a class="button" href="user_info.html">Info Utente</a> 
              <a class="button" href="carrello.php">Carrello</a>
              <a class="button" href="logout.php">Logout</a>
            }     
          elseif (!@isset(session())){
            <a class="button" href="login.php">Accedi</a>
            <a class = "button" href = "registrazione.php">Registrati</a>  
           }          
          @endif
        </div>

		   <div id="menu">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>

      <h1>
        <em>Spedizione gratuita da 500€</em><br/>
        <strong>Luxury Shopping</strong><br/>
        <a class="button">Scopri di piu'</a>
      </h1>

      @if(session()->has('user_id')){
          <h3>Benvenuto,{{$nome}}!</h3>
      }
      @endif

    </header>

    <section>
      <div id="main">
        <p>Ogni giorno è una sfilata.. <br/>
        ..e il mondo è la tua passerella!    
        </p> 
     
        <div id = "sezionePreferiti" class = "hidden"> 
          <em>Preferiti</em>
          <section id= "sectionPref" class= "griglia"></section>
        </div>
 
       <div class="containerSearch">
          <div class="sinistro"><em> Tutti gli elementi</em></div>
          <div  class="destro">
            <em> 
              Cerca 
              <input id="ricerca" type="search" placeholder="Cerca" onkeyup="cerca()"> 
            </em>
          </div>
        </div>
        
      </div>
     
     <section id="grid" class = "griglia"></section> 

      <div id="newsletter" >
        <a class="button">Iscriviti alla newsletter (10% di sconto!)</a>
      </div>

      <div class="coronaVirus">
           <button id="btnInfo" class="btnVirus">
            Covid-19: Centro informazioni 
           </button> 
      </div> 

       <section id ="sectionInfoCorona" class="hidden" >
          
        <div class="destro">
          <select name="selectCountry" id="selectCountry" onchange="infoCountry()"></select>
          <div id="infoCountry"></div>
        </div>
        
        <div class="sinistro">
          <div id="infoGlobal"></div>
        </div>
        
      </section>
      
      <div class="infoMeteo">
         <button id="btnInfoMeteo" class="btnMeteo">
          <img src = "./Immagini/meteo2.jpg">
          Previsioni <br> metereologiche
        </button>  
      </div> 

      <section id="sectionMeteo" class= "hidden">
            <em>  
              <input type="text" id="ricercaMeteo" name="search" placeholder="Cerca città"/>
              <input type="button" value="Cerca" onclick="meteoCitta(document.getElementById('ricercaMeteo').value)"/>
            </em>
        <div id="infoMain"></div> 
      </section> 

    </section>  
    

    <footer>
      <address>Porto Empedocle - Agrigento</address>
      <p>Powered by Nadia Orlando</p>
      <p>O46001288</p> 
    </footer>

    
  </body>
</html>
