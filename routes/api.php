<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PublicController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/beranda', [PublicController::class, 'beranda']);
Route::get('/profil/visi-misi', [PublicController::class, 'visimisi']);
Route::get('/profil/sejarah', [PublicController::class, 'sejarah']);
Route::get('/profil/wilayah', [PublicController::class, 'wilayah']);
Route::get('/profil/struktur', [PublicController::class, 'struktur']);
Route::get('/demografi', [PublicController::class, 'demografi']);
Route::get('/aparatur', [PublicController::class, 'aparatur']);
Route::get('/lembaga', [PublicController::class, 'lembaga']);
Route::get('/fasilitas', [PublicController::class, 'fasilitas']);
Route::get('/layanan-surat', [PublicController::class, 'layananSurat']);
Route::get('/postingan', [PublicController::class, 'postingan']);
Route::get('/postingan/{slug}', [PublicController::class, 'postinganDetail']);
Route::get('/apbdes', [PublicController::class, 'apbdes']);

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware('api.auth')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/admin/change-password', [AuthController::class, 'changePassword']);

    // Dashboard
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);

    // Kelola Keuangan / APBDes
    Route::get('/admin/keuangan', [AdminController::class, 'getKeuangan']);
    Route::post('/admin/keuangan', [AdminController::class, 'storeKeuangan']);
    Route::put('/admin/keuangan/{id}', [AdminController::class, 'updateKeuangan']);
    Route::delete('/admin/keuangan/{id}', [AdminController::class, 'destroyKeuangan']);
    Route::get('/admin/bidang-belanja', [AdminController::class, 'getBidangBelanja']);

    // Kelola Postingan
    Route::get('/admin/postingan', [AdminController::class, 'getPostingan']);
    Route::post('/admin/postingan', [AdminController::class, 'storePostingan']);
    Route::put('/admin/postingan/{id}', [AdminController::class, 'updatePostingan']);
    Route::delete('/admin/postingan/{id}', [AdminController::class, 'destroyPostingan']);

    // Kelola Demografi
    Route::get('/admin/demografi', [AdminController::class, 'getDemografi']);
    Route::put('/admin/demografi', [AdminController::class, 'updateDemografi']);

    // Kelola Sambutan
    Route::get('/admin/sambutan', [AdminController::class, 'getSambutan']);
    Route::put('/admin/sambutan', [AdminController::class, 'updateSambutan']);

    // Kelola Halaman Profil
    Route::get('/admin/halaman/{key}', [AdminController::class, 'getHalaman']);
    Route::put('/admin/halaman/{key}', [AdminController::class, 'updateHalaman']);

    // Kelola Aparatur
    Route::get('/admin/aparatur', [AdminController::class, 'getAparatur']);
    Route::post('/admin/aparatur', [AdminController::class, 'storeAparatur']);
    Route::put('/admin/aparatur/{id}', [AdminController::class, 'updateAparatur']);
    Route::delete('/admin/aparatur/{id}', [AdminController::class, 'destroyAparatur']);

    // Kelola Lembaga
    Route::get('/admin/lembaga', [AdminController::class, 'getLembaga']);
    Route::post('/admin/lembaga', [AdminController::class, 'storeLembaga']);
    Route::put('/admin/lembaga/{id}', [AdminController::class, 'updateLembaga']);
    Route::delete('/admin/lembaga/{id}', [AdminController::class, 'destroyLembaga']);

    // Kelola Fasilitas
    Route::get('/admin/fasilitas', [AdminController::class, 'getFasilitas']);
    Route::post('/admin/fasilitas', [AdminController::class, 'storeFasilitas']);
    Route::put('/admin/fasilitas/{id}', [AdminController::class, 'updateFasilitas']);
    Route::delete('/admin/fasilitas/{id}', [AdminController::class, 'destroyFasilitas']);

    // Kelola Layanan Surat
    Route::get('/admin/layanan-surat', [AdminController::class, 'getLayananSurat']);
    Route::post('/admin/layanan-surat', [AdminController::class, 'storeLayananSurat']);
    Route::put('/admin/layanan-surat/{id}', [AdminController::class, 'updateLayananSurat']);
    Route::delete('/admin/layanan-surat/{id}', [AdminController::class, 'destroyLayananSurat']);

    // Upload
    Route::post('/admin/upload', [AdminController::class, 'upload']);
});
