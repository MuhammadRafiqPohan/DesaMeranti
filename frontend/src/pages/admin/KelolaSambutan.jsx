import React, { useEffect, useState } from 'react';
import { MessageSquare, Save, Image as ImageIcon } from 'lucide-react';
import api, { getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function KelolaSambutan() {
  const [form, setForm] = useState({
    nama_kades: '',
    periode: '',
    foto: 'assets/aparatur/KEPALA DESA.png',
    judul: '',
    pesan: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchSambutan = async () => {
      try {
        const res = await api.get('/admin/sambutan');
        if (res.data.success && res.data.data) {
          setForm(res.data.data);
        }
      } catch (err) {
        setAlert({ type: 'error', message: 'Gagal memuat data sambutan.' });
      } finally {
        setLoading(false);
      }
    };

    fetchSambutan();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await api.put('/admin/sambutan', form);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Sambutan Kepala Desa berhasil diperbarui.' });
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

  if (loading) return <LoadingSpinner text="Memuat sambutan kades..." />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block mb-1">
            Kelola Konten Desa
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            <span>Kelola Sambutan Kepala Desa</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Edit pesan sambutan, nama pemimpin, masa periode, dan foto yang tampil di halaman beranda.
          </p>
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Kepala Desa</label>
            <input
              type="text"
              required
              value={form.nama_kades}
              onChange={(e) => setForm({ ...form, nama_kades: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Masa Periode Jabatan</label>
            <input
              type="text"
              required
              value={form.periode}
              onChange={(e) => setForm({ ...form, periode: e.target.value })}
              placeholder="Contoh: 2021 - 2027"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Path / URL Foto Kepala Desa</label>
            <input
              type="text"
              value={form.foto || ''}
              onChange={(e) => setForm({ ...form, foto: e.target.value })}
              placeholder="assets/aparatur/KEPALA DESA.png"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Foto default: <code>assets/aparatur/KEPALA DESA.png</code>
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-24 h-32 rounded-xl overflow-hidden bg-slate-100 border-2 border-emerald-500 shadow">
              <img
                src={getAssetUrl(form.foto || 'assets/aparatur/KEPALA DESA.png')}
                alt="Preview Kades"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Sambutan</label>
          <input
            type="text"
            required
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Isi Pesan Sambutan</label>
          <textarea
            rows={10}
            required
            value={form.pesan}
            onChange={(e) => setForm({ ...form, pesan: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-normal leading-relaxed focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? 'Menyimpan...' : 'Simpan Sambutan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
