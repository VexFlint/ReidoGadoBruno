function menu_lateral(open){

   let id = document.getElementById("menu");

   if(open == true){

      id.style.right = (id.offsetWidth * -1) + 'px';

      document.getElementById("menu-mobile").className="fa-solid fa-xmark red";
      document.getElementById("menu-mobile").setAttribute("onclick", "menu_lateral(false)");

      setTimeout(() => {
         id.style.right = "0%";
      }, 10)
   }
   
   else{

      id.style.right = (id.offsetWidth * -1) + 'px';

      document.getElementById("menu-mobile").className="fa-solid fa-bars green";
      document.getElementById("menu-mobile").setAttribute("onclick", "menu_lateral(true)");

      setTimeout(() => {
         id.style.right = "-60%";
      }, 10)
   }
}

function inicio(){
   window.location.href = "../../html/pages/begin.html";
}

function perfil(){
   window.location.href = "../../html/pages/perfil.html";
}

function contato(){
   window.location.href = "../../html/pages/contact.html";
}