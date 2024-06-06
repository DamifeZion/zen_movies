"use client";
import { useState, useEffect, useRef } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ComboBoxProps } from "@/types";
import { useMediaScreen } from "@/hooks/useMediaScreen";

export function ComboBox({
   array, //NOTE: The array of items to display in the dropdown
   defaultValue, //NOTE: This is will be used
   placeholder, //NOTE: The placeholder text
   allowSearch = false, //NOTE: Whether to include a search input in the dropdown
   onValueChange, //NOTE: A callback function that is called when a new value is selected
   side,
   triggerClassName,
   popoverContentClassName,
   drawerContentClassName,
   commandItemClassName,
}: ComboBoxProps) {
   const isMobile = useMediaScreen({ breakpoint: "md" });
   const [open, setOpen] = useState(false); //NOTE: Whether the dropdown is open
   const popoverTriggerRef = useRef<HTMLButtonElement | null>(null);
   const [currentValue, setCurrentValue] = useState<string | undefined>(""); //NOTE: The currently selected value
   const prevValueRef = useRef<string | undefined>();
   const defaultValueRef = useRef(defaultValue);

   // NOTE: Pass the curent value to be accessible by parent component for use.
   useEffect(() => {
      prevValueRef.current = currentValue;
   });

   const prevValue = prevValueRef.current;

   useEffect(() => {
      if (prevValue !== currentValue && onValueChange) {
         onValueChange(currentValue ? currentValue : "");
      }
   }, [currentValue, onValueChange, prevValue]);

   useEffect(() => {
      defaultValueRef.current = defaultValue;
   }, [defaultValue]);

   useEffect(() => {
      if (defaultValueRef.current) {
         // NOTE: If there is a default value we must cross check to make sure the default value is amongst the array as a value, else we throw error
         const valueExists = array.find(
            (item) => item.value === defaultValueRef.current
         );

         if (!valueExists) {
            throw new Error(
               `The default value "${defaultValueRef.current}" does not exist in the provided array. The array contains the following values: ${array.map((item) => item.value).join(", ")}`
            );
         } else {
            setCurrentValue(defaultValueRef.current);
         }
      }
   }, [array]);

   //NOTE: Render the mobile version of the dropdown if the screen width is small
   if (isMobile) {
      return (
         <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
               <Button
                  variant="outline"
                  className={cn("w-full justify-start gap-2", triggerClassName)}
               >
                  {currentValue ? (
                     array.find((item) => item.value === currentValue)?.label
                  ) : (
                     <span className="text-muted-foreground">
                        {placeholder && placeholder}
                     </span>
                  )}
                  <CaretSortIcon className="ml-auto size-5 shrink-0 opacity-50" />
               </Button>
            </DrawerTrigger>

            <DrawerContent className={drawerContentClassName}>
               <div id="wrapper" className="mt-4 border-t">
                  <SelectList
                     currentValue={currentValue}
                     array={array}
                     placeholder={placeholder}
                     allowSearch={allowSearch}
                     setOpen={setOpen}
                     setSelected={setCurrentValue}
                     commandItemClassName={commandItemClassName}
                  />
               </div>
            </DrawerContent>
         </Drawer>
      );
   }

   //NOTE: Render the desktop version of the dropdown
   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               ref={popoverTriggerRef}
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className={cn("w-full justify-between gap-2", triggerClassName)}
            >
               {currentValue ? (
                  array.find((item) => item.value === currentValue)?.label
               ) : (
                  <span className="text-muted-foreground">
                     {placeholder && placeholder}
                  </span>
               )}

               <CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>

         <PopoverContent
            side={side}
            align="start"
            style={{
               width: popoverTriggerRef.current
                  ? `${popoverTriggerRef.current.offsetWidth}px`
                  : "auto",
            }}
            className={cn("p-0", popoverContentClassName)}
         >
            <SelectList
               currentValue={currentValue}
               array={array}
               placeholder={placeholder}
               allowSearch={allowSearch}
               setOpen={setOpen}
               setSelected={setCurrentValue}
               commandItemClassName={commandItemClassName}
            />
         </PopoverContent>
      </Popover>
   );
}

//NOTE: The SelectList component, used to render the list of items in the dropdown
const SelectList = ({
   currentValue, //NOTE: The currently selected value
   setOpen, //NOTE: A function to open or close the dropdown
   setSelected, //NOTE: A function to set the selected value
   array, //NOTE: The array of items to display in the dropdown
   allowSearch, //NOTE: Whether to include a search input in the dropdown
   placeholder, //NOTE: The placeholder text
   commandItemClassName,
   renderItem, //NOTE: A function to render each item in the dropdown as jsx
}: {
   currentValue?: string;
   setOpen: (open: boolean) => void;
   setSelected: (value: string) => void;
   placeholder: ComboBoxProps["placeholder"];
   array: ComboBoxProps["array"];
   allowSearch: ComboBoxProps["allowSearch"];
   commandItemClassName?: string;
   renderItem?: ComboBoxProps["renderItem"];
}) => {
   return (
      <Command className="w-full">
         {allowSearch && (
            <>
               <CommandInput placeholder={placeholder} className="h-9" />
            </>
         )}

         <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>

            <CommandGroup>
               {array.map((item) => (
                  <CommandItem
                     key={item.value}
                     value={item.value}
                     onSelect={(value) => {
                        setSelected(currentValue === value ? "" : value);
                        setOpen(false);
                     }}
                     className={cn("py-2 cursor-pointer", commandItemClassName)}
                  >
                     {/*NOTE: Use renderItem if it's provided, else use label if it's available, else use value */}
                     {renderItem ? renderItem(item) : item.label || item.value}

                     <CheckIcon
                        className={cn(
                           "ml-auto size-5",
                           currentValue === item.value
                              ? "opacity-100"
                              : "opacity-0"
                        )}
                     />
                  </CommandItem>
               ))}
            </CommandGroup>
         </CommandList>
      </Command>
   );
};
