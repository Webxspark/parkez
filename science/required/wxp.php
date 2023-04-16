<?php
class Wxp_App
{
    public function userExists($conn, $email)
    {
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        if ($result->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function generateUserTag()
    {
        return "ez_" . bin2hex(random_bytes(03));
    }
    public function createUser($conn, $data = [])
    {
        $sql = "INSERT INTO users (username, email, password, tag) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $data['name'], $data['email'], $data['password'], $data['tag']);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function isLoggedIn()
    {
        if (isset($_COOKIE['user_id'])) {
            return true;
        } else {
            return false;
        }
    }
    public function getUserInfo($conn, $data = []){
        if(isset($data['email']) || isset($data['tag'])){
            $bd = "";
            if(isset($data['email'])){
                $sql = "SELECT * FROM users WHERE email=? LIMIT 1";
                $bd = $data['email'];
            }
            if(isset($data['tag'])){
                $sql = "SELECT * FROM users WHERE tag=? LIMIT 1";
                $bd = $data['tag'];
            }
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('s', $bd);
            $stmt->execute();
            $result = $stmt->get_result();
            $count = $result->num_rows;
            if($count > 0){
                $usrInfo = mysqli_fetch_assoc($result);
                return $usrInfo;
            }
            return false;
        }
        return false;
    }
    public function processPayment($conn, $data = []){
        if(isset($data['slot_id']) && isset($data['tag']) && isset($data['amount'])){
            $sql = "UPDATE parkingSlots SET tag=?, status=? WHERE slot_id=? LIMIT 1";
            $status = "booked";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sss", $data['tag'], $status, $data['slot_id']);
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    public function generateKey($suffix = null)
    {
        // Default tokens contain no "ambiguous" characters: 1,i,0,o
        if (isset($suffix)) {
            // Fewer segments if appending suffix
            $num_segments = 3;
            $segment_chars = 6;
        } else {
            $num_segments = 4;
            $segment_chars = 5;
        }
        $tokens = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        $license_string = '';
        // Build Default License String
        for ($i = 0; $i < $num_segments; $i++) {
            $segment = '';
            for ($j = 0; $j < $segment_chars; $j++) {
                $segment .= $tokens[rand(0, strlen($tokens) - 1)];
            }
            $license_string .= $segment;
            if ($i < ($num_segments - 1)) {
                $license_string .= '-';
            }
        }
        // If provided, convert Suffix
        if (isset($suffix)) {
            if (is_numeric($suffix)) {   // Userid provided
                $license_string .= '-' . strtoupper(base_convert($suffix, 10, 36));
            } else {
                $long = sprintf("%u\n", ip2long($suffix), true);
                if ($suffix === long2ip($long)) {
                    $license_string .= '-' . strtoupper(base_convert($long, 10, 36));
                } else {
                    $license_string .= '-' . strtoupper(str_ireplace(' ', '-', $suffix));
                }
            }
        }
        return $license_string;
    }
    public function set_cookie($cookie_name, $cookie_value)
    {
        setcookie("$cookie_name", $cookie_value, time() + 876000000, '/', false, true); //Cookies validity: 100Years
    }
    public function unset_cookie($cookie_name, $cookie_value)
    {
        setcookie("$cookie_name", $cookie_value, time() - 876000000, '/', false, true); //Cookies validity: 100Years
    }
    public function set_cookie_custom($cookie_name, $cookie_value, $duration)
    {
        setcookie("$cookie_name", $cookie_value, time() + $duration, '/', false, true);
    }
    public function format_date($database_date)
    {
        $date = date_create($database_date);
        return date_format($date, "d F Y ");
    }
    public function time_elapsed_string($datetime, $full = false)
    {
        date_default_timezone_set('Asia/Kolkata');
        $now  = new DateTime;
        $ago  = new DateTime($datetime);
        $diff = $now->diff($ago);

        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;

        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hour',
            'i' => 'minute',
            's' => 'second',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }

        if (!$full) {
            $string = array_slice($string, 0, 1);
        }

        return $string ? implode(', ', $string) . ' ago' : 'just now';
    }
    public function LogoutUser()
    {
        $this->unset_cookie("user_id", NULL);
        return true;
    }
    public function sendMessage($conn, $data = [])
    {
        $sql = "INSERT INTO contact(name, email, subject, message) VALUES(?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $data['name'], $data['email'], $data["subject"], $data['message']);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
    public function addGetAccessEmail($conn, $data = [])
    {
        //validate email if already exists in getaccess db
        $sql = "SELECT * FROM getaccess WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $data['email']);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        if ($result->num_rows > 0) {
            return false;
        } else {
            $sql = "INSERT INTO getaccess(email) VALUES(?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $data['email']);
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }
    }
    public function LoginUser($conn, $data = [])
    {
        if (isset($data['direct'])) {
            $tag = $data['tag'];
            $this->set_cookie("user_id", $tag);
            return true;
        } else {
            $email = $data['email'];
            $pass = $data['password'];
            //verify password
            $sql = "SELECT * FROM users WHERE email = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                if (password_verify($pass, $row['password'])) {
                    $this->set_cookie("user_id", $row['tag']);
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    public static function AirportCount($conn, $data = []){
        if(isset($data['id'])){
            $stmt = $conn->prepare("SELECT * FROM airports WHERE tag=?");
            $stmt->bind_param('s', $data['id']);
            $stmt->execute();
            $res = $stmt->get_result();
            return $res->num_rows;
        }
        return false;
    }
    public static function parkingSlotsCount($conn, $data = []){
        if(isset($data['id'])){
            $stmt = $conn->prepare("SELECT * FROM parkingslots WHERE slot_id=?");
            $stmt->bind_param('s', $data['id']);
            $stmt->execute();
            $res = $stmt->get_result();
            return $res->num_rows;
        }
        return false;
    }
    public static function HTTPStatus($num)
    {
        $http = array(
            100 => 'HTTP/1.1 100 Continue',
            101 => 'HTTP/1.1 101 Switching Protocols',
            200 => 'HTTP/1.1 200 OK',
            201 => 'HTTP/1.1 201 Created',
            202 => 'HTTP/1.1 202 Accepted',
            203 => 'HTTP/1.1 203 Non-Authoritative Information',
            204 => 'HTTP/1.1 204 No Content',
            205 => 'HTTP/1.1 205 Reset Content',
            206 => 'HTTP/1.1 206 Partial Content',
            300 => 'HTTP/1.1 300 Multiple Choices',
            301 => 'HTTP/1.1 301 Moved Permanently',
            302 => 'HTTP/1.1 302 Found',
            303 => 'HTTP/1.1 303 See Other',
            304 => 'HTTP/1.1 304 Not Modified',
            305 => 'HTTP/1.1 305 Use Proxy',
            307 => 'HTTP/1.1 307 Temporary Redirect',
            400 => 'HTTP/1.1 400 Bad Request',
            401 => 'HTTP/1.1 401 Unauthorized',
            402 => 'HTTP/1.1 402 Payment Required',
            403 => 'HTTP/1.1 403 Forbidden',
            404 => 'HTTP/1.1 404 Not Found',
            405 => 'HTTP/1.1 405 Method Not Allowed',
            406 => 'HTTP/1.1 406 Not Acceptable',
            407 => 'HTTP/1.1 407 Proxy Authentication Required',
            408 => 'HTTP/1.1 408 Request Time-out',
            409 => 'HTTP/1.1 409 Conflict',
            410 => 'HTTP/1.1 410 Gone',
            411 => 'HTTP/1.1 411 Length Required',
            412 => 'HTTP/1.1 412 Precondition Failed',
            413 => 'HTTP/1.1 413 Request Entity Too Large',
            414 => 'HTTP/1.1 414 Request-URI Too Large',
            415 => 'HTTP/1.1 415 Unsupported Media Type',
            416 => 'HTTP/1.1 416 Requested Range Not Satisfiable',
            417 => 'HTTP/1.1 417 Expectation Failed',
            500 => 'HTTP/1.1 500 Internal Server Error',
            501 => 'HTTP/1.1 501 Not Implemented',
            502 => 'HTTP/1.1 502 Bad Gateway',
            503 => 'HTTP/1.1 503 Service Unavailable',
            504 => 'HTTP/1.1 504 Gateway Time-out',
            505 => 'HTTP/1.1 505 HTTP Version Not Supported',
        );

        header($http[$num]);

        return
            array(
                'code'  => $num,
                'error' => $http[$num],
            );
    }
}
