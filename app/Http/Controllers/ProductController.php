<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::select('id', 'name', 'price', 'category_id')
            ->with('category:id,name')
            ->orderBy('id', 'desc')
            ->paginate(10);

        return inertia('product/index', ['products' => ProductResource::collection($products)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return inertia('product/create', ['categories' => $this->categories()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $slug = Str::slug($request->name . ' ' . 'Inventory');
        Product::create(array_merge($request->validated(), ['slug' => $slug]));
        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }

    public function categories()
    {
        return Cache::remember('categories', now()->addHours(24), function () {
            return Category::select(['id', 'name'])->get();
        });
    }
}
