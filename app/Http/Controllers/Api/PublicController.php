<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AparaturDesa;
use App\Models\Apbdes;
use App\Models\Demografi;
use App\Models\FasilitasDesa;
use App\Models\HalamanProfil;
use App\Models\LayananSurat;
use App\Models\LembagaDesa;
use App\Models\Postingan;
use App\Models\Sambutan;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    /**
     * Data untuk halaman Beranda
     */
    public function beranda()
    {
        $sambutan = Sambutan::first();
        $demografi = Demografi::orderBy('tahun', 'desc')->first();
        
        $beritaTerbaru = Postingan::where('kategori', 'Berita')
            ->where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        $pengumumanTerbaru = Postingan::where('kategori', 'Pengumuman')
            ->where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();

        $agendaTerbaru = Postingan::where('kategori', 'Agenda')
            ->where('status', 'published')
            ->orderBy('tanggal_kegiatan', 'asc')
            ->take(3)
            ->get();

        $tahunTerbaru = Apbdes::max('tahun') ?? 2026;
        $anggaranList = Apbdes::where('tahun', $tahunTerbaru)->get();

        $totalPendapatan = $anggaranList->where('kategori', 'Pendapatan')->sum('total');
        $totalBelanja = $anggaranList->where('kategori', 'Belanja')->sum('total');
        $totalPembiayaan = $anggaranList->where('kategori', 'Pembiayaan')->sum('total');

        $aparaturUtama = AparaturDesa::where('status', 'Aktif')
            ->orderBy('urutan', 'asc')
            ->take(4)
            ->get();

        $fasilitas = FasilitasDesa::take(3)->get();

        return response()->json([
            'success' => true,
            'data' => [
                'sambutan' => $sambutan,
                'demografi' => $demografi,
                'berita' => $beritaTerbaru,
                'pengumuman' => $pengumumanTerbaru,
                'agenda' => $agendaTerbaru,
                'apbdes_summary' => [
                    'tahun' => $tahunTerbaru,
                    'pendapatan' => $totalPendapatan,
                    'belanja' => $totalBelanja,
                    'pembiayaan' => $totalPembiayaan,
                    'surplus_defisit' => $totalPendapatan - $totalBelanja,
                ],
                'aparatur' => $aparaturUtama,
                'fasilitas' => $fasilitas,
            ]
        ]);
    }

    /**
     * Halaman Visi Misi
     */
    public function visimisi()
    {
        $data = HalamanProfil::where('key', 'visi_misi')->first();
        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Halaman Sejarah
     */
    public function sejarah()
    {
        $data = HalamanProfil::where('key', 'sejarah')->first();
        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Halaman Wilayah & Peta Desa
     */
    public function wilayah()
    {
        $data = HalamanProfil::where('key', 'wilayah')->first();
        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Halaman Struktur Organisasi
     */
    public function struktur()
    {
        $halaman = HalamanProfil::where('key', 'struktur')->first();
        $aparatur = AparaturDesa::where('status', 'Aktif')->orderBy('urutan', 'asc')->get();
        return response()->json([
            'success' => true,
            'data' => [
                'halaman' => $halaman,
                'aparatur' => $aparatur,
            ]
        ]);
    }

    /**
     * Halaman Demografi
     */
    public function demografi()
    {
        $data = Demografi::orderBy('tahun', 'desc')->first();
        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Halaman Aparatur Desa
     */
    public function aparatur()
    {
        $data = AparaturDesa::where('status', 'Aktif')->orderBy('urutan', 'asc')->get();
        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Halaman Lembaga Desa
     */
    public function lembaga()
    {
        $data = LembagaDesa::orderBy('urutan', 'asc')->get();
        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Halaman Fasilitas Desa
     */
    public function fasilitas(Request $request)
    {
        $query = FasilitasDesa::query();
        if ($request->has('kategori') && !empty($request->kategori)) {
            $query->where('kategori', $request->kategori);
        }
        $data = $query->get();
        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Halaman Layanan Administrasi Surat
     */
    public function layananSurat(Request $request)
    {
        $query = LayananSurat::orderBy('urutan', 'asc');
        if ($request->has('q') && !empty($request->q)) {
            $query->where(function($q) use ($request) {
                $q->where('nama_surat', 'like', '%' . $request->q . '%')
                  ->orWhere('deskripsi', 'like', '%' . $request->q . '%');
            });
        }
        $data = $query->get();
        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Postingan (Berita / Pengumuman / Agenda)
     */
    public function postingan(Request $request)
    {
        $query = Postingan::where('status', 'published');

        if ($request->has('kategori') && !empty($request->kategori)) {
            $query->where('kategori', $request->kategori);
        }

        if ($request->has('q') && !empty($request->q)) {
            $searchTerm = '%' . $request->q . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('judul', 'like', $searchTerm)
                  ->orWhere('konten', 'like', $searchTerm)
                  ->orWhere('ringkasan', 'like', $searchTerm);
            });
        }

        if ($request->kategori === 'Agenda') {
            $query->orderBy('tanggal_kegiatan', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $perPage = $request->get('per_page', 9);
        $data = $query->paginate($perPage);

        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Detail Postingan
     */
    public function postinganDetail($slug)
    {
        $post = Postingan::where('slug', $slug)->first();

        if (!$post) {
            return response()->json(['success' => false, 'message' => 'Postingan tidak ditemukan.'], 404);
        }

        $post->increment('dibaca');

        $terkait = Postingan::where('kategori', $post->kategori)
            ->where('id', '!=', $post->id)
            ->where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'post' => $post,
                'terkait' => $terkait,
            ]
        ]);
    }

    /**
     * Transparansi APBDes
     */
    public function apbdes(Request $request)
    {
        $tahun = $request->get('tahun', Apbdes::max('tahun') ?? 2026);
        $anggaran = Apbdes::where('tahun', $tahun)->get();

        $pendapatan = $anggaran->where('kategori', 'Pendapatan')->values();
        $belanja = $anggaran->where('kategori', 'Belanja')->values();
        $pembiayaan = $anggaran->where('kategori', 'Pembiayaan')->values();

        // Rekapitulasi per Bidang Belanja
        $belanjaPerBidang = $belanja->groupBy('bidang')->map(function ($items, $bidang) {
            return [
                'bidang' => $bidang ?: 'Lainnya',
                'total' => $items->sum('total'),
                'items' => $items,
            ];
        })->values();

        // Rekapitulasi 6 Sumber Dana
        $sumberDana = [
            'dana_desa' => $anggaran->sum('dana_desa'),
            'alokasi_dana_desa' => $anggaran->sum('alokasi_dana_desa'),
            'fades_dll' => $anggaran->sum('fades_dll'),
            'retribusi_pajak' => $anggaran->sum('retribusi_pajak'),
            'bantuan_provinsi' => $anggaran->sum('bantuan_provinsi'),
            'bantuan_kabkota' => $anggaran->sum('bantuan_kabkota'),
        ];

        $totalPendapatan = $pendapatan->sum('total');
        $totalBelanja = $belanja->sum('total');
        $totalPembiayaan = $pembiayaan->sum('total');

        $tahunList = Apbdes::select('tahun')->distinct()->orderBy('tahun', 'desc')->pluck('tahun');

        return response()->json([
            'success' => true,
            'data' => [
                'tahun' => (int) $tahun,
                'tahun_list' => $tahunList,
                'summary' => [
                    'total_pendapatan' => $totalPendapatan,
                    'total_belanja' => $totalBelanja,
                    'total_pembiayaan' => $totalPembiayaan,
                    'surplus_defisit' => $totalPendapatan - $totalBelanja,
                ],
                'sumber_dana' => $sumberDana,
                'pendapatan' => $pendapatan,
                'belanja' => $belanja,
                'belanja_per_bidang' => $belanjaPerBidang,
                'pembiayaan' => $pembiayaan,
            ]
        ]);
    }
}
