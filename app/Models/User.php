<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function tokens()
    {
        return $this->hasMany(PersonalAccessToken::class);
    }

    public function createToken(string $name = 'web-admin'): string
    {
        $token = Str::random(60);
        $this->tokens()->create([
            'token' => hash('sha256', $token),
            'name' => $name,
            'last_used_at' => now(),
        ]);

        return $token;
    }
}
