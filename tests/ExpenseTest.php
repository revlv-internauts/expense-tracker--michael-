<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExpenseTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_expense(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $response = $this->actingAs($user)->post('/expenses', [
            'category_id' => $category->id,
            'amount' => $amount = 50.00,
            'item' => $item = 'Groceries',
            'mode' => $mode = 'Cash',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('expenses', [
            'user_id' => $user->id,
            'category_id' => $category->id,
            'amount' => $amount,
            'item' => $item,
            'mode' => $mode,
        ]);
    }

 

    public function test_can_delete_expense(): void
    {
        $user = User::factory()->create();
        $expense = Expense::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user)->delete("/expenses/{$expense->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('expenses', [
            'id' => $expense->id,
        ]);
    }
}