<?php

   include "connection.php";

   $id_campanha = $_POST["campanha"];

   $query = "SELECT * FROM vakinha.campanha WHERE id = '$id_campanha'";
   $registros = mysqli_query($conexao, $query);

   $registro = mysqli_fetch_assoc($registros);

   $resposta["nome"] = $registro["nome_campanha"];
   $resposta["usuario"] = $registro["nome_usuario"];
   $resposta["valor"] = $registro["valor_objetivo"];
   $resposta["arrecadado"] = $registro["valor_arrecadado"];
   $resposta["descricao"] = $registro["descricao"];

   echo json_encode($resposta);
?>