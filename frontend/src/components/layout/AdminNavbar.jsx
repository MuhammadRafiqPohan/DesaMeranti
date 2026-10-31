import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  ChevronDown,
  UserCheck,
  Lock,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Layers,
  FolderOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari panel admin?')) {
      await logout();
      navigate('/admin/login');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-900 text-slate-100 border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
              <img src="/assets/logo-desa.png" alt="Logo" className="w-9 h-9 object-contain" />
              <div>
                <span className="text-white font-extrabold text-base tracking-wide flex items-center gap-1.5">
                  PANEL ADMIN
                </span>
                <span className="block text-[10px] text-emerald-400 font-medium uppercase tracking-wider">
                  Desa Meranti
                </span>
              </div>
            </Link>

            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-md transition-colors ml-2"
              title="Buka Website Publik"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 text-sm font-medium">
            {/* Dashboard */}
            <Link
              to="/admin/dashboard"
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                isActive('/admin/dashboard')
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            {/* Kelola Konten Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  ['/admin/postingan', '/admin/demografi', '/admin/keuangan', '/admin/sambutan'].includes(location.pathname)
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                <span>Kelola Konten</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-1 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  to="/admin/postingan"
                  className={`block px-4 py-2 text-xs transition-colors ${
                    isActive('/admin/postingan') ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  Postingan (Berita/Agenda)
                </Link>
                <Link
                  to="/admin/demografi"
                  className={`block px-4 py-2 text-xs transition-colors ${
                    isActive('/admin/demografi') ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  Demografi Penduduk
                </Link>
                <Link
                  to="/admin/keuangan"
                  className={`block px-4 py-2 text-xs transition-colors ${
                    isActive('/admin/keuangan') ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  Anggaran (APBDes)
                </Link>
                <Link
                  to="/admin/sambutan"
                  className={`block px-4 py-2 text-xs transition-colors ${
                    isActive('/admin/sambutan') ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  Sambutan Kepala Desa
                </Link>
              </div>
            </div>

            {/* Kelola Halaman Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  ['/admin/visimisi', '/admin/struktur', '/admin/lembaga', '/admin/aparatur', '/admin/fasilitas', '/admin/layanan-surat', '/admin/halaman-edit'].includes(location.pathname)
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Kelola Halaman</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-1 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/admin/visimisi" className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                  Visi Misi
                </Link>
                <Link to="/admin/struktur" className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                  Struktur Desa
                </Link>
                <Link to="/admin/lembaga" className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                  Lembaga Desa
                </Link>
                <Link to="/admin/aparatur" className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                  Aparatur Desa
                </Link>
                <Link to="/admin/fasilitas" className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                  Fasilitas Desa
                </Link>
                <Link to="/admin/layanan-surat" className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                  Layanan Administrasi Surat
                </Link>
                <Link to="/admin/halaman-edit" className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                  Teks Halaman Lain (Sejarah/Wilayah)
                </Link>
              </div>
            </div>
          </div>

          {/* Right Menu (Akun) */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors text-xs font-semibold">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>{user?.name || 'Administrator'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute right-0 mt-1 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-1.5 text-[11px] text-slate-400 border-b border-slate-800">
                  {user?.email || 'admin@desameranti.id'}
                </div>
                <Link
                  to="/admin/akun"
                  className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Ubah Password</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-slate-800 hover:text-rose-300 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-6 space-y-1 text-sm">
          <Link
            to="/admin/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <div className="pt-2 pb-1 text-xs uppercase tracking-wider text-slate-500 font-bold px-3">
            Kelola Konten
          </div>
          <Link to="/admin/postingan" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs text-slate-300 hover:text-white">Postingan</Link>
          <Link to="/admin/demografi" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs text-slate-300 hover:text-white">Demografi</Link>
          <Link to="/admin/keuangan" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs text-slate-300 hover:text-white">Anggaran APBDes</Link>
          <Link to="/admin/sambutan" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs text-slate-300 hover:text-white">Sambutan</Link>

          <div className="pt-2 pb-1 text-xs uppercase tracking-wider text-slate-500 font-bold px-3">
            Kelola Halaman
          </div>
          <Link to="/admin/visimisi" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs text-slate-300 hover:text-white">Visi Misi</Link>
          <Link to="/admin/struktur" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs text-slate-300 hover:text-white">Struktur Desa</Link>
          <Link to="/admin/lembaga" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs text-slate-300 hover:text-white">Lembaga Desa</Link>
          <Link to="/admin/aparatur" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs text-slate-300 hover:text-white">Aparatur Desa</Link>
          <Link to="/admin/fasilitas" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs text-slate-300 hover:text-white">Fasilitas</Link>
          <Link to="/admin/layanan-surat" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs text-slate-300 hover:text-white">Layanan Administrasi</Link>
          <Link to="/admin/halaman-edit" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-1.5 text-xs text-slate-300 hover:text-white">Teks Halaman Lain</Link>

          <div className="pt-3 border-t border-slate-800">
            <Link to="/admin/akun" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-xs text-slate-300 hover:text-white">Ubah Password</Link>
            <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-xs text-rose-400">Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
}
