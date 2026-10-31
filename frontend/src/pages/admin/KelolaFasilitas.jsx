import React, { useEffect, useState } from 'react';
import { Building2, Plus, Edit2, Trash2, X, CheckCircle } from 'lucide-react';
import api, { getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function KelolaFasilitas() {
  const [fasilitasList, setFasilitasList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    nama_fasilitas: '',
    kategori: 'Pemerintahan',
    lokasi: '',
    kondisi: 'Baik',
    deskripsi: '',
    foto: 'assets/fasilitas/kantordesa.JPG',
  });

  const fetchFasilitas = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/fasilitas');
      if (res.data.success) {
        setFasilitasList(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Gagal memuat data fasilitas.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFasilitas();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setForm({
      nama_fasilitas: '',
      kategori: 'Pemerintahan',
      lokasi: '',
      kondisi: 'Baik',
      deskripsi: '',
      foto: 'assets/fasilitas/kantordesa.JPG',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setForm({
      nama_fasilitas: item.nama_fasilitas,
      kategori: item.kategori,
      lokasi: item.lokasi || '',
      kondisi: item.kondisi || 'Baik',
      deskripsi: item.deskripsi || '',
      foto: item.foto || 'assets/fasilitas/kantordesa.JPG',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id, nama) => {
    if (window.confirm(`Hapus fasilitas "${nama}"?`)) {
      try {
        const res = await api.delete(`/admin/fasilitas/${id}`);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Fasilitas berhasil dihapus.' });
          fetchFasilitas();
        }
      } catch (err) {
        setAlert({ type: 'error', message: 'Gagal menghapus fasilitas.' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditing) {
        const res = await api.put(`/admin/fasilitas/${currentId}`, form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Fasilitas berhasil diperbarui.' });
          setModalOpen(false);
          fetchFasilitas();
        }
      } else {
        const res = await api.post('/admin/fasilitas', form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Fasilitas berhasil ditambahkan.' });
          setModalOpen(false);
          fetchFasilitas();
        }
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Gagal menyimpan fasilitas.',
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
            <Building2 className="w-6 h-6 text-emerald-600" />
            <span>Kelola Fasilitas Desa</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Data kantor desa, balai pertemuan, sekolah, poskesdes, dan sarana umum.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Fasilitas</span>
        </button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Tabel Fasilitas */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16">
            <LoadingSpinner text="Memuat data fasilitas..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3.5">Foto</th>
                  <th className="p-3.5">Nama Fasilitas</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Lokasi</th>
                  <th className="p-3.5">Kondisi</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {fasilitasList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={getAssetUrl(item.foto || 'assets/fasilitas/kantordesa.JPG')}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{item.nama_fasilitas}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500">{item.lokasi || '-'}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {item.kondisi}
                      </span>
                    </td>
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
                          onClick={() => handleDelete(item.id, item.nama_fasilitas)}
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

      {/* MODAL TAMBAH / EDIT FASILITAS */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 bg-slate-900 text-white">
              <div>
                <h3 className="text-lg font-bold">
                  {isEditing ? 'Edit Fasilitas Desa' : 'Tambah Fasilitas Desa'}
                </h3>
                <p className="text-xs text-slate-400">Data sarana prasarana umum desa</p>
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
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Fasilitas</label>
                <input
                  type="text"
                  required
                  value={form.nama_fasilitas}
                  onChange={(e) => setForm({ ...form, nama_fasilitas: e.target.value })}
                  placeholder="Contoh: Balai Pertemuan Desa"
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
                    <option value="Pemerintahan">Pemerintahan</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Sosial & Olahraga">Sosial & Olahraga</option>
                    <option value="Fasilitas Umum">Fasilitas Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kondisi Bangunan</label>
                  <select
                    value={form.kondisi}
                    onChange={(e) => setForm({ ...form, kondisi: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="Baik">Baik</option>
                    <option value="Cukup Baik">Cukup Baik</option>
                    <option value="Perlu Renovasi">Perlu Renovasi</option>
                    <option value="Rusak Ringan">Rusak Ringan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lokasi Fasilitas</label>
                <input
                  type="text"
                  value={form.lokasi}
                  onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
                  placeholder="Contoh: Jl. Raya Meranti No. 01 Dusun I"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Path / URL Foto</label>
                <input
                  type="text"
                  value={form.foto}
                  onChange={(e) => setForm({ ...form, foto: e.target.value })}
                  placeholder="assets/fasilitas/kantordesa.JPG"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, foto: 'assets/fasilitas/kantordesa.JPG' })}
                    className="text-[11px] text-emerald-700 underline font-medium"
                  >
                    Pilih kantordesa.JPG
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, foto: 'assets/fasilitas/balaidesa.jpg' })}
                    className="text-[11px] text-emerald-700 underline font-medium"
                  >
                    Pilih balaidesa.jpg
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, foto: 'assets/fasilitas/tk.jpg' })}
                    className="text-[11px] text-emerald-700 underline font-medium"
                  >
                    Pilih tk.jpg
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Fasilitas</label>
                <textarea
                  rows={3}
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  placeholder="Uraian pemanfaatan dan fasilitas yang tersedia..."
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
                  {submitting ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Fasilitas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
