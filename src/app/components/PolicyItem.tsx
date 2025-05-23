import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

interface PolicyItemProps {
  title: string;
  content: React.ReactNode;
  index: number;
}

const PolicyItem = ({ title, content, index }: PolicyItemProps) => {
  return (
    <div className="w-full">
      <Disclosure>
        {({ open }) => (
          <div
            className={`
              w-full overflow-hidden rounded-2xl transition-all duration-200
              ${open ? "bg-white shadow-sm" : "bg-white/50 hover:bg-white"}
            `}
          >
            <DisclosureButton className="flex w-full items-center justify-between px-6 py-4 text-left">
              <div className="flex items-center gap-4">
                <span className="text-[#B14BF4] font-medium text-lg">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-medium text-gray-800">{title}</h3>
              </div>
              <ChevronUpIcon
                className={`h-5 w-5 text-[#B14BF4]/60 transition-transform duration-300 ${
                  !open ? "rotate-180" : ""
                }`}
              />
            </DisclosureButton>

            <DisclosurePanel>
              <div className="px-6 pb-6 pt-2">
                <div className="ml-10 text-sm text-gray-600 space-y-2">{content}</div>
              </div>
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default PolicyItem;
