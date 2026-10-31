<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Postingan extends Model
{
    use HasFactory;

    protected $table = 'postingan';

    protected $fillable = [
        'judul',
        'slug',
        'kategori',
        'konten',
        'ringkasan',
        'gambar',
        'penulis',
        'tanggal_kegiatan',
        'lokasi_kegiatan',
        'status',
        'dibaca',
    ];

    protected $casts = [
        'tanggal_kegiatan' => 'date',
        'dibaca' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->judul) . '-' . Str::random(5);
            }
            if (empty($post->ringkasan) && !empty($post->konten)) {
                $post->ringkasan = Str::limit(strip_tags($post->konten), 160);
            }
        });
    }
}
