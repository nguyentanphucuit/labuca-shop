import React from "react";
import Image from "next/image";
import sourceImg from "/public/assets/img/background.png";

import ListItems from "./ListItems";

const Hero = () => {
  return (
    <div className="mx-auto">
      <Image className="" alt="metagun button" src={sourceImg} />
      <ListItems />
    </div>
  );
};

export default Hero;
