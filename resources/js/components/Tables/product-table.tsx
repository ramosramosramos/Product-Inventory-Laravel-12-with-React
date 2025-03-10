import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ArchiveRestore, Trash2 } from 'lucide-react';
import { type Product } from "@/types"
import { Button } from "../ui/button"
import { Pencil } from 'lucide-react';
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
export function ProductTable({ products = [] }: { products: Product[] }) {


    const { post, get, processing } = useForm({});

    return (
        <Table className="w-full">
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-nowrap">Product ID</TableHead>
                    <TableHead className="w-[max-content] text-nowrap">Product name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="flex gap-3.5">
                            {route().current('products.index') &&
                                <>
                                    <Button size={"sm"} variant={"outline"} className="cursor-pointer" onClick={(e) => {
                                        get(route('products.edit', product.id));
                                    }}  >
                                        <Pencil />
                                    </Button>
                                    <Button size={"sm"} variant={"destructive"} className="cursor-pointer" onClick={() => {
                                        post(route('products.destroy', product.id), {
                                            onSuccess: () => {
                                                toast.success(`The product ${product.name} is successfully deleted.`);
                                            }
                                        });
                                    }}  >
                                        <Trash2 />
                                    </Button>
                                </>
                            }
                            {route().current('products.deleted') &&
                                <>
                                    <Button size={"sm"} variant={"sucess"} className="cursor-pointer" onClick={(e) => {
                                        post(route('products.restore', product.id),
                                            {
                                                preserveScroll: true,
                                                onSuccess: () => {
                                                    toast.success(`The product ${product.name} is  successfully restored.`);
                                                }
                                            });
                                    }}  >
                                        <ArchiveRestore />
                                    </Button>
                                    <Button size={"sm"} variant={"destructive"} className="cursor-pointer" onClick={() => {
                                        post(route('products.forceDelete', product.id), {
                                            preserveScroll: true,
                                            onSuccess: () => {
                                                toast.error(`The product ${product.name} is  deleted permanently.`);
                                            }
                                        });
                                    }}  >
                                        <Trash2 /> Delete permanently
                                    </Button>
                                </>
                            }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}
        </Table>
    )
}
