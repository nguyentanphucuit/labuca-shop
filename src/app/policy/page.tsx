"use client";

import { policy } from "@/app/constants/policyData";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const Policy = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-purple-50/30 py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-[40px] font-bold mb-4 bg-gradient-to-r from-[#B14BF4] via-[#F364D7] to-[#B14BF4] bg-clip-text text-transparent">
            CHÍNH SÁCH TẠI CỬA HÀNG LABUCA
          </h1>
          <p className="text-gray-600 text-lg">
            Khám phá các chính sách của chúng tôi để hiểu rõ hơn về quyền lợi và trách nhiệm của bạn
          </p>
        </div>

        <div className="space-y-3">
          {policy.map((item, index) => (
            <Disclosure key={item.title}>
              {({ open }) => (
                <div
                  className={`
                  overflow-hidden rounded-2xl transition-all duration-200
                  ${open ? "bg-white shadow-sm" : "bg-white/50 hover:bg-white"}
                `}
                >
                  <DisclosureButton className="flex w-full items-center justify-between px-6 py-4 text-left">
                    <div className="flex items-center gap-4">
                      <span className="text-[#B14BF4] font-medium text-lg">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-base font-medium text-gray-800">{item.title}</h3>
                    </div>
                    <ChevronUpIcon
                      className={`h-5 w-5 text-[#B14BF4]/60 transition-transform duration-300 ${
                        !open ? "rotate-180" : ""
                      }`}
                    />
                  </DisclosureButton>

                  <DisclosurePanel>
                    <div className="px-6 pb-6 pt-2">
                      <div className="text-sm  text-gray-600 space-y-2">{item.content}</div>
                    </div>
                  </DisclosurePanel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Policy;
