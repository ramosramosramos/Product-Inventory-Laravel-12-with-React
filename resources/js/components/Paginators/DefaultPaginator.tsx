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

export function DefaultPaginator({ links }: { links: Link[] }) {
    console.log(links);
    return (
        <Pagination>
            <PaginationContent className="gap-5">

                {links.map((link) => {
                    if(link.label.endsWith('Previous')){
                        return (<PaginationItem key={link.label} className="w-[max-content]">
                            <PaginationPrevious isActive={link.active} href="#"> <span dangerouslySetInnerHTML={{ __html: link.label }} /> </PaginationPrevious>
                        </PaginationItem>)
                    }
                    if(link.label.startsWith('Next')){
                        return (<PaginationItem key={link.label} className="w-[max-content]">
                            <PaginationNext isActive={link.active} href="#"> <span dangerouslySetInnerHTML={{ __html: link.label }} /> </PaginationNext>
                        </PaginationItem>)
                    }
                    return (<PaginationItem key={link.label} className="w-[max-content]">
                        <PaginationLink isActive={link.active} href="#"> <span dangerouslySetInnerHTML={{ __html: link.label }} /> </PaginationLink>
                    </PaginationItem>)
                }

                )}


            </PaginationContent>
        </Pagination>
    )
}
