<?php
include './required/db.php';
include './required/wxp.php';

$App = new Wxp_App;
$data = [];

if(isset($_REQUEST['login']) || isset($_REQUEST['signup'])){
    if($App->isLoggedIn()){
        die("You're already logged in!");
    }
}

if (isset($_REQUEST['signup'])) {
    if (isset($_REQUEST['name']) && isset($_REQUEST['email']) && isset($_REQUEST['password'])) {
        $data['error'] = "Please fill all the required fields to create a new account!";
        //validating data
        $name = htmlspecialchars($_REQUEST['name']);
        $email = htmlspecialchars($_REQUEST['email']);
        $pass = htmlspecialchars($_REQUEST['password']);
        if ((empty($name) || $name === "") || (empty($email) || $email === "") || (empty($pass) || $pass === "")) {
            $data['error'] = "Please fill all the required fields to create a new account!";
        } else {
            //validating email
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                //check if the email exists in our database
                if (!$App->userExists($conn, $email)) {
                    //hashing password and generating unique tag for user
                    $pass = password_hash($pass, PASSWORD_BCRYPT);
                    $tag = $App->generateUserTag();

                    $ins_data = [
                        "name" => $name,
                        "email" => $email,
                        "password" => $pass,
                        "tag" => $tag
                    ];
                    if ($App->createUser($conn, $ins_data)) {
                        $data = [
                            "status" => 200,
                            "message" => "Account created successfully!",
                            "context" => [
                                "content" => [
                                    "name" => $name,
                                    "email" => $email,
                                    "tag" => $tag
                                ]
                            ]
                        ];
                        $App->LoginUser($conn, ["direct" => true, "email" => $email, "password" => $pass, "tag" => $tag]);
                    }
                } else {
                    $data['error'] = "An account has already been created with this email address!";
                }
            } else {
                $data['error'] = "Please enter a valid email address to continue!";
            }
        }
    } else {
        $data['error'] = "Request not valid. Access denied!";
    }
}

if (isset($_REQUEST['login'])) {
    if (isset($_REQUEST['email']) && isset($_REQUEST['password'])) {
        $email = htmlspecialchars($_REQUEST['email']);
        $pass = htmlspecialchars($_REQUEST['password']);
        if ((empty($email) || $email === "") || (empty($pass) || $pass === "")) {
            $data['error'] = "Please fill all the required fields to create a new account!";
        } else {
            $loginCredentials = [
                "email" => $email,
                "password" => $pass
            ];
            if($App->LoginUser($conn, $loginCredentials)){
                $data = [
                    "status" => 200,
                    "message" => "You're logged in!",
                    "context" => [
                        "content" => [
                            "name" => ($App->getUserInfo($conn, ['email' => $email]))['username'],
                            "email" => $email,
                            "tag" => ($App->getUserInfo($conn, ['email' => $email]))['tag']
                        ]
                    ]
                ];
            } else {
                $data['error'] = "Something went wrong or Invalid credentials!";
            }
        }
    } else {
        
        $data['error'] = "Request not valid. Access denied!";
    }
}
if(isset($_REQUEST['logout'])){
    $App->LogoutUser();
    $data = [
        "status" => 200,
        "message" => "You're logged out!"
    ];
}
header("Content-type: application/json");
echo json_encode($data, JSON_PRETTY_PRINT);
