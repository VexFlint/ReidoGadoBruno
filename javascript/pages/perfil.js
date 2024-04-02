fetch("../../php/perfil.php",{
   method: "GET"
})
.then(async function(resposta){
   let objeto = await resposta.json();
   listar_campanhas(objeto);
})

function listar_campanhas(campanhas){

   for(let i = 0; i < campanhas.length; i++){
      
      let conteudo = "";

      conteudo += '<div class="help">';
      conteudo +=    '<div class="help-title">'+campanhas[i].nome+'</div>';
      conteudo +=    '<div class="help-nome">'+campanhas[i].usuario+'</div>';
      conteudo +=    '<div class="help-objetivo">R$ '+campanhas[i].arrecadado+'/'+campanhas[i].valor+'</div>';
      conteudo +=    '<div class="help-valor">Ajudou com (R$ '+campanhas[i].doado+')</div>';
      conteudo += '</div>';

      document.getElementById("help").innerHTML += conteudo;
   }
}
