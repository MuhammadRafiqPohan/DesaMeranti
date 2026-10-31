<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    /**
     * Dashboard Overview Statistics
     */
    public function dashboard()
    {
        $tahun = Apbdes::max('tahun') ?? 2026;
        $totalAnggaran = Apbdes::where('tahun', $tahun)->where('kategori', 'Pendapatan')->get()->sum('total');

        return response()->json([
            'success' => true,
            'data' => [
                'counts' => [
                    'berita' => Postingan::where('kategori', 'Berita')->count(),
                    'pengumuman' => Postingan::where('kategori', 'Pengumuman')->count(),
                    'agenda' => Postingan::where('kategori', 'Agenda')->count(),
                    'aparatur' => AparaturDesa::count(),
                    'lembaga' => LembagaDesa::count(),
                    'fasilitas' => FasilitasDesa::count(),
                    'layanan_surat' => LayananSurat::count(),
                    'total_apbdes' => $totalAnggaran,
                ],
                'latest_posts' => Postingan::orderBy('created_at', 'desc')->take(5)->get(),
                'demografi' => Demografi::orderBy('tahun', 'desc')->first(),
            ]
        ]);
    }

    // ==========================================
    // 1. KELOLA KEUANGAN / APBDES
    // ==========================================

    public function getKeuangan(Request $request)
    {
        $query = Apbdes::query();
        if ($request->has('tahun') && !empty($request->tahun)) {
            $query->where('tahun', $request->tahun);
        }
        if ($request->has('kategori') && !empty($request->kategori)) {
            $query->where('kategori', $request->kategori);
        }
        $data = $query->orderBy('tahun', 'desc')->orderBy('id', 'desc')->get();
        $bidangList = BidangBelanja::pluck('nama_bidang');
        $tahunList = Apbdes::select('tahun')->distinct()->orderBy('tahun', 'desc')->pluck('tahun');

        return response()->json([
            'success' => true,
            'data' => $data,
            'bidang_list' => $bidangList,
            'tahun_list' => $tahunList,
        ]);
    }

    public function storeKeuangan(Request $request)
    {
        $request->validate([
            'tahun' => 'required|integer',
            'kategori' => 'required|string|in:Pendapatan,Belanja,Pembiayaan',
            'kegiatan' => 'required|string',
        ]);

        $bidangNama = '';
        if ($request->kategori === 'Belanja' && !empty(trim($request->bidang ?? ''))) {
            $bidangNama = trim($request->bidang);
            // Tambahkan otomatis ke tabel bidang_belanja jika belum ada
            BidangBelanja::firstOrCreate(['nama_bidang' => $bidangNama]);
        }

        $apbdes = Apbdes::create([
            'tahun' => $request->tahun,
            'kategori' => $request->kategori,
            'bidang' => $bidangNama,
            'kegiatan' => $request->kegiatan,
            'dana_desa' => $request->dana_desa ?? 0,
            'alokasi_dana_desa' => $request->alokasi_dana_desa ?? 0,
            'fades_dll' => $request->fades_dll ?? 0,
            'retribusi_pajak' => $request->retribusi_pajak ?? 0,
            'bantuan_provinsi' => $request->bantuan_provinsi ?? 0,
            'bantuan_kabkota' => $request->bantuan_kabkota ?? 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data anggaran APBDes berhasil ditambahkan.',
            'data' => $apbdes,
        ]);
    }

    public function updateKeuangan(Request $request, $id)
    {
        $apbdes = Apbdes::findOrFail($id);

        $request->validate([
            'tahun' => 'required|integer',
            'kategori' => 'required|string|in:Pendapatan,Belanja,Pembiayaan',
            'kegiatan' => 'required|string',
        ]);

        $bidangNama = '';
        if ($request->kategori === 'Belanja' && !empty(trim($request->bidang ?? ''))) {
            $bidangNama = trim($request->bidang);
            BidangBelanja::firstOrCreate(['nama_bidang' => $bidangNama]);
        }

        $apbdes->update([
            'tahun' => $request->tahun,
            'kategori' => $request->kategori,
            'bidang' => $bidangNama,
            'kegiatan' => $request->kegiatan,
            'dana_desa' => $request->dana_desa ?? 0,
            'alokasi_dana_desa' => $request->alokasi_dana_desa ?? 0,
            'fades_dll' => $request->fades_dll ?? 0,
            'retribusi_pajak' => $request->retribusi_pajak ?? 0,
            'bantuan_provinsi' => $request->bantuan_provinsi ?? 0,
            'bantuan_kabkota' => $request->bantuan_kabkota ?? 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data anggaran APBDes berhasil diperbarui.',
            'data' => $apbdes,
        ]);
    }

    public function destroyKeuangan($id)
    {
        $apbdes = Apbdes::findOrFail($id);
        $apbdes->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data anggaran APBDes berhasil dihapus.',
        ]);
    }

    public function getBidangBelanja()
    {
        $list = BidangBelanja::orderBy('nama_bidang')->get();
        return response()->json(['success' => true, 'data' => $list]);
    }

    // ==========================================
    // 2. KELOLA POSTINGAN (BERITA, PENGUMUMAN, AGENDA)
    // ==========================================

    public function getPostingan(Request $request)
    {
        $query = Postingan::query();
        if ($request->has('kategori') && !empty($request->kategori)) {
            $query->where('kategori', $request->kategori);
        }
        $data = $query->orderBy('created_at', 'desc')->paginate(15);
        return response()->json(['success' => true, 'data' => $data]);
    }

    public function storePostingan(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string|in:Berita,Pengumuman,Agenda',
            'konten' => 'required',
        ]);

        $slug = Str::slug($request->judul) . '-' . Str::random(5);

        $post = Postingan::create([
            'judul' => $request->judul,
            'slug' => $slug,
            'kategori' => $request->kategori,
            'konten' => $request->konten,
            'ringkasan' => $request->ringkasan ?? Str::limit(strip_tags($request->konten), 160),
            'gambar' => $request->gambar,
            'penulis' => $request->penulis ?? 'Admin Desa',
            'tanggal_kegiatan' => $request->tanggal_kegiatan,
            'lokasi_kegiatan' => $request->lokasi_kegiatan,
            'status' => $request->status ?? 'published',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Postingan berhasil diterbitkan.',
            'data' => $post,
        ]);
    }

    public function updatePostingan(Request $request, $id)
    {
        $post = Postingan::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string|in:Berita,Pengumuman,Agenda',
            'konten' => 'required',
        ]);

        $post->update([
            'judul' => $request->judul,
            'kategori' => $request->kategori,
            'konten' => $request->konten,
            'ringkasan' => $request->ringkasan ?? Str::limit(strip_tags($request->konten), 160),
            'gambar' => $request->gambar ?? $post->gambar,
            'penulis' => $request->penulis ?? $post->penulis,
            'tanggal_kegiatan' => $request->tanggal_kegiatan,
            'lokasi_kegiatan' => $request->lokasi_kegiatan,
            'status' => $request->status ?? $post->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Postingan berhasil diperbarui.',
            'data' => $post,
        ]);
    }

    public function destroyPostingan($id)
    {
        $post = Postingan::findOrFail($id);
        $post->delete();

        return response()->json([
            'success' => true,
            'message' => 'Postingan berhasil dihapus.',
        ]);
    }

    // ==========================================
    // 3. KELOLA DEMOGRAFI
    // ==========================================

    public function getDemografi()
    {
        $demografi = Demografi::orderBy('tahun', 'desc')->first();
        return response()->json(['success' => true, 'data' => $demografi]);
    }

    public function updateDemografi(Request $request)
    {
        $request->validate([
            'tahun' => 'required|integer',
            'total_penduduk' => 'required|integer',
            'total_kk' => 'required|integer',
            'total_laki_laki' => 'required|integer',
            'total_perempuan' => 'required|integer',
        ]);

        $demografi = Demografi::updateOrCreate(
            ['tahun' => $request->tahun],
            [
                'total_penduduk' => $request->total_penduduk,
                'total_kk' => $request->total_kk,
                'total_laki_laki' => $request->total_laki_laki,
                'total_perempuan' => $request->total_perempuan,
                'data_dusun' => $request->data_dusun,
                'data_pekerjaan' => $request->data_pekerjaan,
                'data_pendidikan' => $request->data_pendidikan,
                'data_usia' => $request->data_usia,
                'data_agama' => $request->data_agama,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Data demografi berhasil diperbarui.',
            'data' => $demografi,
        ]);
    }

    // ==========================================
    // 4. KELOLA SAMBUTAN KEPALA DESA
    // ==========================================

    public function getSambutan()
    {
        $sambutan = Sambutan::first();
        return response()->json(['success' => true, 'data' => $sambutan]);
    }

    public function updateSambutan(Request $request)
    {
        $request->validate([
            'nama_kades' => 'required|string',
            'periode' => 'required|string',
            'judul' => 'required|string',
            'pesan' => 'required|string',
        ]);

        $sambutan = Sambutan::first();
        if ($sambutan) {
            $sambutan->update($request->only(['nama_kades', 'periode', 'foto', 'judul', 'pesan']));
        } else {
            $sambutan = Sambutan::create($request->only(['nama_kades', 'periode', 'foto', 'judul', 'pesan']));
        }

        return response()->json([
            'success' => true,
            'message' => 'Sambutan Kepala Desa berhasil diperbarui.',
            'data' => $sambutan,
        ]);
    }

    // ==========================================
    // 5. KELOLA HALAMAN PROFIL (Visi-Misi, Sejarah, Wilayah, Struktur)
    // ==========================================

    public function getHalaman($key)
    {
        $halaman = HalamanProfil::where('key', $key)->first();
        return response()->json(['success' => true, 'data' => $halaman]);
    }

    public function updateHalaman(Request $request, $key)
    {
        $halaman = HalamanProfil::where('key', $key)->first();

        $data = [
            'judul' => $request->judul ?? ($halaman ? $halaman->judul : ucfirst($key)),
            'konten' => $request->konten,
            'gambar' => $request->gambar ?? ($halaman ? $halaman->gambar : null),
            'meta' => $request->meta ?? ($halaman ? $halaman->meta : null),
        ];

        $halaman = HalamanProfil::updateOrCreate(['key' => $key], $data);

        return response()->json([
            'success' => true,
            'message' => "Halaman {$key} berhasil diperbarui.",
            'data' => $halaman,
        ]);
    }

    // ==========================================
    // 6. KELOLA APARATUR DESA
    // ==========================================

    public function getAparatur()
    {
        $aparatur = AparaturDesa::orderBy('urutan', 'asc')->get();
        return response()->json(['success' => true, 'data' => $aparatur]);
    }

    public function storeAparatur(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'jabatan' => 'required|string',
        ]);

        $aparatur = AparaturDesa::create([
            'nama' => $request->nama,
            'jabatan' => $request->jabatan,
            'niap_nip' => $request->niap_nip,
            'foto' => $request->foto,
            'urutan' => $request->urutan ?? 0,
            'status' => $request->status ?? 'Aktif',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data aparatur berhasil ditambahkan.',
            'data' => $aparatur,
        ]);
    }

    public function updateAparatur(Request $request, $id)
    {
        $aparatur = AparaturDesa::findOrFail($id);
        $aparatur->update($request->only(['nama', 'jabatan', 'niap_nip', 'foto', 'urutan', 'status']));

        return response()->json([
            'success' => true,
            'message' => 'Data aparatur berhasil diperbarui.',
            'data' => $aparatur,
        ]);
    }

    public function destroyAparatur($id)
    {
        $aparatur = AparaturDesa::findOrFail($id);
        $aparatur->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data aparatur berhasil dihapus.',
        ]);
    }

    // ==========================================
    // 7. KELOLA LEMBAGA DESA
    // ==========================================

    public function getLembaga()
    {
        $lembaga = LembagaDesa::orderBy('urutan', 'asc')->get();
        return response()->json(['success' => true, 'data' => $lembaga]);
    }

    public function storeLembaga(Request $request)
    {
        $request->validate([
            'nama_lembaga' => 'required|string',
        ]);

        $lembaga = LembagaDesa::create([
            'nama_lembaga' => $request->nama_lembaga,
            'singkatan' => $request->singkatan,
            'ketua' => $request->ketua,
            'deskripsi' => $request->deskripsi,
            'tugas_fungsi' => $request->tugas_fungsi,
            'foto' => $request->foto,
            'urutan' => $request->urutan ?? 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Lembaga desa berhasil ditambahkan.',
            'data' => $lembaga,
        ]);
    }

    public function updateLembaga(Request $request, $id)
    {
        $lembaga = LembagaDesa::findOrFail($id);
        $lembaga->update($request->only(['nama_lembaga', 'singkatan', 'ketua', 'deskripsi', 'tugas_fungsi', 'foto', 'urutan']));

        return response()->json([
            'success' => true,
            'message' => 'Lembaga desa berhasil diperbarui.',
            'data' => $lembaga,
        ]);
    }

    public function destroyLembaga($id)
    {
        $lembaga = LembagaDesa::findOrFail($id);
        $lembaga->delete();

        return response()->json([
            'success' => true,
            'message' => 'Lembaga desa berhasil dihapus.',
        ]);
    }

    // ==========================================
    // 8. KELOLA FASILITAS
    // ==========================================

    public function getFasilitas()
    {
        $fasilitas = FasilitasDesa::orderBy('id', 'desc')->get();
        return response()->json(['success' => true, 'data' => $fasilitas]);
    }

    public function storeFasilitas(Request $request)
    {
        $request->validate([
            'nama_fasilitas' => 'required|string',
            'kategori' => 'required|string',
        ]);

        $fasilitas = FasilitasDesa::create($request->only([
            'nama_fasilitas', 'kategori', 'lokasi', 'kondisi', 'deskripsi', 'foto'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Fasilitas desa berhasil ditambahkan.',
            'data' => $fasilitas,
        ]);
    }

    public function updateFasilitas(Request $request, $id)
    {
        $fasilitas = FasilitasDesa::findOrFail($id);
        $fasilitas->update($request->only([
            'nama_fasilitas', 'kategori', 'lokasi', 'kondisi', 'deskripsi', 'foto'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Fasilitas desa berhasil diperbarui.',
            'data' => $fasilitas,
        ]);
    }

    public function destroyFasilitas($id)
    {
        $fasilitas = FasilitasDesa::findOrFail($id);
        $fasilitas->delete();

        return response()->json([
            'success' => true,
            'message' => 'Fasilitas desa berhasil dihapus.',
        ]);
    }

    // ==========================================
    // 9. KELOLA LAYANAN ADMINISTRASI SURAT
    // ==========================================

    public function getLayananSurat()
    {
        $surat = LayananSurat::orderBy('urutan', 'asc')->get();
        return response()->json(['success' => true, 'data' => $surat]);
    }

    public function storeLayananSurat(Request $request)
    {
        $request->validate([
            'nama_surat' => 'required|string',
        ]);

        $surat = LayananSurat::create([
            'nama_surat' => $request->nama_surat,
            'kode_surat' => $request->kode_surat,
            'deskripsi' => $request->deskripsi,
            'persyaratan' => $request->persyaratan,
            'prosedur' => $request->prosedur,
            'waktu_layanan' => $request->waktu_layanan ?? '15 - 30 Menit',
            'biaya' => $request->biaya ?? 'Gratis (Rp 0)',
            'urutan' => $request->urutan ?? 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Layanan administrasi surat berhasil ditambahkan.',
            'data' => $surat,
        ]);
    }

    public function updateLayananSurat(Request $request, $id)
    {
        $surat = LayananSurat::findOrFail($id);
        $surat->update($request->only([
            'nama_surat', 'kode_surat', 'deskripsi', 'persyaratan', 'prosedur', 'waktu_layanan', 'biaya', 'urutan'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Layanan administrasi surat berhasil diperbarui.',
            'data' => $surat,
        ]);
    }

    public function destroyLayananSurat($id)
    {
        $surat = LayananSurat::findOrFail($id);
        $surat->delete();

        return response()->json([
            'success' => true,
            'message' => 'Layanan administrasi surat berhasil dihapus.',
        ]);
    }

    // ==========================================
    // 10. UPLOAD FILE
    // ==========================================

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,webp,pdf|max:5120',
        ]);

        $file = $request->file('file');
        $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
        
        $destinationPath = public_path('assets/uploads');
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0755, true);
        }

        $file->move($destinationPath, $filename);

        return response()->json([
            'success' => true,
            'message' => 'File berhasil diunggah.',
            'url' => 'assets/uploads/' . $filename,
        ]);
    }
}
