<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'stok', 'satuan'];

    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'menu_ingredients')
                    ->withPivot('jumlah')
                    ->withTimestamps();
    }
}
