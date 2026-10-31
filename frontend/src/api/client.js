import axios from 'axios';

// Gunakan URL API sesuai environment atau fallback ke proxy '/api'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menyertakan Bearer Token ke setiap request jika ada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('desa_meranti_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk menangani response error 401 (Unauthenticated)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Hapus token jika sudah kedaluwarsa atau invalid
      if (localStorage.getItem('desa_meranti_token')) {
        localStorage.removeItem('desa_meranti_token');
        localStorage.removeItem('desa_meranti_user');
        if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Helper function untuk format rupiah
export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number || 0);
};

// Helper function untuk format tanggal Indonesia
export const formatTanggal = (dateString) => {
  if (!dateString) return '-';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Helper function untuk resolving path gambar assets
export const getAssetUrl = (path) => {
  if (!path) return '/assets/logo-desa.png';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return path;
  return `/${path}`;
};

export default api;
