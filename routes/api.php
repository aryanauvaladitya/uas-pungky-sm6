<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KasirController;

Route::get('/menu', [KasirController::class, 'index']);
Route::post('/checkout', [KasirController::class, 'checkout']);
Route::get('/transactions', [KasirController::class, 'transactions']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
