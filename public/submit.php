<?php
// Handles the two forms on the site: the contact form and the newsletter signup.

// --- Prevent any output before headers ---
if (ob_get_level() === 0) {
    ob_start();
}

// --- Set JSON header FIRST, before anything else ---
header('Content-Type: application/json; charset=utf-8', true);

// --- Error handling: Ensure JSON responses even on fatal errors ---
register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== null && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        while (ob_get_level() > 0) {
            ob_end_clean();
        }
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8', true);
        echo json_encode(['error' => 'Server error occurred. Please try again later.']);
        exit;
    }
});

// --- CORS ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = [
    'http://localhost:3000',
    'https://prime-hive.com',
    'https://www.prime-hive.com',
];
if ($origin && in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- Timezone ---
date_default_timezone_set('Asia/Kolkata');
mb_internal_encoding('UTF-8');

// --- Helpers ---
function v(string $key, string $default = ''): string
{
    return isset($_POST[$key]) ? trim((string) $_POST[$key]) : $default;
}
function clean(?string $s): string
{
    return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}
function required(array $arr): ?string
{
    foreach ($arr as $k => $label) {
        if (!isset($_POST[$k]) || $_POST[$k] === '')
            return "$label is required";
    }
    return null;
}
function sendJsonError($message, $code = 422)
{
    while (ob_get_level() > 0) {
        ob_end_clean();
    }
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8', true);
    echo json_encode(['error' => $message]);
    exit;
}

// --- Parse JSON body (frontend sends JSON) ---
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    if ($raw !== false && $raw !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $_POST = array_merge($_POST, $decoded);
        }
    }
}

// --- Autoload ---
// mailer.php owns both the .env reader and the PHPMailer lookup, so this endpoint
// and mpurse.php always agree on where credentials and the vendor folder live.
require_once __DIR__ . '/api/mailer.php';
$autoloadPath = ne_find_autoload();
if ($autoloadPath === null) {
    sendJsonError('Server configuration error: PHPMailer not found.', 500);
}
require $autoloadPath;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// --- Request validation ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonError('Only POST allowed.', 405);
}

$formType = strtolower(v('formType'));
if (!in_array($formType, ['contact', 'newsletter'], true)) {
    sendJsonError('Invalid formType.', 400);
}

// --- Field validation per form type ---
if ($formType === 'newsletter') {
    if ($msg = required(['email' => 'Email'])) {
        sendJsonError($msg, 422);
    }
} else {
    if (
        $msg = required([
            'fullName' => 'Full name',
            'email' => 'Email address',
            'mobileNumber' => 'Mobile number',
            'service' => 'Service',
        ])
    ) {
        sendJsonError($msg, 422);
    }
    $mobileDigits = preg_replace('/[^0-9]/', '', v('mobileNumber'));
    if (strlen($mobileDigits) < 10) {
        sendJsonError('Please enter a valid mobile number.', 422);
    }
}

$email = v('email');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonError('Invalid email address.', 422);
}

$name = $formType === 'contact' ? v('fullName') : v('name');
$phone = v('mobileNumber');

// --- SMTP CONFIG (from public/api/.env, never hard-coded in this file) ---
$smtpHost = ne_env('SMTP_HOST');
$smtpUser = ne_env('SMTP_USER', 'info@prime-hive.com');
$smtpPass = ne_env('SMTP_PASS');
$smtpPort = (int) ne_env('SMTP_PORT', '465');
$smtpSecure = strtolower(ne_env('SMTP_SECURE', 'smtps'));

$notifyEmail = ne_env('ORDER_NOTIFY_EMAIL', 'info@prime-hive.com');
$toAddresses = [[$notifyEmail, 'Prime Hive']];
$fromEmail = $smtpUser;
$fromName = 'Prime Hive';

// --- Brand styling ---
$brandName = 'Prime Hive';
$tagline = 'Business support services by TANIKSHA ENTERPRISES.';
$border = '#e5e7eb';

// --- Subject ---
if ($formType === 'newsletter') {
    $subject = "New Newsletter Signup – " . clean($email) . " – Prime Hive";
} else {
    $subject = "New Contact Inquiry – " . clean($name) . " – Prime Hive";
}

// --- Dynamic content per form type ---
if ($formType === 'newsletter') {
    $sectionTitle = 'Newsletter Subscription';
    $details = '<p><strong>Email:</strong> ' . clean($email) . '</p>';
} else {
    $sectionTitle = 'Contact Form Submission';
    $details = '';
    $details .= '<p><strong>Full Name:</strong> ' . clean($name) . '</p>';
    $details .= '<p><strong>Email:</strong> ' . clean($email) . '</p>';
    $details .= '<p><strong>Mobile Number:</strong> ' . clean($phone) . '</p>';
    $details .= '<p><strong>Service:</strong> ' . clean(v('service')) . '</p>';
    if (v('message') !== '') {
        $details .= '<p><strong>Message:</strong><br>' . nl2br(clean(v('message'))) . '</p>';
    }
}

$mainContent = '
    <tr>
      <td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:#0a2540;">' . $sectionTitle . '</td></tr>
          <tr><td style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">' . $details . '</td></tr>
        </table>
      </td>
    </tr>';

