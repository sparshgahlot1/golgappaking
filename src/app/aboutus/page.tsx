import React from "react";
import AboutusHeader from "../components/aboutusHeader/AboutusHeader";
import AboutUsSlider from "../components/AboutUsSlider";
import Image from "next/image";

const Aboutus = () => {
  return (
    <div className="flex flex-col items-center justify-center md:px-8">
      {/* Slider */}
      {/* <div className="w-full max-w-6xl"> */}
        <AboutUsSlider />
      {/* </div> */}

      {/* Header */}
      <div className="w-full max-w-4xl my-8 pl-4">
        <AboutusHeader title={["One Kitchen", "Multiple Outlets"]} />
      </div>

      {/* Image */}
      <div className="w-full max-w-4xl px-4 mb-10">
        <Image
          src="/outlets-multi.jpeg"
          alt="outlets"
          width={1200}
          height={800}
          className="w-full h-auto rounded-xl object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Aboutus;
