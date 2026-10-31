<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BidangBelanja extends Model
{
    use HasFactory;

    protected $table = 'bidang_belanja';

    protected $fillable = [
        'nama_bidang',
    ];
}
