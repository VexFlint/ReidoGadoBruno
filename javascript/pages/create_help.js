function validar_campanha(){

   let nome = document.getElementById("nome").value;
   let valor = document.getElementById("valor").value;
   let descricao = document.getElementById("descricao").value;


   if (nome == '' || valor == '' || descricao == ''){
      document.getElementById("alert").className = "alert red";
      document.getElementById("alert").innerHTML = "Preencha todos os campos";
   }
   else{
      document.getElementById("bttn").disabled = "true";
      document.getElementById("bttn").style.cursor="wait";   
      criar_campanha();
   }
}


async function criar_campanha(){

   let dados = document.getElementById("form");
   let objetoForm = new FormData(dados);

   let response = await criptografar(objetoForm, "../../php/create_help.php");
      
   if (response == 1){
      document.getElementById("alert").className = "alert red";
      document.getElementById("alert").innerHTML = "O nome da campanha já esta em uso";
   }

   else{
      document.getElementById("alert").className = "alert green";
      document.getElementById("alert").innerHTML = "Sua campanha está em estado de aprovação.<br>Acompanhe seu e-mail";
      document.getElementById("nome").value = "";
      document.getElementById("valor").value = "";
      document.getElementById("descricao").value = "";
   }

   document.getElementById("bttn").removeAttribute('disabled');
   document.getElementById("bttn").style.cursor="pointer";
}
