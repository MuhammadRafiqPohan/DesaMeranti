import React, { useEffect, useState } from 'react';
import { UserCheck, ShieldCheck, Mail, Phone, Award } from 'lucide-react';
import api, { getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function AparaturDesa() {
  const [aparatur, setAparatur] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAparatur = async () => {
      try {
        const res = await api.get('/aparatur');
        if (res.data.success) {
          setAparatur(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching aparatur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAparatur();
  }, []);

  if (loading) return <LoadingSpinner text="Memuat daftar aparatur pemerintah desa..." />;

  // Kepala Desa (Urutan 1) & Sekretaris Desa (Urutan 2)
  const kades = aparatur.find((a) => a.jabatan.toLowerCase().includes('kepala desa'));
  const sekdes = aparatur.find((a) => a.jabatan.toLowerCase().includes('sekretaris'));
  const perangkatLain = aparatur.filter(
    (a) => !a.jabatan.toLowerCase().includes('kepala desa') && !a.jabatan.toLowerCase().includes('sekretaris')
  );

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
          Pemerintahan Desa
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Aparatur Pemerintah Desa Meranti
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Para abdi masyarakat yang berdedikasi melayani dan mengabdi untuk kemajuan dan kesejahteraan seluruh warga Desa Meranti.
        </p>
      </div>

      {/* Pimpinan Utama (Kepala Desa & Sekdes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {kades && (
          <div className="bg-gradient-to-br from-white to-emerald-50/60 rounded-3xl p-8 border-2 border-emerald-200/80 shadow-lg text-center flex flex-col items-center">
            <div className="w-48 h-60 rounded-2xl overflow-hidden shadow-xl border-4 border-white mb-6 bg-slate-900 relative">
              <img
                src={getAssetUrl(kades.foto || 'assets/aparatur/KEPALA DESA.png')}
                alt={kades.nama}
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {kades.status}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">{kades.nama}</h3>
            <p className="text-sm font-bold text-emerald-700 uppercase tracking-wider mt-1">{kades.jabatan}</p>
            {kades.niap_nip && (
              <p className="text-xs text-slate-400 mt-1">NIAP: {kades.niap_nip}</p>
            )}
          </div>
        )}

        {sekdes && (
          <div className="bg-gradient-to-br from-white to-blue-50/60 rounded-3xl p-8 border-2 border-blue-200/80 shadow-lg text-center flex flex-col items-center">
            <div className="w-48 h-60 rounded-2xl overflow-hidden shadow-xl border-4 border-white mb-6 bg-slate-900 relative">
              <img
                src={getAssetUrl(sekdes.foto || 'assets/aparatur/SEKDES.png')}
                alt={sekdes.nama}
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {sekdes.status}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">{sekdes.nama}</h3>
            <p className="text-sm font-bold text-blue-700 uppercase tracking-wider mt-1">{sekdes.jabatan}</p>
            {sekdes.niap_nip && (
              <p className="text-xs text-slate-400 mt-1">NIP: {sekdes.niap_nip}</p>
            )}
          </div>
        )}
      </div>

      {/* Perangkat Desa Lainnya */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Kepala Seksi, Kepala Urusan & Kepala Dusun</h2>
          <p className="text-xs text-slate-500 mt-1">Pelaksana teknis dan kewilayahan pemerintah desa</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {perangkatLain.map((ap) => (
            <div
              key={ap.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group"
            >
              <div className="w-40 h-52 rounded-2xl overflow-hidden shadow-md border-2 border-white mb-4 bg-slate-100 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={getAssetUrl(ap.foto || 'assets/Foto-Desa.png')}
                  alt={ap.nama}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                {ap.nama}
              </h4>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mt-1">
                {ap.jabatan}
              </p>
              {ap.niap_nip && (
                <p className="text-[11px] text-slate-400 mt-1">NIAP: {ap.niap_nip}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
