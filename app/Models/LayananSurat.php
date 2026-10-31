<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LayananSurat extends Model
{
    use HasFactory;

    protected $table = 'layanan_surat';

    protected $fillable = [
        'nama_surat',
        'kode_surat',
        'deskripsi',
        'persyaratan',
        'prosedur',
        'waktu_layanan',
        'biaya',
        'urutan',
    ];

    protected $casts = [
        'persyaratan' => 'array',
        'urutan' => 'integer',
    ];
}
