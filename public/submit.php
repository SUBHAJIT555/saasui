<?php
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
    'http://localhost:5173',
    'https://cyberlabs-india.com',
    'https://www.cyberlabs-india.com',
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
// Content-Type already set above

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
$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    sendJsonError('Server configuration error: PHPMailer not found.', 500);
}
require $autoloadPath;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// --- Helpers ---
function v(string $key, string $default = ''): string
{
    return isset($_POST[$key]) ? trim((string) $_POST[$key]) : $default;
}
function clean(?string $s): string
{
    return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}
function firstNonEmpty(array $keys): string
{
    foreach ($keys as $key) {
        $value = v($key);
        if ($value !== '') {
            return $value;
        }
    }
    return '';
}
function required(array $arr): ?string
{
    foreach ($arr as $k => $label) {
        if (!isset($_POST[$k]) || $_POST[$k] === '')
            return "$label is required";
    }
    return null;
}
function buildFullName(string $first, string $middle, string $last): string
{
    $parts = array_filter([trim($first), trim($middle), trim($last)], static function ($part) {
        return $part !== '';
    });
    return implode(' ', $parts);
}
function genderLabel(string $gender): string
{
    if ($gender === 'he') {
        return 'He';
    }
    if ($gender === 'she') {
        return 'She';
    }
    return $gender;
}
function formatSubmittedDateTime(string $iso): string
{
    if ($iso === '') {
        return '—';
    }
    $ts = strtotime($iso);
    if ($ts === false) {
        return $iso;
    }
    return date('F j, Y g:i A', $ts) . ' IST';
}

// --- Request validation ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    if (ob_get_level() > 0) {
        ob_end_clean();
    }
    http_response_code(405);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Only POST allowed.']);
    exit;
}

$formTypeRaw = v('formType');
$formType = strtolower($formTypeRaw);
if (!in_array($formType, ['contact', 'request-callback', 'newsletter', 'callback-modal', 'enrollment-modal', 'bootcamp-enrollment', 'webinar-registration'], true)) {
    if (ob_get_level() > 0) {
        ob_end_clean();
    }
    http_response_code(400);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Invalid formType.']);
    exit;
}

// --- Helper function to send JSON error response ---
function sendJsonError($message, $code = 422) {
    while (ob_get_level() > 0) {
        ob_end_clean();
    }
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8', true);
    echo json_encode(['error' => $message]);
    exit;
}

