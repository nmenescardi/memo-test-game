<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GameSessionTest extends TestCase
{
    use RefreshDatabase;
    protected $gameSession;

    protected function setUp(): void
    {
        parent::setUp();

        $this->gameSession = \App\Models\GameSession::factory()->create();
    }

    public function testCreateGameSession(): void
    {
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation ($memo_test_id: ID!, $retries: Int!, $number_of_pairs: Int!, $state: GameState!, $user_id: ID!) {
                createGameSession(input: {
                    memo_test_id: $memo_test_id,
                    retries: $retries,
                    number_of_pairs: $number_of_pairs,
                    state: $state,
                    user_id: $user_id
                }) {
                    id
                    memo_test_id
                    retries
                    number_of_pairs
                    state
                }
            }
        ', [
            'memo_test_id' => 1,
            'retries' => 0,
            'number_of_pairs' => 10,
            'state' => 'Started',
            'user_id' => 1
        ]);

        $response->assertJsonStructure([
            'data' => [
                'createGameSession' => [
                    'id',
                    'memo_test_id',
                    'retries',
                    'number_of_pairs',
                    'state',
                ],
            ],
        ]);
    }

    public function testUpdateGameSession(): void
    {
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation ($id: ID!, $retries: Int, $number_of_pairs: Int, $state: GameState) {
                updateGameSession(input: {
                    id: $id,
                    retries: $retries,
                    number_of_pairs: $number_of_pairs,
                    state: $state
                }) {
                    id
                    retries
                    number_of_pairs
                    state
                }
            }
        ', [
            'id' => $this->gameSession->id,
            'retries' => $this->gameSession->retries + 1,
            'number_of_pairs' => $this->gameSession->number_of_pairs - 1,
            'state' => 'Completed'
        ]);

        $response->assertJsonStructure([
            'data' => [
                'updateGameSession' => [
                    'id',
                    'retries',
                    'number_of_pairs',
                    'state',
                ],
            ],
        ]);
    }

    public function testEndGameSession(): void
    {
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation ($id: ID!, $state: GameState!) {
                endGameSession(input: {
                    id: $id,
                    state: $state
                }) {
                    id
                    state
                }
            }
        ', [
            'id' => $this->gameSession->id,
            'state' => 'Completed'
        ]);

        $response->assertJsonStructure([
            'data' => [
                'endGameSession' => [
                    'id',
                    'state',
                ],
            ],
        ]);
    }
}
