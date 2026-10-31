<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AparaturDesa extends Model
{
    use HasFactory;

    protected $table = 'aparatur_desa';

    protected $fillable = [
        'nama',
        'jabatan',
        'niap_nip',
        'foto',
        'urutan',
        'status',
    ];

    protected $casts = [
        'urutan' => 'integer',
    ];
}
