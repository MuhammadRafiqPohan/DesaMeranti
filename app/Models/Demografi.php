<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demografi extends Model
{
    use HasFactory;

    protected $table = 'demografi';

    protected $fillable = [
        'tahun',
        'total_penduduk',
        'total_kk',
        'total_laki_laki',
        'total_perempuan',
        'data_dusun',
        'data_pekerjaan',
        'data_pendidikan',
        'data_usia',
        'data_agama',
    ];

    protected $casts = [
        'tahun' => 'integer',
        'total_penduduk' => 'integer',
        'total_kk' => 'integer',
        'total_laki_laki' => 'integer',
        'total_perempuan' => 'integer',
        'data_dusun' => 'array',
        'data_pekerjaan' => 'array',
        'data_pendidikan' => 'array',
        'data_usia' => 'array',
        'data_agama' => 'array',
    ];
}
