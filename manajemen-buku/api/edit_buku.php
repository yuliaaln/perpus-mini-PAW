<?php
header('Content-Type: application/json');
include 'koneksi.php';

$id = $_POST['id_buku'] ?? '';
$judul = $_POST['judul'] ?? '';
$penulis = $_POST['penulis'] ?? '';
$tahun = $_POST['tahun'] ?? '';
$penerbit = $_POST['penerbit'] ?? '';

if (empty($id) || empty($judul) || empty($penulis) || empty($tahun) || empty($penerbit)) {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
    exit;
}

$sql = "UPDATE buku SET 
        judul='$judul', 
        penulis='$penulis', 
        tahun='$tahun', 
        penerbit='$penerbit'
        WHERE id_buku='$id'";

if ($koneksi->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $koneksi->error]);
}
?>
