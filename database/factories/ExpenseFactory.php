<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category' => fake()->randomElement(['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping']),
            'mode' => fake()->randomElement(['Cash', 'Card', 'Online', 'Bank Transfer']),
            'amount' => fake()->randomFloat(2, 10, 500),
            'item' => fake()->words(3, true),
        ];
    }
}
