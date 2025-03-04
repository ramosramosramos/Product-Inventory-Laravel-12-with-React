import { ProductTable } from '@/components/tables/product-table';
import AppLayout from '@/layouts/app-layout';
import { Meta, type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { type Product } from '@/types';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DefaultPaginator } from '@/components/paginators/default-paginator';
import { SearchInput } from '@/components/inputs/search-input';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Deleted products',
        href: route('products.deleted'),
    },
];

interface FormSearch {
    search: string;
    [key: string]: any;
}


export default function Deleted({ products ,filters}: { products: { data: Product[], meta: Meta },filters:{search:string} }) {

    const { data, setData, get } = useForm<FormSearch>({
        search: filters.search,
    })
    const handleSearch: FormEventHandler = (e) => {
        e.preventDefault();
        get(route('products.deleted'),{
            preserveScroll:true,
            onSuccess:()=>{

            }
        });

    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Deleted products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <div className="">
                   <form onSubmit={handleSearch}>
                   <SearchInput
                    buttonProps={{ dangerouslySetInnerHTML: { __html: "Search" } }}
                    placeholder='Search products'
                    defaultValue={data.search}
                    autoFocus
                    onChange={(e)=>setData('search',e.target.value)}
                     />
                   </form>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh]  flex-1 rounded-xl border md:min-h-min">

                    <div className='w-full max-w-5xl m-auto'>
                        <ProductTable products={products.data} />
                        <DefaultPaginator filters={filters} links={products.meta.links} />
                    </div>
                    <div className='flex justify-center mt-4 mb-3'>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
