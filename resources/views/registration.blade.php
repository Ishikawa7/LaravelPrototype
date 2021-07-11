<!DOCTYPE html>
<html lang="it">     
    <head>
        <meta charset="utf-8" />
        <title>Registrazione</title>
        <link href="{{url('css/registrazione.css')}}" rel="stylesheet" type="text/css"/> 
        <script type="text/javascript" src="{{url('js/controls.js')}}" defer="true"></script>
    </head>
<body>
    <noscript>
            <div><h2>Il tuo browser non supporta o ha disabilitato javascript </h2>
            	<h1> Il sito non funzionera correttamente</h1>
            </div>
    </noscript>
		
        <h2 id="titolo">Registrazione</h2>


    	<div id="pannello">
            <form action="{{url('registration/create')}}" method="post">
                
                @csrf
                <input type='hidden' name='_token2' value='{{$csrf_token}}'>
               
                <p>
                    <input type = 'checkbox' name='checkbox' value='admin' id="checkbox" onchange="clickAdmin()" >
                    <label>Clicca qui se sei un admin del sito </label> <span id="checkBox"></span>  
                </p>  
                <p>
                    <label>Email:</label> <span id="logemail"></span>
                    <input type="email" id="email" name="email" onkeyup="checkEmail(this.value)"/> 
                </p>
                <p >
                    <label>Password:</label><span id="p1"></span>
                    <input type="password" id="password"  name="password" onkeyup="checkPsw(this.value)" />
                   
                </p>
                <p >
                    <label>Ripeti password:</label><span id="p2"></span><span id="p3"></span>
                    <input type="password" id="password2"  name="password2" onkeyup="checkPsw(this.value)"/>
                </p>
                <p>
                    <input type="submit" name="invia" class="btn" value="Registrati" />
                </p>
               
            </form>
            
            <button type="button" class="btn"> <a href='{{url("home")}}'>Home</a></button>

            <p>
                La password deve contenere almeno un carattere alfabetico minuscolo, un carattere alfabetico maiuscolo e un numero
            </p>
        </div> 

        <footer>
           <p></p>
        </footer>  
</body>
</html>