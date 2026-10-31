import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Home,
  TrendingUp,
  FileText,
  Calendar,
  Bell,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Building,
  MapPin,
  ChevronRight
} from 'lucide-react';
import api, { formatRupiah, formatTanggal, getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function Beranda() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeranda = async () => {
      try {
        const res = await api.get('/beranda');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching beranda:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBeranda();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Memuat halaman beranda Desa Meranti..." />;
  }

  const { sambutan, demografi, berita, pengumuman, agenda, apbdes_summary, aparatur, fasilitas } = data || {};

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[550px] lg:min-h-[620px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/Foto-Desa.png"
            alt="Pemandangan Desa Meranti"
            className="w-full h-full object-cover brightness-75 scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/80 to-slate-900/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white text-center md:text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-6 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Sistem Informasi & Pelayanan Publik Desa Meranti</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-6">
              Mewujudkan Desa Mandiri, Maju & Sejahtera
            </h1>

            <p className="text-lg sm:text-xl text-emerald-100 font-light leading-relaxed mb-8 max-w-2xl">
              Selamat datang di portal resmi Pemerintah Desa Meranti. Kami berkomitmen memberikan pelayanan prima, keterbukaan informasi, dan transparansi tata kelola desa bagi seluruh masyarakat.
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <Link
                to="/prosedur-surat"
                className="px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 group"
              >
                <FileText className="w-5 h-5" />
                <span>Layanan Surat Warga</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/apb-nagari"
                className="px-6 py-3.5 rounded-xl font-bold text-emerald-950 bg-white hover:bg-slate-100 shadow-md transition-all flex items-center gap-2"
              >
                <TrendingUp className="w-5 h-5 text-emerald-700" />
                <span>Transparansi APBDes</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTIK DEMOGRAFI CEPAT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 hover:shadow-2xl transition-shadow">
            <div className="p-3.5 rounded-xl bg-emerald-100 text-emerald-700">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Total Penduduk</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {demografi?.total_penduduk?.toLocaleString('id-ID') || '2.845'}
              </p>
              <p className="text-xs text-emerald-600 font-medium">Jiwa Terdata</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 hover:shadow-2xl transition-shadow">
            <div className="p-3.5 rounded-xl bg-blue-100 text-blue-700">
              <Home className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Kepala Keluarga</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {demografi?.total_kk?.toLocaleString('id-ID') || '820'}
              </p>
              <p className="text-xs text-blue-600 font-medium">Kartu Keluarga (KK)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 hover:shadow-2xl transition-shadow">
            <div className="p-3.5 rounded-xl bg-amber-100 text-amber-700">
              <Building className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Wilayah Dusun</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                2 Dusun
              </p>
              <p className="text-xs text-amber-600 font-medium">8 Rukun Tetangga (RT)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 hover:shadow-2xl transition-shadow">
            <div className="p-3.5 rounded-xl bg-purple-100 text-purple-700">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Luas Wilayah</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                1.250
              </p>
              <p className="text-xs text-purple-600 font-medium">Hektar Daratan</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SAMBUTAN KEPALA DESA */}
      {sambutan && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-emerald-100/80 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Foto Kades */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="w-56 h-72 sm:w-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-emerald-800">
                    <img
                      src={getAssetUrl(sambutan.foto || 'assets/aparatur/KEPALA DESA.png')}
                      alt={sambutan.nama_kades}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-emerald-600 text-white p-2.5 rounded-xl shadow-lg">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{sambutan.nama_kades}</h3>
                <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Kepala Desa Meranti</p>
                <p className="text-xs text-slate-500 mt-1">Periode: {sambutan.periode}</p>
              </div>

              {/* Teks Sambutan */}
              <div className="lg:col-span-8">
                <div className="inline-block px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                  Pesan Pemimpin Desa
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug mb-4">
                  {sambutan.judul}
                </h2>
                <div className="text-slate-600 leading-relaxed space-y-4 text-justify whitespace-pre-line text-sm sm:text-base">
                  {sambutan.pesan}
                </div>

                <div className="mt-8 pt-6 border-t border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="block text-xs text-slate-400 font-medium">Tertanda,</span>
                    <span className="font-serif italic text-lg font-bold text-slate-800">{sambutan.nama_kades}</span>
                  </div>
                  <Link
                    to="/visi-misi"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Visi & Misi Desa</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. TRANSPARANSI APBDES HIGHLIGHT */}
      {apbdes_summary && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                  Akuntabilitas Publik
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Transparansi Anggaran (APBDes) {apbdes_summary.tahun}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Laporan realisasi dan alokasi anggaran pendapatan serta belanja desa demi pembangunan berkelanjutan.
                </p>
              </div>
              <Link
                to="/apb-nagari"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shrink-0"
              >
                <span>Rincian Lengkap APBDes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pendapatan */}
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-2">
                  Total Pendapatan Desa
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">
                  {formatRupiah(apbdes_summary.pendapatan)}
                </p>
                <div className="mt-4 text-xs text-slate-400">
                  Bersumber dari Dana Desa, ADD, PADes, Bagi Hasil Pajak, dan Bantuan Keuangan.
                </div>
              </div>

              {/* Belanja */}
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6">
                <span className="text-xs uppercase tracking-wider text-rose-400 font-bold block mb-2">
                  Total Belanja Desa
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">
                  {formatRupiah(apbdes_summary.belanja)}
                </p>
                <div className="mt-4 text-xs text-slate-400">
                  Dialokasikan untuk Siltap, Pembangunan Fisik, Pembinaan Kemasyarakatan & BLT-DD.
                </div>
              </div>

              {/* Pembiayaan / Surplus */}
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-2">
                  Pembiayaan / Netto
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">
                  {formatRupiah(apbdes_summary.pembiayaan)}
                </p>
                <div className="mt-4 text-xs text-slate-400">
                  Penyertaan modal BUMDes Meranti Mandiri guna mendorong perputaran ekonomi warga.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. BERITA & PENGUMUMAN TERBARU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-1">
              Kabar Terkini
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Berita & Informasi Seputar Desa
            </h2>
          </div>
          <Link
            to="/berita"
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Semua Berita</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {berita?.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="h-48 overflow-hidden bg-slate-100 relative">
                <img
                  src={getAssetUrl(item.gambar || 'assets/Foto-Desa.png')}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.kategori}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 block mb-2 font-medium">
                    {formatTanggal(item.created_at)} • Oleh {item.penulis}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-3">
                    <Link to={`/berita/${item.slug}`}>{item.judul}</Link>
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {item.ringkasan}
                  </p>
                </div>
                <Link
                  to={`/berita/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 pt-3 border-t border-slate-100"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. AGENDA & PENGUMUMAN GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pengumuman */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Pengumuman Resmi</h3>
              </div>
              <Link to="/pengumuman" className="text-xs font-bold text-emerald-700 hover:underline">
                Lihat Semua
              </Link>
            </div>
            <div className="space-y-4">
              {pengumuman?.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50/60 transition-colors border border-slate-100">
                  <span className="text-xs font-semibold text-amber-700 block mb-1">
                    {formatTanggal(item.created_at)}
                  </span>
                  <Link to={`/berita/${item.slug}`} className="text-sm font-bold text-slate-900 hover:text-emerald-700 block mb-1">
                    {item.judul}
                  </Link>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.ringkasan}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda Kegiatan */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Agenda Kegiatan</h3>
              </div>
              <Link to="/agenda" className="text-xs font-bold text-emerald-700 hover:underline">
                Lihat Semua
              </Link>
            </div>
            <div className="space-y-4">
              {agenda?.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-emerald-50/60 transition-colors border border-slate-100">
                  <div className="bg-emerald-700 text-white rounded-xl p-3 text-center min-w-[65px] shrink-0">
                    <span className="block text-xs font-semibold uppercase">
                      {item.tanggal_kegiatan ? new Date(item.tanggal_kegiatan).toLocaleString('id-ID', { month: 'short' }) : 'Kegiatan'}
                    </span>
                    <span className="block text-xl font-extrabold leading-none mt-1">
                      {item.tanggal_kegiatan ? new Date(item.tanggal_kegiatan).getDate() : '📅'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 hover:text-emerald-700 mb-1">
                      <Link to={`/berita/${item.slug}`}>{item.judul}</Link>
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.lokasi_kegiatan || 'Desa Meranti'}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. LAYANAN SURAT CEPAT CALL-TO-ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold">
              Pelayanan Administrasi Warga
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Butuh Surat Keterangan atau Dokumen Desa?
            </h3>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Ketahui syarat dan tata cara pengurusan Surat Keterangan Usaha (SKU), Surat Domisili, SKTM, hingga Pengantar SKCK tanpa calo dan bebas biaya (Gratis).
            </p>
          </div>
          <Link
            to="/prosedur-surat"
            className="px-6 py-3.5 rounded-xl font-bold text-emerald-950 bg-white hover:bg-emerald-50 shadow-lg transition-all shrink-0 flex items-center gap-2"
          >
            <span>Cek Prosedur Surat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
