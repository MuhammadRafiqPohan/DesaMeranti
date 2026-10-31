import React, { useEffect, useState } from 'react';
import { Users, Award, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import api from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function LembagaDesa() {
  const [lembaga, setLembaga] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLembaga = async () => {
      try {
        const res = await api.get('/lembaga');
        if (res.data.success) {
          setLembaga(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching lembaga:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLembaga();
  }, []);

  if (loading) return <LoadingSpinner text="Memuat data lembaga kemasyarakatan desa..." />;

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
          Mitra Pemerintah Desa
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Lembaga Kemasyarakatan Desa (LKD)
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Wadah partisipasi masyarakat dalam pembangunan, pengawasan tata kelola, dan pemberdayaan sosial di Desa Meranti.
        </p>
      </div>

      {/* Lembaga Cards */}
      <div className="space-y-8">
        {lembaga.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-lg shrink-0 shadow-md">
                  {item.singkatan || (idx + 1)}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{item.nama_lembaga}</h3>
                  <p className="text-sm font-semibold text-emerald-700 mt-0.5">
                    Ketua Lembaga: <span className="text-slate-800">{item.ketua || '-'}</span>
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold self-start">
                <ShieldCheck className="w-4 h-4" />
                <span>Lembaga Aktif</span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Profil & Peran Lembaga
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Tugas Pokok & Fungsi
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {item.tugas_fungsi}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
