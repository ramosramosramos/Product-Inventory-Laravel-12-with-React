<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

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
        $name1 = uniqid($this->faker->word());
        $name2 = $this->faker->word();

        return [
            'name' => $name1,
            'slug' => Str::slug($name1.' '.$name2),
        ];
    }
}
