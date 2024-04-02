<?php

   include "decrypted.php";
   include "connection.php";
   include "code_sms.php";

   if ($_SERVER["REQUEST_METHOD"] == "POST") {

      $cod_sms = $_SESSION["cod_sms"];
      $email = $_SESSION["email"];
      $dados = descriptografar_dados($_POST['dataEncrypt'], $_POST['secretKeyEncrypt'], $_POST['ivEncrypt']);

      if ($cod_sms == $dados->code_hash) {

         $query = "UPDATE usuario SET dois_fatores = true, data_dois_fatores = current_date() WHERE email = '$email'";
         $resposta = mysqli_query($conexao, $query);

         if ($resposta == true) {
            echo json_encode(3); // DOIS FATORES VALIDADO COM SUCESSO
            session_destroy();
         } else
            echo json_encode(2); // ERRO AO TENTAR VALIDAR O DOIS FATORES
      }
      else
         echo json_encode(1); // DOIS FATORES INVÁLIDO
   }

   else if ($_SERVER["REQUEST_METHOD"] == "GET"){

      $email = $_SESSION["email"];
      $telefone = $_SESSION["telefone"];

      if (array_key_exists("email", $_SESSION) == true && array_key_exists("telefone", $_SESSION) == true) {
         
         $cod_sms = gerar_codigo_sms();

         $contaSID = 'AC8c4a105119161213decfa5c430edadf2';
         $authToken = '8e9f0c1accad580cbce5f2e91b28328f';
         $origem = '+15855523549';
         $destinatario = "+$telefone";
         $mensagem = "Código de verificação dois fatores: $cod_sms";
         $url = "https://api.twilio.com/2010-04-01/Accounts/$contaSID/Messages.json";
         

         $cabecalho = array(
            'Authorization: Basic ' . base64_encode("{$contaSID}:{$authToken}"),
            'Content-Type: application/x-www-form-urlencoded'
         );
         $dados = http_build_query(array(
            'From' => $origem,
            'To' => $destinatario,
            'Body' => $mensagem
         ));

         // Iniciando a sessão curl
         $curl = curl_init();

         curl_setopt($curl, CURLOPT_URL, $url);
         curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
         curl_setopt($curl, CURLOPT_POST, true);
         curl_setopt($curl, CURLOPT_POSTFIELDS, $dados);
         curl_setopt($curl, CURLOPT_HTTPHEADER, $cabecalho);

         $resposta = curl_exec($curl);

         if(curl_errno($curl))
            echo json_encode("Error SMS"); // ERRO AO TENTAR ENVIAR O CÓDIGO SMS
         else
            echo json_encode("Sucess SMS"); // CÓDIGO SMS ENVIADO COM SUCESSO
      }
      else
         echo json_encode("Fault SMS"); // EMAIL E/OU TELEFONE NÃO ESTÃO NA SESSÃO PHP
   }
?>