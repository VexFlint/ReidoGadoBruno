<?php   
   session_start();
   
   include "decrypted.php";
   include "connection.php";

   $dados = descriptografar_dados($_POST['dataEncrypt'], $_POST['secretKeyEncrypt'], $_POST['ivEncrypt']);
   $usuario = $_SESSION["id"];

   $query = "INSERT INTO vakinha.doacao (id_campanha, id_usuario, valor_doado) 
   VALUES ('$dados->campanha', '$usuario', '$dados->valor')";
   $resposta = mysqli_query($conexao, $query);

   $query = "UPDATE vakinha.campanha SET valor_arrecadado = (valor_arrecadado + '$dados->valor') WHERE id = '$dados->campanha'";
   $resposta = mysqli_query($conexao, $query);

   echo json_encode(1);
?>
