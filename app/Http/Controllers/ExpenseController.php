<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $expenses = Expense::query()
            ->where('user_id', $request->user()->id)
            ->with('category')
            ->select(['id','category_id','mode','amount','item','created_at'])
            ->latest()
            ->get();

            
        $categories = Category::all();

        Log::info('Expenses fetched', ['count' => $expenses->count(), 'user_id' => $request->user()->id]);

        return Inertia::render('expense', [
            'expenses' => $expenses,
            'categories' => $categories,
        ]);
    }

    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('expense');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'mode'        => 'required|string|max:255',
            'amount'      => 'required|numeric',
            'item'        => 'required|string|max:255',
        ]);

        Expense::create([
            'user_id' => $request->user()->id,
            ...$data,
        ]);

        return redirect()->route('expense');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        return Inertia::render('expense', ['expense' => $expense]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        return Inertia::render('expense', ['expense' => $expense]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        $data = $request->validate([
            'category' => 'required|exists:categories,id',
            'mode'     => 'required|string|max:255',
            'amount'   => 'required|numeric',
            'item'     => 'required|string|max:255',
        ]);

        $expense->update($data);

        return redirect()->route('expense');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();
        return redirect()->route('expense');
    }
}
