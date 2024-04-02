<?php

   $publicKey = file_get_contents("public_key.pem");
   echo json_encode($publicKey);

?>