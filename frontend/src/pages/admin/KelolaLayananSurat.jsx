import React, { useEffect, useState } from 'react';
import { FileText, Plus, Edit2, Trash2, X, PlusCircle } from 'lucide-react';
import api from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function KelolaLayananSurat() {
  const [suratList, setSuratList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    nama_surat: '',
    kode_surat: '',
    deskripsi: '',
    persyaratan: ['Fotokopi KTP', 'Fotokopi KK', 'Pengantar RT'],
    prosedur: '',
    waktu_layanan: '15 - 30 Menit',
    biaya: 'Gratis (Rp 0)',
    urutan: 0,
  });

  const fetchSurat = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/layanan-surat');
      if (res.data.success) {
        setSuratList(res.data.data);
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Gagal memuat data layanan surat.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurat();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setForm({
      nama_surat: '',
      kode_surat: '',
      deskripsi: '',
      persyaratan: ['Fotokopi KTP Pemohon', 'Fotokopi Kartu Keluarga', 'Surat Pengantar RT'],
      prosedur: '1. Pemohon membawa berkas ke kantor desa.\n2. Verifikasi oleh petugas.\n3. Penandatanganan Kepala Desa.\n4. Penyerahan surat.',
      waktu_layanan: '15 - 30 Menit',
      biaya: 'Gratis (Rp 0)',
      urutan: suratList.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setForm({
      nama_surat: item.nama_surat,
      kode_surat: item.kode_surat || '',
      deskripsi: item.deskripsi || '',
      persyaratan: Array.isArray(item.persyaratan) ? item.persyaratan : [],
      prosedur: item.prosedur || '',
      waktu_layanan: item.waktu_layanan || '15 - 30 Menit',
      biaya: item.biaya || 'Gratis (Rp 0)',
      urutan: item.urutan || 0,
    });
    setModalOpen(true);
  };

  const handleAddSyarat = () => {
    setForm({ ...form, persyaratan: [...form.persyaratan, ''] });
  };

  const handleRemoveSyarat = (idx) => {
    setForm({ ...form, persyaratan: form.persyaratan.filter((_, i) => i !== idx) });
  };

  const handleSyaratChange = (idx, value) => {
    const updated = [...form.persyaratan];
    updated[idx] = value;
    setForm({ ...form, persyaratan: updated });
  };

  const handleDelete = async (id, nama) => {
    if (window.confirm(`Hapus layanan surat "${nama}"?`)) {
      try {
        const res = await api.delete(`/admin/layanan-surat/${id}`);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Layanan surat berhasil dihapus.' });
          fetchSurat();
        }
      } catch (err) {
        setAlert({ type: 'error', message: 'Gagal menghapus layanan surat.' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditing) {
        const res = await api.put(`/admin/layanan-surat/${currentId}`, form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Layanan surat berhasil diperbarui.' });
          setModalOpen(false);
          fetchSurat();
        }
      } else {
        const res = await api.post('/admin/layanan-surat', form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Layanan surat berhasil ditambahkan.' });
          setModalOpen(false);
          fetchSurat();
        }
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Gagal menyimpan layanan surat.',
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
            <FileText className="w-6 h-6 text-emerald-600" />
            <span>Kelola Layanan Administrasi Surat</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Syarat berkas dan alur prosedur pembuatan surat keterangan warga desa.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan Surat</span>
        </button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Tabel Layanan Surat */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16">
            <LoadingSpinner text="Memuat data layanan surat..." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3.5">Nama Surat</th>
                  <th className="p-3.5">Kode Surat</th>
                  <th className="p-3.5">Waktu Pelayanan</th>
                  <th className="p-3.5">Biaya</th>
                  <th className="p-3.5 text-center">Urutan</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {suratList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div>{item.nama_surat}</div>
                      <span className="text-[11px] text-slate-400 font-normal line-clamp-1">{item.deskripsi}</span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-500">{item.kode_surat || '-'}</td>
                    <td className="p-3.5 text-emerald-800 font-semibold">{item.waktu_layanan}</td>
                    <td className="p-3.5 font-bold text-emerald-700">{item.biaya}</td>
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
                          onClick={() => handleDelete(item.id, item.nama_surat)}
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

      {/* MODAL TAMBAH / EDIT LAYANAN SURAT */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 bg-slate-900 text-white">
              <div>
                <h3 className="text-lg font-bold">
                  {isEditing ? 'Edit Layanan Surat' : 'Tambah Layanan Surat Baru'}
                </h3>
                <p className="text-xs text-slate-400">Persyaratan dan tahapan pengurusan surat</p>
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
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Layanan Surat</label>
                  <input
                    type="text"
                    required
                    value={form.nama_surat}
                    onChange={(e) => setForm({ ...form, nama_surat: e.target.value })}
                    placeholder="Contoh: Surat Keterangan Usaha (SKU)"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kode Surat</label>
                  <input
                    type="text"
                    value={form.kode_surat}
                    onChange={(e) => setForm({ ...form, kode_surat: e.target.value })}
                    placeholder="503/SKU/MRNT"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  placeholder="Penjelasan fungsi surat bagi warga..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              {/* Persyaratan array */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase">Dokumen Persyaratan</label>
                  <button
                    type="button"
                    onClick={handleAddSyarat}
                    className="text-[11px] text-emerald-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Tambah Syarat</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {form.persyaratan.map((syarat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={syarat}
                        onChange={(e) => handleSyaratChange(idx, e.target.value)}
                        placeholder={`Syarat dokumen ke-${idx + 1}...`}
                        className="flex-1 p-2 rounded-lg border border-slate-200 text-xs font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSyarat(idx)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prosedur */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alur / Prosedur Layanan</label>
                <textarea
                  rows={4}
                  value={form.prosedur}
                  onChange={(e) => setForm({ ...form, prosedur: e.target.value })}
                  placeholder="Langkah-langkah pengurusan surat..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estimasi Waktu</label>
                  <input
                    type="text"
                    value={form.waktu_layanan}
                    onChange={(e) => setForm({ ...form, waktu_layanan: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Biaya Retribusi</label>
                  <input
                    type="text"
                    value={form.biaya}
                    onChange={(e) => setForm({ ...form, biaya: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs font-bold text-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nomor Urutan</label>
                  <input
                    type="number"
                    value={form.urutan}
                    onChange={(e) => setForm({ ...form, urutan: Number(e.target.value) })}
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs font-medium"
                  />
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
                  {submitting ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Layanan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
