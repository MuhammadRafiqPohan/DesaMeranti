import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Calendar, User, ArrowRight, FileText } from 'lucide-react';
import api, { formatTanggal } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function Pengumuman() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const res = await api.get('/postingan?kategori=Pengumuman');
        if (res.data.success) {
          setPosts(res.data.data.data);
        }
      } catch (err) {
        console.error('Error fetching pengumuman:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPengumuman();
  }, []);

  if (loading) return <LoadingSpinner text="Memuat pengumuman desa..." />;

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block mb-2">
          Pemberitahuan Publik
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Pengumuman Resmi Pemerintah Desa
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Pemberitahuan terkini terkait pelayanan warga, penyaluran bantuan sosial, jadwal perekaman KTP, dan edaran resmi desa.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Belum ada pengumuman baru saat ini.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-100 text-amber-700 shrink-0">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1.5">
                    <span>{formatTanggal(item.created_at)}</span>
                    <span>•</span>
                    <span>Oleh {item.penulis}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 hover:text-emerald-700 transition-colors mb-2">
                    <Link to={`/berita/${item.slug}`}>{item.judul}</Link>
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 max-w-2xl leading-relaxed">
                    {item.ringkasan}
                  </p>
                </div>
              </div>

              <Link
                to={`/berita/${item.slug}`}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shrink-0 self-end md:self-center inline-flex items-center gap-2"
              >
                <span>Baca Pengumuman</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
