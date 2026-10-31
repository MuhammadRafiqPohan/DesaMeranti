import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Eye, ArrowLeft, Share2, MessageCircle, ArrowRight } from 'lucide-react';
import api, { formatTanggal, getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function BeritaDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [terkait, setTerkait] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/postingan/${slug}`);
        if (res.data.success) {
          setPost(res.data.data.post);
          setTerkait(res.data.data.terkait);
        }
      } catch (err) {
        console.error('Error fetching detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) return <LoadingSpinner text="Memuat artikel..." />;
  if (!post) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Artikel tidak ditemukan</h2>
        <Link to="/berita" className="mt-4 inline-block text-emerald-700 font-bold">Kembali ke Berita</Link>
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Tombol Kembali */}
      <Link
        to="/berita"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Berita Desa</span>
      </Link>

      {/* Header Artikel */}
      <div className="space-y-4">
        <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          {post.kategori}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {post.judul}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pt-2 border-b border-slate-100 pb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{formatTanggal(post.created_at)}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-emerald-600" />
            <span>{post.penulis}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-emerald-600" />
            <span>Dilihat {post.dibaca} kali</span>
          </span>
        </div>
      </div>

      {/* Featured Image */}
      {post.gambar && (
        <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 max-h-[500px]">
          <img
            src={getAssetUrl(post.gambar)}
            alt={post.judul}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Isi Konten */}
      <article className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
        <div className="text-slate-800 leading-relaxed text-justify whitespace-pre-line text-base sm:text-lg space-y-4 font-normal">
          {post.konten}
        </div>

        {/* Share buttons */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Bagikan Informasi Ini:</span>
          <div className="flex items-center gap-2">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.judul + ' - ' + shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                alert('Tautan artikel berhasil disalin!');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Salin Tautan</span>
            </button>
          </div>
        </div>
      </article>

      {/* Berita Terkait */}
      {terkait.length > 0 && (
        <div className="pt-8 space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">Informasi Terkait Lainnya</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {terkait.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs text-slate-400 block mb-1">{formatTanggal(item.created_at)}</span>
                  <h4 className="text-base font-bold text-slate-900 hover:text-emerald-700 mb-2">
                    <Link to={`/berita/${item.slug}`}>{item.judul}</Link>
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.ringkasan}</p>
                </div>
                <Link
                  to={`/berita/${item.slug}`}
                  className="mt-4 text-xs font-bold text-emerald-700 inline-flex items-center gap-1"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
