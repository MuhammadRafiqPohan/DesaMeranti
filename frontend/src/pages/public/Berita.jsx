import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Newspaper, Search, Calendar, User, ArrowRight } from 'lucide-react';
import api, { formatTanggal, getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function Berita() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const kategori = searchParams.get('kategori') || 'Berita';
  const search = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (kategori) params.append('kategori', kategori);
        if (search) params.append('q', search);
        params.append('page', page);

        const res = await api.get(`/postingan?${params.toString()}`);
        if (res.data.success) {
          setPosts(res.data.data.data);
          setPagination({
            currentPage: res.data.data.current_page,
            lastPage: res.data.data.last_page,
            total: res.data.data.total,
          });
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [kategori, search, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const q = formData.get('search');
    setSearchParams({ kategori, q, page: 1 });
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
          Informasi & Kabar Desa
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Berita & Kegiatan Desa Meranti
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Liputan kegiatan kemasyarakatan, pembangunan infrastruktur, gotong royong, dan kabar terkini seputar Desa Meranti.
        </p>
      </div>

      {/* Search & Tabs Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['Berita', 'Pengumuman', 'Agenda'].map((kat) => (
            <button
              key={kat}
              onClick={() => setSearchParams({ kategori: kat, q: search, page: 1 })}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                kategori === kat
                  ? 'bg-emerald-700 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Cari berita..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </form>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <LoadingSpinner text="Memuat artikel berita..." />
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Tidak ada postingan yang sesuai dengan pencarian Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="h-52 overflow-hidden bg-slate-100 relative">
                <img
                  src={getAssetUrl(item.gambar || 'assets/Foto-Desa.png')}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-emerald-700/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.kategori}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{formatTanggal(item.created_at)}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.penulis}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-3">
                    <Link to={`/berita/${item.slug}`}>{item.judul}</Link>
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {item.ringkasan}
                  </p>
                </div>

                <Link
                  to={`/berita/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 pt-3 border-t border-slate-100"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.lastPage > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setSearchParams({ kategori, q: search, page: p })}
              className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                page === p
                  ? 'bg-emerald-700 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
