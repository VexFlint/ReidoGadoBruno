window.addEventListener('load', async () => {

   await fetch("../../php/block_admin.php",{
      method: "GET",
   }) 
   .then(async function(resposta){
      var check = await resposta.json();

      if (check == 1){
         window.location.href = "../../html/pages/begin.html";
      }
   })
})
