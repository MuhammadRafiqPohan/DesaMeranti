import React, { useEffect, useState } from 'react';
import { Building2, MapPin, CheckCircle, Tag } from 'lucide-react';
import api, { getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function Fasilitas() {
  const [fasilitas, setFasilitas] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFasilitas = async () => {
      try {
        const url = selectedKategori ? `/fasilitas?kategori=${selectedKategori}` : '/fasilitas';
        const res = await api.get(url);
        if (res.data.success) {
          setFasilitas(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching fasilitas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFasilitas();
  }, [selectedKategori]);

  const kategoriList = ['', 'Pemerintahan', 'Pendidikan', 'Kesehatan', 'Sosial & Olahraga'];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
          Sarana & Prasarana
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Fasilitas Umum Desa Meranti
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Daftar sarana perkantoran, tempat pertemuan, pusat layanan kesehatan, serta sarana pendidikan dan olahraga yang tersedia untuk warga desa.
        </p>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {kategoriList.map((kat) => (
          <button
            key={kat}
            onClick={() => setSelectedKategori(kat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedKategori === kat
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-200'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {kat === '' ? 'Semua Fasilitas' : kat}
          </button>
        ))}
      </div>

      {/* Fasilitas Grid */}
      {loading ? (
        <LoadingSpinner text="Memuat daftar fasilitas desa..." />
      ) : fasilitas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Belum ada data fasilitas untuk kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fasilitas.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="h-56 overflow-hidden bg-slate-100 relative">
                <img
                  src={getAssetUrl(item.foto || 'assets/Foto-Desa.png')}
                  alt={item.nama_fasilitas}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-emerald-700/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.kategori}
                </span>
                <span className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-sm text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Kondisi {item.kondisi}</span>
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {item.nama_fasilitas}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item.lokasi || 'Desa Meranti'}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
