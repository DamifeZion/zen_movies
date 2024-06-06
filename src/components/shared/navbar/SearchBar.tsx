import { FcSearch } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "@/constants/routeConst";
import { useEffect } from "react";

const FormSchema = z.object({
   search: z.string().min(1, {
      message: "Enter a movie to search for",
   }),
});

export const SearchBar = () => {
   const navigate = useNavigate();

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         search: "",
      },
   });

   //NOTE: useEffect to handle the error message toast, as doing so in the form was unstable and not dependable
   useEffect(() => {
      const searchFieldError = form.formState.errors.search?.message;

      if (searchFieldError) {
         toast.error(searchFieldError)
      }
   }, [form.formState.errors])


   function onSubmit(data: z.infer<typeof FormSchema>) {
      const searchFieldError = form.formState.errors.search?.message;

      console.log(searchFieldError)

      //NOTE: Navigate to the new URL with the search query as a query parameter
      navigate(`${routeConstants.searchResult}?query=${data.search}`);
   }

   return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
         <Form {...form}>
            <FormField
               control={form.control}
               name="search"
               render={({ field }) => (
                  <FormItem className="space-y-0 relative">
                     {!form.watch("search") && (
                        <FormLabel className="w-full p-1 flex items-center justify-center gap-2 absolute top-1/2 -translate-y-1/2 left-0 cursor-text text-muted-foreground max-lg:text-sm">
                           <FcSearch className="text-lg" /> Search for a movie
                           or a series
                        </FormLabel>
                     )}

                     <FormControl>
                        <Input
                           placeholder=""
                           className="border-2 focus-visible:ring-transparent focus-visible:border-ring"
                           {...field}
                        />
                     </FormControl>
                  </FormItem>
               )}
            />
         </Form>
      </form>
   );
};
