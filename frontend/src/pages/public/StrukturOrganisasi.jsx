import React, { useEffect, useState } from 'react';
import { Network, ZoomIn, ShieldCheck, Users } from 'lucide-react';
import api, { getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function StrukturOrganisasi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStruktur = async () => {
      try {
        const res = await api.get('/profil/struktur');
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching struktur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStruktur();
  }, []);

  if (loading) return <LoadingSpinner text="Memuat struktur organisasi desa..." />;

  const { halaman, aparatur = [] } = data || {};

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
          Pemerintahan Desa
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Struktur Organisasi Pemerintah Desa Meranti
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Bagan tata kerja dan susunan organisasi pemerintah desa sesuai Permendagri No. 84 Tahun 2015.
        </p>
      </div>

      {/* Gambar Bagan Struktur */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">Bagan Struktur Resmi</h3>
          </div>
          <span className="text-xs text-slate-400">SK Kepala Desa & Bupati</span>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white flex justify-center items-center p-2">
          <img
            src={getAssetUrl(halaman?.gambar || 'assets/Struktur-Desa.png')}
            alt="Bagan Struktur Organisasi Desa Meranti"
            className="w-full max-h-[750px] object-contain hover:scale-105 transition-transform duration-500 cursor-zoom-in"
          />
        </div>
      </div>

      {/* Penjelasan Hierarki */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <span>Hierarki Kepemimpinan & Pembagian Tugas</span>
        </h3>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Pemerintah Desa Meranti dipimpin oleh seorang Kepala Desa yang dibantu oleh Perangkat Desa. Perangkat Desa terdiri atas Sekretariat Desa (dipimpin Sekretaris Desa dengan Kepala Urusan), Pelaksana Teknis (para Kepala Seksi), dan Pelaksana Kewilayahan (para Kepala Dusun).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <h4 className="font-bold text-emerald-900 text-sm mb-1">Sekretariat Desa</h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Membantu Kepala Desa dalam bidang administrasi ketatausahaan, keuangan, perencanaan, dan urusan umum desa.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
            <h4 className="font-bold text-blue-900 text-sm mb-1">Pelaksana Teknis (Kasi)</h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              Membantu Kepala Desa sebagai pelaksana tugas operasional di bidang pemerintahan, kesejahteraan, dan pelayanan.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100">
            <h4 className="font-bold text-amber-900 text-sm mb-1">Pelaksana Kewilayahan (Kadus)</h4>
            <p className="text-xs text-amber-700 leading-relaxed">
              Membantu Kepala Desa dalam pelaksanaan tugas di wilayah kerjanya (Dusun I dan Dusun II).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
