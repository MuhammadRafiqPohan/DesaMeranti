import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Users,
  Building2,
  Wallet,
  Compass,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Layers,
  CheckCircle2
} from 'lucide-react';
import api, { formatRupiah, formatTanggal } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <LoadingSpinner text="Memuat dashboard admin..." />;

  const { counts = {}, latest_posts = [], demografi = {} } = data || {};

  return (
    <div className="space-y-8">
      {/* Banner Sambutan */}
      <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-2">
            Selamat Datang di Panel Kontrol
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Dashboard Administrasi Desa Meranti
          </h1>
          <p className="text-sm text-emerald-100 leading-relaxed mb-6">
            Kelola konten website publik, transparansi anggaran APBDes, data kependudukan, aparatur, dan prosedur layanan warga dalam satu tempat secara terpadu.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/keuangan"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow"
            >
              <Wallet className="w-4 h-4" />
              <span>Kelola APBDes</span>
            </Link>
            <Link
              to="/admin/postingan"
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow"
            >
              <PlusCircle className="w-4 h-4 text-emerald-700" />
              <span>Tambah Berita Baru</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Statistik Utama */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Total Postingan</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {(counts.berita || 0) + (counts.pengumuman || 0) + (counts.agenda || 0)}
            </p>
            <p className="text-xs text-emerald-600 font-medium mt-1">Berita, Pengumuman & Agenda</p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-700">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Aparatur Desa</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {counts.aparatur || 0}
            </p>
            <p className="text-xs text-blue-600 font-medium mt-1">Perangkat Aktif</p>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-50 text-blue-700">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Layanan Surat</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {counts.layanan_surat || 0}
            </p>
            <p className="text-xs text-purple-600 font-medium mt-1">Jenis Surat Online</p>
          </div>
          <div className="p-3.5 rounded-xl bg-purple-50 text-purple-700">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Anggaran Pendapatan</span>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900">
              {formatRupiah(counts.total_apbdes)}
            </p>
            <p className="text-xs text-amber-600 font-medium mt-1">Realisasi APBDes</p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50 text-amber-700">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Konten 2 Kolom: Postingan Terbaru & Pintasan Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kolom Kiri: Postingan Terbaru */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Postingan Terakhir</h3>
            </div>
            <Link to="/admin/postingan" className="text-xs font-bold text-emerald-700 hover:underline">
              Kelola Semua Postingan
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {latest_posts.map((post) => (
              <div key={post.id} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 mr-2">
                    {post.kategori}
                  </span>
                  <Link
                    to="/admin/postingan"
                    className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    {post.judul}
                  </Link>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {formatTanggal(post.created_at)} • Dilihat {post.dibaca}x
                  </p>
                </div>
                <Link
                  to="/admin/postingan"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-slate-50"
                  title="Edit"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Navigasi Cepat Pintasan */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
              Pintasan Kelola Konten
            </h4>
            <div className="space-y-2 text-xs font-semibold">
              <Link
                to="/admin/postingan"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 transition-colors"
              >
                <span>Kelola Postingan Berita</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/admin/keuangan"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 transition-colors"
              >
                <span>Kelola Anggaran APBDes</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/admin/demografi"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 transition-colors"
              >
                <span>Kelola Demografi Penduduk</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/admin/sambutan"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 transition-colors"
              >
                <span>Kelola Sambutan Kades</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
              Pintasan Kelola Halaman
            </h4>
            <div className="space-y-2 text-xs font-semibold">
              <Link
                to="/admin/aparatur"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 transition-colors"
              >
                <span>Aparatur Pemerintah Desa</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/admin/layanan-surat"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 transition-colors"
              >
                <span>Layanan Administrasi Surat</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/admin/fasilitas"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 transition-colors"
              >
                <span>Fasilitas & Sarana Desa</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/admin/halaman-edit"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 transition-colors"
              >
                <span>Teks Sejarah & Wilayah</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
