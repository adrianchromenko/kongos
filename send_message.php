<?php
$to = "nexgenfec@gmail.com";
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';

$subject = "New Contact Form Submission from KONGO'S Website";
$body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: no-reply@yourdomain.com\r\nReply-To: $email\r\n";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    mail($to, $subject, $body, $headers);
}

echo "<!DOCTYPE html><html><body style='background:#111;color:#fff;font-family:Arial;text-align:center;padding-top:80px;'>
<h2>Thank you!</h2><p>Your message has been sent. We will get back to you as soon as we can.</p>
<p><a href='contact.html' style='color:#fff;'>Back to Contact Page</a></p></body></html>";
?>