// --- HTML email template (Outlook-safe) ---
ob_start(); ?>
<!DOCTYPE html>
<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?= clean($subject) ?></title>
    <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      <o:AllowPNG/>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #f9fafb;
            -webkit-text-size-adjust: none;
            text-size-adjust: none;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            display: block;
            line-height: 0;
        }

        @media (max-width:600px) {
            .stack-column {
                display: block !important;
                width: 100% !important;
            }
        }
    </style>
</head>

<body style="margin:0;padding:0;background:#f9fafb;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
        <tr>
            <td align="center" style="padding:30px 10px;">
                <table width="600" cellpadding="0" cellspacing="0" border="0" role="presentation"
                    style="width:600px;max-width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                    <tr>
                        <td align="center" style="padding:30px 10px 20px;">
                            <h1
                                style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#0a2540;font-weight:700;">
                                <?= clean($brandName) ?>
                            </h1>
                            <p
                                style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b7280;">
                                <?= clean($tagline) ?>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:1px;background:#e5e7eb;"></td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:20px;">
                            <p
                                style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:600;color:#0a2540;">
                                <?= clean($subject) ?>
                            </p>
                            <p
                                style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;">
                                Received at <?= date('Y-m-d H:i:s') ?> (server time)</p>
                        </td>
                    </tr>

                    <?= $mainContent ?>

                    <tr>
                        <td align="center"
                            style="padding:14px 20px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;">
                            This email was generated from the <strong><?= clean($brandName) ?></strong> website.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
<?php
$html = ob_get_clean();

// --- Alt text ---
$alt = strip_tags($subject) . "\n\n";
if ($formType === 'newsletter') {
    $alt .= "Email: " . $email . "\n";
} else {
    $alt .= "Name: " . $name . "\n";
    $alt .= "Email: " . $email . "\n";
    $alt .= "Mobile: " . $phone . "\n";
    $alt .= "Service: " . v('service') . "\n";
    if (v('message') !== '') {
        $alt .= "Message: " . strip_tags(v('message')) . "\n";
    }
}

// --- Send Email ---
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = $smtpSecure === 'tls' ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $smtpPort;
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';

    $mail->setFrom($fromEmail, $fromName);
    foreach ($toAddresses as [$addr, $nm])
        $mail->addAddress($addr, $nm);
    $mail->addReplyTo($email, $name !== '' ? $name : $email);

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $html;
    $mail->AltBody = $alt;
    $mail->send();

    // --- Auto-reply to the person who wrote in ---
    try {
        $mail->clearAllRecipients();
        $mail->clearAttachments();
        $mail->clearReplyTos();
        $mail->clearCCs();
        $mail->clearBCCs();

        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($email, $name !== '' ? $name : $email);

        $customerName = $name !== '' ? clean($name) : 'there';
        if ($formType === 'newsletter') {
            $mail->Subject = "Thanks for subscribing – $brandName";
            $autoReplyHtml = "
                    <div style='font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
                        <p style='font-size: 16px; color: #333; margin-bottom: 16px;'>Hi " . $customerName . ",</p>
                        <p style='font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 16px;'>
                            Thanks for subscribing to <strong>$brandName</strong>. You will receive updates and news from us.
                        </p>
                        <br>
                        <p style='font-size: 15px; color: #333; margin-top: 24px;'>
                            Regards,<br>
                            <strong>$brandName Team</strong>
                        </p>
                    </div>
                ";
            $mail->AltBody = "Hi " . $customerName . ",\n\nThanks for subscribing to $brandName. You will receive updates and news from us.\n\nRegards,\n$brandName Team";
        } else {
            $mail->Subject = "Thanks for contacting $brandName";
            $autoReplyHtml = "
                    <div style='font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
                        <p style='font-size: 16px; color: #333; margin-bottom: 16px;'>Hi " . $customerName . ",</p>
                        <p style='font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 16px;'>
                            Thanks for reaching out to <strong>$brandName</strong>. Our team has received your details and will contact you shortly.
                        </p>
                        <p style='font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 16px;'>
                            If it's urgent, feel free to reply to this email.
                        </p>
                        <br>
                        <p style='font-size: 15px; color: #333; margin-top: 24px;'>
                            Regards,<br>
                            <strong>$brandName Team</strong>
                        </p>
                    </div>
                ";
            $mail->AltBody = "Hi " . $customerName . ",\n\nThanks for reaching out to $brandName. Our team has received your details and will contact you shortly.\n\nIf it's urgent, feel free to reply to this email.\n\nRegards,\n$brandName Team";
        }

        $mail->isHTML(true);
        $mail->Body = $autoReplyHtml;
        $mail->send();
    } catch (Exception $e) {
        error_log('Auto-reply Error: ' . $mail->ErrorInfo);
    }

    while (ob_get_level() > 0) {
        ob_end_clean();
    }
    echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
} catch (Exception $e) {
    error_log('Mailer Error: ' . $mail->ErrorInfo);
    sendJsonError('Failed to send email. Please try again later.', 500);
} catch (Throwable $e) {
    error_log('PHP Error: ' . $e->getMessage());
    sendJsonError('Server error occurred. Please try again later.', 500);
}
