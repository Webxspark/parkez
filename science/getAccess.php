<?php
include './required/db.php';
include './required/wxp.php';

$App = new Wxp_App;
$data = [];

if (isset($_REQUEST['add'])) {
    if (isset($_REQUEST['email'])) {
        $email = htmlspecialchars($_REQUEST['email']);
        if ((empty($email) || $email === "")) {
            $data['error'] = "Please fill all the required fields to send a message!";
        } else {
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $ins_data = [
                    "email" => $email,
                ];
                if ($App->addGetAccessEmail($conn, $ins_data)) {
                    $data = [
                        "status" => 200,
                        "message" => "You will receive an email shortly :)"
                    ];
                } else {
                    $data['error'] = "An error occurred while adding your email. Please try again later!";
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