// --- Field validation per form type ---
if ($formType === 'newsletter') {
    if ($msg = required(['email' => 'Email'])) {
        sendJsonError($msg, 422);
    }
} elseif ($formType === 'contact') {
    if (
        $msg = required([
            'fullName' => 'Full name',
            'email' => 'Email address',
            'mobileNumber' => 'Mobile number',
            'currentBackground' => 'Current background',
            'yearsOfExperience' => 'Years of experience',
            'preferredTime' => 'Preferred time for call',
        ])
    ) {
        sendJsonError($msg, 422);
    }
    if (v('programOfInterest') === '' && v('bootCampOfInterest') === '') {
        sendJsonError('Please select at least one program or boot camp.', 422);
    }
    $mobile = v('mobileNumber');
    $mobileDigits = preg_replace('/[^0-9]/', '', $mobile);
    if (strlen($mobileDigits) < 10) {
        sendJsonError('Please enter a valid mobile number.', 422);
    }
} elseif ($formType === 'request-callback') {
    if (
        $msg = required([
            'fullName' => 'Full name',
            'email' => 'Email address',
            'mobileNumber' => 'Mobile number',
            'currentBackground' => 'Current background',
            'yearsOfExperience' => 'Years of experience',
            'preferredTime' => 'Preferred time for call',
        ])
    ) {
        sendJsonError($msg, 422);
    }
    if (v('programOfInterest') === '' && v('bootCampOfInterest') === '') {
        sendJsonError('Please select at least one program or boot camp.', 422);
    }
    $mobile = v('mobileNumber');
    $mobileDigits = preg_replace('/[^0-9]/', '', $mobile);
    if (strlen($mobileDigits) < 10) {
        sendJsonError('Please enter a valid mobile number.', 422);
    }
} elseif ($formType === 'callback-modal') {
    if (
        $msg = required([
            'name' => 'Name',
            'email' => 'Email address',
            'phone' => 'Phone number',
            'callbackTime' => 'Preferred callback time',
        ])
    ) {
        sendJsonError($msg, 422);
    }
    if (v('enquiryFor') === '' && v('bootCampOfInterest') === '') {
        sendJsonError('Please select at least one program or boot camp.', 422);
    }
    $phoneDigits = preg_replace('/[^0-9]/', '', v('phone'));
    if (strlen($phoneDigits) < 10) {
        sendJsonError('Please enter a valid phone number.', 422);
    }
} elseif ($formType === 'enrollment-modal' || $formType === 'bootcamp-enrollment') {
    if (
        $msg = required([
            'fullName' => 'Full name',
            'email' => 'Email address',
            'phoneNumber' => 'Phone number',
            'age' => 'Age',
            'gender' => 'Gender',
            'occupation' => 'Occupation',
            'preferredCallTime' => 'Preferred call time',
            'address' => 'Address',
            'collegeSchool' => 'College/School',
            'graduationYear' => 'Graduation year',
        ])
    ) {
        sendJsonError($msg, 422);
    }
    // Phone validation
    $phoneDigits = preg_replace('/[^0-9]/', '', v('phoneNumber'));
    if (strlen($phoneDigits) < 10) {
        sendJsonError('Please enter a valid phone number.', 422);
    }
    // Age validation
    $age = (int)v('age');
    if ($age < 13 || $age > 100) {
        sendJsonError('Age must be between 13 and 100.', 422);
    }
    // Email validation
    $email = v('email');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonError('Invalid email address.', 422);
    }
} elseif ($formType === 'webinar-registration') {
    if (
        $msg = required([
            'firstName' => 'First name',
            'lastName' => 'Last name',
            'gender' => 'Gender',
            'email' => 'Email address',
            'mobile' => 'Mobile number',
            'background' => 'Current background',
            'yearsOfExperience' => 'Years of experience',
            'preferredCallDateTime' => 'Preferred date and time for call',
            'webinarId' => 'Webinar',
            'webinarTopic' => 'Webinar topic',
            'webinarScheduledAt' => 'Webinar schedule',
        ])
    ) {
        sendJsonError($msg, 422);
    }
    $mobileDigits = preg_replace('/[^0-9]/', '', v('mobile'));
    if (strlen($mobileDigits) < 10) {
        sendJsonError('Please enter a valid mobile number.', 422);
    }
    $years = (int) v('yearsOfExperience');
    if ($years < 0 || $years > 60) {
        sendJsonError('Years of experience must be between 0 and 60.', 422);
    }
    if (!in_array(v('gender'), ['he', 'she'], true)) {
        sendJsonError('Please select a valid gender option.', 422);
    }
}

// --- Email validation (only when form has email) ---
if (in_array($formType, ['newsletter', 'contact', 'request-callback', 'callback-modal', 'enrollment-modal', 'bootcamp-enrollment', 'webinar-registration'], true)) {
    $email = v('email');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonError('Invalid email address.', 422);
    }
}

// --- Capture values (unified name/phone/email per form type) ---
if ($formType === 'webinar-registration') {
    $name = buildFullName(v('firstName'), v('middleName'), v('lastName'));
    $phone = v('mobile');
} elseif (in_array($formType, ['contact', 'request-callback', 'enrollment-modal', 'bootcamp-enrollment'], true)) {
    $name = v('fullName');
    $phone = in_array($formType, ['contact', 'request-callback'], true) ? v('mobileNumber') : v('phoneNumber');
} else {
    $name = v('name');
    $phone = v('phone');
}
$email = v('email');
$serverip = $_SERVER['HTTP_X_FORWARDED_FOR']
    ?? $_SERVER['HTTP_CLIENT_IP']
    ?? $_SERVER['REMOTE_ADDR']
    ?? '';

$utm_source = v('utm_source');
$utm_medium = v('utm_medium');
$utm_campaign = v('utm_campaign');
$utm_term = v('utm_term');
$utm_content = v('utm_content');



