<?php

include 'keys/private_key_info.php';

function decrypt_private_key(){

      $arquivo = 'keys/private_key.pem';

      $chave = o590cd82ce88283af();
      $iv = o0ef0016fa42a9efb();
      
      $conteudo = file_get_contents($arquivo);

      $decrypt_private_key = openssl_decrypt($conteudo, 'AES-256-CBC', $chave, null, $iv);

      file_put_contents($arquivo, $decrypt_private_key);
}

function encrypt_private_key(){

   $arquivo = 'keys/private_key.pem';

   $chave = o590cd82ce88283af();
   $iv = o0ef0016fa42a9efb();

   $conteudo = file_get_contents($arquivo);

   $encrypt_private_key = openssl_encrypt($conteudo, 'AES-256-CBC', $chave, null, $iv);

   file_put_contents($arquivo, $encrypt_private_key);
}

?>
