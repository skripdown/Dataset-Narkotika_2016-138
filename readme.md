<h1 align="center" style="">Dataset Narkotika</h1>
<h4 align="center" style="">2016-138 Malik Pajar Lapele</h4>

## Overview
**Dataset Narkotika** merupakan repositori dataset dan program sederhana pencarian
dokumen menggunakan metode [Naive Bayes](https://en.wikipedia.org/wiki/Naive_Bayes_classifier). 
Repositori github ini berisi folder Berkas, Overview serta script yang digunakan untuk menjalankan program. 
Secara default, repositori menggunakan berkas Pengadilan Negeri Putusan Mahkamah Agung Republik Indonesia 
jenis pidana khusus Narkotika dan Psikotropika wilayah Banda Aceh yang bisa diakses 
pada [link ini](https://putusan3.mahkamahagung.go.id/direktori/index/pengadilan/pn-banda-aceh/kategori/narkotika-dan-psikotropika-1.html).

## Penggunaan
Pada tahap awal, clone atau unduh kode pada repositori dan siapkan berkas yang akan digunakan sebagai sampel 
mesin pencarian. Pastikan komputer sudah menginstal 
interpreter [Python 3.11.1](https://www.python.org/downloads/release/python-3111/) 
dan [Node JS](https://nodejs.org/en/).

### Generate Overview
Generate overview bisa dilakukan dengan menjalankan script `node index.js`. Script program yang dijalankan akan
memproses dokumen yang ada pada folder berkas dan membuat output dalam bentuk file overview.xlsx pada berkas overview.
Contoh output yang dihasilkan pada file excel seperti di bawah ini.
| No Putusan  | Lembaga Peradilan | Barang Bukti | Amar Putusan |
| ------------- | ------------- | ------------- | ------------- |
| 205/Pid.Sus/2022/PN Bna | PN Banda Aceh | 1 (satu) buah botol minuman plastik dengan tutup warna merah yang telah terpasang satu pipet plastik warna bening. 1 (satu) buah botol minuman gelas plastik yang telah diberi dua lubang. 1 (satu) unit hp merk Strawbery 1 (satu) buah mancis. 14 (empat belas) buah pipet plastic 1 (satu) buah pipa kaca pirex. Dirampas untuk dimusnakan | Menyatakan terdakwa Syukri Bin Asnawi terbukti secara sah dan menyakinkan bersalah melakukan tindak pidana Narkotika sebagaimana didakwakan dalam dakwaan alternatif kedua melanggar Pasal 127 ayat (1) huruf a UU RI No. 35 Tahun 2009 tentang Narkotika
Menghukum terdakwa Syukri Bin Asnawi dengan pidana penjara selama 3 (tiga) tahun dan 6 (enam) bulan penjara dikurangkan selama terdakwa menjalani masa tahanan dengan dengan perintah terdakwa tetap ditahan |
