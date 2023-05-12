<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MemoTestTest extends TestCase
{
    use RefreshDatabase;

    protected $memoTest;

    protected function setUp(): void
    {
        parent::setUp();

        $this->memoTest = \App\Models\MemoTest::factory()->create();
    }

    public function testCreateMemoTest(): void
    {
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation ($name: String!, $images: [String!]!) {
                createMemoTest(input: {
                    name: $name,
                    images: $images
                }) {
                    id
                    name
                    images
                }
            }
        ', [
            'name' => 'Test Memo',
            'images' => ['https://example.com/image1.png', 'https://example.com/image2.png']
        ]);

        $response->assertJsonStructure([
            'data' => [
                'createMemoTest' => [
                    'id',
                    'name',
                    'images',
                ],
            ],
        ]);
    }

    public function testUpdateMemoTest(): void
    {
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation ($id: ID!, $name: String, $images: [String!]) {
                updateMemoTest(input: {
                    id: $id,
                    name: $name,
                    images: $images
                }) {
                    id
                    name
                    images
                }
            }
        ', [
            'id' => $this->memoTest->id,
            'name' => 'Updated Test Memo',
            'images' => ['https://example.com/image1_updated.png', 'https://example.com/image2_updated.png']
        ]);
    
        $response->assertJsonStructure([
            'data' => [
                'updateMemoTest' => [
                    'id',
                    'name',
                    'images',
                ],
            ],
        ]);
    }

    public function testDeleteMemoTest(): void
    {
        $response = $this->graphQL(/** @lang GraphQL */ '
            mutation ($id: ID!) {
                deleteMemoTest(id: $id) {
                    id
                }
            }
        ', [
            'id' => $this->memoTest->id,
        ]);

        $response->assertJsonStructure([
            'data' => [
                'deleteMemoTest' => [
                    'id',
                ],
            ],
        ]);
    }
}
