
import AppLayout from '@/layouts/app-layout';
import { type CategorySelect, type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { LoaderCircle, LucideMicOff } from 'lucide-react';
import { FormEventHandler } from 'react';
import { SelectInput } from '@/components/Inputs/SelectInputs';
import { toast } from "sonner"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Product',
        href: route('products.create'),
    },
];


interface FormEdit {
    name: string;
    price: string;
    category_id: string;
    [key: string]: any;

}

interface Product {
    id: number;
    name: string;
    price: string;
    category_id: string;
}


export default function Edit({ categories, product }: { categories: CategorySelect[], product: Product }) {


    const { data, setData, processing, reset, errors, post } = useForm<FormEdit>({
        name: product.name,
        price: product.price,
        category_id: product.category_id,

    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.update', product.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Successfully updated.")
                setTimeout(() => {
                    router.get(route('products.index'));
                }, 1000);
                reset();
            },
        })


    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                </div>
                <div className=" p-5 border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min">
                    <form onSubmit={submit} className='max-w-md grid gap-5'>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Product name</Label>
                            <Input
                                id="name"
                                type="text"
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}

                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price"> Price</Label>
                            <Input
                                id="price"
                                type="number"
                                autoFocus
                                tabIndex={1}
                                autoComplete="price"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}

                            />
                            <InputError message={errors.price} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Category</Label>
                            <SelectInput value={String(data.category_id)} onValueChange={(value) => setData('category_id', value)} items={categories} label='Select category' />

                            <InputError message={errors.category_id} />
                        </div>
                        <div>

                            <Button type="submit" className="mt-4 cursor-pointer" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Save
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
        </AppLayout>
    );
}
