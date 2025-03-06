import React from "react";
import Image from "next/image";
import sourceImg from "/public/assets/img/background.png";

import ListItem from "./ListItem";
import { listItem } from "../constants";
import UpdateData from "./UpdateData";
import CarouselSection from "./CarouselSection";

const Hero = () => {
  return (
    <div className="mx-auto">
      {/* <Image className="" alt="labuca button" src={sourceImg} /> */}
      <CarouselSection />
      {/* <UpdateData /> */}
      <ListItem items={listItem} loading={false} />
    </div>
  );
};

export default Hero;
