import { ProductTable } from '@/components/Tables/product-table';
import AppLayout from '@/layouts/app-layout';
import { Meta, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { type Product } from '@/types';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DefaultPaginator } from '@/components/Paginators/DefaultPaginator';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: route('products.index'),
    },
];




export default function Index({ products }: { products: { data: Product[], meta: Meta }, }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-6">
                    <Button className='cursor-pointer w-[max-content]' variant='default' onClick={() => router.get(route('products.create'))}>
                        <Plus />
                    </Button>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh]  flex-1 rounded-xl border md:min-h-min">

                <div className='w-full max-w-5xl m-auto'>
                   <ProductTable products={products.data} />
                   </div>
                    <div className='flex justify-center mt-4 mb-3'>
                        <DefaultPaginator links={products.meta.links} />
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
