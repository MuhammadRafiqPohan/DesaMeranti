<?php

namespace Database\Seeders;

use App\Models\AparaturDesa;
use App\Models\Apbdes;
use App\Models\BidangBelanja;
use App\Models\Demografi;
use App\Models\FasilitasDesa;
use App\Models\HalamanProfil;
use App\Models\LayananSurat;
use App\Models\LembagaDesa;
use App\Models\Postingan;
use App\Models\Sambutan;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DesaMerantiSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@desameranti.id'],
            [
                'name' => 'Administrator Desa Meranti',
                'password' => Hash::make('admin123'),
            ]
        );

        // 2. Sambutan Kepala Desa
        Sambutan::updateOrCreate(
            ['id' => 1],
            [
                'nama_kades' => 'H. Suwardi, S.Sos.',
                'periode' => '2021 - 2027',
                'foto' => 'assets/aparatur/KEPALA DESA.png',
                'judul' => 'Selamat Datang di Portal Resmi Desa Meranti',
                'pesan' => "Assalamu’alaikum Warahmatullahi Wabarakatuh,\n\nSalam sejahtera bagi kita semua, Om Swastyastu, Namo Buddhaya, Salam Kebajikan.\n\nPuji syukur kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, karena atas limpahan rahmat dan karunia-Nya, Website Resmi Desa Meranti ini dapat hadir sebagai jendela informasi, wadah transparansi pelayanan publik, serta sarana komunikasi interaktif antara pemerintah desa dan seluruh masyarakat.\n\nDi era digital saat ini, keterbukaan informasi dan kemudahan akses layanan merupakan hak setiap warga masyarakat. Melalui portal ini, kami berkomitmen untuk menyajikan data pembangunan, transparansi pengelolaan APBDes, profil desa, hingga pengurusan administrasi surat secara cepat, akuntabel, dan transparan.\n\nMari bersama-sama kita rawat semangat gotong royong dan kebersamaan demi mewujudkan Desa Meranti yang lebih mandiri, maju, dan sejahtera.\n\nWassalamu’alaikum Warahmatullahi Wabarakatuh.",
            ]
        );

        // 3. Halaman Profil (Sejarah, Visi-Misi, Wilayah, Struktur)
        HalamanProfil::updateOrCreate(
            ['key' => 'visi_misi'],
            [
                'judul' => 'Visi dan Misi Desa Meranti',
                'konten' => "Terwujudnya Desa Meranti yang Mandiri, Sejahtera, Berdaya Saing, Berkeadilan, dan Berakhlak Mulia Berlandaskan Nilai Gotong Royong.",
                'meta' => [
                    'misi' => [
                        'Mewujudkan tata kelola pemerintahan desa yang bersih, transparan, akuntabel, dan berorientasi pada pelayanan masyarakat yang prima.',
                        'Meningkatkan pembangunan infrastruktur perdesaan yang merata, berkelanjutan, dan berwawasan lingkungan.',
                        'Mengembangkan potensi ekonomi lokal, pertanian, perkebunan, dan pemberdayaan Usaha Mikro Kecil Menengah (UMKM) serta BUMDes.',
                        'Meningkatkan mutu pelayanan kesehatan, pendidikan, dan kesejahteraan sosial masyarakat.',
                        'Memperkuat nilai-nilai keagamaan, budaya lokal, dan kerukunan antar warga berasaskan gotong royong.',
                    ],
                    'tujuan' => [
                        'Mewujudkan kemandirian fiskal desa melalui optimalisasi pendapatan asli desa.',
                        'Mempercepat pemerataan akses jalan tani dan fasilitas umum.',
                        'Menghadirkan pelayanan administrasi warga yang cepat, tepat, dan tanpa pungli.',
                    ]
                ]
            ]
        );

        HalamanProfil::updateOrCreate(
            ['key' => 'sejarah'],
            [
                'judul' => 'Sejarah Perkembangan Desa Meranti',
                'konten' => "Desa Meranti memiliki latar belakang sejarah yang kaya dan sarat akan nilai-nilai kearifan lokal. Awal mula penamaan 'Meranti' diambil dari rimbunnya pohon kayu Meranti yang menjulang tinggi di kawasan pemukiman awal para perintis desa pada awal dekade abad ke-20.\n\nPara perintis yang datang merupakan kelompok masyarakat pekerja keras yang membuka areal perkebunan dan persawahan. Seiring berjalannya waktu, wilayah ini berkembang menjadi pemukiman yang teratur dan tentram. Gotong royong yang kuat menjadi fondasi utama masyarakat dalam membangun saluran pengairan, jalan desa, dan sarana ibadah.\n\nSecara administratif, Desa Meranti disahkan sebagai desa definitif dan hingga kini terus bertransformasi menuju desa modern tanpa meninggalkan keluhuran adat dan tradisi yang diwariskan turun-temurun.",
                'gambar' => 'assets/Foto-Desa.png',
                'meta' => [
                    'tahun_berdiri' => '1952',
                    'tokoh_pendiri' => 'Buyung Sutan Marajo & Tokoh Adat',
                    'keunggulan' => 'Pertanian Padi Organik & Perkebunan Rakyat',
                ]
            ]
        );

        HalamanProfil::updateOrCreate(
            ['key' => 'wilayah'],
            [
                'judul' => 'Wilayah dan Peta Desa Meranti',
                'konten' => "Desa Meranti terletak pada posisi strategis dengan topografi daratan subur dan perbukitan landai yang sangat potensial untuk sektor pertanian tanaman pangan dan perkebunan hortikultura.\n\nLuas total wilayah Desa Meranti adalah sekitar 1.250 Hektar yang terbagi menjadi 2 Dusun utama, yaitu Dusun I dan Dusun II, dengan pembagian zona pemukiman, areal persawahan irigasi, perkebunan rakyat, dan fasilitas publik.",
                'gambar' => 'assets/Peta-Desa.jpg',
                'meta' => [
                    'luas_wilayah' => '1.250 Ha',
                    'batas_utara' => 'Desa Sukamaju',
                    'batas_selatan' => 'Sungai Batang Meranti / Hutan Lindung',
                    'batas_timur' => 'Desa Koto Baru',
                    'batas_barat' => 'Kecamatan Tetangga',
                    'ketinggian' => '150 - 300 mdpl',
                    'koordinat' => "0°34'12\" LS - 100°45'22\" BT",
                ]
            ]
        );

        HalamanProfil::updateOrCreate(
            ['key' => 'struktur'],
            [
                'judul' => 'Bagan Struktur Organisasi Pemerintah Desa',
                'konten' => 'Struktur organisasi Pemerintah Desa Meranti berpedoman pada Permendagri Nomor 84 Tahun 2015 tentang Susunan Organisasi dan Tata Kerja Pemerintah Desa.',
                'gambar' => 'assets/Struktur-Desa.png',
                'meta' => [
                    'sk_bupati' => 'No. 140/32/KEP-BUP/2021',
                    'tahun_penetapan' => '2021',
                ]
            ]
        );

        // 4. Aparatur Desa
        $aparaturList = [
            [
                'nama' => 'H. Suwardi, S.Sos.',
                'jabatan' => 'Kepala Desa',
                'niap_nip' => '197505102008011002',
                'foto' => 'assets/aparatur/KEPALA DESA.png',
                'urutan' => 1,
                'status' => 'Aktif',
            ],
            [
                'nama' => 'Ahmad Fauzi, S.AP.',
                'jabatan' => 'Sekretaris Desa',
                'niap_nip' => '198203152010011015',
                'foto' => 'assets/aparatur/SEKDES.png',
                'urutan' => 2,
                'status' => 'Aktif',
            ],
            [
                'nama' => 'Rina Andriani, S.E.',
                'jabatan' => 'Kaur Keuangan',
                'niap_nip' => '198807202012022003',
                'foto' => 'assets/aparatur/KAUR KEUANGAN.png',
                'urutan' => 3,
                'status' => 'Aktif',
            ],
            [
                'nama' => 'Budi Santoso, S.T.',
                'jabatan' => 'Kaur Perencanaan',
                'niap_nip' => '198511042011011009',
                'foto' => 'assets/aparatur/KAUR PERENCANAAN.png',
                'urutan' => 4,
                'status' => 'Aktif',
            ],
            [
                'nama' => 'Dedi Kurniawan, S.IP.',
                'jabatan' => 'Kasi Pemerintahan',
                'niap_nip' => '198309182009011008',
                'foto' => 'assets/aparatur/KASI PEMERINTAHAN.png',
                'urutan' => 5,
                'status' => 'Aktif',
            ],
            [
                'nama' => 'Siti Aminah, S.Pd.',
                'jabatan' => 'Kasi Kesejahteraan',
                'niap_nip' => '198712122014022005',
                'foto' => 'assets/aparatur/KASI KESEJAHTERAAN.png',
                'urutan' => 6,
                'status' => 'Aktif',
            ],
            [
                'nama' => 'Hendra Pratama',
                'jabatan' => 'Kasi Pelayanan',
                'niap_nip' => '199004052016011004',
                'foto' => 'assets/aparatur/KASI PELAYANAN.png',
                'urutan' => 7,
                'status' => 'Aktif',
            ],
            [
                'nama' => 'M. Yusuf',
                'jabatan' => 'Kepala Dusun 1',
                'niap_nip' => '197902142007011001',
                'foto' => 'assets/aparatur/KADUS 1.png',
                'urutan' => 8,
                'status' => 'Aktif',
            ],
            [
                'nama' => 'Zulkifli',
                'jabatan' => 'Kepala Dusun 2',
                'niap_nip' => '198106252009011003',
                'foto' => 'assets/aparatur/KADUS 2.png',
                'urutan' => 9,
                'status' => 'Aktif',
            ],
        ];

        foreach ($aparaturList as $ap) {
            AparaturDesa::updateOrCreate(
                ['jabatan' => $ap['jabatan']],
                $ap
            );
        }

        // 5. Lembaga Desa
        $lembagaList = [
            [
                'nama_lembaga' => 'Badan Permusyawaratan Desa',
                'singkatan' => 'BPD',
                'ketua' => 'Drs. H. Mulyadi',
                'deskripsi' => 'Lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa yang menampung dan menyalurkan aspirasi masyarakat.',
                'tugas_fungsi' => 'Membahas dan menyepakati Rancangan Peraturan Desa bersama Kepala Desa, menampung dan menyalurkan aspirasi masyarakat, serta melakukan pengawasan kinerja Kepala Desa.',
                'urutan' => 1,
            ],
            [
                'nama_lembaga' => 'Lembaga Pemberdayaan Masyarakat Desa',
                'singkatan' => 'LPMD',
                'ketua' => 'Syarifuddin, S.Pd.',
                'deskripsi' => 'Mitra kerja pemerintah desa dalam merencanakan, melaksanakan, dan menggerakkan partisipasi swadaya gotong royong masyarakat.',
                'tugas_fungsi' => 'Penyusunan rencana pembangunan yang partisipatif, penggerak gotong royong, dan pemberdayaan masyarakat perdesaan.',
                'urutan' => 2,
            ],
            [
                'nama_lembaga' => 'Pemberdayaan Kesejahteraan Keluarga',
                'singkatan' => 'PKK Desa',
                'ketua' => 'Hj. Nurhayati Suwardi',
                'deskripsi' => 'Gerakan nasional yang tumbuh dari bawah, dikelola oleh wanita untuk mewujudkan keluarga yang beriman, sehat, sejahtera, dan mandiri.',
                'tugas_fungsi' => 'Pelaksanaan 10 Program Pokok PKK, pembinaan posyandu, pencegahan stunting, dan pelatihan keterampilan ekonomi keluarga.',
                'urutan' => 3,
            ],
            [
                'nama_lembaga' => 'Karang Taruna "Karya Muda Meranti"',
                'singkatan' => 'Karang Taruna',
                'ketua' => 'Rian Hidayat',
                'deskripsi' => 'Wadah pembinaan generasi muda desa dalam mengembangkan potensi pemuda di bidang olahraga, keagamaan, dan sosial kemasyarakatan.',
                'tugas_fungsi' => 'Pencegahan kenakalan remaja, penyelenggaraan turnamen olahraga, dan aksi sosial kepemudaan.',
                'urutan' => 4,
            ],
            [
                'nama_lembaga' => 'Posyandu Terpadu Balita & Lansia',
                'singkatan' => 'Posyandu',
                'ketua' => 'Bidan Desa: Siti Rahma, Amd.Keb.',
                'deskripsi' => 'Pelayanan kesehatan dasar berbasis masyarakat untuk memantau tumbuh kembang balita, kesehatan ibu hamil, dan pemeriksaan lansia.',
                'tugas_fungsi' => 'Penimbangan rutin balita, imunisasi lengkap, penyuluhan gizi seimbang, dan cek tensi/kesehatan lansia.',
                'urutan' => 5,
            ],
        ];

        foreach ($lembagaList as $lb) {
            LembagaDesa::updateOrCreate(
                ['singkatan' => $lb['singkatan']],
                $lb
            );
        }

        // 6. Fasilitas Desa
        $fasilitasList = [
            [
                'nama_fasilitas' => 'Kantor Desa Meranti',
                'kategori' => 'Pemerintahan',
                'lokasi' => 'Jl. Raya Meranti No. 01, Dusun I',
                'kondisi' => 'Baik',
                'deskripsi' => 'Pusat pelayanan administrasi kependudukan dan penyelenggaraan pemerintahan desa yang dilengkapi ruang pelayanan terpadu satu pintu (PTSP).',
                'foto' => 'assets/fasilitas/kantordesa.JPG',
            ],
            [
                'nama_fasilitas' => 'Balai Pertemuan Desa Meranti',
                'kategori' => 'Sosial & Olahraga',
                'lokasi' => 'Sebelah Kantor Desa Meranti, Dusun I',
                'kondisi' => 'Baik',
                'deskripsi' => 'Gedung serbaguna untuk musyawarah desa (Musdes), peringatan hari besar, kegiatan pentas seni, dan sarana olahraga bulu tangkis.',
                'foto' => 'assets/fasilitas/balaidesa.jpg',
            ],
            [
                'nama_fasilitas' => 'TK & PAUD Tunas Harapan Meranti',
                'kategori' => 'Pendidikan',
                'lokasi' => 'Jl. Melati RT 03 Dusun II',
                'kondisi' => 'Baik',
                'deskripsi' => 'Sarana pendidikan anak usia dini percontohan desa yang mendidik generasi tunas bangsa berkarakter dan berbudi pekerti.',
                'foto' => 'assets/fasilitas/tk.jpg',
            ],
            [
                'nama_fasilitas' => 'Poskesdes (Pos Kesehatan Desa)',
                'kategori' => 'Kesehatan',
                'lokasi' => 'Kompleks Kantor Desa, Dusun I',
                'kondisi' => 'Baik',
                'deskripsi' => 'Fasilitas kesehatan primer yang melayani pertolongan pertama, pemeriksaan ibu hamil, dan pelayanan rawat jalan ringan oleh Bidan Desa.',
                'foto' => 'assets/fasilitas/kantordesa.JPG',
            ],
        ];

        foreach ($fasilitasList as $fas) {
            FasilitasDesa::updateOrCreate(
                ['nama_fasilitas' => $fas['nama_fasilitas']],
                $fas
            );
        }

        // 7. Demografi Penduduk
        Demografi::updateOrCreate(
            ['tahun' => 2026],
            [
                'total_penduduk' => 2845,
                'total_kk' => 820,
                'total_laki_laki' => 1435,
                'total_perempuan' => 1410,
                'data_dusun' => [
                    ['nama' => 'Dusun I (Meranti Hulu)', 'jumlah_jiwa' => 1450, 'jumlah_kk' => 420, 'rt' => 4],
                    ['nama' => 'Dusun II (Meranti Hilir)', 'jumlah_jiwa' => 1395, 'jumlah_kk' => 400, 'rt' => 4],
                ],
                'data_pekerjaan' => [
                    ['kategori' => 'Petani & Pekebun', 'jumlah' => 980, 'persentase' => 34.4],
                    ['kategori' => 'Wiraswasta / Pedagang', 'jumlah' => 420, 'persentase' => 14.8],
                    ['kategori' => 'Karyawan Swasta / Buruh', 'jumlah' => 310, 'persentase' => 10.9],
                    ['kategori' => 'Pelajar / Mahasiswa', 'jumlah' => 490, 'persentase' => 17.2],
                    ['kategori' => 'PNS / TNI / POLRI', 'jumlah' => 85, 'persentase' => 3.0],
                    ['kategori' => 'Lainnya / Mengurus Rumah Tangga', 'jumlah' => 560, 'persentase' => 19.7],
                ],
                'data_pendidikan' => [
                    ['kategori' => 'Tamat SMA / SMK Sederajat', 'jumlah' => 890, 'persentase' => 31.3],
                    ['kategori' => 'Tamat SMP / Sederajat', 'jumlah' => 720, 'persentase' => 25.3],
                    ['kategori' => 'Tamat SD / Sederajat', 'jumlah' => 650, 'persentase' => 22.8],
                    ['kategori' => 'Diploma / Sarjana (S1/S2)', 'jumlah' => 355, 'persentase' => 12.5],
                    ['kategori' => 'Belum / Tidak Tamat SD', 'jumlah' => 230, 'persentase' => 8.1],
                ],
                'data_usia' => [
                    ['kelompok' => 'Balita (0 - 4 Tahun)', 'jumlah' => 210],
                    ['kelompok' => 'Anak-Anak (5 - 14 Tahun)', 'jumlah' => 430],
                    ['kelompok' => 'Remaja (15 - 24 Tahun)', 'jumlah' => 520],
                    ['kelompok' => 'Usia Produktif (25 - 59 Tahun)', 'jumlah' => 1295],
                    ['kelompok' => 'Lansia (60 Tahun ke atas)', 'jumlah' => 390],
                ],
                'data_agama' => [
                    ['agama' => 'Islam', 'jumlah' => 2810],
                    ['agama' => 'Kristen / Katolik', 'jumlah' => 25],
                    ['agama' => 'Lainnya', 'jumlah' => 10],
                ],
            ]
        );

        // 8. Postingan (Berita, Pengumuman, Agenda)
        $posts = [
            [
                'judul' => 'Penyaluran Bantuan Langsung Tunai Dana Desa (BLT-DD) Tahap I Berlangsung Tertib',
                'slug' => 'penyaluran-blt-dana-desa-tahap-i-berlangsung-tertib',
                'kategori' => 'Berita',
                'konten' => "Pemerintah Desa Meranti sukses merealisasikan penyaluran Bantuan Langsung Tunai Dana Desa (BLT-DD) untuk tahap pertama tahun anggaran ini di Gedung Balai Pertemuan Desa.\n\nSebanyak 45 Keluarga Penerima Manfaat (KPM) menerima bantuan sebesar Rp 300.000,- per bulan. Kegiatan ini dihadiri langsung oleh Kepala Desa Meranti H. Suwardi, S.Sos., didampingi oleh Ketua BPD, Bhabinkamtibmas, dan Babinsa setempat.\n\nDalam arahannya, Kepala Desa berpesan agar dana stimulan ini dimanfaatkan sebaik-baiknya untuk memenuhi kebutuhan bahan pokok keluarga menjelang bulan suci.",
                'ringkasan' => 'Sebanyak 45 Keluarga Penerima Manfaat (KPM) di Desa Meranti menerima penyaluran Bantuan Langsung Tunai Dana Desa (BLT-DD) tahap pertama di Balai Desa.',
                'gambar' => 'assets/berita/berita1.png',
                'penulis' => 'Humas Desa Meranti',
                'status' => 'published',
                'dibaca' => 248,
            ],
            [
                'judul' => 'Gotong Royong Massal Perbaikan Saluran Irigasi dan Penataan Kebersihan Lingkungan',
                'slug' => 'gotong-royong-massal-perbaikan-irigasi-penataan-lingkungan',
                'kategori' => 'Berita',
                'konten' => "Warga Dusun I dan Dusun II Desa Meranti secara serempak mengadakan kegiatan gotong royong massal pada hari Minggu pagi.\n\nFokus kegiatan gotong royong kali ini adalah pembersihan saluran irigasi sawah sepanjang 1,2 kilometer dari endapan lumpur serta pemangkasan dahan pohon di sepanjang jalan poros utama desa yang berpotensi membahayakan kabel listrik.\n\nKebersamaan warga sangat terasa dengan adanya sajian kopi dan makanan ringan swadaya masyarakat yang disiapkan oleh para kader ibu-ibu PKK.",
                'ringkasan' => 'Warga Desa Meranti kompak bergotong royong membersihkan saluran irigasi sepanjang 1,2 km demi kelancaran musim tanam padi serentak.',
                'gambar' => 'assets/berita/berita2.webp',
                'penulis' => 'Humas Desa Meranti',
                'status' => 'published',
                'dibaca' => 189,
            ],
            [
                'judul' => 'Pelatihan Pemanfaatan Pupuk Organik Cair Bagi Kelompok Tani Desa Meranti',
                'slug' => 'pelatihan-pupuk-organik-cair-kelompok-tani-meranti',
                'kategori' => 'Berita',
                'konten' => "Untuk mengurangi ketergantungan petani terhadap pupuk kimia yang harganya kian melambung, Pemerintah Desa Meranti bekerjasama dengan Balai Penyuluhan Pertanian menyelenggarakan pelatihan pembuatan pupuk organik cair (POC) berbasis limbah rumah tangga dan kotoran ternak.\n\nPelatihan yang berlangsung selama dua hari ini diikuti oleh perwakilan dari 6 kelompok tani yang ada di Desa Meranti. Setiap peserta dibekali starter bakteri pengurai serta tong fermentasi gratis dari alokasi dana pemberdayaan masyarakat APBDes.",
                'ringkasan' => 'Pemerintah Desa Meranti menggelar pelatihan pembuatan Pupuk Organik Cair (POC) ramah lingkungan untuk 6 kelompok tani guna menekan biaya produksi.',
                'gambar' => 'assets/berita/beritaS.jpeg',
                'penulis' => 'Kaur Perencanaan',
                'status' => 'published',
                'dibaca' => 315,
            ],
            [
                'judul' => 'Pengumuman Jadwal Pelayanan Perekaman KTP Elektronik dan Pembaruan Kartu Keluarga',
                'slug' => 'pengumuman-pelayanan-ktp-el-pembaruan-kk-keliling',
                'kategori' => 'Pengumuman',
                'konten' => "Diberitahukan kepada seluruh warga Desa Meranti bahwa Dinas Kependudukan dan Pencatatan Sipil akan mengadakan Layanan Jemput Bola di Kantor Desa Meranti pada:\n\nHari / Tanggal : Selasa, 10 November 2026\nWaktu : Pukul 08.30 - 15.00 WIB\nTempat : Aula Kantor Desa Meranti\n\nSyarat Perekaman KTP-El:\n1. Berusia genap 17 tahun atau sudah menikah\n2. Membawa fotokopi Kartu Keluarga terbaru\n\nSemua layanan ini tidak dipungut biaya (GRATIS). Silakan manfaatkan kesempatan ini dengan sebaik-baiknya.",
                'ringkasan' => 'Layanan jemput bola perekaman KTP Elektronik dan pembaruan Kartu Keluarga gratis di Aula Kantor Desa Meranti.',
                'gambar' => 'assets/Foto-Desa.png',
                'penulis' => 'Kasi Pelayanan',
                'status' => 'published',
                'dibaca' => 450,
            ],
            [
                'judul' => 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) Penetapan RKPDes 2027',
                'slug' => 'musrenbangdes-penetapan-rkpdes-tahun-2027',
                'kategori' => 'Agenda',
                'konten' => "Undangan terbuka bagi segenap BPD, Ketua RT/RW, Tokoh Masyarakat, Tokoh Agama, Pengurus Karang Taruna, dan Kader Posyandu untuk menghadiri Musrenbangdes dalam rangka penyusunan dan penetapan Rencana Kerja Pemerintah Desa (RKPDes) Tahun Anggaran 2027.",
                'ringkasan' => 'Musrenbangdes pembahasan arah kebijakan prioritas pembangunan desa untuk tahun anggaran berikutnya.',
                'gambar' => 'assets/fasilitas/balaidesa.jpg',
                'penulis' => 'Sekretaris Desa',
                'tanggal_kegiatan' => '2026-11-15',
                'lokasi_kegiatan' => 'Balai Pertemuan Desa Meranti',
                'status' => 'published',
                'dibaca' => 160,
            ],
        ];

        foreach ($posts as $post) {
            Postingan::updateOrCreate(
                ['slug' => $post['slug']],
                $post
            );
        }

        // 9. Bidang Belanja
        $bidangList = [
            'Bidang Penyelenggaraan Pemerintahan Desa',
            'Bidang Pelaksanaan Pembangunan Desa',
            'Bidang Pembinaan Kemasyarakatan Desa',
            'Bidang Pemberdayaan Masyarakat Desa',
            'Bidang Penanggulangan Bencana, Keadaan Darurat dan Mendesak Desa',
        ];

        foreach ($bidangList as $namaBidang) {
            BidangBelanja::firstOrCreate(['nama_bidang' => $namaBidang]);
        }

        // 10. APBDes (Tahun 2026) - 6 Sumber Dana
        $anggaranData = [
            // Pendapatan
            [
                'tahun' => 2026,
                'kategori' => 'Pendapatan',
                'bidang' => '',
                'kegiatan' => 'Pendapatan Asli Desa (PADes - Hasil Aset & Usaha Desa)',
                'dana_desa' => 0,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 45000000,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Pendapatan',
                'bidang' => '',
                'kegiatan' => 'Dana Desa (Transfer APBN Pusat)',
                'dana_desa' => 865000000,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 0,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Pendapatan',
                'bidang' => '',
                'kegiatan' => 'Alokasi Dana Desa (ADD dari Pemerintah Kabupaten)',
                'dana_desa' => 0,
                'alokasi_dana_desa' => 435000000,
                'fades_dll' => 0,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Pendapatan',
                'bidang' => '',
                'kegiatan' => 'Bagian dari Hasil Pajak dan Retribusi Daerah',
                'dana_desa' => 0,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 0,
                'retribusi_pajak' => 38500000,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Pendapatan',
                'bidang' => '',
                'kegiatan' => 'Bantuan Keuangan Khusus Pemerintah Provinsi',
                'dana_desa' => 0,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 0,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 100000000,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Pendapatan',
                'bidang' => '',
                'kegiatan' => 'Bantuan Keuangan Khusus Pemerintah Kabupaten',
                'dana_desa' => 0,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 0,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 65000000,
            ],

            // Belanja
            [
                'tahun' => 2026,
                'kategori' => 'Belanja',
                'bidang' => 'Bidang Penyelenggaraan Pemerintahan Desa',
                'kegiatan' => 'Penghasilan Tetap (Siltap) dan Tunjangan Kepala Desa serta Perangkat',
                'dana_desa' => 0,
                'alokasi_dana_desa' => 320000000,
                'fades_dll' => 0,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Belanja',
                'bidang' => 'Bidang Penyelenggaraan Pemerintahan Desa',
                'kegiatan' => 'Operasional Perkantoran, Perlengkapan, dan Pelayanan Administrasi Desa',
                'dana_desa' => 0,
                'alokasi_dana_desa' => 75000000,
                'fades_dll' => 15000000,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Belanja',
                'bidang' => 'Bidang Pelaksanaan Pembangunan Desa',
                'kegiatan' => 'Peningkatan Jalan Usaha Tani & Rabat Beton Dusun I (Panjang 750 m)',
                'dana_desa' => 285000000,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 0,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 50000000,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Belanja',
                'bidang' => 'Bidang Pelaksanaan Pembangunan Desa',
                'kegiatan' => 'Pembangunan Saluran Drainase & Pencegahan Banjir Dusun II',
                'dana_desa' => 195000000,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 0,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 35000000,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Belanja',
                'bidang' => 'Bidang Pelaksanaan Pembangunan Desa',
                'kegiatan' => 'Rehabilitasi Gedung Poskesdes & Sarana MCK Komunal',
                'dana_desa' => 90000000,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 0,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 30000000,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Belanja',
                'bidang' => 'Bidang Pembinaan Kemasyarakatan Desa',
                'kegiatan' => 'Pembinaan Kelembagaan Pemuda, Karang Taruna, dan Sarana Olahraga',
                'dana_desa' => 45000000,
                'alokasi_dana_desa' => 15000000,
                'fades_dll' => 0,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Belanja',
                'bidang' => 'Bidang Pembinaan Kemasyarakatan Desa',
                'kegiatan' => 'Kegiatan Keagamaan, Peringatan PHBI, dan Pembinaan Seni Budaya Lokal',
                'dana_desa' => 20000000,
                'alokasi_dana_desa' => 25000000,
                'fades_dll' => 0,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Belanja',
                'bidang' => 'Bidang Pemberdayaan Masyarakat Desa',
                'kegiatan' => 'Pelatihan Teknologi Pengolahan Pasca Panen dan Bantuan Alat Tani',
                'dana_desa' => 75000000,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 0,
                'retribusi_pajak' => 38500000,
                'bantuan_provinsi' => 20000000,
                'bantuan_kabkota' => 30000000,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Belanja',
                'bidang' => 'Bidang Pemberdayaan Masyarakat Desa',
                'kegiatan' => 'Pemberian Makanan Tambahan (PMT) Balita & Lansia Cegah Stunting',
                'dana_desa' => 47000000,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 10000000,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 0,
            ],
            [
                'tahun' => 2026,
                'kategori' => 'Belanja',
                'bidang' => 'Bidang Penanggulangan Bencana, Keadaan Darurat dan Mendesak Desa',
                'kegiatan' => 'Bantuan Langsung Tunai Dana Desa (BLT-DD) 45 KPM selama 1 Tahun',
                'dana_desa' => 108000000,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 0,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 0,
            ],

            // Pembiayaan
            [
                'tahun' => 2026,
                'kategori' => 'Pembiayaan',
                'bidang' => '',
                'kegiatan' => 'Penyertaan Modal Desa pada BUMDes Meranti Mandiri',
                'dana_desa' => 0,
                'alokasi_dana_desa' => 0,
                'fades_dll' => 20000000,
                'retribusi_pajak' => 0,
                'bantuan_provinsi' => 0,
                'bantuan_kabkota' => 0,
            ],
        ];

        foreach ($anggaranData as $item) {
            Apbdes::updateOrCreate(
                [
                    'tahun' => $item['tahun'],
                    'kegiatan' => $item['kegiatan'],
                ],
                $item
            );
        }

        // 11. Layanan Administrasi Surat
        $layananSurat = [
            [
                'nama_surat' => 'Surat Keterangan Usaha (SKU)',
                'kode_surat' => '503/SKU/MRNT',
                'deskripsi' => 'Surat keterangan resmi dari pemerintah desa untuk keperluan pengajuan izin usaha, peminjaman KUR perbankan, atau verifikasi legalitas usaha mikro/kecil.',
                'persyaratan' => [
                    'Fotokopi KTP Pemohon (masih berlaku)',
                    'Fotokopi Kartu Keluarga (KK)',
                    'Surat Pengantar dari Ketua RT setempat',
                    'Foto tempat usaha / kegiatan usaha',
                ],
                'prosedur' => "1. Pemohon membawa surat pengantar dari RT ke loket pelayanan Kantor Desa.\n2. Petugas memverifikasi kelengkapan berkas.\n3. Operator mencetak draf Surat Keterangan Usaha.\n4. Penandatanganan oleh Kepala Desa / Sekretaris Desa serta dibubuhi stempel resmi desa.\n5. Surat diserahkan kepada pemohon tanpa dipungut biaya.",
                'waktu_layanan' => '15 - 30 Menit',
                'biaya' => 'Gratis (Rp 0)',
                'urutan' => 1,
            ],
            [
                'nama_surat' => 'Surat Keterangan Domisili',
                'kode_surat' => '470/SKD/MRNT',
                'deskripsi' => 'Surat yang menerangkan bahwa warga berdomisili/tinggal secara sah di wilayah Desa Meranti.',
                'persyaratan' => [
                    'Fotokopi KTP Pemohon',
                    'Fotokopi Kartu Keluarga (KK)',
                    'Surat Pengantar dari RT/RW setempat',
                ],
                'prosedur' => "1. Mengajukan berkas pengantar RT ke kantor desa.\n2. Pemeriksaan data kependudukan oleh petugas.\n3. Pencetakan surat dan pengesahan oleh Kepala Desa.\n4. Penyerahan surat kepada warga.",
                'waktu_layanan' => '15 Menit',
                'biaya' => 'Gratis (Rp 0)',
                'urutan' => 2,
            ],
            [
                'nama_surat' => 'Surat Keterangan Tidak Mampu (SKTM)',
                'kode_surat' => '400/SKTM/MRNT',
                'deskripsi' => 'Surat yang menerangkan kondisi sosial ekonomi keluarga pemohon untuk pengajuan beasiswa, KIP Kuliah, keringanan biaya berobat BPJS/RS, dll.',
                'persyaratan' => [
                    'Fotokopi KTP & Kartu Keluarga',
                    'Surat Pengantar RT yang menyatakan kondisi ekonomi tidak mampu',
                    'Foto rumah tinggal (tampak depan & dalam)',
                    'Surat Pernyataan Tidak Mampu bermeterai 10.000',
                ],
                'prosedur' => "1. Pemohon datang ke Kantor Desa membawa berkas persyaratan lengkap.\n2. Verifikasi berkas dan pengecekan data DTKS/P3KE oleh Kasi Kesejahteraan.\n3. Penerbitan dan legalisasi SKTM oleh Kepala Desa.\n4. Surat siap digunakan untuk keperluan instansi terkait.",
                'waktu_layanan' => '20 - 30 Menit',
                'biaya' => 'Gratis (Rp 0)',
                'urutan' => 3,
            ],
            [
                'nama_surat' => 'Surat Pengantar Catatan Kepolisian (SKCK)',
                'kode_surat' => '300/SKCK/MRNT',
                'deskripsi' => 'Surat pengantar rekomendasi dari desa sebagai syarat utama pembuatan SKCK di Polsek/Polres.',
                'persyaratan' => [
                    'Fotokopi KTP dan Akta Kelahiran',
                    'Fotokopi Kartu Keluarga',
                    'Surat Pengantar dari RT setempat',
                    'Pas foto 4x6 latar merah (2 lembar)',
                ],
                'prosedur' => "1. Penyerahan berkas pengantar RT ke meja pelayanan desa.\n2. Pembuatan surat pengantar desa.\n3. Penandatanganan Kepala Desa dan cap stempel.\n4. Warga membawa surat pengantar desa ke Polsek setempat.",
                'waktu_layanan' => '15 Menit',
                'biaya' => 'Gratis (Rp 0)',
                'urutan' => 4,
            ],
            [
                'nama_surat' => 'Surat Keterangan Kelahiran',
                'kode_surat' => '472.11/SKL/MRNT',
                'deskripsi' => 'Surat bukti kelahiran anak di wilayah desa untuk pengurusan Akta Kelahiran dan penambahan anggota keluarga pada KK.',
                'persyaratan' => [
                    'Surat Keterangan Lahir dari Bidan / Rumah Sakit / Puskesmas',
                    'Fotokopi Buku Nikah orang tua',
                    'Fotokopi KTP kedua orang tua',
                    'Fotokopi KTP 2 orang saksi',
                    'Kartu Keluarga asli',
                ],
                'prosedur' => "1. Melapor ke loket pelayanan desa maksimal 30 hari sejak persalinan.\n2. Petugas memverifikasi kelengkapan dokumen saksi dan orang tua.\n3. Pembuatan Surat Keterangan Kelahiran resmi desa (F-2.01).\n4. Penyerahan surat untuk diteruskan ke Disdukcapil.",
                'waktu_layanan' => '20 Menit',
                'biaya' => 'Gratis (Rp 0)',
                'urutan' => 5,
            ],
            [
                'nama_surat' => 'Surat Keterangan Kematian',
                'kode_surat' => '472.12/SKK/MRNT',
                'deskripsi' => 'Surat yang menerangkan peristiwa kematian warga untuk pengurusan Akta Kematian, penghapusan data KK, dan waris/perbankan.',
                'persyaratan' => [
                    'Surat Kematian dari Dokter / Rumah Sakit (jika meninggal di RS)',
                    'Fotokopi KTP almarhum/almarhumah',
                    'Fotokopi Kartu Keluarga',
                    'Fotokopi KTP Pelapor & 2 orang saksi',
                ],
                'prosedur' => "1. Ahli waris atau keluarga melapor ke Kantor Desa.\n2. Petugas memproses pencatatan kematian.\n3. Penerbitan surat keterangan kematian resmi desa.\n4. Penyerahan dokumen tanpa biaya.",
                'waktu_layanan' => '15 Menit',
                'biaya' => 'Gratis (Rp 0)',
                'urutan' => 6,
            ],
        ];

        foreach ($layananSurat as $surat) {
            LayananSurat::updateOrCreate(
                ['nama_surat' => $surat['nama_surat']],
                $surat
            );
        }
    }
}
