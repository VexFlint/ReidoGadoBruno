<?php   
   session_start();
   
   include "connection.php";

   // Todas as variáveis precisam estar setadas
   if(!isset($_SESSION['email']) || !isset($_SESSION['confirmacao']) || !isset($_SESSION['dois_fatores'])){
      echo json_encode(1);
   }  
   else if (isset($_SESSION['timestamp'])){ 
      if ((time() - $_SESSION['timestamp']) >= 1800){  // Sessão expira em 30 min
         echo json_encode(1);
         session_destroy();
      }
   }
?>