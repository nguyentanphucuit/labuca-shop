import React from "react";
import { PencilLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SpeedDial = () => {
  return (
    <div className="absolute bottom-0 right-0 ">
      <button className="fixed animate-bounce bottom-4 right-4 z-50 rounded-full p-3 shadow-lg transition-transform duration-600 ease-in-out hover:scale-110">
        <Link href="https://zalo.me/0909090909">
          <Image src='/assets/img/zalo.png' alt="zalo-contact" width={48} height={48} />
        </Link>
      </button>
    </div>
  );
};

export default SpeedDial;
