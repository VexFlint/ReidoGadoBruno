window.addEventListener('load', async () => {

   await fetch("../../php/block.php",{
      method: "GET",
   }) 
   .then(async function(resposta){
      var check = await resposta.json();

      if (check == 1){
         window.location.href = "../../html/auth/login.html";
      }
   })
})

function logout(){

   fetch("../../php/pages/logout.php",{
      method: "GET",
   }) 
   .then(async function(resposta){      
      window.location.href = "../../html/auth/login.html";
   })
}