import { policy } from "@/app/constants/policyData";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Policy = () => {
  return (
    <div className="max-h-max w-full pt-12 px-4">
      <h5 className="flex justify-center text-center p-6 text-xl font-semibold ">
        CHÍNH SÁCH TẠI CỬA HÀNG LABUCA
      </h5>
      <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-black/75 whitespace-pre-line">
        {policy.map((item) => (
          <div key={item.title}>
            <Disclosure as="div" className="p-6" defaultOpen={false}>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                  {item.title}
                </span>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm/5 text-white/50 ">
                {item.content}
              </DisclosurePanel>
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policy;
