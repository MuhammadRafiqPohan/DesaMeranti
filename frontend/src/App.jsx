import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Beranda from './pages/public/Beranda';
import Sejarah from './pages/public/Sejarah';
import VisiMisi from './pages/public/VisiMisi';
import Wilayah from './pages/public/Wilayah';
import Demografi from './pages/public/Demografi';
import Fasilitas from './pages/public/Fasilitas';
import StrukturOrganisasi from './pages/public/StrukturOrganisasi';
import AparaturDesa from './pages/public/AparaturDesa';
import LembagaDesa from './pages/public/LembagaDesa';
import ProsedurSurat from './pages/public/ProsedurSurat';
import Berita from './pages/public/Berita';
import BeritaDetail from './pages/public/BeritaDetail';
import Pengumuman from './pages/public/Pengumuman';
import Agenda from './pages/public/Agenda';
import ApbDes from './pages/public/ApbDes';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import KelolaKeuangan from './pages/admin/KelolaKeuangan';
import KelolaPostingan from './pages/admin/KelolaPostingan';
import KelolaDemografi from './pages/admin/KelolaDemografi';
import KelolaSambutan from './pages/admin/KelolaSambutan';
import KelolaVisiMisi from './pages/admin/KelolaVisiMisi';
import KelolaStruktur from './pages/admin/KelolaStruktur';
import KelolaLembaga from './pages/admin/KelolaLembaga';
import KelolaAparatur from './pages/admin/KelolaAparatur';
import KelolaFasilitas from './pages/admin/KelolaFasilitas';
import KelolaLayananSurat from './pages/admin/KelolaLayananSurat';
import KelolaHalamanEdit from './pages/admin/KelolaHalamanEdit';
import KelolaAkun from './pages/admin/KelolaAkun';

export default function App() {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Beranda />} />
        <Route path="sejarah" element={<Sejarah />} />
        <Route path="visi-misi" element={<VisiMisi />} />
        <Route path="wilayah" element={<Wilayah />} />
        <Route path="demografi" element={<Demografi />} />
        <Route path="fasilitas" element={<Fasilitas />} />
        <Route path="struktur-organisasi" element={<StrukturOrganisasi />} />
        <Route path="aparatur-desa" element={<AparaturDesa />} />
        <Route path="lembaga-desa" element={<LembagaDesa />} />
        <Route path="prosedur-surat" element={<ProsedurSurat />} />
        <Route path="berita" element={<Berita />} />
        <Route path="berita/:slug" element={<BeritaDetail />} />
        <Route path="pengumuman" element={<Pengumuman />} />
        <Route path="agenda" element={<Agenda />} />
        <Route path="apb-nagari" element={<ApbDes />} />
      </Route>

      {/* 2. ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 3. PROTECTED ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="keuangan" element={<KelolaKeuangan />} />
        <Route path="postingan" element={<KelolaPostingan />} />
        <Route path="demografi" element={<KelolaDemografi />} />
        <Route path="sambutan" element={<KelolaSambutan />} />
        <Route path="visimisi" element={<KelolaVisiMisi />} />
        <Route path="struktur" element={<KelolaStruktur />} />
        <Route path="lembaga" element={<KelolaLembaga />} />
        <Route path="aparatur" element={<KelolaAparatur />} />
        <Route path="fasilitas" element={<KelolaFasilitas />} />
        <Route path="layanan-surat" element={<KelolaLayananSurat />} />
        <Route path="halaman-edit" element={<KelolaHalamanEdit />} />
        <Route path="akun" element={<KelolaAkun />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
