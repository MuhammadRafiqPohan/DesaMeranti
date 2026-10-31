<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes (Single Page Application Fallback)
|--------------------------------------------------------------------------
*/
Route::get('/{any?}', function () {
    $indexPath = base_path('frontend/dist/index.html');
    if (file_exists($indexPath)) {
        return response()->file($indexPath);
    }

    return response()->json([
        'app' => 'Desa Meranti - REST API Backend',
        'status' => 'OK',
        'frontend_dev_server' => 'http://localhost:5173',
    ]);
})->where('any', '^(?!api|assets|client-assets).*$');
