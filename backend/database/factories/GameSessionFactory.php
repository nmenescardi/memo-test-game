<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\GameSession;
use App\Models\User;
use App\Models\MemoTest;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GameSession>
 */
class GameSessionFactory extends Factory
{
    protected $model = GameSession::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'retries' => $this->faker->randomDigit,
            'number_of_pairs' => $this->faker->randomDigit,
            'state' => 'Started',
            'memo_test_id' => MemoTest::factory(),
            'user_id' => User::factory(),
        ];
    }   
}
