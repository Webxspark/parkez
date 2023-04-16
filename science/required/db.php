<?php

$conn = new mysqli("localhost", "root", "", "parkez");
if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}