<?php

   include 'keys/get_private_key.php';

// Descriptografar dados

   function descriptografar_dados($dataEncrypt, $secretKeyEncrypt, $ivEncrypt){

      decrypt_private_key(); // Momento da descriptografia da chave privada    

      $secretKey = descriptografar_chave($secretKeyEncrypt);
      $iv = descriptografar_iv($ivEncrypt);
      
      $decrypted = openssl_decrypt(
         $dataEncrypt,
         'aes-256-cbc',
         $secretKey,
         null,
         $iv
      );

      $dataDecrypt = json_decode($decrypted);

      encrypt_private_key(); // Momento da criptografia da chave privada

      return $dataDecrypt;
   }

// Descriptografar a chave secreta
   function descriptografar_chave($contentEncrypt){
      
      $contentPrivateKey = file_get_contents("keys/private_key.pem");
      $privateKey = openssl_pkey_get_private($contentPrivateKey);

      $secretKeyEncrypt = base64_decode($contentEncrypt);

      openssl_private_decrypt($secretKeyEncrypt, $secretKeyDecrypt, $privateKey);

      $secretKey = json_decode($secretKeyDecrypt);
      
      return $secretKey;
   }

// Descriptografar o IV
   function descriptografar_iv($contentEncrypt){

      $contentPrivateKey = file_get_contents("keys/private_key.pem");
      $privateKey = openssl_pkey_get_private($contentPrivateKey);

      $ivEncrypt = base64_decode($contentEncrypt);

      openssl_private_decrypt($ivEncrypt, $ivDecrypt, $privateKey);

      $iv = json_decode($ivDecrypt);
      
      return $iv;
   }

?>