// --- SMTP CONFIG (replace with your CYBERLABS India SMTP) ---
$smtpHost = 'box2368.bluehost.com';
$smtpUser = 'admin@cyberlabs-india.com';
$smtpPass = 'Admin@Cyberlabs@9474';
$smtpPort = 465;
$smtpSecure = 'smtps';

$toAddresses = [['subhajit@baharnani.com', 'CYBERLABS INDIA']];
$fromEmail = $smtpUser;
$fromName = 'CYBERLABS INDIA';


// --- Brand styling ---
$brandName = 'CYBERLABS INDIA';
$tagline = 'Israeli-led Cyber Defense Training in India.';
$brandColor = '#0a2540';
$muted = '#6b7280';
$bg = '#f9fafb';
$cardBg = '#ffffff';
$border = '#e5e7eb';

// --- Subject ---
switch ($formType) {
    case 'contact':
        $subject = "New Contact Inquiry – " . clean($name) . " – CYBERLABS India";
        break;
    case 'request-callback':
        $subject = "New Request Callback – " . clean($name) . " – CYBERLABS India";
        break;
    case 'newsletter':
        $subject = "New Newsletter Signup – " . clean($email) . " – CYBERLABS India";
        break;
    case 'callback-modal':
        $subject = "New Callback Request – " . clean($name) . " – CYBERLABS India";
        break;
    case 'enrollment-modal':
        $subject = "New Program Enrollment – " . clean($name) . " – CYBERLABS India";
        break;
    case 'bootcamp-enrollment':
        $subject = "New Boot Camp Enrollment – " . clean($name) . " – CYBERLABS India";
        break;
    case 'webinar-registration':
        $subject = "New Webinar Registration – " . clean(v('webinarTopic')) . " – " . clean($name) . " – CYBERLABS India";
        break;
    default:
        $subject = "Form Submission – CYBERLABS India";
        break;
}


// --- Dynamic content per form type ---
$mainContent = '';

