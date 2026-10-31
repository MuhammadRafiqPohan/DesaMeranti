# Website Resmi Profil Desa Meranti

Website Profil Desa Meranti dibangun menggunakan arsitektur modern terpisah (**Decoupled SPA & REST API**):
- **BackEnd**: [Laravel 11](file:///c:/Laragon/www/DesaMeranti) dengan REST API, migrasi database, model Eloquent, autentikasi Bearer Token, dan seeder data lengkap.
- **FrontEnd**: [ReactJS (Vite)](file:///c:/Laragon/www/DesaMeranti/frontend) dengan Tailwind CSS, React Router DOM, Lucide Icons, dan Axios client.
- **Aset Gambar**: Menggunakan seluruh aset asli yang ada pada folder `public/assets/` (`Foto-Desa.png`, `logo-desa.png`, `Peta-Desa.jpg`, `Struktur-Desa.png`, foto aparatur desa, fasilitas desa, dan berita).

---

## 🚀 Panduan Menjalankan Aplikasi

### 1. Menjalankan Backend (Laravel 11)
Buka terminal di direktori utama:
```bash
php artisan serve
```
Backend API akan berjalan di: `http://127.0.0.1:8000`

### 2. Menjalankan Frontend (React + Vite)
Buka terminal baru di folder `frontend`:
```bash
cd frontend
npm run dev
```
Frontend React akan berjalan di: `http://localhost:5173`

*(Catatan: Frontend dev server sudah dikonfigurasi proxy otomatis ke `http://127.0.0.1:8000` untuk semua endpoint `/api/*` dan `/assets/*`).*

### 3. Build Produksi (Opsional)
Untuk mengompilasi frontend React ke file statis produksi:
```bash
cd frontend
npm run build
```
File build secara otomatis disajikan oleh Laravel pada `http://127.0.0.1:8000/` atau virtual host Laragon `http://desameranti.test/`.

---

## 🔐 Akun Administrator Default

| Parameter | Keterangan |
| :--- | :--- |
| **Halaman Login** | `http://localhost:5173/admin/login` |
| **Email** | `admin@desameranti.id` |
| **Password** | `admin123` |

---

## 🗺️ Struktur Halaman

### Halaman Publik (Warga & Umum)
- **Beranda** (`/`): Hero banner dengan `Foto-Desa.png`, sambutan Kepala Desa, statistik penduduk cepat, sorotan APBDes, berita terkini, pengumuman, dan agenda kegiatan.
- **Profil Desa**:
  - **Sejarah Desa** (`/sejarah`): Asal-usul nama Meranti, sejarah berdiri 1952, dan narasi perkembangan.
  - **Visi dan Misi** (`/visi-misi`): Pernyataan visi desa, 5 butir misi, dan tujuan strategis.
  - **Wilayah & Peta Desa** (`/wilayah`): Peta resolusi tinggi `Peta-Desa.jpg`, batas wilayah utara/selatan/timur/barat, dan luas wilayah.
  - **Demografi Penduduk** (`/demografi`): Visualisasi statistik jenis kelamin, sebaran dusun, pekerjaan, pendidikan, dan kelompok usia.
  - **Fasilitas Desa** (`/fasilitas`): Galeri fasilitas publik (kantor desa, balai desa, poskesdes, TK) dengan foto asli di `public/assets/fasilitas/`.
- **Pemerintahan**:
  - **Struktur Organisasi** (`/struktur-organisasi`): Gambar bagan `Struktur-Desa.png` dan hierarki kepemimpinan.
  - **Aparatur Desa** (`/aparatur-desa`): Foto resmi Kepala Desa, Sekretaris Desa, Kaur, Kasi, dan Kepala Dusun dari `public/assets/aparatur/`.
  - **Lembaga Desa** (`/lembaga-desa`): BPD, LPMD, PKK, Karang Taruna, dan Posyandu.
- **Administrasi**:
  - **Prosedur Surat** (`/prosedur-surat`): Pencarian syarat dan alur pembuatan SKU, SKD, SKTM, SKCK, Akta Kelahiran, dan Kematian (Gratis / Rp 0).
- **Informasi & Berita**:
  - **Berita Desa** (`/berita`): Daftar berita dengan pencarian, pagination, dan foto dari `public/assets/berita/`.
  - **Detail Berita** (`/berita/:slug`): Baca artikel lengkap, counter pembaca, dan share WhatsApp.
  - **Pengumuman** (`/pengumuman`): Pengumuman resmi pemerintah desa.
  - **Agenda Kegiatan** (`/agenda`): Kalender kegiatan dan musyawarah desa.
- **Transparansi Anggaran**:
  - **APBDes / APB Nagari** (`/apb-nagari`): Ringkasan Pendapatan, Belanja, Pembiayaan, Surplus/Defisit, visualisasi 6 sumber dana, rincian belanja per bidang, dan fitur cetak laporan.

---

### Halaman Panel Admin
- **Dashboard** (`/admin/dashboard`): Ringkasan metrik konten, aparatur, surat, total anggaran APBDes, dan postingan terakhir.
- **Kelola Konten**:
  - **Postingan** (`/admin/postingan`): Tambah, edit, hapus berita, pengumuman, dan agenda.
  - **Demografi** (`/admin/demografi`): Perbarui total penduduk, KK, jenis kelamin, dan data dusun.
  - **Anggaran APBDes** (`/admin/keuangan`): Tambah anggaran rinci dengan 6 sumber dana, auto-create bidang belanja, edit, dan hapus.
  - **Sambutan** (`/admin/sambutan`): Edit sambutan Kepala Desa, nama, masa periode, dan foto.
- **Kelola Halaman**:
  - **Visi Misi** (`/admin/visimisi`): Edit visi dan daftar poin misi.
  - **Struktur Desa** (`/admin/struktur`): Edit gambar dan dasar hukum struktur.
  - **Lembaga Desa** (`/admin/lembaga`): CRUD lembaga desa.
  - **Aparatur Desa** (`/admin/aparatur`): CRUD perangkat desa & pemilihan foto.
  - **Fasilitas** (`/admin/fasilitas`): CRUD sarana prasarana desa & kondisi.
  - **Layanan Administrasi** (`/admin/layanan-surat`): CRUD SOP surat dan syarat berkas.
  - **Teks Halaman Lain** (`/admin/halaman-edit`): Edit narasi Sejarah dan Wilayah/Peta.
- **Akun**:
  - **Ubah Password** (`/admin/akun`): Ganti kata sandi administrator.
  - **Logout**: Keluar dari sesi panel admin.

---

## 💰 Logika APBDes 6 Sumber Dana

Sesuai permintaan, sistem mendukung pencatatan 6 sumber dana pada tabel `apbdes`:
1. `dana_desa`: Dana Desa (Transfer APBN Pusat)
2. `alokasi_dana_desa`: Alokasi Dana Desa (ADD dari Kabupaten)
3. `fades_dll`: Pendapatan Asli Desa (PADes / Fades dll)
4. `retribusi_pajak`: Bagi Hasil Pajak & Retribusi Daerah
5. `bantuan_provinsi`: Bantuan Keuangan Khusus Provinsi
6. `bantuan_kabkota`: Bantuan Keuangan Khusus Kabupaten/Kota

Total otomatis dihitung:
$$\text{Total} = \text{dana\_desa} + \text{alokasi\_dana\_desa} + \text{fades\_dll} + \text{retribusi\_pajak} + \text{bantuan\_provinsi} + \text{bantuan\_kabkota}$$

Pada saat penambahan atau pengeditan anggaran kategori **'Belanja'**, jika nama `bidang` yang diinputkan belum ada di tabel `bidang_belanja`, sistem secara otomatis mendaftarkannya.
