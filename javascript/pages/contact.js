function validar_mensagem(){

   let nome = document.getElementById("nome").value;
   let assunto = document.getElementById("assunto").value;
   let mensagem = document.getElementById("mensagem").value;


   if (nome == '' || assunto == '' || mensagem == ''){
      document.getElementById("alert").className = "alert red";
      document.getElementById("alert").innerHTML = "Preencha todos os campos";
   }
   else{
      document.getElementById("bttn").disabled = "true";
      document.getElementById("bttn").style.cursor="wait";   
      enviar_mensagem();
   }
}

async function enviar_mensagem(){

   let dados = document.getElementById("form");
   let objetoForm = new FormData(dados);

   await criptografar(objetoForm, "../../php/contact.php");
   
   document.getElementById("alert").className = "alert green";
   document.getElementById("alert").innerHTML = "Sua mensagem foi enviada. Responderemos em breve";
   document.getElementById("nome").value = "";
   document.getElementById("assunto").value = "";
   document.getElementById("mensagem").value = "";

   document.getElementById("bttn").removeAttribute('disabled');
   document.getElementById("bttn").style.cursor="pointer";
}
