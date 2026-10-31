import React, { useEffect, useState } from 'react';
import { Target, CheckCircle2, Compass, ShieldCheck } from 'lucide-react';
import api from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function VisiMisi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisiMisi = async () => {
      try {
        const res = await api.get('/profil/visi-misi');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching visi misi:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisiMisi();
  }, []);

  if (loading) return <LoadingSpinner text="Memuat Visi & Misi Desa Meranti..." />;

  const misiList = data?.meta?.misi || [];
  const tujuanList = data?.meta?.tujuan || [];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
          Arah & Kebijakan
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Visi dan Misi Pembangunan Desa
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Pedoman dan komitmen strategis Pemerintah Desa Meranti untuk mewujudkan masyarakat yang adil, makmur, dan berakhlak mulia.
        </p>
      </div>

      {/* VISI CARD */}
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md text-emerald-300 shrink-0">
            <Target className="w-12 h-12" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold block mb-2">
              Visi Desa Meranti 2021 - 2027
            </span>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-snug">
              &ldquo;{data?.konten || 'Terwujudnya Desa Meranti yang Mandiri, Sejahtera, Berdaya Saing, Berkeadilan, dan Berakhlak Mulia Berlandaskan Nilai Gotong Royong.'}&rdquo;
            </blockquote>
          </div>
        </div>
      </div>

      {/* MISI LIST */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Misi Pembangunan</h2>
            <p className="text-xs text-slate-500">Langkah nyata pelaksanaan visi pemerintah desa</p>
          </div>
        </div>

        <div className="space-y-4">
          {misiList.map((misi, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 transition-colors border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-sm">
                {idx + 1}
              </div>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                {misi}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TUJUAN */}
      {tujuanList.length > 0 && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Tujuan Strategis</h2>
              <p className="text-xs text-slate-500">Target jangka menengah pencapaian program desa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tujuanList.map((tujuan, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sasaran {idx + 1}</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{tujuan}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
