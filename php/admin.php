<?php
      
   include "connection.php";

   $query = "SELECT * FROM vakinha.campanha";
   $registros = mysqli_query($conexao, $query);

   $i = 0;

   while($registro = mysqli_fetch_assoc($registros)){

      $resposta[$i]["id"] = $registro["id"];
      $resposta[$i]["usuario"] = $registro["nome_usuario"];
      $resposta[$i]["nome"] = $registro["nome_campanha"];
      $resposta[$i]["valor"] = $registro["valor_objetivo"];
      $resposta[$i]["descricao"] = $registro["descricao"];
      $resposta[$i]["check"] = $registro["aprovacao"];

      $i++;
   }

   echo json_encode($resposta);
?>