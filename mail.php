<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $surname = $data['surname'];
    $cart = $data['cart'];

    // Modifica l'indirizzo email con quello del destinatario
    $to = "techzone.iys@gmail.com";  
    $subject = "Nuovo ordine da $name $surname";
    
    // Costruzione del messaggio dell'ordine
    $message = "Hai ricevuto un nuovo ordine:\n\n";
    foreach ($cart as $item) {
        $message .= $item['name'] . " - €" . $item['price'] . "\n";
    }

    // Aggiungi la spedizione rapida nel messaggio
    $message .= "\nSpedizione rapida inclusa.";

    // Intestazione dell'email
    $headers = "From: no-reply@ilmionegizioso.com";

    // Invia l'email
    if (mail($to, $subject, $message, $headers)) {
        echo "Ordine inviato con successo!";
    } else {
        echo "Errore nell'invio dell'ordine.";
    }
}
?>