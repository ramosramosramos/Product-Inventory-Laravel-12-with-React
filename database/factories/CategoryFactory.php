<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name1 = $this->faker->word();
        $name2 = $this->faker->word();

        return [
            'name' => $name1,
            'slug' => Str::slug($name1.' '.$name2),
        ];
    }
}
