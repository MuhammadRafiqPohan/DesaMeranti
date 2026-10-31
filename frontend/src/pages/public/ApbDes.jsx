import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  Calendar,
  Layers,
  Printer,
  ChevronDown,
  ChevronUp,
  PieChart,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import api, { formatRupiah } from '../../api/client';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function ApbDes() {
  const [data, setData] = useState(null);
  const [selectedTahun, setSelectedTahun] = useState(2026);
  const [activeTab, setActiveTab] = useState('belanja'); // 'belanja', 'pendapatan', 'pembiayaan'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApbdes = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/apbdes?tahun=${selectedTahun}`);
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching apbdes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApbdes();
  }, [selectedTahun]);

  if (loading && !data) return <LoadingSpinner text="Memuat laporan transparansi APBDes..." />;

  const {
    tahun = 2026,
    tahun_list = [2026],
    summary = {},
    sumber_dana = {},
    pendapatan = [],
    belanja = [],
    belanja_per_bidang = [],
    pembiayaan = [],
  } = data || {};

  const totalPendapatan = summary.total_pendapatan || 0;
  const totalBelanja = summary.total_belanja || 0;
  const surplusDefisit = summary.surplus_defisit || 0;
  const totalPembiayaan = summary.total_pembiayaan || 0;

  // Total 6 Sumber Dana
  const totalDanaMasuk = Object.values(sumber_dana).reduce((a, b) => a + Number(b), 0);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header & Filter Tahun */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold block mb-2">
            Akuntabilitas Publik
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparansi APBDes Tahun Anggaran {tahun}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
            Laporan terbuka rincian Anggaran Pendapatan dan Belanja Desa (APBDes) Desa Meranti sesuai prinsip akuntabilitas dan keterbukaan informasi publik.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-600">Pilih Tahun:</span>
            <select
              value={selectedTahun}
              onChange={(e) => setSelectedTahun(Number(e.target.value))}
              className="bg-transparent font-bold text-slate-800 text-sm focus:outline-none cursor-pointer"
            >
              {tahun_list.map((th) => (
                <option key={th} value={th}>
                  {th}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm print:hidden"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak APBDes</span>
          </button>
        </div>
      </div>

      {/* Ringkasan Keuangan Utama (Summary Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pendapatan */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Total Pendapatan</span>
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {formatRupiah(totalPendapatan)}
            </p>
          </div>
          <p className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
            Sumber: DD, ADD, PADes, Bagi Pajak & Bantuan Keuangan
          </p>
        </div>

        {/* Belanja */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Total Belanja</span>
              <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {formatRupiah(totalBelanja)}
            </p>
          </div>
          <p className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
            Digunakan untuk pembangunan fisik, gaji, pembinaan & BLT
          </p>
        </div>

        {/* Surplus / Defisit */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Surplus / (Defisit)</span>
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <p className={`text-2xl sm:text-3xl font-extrabold leading-tight ${surplusDefisit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {formatRupiah(surplusDefisit)}
            </p>
          </div>
          <p className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
            Selisih Pendapatan dikurangi Belanja Desa
          </p>
        </div>

        {/* Pembiayaan */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Pembiayaan Netto</span>
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {formatRupiah(totalPembiayaan)}
            </p>
          </div>
          <p className="text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
            Penyertaan Modal Desa pada BUMDes
          </p>
        </div>
      </div>

      {/* 6 SUMBER DANA RINCI */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Rekapitulasi 6 Sumber Pendanaan Desa</h2>
            <p className="text-xs text-slate-500">Distribusi sumber keuangan yang dikelola dalam APBDes {tahun}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Dana Desa */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500 block">1. Dana Desa (DD)</span>
            <p className="text-xl font-extrabold text-emerald-800">{formatRupiah(sumber_dana.dana_desa)}</p>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-2 rounded-full"
                style={{ width: `${totalDanaMasuk > 0 ? (sumber_dana.dana_desa / totalDanaMasuk) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400">Transfer APBN Pemerintah Pusat</span>
          </div>

          {/* 2. Alokasi Dana Desa */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500 block">2. Alokasi Dana Desa (ADD)</span>
            <p className="text-xl font-extrabold text-blue-800">{formatRupiah(sumber_dana.alokasi_dana_desa)}</p>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${totalDanaMasuk > 0 ? (sumber_dana.alokasi_dana_desa / totalDanaMasuk) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400">Alokasi Pemerintah Kabupaten</span>
          </div>

          {/* 3. PADes / Fades */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500 block">3. Pendapatan Asli Desa (PADes / Fades)</span>
            <p className="text-xl font-extrabold text-amber-800">{formatRupiah(sumber_dana.fades_dll)}</p>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-600 h-2 rounded-full"
                style={{ width: `${totalDanaMasuk > 0 ? (sumber_dana.fades_dll / totalDanaMasuk) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400">Hasil Aset, Usaha & Swadaya Desa</span>
          </div>

          {/* 4. Retribusi Pajak */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500 block">4. Bagi Hasil Retribusi & Pajak</span>
            <p className="text-xl font-extrabold text-purple-800">{formatRupiah(sumber_dana.retribusi_pajak)}</p>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${totalDanaMasuk > 0 ? (sumber_dana.retribusi_pajak / totalDanaMasuk) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400">Bagi Hasil Pajak Daerah Kabupaten</span>
          </div>

          {/* 5. Bantuan Provinsi */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500 block">5. Bantuan Keuangan Provinsi</span>
            <p className="text-xl font-extrabold text-teal-800">{formatRupiah(sumber_dana.bantuan_provinsi)}</p>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-teal-600 h-2 rounded-full"
                style={{ width: `${totalDanaMasuk > 0 ? (sumber_dana.bantuan_provinsi / totalDanaMasuk) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400">Bantuan Khusus Pemprov</span>
          </div>

          {/* 6. Bantuan Kab/Kota */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-500 block">6. Bantuan Keuangan Kab/Kota</span>
            <p className="text-xl font-extrabold text-rose-800">{formatRupiah(sumber_dana.bantuan_kabkota)}</p>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-rose-600 h-2 rounded-full"
                style={{ width: `${totalDanaMasuk > 0 ? (sumber_dana.bantuan_kabkota / totalDanaMasuk) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400">Bantuan Keuangan Khusus Pemkab</span>
          </div>
        </div>
      </div>

      {/* TAB RINCIAN KEGIATAN */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-600" />
            <h3 className="text-2xl font-bold text-slate-900">Rincian Anggaran Belanja & Pendapatan</h3>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('belanja')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'belanja' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Belanja Desa ({belanja.length})
            </button>
            <button
              onClick={() => setActiveTab('pendapatan')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'pendapatan' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pendapatan ({pendapatan.length})
            </button>
            <button
              onClick={() => setActiveTab('pembiayaan')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'pembiayaan' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pembiayaan ({pembiayaan.length})
            </button>
          </div>
        </div>

        {/* 1. TAB BELANJA (Grouped per Bidang) */}
        {activeTab === 'belanja' && (
          <div className="space-y-8">
            {belanja_per_bidang.map((grup, gIdx) => (
              <div key={gIdx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-emerald-800 text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold">
                      {gIdx + 1}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base">{grup.bidang}</h4>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold bg-emerald-950/60 px-3 py-1 rounded-xl">
                    Total: {formatRupiah(grup.total)}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
                      <tr>
                        <th className="p-3.5">Nama Kegiatan</th>
                        <th className="p-3.5 text-right">Dana Desa</th>
                        <th className="p-3.5 text-right">ADD</th>
                        <th className="p-3.5 text-right">PADes/Lain</th>
                        <th className="p-3.5 text-right">Bagi Pajak</th>
                        <th className="p-3.5 text-right">Bant. Prov</th>
                        <th className="p-3.5 text-right">Bant. Kab</th>
                        <th className="p-3.5 text-right font-bold text-slate-800">Total Anggaran</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {grup.items.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-medium text-slate-900 max-w-xs">{item.kegiatan}</td>
                          <td className="p-3.5 text-right">{item.dana_desa > 0 ? formatRupiah(item.dana_desa) : '-'}</td>
                          <td className="p-3.5 text-right">{item.alokasi_dana_desa > 0 ? formatRupiah(item.alokasi_dana_desa) : '-'}</td>
                          <td className="p-3.5 text-right">{item.fades_dll > 0 ? formatRupiah(item.fades_dll) : '-'}</td>
                          <td className="p-3.5 text-right">{item.retribusi_pajak > 0 ? formatRupiah(item.retribusi_pajak) : '-'}</td>
                          <td className="p-3.5 text-right">{item.bantuan_provinsi > 0 ? formatRupiah(item.bantuan_provinsi) : '-'}</td>
                          <td className="p-3.5 text-right">{item.bantuan_kabkota > 0 ? formatRupiah(item.bantuan_kabkota) : '-'}</td>
                          <td className="p-3.5 text-right font-extrabold text-emerald-800">{formatRupiah(item.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. TAB PENDAPATAN */}
        {activeTab === 'pendapatan' && (
          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
                <tr>
                  <th className="p-3.5">Uraian Sumber Pendapatan</th>
                  <th className="p-3.5 text-right">Dana Desa</th>
                  <th className="p-3.5 text-right">ADD</th>
                  <th className="p-3.5 text-right">PADes/Fades</th>
                  <th className="p-3.5 text-right">Bagi Pajak</th>
                  <th className="p-3.5 text-right">Bantuan Prov</th>
                  <th className="p-3.5 text-right">Bantuan Kab</th>
                  <th className="p-3.5 text-right font-bold text-slate-800">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {pendapatan.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-medium text-slate-900">{item.kegiatan}</td>
                    <td className="p-3.5 text-right">{item.dana_desa > 0 ? formatRupiah(item.dana_desa) : '-'}</td>
                    <td className="p-3.5 text-right">{item.alokasi_dana_desa > 0 ? formatRupiah(item.alokasi_dana_desa) : '-'}</td>
                    <td className="p-3.5 text-right">{item.fades_dll > 0 ? formatRupiah(item.fades_dll) : '-'}</td>
                    <td className="p-3.5 text-right">{item.retribusi_pajak > 0 ? formatRupiah(item.retribusi_pajak) : '-'}</td>
                    <td className="p-3.5 text-right">{item.bantuan_provinsi > 0 ? formatRupiah(item.bantuan_provinsi) : '-'}</td>
                    <td className="p-3.5 text-right">{item.bantuan_kabkota > 0 ? formatRupiah(item.bantuan_kabkota) : '-'}</td>
                    <td className="p-3.5 text-right font-extrabold text-emerald-800">{formatRupiah(item.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-emerald-50/80 font-extrabold text-slate-900 border-t border-slate-200">
                <tr>
                  <td className="p-4 uppercase text-xs">Total Pendapatan Desa</td>
                  <td className="p-4 text-right" colSpan={7}>{formatRupiah(totalPendapatan)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* 3. TAB PEMBIAYAAN */}
        {activeTab === 'pembiayaan' && (
          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
                <tr>
                  <th className="p-3.5">Uraian Pembiayaan</th>
                  <th className="p-3.5 text-right">Sumber Dana</th>
                  <th className="p-3.5 text-right font-bold text-slate-800">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {pembiayaan.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-medium text-slate-900">{item.kegiatan}</td>
                    <td className="p-3.5 text-right">
                      {item.dana_desa > 0 && 'Dana Desa'}
                      {item.alokasi_dana_desa > 0 && 'ADD'}
                      {item.fades_dll > 0 && 'PADes / Fades'}
                      {item.retribusi_pajak > 0 && 'Bagi Pajak'}
                      {item.bantuan_provinsi > 0 && 'Bantuan Provinsi'}
                      {item.bantuan_kabkota > 0 && 'Bantuan Kab'}
                    </td>
                    <td className="p-3.5 text-right font-extrabold text-emerald-800">{formatRupiah(item.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-amber-50/80 font-extrabold text-slate-900 border-t border-slate-200">
                <tr>
                  <td className="p-4 uppercase text-xs">Total Pengeluaran Pembiayaan</td>
                  <td className="p-4 text-right" colSpan={2}>{formatRupiah(totalPembiayaan)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
