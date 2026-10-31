import React, { useEffect, useState } from 'react';
import { Target, Save, Plus, Trash2 } from 'lucide-react';
import api from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function KelolaVisiMisi() {
  const [form, setForm] = useState({
    judul: 'Visi dan Misi Desa Meranti',
    konten: '',
    meta: {
      misi: [],
      tujuan: [],
    },
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchVisiMisi = async () => {
      try {
        const res = await api.get('/admin/halaman/visi_misi');
        if (res.data.success && res.data.data) {
          const val = res.data.data;
          setForm({
            judul: val.judul || 'Visi dan Misi Desa Meranti',
            konten: val.konten || '',
            meta: {
              misi: val.meta?.misi || [],
              tujuan: val.meta?.tujuan || [],
            },
          });
        }
      } catch (err) {
        setAlert({ type: 'error', message: 'Gagal memuat data visi misi.' });
      } finally {
        setLoading(false);
      }
    };

    fetchVisiMisi();
  }, []);

  const handleAddMisi = () => {
    const updated = [...(form.meta.misi || []), ''];
    setForm({ ...form, meta: { ...form.meta, misi: updated } });
  };

  const handleRemoveMisi = (idx) => {
    const updated = form.meta.misi.filter((_, i) => i !== idx);
    setForm({ ...form, meta: { ...form.meta, misi: updated } });
  };

  const handleMisiChange = (idx, value) => {
    const updated = [...form.meta.misi];
    updated[idx] = value;
    setForm({ ...form, meta: { ...form.meta, misi: updated } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await api.put('/admin/halaman/visi_misi', form);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Visi dan Misi desa berhasil diperbarui.' });
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

  if (loading) return <LoadingSpinner text="Memuat data visi misi..." />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block mb-1">
            Kelola Halaman Desa
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-600" />
            <span>Kelola Visi dan Misi Desa</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Rumusan pernyataan visi dan butir-butir misi pembangunan desa.
          </p>
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pernyataan Visi */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Pernyataan Visi Utama Desa
          </label>
          <textarea
            rows={3}
            required
            value={form.konten}
            onChange={(e) => setForm({ ...form, konten: e.target.value })}
            placeholder="Tuliskan pernyataan visi pembangunan desa..."
            className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        {/* Butir-Butir Misi */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Poin-Poin Misi Pembangunan
              </h3>
              <p className="text-xs text-slate-400">Daftar misi yang dijalankan pemerintah desa</p>
            </div>
            <button
              type="button"
              onClick={handleAddMisi}
              className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold hover:bg-emerald-200 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Misi</span>
            </button>
          </div>

          <div className="space-y-3">
            {form.meta.misi?.map((misi, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1">
                  {idx + 1}
                </span>
                <textarea
                  rows={2}
                  required
                  value={misi}
                  onChange={(e) => handleMisiChange(idx, e.target.value)}
                  placeholder={`Tuliskan misi ke-${idx + 1}...`}
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMisi(idx)}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg mt-1"
                  title="Hapus Misi"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? 'Menyimpan...' : 'Simpan Visi Misi'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
