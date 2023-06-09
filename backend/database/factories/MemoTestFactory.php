<?php

namespace Database\Factories;

use App\Models\MemoTest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MemoTest>
 */
class MemoTestFactory extends Factory
{
    protected $model = MemoTest::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'images' => json_encode(array_map(function($item) {
                return $this->faker->imageUrl();
            }, range(1, 15))),
        ];
    }
}
