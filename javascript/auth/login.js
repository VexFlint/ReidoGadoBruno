function revelar_senha(eye){
   
   if (eye == true){
      document.getElementById("senha").type = "text";
      document.getElementById("eye").className = "icon-eye fa-solid fa-eye reveal";
      document.getElementById("eye").setAttribute("onclick", "revelar_senha(false)");
   }
   else{
      document.getElementById("senha").type = "password";
      document.getElementById("eye").className = "icon-eye fa-sharp fa-solid fa-eye-slash reveal";
      document.getElementById("eye").setAttribute("onclick", "revelar_senha(true)");
   }
}


function validar_login(){

   var email = document.getElementById("email").value;
   var senha = document.getElementById("senha").value;

   if (email == '' || senha == ''){
      document.getElementById("alert").className = "alert red";
      document.getElementById("alert").innerHTML = "Preencha todos os campos";
   }
   else
      login();
}


async function login(){

   hash();

   let dados = document.getElementById("form");
   let objetoForm = new FormData(dados);

   let response = await criptografar(objetoForm, "../../php/login.php");

   if (response == 0){
      document.getElementById("alert").className = "alert red";
      document.getElementById("alert").innerHTML = "E-mail ou senha inválido(s)!";
   }
   else if(response == 1){
      document.getElementById("alert").className = "alert red";
      document.getElementById("alert").innerHTML = "Você precisa validar seu cadastro.<br>Enviamos um e-mail para confirmação.";
   }
   else if(response == 2){
      document.getElementById("alert").className = "alert green";
      document.getElementById("alert").innerHTML = "Ative seus dois fatores clicando&nbsp;<a class='link-2fa' href='two_factors.html'>aqui</a>.";
   }
   else if(response == 3){
      window.location.href = "../../html/pages/begin.html";
   }
   else
      window.location.href = "../../html/pages/admin.html";
}


function hash(){

   var senha = document.getElementById("senha").value;
   var hash = CryptoJS.SHA512(senha).toString();

   document.getElementById("senha_hash").value = hash;
   document.getElementById("senha").value = "";
}