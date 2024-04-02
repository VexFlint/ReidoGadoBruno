fetch("../../php/help.php",{
   method: "GET"
}).then(async function(resposta){
   let objeto = await resposta.json();
   listar_campanhas(objeto);
});

function listar_campanhas(campanha){

   let cont = 1;

   for(let i = 0; i < campanha.length; i++){
      
      let conteudo = "";

      conteudo += '<div class="help">';
      conteudo +=    '<div class="help-title">'+campanha[i].nome+'</div>';
      conteudo +=    '<div class="help-img img'+cont+'"></div>';
      conteudo +=    '<div class="help-nome">'+campanha[i].usuario+'</div>';
      conteudo +=    '<div class="help-valor">R$ '+campanha[i].arrecadado+'/'+campanha[i].valor+'</div>';
      conteudo +=    '<a class="button button-doar" href="donate.html?campanha='+campanha[i].id+'">Doar</a>';
      conteudo += '</div>';

      if(cont == 4)
         cont = 1;
      else
         cont++;

      document.getElementById("help").innerHTML += conteudo;
   }
}