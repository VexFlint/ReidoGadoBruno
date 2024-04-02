async function criptografar(objetoForm, arquivoPHP){

// Requisição da chave pública do servidor
   
   let publicKey = await fetch("../../php/keys/get_public_key.php", {
      method: "GET"
   });

   publicKey = await publicKey.json();

   let assimetric = new JSEncrypt();

   assimetric.setPublicKey(publicKey);

// Conversão dos dados do formulário para um objeto JS que o PHP interpreta

   let objetoJS = {};

   for (let [chave, valor] of objetoForm.entries()) {
      objetoJS[chave] = valor;
   }
   
   let dataJSON = JSON.stringify(objetoJS);

// Chave secreta e IV gerados aleatoriamente

   let randomSecretKey = CryptoJS.lib.WordArray.random(16).toString();
   let secretKey = CryptoJS.enc.Utf8.parse(randomSecretKey);

   let randomIV = CryptoJS.lib.WordArray.random(8).toString();
   let iv = CryptoJS.enc.Utf8.parse(randomIV);

// Criptografia dos dados com a chave secreta e o IV gerados

   let dataEncrypt = CryptoJS.AES.encrypt(dataJSON, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC
   });

// Conversão da chave secreta e IV para string

   let stringSecretKey = CryptoJS.enc.Utf8.stringify(secretKey);
   let stringIV = CryptoJS.enc.Utf8.stringify(iv);

   let secretKeyJSON = JSON.stringify(stringSecretKey);
   let ivJSON = JSON.stringify(stringIV);

   let secretKeyEncrypt = assimetric.encrypt(secretKeyJSON);
   let ivEncrypt = assimetric.encrypt(ivJSON);

// Envio dos dados, chave secreta e IV criptografados para o servidor

   let contentEncrypt = new FormData();

   contentEncrypt.append("dataEncrypt", dataEncrypt);
   contentEncrypt.append("secretKeyEncrypt", secretKeyEncrypt);
   contentEncrypt.append("ivEncrypt", ivEncrypt);

   let = resposta = await fetch(arquivoPHP,{
      method: "POST",
      body: contentEncrypt
   });   
   
   return resposta.json();
}