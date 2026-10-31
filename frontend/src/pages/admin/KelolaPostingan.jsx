import React, { useEffect, useState } from 'react';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Layers,
  Search,
  X,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import api, { formatTanggal, getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function KelolaPostingan() {
  const [posts, setPosts] = useState([]);
  const [filterKategori, setFilterKategori] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    judul: '',
    kategori: 'Berita',
    konten: '',
    ringkasan: '',
    gambar: 'assets/berita/berita1.png',
    penulis: 'Admin Desa',
    tanggal_kegiatan: '',
    lokasi_kegiatan: '',
    status: 'published',
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url = filterKategori ? `/admin/postingan?kategori=${filterKategori}` : '/admin/postingan';
      const res = await api.get(url);
      if (res.data.success) {
        setPosts(res.data.data.data);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Gagal memuat postingan.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filterKategori]);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setForm({
      judul: '',
      kategori: 'Berita',
      konten: '',
      ringkasan: '',
      gambar: 'assets/berita/berita1.png',
      penulis: 'Admin Desa',
      tanggal_kegiatan: '',
      lokasi_kegiatan: '',
      status: 'published',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setForm({
      judul: item.judul,
      kategori: item.kategori,
      konten: item.konten,
      ringkasan: item.ringkasan || '',
      gambar: item.gambar || '',
      penulis: item.penulis || 'Admin Desa',
      tanggal_kegiatan: item.tanggal_kegiatan || '',
      lokasi_kegiatan: item.lokasi_kegiatan || '',
      status: item.status || 'published',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id, judul) => {
    if (window.confirm(`Hapus postingan "${judul}"?`)) {
      try {
        const res = await api.delete(`/admin/postingan/${id}`);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Postingan berhasil dihapus.' });
          fetchPosts();
        }
      } catch (err) {
        setAlert({ type: 'error', message: 'Gagal menghapus postingan.' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditing) {
        const res = await api.put(`/admin/postingan/${currentId}`, form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Postingan berhasil diperbarui.' });
          setModalOpen(false);
          fetchPosts();
        }
      } else {
        const res = await api.post('/admin/postingan', form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Postingan berhasil diterbitkan.' });
          setModalOpen(false);
          fetchPosts();
        }
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Gagal menyimpan postingan.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block mb-1">
            Kelola Konten Desa
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            <span>Kelola Postingan (Berita, Pengumuman & Agenda)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Terbitkan artikel berita, info pengumuman masyarakat, dan jadwal agenda desa.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Postingan Baru</span>
        </button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm text-xs font-semibold">
        {['', 'Berita', 'Pengumuman', 'Agenda'].map((kat) => (
          <button
            key={kat}
            onClick={() => setFilterKategori(kat)}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterKategori === kat
                ? 'bg-emerald-700 text-white shadow-sm font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {kat === '' ? 'Semua Kategori' : kat}
          </button>
        ))}
      </div>

      {/* Tabel Postingan */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16">
            <LoadingSpinner text="Memuat postingan..." />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Belum ada postingan dalam kategori ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3.5">Gambar</th>
                  <th className="p-3.5">Judul Postingan</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Penulis</th>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5">Dibaca</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {posts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={getAssetUrl(item.gambar || 'assets/Foto-Desa.png')}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900 max-w-sm truncate" title={item.judul}>
                      {item.judul}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500">{item.penulis}</td>
                    <td className="p-3.5 text-slate-500 whitespace-nowrap">{formatTanggal(item.created_at)}</td>
                    <td className="p-3.5 text-slate-500 font-mono">{item.dibaca}x</td>
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.judul)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL TAMBAH / EDIT POSTINGAN */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 bg-slate-900 text-white">
              <div>
                <h3 className="text-lg font-bold">
                  {isEditing ? 'Edit Postingan' : 'Tulis Postingan Baru'}
                </h3>
                <p className="text-xs text-slate-400">
                  Formulir publikasi berita, pengumuman, atau agenda
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Postingan</label>
                <input
                  type="text"
                  required
                  value={form.judul}
                  onChange={(e) => setForm({ ...form, judul: e.target.value })}
                  placeholder="Masukkan judul postingan..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori</label>
                  <select
                    value={form.kategori}
                    onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="Berita">Berita</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Agenda">Agenda</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Penulis</label>
                  <input
                    type="text"
                    value={form.penulis}
                    onChange={(e) => setForm({ ...form, penulis: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {form.kategori === 'Agenda' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tanggal Kegiatan</label>
                    <input
                      type="date"
                      value={form.tanggal_kegiatan}
                      onChange={(e) => setForm({ ...form, tanggal_kegiatan: e.target.value })}
                      className="w-full p-2 rounded-lg border border-slate-200 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lokasi Kegiatan</label>
                    <input
                      type="text"
                      value={form.lokasi_kegiatan}
                      onChange={(e) => setForm({ ...form, lokasi_kegiatan: e.target.value })}
                      placeholder="Contoh: Balai Pertemuan Desa"
                      className="w-full p-2 rounded-lg border border-slate-200 text-xs font-medium"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Path / URL Gambar</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.gambar}
                    onChange={(e) => setForm({ ...form, gambar: e.target.value })}
                    placeholder="assets/berita/berita1.png"
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, gambar: 'assets/berita/berita1.png' })}
                    className="text-[11px] text-emerald-700 font-semibold underline"
                  >
                    Pilih berita1.png
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, gambar: 'assets/berita/berita2.webp' })}
                    className="text-[11px] text-emerald-700 font-semibold underline"
                  >
                    Pilih berita2.webp
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, gambar: 'assets/berita/beritaS.jpeg' })}
                    className="text-[11px] text-emerald-700 font-semibold underline"
                  >
                    Pilih beritaS.jpeg
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, gambar: 'assets/Foto-Desa.png' })}
                    className="text-[11px] text-emerald-700 font-semibold underline"
                  >
                    Pilih Foto-Desa.png
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ringkasan Singkat</label>
                <textarea
                  rows={2}
                  value={form.ringkasan}
                  onChange={(e) => setForm({ ...form, ringkasan: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu berita..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Konten Lengkap</label>
                <textarea
                  rows={8}
                  required
                  value={form.konten}
                  onChange={(e) => setForm({ ...form, konten: e.target.value })}
                  placeholder="Tuliskan isi berita secara lengkap di sini..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs shadow-md"
                >
                  {submitting ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Terbitkan Postingan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
