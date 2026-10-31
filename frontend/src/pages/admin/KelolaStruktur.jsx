import React, { useEffect, useState } from 'react';
import { Network, Save, Image as ImageIcon } from 'lucide-react';
import api, { getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function KelolaStruktur() {
  const [form, setForm] = useState({
    judul: 'Bagan Struktur Organisasi Pemerintah Desa',
    konten: '',
    gambar: 'assets/Struktur-Desa.png',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchStruktur = async () => {
      try {
        const res = await api.get('/admin/halaman/struktur');
        if (res.data.success && res.data.data) {
          setForm({
            judul: res.data.data.judul || 'Bagan Struktur Organisasi Pemerintah Desa',
            konten: res.data.data.konten || '',
            gambar: res.data.data.gambar || 'assets/Struktur-Desa.png',
          });
        }
      } catch (err) {
        setAlert({ type: 'error', message: 'Gagal memuat data struktur.' });
      } finally {
        setLoading(false);
      }
    };

    fetchStruktur();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await api.put('/admin/halaman/struktur', form);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Halaman struktur desa berhasil diperbarui.' });
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Gagal menyimpan perubahan.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner text="Memuat struktur desa..." />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block mb-1">
            Kelola Halaman Desa
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Network className="w-6 h-6 text-emerald-600" />
            <span>Kelola Struktur Organisasi Desa</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Perbarui gambar bagan hierarki dan keterangan dasar hukum susunan organisasi.
          </p>
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Halaman</label>
          <input
            type="text"
            required
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Path / URL Gambar Bagan Struktur</label>
          <input
            type="text"
            required
            value={form.gambar}
            onChange={(e) => setForm({ ...form, gambar: e.target.value })}
            placeholder="assets/Struktur-Desa.png"
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            File bawaan: <code>assets/Struktur-Desa.png</code>
          </p>
        </div>

        {/* Image Preview */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Pratinjau Gambar Bagan</span>
          <div className="flex justify-center bg-white p-2 rounded-xl border border-slate-200">
            <img
              src={getAssetUrl(form.gambar || 'assets/Struktur-Desa.png')}
              alt="Pratinjau Struktur"
              className="max-h-64 object-contain"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Keterangan / Dasar Hukum Susunan</label>
          <textarea
            rows={4}
            value={form.konten}
            onChange={(e) => setForm({ ...form, konten: e.target.value })}
            placeholder="Tuliskan keterangan dasar hukum atau uraian bagan..."
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? 'Menyimpan...' : 'Simpan Halaman Struktur'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
