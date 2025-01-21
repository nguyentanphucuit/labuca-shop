"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { listType } from "../constants";
import { list } from "postcss";

const Combobox = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (type: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between">
          {value
            ? listType.find((type) => type.label === value)?.label
            : "Select type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search type..." className="h-9" />
          <CommandList>
            <CommandEmpty>No type found.</CommandEmpty>
            <CommandGroup>
              {listType.map((type) => (
                <CommandItem
                  key={type.value}
                  // every item in the list should have a unique value (we use "label" to easy to search)
                  value={type.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}>
                  {type.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === type.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
