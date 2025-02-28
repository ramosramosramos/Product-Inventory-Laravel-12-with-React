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
import { Trash2 } from 'lucide-react';
import { type Product } from "@/types"
import { Button } from "../ui/button"
import { Pencil } from 'lucide-react';
import { router } from "@inertiajs/react";
import { toast } from "sonner";
export function ProductTable({ products = [] }: { products: Product[] }) {



    return (
        <Table className="w-full">
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Product ID</TableHead>
                    <TableHead className="w-[max-content]">Product name</TableHead>
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
                            <Button size={"sm"} variant={"outline"} className="cursor-pointer" onClick={(e) => {
                                router.get(route('products.edit', product.id));
                            }}  >
                                <Pencil />
                            </Button>
                            <Button size={"sm"} variant={"destructive"} className="cursor-pointer" onClick={() => {
                                router.post(route('products.destroy', product.id), {

                                }, {
                                    onSuccess: () => {
                                        toast.success(`The product ${product.name} is successfully deleted.`);
                                    }
                                });
                            }}  >
                                <Trash2 />
                            </Button>
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
