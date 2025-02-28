<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string','unique:products,name'],
            'price' => ['required', 'numeric'],
            'category_id' => ['required', 'numeric', 'exists:categories,id'],
        ];
    }

    public function messages()
    {
        return [
            'name.unique' => 'The product name has already taken.',
            'category_id.required' => 'The category field is required',
            'category_id.exists' => 'The category does not exists in the collections.',
        ];
    }
}
