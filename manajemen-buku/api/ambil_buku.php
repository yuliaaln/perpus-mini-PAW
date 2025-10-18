<?php
include 'koneksi.php';

$sql = "SELECT * FROM buku ORDER BY id_buku DESC";
$result = $koneksi->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
