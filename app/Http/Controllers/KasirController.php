<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Models\Transaction;
use App\Models\Ingredient;
use App\Models\MenuIngredient;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class KasirController extends Controller
{
    public function index()
    {
        $allMenus = Menu::all();
        
        $utamaNames = ['Hemat A', 'Mix B', 'Mix C', 'Mix D', 'Mix E', 'Chicken Teriyaki A', 'Chicken Teriyaki B', 'Chicken Katsu', 'Beef Teriyaki A', 'Beef Teriyaki B', 'Chicken Spicy Teriyaki'];
        $minumanNames = ['Ice Strawberry Tea', 'Ice Lychee Tea', 'Ice Jasmine Tea'];
        
        $utama = [];
        $topping = [];
        $minuman = [];

        foreach ($allMenus as $menu) {
            if (in_array($menu->nama, $utamaNames)) {
                $utama[] = $menu;
            } elseif (in_array($menu->nama, $minumanNames)) {
                $minuman[] = $menu;
            } else {
                $topping[] = $menu;
            }
        }

        $ingredients = Ingredient::all();

        return response()->json([
            'success' => true,
            'data' => compact('utama', 'topping', 'minuman', 'ingredients')
        ]);
    }

    public function checkout(Request $request)
    {
        $cart = $request->input('cart');
        $customerName = $request->input('customerName');
        
        if (empty($customerName)) {
            return response()->json(['success' => false, 'message' => 'Nama pelanggan harus diisi!']);
        }

        if (empty($cart)) {
            return response()->json(['success' => false, 'message' => 'Keranjang kosong!']);
        }

        DB::beginTransaction();
        try {
            $receiptNo = 'RCP-' . date('Ymd') . '-' . strtoupper(Str::random(4));

            foreach ($cart as $item) {
                // Simpan transaksi
                Transaction::create([
                    'menu_nama' => $item['nama'],
                    'jumlah' => $item['jumlah'],
                    'harga' => $item['harga'],
                    'total' => $item['harga'] * $item['jumlah'],
                    'customer_name' => $customerName,
                    'receipt_no' => $receiptNo
                ]);

                // Kurangi stok bahan baku
                $menu = Menu::where('nama', $item['nama'])->first();
                if ($menu) {
                    $menuIngredients = MenuIngredient::where('menu_id', $menu->id)->get();
                    foreach ($menuIngredients as $mi) {
                        $ingredient = Ingredient::find($mi->ingredient_id);
                        if ($ingredient) {
                            $pengurangan = $mi->jumlah * $item['jumlah'];
                            if ($ingredient->stok < $pengurangan) {
                                throw new \Exception("Stok {$ingredient->nama} tidak mencukupi untuk pesanan {$item['nama']}!");
                            }
                            $ingredient->stok -= $pengurangan;
                            $ingredient->save();
                        }
                    }
                }
            }

            DB::commit();
            return response()->json([
                'success' => true, 
                'message' => 'Checkout berhasil!',
                'receipt_no' => $receiptNo
            ]);
            
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function transactions()
    {
        // Mengambil riwayat transaksi terbaru
        $transactions = Transaction::orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $transactions
        ]);
    }
}
