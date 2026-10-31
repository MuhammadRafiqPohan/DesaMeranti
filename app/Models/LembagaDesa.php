<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LembagaDesa extends Model
{
    use HasFactory;

    protected $table = 'lembaga_desa';

    protected $fillable = [
        'nama_lembaga',
        'singkatan',
        'ketua',
        'deskripsi',
        'tugas_fungsi',
        'foto',
        'urutan',
    ];

    protected $casts = [
        'urutan' => 'integer',
    ];
}
