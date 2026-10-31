import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import api, { formatTanggal } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function Agenda() {
  const [agendas, setAgendas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const res = await api.get('/postingan?kategori=Agenda');
        if (res.data.success) {
          setAgendas(res.data.data.data);
        }
      } catch (err) {
        console.error('Error fetching agenda:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, []);

  if (loading) return <LoadingSpinner text="Memuat jadwal agenda kegiatan desa..." />;

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
          Jadwal & Agenda Desa
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Agenda Kegiatan Desa Meranti
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Rangkaian jadwal musyawarah desa, gotong royong, peringatan hari besar keagamaan dan nasional, serta pembinaan masyarakat.
        </p>
      </div>

      {agendas.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Belum ada agenda kegiatan mendatang.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {agendas.map((item) => {
            const dateObj = item.tanggal_kegiatan ? new Date(item.tanggal_kegiatan) : null;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-5">
                  <div className="bg-emerald-700 text-white rounded-2xl p-4 text-center min-w-[80px] shrink-0 shadow-md">
                    <span className="block text-xs font-bold uppercase tracking-wider">
                      {dateObj ? dateObj.toLocaleString('id-ID', { month: 'short' }) : 'Agenda'}
                    </span>
                    <span className="block text-2xl font-black leading-none mt-1">
                      {dateObj ? dateObj.getDate() : '📅'}
                    </span>
                    <span className="block text-[11px] text-emerald-200 mt-1">
                      {dateObj ? dateObj.getFullYear() : ''}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 hover:text-emerald-700 transition-colors mb-2">
                      <Link to={`/berita/${item.slug}`}>{item.judul}</Link>
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-3 font-medium">
                      <span className="flex items-center gap-1.5 text-emerald-700">
                        <MapPin className="w-4 h-4" />
                        <span>{item.lokasi_kegiatan || 'Desa Meranti'}</span>
                      </span>
                      <span>•</span>
                      <span>Penyelenggara: {item.penulis}</span>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/berita/${item.slug}`}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 transition-colors shrink-0 self-end sm:self-center inline-flex items-center gap-1.5"
                >
                  <span>Detail Agenda</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
