<?php
      
   include "connection.php";

   $query = "SELECT * FROM vakinha.campanha WHERE aprovacao = true";
   $registros = mysqli_query($conexao, $query);

   $i = 0;

   while($registro = mysqli_fetch_assoc($registros)){

      $resposta[$i]["id"] = $registro["id"];
      $resposta[$i]["usuario"] = $registro["nome_usuario"];
      $resposta[$i]["nome"] = $registro["nome_campanha"];
      $resposta[$i]["valor"] = $registro["valor_objetivo"];
      $resposta[$i]["arrecadado"] = $registro["valor_arrecadado"];

      $i++;
   }

   echo json_encode($resposta);
?>