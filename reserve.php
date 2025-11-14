<?php
$to = "nexgenfec@gmail.com";
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$date = $_POST['date'] ?? '';
$time = $_POST['time'] ?? '';
$guests = $_POST['guests'] ?? '';
$notes = $_POST['notes'] ?? '';

$subject = "New Reservation Request from KONGO'S Website";
$body = "Name: $name\nEmail: $email\nPhone: $phone\nDate: $date\nTime: $time\nGuests: $guests\n\nNotes:\n$notes";
$headers = "From: no-reply@yourdomain.com\r\nReply-To: $email\r\n";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    mail($to, $subject, $body, $headers);
}

echo "<!DOCTYPE html><html><body style='background:#111;color:#fff;font-family:Arial;text-align:center;padding-top:80px;'>
<h2>Reservation Request Sent</h2><p>Thank you! We have received your request and will contact you to confirm.</p>
<p><a href='reservations.html' style='color:#fff;'>Back to Reservations</a></p></body></html>";
?>