<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\CategoryController;


Route::get('/', function () {
    return redirect()->route('login'); 
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('expense', [ExpenseController::class, 'index'])->name('expense');
    
    Route::resource('expenses', ExpenseController::class);
    Route::post('categories', [CategoryController::class, 'store']);
});

require __DIR__.'/settings.php';
