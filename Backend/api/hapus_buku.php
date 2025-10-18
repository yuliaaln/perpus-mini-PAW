<?php
include 'koneksi.php';

$id = $_POST['id_buku'];

$sql = "DELETE FROM buku WHERE id_buku='$id'";

if ($koneksi->query($sql) === TRUE) {
    echo "success";
} else {
    echo "error";
}
?>
