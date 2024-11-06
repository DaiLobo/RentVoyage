import { PropertyTypeEnum } from "@/utils/list";

export const generateEmailHTML = ({
  userName,
  reservationCode,
  accommodationName,
  checkInDate,
  checkOutDate,
  totalPrice,
  reservationLink,
  propertyType
}: {
  userName: string;
  reservationCode: string;
  accommodationName: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: string;
  reservationLink: string;
  propertyType: keyof typeof PropertyTypeEnum;
}) => `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        sup,
        sub {
            font-size: 75%;
            line-height: 0;
        }

        @media (max-width:520px) {

            .desktop_hide table.icons-inner,
            .social_block.desktop_hide .social-table {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .mobile_hide {
                display: none;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
    <!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body"
    style="background-color: #f5f1f0; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f1f0;">
        <tbody>
            <tr>
                <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;"
                                        width="500">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="image_block block-1" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;">
                                                                <div class="alignment" align="start"
                                                                    style="line-height:10px">
                                                                    <div style="max-width: 344px;"><img
                                                                            src="https://0f84208abf.imgdist.com/pub/bfra/50epkufc/otv/63f/9bo/logo_h_small.png"
                                                                            style="display: block; height: auto; border: 0; width: 100%;"
                                                                            width="444" alt title height="auto"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                        cellspacing="0" role="presentation"
                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px; margin: 0 auto;"
                                        width="500">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%"
                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div class="spacer_block block-1"
                                                        style="height:40px;line-height:60px;font-size:1px;">&#8202;
                                                    </div>
                                                    <table class="heading_block block-2" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <h3
                                                                    style="margin: 0; color: #1e0e4b; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 28.799999999999997px;">
                                                                    <span class="tinyMce-placeholder"
                                                                        style="word-break: break-word;">Olá, ${userName}! Sua reserva está confirmada!
                                                                    </span>
                                                                </h3>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div class="spacer_block block-3"
                                                        style="height:15px;line-height:15px;font-size:1px;">&#8202;
                                                    </div>
                                                    <table class="divider_block block-4" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        role="presentation" width="100%"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="divider_inner"
                                                                                style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
                                                                                <span
                                                                                    style="word-break: break-word;">&#8202;</span>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div class="spacer_block block-5"
                                                        style="height:30px;line-height:30px;font-size:1px;">&#8202;
                                                    </div>
                                                    <table class="paragraph_block block-6" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:140%;text-align:left;mso-line-height-alt:19.2px;">
                                                                    <p style="margin: 0px 0px 10px;">
                                                                      Obrigado pela sua reserva!
                                                                    </p>
                                                                    <p style="margin: 0; margin-bottom: 16px;">
                                                                      Sua reserva foi confirmada com sucesso em nossa plataforma.
                                                                      Agradecemos por escolher nosso serviço e estamos ansiosos para recebê-lo. 
                                                                      Nossa equipe está preparando tudo para garantir que sua estadia seja confortável e agradável. 
                                                                      Enquanto isso, você pode revisar os detalhes da propriedade e as instruções de check-in para que sua chegada seja tranquila e sem complicações!
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-7" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                    <p style="margin: 0; margin-bottom: 16px;">✔️ Seu
                                                                        pagamento já foi processado</p>
                                                                    <p style="margin: 0;">✔️ Faça alterações ou cancele
                                                                        até 1 semanas antes da data de reserva</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="html_block block-8" width="100%" border="0"
                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;"
                                                                    align="center">
                                                                    <html>

                                                                    <head>
                                                                        <meta />
                                                                        <meta
                                                                            content="width=device-width, initial-scale=1.0" />
                                                                        <style>
                                                                            body {
                                                                                font-family: Arial, sans-serif;
                                                                                margin: 0;
                                                                                padding: 0;
                                                                                background-color: #f4f4f4;
                                                                            }

                                                                            .container {
                                                                                width: 100%;
                                                                                max-width: 600px;
                                                                                margin: 0 auto;
                                                                                background-color: #fff;
                                                                                padding: 20px;
                                                                            }

                                                                            .header {
                                                                                text-align: center;
                                                                            }

                                                                            .header img {
                                                                                width: 150px;
                                                                                height: auto;
                                                                            }

                                                                            .divider {
                                                                                border-top: 1px solid #ddd;
                                                                                margin: 20px 0;
                                                                            }

                                                                            .content {
                                                                                display: flex;
                                                                                justify-content: space-between;
                                                                                align-items: center;
                                                                                padding: 0px 0;
                                                                                gap: 10px;
                                                                            }

                                                                            .content img {
                                                                                width: 180px;
                                                                                height: 133px;
                                                                            }

                                                                            .details {
                                                                                width: 65%;
                                                                                text-align: left;
                                                                                gap: 8px;
                                                                            }

                                                                            .details h2 {
                                                                                color: #333;
                                                                                margin-bottom: 10px;
                                                                            }

                                                                            .details p {
                                                                                margin: 5px 0;
                                                                                color: #666;
                                                                            }

                                                                            .cta {
                                                                                text-align: center;
                                                                                margin-top: 40px;
                                                                            }

                                                                            .cta a {
                                                                                background-color: #007489;
                                                                                color: white;
                                                                                padding: 10px 20px;
                                                                                text-decoration: none;
                                                                                border-radius: 5px;
                                                                            }

                                                                            .footer {
                                                                                text-align: center;
                                                                                margin-top: 30px;
                                                                                font-size: 12px;
                                                                                color: #666;
                                                                            }

                                                                            .social-icons {
                                                                                margin-top: 20px;
                                                                            }

                                                                            .social-icons img {
                                                                                width: 30px;
                                                                                margin: 0 5px;
                                                                            }

                                                                            @media (max-width: 600px) {
                                                                                .content {
                                                                                    flex-direction: column;
                                                                                    text-align: center;
                                                                                }

                                                                                .details {
                                                                                    width: 100%;
                                                                                }
                                                                            }
                                                                        </style>
                                                                    </head>

                                                                    <div class="container">

                                                                        <div class="content">
                                                                            <img src="https://firebasestorage.googleapis.com/v0/b/rent-voyage.appspot.com/o/e-mail.png?alt=media&amp;token=a95e8b1c-cb40-40c6-b8fc-09b05b9d2185"
                                                                                alt="Ilustração da propriedade" />
                                                                            <div class="details">
                                                                                <h3>Detalhes da sua reserva:</h3>
                                                                                <p><strong>Código da reserva:</strong> ${reservationCode}</p>
                                                                                <p><strong>Acomodação:</strong> ${PropertyTypeEnum[propertyType]}</p>
                                                                                <p><strong>Data de Chegada:</strong> ${checkInDate}</p>
                                                                                <p><strong>Data de Partida:</strong> ${checkOutDate}</p>
                                                                                <p><strong>Check-in:</strong> 14h</p>
                                                                                <p><strong>Check-out:</strong> 11h</p>
                                                                                <p><strong>Valor total:</strong> R$${totalPrice}
                                                                                </p>
                                                                            </div>
                                                                        </div>


                                                                        <div class="cta">
                                                                            <a href=${reservationLink}>Ver detalhes da
                                                                                reserva</a>
                                                                        </div>
                                                                    </div>

                                                                    </html>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-9" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#444a5b;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                    <p style="margin: 0; margin-bottom: 16px;">&nbsp;
                                                                    </p>
                                                                    <p dir="ltr"
                                                                        style="margin: 0; margin-bottom: 16px;">
                                                                        Aguardamos sua chegada aqui em <strong>${accommodationName}</strong> e obrigado por ter
                                                                        nos escolhido!</p>
                                                                    <p dir="ltr"
                                                                        style="margin: 0; margin-bottom: 16px;">
                                                                        Atenciosamente,</p>
                                                                    <p dir="ltr" style="margin: 0;">${accommodationName}.</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <div class="spacer_block block-10"
                                                        style="height:30px;line-height:30px;font-size:1px;">&#8202;
                                                    </div>
                                                    
                                                    <table class="social_block block-11" width="100%" border="0"
                                                        cellpadding="10" cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <table class="social-table" width="144px" border="0"
                                                                        cellpadding="0" cellspacing="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                                                        <tr>
                                                                            <td style="padding:0 2px 0 2px;"><a
                                                                                    href="https://www.facebook.com/"
                                                                                    target="_blank"><img
                                                                                        src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/facebook@2x.png"
                                                                                        width="32" height="auto"
                                                                                        alt="Facebook" title="facebook"
                                                                                        style="display: block; height: auto; border: 0;"></a>
                                                                            </td>
                                                                            <td style="padding:0 2px 0 2px;"><a
                                                                                    href="https://www.twitter.com/"
                                                                                    target="_blank"><img
                                                                                        src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/twitter@2x.png"
                                                                                        width="32" height="auto"
                                                                                        alt="Twitter" title="twitter"
                                                                                        style="display: block; height: auto; border: 0;"></a>
                                                                            </td>
                                                                            <td style="padding:0 2px 0 2px;"><a
                                                                                    href="https://www.instagram.com/"
                                                                                    target="_blank"><img
                                                                                        src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png"
                                                                                        width="32" height="auto"
                                                                                        alt="Instagram"
                                                                                        title="instagram"
                                                                                        style="display: block; height: auto; border: 0;"></a>
                                                                            </td>
                                                                            <td style="padding:0 2px 0 8px;"><a
                                                                                    href="https://github.com/DaiLobo/RentVoyage"
                                                                                    target="_blank"><img
                                                                                        src="https://0f84208abf.imgdist.com/pub/bfra/50epkufc/2v8/iki/p0v/09f6507d-6caf-4345-85d2-eeed63923ee7.png"
                                                                                        width="22" height="auto"
                                                                                        alt="Custom" title="Custom"
                                                                                        style="display: block; height: auto; border: 0;"></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table><!-- End -->
</body>

</html>`;
