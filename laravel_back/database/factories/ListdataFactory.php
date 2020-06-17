<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Listdata;
use Faker\Generator as Faker;


$factory->define(Listdata::class, function (Faker $faker) {
    return [
        'item' => $faker->word
    ];
});
