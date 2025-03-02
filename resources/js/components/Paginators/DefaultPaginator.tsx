import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { type Link } from "@/types"
import { router } from "@inertiajs/react"

export function DefaultPaginator({ links }: { links: Link[] }) {

    const handlePageClick = (url="")=>{
       router.get(url,{},{preserveScroll:true})
    }
    return (
        <Pagination>
            <PaginationContent className="">

                {links.map((link) => {
                    if(link.label.endsWith('Previous')){
                        return (<PaginationItem  key={link.label} className="w-[max-content] cursor-pointer">
                            <PaginationPrevious isActive={link.active} onClick={()=>handlePageClick(link.url)} > <span dangerouslySetInnerHTML={{ __html: link.label }} /> </PaginationPrevious>
                        </PaginationItem>)
                    }
                    if(link.label.startsWith('Next')){
                        return (<PaginationItem key={link.label} className="w-[max-content]  cursor-pointer">
                            <PaginationNext isActive={link.active} onClick={()=>handlePageClick(link.url)} > <span dangerouslySetInnerHTML={{ __html: link.label }} /> </PaginationNext>
                        </PaginationItem>)
                    }
                    return (<PaginationItem key={link.label} className="w-[max-content]  cursor-pointer">
                        <PaginationLink isActive={link.active} onClick={()=>handlePageClick(link.url)} > <span dangerouslySetInnerHTML={{ __html: link.label }} /> </PaginationLink>
                    </PaginationItem>)
                }

                )}


            </PaginationContent>
        </Pagination>
    )
}
