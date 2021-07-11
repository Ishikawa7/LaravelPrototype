function checkEmail(email)
{  
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isEmail= re.test(String(email).toLowerCase());
    if(!isEmail)
    {
      document.getElementById("logemail").style.color='red';  
      document.getElementById('logemail').innerHTML="&nbsp&nbsp&nbsp&nbsp Email non corretta";  
      
    }else{
    
      url='registration/email';
      var formData = new FormData();
      formData.append('email',email);
      var admin=document.getElementById("mycheck").checked;
      formData.append('admin',String(admin));
      const token = document.getElementById("_token2");

      fetch(url,{headers:{
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": token.value
        },method:'POST', body: formData})
      .then((res) =>res.json())
      .then(response =>{
        console.log(response);  
        if (response.exists==false){
            document.getElementById("logemail").style.color='green'; 
            document.getElementById('logemail').innerHTML="&nbsp&nbsp&nbsp&nbsp Email corretta e mai usata";
        }else{
            document.getElementById("logemail").style.color='red';  
            document.getElementById('logemail').innerHTML="&nbsp&nbsp&nbsp&nbsp Email gia usata";  
        }
        
      })
      
    }
}


/*Eseguo dei controlli sulla struttura della password*/
function checkPsw(value){
    const checkminuscolo = /[a-z]/;
    const checkmaiuscolo= /[A-Z]/; 
    const checknumero= /[0-9]/;
  
    const minuscolo = checkminuscolo.test(String(value));
    const maiuscolo = checkmaiuscolo.test(String(value));
    const numero = checknumero.test(String(value));
        
    if (minuscolo && maiuscolo && numero && value.length >= 5) {
      document.getElementById("p1").style.color='green';  
      document.getElementById('p1').innerHTML="&nbsp&nbsp&nbsp&nbsp Password conforme alle specifiche"
    }
    else
    {
      document.getElementById("p1").style.color='red';  
      document.getElementById('p1').innerHTML="&nbsp&nbsp&nbsp&nbsp Password non conforme alle specifiche"
    }
  }
  
  /*Controllo se le due password inserite sono uguali*/
  function checkPsw1(value){
  
    var pass1 = document.getElementById('pass1').value;
    if(value!=pass1){
      document.getElementById("p2").style.color='red';
      document.getElementById("p2").innerHTML ="&nbsp&nbsp&nbsp&nbsp Le due password devono coincidere  ";
    }else{
        document.getElementById("p2").style.color='green';
        document.getElementById("p2").innerHTML ="&nbsp&nbsp&nbsp&nbsp Le due password coincidono";
    }	
  }
  
  function clickAdmin(){
    var email=document.getElementById("email").value;
    if(email!=""){
      checkEmail(email)
    }
  }