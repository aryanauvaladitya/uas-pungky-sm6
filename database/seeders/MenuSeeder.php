<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $menus = [
            [ 'nama' => 'Hemat A', 'harga' => 12000, 'gambar' => 'images/hemat-a.jpg' ],
            [ 'nama' => 'Mix B', 'harga' => 13000, 'gambar' => 'images/mix-b.jpg' ],
            [ 'nama' => 'Mix C', 'harga' => 15000, 'gambar' => 'images/mix-c.jpg' ],
            [ 'nama' => 'Mix D', 'harga' => 16000, 'gambar' => 'images/mix-d.jpg' ],
            [ 'nama' => 'Mix E', 'harga' => 17000, 'gambar' => 'images/mix-e.jpg' ],
            [ 'nama' => 'Chicken Teriyaki A', 'harga' => 15000, 'gambar' => 'images/chicken-teri-a.jpg' ],
            [ 'nama' => 'Chicken Teriyaki B', 'harga' => 18000, 'gambar' => 'images/chicken-teri-b.jpg' ],
            [ 'nama' => 'Chicken Katsu', 'harga' => 17000, 'gambar' => 'images/chicken-katsu.jpg' ],
            [ 'nama' => 'Beef Teriyaki A', 'harga' => 17000, 'gambar' => 'images/beef-teri-a.jpg' ],
            [ 'nama' => 'Beef Teriyaki B', 'harga' => 20000, 'gambar' => 'images/beef-teri-b.jpg' ],
            [ 'nama' => 'Chicken Spicy Teriyaki', 'harga' => 16000, 'gambar' => 'images/chicken-spicy-teri.jpg' ],
            
            [ 'nama' => 'Ebi Furay', 'harga' => 3000, 'gambar' => 'images/ebi-furay.jpg' ],
            [ 'nama' => 'Egg Roll', 'harga' => 3000, 'gambar' => 'images/egg-roll.jpg' ],
            [ 'nama' => 'Chicken Spicy', 'harga' => 5000, 'gambar' => 'images/chicken-spicy.jpg' ],
            [ 'nama' => 'Chicken Katsu', 'harga' => 5000, 'gambar' => 'images/chicken-katsu.jpg' ], // Topping
            [ 'nama' => 'Ekkado', 'harga' => 3000, 'gambar' => 'images/ekkado.jpg' ],
            
            [ 'nama' => 'Ice Strawberry Tea', 'harga' => 5000, 'gambar' => 'images/strawberry-tea.jpg' ],
            [ 'nama' => 'Ice Lychee Tea', 'harga' => 5000, 'gambar' => 'images/lychee-tea.jpg' ],
            [ 'nama' => 'Ice Jasmine Tea', 'harga' => 5000, 'gambar' => 'images/jasmine-tea.jpg' ],
        ];

        foreach ($menus as $menu) {
            Menu::firstOrCreate(['nama' => $menu['nama']], $menu);
        }
    }
}
