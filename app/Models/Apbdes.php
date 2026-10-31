<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apbdes extends Model
{
    use HasFactory;

    protected $table = 'apbdes';

    protected $fillable = [
        'tahun',
        'kategori',
        'bidang',
        'kegiatan',
        'dana_desa',
        'alokasi_dana_desa',
        'fades_dll',
        'retribusi_pajak',
        'bantuan_provinsi',
        'bantuan_kabkota',
    ];

    protected $casts = [
        'tahun' => 'integer',
        'dana_desa' => 'float',
        'alokasi_dana_desa' => 'float',
        'fades_dll' => 'float',
        'retribusi_pajak' => 'float',
        'bantuan_provinsi' => 'float',
        'bantuan_kabkota' => 'float',
    ];

    protected $appends = ['total'];

    public function getTotalAttribute(): float
    {
        return (float) (
            $this->dana_desa +
            $this->alokasi_dana_desa +
            $this->fades_dll +
            $this->retribusi_pajak +
            $this->bantuan_provinsi +
            $this->bantuan_kabkota
        );
    }
}
