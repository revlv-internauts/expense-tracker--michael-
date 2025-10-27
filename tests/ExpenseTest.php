<?php

namespace Tests\Feature;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExpenseTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
   

    public function test_can_create_expense(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/expense', [
            'category' => $category = 'Food',
            'amount' => $amount = 50.00,
            'item' => $item = 'Groceries',
            'mode' => $mode = 'Cash',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('expenses', [
            'user_id' => $user->getKey(),
            'category' => $category,
            'amount' => $amount,
            'item' => $item,
            'mode' => $mode,
        ]);
    }

    public function test_can_update_expense(): void
    {
        $user = User::factory()->create();
        $expense = Expense::factory()->create([
            'user_id' => $user->getKey(),
        ]);

        $response = $this->actingAs($user)->put("/expense/{$expense->getKey()}", [
            'category' => $category = 'Transport',
            'amount' => $amount = 100.00,
            'item' => $item = 'Taxi',
            'mode' => $mode = 'Card',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('expenses', [
            'user_id' => $user->getKey(),
            'category' => $category,
            'amount' => $amount,
            'item' => $item,
            'mode' => $mode,
        ]);
    }

    public function test_can_delete_expense(): void
    {
        $user = User::factory()->create();
        $expense = Expense::factory()->create([
            'user_id' => $user->getKey(),
        ]);

        $response = $this->actingAs($user)->delete("/expense/{$expense->getKey()}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('expenses', [
            'id' => $expense->getKey(),
        ]);
    }
}