import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Maximize2, Compass, Layers, Info } from 'lucide-react';
import api, { getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function Wilayah() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWilayah = async () => {
      try {
        const res = await api.get('/profil/wilayah');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching wilayah:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWilayah();
  }, []);

  if (loading) return <LoadingSpinner text="Memuat peta dan wilayah Desa Meranti..." />;

  const meta = data?.meta || {};

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
          Geografis & Batas Administrasi
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Wilayah & Peta Desa Meranti
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Karakteristik bentang alam, batas-batas administratif, dan pembagian zona wilayah perdesaan Desa Meranti.
        </p>
      </div>

      {/* Gambar Peta Desa */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">Peta Spasial Desa Meranti</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Format Digital Kartografi</span>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 flex justify-center items-center">
          <img
            src={getAssetUrl(data?.gambar || 'assets/Peta-Desa.jpg')}
            alt="Peta Desa Meranti"
            className="w-full max-h-[600px] object-contain hover:scale-105 transition-transform duration-500 cursor-zoom-in"
          />
        </div>
        <p className="text-xs text-slate-400 text-center mt-3 italic">
          * Klik atau perbesar untuk melihat batas dusun, sungai, dan jaringan jalan desa.
        </p>
      </div>

      {/* Batas & Parameter Wilayah */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Batas Utara</span>
          <p className="text-lg font-extrabold text-slate-900">{meta.batas_utara || 'Desa Sukamaju'}</p>
          <p className="text-xs text-slate-400 mt-1">Kecamatan Tetangga</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Batas Selatan</span>
          <p className="text-lg font-extrabold text-slate-900">{meta.batas_selatan || 'Sungai Batang Meranti'}</p>
          <p className="text-xs text-slate-400 mt-1">Kawasan Hutan Lindung</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Batas Timur</span>
          <p className="text-lg font-extrabold text-slate-900">{meta.batas_timur || 'Desa Koto Baru'}</p>
          <p className="text-xs text-slate-400 mt-1">Areal Perkebunan</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Batas Barat</span>
          <p className="text-lg font-extrabold text-slate-900">{meta.batas_barat || 'Kecamatan Tetangga'}</p>
          <p className="text-xs text-slate-400 mt-1">Jalur Penghubung</p>
        </div>
      </div>

      {/* Deskripsi & Ringkasan */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Deskripsi Topografi & Wilayah</h3>
            <p className="text-xs text-slate-500">Keadaan tanah, iklim dan potensi agraris</p>
          </div>
        </div>

        <div className="prose prose-emerald max-w-none text-slate-700 leading-relaxed text-justify whitespace-pre-line text-sm sm:text-base">
          {data?.konten}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50">
            <span className="text-xs text-slate-400 font-medium">Luas Wilayah Total</span>
            <p className="text-base font-bold text-slate-900">{meta.luas_wilayah || '1.250 Ha'}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50">
            <span className="text-xs text-slate-400 font-medium">Ketinggian Tempat</span>
            <p className="text-base font-bold text-slate-900">{meta.ketinggian || '150 - 300 mdpl'}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50">
            <span className="text-xs text-slate-400 font-medium">Koordinat Geografis</span>
            <p className="text-base font-bold text-slate-900">{meta.koordinat || "0°34'12\" LS"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
