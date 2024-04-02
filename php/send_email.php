<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;


function enviar_email($email, $tipo){
    
    require 'PHPMailer-master/src/Exception.php'; 
    require 'PHPMailer-master/src/PHPMailer.php';
    require 'PHPMailer-master/src/SMTP.php';
    include "connection.php";

    $mail = new PHPMailer();
    
    // Configuração
    $mail->Mailer = "smtp";
    $mail->IsSMTP(); 
	$mail->CharSet = 'UTF-8';  
    $mail->SMTPDebug = 0;   
	$mail->SMTPAuth = true;     
	$mail->SMTPSecure = 'ssl'; 
    $mail->Host = 'smtp.gmail.com'; 
	$mail->Port = 465;

    // Detalhes do envio de E-mail
	$mail->Username = 'vakinha.solidaria.doacao@gmail.com'; 
	$mail->Password = "lhknwhuvollvpqfl";
	$mail->SetFrom('vakinha.solidaria.doacao@gmail.com', 'Vakinha Solidária');
    $mail->addAddress($email);

    if ($tipo == 1){        // Validação do cadastro com hash do e-mail

	    $mail->Subject = "Verificação de Cadastro";

        $hash_email = hash("sha512", $email, false);

        $query = "UPDATE vakinha.usuario SET token = '$hash_email' WHERE email = '$email'";
        $resposta = mysqli_query($conexao, $query);

        $link = "http://localhost/html/pages/validation.html?key=" . $hash_email;
        $mensagem = "<b>Clique no link abaixo para validar seu acesso:</b><br><br>";
        $mensagem .= "<a href=\"$link\">Validar cadastro</a>";
    }
    
    else if ($tipo == 2){   // Redefinição de senha com token único

        $mail->Subject = "Redefinição de Senha";

        do{
            $token = rand(100000, 999999); // Temporário

            $query = "SELECT * FROM vakinha.usuario WHERE token = '$token' AND email = '$email'";
            $resposta = mysqli_query($conexao, $query);
            $resultado = mysqli_num_rows($resposta);
        }
        while($resultado != 0);
        
        $hash_token = hash("sha512", $token, false);

        $query = "UPDATE vakinha.usuario SET token = '$hash_token' WHERE email = '$email'";
        $resposta = mysqli_query($conexao, $query);

        $mensagem = "<b>Insira o código abaixo para redefinir sua senha:</b><br><br>";
        $mensagem .= "Código: " . $token;
    }

    $mail->msgHTML($mensagem);
    $mail->send();
}

function enviar_mensagem($email, $nome, $assunto, $mensagem){
    
    require 'PHPMailer-master/src/Exception.php'; 
    require 'PHPMailer-master/src/PHPMailer.php';
    require 'PHPMailer-master/src/SMTP.php';
    include "connection.php";

    $mail = new PHPMailer();
    
    // Configuração
    $mail->Mailer = "smtp";
    $mail->IsSMTP(); 
	$mail->CharSet = 'UTF-8';  
    $mail->SMTPDebug = 0;   
	$mail->SMTPAuth = true;     
	$mail->SMTPSecure = 'ssl'; 
    $mail->Host = 'smtp.gmail.com'; 
	$mail->Port = 465;

    // Detalhes do envio de E-mail
	$mail->Username = 'vakinha.solidaria.doacao@gmail.com'; 
	$mail->Password = "lhknwhuvollvpqfl";
	$mail->SetFrom('vakinha.solidaria.doacao@gmail.com', 'Vakinha Solidária');
    $mail->addAddress('contato.vakinha.solidaria.doacao@gmail.com');

    $mail->Subject = $assunto;

    $mensagem = "<b>Nome: </b>" . $nome . "<br>";
    $mensagem .= "<b>E-mail: </b>" . $email . "<br><br>";
    $mensagem .= $mensagem;

    $mail->msgHTML($mensagem);
    $mail->send();
}

?>