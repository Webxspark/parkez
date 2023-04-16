<?php
include './required/db.php';
include './required/wxp.php';

$App = new Wxp_App;
$data = [];

if (isset($_REQUEST['getList'])) {
    if (isset($_REQUEST['id'])) {
        $airportId = htmlspecialchars($_REQUEST['id']);
        $stmt = $conn->prepare("SELECT * FROM parkingslots WHERE airport_id = ?");
        $stmt->bind_param('s', $airportId);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->num_rows;
        $stmt->close();
        if ($count > 0) {
            $t_data = [];
            while ($rows = mysqli_fetch_assoc($result)) {
                array_push($t_data, $rows);
            }
            $data = [
                "status" => 200,
                "slotsAvailable" => $count,
                "context" => [
                    "content" => $t_data
                ]
            ];
        } else {
            $data['error'] = "Unable to find the Airport!";
        }
    } else {
        $data['error'] = "Airport ID required!";
    }
}

if (isset($_REQUEST['slotInfo'])) {
    if (isset($_REQUEST['id'])) {
        $slotid = htmlspecialchars($_REQUEST['id']);
        if ($App::parkingSlotsCount($conn, ["id" => $slotid]) > 0) {
            $stmt = $conn->prepare("SELECT * FROM parkingslots WHERE slot_id = ? LIMIT 1");
            $stmt->bind_param('s', $slotid);
            $stmt->execute();
            $result = $stmt->get_result();
            $info = mysqli_fetch_assoc($result);
            $data = [
                "status" => 200,
                "context" => [
                    "content" => $info
                ]
            ];
        } else {
            $data['error'] = "Unable to find the slot!";
        }
    } else {
        $data['error'] = "Slot ID required!";
    }
}


header("Content-type: application/json");
echo json_encode($data, JSON_PRETTY_PRINT);
