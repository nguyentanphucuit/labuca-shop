import React from "react";
import Image from "next/image";
import sourceImg from "/public/assets/img/background.png";

import ListItems from "./ListItems";
import { listItems } from "../constants";
import UpdateData from "./UpdateData";

const Hero = () => {
  return (
    <div className="mx-auto">
      <Image className="" alt="labuca button" src={sourceImg} />
      <ListItems items={listItems} />
      {/* <UpdateData /> */}
    </div>
  );
};

export default Hero;
