function alterar_formulario(modo){

   document.getElementById("alert").innerHTML = "";

   if (modo == 1){
      document.getElementById("message").innerHTML = "Informe o código de acesso<br>enviado ao seu e-mail";
      document.getElementById("content-input").style.width="55%";

      var conteudo = "";
      conteudo += '<input class="input" type="text" id="token" placeholder="Código">';
      conteudo += '<i class="icon fa-solid fa-key"></i>';

      document.getElementById("content-input").innerHTML = conteudo;
      document.getElementById("bttn").setAttribute("onclick", "confirmar_token()");
      document.getElementById("bttn").innerHTML = "Confirmar";

   }

   else if (modo == 2){
      document.getElementById("content").className = "content tela2";
      document.getElementById("img").className = "img img-tela2";
      document.getElementById("icon").style.fontSize = "50px";
      document.getElementById("alert").style.marginBottom = "10px";
      document.getElementById("content-form").className = "content-form content-form-tela2";
      document.getElementById("content-input").style.width="80%";
      document.getElementById("message").innerHTML = "Preencha os campos para redefinir sua senha";

      var conteudo = "";

      conteudo += '<div class="content-input">';
      conteudo += '  <input class="input" type="password" id="senha" placeholder="Senha">';
      conteudo += '  <i class="icon fa-solid fa-lock"></i>';
      conteudo += '  <i class="icon-eye fa-sharp fa-solid fa-eye-slash" id="eye-senha" onclick="revelar_senha(true, 1)"></i> ';     
      conteudo += '</div>';
      conteudo += '<div class="content-input">';
      conteudo += '  <input class="input" type="password" id="confirmar" placeholder="Confirmar senha">';
      conteudo += '  <i class="icon fa-solid fa-lock"></i>';
      conteudo += '  <i class="icon-eye fa-sharp fa-solid fa-eye-slash" id="eye-confirmar" onclick="revelar_senha(true, 2)"></i> ';     
      conteudo += '</div>';
      conteudo += '<div class="content-bttn" id="content-bttn">';
      conteudo +=    '<button class="bttn" type="button" id="bttn" onclick="confirmar_senha()">Alterar</button>';
      conteudo += '</div>';

      document.getElementById("form").innerHTML = conteudo;
   }

   else{
      document.getElementById("content").className = "content tela3";
      document.getElementById("content-form").className = "content-form content-form-tela3";
      document.getElementById("img").className = "img img-tela3";
      document.getElementById("icon").style.fontSize = "60px";
      document.getElementById("message").innerHTML = "<br>Senha alterada com sucesso!<br>Clique abaixo para autenticar";
      document.getElementById("alert-form").style.display="none";

      var conteudo = "";
      conteudo += '<button class="bttn" type="button" onclick="autenticar_usuario()" id="bttn">Fazer login</button>';

      document.getElementById("form").innerHTML = conteudo;
   }
}


async function enviar_codigo(){

   let email = document.getElementById("e-mail").value;

   if (email == ""){
      document.getElementById("alert").innerHTML = "Preencha todos os campos";  
   }  

   else{
      document.getElementById("bttn").disabled = "true";
      document.getElementById("bttn").style.cursor="wait";

      document.getElementById("email").value = email;

      let dados = document.getElementById("form");
      let objetoForm = new FormData(dados);

      let response = await criptografar(objetoForm, "../../php/check_email.php");
         
      if (response == 0){
         document.getElementById("alert").innerHTML = "E-mail inexistente em nosso domínio";     
      }
      else{
         alterar_formulario(1);   
      }
      document.getElementById("bttn").removeAttribute('disabled');
      document.getElementById("bttn").style.cursor="pointer";
   }
}


async function confirmar_token(){

   let token = document.getElementById("token").value;

   if (token == ""){
      document.getElementById("alert").innerHTML = "Preencha todos os campos";     
   }  
   
   else{
      let token_hash = CryptoJS.SHA512(token).toString();
      document.getElementById("token_hash").value = token_hash;

      let dados = document.getElementById("form");
      let objetoForm = new FormData(dados);

      let response = await criptografar(objetoForm, "../../php/check_token.php");

      if (response == 0){
         alterar_formulario(2);
      }
      else{
         document.getElementById("alert").innerHTML = "Código inválido! Tente novamente";     
      }
   }
}

async function confirmar_senha(){

   var senha = document.getElementById("senha").value;
   var confirmar = document.getElementById("confirmar").value;

   if (senha == "" || confirmar == ""){
      document.getElementById("alert").innerHTML = "Preencha todos os campos";       
   }  
   else if (senha != confirmar){
      document.getElementById("alert").innerHTML = "As senhas são diferentes";     
   }
   else{
      resultado = regex(senha);

      if (resultado == 1){
         document.getElementById("alert").innerHTML = "A senha precisa ter letra maiúscula, minúscula,<br>número, caracter especial e mínimo de 8 dígitos.";    
      }

      else{
         document.getElementById("bttn").disabled = "true";
         document.getElementById("bttn").style.cursor="wait";

         let senha_hash = CryptoJS.SHA512(senha).toString();

         document.getElementById("senha_hash").value = senha_hash;

         let dados = document.getElementById("form");
         let objetoForm = new FormData(dados);
   
         await criptografar(objetoForm, "../../php/reset_pass.php");
   
         document.getElementById("bttn").removeAttribute('disabled');
         document.getElementById("bttn").style.cursor="pointer";

         alterar_formulario(3);
      }
   }
}


function regex(token){ 

   let regex_senha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[A-Za-z\d!@#$%&*]{8,}$/; 
   
   if (regex_senha.test(token) == false)
      return 1;
   else
      return 2; 
}

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


function autenticar_usuario(){
   window.location.href = "../../html/auth/login.html";
}