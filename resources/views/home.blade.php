<?php  
/* include 'funzioni.php';
checkHTTPS();
session_start();


if(isset($_SESSION['login_user'])){
    check_login();           
} */
?> 

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
 
    <?php    
       /*  if(isset($_REQUEST['msg'])){  
         $msg = $_REQUEST['msg'];
         $msg = strip_tags($msg);	 */
            
?>
        	<div id="messaggio"><?php/*  echo $msg; ?></div>
<?php } */?> 

    <header>
      <nav> 
        <a id="logo">Il lusso a portata di click!</a> 
        
        <div id="links">
          <a class="button" href="index.php">Home</a>

          <?php
  
          /* if(isset($_SESSION['login_admin']))
          { */
          ?>    
            <a class="button" href="admin_pannel.html">Pannello Admin</a>
            <a class="button" href="logout.php">Logout</a>

          <?php 
         /*  } else if (isset($_SESSION['login_user'])) { */
              ?>     
              <a class="button" href="user_info.html">Info Utente</a> 
              <a class="button" href="carrello.php">Carrello</a>
              <a class="button" href="logout.php">Logout</a>
              
          <?php   
          /* } else if (!isset($_SESSION['login_user'])) { */
          ?>          
              <a class="button" href="login.php">Accedi</a>
              <a class = "button" href = "registrazione.php">Registrati</a>  
          <?php   
          /* } */
          ?>  
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

      <?php
            /* if(isset($_SESSION['login_user'])) 
            { */
      ?>          
             <h2> Benvenuto <br><?php/*  echo $_SESSION['login_user'];  */?> ! </h2> 
       <?php
     /*  } */
      ?>

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
