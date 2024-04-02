<?php   
   session_start();
   
   include "connection.php";

   if($_SESSION["id_perfil"] == 1){
      echo json_encode(1);
   }
?>