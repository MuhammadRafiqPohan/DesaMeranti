import React, { useEffect, useState } from 'react';
import { UserCheck, Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import api, { getAssetUrl } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function KelolaAparatur() {
  const [aparaturList, setAparaturList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    nama: '',
    jabatan: '',
    niap_nip: '',
    foto: 'assets/aparatur/KEPALA DESA.png',
    urutan: 0,
    status: 'Aktif',
  });

  const availablePhotos = [
    'assets/aparatur/KEPALA DESA.png',
    'assets/aparatur/SEKDES.png',
    'assets/aparatur/KAUR KEUANGAN.png',
    'assets/aparatur/KAUR PERENCANAAN.png',
    'assets/aparatur/KASI PEMERINTAHAN.png',
    'assets/aparatur/KASI KESEJAHTERAAN.png',
    'assets/aparatur/KASI PELAYANAN.png',
    'assets/aparatur/KADUS 1.png',
    'assets/aparatur/KADUS 2.png',
  ];

  const fetchAparatur = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/aparatur');
      if (res.data.success) {
        setAparaturList(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Gagal memuat data aparatur.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAparatur();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setForm({
      nama: '',
      jabatan: '',
      niap_nip: '',
      foto: 'assets/aparatur/KEPALA DESA.png',
      urutan: aparaturList.length + 1,
      status: 'Aktif',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setForm({
      nama: item.nama,
      jabatan: item.jabatan,
      niap_nip: item.niap_nip || '',
      foto: item.foto || 'assets/aparatur/KEPALA DESA.png',
      urutan: item.urutan || 0,
      status: item.status || 'Aktif',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id, nama) => {
    if (window.confirm(`Hapus data aparatur "${nama}"?`)) {
      try {
        const res = await api.delete(`/admin/aparatur/${id}`);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Data aparatur berhasil dihapus.' });
          fetchAparatur();
        }
      } catch (err) {
        setAlert({ type: 'error', message: 'Gagal menghapus data aparatur.' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditing) {
        const res = await api.put(`/admin/aparatur/${currentId}`, form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Data aparatur berhasil diperbarui.' });
          setModalOpen(false);
          fetchAparatur();
        }
      } else {
        const res = await api.post('/admin/aparatur', form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Data aparatur berhasil ditambahkan.' });
          setModalOpen(false);
          fetchAparatur();
        }
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Gagal menyimpan data aparatur.',
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
            <UserCheck className="w-6 h-6 text-emerald-600" />
            <span>Kelola Aparatur Desa</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Daftar perangkat desa, foto profil resmi, jabatan struktural, dan nomor induk aparat.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Aparatur</span>
        </button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Tabel Aparatur */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16">
            <LoadingSpinner text="Memuat data aparatur desa..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3.5">Foto</th>
                  <th className="p-3.5">Nama Aparatur</th>
                  <th className="p-3.5">Jabatan</th>
                  <th className="p-3.5">NIAP / NIP</th>
                  <th className="p-3.5 text-center">Urutan</th>
                  <th className="p-3.5 text-center">Status</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {aparaturList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="w-10 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={getAssetUrl(item.foto || 'assets/aparatur/KEPALA DESA.png')}
                          alt=""
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{item.nama}</td>
                    <td className="p-3.5 font-semibold text-emerald-800">{item.jabatan}</td>
                    <td className="p-3.5 text-slate-500 font-mono">{item.niap_nip || '-'}</td>
                    <td className="p-3.5 text-center font-mono">{item.urutan}</td>
                    <td className="p-3.5 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {item.status}
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
                          onClick={() => handleDelete(item.id, item.nama)}
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

      {/* MODAL TAMBAH / EDIT APARATUR */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 bg-slate-900 text-white">
              <div>
                <h3 className="text-lg font-bold">
                  {isEditing ? 'Edit Data Aparatur' : 'Tambah Aparatur Baru'}
                </h3>
                <p className="text-xs text-slate-400">Data perangkat desa dan foto resmi</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    required
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    placeholder="Contoh: H. Suwardi, S.Sos."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jabatan Struktural</label>
                  <input
                    type="text"
                    required
                    value={form.jabatan}
                    onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
                    placeholder="Contoh: Kepala Desa / Kaur Keuangan"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nomor Induk (NIAP/NIP)</label>
                  <input
                    type="text"
                    value={form.niap_nip}
                    onChange={(e) => setForm({ ...form, niap_nip: e.target.value })}
                    placeholder="Nomor Induk Aparatur..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none font-mono"
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

              {/* Foto Aparatur */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Path / URL Foto</label>
                <input
                  type="text"
                  value={form.foto}
                  onChange={(e) => setForm({ ...form, foto: e.target.value })}
                  placeholder="assets/aparatur/KEPALA DESA.png"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />

                <span className="block text-[11px] text-slate-400 mt-2 font-medium">
                  Pilih Cepat Foto Bawaan dari Folder Assets:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5 max-h-24 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {availablePhotos.map((photo) => (
                    <button
                      key={photo}
                      type="button"
                      onClick={() => setForm({ ...form, foto: photo })}
                      className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors ${
                        form.foto === photo ? 'bg-emerald-700 text-white font-bold' : 'bg-white border text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {photo.replace('assets/aparatur/', '')}
                    </button>
                  ))}
                </div>
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
                  {submitting ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Aparatur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
