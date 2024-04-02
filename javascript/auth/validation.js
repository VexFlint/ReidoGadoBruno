function autenticar_usuario(){
   
   window.location.href = "../../html/auth/login.html";
}


window.addEventListener('load', async () => {

   const urlParams = new URLSearchParams(window.location.search);
   const key = urlParams.get('key');
   
   document.getElementById("key").value = key;

   let dados = document.getElementById("form");
   let objetoForm = new FormData(dados);

   await criptografar(objetoForm, "../../php/validation.php");
})