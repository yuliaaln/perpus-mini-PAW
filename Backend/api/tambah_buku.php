<?php
header('Content-Type: application/json');
include __DIR__ . '/koneksi.php';

if (!isset($koneksi) || $koneksi->connect_error) {
    echo json_encode(["status" => "error", "message" => "Koneksi database tidak tersedia"]);
    exit;
}

$judul = $_POST['judul'] ?? '';
$penulis = $_POST['penulis'] ?? '';
$penerbit = $_POST['penerbit'] ?? '';
$tahun = $_POST['tahun'] ?? '';

if (empty($judul) || empty($penulis) || empty($penerbit) || empty($tahun)) {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
    exit;
}

$sql = "INSERT INTO buku (judul, penulis, penerbit, tahun, created_at)
        VALUES ('$judul', '$penulis', '$penerbit', '$tahun', NOW())";

if ($koneksi->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $koneksi->error]);
}
?>
