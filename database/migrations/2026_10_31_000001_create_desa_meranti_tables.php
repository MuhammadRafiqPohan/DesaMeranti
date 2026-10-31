<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Personal Access Tokens for API Authentication
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('token', 64)->unique();
            $table->string('name')->default('web-admin');
            $table->timestamp('last_used_at')->nullable();
            $table->timestamps();
        });

        // Bidang Belanja
        Schema::create('bidang_belanja', function (Blueprint $table) {
            $table->id();
            $table->string('nama_bidang')->unique();
            $table->timestamps();
        });

        // APBDes
        Schema::create('apbdes', function (Blueprint $table) {
            $table->id();
            $table->integer('tahun')->index();
            $table->string('kategori'); // Pendapatan, Belanja, Pembiayaan
            $table->string('bidang')->nullable()->default('');
            $table->string('kegiatan');
            $table->decimal('dana_desa', 15, 2)->default(0);
            $table->decimal('alokasi_dana_desa', 15, 2)->default(0);
            $table->decimal('fades_dll', 15, 2)->default(0);
            $table->decimal('retribusi_pajak', 15, 2)->default(0);
            $table->decimal('bantuan_provinsi', 15, 2)->default(0);
            $table->decimal('bantuan_kabkota', 15, 2)->default(0);
            $table->timestamps();
        });

        // Postingan (Berita, Pengumuman, Agenda)
        Schema::create('postingan', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('slug')->unique();
            $table->string('kategori'); // Berita, Pengumuman, Agenda
            $table->longText('konten');
            $table->text('ringkasan')->nullable();
            $table->string('gambar')->nullable();
            $table->string('penulis')->default('Pemerintah Desa');
            $table->date('tanggal_kegiatan')->nullable();
            $table->string('lokasi_kegiatan')->nullable();
            $table->string('status')->default('published');
            $table->integer('dibaca')->default(0);
            $table->timestamps();
        });

        // Demografi
        Schema::create('demografi', function (Blueprint $table) {
            $table->id();
            $table->integer('tahun')->unique();
            $table->integer('total_penduduk')->default(0);
            $table->integer('total_kk')->default(0);
            $table->integer('total_laki_laki')->default(0);
            $table->integer('total_perempuan')->default(0);
            $table->json('data_dusun')->nullable();
            $table->json('data_pekerjaan')->nullable();
            $table->json('data_pendidikan')->nullable();
            $table->json('data_usia')->nullable();
            $table->json('data_agama')->nullable();
            $table->timestamps();
        });

        // Sambutan Kepala Desa
        Schema::create('sambutan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kades');
            $table->string('periode')->default('2021 - 2027');
            $table->string('foto')->nullable();
            $table->string('judul')->default('Sambutan Kepala Desa Meranti');
            $table->longText('pesan');
            $table->timestamps();
        });

        // Halaman Profil & Informasi Statis
        Schema::create('halaman_profil', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // sejarah, visi_misi, wilayah, struktur
            $table->string('judul');
            $table->longText('konten')->nullable();
            $table->string('gambar')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
        });

        // Lembaga Desa
        Schema::create('lembaga_desa', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lembaga');
            $table->string('singkatan')->nullable();
            $table->string('ketua')->nullable();
            $table->text('deskripsi')->nullable();
            $table->text('tugas_fungsi')->nullable();
            $table->string('foto')->nullable();
            $table->integer('urutan')->default(0);
            $table->timestamps();
        });

        // Aparatur Desa
        Schema::create('aparatur_desa', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('jabatan');
            $table->string('niap_nip')->nullable();
            $table->string('foto')->nullable();
            $table->integer('urutan')->default(0);
            $table->string('status')->default('Aktif');
            $table->timestamps();
        });

        // Fasilitas Desa
        Schema::create('fasilitas_desa', function (Blueprint $table) {
            $table->id();
            $table->string('nama_fasilitas');
            $table->string('kategori'); // Pemerintahan, Pendidikan, Kesehatan, Sosial & Olahraga, Fasilitas Umum
            $table->string('lokasi')->nullable();
            $table->string('kondisi')->default('Baik');
            $table->text('deskripsi')->nullable();
            $table->string('foto')->nullable();
            $table->timestamps();
        });

        // Layanan Administrasi Surat
        Schema::create('layanan_surat', function (Blueprint $table) {
            $table->id();
            $table->string('nama_surat');
            $table->string('kode_surat')->nullable();
            $table->text('deskripsi')->nullable();
            $table->json('persyaratan')->nullable();
            $table->text('prosedur')->nullable();
            $table->string('waktu_layanan')->default('15 - 30 Menit');
            $table->string('biaya')->default('Gratis (Rp 0)');
            $table->integer('urutan')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('layanan_surat');
        Schema::dropIfExists('fasilitas_desa');
        Schema::dropIfExists('aparatur_desa');
        Schema::dropIfExists('lembaga_desa');
        Schema::dropIfExists('halaman_profil');
        Schema::dropIfExists('sambutan');
        Schema::dropIfExists('demografi');
        Schema::dropIfExists('postingan');
        Schema::dropIfExists('apbdes');
        Schema::dropIfExists('bidang_belanja');
        Schema::dropIfExists('personal_access_tokens');
    }
};
