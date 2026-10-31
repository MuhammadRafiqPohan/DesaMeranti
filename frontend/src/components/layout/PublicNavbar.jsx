import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Landmark, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Bar Informasi */}
      <div className="bg-emerald-800 text-emerald-50 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span>🏛️ Portal Resmi Pemerintah Desa Meranti</span>
            <span>📍 Kec. Pasaman, Kab. Pasaman Barat</span>
            <span>🕒 Pelayanan: Senin - Jumat (08.00 - 15.30 WIB)</span>
          </div>
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <Link to="/admin/dashboard" className="inline-flex items-center space-x-1 text-emerald-200 hover:text-white font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Panel Admin</span>
              </Link>
            ) : (
              <Link to="/admin/login" className="text-emerald-200 hover:text-white transition-colors">
                Login Petugas
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Nama Desa */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/logo-desa.png"
              alt="Logo Desa Meranti"
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform drop-shadow"
            />
            <div>
              <span className="block text-xs uppercase tracking-widest text-emerald-700 font-bold">Pemerintah Desa</span>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                DESA MERANTI
              </span>
              <span className="block text-[11px] text-slate-500 font-medium">Mandiri • Maju • Sejahtera</span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-semibold text-slate-700">
            {/* Beranda */}
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'text-emerald-700 bg-emerald-50 font-bold' : 'hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              Beranda
            </Link>

            {/* Profil Desa Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg transition-colors group-hover:text-emerald-700 group-hover:bg-slate-50 ${
                  ['/sejarah', '/visi-misi', '/wilayah', '/demografi', '/fasilitas'].includes(location.pathname)
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : ''
                }`}
              >
                <span>Profil Desa</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/sejarah" className="block px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
                  Sejarah Desa
                </Link>
                <Link to="/visi-misi" className="block px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
                  Visi dan Misi
                </Link>
                <Link to="/wilayah" className="block px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
                  Wilayah & Peta Desa
                </Link>
                <Link to="/demografi" className="block px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
                  Demografi Penduduk
                </Link>
                <Link to="/fasilitas" className="block px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
                  Fasilitas Desa
                </Link>
              </div>
            </div>

            {/* Pemerintahan Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg transition-colors group-hover:text-emerald-700 group-hover:bg-slate-50 ${
                  ['/struktur-organisasi', '/aparatur-desa', '/lembaga-desa'].includes(location.pathname)
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : ''
                }`}
              >
                <span>Pemerintahan</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/struktur-organisasi" className="block px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
                  Struktur Organisasi
                </Link>
                <Link to="/aparatur-desa" className="block px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
                  Aparatur Desa
                </Link>
                <Link to="/lembaga-desa" className="block px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
                  Lembaga Desa
                </Link>
              </div>
            </div>

            {/* Administrasi */}
            <Link
              to="/prosedur-surat"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                isActive('/prosedur-surat') ? 'text-emerald-700 bg-emerald-50 font-bold' : 'hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              Administrasi
            </Link>

            {/* Informasi & Berita Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg transition-colors group-hover:text-emerald-700 group-hover:bg-slate-50 ${
                  ['/berita', '/pengumuman', '/agenda'].includes(location.pathname)
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : ''
                }`}
              >
                <span>Informasi & Berita</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/berita" className="block px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
                  Berita Desa
                </Link>
                <Link to="/pengumuman" className="block px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
                  Pengumuman
                </Link>
                <Link to="/agenda" className="block px-4 py-2.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
                  Agenda Kegiatan
                </Link>
              </div>
            </div>

            {/* Transparansi Anggaran */}
            <Link
              to="/apb-nagari"
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                isActive('/apb-nagari')
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-200'
                  : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              Transparansi Anggaran
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-700 rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Beranda
          </Link>

          {/* Mobile Profil Desa */}
          <div>
            <button
              onClick={() => toggleDropdown('profil')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-emerald-50"
            >
              <span>Profil Desa</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'profil' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'profil' && (
              <div className="pl-6 space-y-1 py-1">
                <Link to="/sejarah" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-600 hover:text-emerald-700">Sejarah Desa</Link>
                <Link to="/visi-misi" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-600 hover:text-emerald-700">Visi dan Misi</Link>
                <Link to="/wilayah" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-600 hover:text-emerald-700">Wilayah & Peta Desa</Link>
                <Link to="/demografi" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-600 hover:text-emerald-700">Demografi Penduduk</Link>
                <Link to="/fasilitas" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-600 hover:text-emerald-700">Fasilitas Desa</Link>
              </div>
            )}
          </div>

          {/* Mobile Pemerintahan */}
          <div>
            <button
              onClick={() => toggleDropdown('pemerintahan')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-emerald-50"
            >
              <span>Pemerintahan</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'pemerintahan' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'pemerintahan' && (
              <div className="pl-6 space-y-1 py-1">
                <Link to="/struktur-organisasi" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-600 hover:text-emerald-700">Struktur Organisasi</Link>
                <Link to="/aparatur-desa" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-600 hover:text-emerald-700">Aparatur Desa</Link>
                <Link to="/lembaga-desa" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-600 hover:text-emerald-700">Lembaga Desa</Link>
              </div>
            )}
          </div>

          <Link
            to="/prosedur-surat"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Administrasi
          </Link>

          {/* Mobile Informasi & Berita */}
          <div>
            <button
              onClick={() => toggleDropdown('informasi')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-emerald-50"
            >
              <span>Informasi & Berita</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'informasi' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'informasi' && (
              <div className="pl-6 space-y-1 py-1">
                <Link to="/berita" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-600 hover:text-emerald-700">Berita Desa</Link>
                <Link to="/pengumuman" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-600 hover:text-emerald-700">Pengumuman</Link>
                <Link to="/agenda" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-600 hover:text-emerald-700">Agenda Kegiatan</Link>
              </div>
            )}
          </div>

          <Link
            to="/apb-nagari"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-center font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow"
          >
            Transparansi Anggaran (APBDes)
          </Link>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-center">
            {isAuthenticated ? (
              <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-emerald-700">
                Masuk ke Panel Admin
              </Link>
            ) : (
              <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)} className="text-sm text-slate-500 hover:text-slate-800">
                Login Petugas Desa
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
