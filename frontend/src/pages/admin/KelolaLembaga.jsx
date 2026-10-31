import React, { useEffect, useState } from 'react';
import { Award, Plus, Edit2, Trash2, X, Users } from 'lucide-react';
import api from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function KelolaLembaga() {
  const [lembagaList, setLembagaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    nama_lembaga: '',
    singkatan: '',
    ketua: '',
    deskripsi: '',
    tugas_fungsi: '',
    urutan: 0,
  });

  const fetchLembaga = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/lembaga');
      if (res.data.success) {
        setLembagaList(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Gagal memuat data lembaga.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLembaga();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setForm({
      nama_lembaga: '',
      singkatan: '',
      ketua: '',
      deskripsi: '',
      tugas_fungsi: '',
      urutan: lembagaList.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setForm({
      nama_lembaga: item.nama_lembaga,
      singkatan: item.singkatan || '',
      ketua: item.ketua || '',
      deskripsi: item.deskripsi || '',
      tugas_fungsi: item.tugas_fungsi || '',
      urutan: item.urutan || 0,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id, nama) => {
    if (window.confirm(`Hapus lembaga "${nama}"?`)) {
      try {
        const res = await api.delete(`/admin/lembaga/${id}`);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Lembaga berhasil dihapus.' });
          fetchLembaga();
        }
      } catch (err) {
        setAlert({ type: 'error', message: 'Gagal menghapus lembaga.' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditing) {
        const res = await api.put(`/admin/lembaga/${currentId}`, form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Lembaga berhasil diperbarui.' });
          setModalOpen(false);
          fetchLembaga();
        }
      } else {
        const res = await api.post('/admin/lembaga', form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Lembaga berhasil ditambahkan.' });
          setModalOpen(false);
          fetchLembaga();
        }
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Gagal menyimpan data lembaga.',
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
            Kelola Halaman Desa
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-600" />
            <span>Kelola Lembaga Desa (LKD)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola data Badan Permusyawaratan Desa (BPD), LPMD, PKK, Karang Taruna, dan Posyandu.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Lembaga Baru</span>
        </button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Tabel Lembaga */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16">
            <LoadingSpinner text="Memuat lembaga desa..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3.5">Singkatan</th>
                  <th className="p-3.5">Nama Lembaga</th>
                  <th className="p-3.5">Ketua</th>
                  <th className="p-3.5">Tugas & Fungsi</th>
                  <th className="p-3.5 text-center">Urutan</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {lembagaList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-emerald-800">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                        {item.singkatan || '-'}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{item.nama_lembaga}</td>
                    <td className="p-3.5 text-slate-700">{item.ketua || '-'}</td>
                    <td className="p-3.5 text-slate-500 max-w-xs truncate" title={item.tugas_fungsi}>
                      {item.tugas_fungsi || '-'}
                    </td>
                    <td className="p-3.5 text-center font-mono">{item.urutan}</td>
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
                          onClick={() => handleDelete(item.id, item.nama_lembaga)}
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

      {/* MODAL TAMBAH / EDIT LEMBAGA */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 bg-slate-900 text-white">
              <div>
                <h3 className="text-lg font-bold">
                  {isEditing ? 'Edit Lembaga Desa' : 'Tambah Lembaga Desa'}
                </h3>
                <p className="text-xs text-slate-400">Data organisasi kemasyarakatan desa</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Lembaga</label>
                  <input
                    type="text"
                    required
                    value={form.nama_lembaga}
                    onChange={(e) => setForm({ ...form, nama_lembaga: e.target.value })}
                    placeholder="Contoh: Badan Permusyawaratan Desa"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Singkatan</label>
                  <input
                    type="text"
                    value={form.singkatan}
                    onChange={(e) => setForm({ ...form, singkatan: e.target.value })}
                    placeholder="Contoh: BPD"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Ketua</label>
                  <input
                    type="text"
                    value={form.ketua}
                    onChange={(e) => setForm({ ...form, ketua: e.target.value })}
                    placeholder="Nama ketua lembaga..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nomor Urutan</label>
                  <input
                    type="number"
                    value={form.urutan}
                    onChange={(e) => setForm({ ...form, urutan: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Lembaga</label>
                <textarea
                  rows={3}
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  placeholder="Keterangan singkat peran lembaga..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tugas Pokok & Fungsi</label>
                <textarea
                  rows={4}
                  value={form.tugas_fungsi}
                  onChange={(e) => setForm({ ...form, tugas_fungsi: e.target.value })}
                  placeholder="Uraian tugas pokok dan wewenang..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

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
                  {submitting ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Lembaga'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
