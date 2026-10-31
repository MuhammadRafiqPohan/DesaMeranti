import React, { useEffect, useState } from 'react';
import { Users, UserCheck, Home, Briefcase, GraduationCap, HeartPulse, PieChart } from 'lucide-react';
import api from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function Demografi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemografi = async () => {
      try {
        const res = await api.get('/demografi');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching demografi:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDemografi();
  }, []);

  if (loading) return <LoadingSpinner text="Memuat statistik kependudukan..." />;

  const {
    tahun = 2026,
    total_penduduk = 0,
    total_kk = 0,
    total_laki_laki = 0,
    total_perempuan = 0,
    data_dusun = [],
    data_pekerjaan = [],
    data_pendidikan = [],
    data_usia = [],
    data_agama = [],
  } = data || {};

  const rasioGender = total_perempuan > 0 ? ((total_laki_laki / total_perempuan) * 100).toFixed(1) : 100;

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
          Statistik Kependudukan
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Demografi Penduduk Desa Meranti ({tahun})
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Data statistik sebaran kependudukan terperinci berdasarkan jenis kelamin, wilayah dusun, mata pencaharian, pendidikan, dan kelompok usia.
        </p>
      </div>

      {/* KPI Cards Utama */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-700">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Penduduk</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{total_penduduk.toLocaleString('id-ID')}</p>
            <p className="text-xs text-emerald-600 font-medium">Jiwa Terdata</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-blue-100 text-blue-700">
            <Home className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Kepala Keluarga</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{total_kk.toLocaleString('id-ID')}</p>
            <p className="text-xs text-blue-600 font-medium">KK Aktif</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-indigo-100 text-indigo-700">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Laki-Laki</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{total_laki_laki.toLocaleString('id-ID')}</p>
            <p className="text-xs text-indigo-600 font-medium">
              {total_penduduk > 0 ? ((total_laki_laki / total_penduduk) * 100).toFixed(1) : 50}% dari total
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-rose-100 text-rose-700">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Perempuan</span>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{total_perempuan.toLocaleString('id-ID')}</p>
            <p className="text-xs text-rose-600 font-medium">
              {total_penduduk > 0 ? ((total_perempuan / total_penduduk) * 100).toFixed(1) : 50}% dari total
            </p>
          </div>
        </div>
      </div>

      {/* Komparasi Gender & Dusun */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Persebaran Wilayah Dusun */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Sebaran Penduduk Per Dusun</h3>
              <p className="text-xs text-slate-500">Jumlah warga dan kepala keluarga per dusun</p>
            </div>
          </div>

          <div className="space-y-4">
            {data_dusun.map((dusun, idx) => {
              const persentase = total_penduduk > 0 ? ((dusun.jumlah_jiwa / total_penduduk) * 100).toFixed(1) : 0;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-900">{dusun.nama}</span>
                    <span className="text-emerald-700">{dusun.jumlah_jiwa.toLocaleString('id-ID')} Jiwa ({persentase}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${persentase}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{dusun.jumlah_kk} Kepala Keluarga</span>
                    <span>{dusun.rt} RT</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kelompok Umur */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Struktur Kelompok Umur</h3>
              <p className="text-xs text-slate-500">Komposisi generasi produktif dan rentan</p>
            </div>
          </div>

          <div className="space-y-3">
            {data_usia.map((item, idx) => {
              const persentase = total_penduduk > 0 ? ((item.jumlah / total_penduduk) * 100).toFixed(1) : 0;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{item.kelompok}</span>
                    <span className="text-slate-900 font-bold">{item.jumlah} Jiwa ({persentase}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${persentase}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mata Pencaharian & Pendidikan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pekerjaan */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Mata Pencaharian / Pekerjaan</h3>
              <p className="text-xs text-slate-500">Sebaran profesi masyarakat Desa Meranti</p>
            </div>
          </div>

          <div className="space-y-3">
            {data_pekerjaan.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.kategori}</span>
                  <span className="text-slate-900 font-bold">{item.jumlah} Orang ({item.persentase}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.persentase}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tingkat Pendidikan */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Tingkat Pendidikan Terakhir</h3>
              <p className="text-xs text-slate-500">Kualifikasi jenjang pendidikan warga</p>
            </div>
          </div>

          <div className="space-y-3">
            {data_pendidikan.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.kategori}</span>
                  <span className="text-slate-900 font-bold">{item.jumlah} Orang ({item.persentase}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${item.persentase}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
