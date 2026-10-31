import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Kolom 1: Profil Singkat */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/logo-desa.png" alt="Logo Desa Meranti" className="w-12 h-12 object-contain" />
              <div>
                <span className="block text-xs uppercase tracking-wider text-emerald-400 font-bold">Pemerintah Desa</span>
                <span className="text-xl font-bold text-white tracking-tight">DESA MERANTI</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Website resmi Pemerintah Desa Meranti sebagai sarana transparansi informasi publik, akuntabilitas pengelolaan anggaran, dan kemudahan pelayanan administrasi masyarakat.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Portal Terverifikasi Pemerintah Desa</span>
            </div>
          </div>

          {/* Kolom 2: Tautan Pintas */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-l-4 border-emerald-500 pl-3">Tautan Cepat</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/sejarah" className="hover:text-emerald-400 transition-colors">Sejarah & Asal Usul Desa</Link></li>
              <li><Link to="/visi-misi" className="hover:text-emerald-400 transition-colors">Visi dan Misi Desa</Link></li>
              <li><Link to="/struktur-organisasi" className="hover:text-emerald-400 transition-colors">Struktur Organisasi</Link></li>
              <li><Link to="/aparatur-desa" className="hover:text-emerald-400 transition-colors">Aparatur Pemerintah Desa</Link></li>
              <li><Link to="/demografi" className="hover:text-emerald-400 transition-colors">Statistik Demografi Penduduk</Link></li>
              <li><Link to="/apb-nagari" className="hover:text-emerald-400 transition-colors font-semibold text-emerald-400">Transparansi APBDes</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Warga */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-l-4 border-emerald-500 pl-3">Layanan Warga</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/prosedur-surat" className="hover:text-emerald-400 transition-colors">Surat Keterangan Usaha (SKU)</Link></li>
              <li><Link to="/prosedur-surat" className="hover:text-emerald-400 transition-colors">Surat Keterangan Domisili</Link></li>
              <li><Link to="/prosedur-surat" className="hover:text-emerald-400 transition-colors">Surat Keterangan Tidak Mampu (SKTM)</Link></li>
              <li><Link to="/prosedur-surat" className="hover:text-emerald-400 transition-colors">Surat Pengantar SKCK</Link></li>
              <li><Link to="/berita" className="hover:text-emerald-400 transition-colors">Kabar & Berita Desa</Link></li>
              <li><Link to="/pengumuman" className="hover:text-emerald-400 transition-colors">Pengumuman Resmi</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Kontak & Kantor */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-l-4 border-emerald-500 pl-3">Kontak & Lokasi</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Raya Meranti No. 01, Dusun I, Desa Meranti, Kec. Pasaman</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(0753) 654-321 / +62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>kontak@desameranti.id</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Jam Operasional Pelayanan:</span>
                  <span className="text-xs text-slate-400">Senin - Kamis: 08.00 - 15.30 WIB</span>
                  <br />
                  <span className="text-xs text-slate-400">Jumat: 08.00 - 15.00 WIB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Pemerintah Desa Meranti. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="hover:text-emerald-400 transition-colors">Login Admin</Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              Dibangun dengan <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> untuk Kemajuan Desa
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
