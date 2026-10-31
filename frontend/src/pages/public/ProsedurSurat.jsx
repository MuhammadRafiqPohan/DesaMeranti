import React, { useEffect, useState } from 'react';
import { FileText, Search, Clock, CheckCircle2, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';
import api from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function ProsedurSurat() {
  const [suratList, setSuratList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const url = search ? `/layanan-surat?q=${encodeURIComponent(search)}` : '/layanan-surat';
        const res = await api.get(url);
        if (res.data.success) {
          setSuratList(res.data.data);
          if (res.data.data.length > 0 && !expandedId) {
            setExpandedId(res.data.data[0].id);
          }
        }
      } catch (err) {
        console.error('Error fetching surat:', err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchSurat, 300);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
          Pelayanan Administrasi Terpadu
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Standar Pelayanan & Prosedur Surat Warga
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Panduan syarat berkas dan alur pembuatan dokumen administrasi kependudukan di Kantor Pelayanan Terpadu Desa Meranti. Semua layanan <strong className="text-emerald-700">GRATIS (Rp 0)</strong> tanpa dipungut biaya apapun.
        </p>
      </div>

      {/* Search Input & Banner Bebas Pungli */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari jenis surat (misal: Usaha, SKTM, Domisili, SKCK, Kelahiran)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm text-slate-800 placeholder-slate-400 transition-all shadow-inner"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 font-bold">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Zona Integritas Bebas Pungli • Proses Cepat 15 - 30 Menit</span>
          </div>
          <span className="bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-full text-xs">
            Biaya Rp 0 (Gratis)
          </span>
        </div>
      </div>

      {/* List Surat */}
      {loading ? (
        <LoadingSpinner text="Mencari jenis layanan surat..." />
      ) : suratList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Jenis surat yang Anda cari tidak ditemukan.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {suratList.map((surat) => {
            const isExpanded = expandedId === surat.id;
            const syarat = Array.isArray(surat.persyaratan) ? surat.persyaratan : [];

            return (
              <div
                key={surat.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Header Card */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : surat.id)}
                  className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-700 shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{surat.nama_surat}</h3>
                      {surat.kode_surat && (
                        <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                          Kode Klasifikasi: {surat.kode_surat}
                        </span>
                      )}
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                        {surat.deskripsi}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{surat.waktu_layanan}</span>
                    </span>
                    <button className="text-xs font-bold text-emerald-700 underline">
                      {isExpanded ? 'Tutup Rincian' : 'Lihat Syarat & Alur'}
                    </button>
                  </div>
                </div>

                {/* Expanded Detail (Syarat & Prosedur) */}
                {isExpanded && (
                  <div className="px-6 pb-8 sm:px-8 border-t border-slate-100 pt-6 bg-slate-50/50 space-y-6 animate-in fade-in-50 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Persyaratan Dokumen */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Dokumen Persyaratan:</span>
                        </h4>
                        <ul className="space-y-2.5">
                          {syarat.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Alur Prosedur */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-blue-800 mb-4 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>Tahapan / Alur Pelayanan:</span>
                        </h4>
                        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-1">
                          {surat.prosedur}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-slate-500">
                      <span>* Harap membawa dokumen asli jika diperlukan verifikasi oleh petugas pelayanan.</span>
                      <a
                        href="https://wa.me/6281234567890?text=Halo%20Admin%20Desa%20Meranti,%20saya%20ingin%20bertanya%20mengenai%20pelayanan%20surat"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Konsultasi Layanan via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
