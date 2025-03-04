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
        $search = request()->input('search');

        $products = Product::query()
            ->with('category:id,name')
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('price', 'like', '%' . $search . '%')
                    ->orWhereHas('category', function ($query) use ($search) {
                        $query->where('name', 'like', '%' . $search . '%');
                    });
            })
            ->select('id', 'name', 'price', 'category_id')
            ->orderBy('id', 'desc')
            ->paginate(10);

        return inertia('product/index', [
            'products' => ProductResource::collection($products),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
    public function deleted()
    {
        $search = request()->input('search');

        $products = Product::query()
            ->onlyTrashed()
            ->with('category:id,name')
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('price', 'like', '%' . $search . '%')
                    ->orWhereHas('category', function ($query) use ($search) {
                        $query->where('name', 'like', '%' . $search . '%');
                    });
            })
            ->whereNotNull('deleted_at')
            ->select('id', 'name', 'price', 'category_id')
            ->orderBy('id', 'desc')
            ->paginate(10);

        return inertia('product/deleted', [
            'products' => ProductResource::collection($products),
            'filters' => [
                'search' => $search,
            ],
        ]);
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
        return inertia('product/edit', [
            'categories' => $this->categories(),
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $slug = Str::slug($request->name . ' ' . 'Inventory');
        $product->update(array_merge($request->validated(), ['slug' => $slug]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }

    public function categories()
    {
        return Cache::remember('categories', now()->addHours(24), function () {
            return Category::select(['id', 'name'])->get();
        });
    }
}
