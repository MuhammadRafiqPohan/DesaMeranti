import React, { useEffect, useState } from 'react';
import { BookOpen, Calendar, MapPin, Landmark, Award } from 'lucide-react';
import api, { getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function Sejarah() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSejarah = async () => {
      try {
        const res = await api.get('/profil/sejarah');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching sejarah:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSejarah();
  }, []);

  if (loading) return <LoadingSpinner text="Memuat sejarah Desa Meranti..." />;

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
          Profil Desa
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          {data?.judul || 'Sejarah Perkembangan Desa Meranti'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Napak tilas perjalanan panjang dan asal-usul terbentuknya komunitas masyarakat Desa Meranti dari masa ke masa.
        </p>
      </div>

      {/* Main Banner / Image */}
      <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative max-h-[420px]">
        <img
          src={getAssetUrl(data?.gambar || 'assets/Foto-Desa.png')}
          alt="Foto Sejarah Desa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-8">
          <div className="text-white">
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">
              Kearifan Lokal
            </span>
            <h2 className="text-2xl font-bold">Lanskap Alami & Pemukiman Bersejarah Desa Meranti</h2>
          </div>
        </div>
      </div>

      {/* Meta Highlights */}
      {data?.meta && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase block">Tahun Berdiri</span>
              <span className="text-lg font-bold text-slate-900">{data.meta.tahun_berdiri || '1952'}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase block">Tokoh Pendiri</span>
              <span className="text-sm font-bold text-slate-900">{data.meta.tokoh_pendiri || 'Buyung Sutan Marajo'}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-700">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase block">Potensi Unggulan</span>
              <span className="text-sm font-bold text-slate-900">{data.meta.keunggulan || 'Pertanian Padi & Perkebunan'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Konten Narasi */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
        <div className="prose prose-emerald max-w-none text-slate-700 leading-relaxed text-justify whitespace-pre-line text-base sm:text-lg">
          {data?.konten}
        </div>
      </div>
    </div>
  );
}
