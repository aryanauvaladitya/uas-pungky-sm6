<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'harga', 'gambar'];

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'menu_ingredients')
                    ->withPivot('jumlah')
                    ->withTimestamps();
    }
}
