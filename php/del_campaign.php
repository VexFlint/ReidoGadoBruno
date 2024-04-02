<?php
   
   include "connection.php";

   $id_campanha = $_POST["campanha"];

   $query = "UPDATE vakinha.campanha SET aprovacao = false WHERE id = '$id_campanha'";
   $registros = mysqli_query($conexao, $query);

   echo json_encode($resposta);   
?>