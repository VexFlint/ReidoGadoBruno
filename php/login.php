<?php
   session_start();

   include "decrypted.php";
   include "connection.php";
   include "send_email.php";

   $dados = descriptografar_dados($_POST['dataEncrypt'], $_POST['secretKeyEncrypt'], $_POST['ivEncrypt']);

   $query = "SELECT * FROM vakinha.usuario WHERE email = '$dados->email' AND senha = '$dados->senha_hash'";

   $resposta = mysqli_query($conexao, $query);
   $resultado = mysqli_num_rows($resposta);

   $check = 0;                            // Usuário não existe

   if($resultado == true){

      $query = "SELECT id_perfil, data_dois_fatores, confirmacao FROM vakinha.usuario WHERE email = '$dados->email'";
      $resposta = mysqli_query($conexao, $query);
      $registro = mysqli_fetch_assoc($resposta);

      $id_perfil = $registro["id_perfil"];
      $data_dois_fatores = $registro["data_dois_fatores"];
      $confirmacao = $registro["confirmacao"];

      if($confirmacao == false){
         $check = 1;                      // Usuário existe mas não confirmou e-mail
         enviar_email($dados->email, 1);
      }
      else{
         if (strtotime($data_dois_fatores) <= strtotime("-15 days")){
            $check = 2;                   // Usuário confirmou e-mail mas não ativou o 2FA

            $query = "SELECT email, telefone FROM vakinha.usuario WHERE email = '$dados->email'";
            $resposta = mysqli_query($conexao, $query);
            $registro = mysqli_fetch_assoc($resposta);

            $_SESSION["email"] = $registro["email"];
            $_SESSION["telefone"] = $registro["telefone"];
         }

         else{
            
            if($id_perfil == 1)
               $check = 3;                   // Usuário confirmou e-mail e ativou o 2FA
            else
               $check = 4;
            
            $query = "SELECT id, id_perfil, nome, email, confirmacao, dois_fatores FROM vakinha.usuario WHERE email = '$dados->email'";
            
            $resposta = mysqli_query($conexao, $query);
            $registro = mysqli_fetch_assoc($resposta);

            $_SESSION["id"] = $registro["id"];
            $_SESSION["id_perfil"] = $registro["id_perfil"];
            $_SESSION["nome"] = $registro["nome"];
            $_SESSION["email"] = $registro["email"];
            $_SESSION["confirmacao"] = $registro["confirmacao"];
            $_SESSION["dois_fatores"] = $registro["dois_fatores"];
            $_SESSION["timestamp"] = time();
         }
      }
   }
   echo json_encode($check);
?>