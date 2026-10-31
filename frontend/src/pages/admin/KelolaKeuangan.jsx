import React, { useEffect, useState } from 'react';
import {
  Wallet,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  DollarSign
} from 'lucide-react';
import api, { formatRupiah } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function KelolaKeuangan() {
  const [anggaranList, setAnggaranList] = useState([]);
  const [bidangList, setBidangList] = useState([]);
  const [tahunList, setTahunList] = useState([2026]);
  const [filterTahun, setFilterTahun] = useState('2026');
  const [filterKategori, setFilterKategori] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State matching exact fields
  const [form, setForm] = useState({
    tahun: 2026,
    kategori: 'Belanja',
    bidang: '',
    kegiatan: '',
    dana_desa: 0,
    alokasi_dana_desa: 0,
    fades_dll: 0,
    retribusi_pajak: 0,
    bantuan_provinsi: 0,
    bantuan_kabkota: 0,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterTahun) params.append('tahun', filterTahun);
      if (filterKategori) params.append('kategori', filterKategori);

      const res = await api.get(`/admin/keuangan?${params.toString()}`);
      if (res.data.success) {
        setAnggaranList(res.data.data);
        setBidangList(res.data.bidang_list || []);
        if (res.data.tahun_list?.length > 0) {
          setTahunList(res.data.tahun_list);
        }
      }
    } catch (err) {
      setAlert({ type: 'error', message: 'Gagal memuat data anggaran.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterTahun, filterKategori]);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setForm({
      tahun: Number(filterTahun) || 2026,
      kategori: 'Belanja',
      bidang: bidangList[0] || '',
      kegiatan: '',
      dana_desa: 0,
      alokasi_dana_desa: 0,
      fades_dll: 0,
      retribusi_pajak: 0,
      bantuan_provinsi: 0,
      bantuan_kabkota: 0,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setForm({
      tahun: item.tahun,
      kategori: item.kategori,
      bidang: item.bidang || '',
      kegiatan: item.kegiatan,
      dana_desa: Number(item.dana_desa) || 0,
      alokasi_dana_desa: Number(item.alokasi_dana_desa) || 0,
      fades_dll: Number(item.fades_dll) || 0,
      retribusi_pajak: Number(item.retribusi_pajak) || 0,
      bantuan_provinsi: Number(item.bantuan_provinsi) || 0,
      bantuan_kabkota: Number(item.bantuan_kabkota) || 0,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id, nama) => {
    if (window.confirm(`Yakin ingin menghapus item anggaran "${nama}"?`)) {
      try {
        const res = await api.delete(`/admin/keuangan/${id}`);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Data anggaran berhasil dihapus.' });
          fetchData();
        }
      } catch (err) {
        setAlert({ type: 'error', message: 'Gagal menghapus data anggaran.' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditing) {
        const res = await api.put(`/admin/keuangan/${currentId}`, form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Data anggaran berhasil diperbarui.' });
          setModalOpen(false);
          fetchData();
        }
      } else {
        const res = await api.post('/admin/keuangan', form);
        if (res.data.success) {
          setAlert({ type: 'success', message: 'Data anggaran berhasil ditambahkan.' });
          setModalOpen(false);
          fetchData();
        }
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Gagal menyimpan data anggaran.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Hitung total 6 sumber dana secara real-time di form
  const formTotal =
    Number(form.dana_desa || 0) +
    Number(form.alokasi_dana_desa || 0) +
    Number(form.fades_dll || 0) +
    Number(form.retribusi_pajak || 0) +
    Number(form.bantuan_provinsi || 0) +
    Number(form.bantuan_kabkota || 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block mb-1">
            Kelola Konten Desa
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-600" />
            <span>Kelola Anggaran Desa (APBDes)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tambah, edit, dan hapus rincian anggaran 6 sumber dana (DD, ADD, PADes, Bagi Hasil Pajak, Bantuan Provinsi, Bantuan Kab/Kota).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Anggaran Rinci</span>
        </button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Tahun:</span>
          <select
            value={filterTahun}
            onChange={(e) => setFilterTahun(e.target.value)}
            className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-bold"
          >
            {tahunList.map((th) => (
              <option key={th} value={th}>
                {th}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-400" />
          <span>Kategori:</span>
          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-bold"
          >
            <option value="">Semua Kategori</option>
            <option value="Pendapatan">Pendapatan</option>
            <option value="Belanja">Belanja</option>
            <option value="Pembiayaan">Pembiayaan</option>
          </select>
        </div>

        <span className="text-slate-400 ml-auto font-normal">
          Menampilkan {anggaranList.length} data anggaran
        </span>
      </div>

      {/* Tabel Data Anggaran */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16">
            <LoadingSpinner text="Memuat data APBDes..." />
          </div>
        ) : anggaranList.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Belum ada data anggaran untuk kriteria ini. Klik tombol "Tambah Anggaran Rinci" untuk mengisi data.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Bidang</th>
                  <th className="p-3.5">Kegiatan / Uraian</th>
                  <th className="p-3.5 text-right">Dana Desa</th>
                  <th className="p-3.5 text-right">ADD</th>
                  <th className="p-3.5 text-right">PADes</th>
                  <th className="p-3.5 text-right">Retribusi</th>
                  <th className="p-3.5 text-right">Bant. Prov</th>
                  <th className="p-3.5 text-right">Bant. Kab</th>
                  <th className="p-3.5 text-right font-extrabold text-slate-900">Total</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {anggaranList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          item.kategori === 'Pendapatan'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.kategori === 'Belanja'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.kategori}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-500 max-w-[150px] truncate" title={item.bidang}>
                      {item.bidang || '-'}
                    </td>
                    <td className="p-3.5 text-slate-900 font-semibold max-w-xs">{item.kegiatan}</td>
                    <td className="p-3.5 text-right font-mono">{item.dana_desa > 0 ? formatRupiah(item.dana_desa) : '-'}</td>
                    <td className="p-3.5 text-right font-mono">{item.alokasi_dana_desa > 0 ? formatRupiah(item.alokasi_dana_desa) : '-'}</td>
                    <td className="p-3.5 text-right font-mono">{item.fades_dll > 0 ? formatRupiah(item.fades_dll) : '-'}</td>
                    <td className="p-3.5 text-right font-mono">{item.retribusi_pajak > 0 ? formatRupiah(item.retribusi_pajak) : '-'}</td>
                    <td className="p-3.5 text-right font-mono">{item.bantuan_provinsi > 0 ? formatRupiah(item.bantuan_provinsi) : '-'}</td>
                    <td className="p-3.5 text-right font-mono">{item.bantuan_kabkota > 0 ? formatRupiah(item.bantuan_kabkota) : '-'}</td>
                    <td className="p-3.5 text-right font-bold text-emerald-700 font-mono text-sm">
                      {formatRupiah(item.total)}
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
                          onClick={() => handleDelete(item.id, item.kegiatan)}
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

      {/* MODAL FORM TAMBAH / EDIT ANGGARAN RINCI */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 bg-slate-900 text-white">
              <div>
                <h3 className="text-lg font-bold">
                  {isEditing ? 'Edit Anggaran Rinci' : 'Tambah Anggaran Rinci'}
                </h3>
                <p className="text-xs text-slate-400">
                  Formulir rincian APBDes 6 sumber dana desa
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
              {/* Row 1: Tahun & Kategori */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tahun Anggaran</label>
                  <input
                    type="number"
                    required
                    value={form.tahun}
                    onChange={(e) => setForm({ ...form, tahun: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori Anggaran</label>
                  <select
                    value={form.kategori}
                    onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="Belanja">Belanja</option>
                    <option value="Pendapatan">Pendapatan</option>
                    <option value="Pembiayaan">Pembiayaan</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Bidang Belanja (Hanya jika Kategori = 'Belanja') */}
              {form.kategori === 'Belanja' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nama Bidang (Belanja)
                  </label>
                  <input
                    type="text"
                    list="bidang-options"
                    value={form.bidang}
                    onChange={(e) => setForm({ ...form, bidang: e.target.value })}
                    placeholder="Pilih atau ketik nama bidang..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                  <datalist id="bidang-options">
                    {bidangList.map((b, idx) => (
                      <option key={idx} value={b} />
                    ))}
                  </datalist>
                  <p className="text-[11px] text-slate-400 mt-1 italic">
                    * Jika bidang baru diketikkan, sistem akan otomatis mendaftarkannya ke tabel `bidang_belanja`.
                  </p>
                </div>
              )}

              {/* Row 3: Nama Kegiatan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Kegiatan / Uraian Anggaran
                </label>
                <input
                  type="text"
                  required
                  value={form.kegiatan}
                  onChange={(e) => setForm({ ...form, kegiatan: e.target.value })}
                  placeholder="Contoh: Pembangunan Rabat Beton Jalan Lingkungan Dusun I..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              {/* 6 Sumber Dana Input */}
              <div className="pt-2 border-t border-slate-100">
                <span className="block text-xs font-bold uppercase text-emerald-800 mb-3">
                  Nilai 6 Sumber Dana (Rp):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">1. Dana Desa (DD)</label>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={form.dana_desa}
                      onChange={(e) => setForm({ ...form, dana_desa: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg border border-slate-200 font-mono text-right"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">2. Alokasi Dana Desa (ADD)</label>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={form.alokasi_dana_desa}
                      onChange={(e) => setForm({ ...form, alokasi_dana_desa: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg border border-slate-200 font-mono text-right"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">3. PADes / Fades dll</label>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={form.fades_dll}
                      onChange={(e) => setForm({ ...form, fades_dll: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg border border-slate-200 font-mono text-right"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">4. Retribusi / Bagi Pajak</label>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={form.retribusi_pajak}
                      onChange={(e) => setForm({ ...form, retribusi_pajak: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg border border-slate-200 font-mono text-right"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">5. Bantuan Provinsi</label>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={form.bantuan_provinsi}
                      onChange={(e) => setForm({ ...form, bantuan_provinsi: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg border border-slate-200 font-mono text-right"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">6. Bantuan Kab/Kota</label>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={form.bantuan_kabkota}
                      onChange={(e) => setForm({ ...form, bantuan_kabkota: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg border border-slate-200 font-mono text-right"
                    />
                  </div>
                </div>
              </div>

              {/* Total Calculation Badge */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900">Total Akumulasi Sumber Dana:</span>
                <span className="text-base font-extrabold text-emerald-800 font-mono">
                  {formatRupiah(formTotal)}
                </span>
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
                  {submitting ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Anggaran'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
