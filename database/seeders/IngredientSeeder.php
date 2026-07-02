<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ingredient;
use App\Models\Menu;
use App\Models\MenuIngredient;

class IngredientSeeder extends Seeder
{
    public function run(): void
    {
        $ebiFuray = Ingredient::create(['nama' => 'Ebi Furay', 'stok' => 50, 'satuan' => 'pcs']);
        $eggRoll = Ingredient::create(['nama' => 'Egg Roll', 'stok' => 50, 'satuan' => 'pcs']);
        $chickenSpicy = Ingredient::create(['nama' => 'Chicken Spicy', 'stok' => 80, 'satuan' => 'porsi']);
        $chickenKatsu = Ingredient::create(['nama' => 'Chicken Katsu', 'stok' => 70, 'satuan' => 'porsi']);
        $ekkado = Ingredient::create(['nama' => 'Ekkado', 'stok' => 80, 'satuan' => 'pcs']);
        
        $strawSyrup = Ingredient::create(['nama' => 'Strawberry Syrup', 'stok' => 4000, 'satuan' => 'ml']); 
        $jasmineSyrup = Ingredient::create(['nama' => 'Jasmine Syrup', 'stok' => 2500, 'satuan' => 'ml']);
        $lycheeSyrup = Ingredient::create(['nama' => 'Lychee Syrup', 'stok' => 2500, 'satuan' => 'ml']);

        // Helper untuk mempermudah binding
        $bindMenu = function($namaMenu, $ingredients) {
            $menu = Menu::where('nama', $namaMenu)->first();
            if ($menu) {
                foreach ($ingredients as $ingredient_id => $jumlah) {
                    MenuIngredient::create([
                        'menu_id' => $menu->id,
                        'ingredient_id' => $ingredient_id,
                        'jumlah' => $jumlah
                    ]);
                }
            }
        };

        // Asumsi resep dasar untuk minuman
        $bindMenu('Ice Strawberry Tea', [$strawSyrup->id => 20]);
        $bindMenu('Ice Lychee Tea', [$lycheeSyrup->id => 20]);
        $bindMenu('Ice Jasmine Tea', [$jasmineSyrup->id => 20]);

        // Asumsi resep untuk menu utama (sekedar contoh)
        $bindMenu('Hemat A', [$ebiFuray->id => 1, $eggRoll->id => 1]);
        $bindMenu('Mix B', [$ebiFuray->id => 1, $eggRoll->id => 2]);
        $bindMenu('Chicken Katsu', [$chickenKatsu->id => 1]);
    }
}
