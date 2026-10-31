import React, { useEffect, useState } from 'react';
import { Users, Save, CheckCircle2, Home, UserCheck, ShieldCheck } from 'lucide-react';
import api from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';

export default function KelolaDemografi() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchDemografi = async () => {
      try {
        const res = await api.get('/admin/demografi');
        if (res.data.success && res.data.data) {
          setForm(res.data.data);
        } else {
          setForm({
            tahun: 2026,
            total_penduduk: 2845,
            total_kk: 820,
            total_laki_laki: 1435,
            total_perempuan: 1410,
            data_dusun: [
              { nama: 'Dusun I (Meranti Hulu)', jumlah_jiwa: 1450, jumlah_kk: 420, rt: 4 },
              { nama: 'Dusun II (Meranti Hilir)', jumlah_jiwa: 1395, jumlah_kk: 400, rt: 4 },
            ],
            data_pekerjaan: [],
            data_pendidikan: [],
            data_usia: [],
            data_agama: [],
          });
        }
      } catch (err) {
        setAlert({ type: 'error', message: 'Gagal memuat data demografi.' });
      } finally {
        setLoading(false);
      }
    };

    fetchDemografi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await api.put('/admin/demografi', form);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Data demografi berhasil diperbarui.' });
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

  if (loading) return <LoadingSpinner text="Memuat data demografi..." />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block mb-1">
            Kelola Konten Desa
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" />
            <span>Kelola Data Demografi Penduduk</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Perbarui angka statistik kependudukan, jumlah KK, dan sebaran per dusun.
          </p>
        </div>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Angka Kependudukan Utama */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Parameter Pokok Kependudukan
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tahun Data</label>
              <input
                type="number"
                required
                value={form.tahun}
                onChange={(e) => setForm({ ...form, tahun: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Total Penduduk (Jiwa)</label>
              <input
                type="number"
                required
                value={form.total_penduduk}
                onChange={(e) => setForm({ ...form, total_penduduk: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Total Kepala Keluarga (KK)</label>
              <input
                type="number"
                required
                value={form.total_kk}
                onChange={(e) => setForm({ ...form, total_kk: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jumlah Laki-Laki (Jiwa)</label>
              <input
                type="number"
                required
                value={form.total_laki_laki}
                onChange={(e) => setForm({ ...form, total_laki_laki: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jumlah Perempuan (Jiwa)</label>
              <input
                type="number"
                required
                value={form.total_perempuan}
                onChange={(e) => setForm({ ...form, total_perempuan: Number(e.target.value) })}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Card Sebaran Dusun */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Sebaran Data Per Dusun
          </h3>

          <div className="space-y-4">
            {form.data_dusun?.map((dusun, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-600 mb-1">Nama Dusun</label>
                  <input
                    type="text"
                    value={dusun.nama}
                    onChange={(e) => {
                      const updated = [...form.data_dusun];
                      updated[idx].nama = e.target.value;
                      setForm({ ...form, data_dusun: updated });
                    }}
                    className="w-full p-2 rounded-lg border border-slate-200 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Jumlah Jiwa</label>
                  <input
                    type="number"
                    value={dusun.jumlah_jiwa}
                    onChange={(e) => {
                      const updated = [...form.data_dusun];
                      updated[idx].jumlah_jiwa = Number(e.target.value);
                      setForm({ ...form, data_dusun: updated });
                    }}
                    className="w-full p-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Jumlah KK</label>
                  <input
                    type="number"
                    value={dusun.jumlah_kk}
                    onChange={(e) => {
                      const updated = [...form.data_dusun];
                      updated[idx].jumlah_kk = Number(e.target.value);
                      setForm({ ...form, data_dusun: updated });
                    }}
                    className="w-full p-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? 'Menyimpan...' : 'Simpan Pembaruan Demografi'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
