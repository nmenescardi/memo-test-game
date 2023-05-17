<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MemoTest;

class MemoTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // First test
        MemoTest::create([
            'name' => 'Cities 3 pairs',
            'images' => [
                'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eXxlbnwwfHwwfHw%3D&amp;w=1000&amp;q=80',
                'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHw%3D&amp;w=1000&amp;q=80',
                'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2l0eXxlbnwwfHwwfHw%3D&amp;w=1000&amp;q=80',
            ]
        ]);

        // Second test
        MemoTest::create([
            'name' => 'Cities 7 pairs',
            'images' => [
                'https://plus.unsplash.com/premium_photo-1677228571709-519f0d5153f1?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2l0eXxlbnwwfHwwfHw%3D&amp;w=1000&amp;q=80',
                'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2l0eXxlbnwwfHwwfHw%3D&amp;w=1000&amp;q=80',
                'https://images.unsplash.com/photo-1543872084-c7bd3822856f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNpdHl8ZW58MHx8MHx8&amp;w=1000&amp;q=80',
                'https://images.unsplash.com/photo-1495954380655-01609180eda3?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNpdHl8ZW58MHx8MHx8&amp;w=1000&amp;q=80',
                'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNpdHl8ZW58MHx8MHx8&amp;w=1000&amp;q=80',
                'https://plus.unsplash.com/premium_photo-1677228571702-36ad21bb8180?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNpdHl8ZW58MHx8MHx8&amp;w=1000&amp;q=80',
                'https://images.unsplash.com/photo-1512850183-6d7990f42385?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNpdHl8ZW58MHx8MHx8&amp;w=1000&amp;q=80',
            ]
        ]);
    }
}

