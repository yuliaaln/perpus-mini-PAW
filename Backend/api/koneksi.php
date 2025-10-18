<?php
$host = "localhost";
$user = "root"; 
$pass = ""; 
$dbname = "db_buku"; 
$koneksi = new mysqli($host, $user, $pass, $dbname);

if ($koneksi->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => "Koneksi database tidak tersedia: " . $koneksi->connect_error
    ]);
    exit;
}
?>
