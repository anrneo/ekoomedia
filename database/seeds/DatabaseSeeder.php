<?php

use Illuminate\Database\Seeder;
use App\Listdata;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Listdata::truncate();
        factory(Listdata::class, 5)->create();
    }
}
