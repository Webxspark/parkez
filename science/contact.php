<?php
include './required/db.php';
include './required/wxp.php';

$App = new Wxp_App;
$data = [];

if (isset($_REQUEST['send'])) {
    if (isset($_REQUEST['name']) && isset($_REQUEST['email']) && isset($_REQUEST['message']) && isset($_REQUEST['subject'])) {
        $name = htmlspecialchars($_REQUEST['name']);
        $email = htmlspecialchars($_REQUEST['email']);
        $message = htmlspecialchars($_REQUEST['message']);
        $subject = htmlspecialchars($_REQUEST['subject']);
        if ((empty($name) || $name === "") || (empty($email) || $email === "") || (empty($message) || $message === "") || (empty($subject) || $subject === "")) {
            $data['error'] = "Please fill all the required fields to send a message!";
        } else {
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $ins_data = [
                    "name" => $name,
                    "email" => $email,
                    "message" => $message, 
                    "subject" => $subject
                ];
                if ($App->sendMessage($conn, $ins_data)) {
                    $data = [
                        "status" => 200,
                        "message" => "Message sent successfully!"
                    ];
                } else {
                    $data['error'] = "An error occurred while sending your message. Please try again later!";
                }
            } else {
                $data['error'] = "Please enter a valid email address to continue!";
            }
        }
    } else {
        $data['error'] = "Please fill all the required fields to send a message!";
    }
}

header("Content-type: application/json");
echo json_encode($data, JSON_PRETTY_PRINT);
