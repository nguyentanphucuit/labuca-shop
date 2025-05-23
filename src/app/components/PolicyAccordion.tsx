"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export interface PolicyItem {
  id: string;
  title: string;
  content: string[];
}

interface PolicyAccordionProps {
  item: PolicyItem;
  index: number;
}

const PolicyAccordion = ({ item, index }: PolicyAccordionProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className={`rounded-lg overflow-hidden ${open ? "bg-[#1A1D26]" : "bg-[#15171E]"}`}>
          <DisclosureButton className="w-full px-6 py-4 text-left hover:bg-[#1A1D26] transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-purple-500/80 text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] font-medium text-gray-200">{item.title}</span>
              </div>
              <ChevronDownIcon
                className={`h-5 w-5 text-purple-500/50 transition-transform duration-200 ${
                  open ? "rotate-180 transform" : ""
                }`}
              />
            </div>
          </DisclosureButton>
          <DisclosurePanel>
            <div className="px-6 pb-4 text-[14px] leading-relaxed text-gray-400 pl-16">
              {item.content.map((line, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-purple-500/30">-</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
};

export default PolicyAccordion;
