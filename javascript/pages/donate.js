const urlParams = new URLSearchParams(window.location.search);
const campanha = urlParams.get('campanha');

document.getElementById("campanha").value = campanha;

let objetoForm = document.getElementById("form");
let dados = new FormData(objetoForm);

fetch("../../php/info_donate.php",{
   method: "POST",
   body: dados
})
.then(async function(resposta){
   var objeto = await resposta.json();
   info_doacao(objeto);
});

function info_doacao(campanha){
      
   let conteudo = "";

   conteudo += '<div class="info-campanha">Nome da campanha: &nbsp; <span class="bold">'+campanha.nome+'</span></div>';
   conteudo += '<div  class="info-campanha">Criador da campanha: &nbsp; <span class="bold">'+campanha.usuario+'</span></div>';
   conteudo += '<div  class="info-campanha">Valor de objetivo da campanha: &nbsp; <span class="bold">R$ '+campanha.valor+'</span></div>';
   conteudo += '<div  class="info-campanha">Valor arrecadado até o momento: &nbsp; <span class="bold">R$ '+campanha.arrecadado+'</span></div>';
   conteudo += '<div  class="info-campanha">Descrição:  &nbsp; <span class="bold">'+campanha.descricao+'</span></div>';
   conteudo += '<div class="content-input">';
   conteudo +=    '<input class="input" type="text" name="valor" id="valor" placeholder="Valor de contribuição">';
   conteudo +=    '<i class="icon fa-solid fa-sack-dollar"></i>';     
   conteudo += '</div>';
   conteudo += '<div class="content-bttn">';
   conteudo +=    '<button class="bttn-form" type="button" id="bttn" onclick="doar()">Doar</button>';
   conteudo += '</div>';

   
   document.getElementById("form").innerHTML += conteudo;
}


function doar(){

   let valor = document.getElementById("valor").value;

   if(valor == ""){
      document.getElementById("alert").innerHTML = "Preencha o campo com o valor a contribuir";
      document.getElementById("alert").className = "alert red";
   }
   else{
      document.getElementById("bttn").disabled = "true";
      document.getElementById("bttn").style.cursor="wait";   
      enviar_doacao();
   }
}


async function enviar_doacao(){

   let dados = document.getElementById("form");
   let objetoForm = new FormData(dados);

   await criptografar(objetoForm, "../../php/donate.php");

   document.getElementById("alert").innerHTML = "Realizada a doação. Agradecemos sua contribuição";
   document.getElementById("alert").className = "alert green";

   document.getElementById("valor").value = "";

   document.getElementById("bttn").removeAttribute('disabled');
   document.getElementById("bttn").style.cursor="pointer";

}