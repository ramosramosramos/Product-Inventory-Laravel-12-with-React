<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('products', ProductController::class)->except(['update', 'destroy']);
    Route::get('/inventory/products/deleted', [ProductController::class, 'deleted'])->name('products.deleted');
    Route::post('products/{product}/update', [ProductController::class, 'update'])->name('products.update');
    Route::post('products/{product}/destroy', [ProductController::class, 'destroy'])->name('products.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
