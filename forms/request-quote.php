<?php
/**
 * Request Quote Handler with PDF Attachment
 * Ciph Creative Agency
 */

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $website = isset($_POST["website"]) ? strip_tags(trim($_POST["website"])) : "N/A";
    $service = strip_tags(trim($_POST["service"]));
    $message = strip_tags(trim($_POST["message"]));

    // Simple validation
    if (empty($name) || empty($email) || empty($service) || empty($message)) {
        http_response_code(400);
        echo "Please complete all required fields.";
        exit;
    }

    $recipient = "ciphcreativeagency@gmail.com";
    $subject = "New Quote Request: $service from $name";

    // --- PDF Content Generation (Lightweight PDF 1.3) ---
    $pdf_content = "%PDF-1.3\n";
    $pdf_content .= "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n";
    $pdf_content .= "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n";
    $pdf_content .= "3 0 obj << /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >> endobj\n";
    $pdf_content .= "4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n";
    
    // Construct the text for the PDF
    $text = "CIPH CREATIVE AGENCY - QUOTE REQUEST\n";
    $text .= "====================================\n\n";
    $text .= "Customer Name: $name\n";
    $text .= "Email: $email\n";
    $text .= "Website: " . ($website ? $website : "N/A") . "\n";
    $text .= "Service: $service\n";
    $text .= "Received Date: " . date("Y-m-d H:i:s") . "\n\n";
    $text .= "Project Description:\n";
    $text .= "--------------------\n";
    $chunks = wordwrap($message, 80, "\n");
    $text .= $chunks;

    // Convert text to PDF stream
    $lines = explode("\n", $text);
    $stream = "BT /F1 10 Tf 50 720 Td 12 TL\n";
    foreach ($lines as $line) {
        $escaped = str_replace(array('(', ')', '\\'), array('\\(', '\\)', '\\\\'), $line);
        $stream .= "(" . $escaped . ") Tj T*\n";
    }
    $stream .= "ET";

    $pdf_content .= "5 0 obj << /Length " . strlen($stream) . " >> stream\n" . $stream . "\nendstream\nendobj\n";
    $pdf_content .= "xref\n0 6\n0000000000 65535 f\n";
    $pdf_content .= "trailer << /Size 6 /Root 1 0 R >>\nstartxref\n" . (strlen($pdf_content)) . "\n%%EOF";

    $filename = "Quote_Request_" . date("Ymd_His") . ".pdf";
    $content = chunk_split(base64_encode($pdf_content));
    $boundary = md5(time());

    // --- Email Headers ---
    $headers = "From: Ciph Agency <no-reply@ciphca.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";

    // --- Message Body ---
    $body = "--" . $boundary . "\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= "You have received a new quote request from $name.\n\nService: $service\nEmail: $email\n\nFull details are attached in the PDF file.\r\n\r\n";
    
    // --- Attachment ---
    $body .= "--" . $boundary . "\r\n";
    $body .= "Content-Type: application/pdf; name=\"" . $filename . "\"\r\n";
    $body .= "Content-Disposition: attachment; filename=\"" . $filename . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= $content . "\r\n";
    $body .= "--" . $boundary . "--";

    // Send email
    if (mail($recipient, $subject, $body, $headers)) {
        // Success response for the AJAX form handler
        echo "OK";
    } else {
        http_response_code(500);
        echo "Sorry, we encountered an error sending your request. Please email us directly at $recipient";
    }
} else {
    http_response_code(403);
    echo "Method not allowed.";
}
?>
