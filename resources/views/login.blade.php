<html lang="it" >

<head>
    <meta charset="utf-8" /> 
    <title>Login</title>
    <link href="{{url('css/login.css')}}" rel="stylesheet" type="text/css"/> 
</head>

<body >
    <noscript>
            <div><h2>Il tuo browser non supporta o ha disabilitato javascript </h2>
                    <h1> Il sito non funzionera correttamente</h1>
            </div>
    </noscript>
	<h2 id="titolo">Login</h2>
	
        <div id="messaggio"></div>

      	
    <div id="pannello">

        <form method="post" class="register-form" id="loginForm" action="{{url('login')}}">
            
            @csrf
            <input type='hidden' name='_token' value='{{$csrf_token}}'> 
            <div>
                <p>
                    <input type = 'checkbox' name='checkbox' id="checkbox" value="admin">
                    <label>Clicca qui se sei un admin del sito </label> <span id="checkBox"></span>  
                </p>  
            </div>
            <div>
        	    <p>
                	<label> Email: </label>
                    <input type="email" id="email" name="email"/>       
                </p>
            </div>
            <div>
               <p>
                  	<label>Password:</label>
                    <input type="password" id="password" name="password" />          
               </p>
            </div>
            <p>
            	<input type="submit" class="btn" value="Login" />
            </p>
        </form>

       
            <button type="button" class="btn"> <a href='{{url("home")}}'>Home</a></button>
         
        	<p>Non hai un account?</p>
        
            <button type="button" class="btn"> <a href='{{url("home")}}'>Iscriviti</a> </button>
       
    </div>
	  
</body>
</html>