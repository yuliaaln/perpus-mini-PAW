$(document).ready(function() {
  loadData();

  // === Fungsi ambil semua data buku ===
  function loadData() {
    $.getJSON('api/ambil_buku.php', function(data) {
      let rows = '';
      data.forEach((buku, index) => {
        rows += `
          <tr>
            <td>${index + 1}</td>
            <td>${buku.judul}</td>
            <td>${buku.penulis}</td>
            <td>${buku.penerbit}</td>
            <td>${buku.tahun}</td>
            <td>
      <button class="editBtn btn-edit" data-id="${buku.id_buku}">Edit</button>
      <button class="deleteBtn btn-delete" data-id="${buku.id_buku}">Hapus</button>
    </td>
          </tr>`;
      });
      $('#bookTable tbody').html(rows);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.error("Gagal memuat data:", textStatus, errorThrown);
    });
  }

 // === Tambah atau edit buku ===
$('#bookForm').submit(function(e) {
  e.preventDefault();

  const data = {
    id_buku: $('#id_buku').val(),
    judul: $('#judul').val(),
    penulis: $('#penulis').val(),
    penerbit: $('#penerbit').val(),
    tahun: $('#tahun').val()
  };

  console.log("Data yang dikirim:", data);

  const url = data.id_buku ? 'api/edit_buku.php' : 'api/tambah_buku.php';

  // 🟢 Perhatikan: tambahkan parameter 'json' di akhir $.post
  $.post(url, data, function(response) {
    console.log("Response dari server:", response);

    // Karena response dari PHP dikirim dalam bentuk JSON
    if (response.status === "success") {
      alert("Data berhasil disimpan!");
      $('#bookForm')[0].reset();
      $('#id_buku').val('');
      loadData();
    } else {
      alert("Terjadi kesalahan: " + (response.message || "Tidak diketahui"));
    }
  }, 'json') // <== tambahkan ini agar jQuery tahu responsnya JSON
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.error("Gagal kirim data:", textStatus, errorThrown);
    alert("Gagal mengirim data ke server.");
  });
  
});


  // === Hapus buku ===
  $(document).on('click', '.deleteBtn', function() {
    if (confirm('Yakin ingin menghapus buku ini?')) {
      $.post('api/hapus_buku.php', { id_buku: $(this).data('id') }, function(response) {
        console.log("Hapus response:", response);
        if (response.includes("success")) loadData();
        else alert("Gagal menghapus data!");
      });
    }
    });
  });

  // === Edit buku ===
  $(document).on('click', '.editBtn', function() {
    const row = $(this).closest('tr');
    $('#id_buku').val($(this).data('id'));
    $('#judul').val(row.find('td:eq(1)').text());
    $('#penulis').val(row.find('td:eq(2)').text());
    $('#penerbit').val(row.find('td:eq(3)').text());
    $('#tahun').val(row.find('td:eq(4)').text());
  });
