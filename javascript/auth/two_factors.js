window.addEventListener('load', async () => {
   await fetch("../../php/two_factors.php",{
      method: "GET",
   }) 
   .then(async function(resposta){
      return await resposta.json();
   })
   .then((dados) => {
      console.log(dados);
   })
});



let bttn_enter = document.getElementById("form");
bttn_enter.addEventListener("submit", function(event) {
   event.preventDefault();
});



async function verificar_codigo() {

   // Gerando hash do token e colocando no formulário oculto
   let token = document.getElementById("sms-code").value;

   if (token == ""){
      document.getElementById("alert").innerHTML = "Preencha todos os campos";
   }
   else{
      let token_hash = CryptoJS.SHA512(token).toString();
      document.getElementById("code_hash").value = token_hash;

      let dados = document.getElementById("form");
      let objetoForm = new FormData(dados);
   
      let response = await criptografar(objetoForm, "../../php/two_factors.php");
            
      switch (response) {
         case 1:
            document.getElementById("alert").innerHTML = "O código digitado não corresponde<br>ao enviado para seu telefone";
            break;

         case 2:
            document.getElementById("alert").innerHTML = "Erro ao tentar validar o dois fatores";
            break;

         default:
            window.location.href = "../../html/auth/login.html";
            break;
      }
   }
}
