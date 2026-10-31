import React, { useState } from 'react';
import { Lock, Save, ShieldCheck } from 'lucide-react';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import Alert from '../../components/common/Alert';

export default function KelolaAkun() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (form.new_password !== form.new_password_confirmation) {
      setAlert({ type: 'error', message: 'Konfirmasi password baru tidak cocok.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.put('/admin/change-password', form);
      if (res.data.success) {
        setAlert({ type: 'success', message: 'Password akun berhasil diperbarui! Silakan gunakan password baru pada login berikutnya.' });
        setForm({
          current_password: '',
          new_password: '',
          new_password_confirmation: '',
        });
      }
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.response?.data?.message || 'Gagal mengubah password.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold block mb-1">
          Keamanan Akun Petugas
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Lock className="w-6 h-6 text-emerald-600" />
          <span>Ubah Password Admin</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Perbarui kata sandi akun administrator untuk menjaga keamanan website desa.
        </p>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-2">
          <span className="text-xs text-slate-400 font-medium block">Nama Akun Petugas:</span>
          <span className="text-sm font-bold text-slate-900">{user?.name || 'Administrator'}</span>
          <span className="text-xs text-slate-500 block">{user?.email || 'admin@desameranti.id'}</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Password Saat Ini (Lama)
          </label>
          <input
            type="password"
            required
            value={form.current_password}
            onChange={(e) => setForm({ ...form, current_password: e.target.value })}
            placeholder="Masukkan password lama..."
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Password Baru
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={form.new_password}
            onChange={(e) => setForm({ ...form, new_password: e.target.value })}
            placeholder="Minimal 6 karakter..."
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Ulangi Password Baru
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={form.new_password_confirmation}
            onChange={(e) => setForm({ ...form, new_password_confirmation: e.target.value })}
            placeholder="Ulangi password baru..."
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
            <span>{submitting ? 'Menyimpan...' : 'Perbarui Password'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
