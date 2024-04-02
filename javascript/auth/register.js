function revelar_senha(eye, campo){
   
   if (campo == 1){ // Input de senha
      if (eye == true){
         document.getElementById("senha").type = "text";
         document.getElementById("eye-senha").className = "icon-eye fa-solid fa-eye reveal";
         document.getElementById("eye-senha").setAttribute("onclick", "revelar_senha(false, 1)");
      }
      else{
         document.getElementById("senha").type = "password";
         document.getElementById("eye-senha").className = "icon-eye fa-sharp fa-solid fa-eye-slash reveal";
         document.getElementById("eye-senha").setAttribute("onclick", "revelar_senha(true, 1)");
      }
   }

   else{ // Input de confirmar senha
      if (eye == true){
         document.getElementById("confirmar").type = "text";
         document.getElementById("eye-confirmar").className = "icon-eye fa-solid fa-eye reveal";
         document.getElementById("eye-confirmar").setAttribute("onclick", "revelar_senha(false, 2)");
      }
      else{
         document.getElementById("confirmar").type = "password";
         document.getElementById("eye-confirmar").className = "icon-eye fa-sharp fa-solid fa-eye-slash reveal";
         document.getElementById("eye-confirmar").setAttribute("onclick", "revelar_senha(true, 2)");
      }
   }
}


function validar_cadastro(){
   
   var nome = document.getElementById("nome").value;
   var email = document.getElementById("email").value;
   var phone = document.getElementById("phone").value;
   var senha = document.getElementById("senha").value;
   var confirmar = document.getElementById("confirmar").value;

   if (nome == "" || email == "" || phone == "" || senha == "" || confirmar == ""){
      document.getElementById("alert").className = "alert red";
      document.getElementById("alert").innerHTML = "Preencha todos os campos";
   }

   else if (senha != confirmar){
      document.getElementById("alert").className = "alert red";
      document.getElementById("alert").innerHTML = "As senhas são diferentes";
   }

   else{
      resultado = regex();

      if (resultado == 1){   
         document.getElementById("alert").className = "alert red";
         document.getElementById("alert").innerHTML = 'Formato de e-mail válido:&nbsp;<span style="color: #2a6abd">exemplo@dominio.com</span>';
      }
      else if(resultado == 2){
         document.getElementById("alert").className = "alert red";
         document.getElementById("alert").innerHTML = 'Formato de telefone válido:&nbsp;<span style="color: #2a6abd">5541900001111</span>';
      }
      else if(resultado == 3){
         document.getElementById("alert").className = "alert red";
         document.getElementById("alert").innerHTML = "A senha precisa ter letra maiúscula, minúscula,<br>número, caracter especial e mínimo de 8 dígitos";
      }
      else{
         document.getElementById("bttn").disabled = "true";
         document.getElementById("bttn").style.cursor="wait";   
         hash();
         cadastro();
      }
   }
}


function regex(){ 

   // REGEX PARA O TELEFONE
   let regex_email = /^([a-zA-Z0-9\.])*@[a-zA-Z]*\.[a-zA-Z]*\.?[a-zA-Z]*?$/;
   let regex_phone = /^[0-9]{13}$/;
   let regex_senha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[A-Za-z\d!@#$%&*]{8,}$/; 
   
   var email = document.getElementById('email').value; 
   var phone = document.getElementById('phone').value;
   var senha = document.getElementById('senha').value;

   if (regex_email.test(email) == false){
      return 1;
   }
   else if (regex_phone.test(phone) == false){
      return 2;
   }
   else if (regex_senha.test(senha) == false){
      return 3;
   }
   else {
      return 4; 
   }
}


function hash(){

   var senha = document.getElementById("senha").value;
   var hash = CryptoJS.SHA512(senha).toString();

   document.getElementById("senha_hash").value = hash;
   document.getElementById("senha").value = "";
   document.getElementById("confirmar").value = "";
}


async function cadastro(){

   let dados = document.getElementById("form");
   let objetoForm = new FormData(dados);

   let response = await criptografar(objetoForm, "../../php/register.php");
      
   if (response == 0){
      document.getElementById("alert").className = "alert green";
      document.getElementById("alert").innerHTML = "Cadastro realizado! Confirme seu e-mail";
      document.getElementById("nome").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("email").value = "";
   }
   else{
      document.getElementById("alert").className = "alert red";
      document.getElementById("alert").innerHTML = "Este e-mail já existe";
   }

   document.getElementById("bttn").removeAttribute('disabled');
   document.getElementById("bttn").style.cursor="pointer";
}