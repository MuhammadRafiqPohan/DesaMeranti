<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HalamanProfil extends Model
{
    use HasFactory;

    protected $table = 'halaman_profil';

    protected $fillable = [
        'key',
        'judul',
        'konten',
        'gambar',
        'meta',
    ];

    protected $casts = [
        'meta' => 'array',
    ];
}
