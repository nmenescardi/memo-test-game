<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\MemoTest;
use App\Models\GameSession;

class GameSessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GameSession::factory()
        ->for(User::factory())
        ->for(MemoTest::factory())
        ->create([
            'retries' => 3,
            'number_of_pairs' => 5,
            'state' => 'Started'
        ]);
    }
}
