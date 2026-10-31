import React, { useEffect, useState } from 'react';
import { Layers, Save, MapPin, BookOpen } from 'lucide-react';
import api from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function KelolaHalamanEdit() {
  const [selectedKey, setSelectedKey] = useState('sejarah'); // 'sejarah' or 'wilayah'
  const [form, setForm] = useState({
    judul: '',
    konten: '',
    gambar: '',
    meta: {},
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  const fetchHalaman = async (key) => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/halaman/${key}`);
      if (res.data.success && res.data.data) {
        const val = res.data.data;
        setForm({
          judul: val.judul || '',
          konten: val.konten || '',
          gambar: val.gambar || '',
          meta: val.meta || {},
        });
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Gagal memuat teks halaman.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHalaman(selectedKey);
  }, [selectedKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await api.put(`/admin/halaman/${selectedKey}`, form);
      if (res.data.success) {
        setAlert({ type: 'success', message: `Halaman ${selectedKey} berhasil diperbarui.` });
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

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block mb-1">
            Kelola Halaman Desa
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-600" />
            <span>Kelola Teks Halaman Lain (Sejarah & Wilayah)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Edit narasi sejarah desa serta data parameter geografis dan batas wilayah.
          </p>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm text-xs font-bold">
        <button
          onClick={() => setSelectedKey('sejarah')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
            selectedKey === 'sejarah' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Teks Sejarah Desa</span>
        </button>

        <button
          onClick={() => setSelectedKey('wilayah')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
            selectedKey === 'wilayah' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Wilayah & Peta Desa</span>
        </button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {loading ? (
        <LoadingSpinner text="Memuat konten halaman..." />
      ) : (
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
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Path / URL Gambar Utama</label>
            <input
              type="text"
              value={form.gambar || ''}
              onChange={(e) => setForm({ ...form, gambar: e.target.value })}
              placeholder={selectedKey === 'sejarah' ? 'assets/Foto-Desa.png' : 'assets/Peta-Desa.jpg'}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              {selectedKey === 'sejarah' ? 'Default: assets/Foto-Desa.png' : 'Default: assets/Peta-Desa.jpg'}
            </p>
          </div>

          {selectedKey === 'wilayah' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Luas Wilayah Total</label>
                <input
                  type="text"
                  value={form.meta?.luas_wilayah || ''}
                  onChange={(e) => setForm({ ...form, meta: { ...form.meta, luas_wilayah: e.target.value } })}
                  placeholder="1.250 Ha"
                  className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Batas Utara</label>
                <input
                  type="text"
                  value={form.meta?.batas_utara || ''}
                  onChange={(e) => setForm({ ...form, meta: { ...form.meta, batas_utara: e.target.value } })}
                  placeholder="Desa Sukamaju"
                  className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Batas Selatan</label>
                <input
                  type="text"
                  value={form.meta?.batas_selatan || ''}
                  onChange={(e) => setForm({ ...form, meta: { ...form.meta, batas_selatan: e.target.value } })}
                  placeholder="Sungai Batang Meranti"
                  className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Batas Timur</label>
                <input
                  type="text"
                  value={form.meta?.batas_timur || ''}
                  onChange={(e) => setForm({ ...form, meta: { ...form.meta, batas_timur: e.target.value } })}
                  placeholder="Desa Koto Baru"
                  className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Batas Barat</label>
                <input
                  type="text"
                  value={form.meta?.batas_barat || ''}
                  onChange={(e) => setForm({ ...form, meta: { ...form.meta, batas_barat: e.target.value } })}
                  placeholder="Kecamatan Tetangga"
                  className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ketinggian / Topografi</label>
                <input
                  type="text"
                  value={form.meta?.ketinggian || ''}
                  onChange={(e) => setForm({ ...form, meta: { ...form.meta, ketinggian: e.target.value } })}
                  placeholder="150 - 300 mdpl"
                  className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Narasi / Teks Isi Halaman
            </label>
            <textarea
              rows={12}
              required
              value={form.konten}
              onChange={(e) => setForm({ ...form, konten: e.target.value })}
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
              <span>{submitting ? 'Menyimpan...' : 'Simpan Teks Halaman'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
