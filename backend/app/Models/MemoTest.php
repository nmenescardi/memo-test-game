<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemoTest extends Model
{
    use HasFactory;

    protected $casts = [
        'images' => 'array',
    ];

    public function highestScore(): int
    {
        $gameSessions = $this->gameSessions;

        $highestScore = 0;

        foreach ($gameSessions as $gameSession) {
            if($gameSession->state !== 'Completed') continue;

            $score = $this->calculateScore($gameSession->retries, $gameSession->number_of_pairs);

            if ($score > $highestScore) {
                $highestScore = $score;
            }
        }

        return $highestScore;
    }

    protected function calculateScore(int $attempts, int $pairsAmount): int
    {
        if ($attempts === 0) return 0;

        return round($pairsAmount / $attempts) * 100;
    }

    public function gameSessions()
    {
        return $this->hasMany(GameSession::class);
    }
}
