<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>
<h1 style="text-align: center!important;background-color:red!important">Dataset Narkotika</h1>
<h4 style="text-align: center!important">2016-138 Malik Pajar Lapele</h4>

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
| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