if ($formType === 'contact' || $formType === 'request-callback') {
    $details = '';
    $details .= '<p><strong>Full Name:</strong> ' . clean($name) . '</p>';
    $details .= '<p><strong>Email:</strong> ' . clean($email) . '</p>';
    $details .= '<p><strong>Mobile Number:</strong> ' . clean($phone) . '</p>';
    $details .= '<p><strong>Current Background:</strong> ' . clean(v('currentBackground')) . '</p>';
    $details .= '<p><strong>Years of Experience:</strong> ' . clean(v('yearsOfExperience')) . '</p>';
    $details .= '<p><strong>Program of Interest:</strong> ' . (v('programOfInterest') !== '' ? clean(v('programOfInterest')) : '—') . '</p>';
    $details .= '<p><strong>Boot Camp of Interest:</strong> ' . (v('bootCampOfInterest') !== '' ? clean(v('bootCampOfInterest')) : '—') . '</p>';
    $details .= '<p><strong>Preferred Time for Call:</strong> ' . clean(v('preferredTime')) . '</p>';
    if (v('questionsOrGoals') !== '') {
        $details .= '<p><strong>Questions or Goals:</strong><br>' . nl2br(clean(v('questionsOrGoals'))) . '</p>';
    }
    $sectionTitle = $formType === 'contact' ? 'Contact Form Submission' : 'Request Callback Submission';
    $mainContent = '
    <tr>
      <td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:#0a2540;">' . $sectionTitle . '</td></tr>
          <tr><td style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">' . $details . '</td></tr>
        </table>
      </td>
    </tr>';
} elseif ($formType === 'callback-modal') {
    $programLink = firstNonEmpty(['programLink', 'programUrl', 'programSlug']);
    $bootcampLink = firstNonEmpty(['bootcampLink', 'bootcampUrl', 'bootcampSlug']);
    $details = '';
    $details .= '<p><strong>Name:</strong> ' . clean($name) . '</p>';
    $details .= '<p><strong>Email:</strong> ' . clean($email) . '</p>';
    $details .= '<p><strong>Phone:</strong> ' . clean($phone) . '</p>';
    $details .= '<p><strong>Preferred Callback Time:</strong> ' . clean(v('callbackTime')) . '</p>';
    $details .= '<p><strong>Program Enquiry:</strong> ' . (v('enquiryFor') !== '' ? clean(v('enquiryFor')) : '—') . '</p>';
    $details .= '<p><strong>Boot Camp Enquiry:</strong> ' . (v('bootCampOfInterest') !== '' ? clean(v('bootCampOfInterest')) : '—') . '</p>';
    if ($programLink !== '') {
        $details .= '<p><strong>Program Link:</strong> ' . clean($programLink) . '</p>';
    }
    if ($bootcampLink !== '') {
        $details .= '<p><strong>Boot Camp Link:</strong> ' . clean($bootcampLink) . '</p>';
    }
    $mainContent = '
    <tr>
      <td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:#0a2540;">Callback Modal Submission</td></tr>
          <tr><td style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">' . $details . '</td></tr>
        </table>
      </td>
    </tr>';
} elseif ($formType === 'newsletter') {
    $mainContent = '
    <tr>
      <td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:#0a2540;">Newsletter Subscription</td></tr>
          <tr><td style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
            <p><strong>Email:</strong> ' . clean($email) . '</p>
          </td></tr>
        </table>
      </td>
    </tr>';
} elseif ($formType === 'webinar-registration') {
    $details = '';
    $details .= '<p><strong>Webinar Topic:</strong> ' . clean(v('webinarTopic')) . '</p>';
    $details .= '<p><strong>Webinar ID:</strong> ' . clean(v('webinarId')) . '</p>';
    $details .= '<p><strong>Webinar Date &amp; Time:</strong> ' . clean(formatSubmittedDateTime(v('webinarScheduledAt'))) . '</p>';
    $details .= '<p><strong>First Name:</strong> ' . clean(v('firstName')) . '</p>';
    if (v('middleName') !== '') {
        $details .= '<p><strong>Middle Name:</strong> ' . clean(v('middleName')) . '</p>';
    }
    $details .= '<p><strong>Last Name:</strong> ' . clean(v('lastName')) . '</p>';
    $details .= '<p><strong>Gender:</strong> ' . clean(genderLabel(v('gender'))) . '</p>';
    $details .= '<p><strong>Email:</strong> ' . clean($email) . '</p>';
    $details .= '<p><strong>Mobile Number:</strong> ' . clean($phone) . '</p>';
    $details .= '<p><strong>Current Background:</strong> ' . clean(v('background')) . '</p>';
    $details .= '<p><strong>Years of Experience:</strong> ' . clean(v('yearsOfExperience')) . '</p>';
    $details .= '<p><strong>Preferred Call Date &amp; Time:</strong> ' . clean(formatSubmittedDateTime(v('preferredCallDateTime'))) . '</p>';
    if (v('specificQuestion') !== '') {
        $details .= '<p><strong>Specific Question:</strong><br>' . nl2br(clean(v('specificQuestion'))) . '</p>';
    }
    $mainContent = '
    <tr>
      <td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:#0a2540;">Webinar Registration</td></tr>
          <tr><td style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">' . $details . '</td></tr>
        </table>
      </td>
    </tr>';
} elseif ($formType === 'enrollment-modal' || $formType === 'bootcamp-enrollment') {
    $enrollmentLabel = $formType === 'bootcamp-enrollment' ? 'Boot Camp Enrollment Request' : 'Program Enrollment Request';
    $courseLink = firstNonEmpty(['courseLink', 'courseUrl', 'courseSlug']);
    $details = '';
    $details .= '<p><strong>Enrollment Type:</strong> ' . ($formType === 'bootcamp-enrollment' ? 'Elite Boot Camp' : 'Flagship Program') . '</p>';
    $details .= '<p><strong>Full Name:</strong> ' . clean($name) . '</p>';
    $details .= '<p><strong>Email:</strong> ' . clean($email) . '</p>';
    $details .= '<p><strong>Phone Number:</strong> ' . clean($phone) . '</p>';
    if (v('secondaryPhoneNumber') !== '') {
        $details .= '<p><strong>Secondary Phone Number:</strong> ' . clean(v('secondaryPhoneNumber')) . '</p>';
    }
    $details .= '<p><strong>Age:</strong> ' . clean(v('age')) . '</p>';
    $details .= '<p><strong>Gender:</strong> ' . clean(v('gender')) . '</p>';
    $details .= '<p><strong>Occupation:</strong> ' . clean(v('occupation')) . '</p>';
    $details .= '<p><strong>Preferred Call Time:</strong> ' . clean(v('preferredCallTime')) . '</p>';
    $details .= '<p><strong>Address:</strong><br>' . nl2br(clean(v('address'))) . '</p>';
    $details .= '<p><strong>College/School:</strong> ' . clean(v('collegeSchool')) . '</p>';
    $details .= '<p><strong>Graduation Year:</strong> ' . clean(v('graduationYear')) . '</p>';
    if ($courseLink !== '') {
        $details .= '<p><strong>Course Link:</strong> ' . clean($courseLink) . '</p>';
    }
    $mainContent = '
    <tr>
      <td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:#0a2540;">' . $enrollmentLabel . '</td></tr>
          <tr><td style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">' . $details . '</td></tr>
        </table>
      </td>
    </tr>';
} else {
    $mainContent = '
    <tr>
      <td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:#0a2540;">Form Submission</td></tr>
          <tr><td style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
            <p><strong>Email:</strong> ' . clean($email) . '</p>
          </td></tr>
        </table>
      </td>
    </tr>';
}


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

                    <!-- <tr>
                        <td style="padding:0 24px 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                            style="border:1px solid #e5e7eb;border-radius:4px;">
                            <tr>
                                <td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:#0a2540;">
                                Google Sheet Sync Status
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
                                
                                </td>
                            </tr>
                            </table>
                        </td>
                    </tr> -->


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
if ($formType === 'contact' || $formType === 'request-callback') {
    $alt .= "Name: " . $name . "\n";
    $alt .= "Email: " . $email . "\n";
    $alt .= "Phone: " . $phone . "\n";
    $alt .= "Current Background: " . v('currentBackground') . "\n";
    $alt .= "Years of Experience: " . v('yearsOfExperience') . "\n";
    $alt .= "Program of Interest: " . (v('programOfInterest') !== '' ? v('programOfInterest') : '—') . "\n";
    $alt .= "Boot Camp of Interest: " . (v('bootCampOfInterest') !== '' ? v('bootCampOfInterest') : '—') . "\n";
    $alt .= "Preferred Time: " . v('preferredTime') . "\n";
    if (v('questionsOrGoals') !== '')
        $alt .= "Questions or Goals: " . strip_tags(v('questionsOrGoals')) . "\n";
} elseif ($formType === 'callback-modal') {
    $programLink = firstNonEmpty(['programLink', 'programUrl', 'programSlug']);
    $bootcampLink = firstNonEmpty(['bootcampLink', 'bootcampUrl', 'bootcampSlug']);
    $alt .= "Name: " . $name . "\n";
    $alt .= "Email: " . $email . "\n";
    $alt .= "Phone: " . $phone . "\n";
    $alt .= "Callback Time: " . v('callbackTime') . "\n";
    $alt .= "Program Enquiry: " . (v('enquiryFor') !== '' ? v('enquiryFor') : '—') . "\n";
    $alt .= "Boot Camp Enquiry: " . (v('bootCampOfInterest') !== '' ? v('bootCampOfInterest') : '—') . "\n";
    if ($programLink !== '') {
        $alt .= "Program Link: " . $programLink . "\n";
    }
    if ($bootcampLink !== '') {
        $alt .= "Boot Camp Link: " . $bootcampLink . "\n";
    }
} elseif ($formType === 'newsletter') {
    $alt .= "Email: " . $email . "\n";
} elseif ($formType === 'webinar-registration') {
    $alt .= "Webinar Topic: " . v('webinarTopic') . "\n";
    $alt .= "Webinar ID: " . v('webinarId') . "\n";
    $alt .= "Webinar Date & Time: " . formatSubmittedDateTime(v('webinarScheduledAt')) . "\n";
    $alt .= "First Name: " . v('firstName') . "\n";
    if (v('middleName') !== '') {
        $alt .= "Middle Name: " . v('middleName') . "\n";
    }
    $alt .= "Last Name: " . v('lastName') . "\n";
    $alt .= "Gender: " . genderLabel(v('gender')) . "\n";
    $alt .= "Email: " . $email . "\n";
    $alt .= "Mobile: " . $phone . "\n";
    $alt .= "Current Background: " . v('background') . "\n";
    $alt .= "Years of Experience: " . v('yearsOfExperience') . "\n";
    $alt .= "Preferred Call Date & Time: " . formatSubmittedDateTime(v('preferredCallDateTime')) . "\n";
    if (v('specificQuestion') !== '') {
        $alt .= "Specific Question: " . strip_tags(v('specificQuestion')) . "\n";
    }
} elseif ($formType === 'enrollment-modal' || $formType === 'bootcamp-enrollment') {
    $courseLink = firstNonEmpty(['courseLink', 'courseUrl', 'courseSlug']);
    $alt .= "Enrollment Type: " . ($formType === 'bootcamp-enrollment' ? 'Elite Boot Camp' : 'Flagship Program') . "\n";
    $alt .= "Name: " . $name . "\n";
    $alt .= "Email: " . $email . "\n";
    $alt .= "Phone: " . $phone . "\n";
    if (v('secondaryPhoneNumber') !== '') {
        $alt .= "Secondary Phone: " . v('secondaryPhoneNumber') . "\n";
    }
    $alt .= "Age: " . v('age') . "\n";
    $alt .= "Gender: " . v('gender') . "\n";
    $alt .= "Occupation: " . v('occupation') . "\n";
    $alt .= "Preferred Call Time: " . v('preferredCallTime') . "\n";
    $alt .= "Address: " . strip_tags(v('address')) . "\n";
    $alt .= "College/School: " . v('collegeSchool') . "\n";
    $alt .= "Graduation Year: " . v('graduationYear') . "\n";
    if ($courseLink !== '') {
        $alt .= "Course Link: " . $courseLink . "\n";
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
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $smtpPort;
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';

    $mail->setFrom($fromEmail, $fromName);
    foreach ($toAddresses as [$addr, $nm])
        $mail->addAddress($addr, $nm);
    if ($email !== '') {
        $mail->addReplyTo($email, $name !== '' ? $name : $email);
    }

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $html;
    $mail->AltBody = $alt;
    $mail->send();

    // --- Auto-reply to customer (only when form has email) ---
    if ($email !== '' && in_array($formType, ['newsletter', 'contact', 'request-callback', 'callback-modal', 'enrollment-modal', 'bootcamp-enrollment', 'webinar-registration'], true)) {
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
            } elseif ($formType === 'webinar-registration') {
                $webinarTopic = clean(v('webinarTopic'));
                $webinarWhen = clean(formatSubmittedDateTime(v('webinarScheduledAt')));
                $preferredCallWhen = clean(formatSubmittedDateTime(v('preferredCallDateTime')));
                $mail->Subject = "Webinar registration received – $brandName";
                $autoReplyHtml = "
                    <div style='font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
                        <p style='font-size: 16px; color: #333; margin-bottom: 16px;'>Hi " . $customerName . ",</p>
                        <p style='font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 16px;'>
                            Thanks for registering for our webinar <strong>" . $webinarTopic . "</strong> scheduled on <strong>" . $webinarWhen . "</strong>.
                        </p>
                        <p style='font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 16px;'>
                            Our team has received your details and will call you at your preferred time: <strong>" . $preferredCallWhen . "</strong>.
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
                $mail->AltBody = "Hi " . $customerName . ",\n\nThanks for registering for our webinar " . v('webinarTopic') . " scheduled on " . formatSubmittedDateTime(v('webinarScheduledAt')) . ".\n\nOur team has received your details and will call you at your preferred time: " . formatSubmittedDateTime(v('preferredCallDateTime')) . ".\n\nIf it's urgent, feel free to reply to this email.\n\nRegards,\n$brandName Team";
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

