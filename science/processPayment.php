<?php
include './required/db.php';
include './required/wxp.php';

$App = new Wxp_App;
$data = [];

if (isset($_REQUEST['pay'])) {
    if (isset($_REQUEST['tag']) && isset($_REQUEST['slot_id']) && isset($_REQUEST['amount'])) {
        $tag = htmlspecialchars($_REQUEST['tag']);
        $slot_id = htmlspecialchars($_REQUEST['slot_id']);
        $amount = htmlspecialchars($_REQUEST['amount']);
        if ((empty($tag) || $tag === "") || (empty($slot_id) || $slot_id === "") || (empty($amount) || $amount === "")) {
            $data['error'] = "Please fill all the required fields to continue!";
        } else {
            $ins_data = [
                "tag" => $tag,
                "slot_id" => $slot_id,
                "amount" => $amount
            ];
            if ($App->processPayment($conn, $ins_data)) {
                $data = [
                    "status" => 200,
                    "message" => "Slot booked successfully. Thank you!"
                ];
            } else {
                $data['error'] = "An error occurred while processing your payment. Please try again later!";
            }
        }
    } else {
        $data['error'] = "Please fill all the required fields to continue!";
    }
}

header("Content-type: application/json");
echo json_encode($data, JSON_PRETTY_PRINT);
