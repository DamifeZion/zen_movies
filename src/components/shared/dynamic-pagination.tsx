import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";
import { useMediaScreen } from "@/hooks/useMediaScreen";
import { StoreRootState } from "@/services/store";
import { DynamicPaginationProps } from "@/types";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export const DynamicPagination = ({ pageRoute, multipleQueries = false }: DynamicPaginationProps) => {
   const isMobile = useMediaScreen({ breakpoint: "xsm" });
   const navigate = useNavigate();
   const { movies } = useSelector((state: StoreRootState) => state.moviesSlice);
   const [searchParams] = useSearchParams();
   const totalPages = movies.total_pages;

   //NOTE: Current page must be in number in order to perform math functions
   const currentPage = Number(searchParams.get("page") || 1);

   const handlePageChange = (page: number) => {
      if (multipleQueries) {
         return navigate(`${pageRoute}&page=${page}`);
      }
      navigate(`${pageRoute}?page=${page}`);
   };

   const handlePrevious = () => {
      if (currentPage > 1) {
         handlePageChange(currentPage - 1);
      }
   };

   const handleNext = () => {
      if (currentPage < totalPages) {
         handlePageChange(currentPage + 1);
      }
   };

   // Determine the range of visible pages
   const visiblePages = isMobile ? 2 : 3;
   const startPage = Math.max(1, currentPage - visiblePages);
   const endPage = Math.min(totalPages, currentPage + visiblePages);

   return (
      <Pagination className="mt-12">
         <PaginationContent className="px-2">
            <PaginationItem>
               <PaginationPrevious
                  size={isMobile ? "sm" : "default"}
                  onClick={handlePrevious}
                  className="cursor-pointer"
               />
            </PaginationItem>

            {Array.from(
               { length: endPage - startPage + 1 },
               (_, index) => startPage + index
            ).map((page) => (
               <PaginationItem key={page}>
                  <PaginationLink
                     size={isMobile ? "sm" : "default"}
                     onClick={() => handlePageChange(page)}
                     isActive={currentPage === page}
                  >
                     {page}
                  </PaginationLink>
               </PaginationItem>
            ))}

            <PaginationItem>
               <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
               <PaginationNext
                  size={isMobile ? "sm" : "default"}
                  onClick={handleNext}
                  className="cursor-pointer"
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
};
