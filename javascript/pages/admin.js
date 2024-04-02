fetch("../../php/admin.php",{
   method: "GET"
}).then(async function(resposta){
   let objeto = await resposta.json();
   listar_campanhas(objeto);
});

function listar_campanhas(campanha){

   for(var i = 0; i < campanha.length; i++){
      
      let conteudo = "";

      conteudo += '<div class="aprovacao">';
      conteudo +=    '<div class="nome-usuario">'+campanha[i].usuario+'</div>';
      conteudo +=    '<div class="nome-campanha">'+campanha[i].nome+'</div>';
      conteudo +=    '<div class="valor-campanha">R$ '+campanha[i].valor+'</div>';
      conteudo +=    '<div class="descricao-campanha">'+campanha[i].descricao+'</div>';

      if (campanha[i].check == true){
         conteudo += '<div class="bttn-campanha"><i class="del fa-solid fa-trash" onclick="remover_campanha('+campanha[i].id+')"></i></div>';
         conteudo += '</div>';

         document.getElementById("aprovado").innerHTML += conteudo;
      }
      else{
         conteudo += '<div class="bttn-campanha"><i class="add fa-solid fa-check-to-slot" onclick="adicionar_campanha('+campanha[i].id+')"></i></div>';
         conteudo += '</div>';

         document.getElementById("aprovar").innerHTML += conteudo;
      }
   }
}

function adicionar_campanha(id_campanha){

   document.getElementById("id-campanha").value = id_campanha;

   let objetoForm = document.getElementById("form-hidden");
   let dados = new FormData(objetoForm);

   fetch("../../php/add_campaign.php", {
      method: "POST",
      body: dados
   })
   .then(async function(resposta){
      window.location.href = "../../html/pages/admin.html";
   })
}

function remover_campanha(id_campanha){

   document.getElementById("id-campanha").value = id_campanha;

   let objetoForm = document.getElementById("form-hidden");
   let dados = new FormData(objetoForm);

   fetch("../../php/del_campaign.php", {
      method: "POST",
      body: dados
   })
   .then(async function(resposta){
      window.location.href = "../../html/pages/admin.html";
   })
}