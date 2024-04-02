<?php
   session_start();

   include "connection.php";

   $usuario = $_SESSION["id"];

   $query = "SELECT campanha.nome_usuario,
                    campanha.nome_campanha, 
                    campanha.valor_objetivo, 
                    campanha.valor_arrecadado, 
                    doacao.valor_doado
   FROM campanha
   INNER JOIN doacao ON doacao.id_campanha = campanha.id
   WHERE doacao.id_campanha = campanha.id AND doacao.id_usuario = '$usuario'";

   $registros = mysqli_query($conexao, $query);

   $i = 0;

   while($registro = mysqli_fetch_assoc($registros)){

      $resposta[$i]["usuario"] = $registro["nome_usuario"];
      $resposta[$i]["nome"] = $registro["nome_campanha"];
      $resposta[$i]["valor"] = $registro["valor_objetivo"];
      $resposta[$i]["arrecadado"] = $registro["valor_arrecadado"];
      $resposta[$i]["doado"] = $registro["valor_doado"];

      $i++;
   }

   echo json_encode($resposta);
?>