import React from "react";
import CustomButton from "../common/customButton";

const Hero = () => {
  return (
    <div className="relative">
      {/* image */}
      <div className="w-full h-[92vh] overflow-hidden flex items-baseline-last">
        <img
          src="/mountain.jpg"
          alt="wanderwise hero section"
          className="w-full"
        />
      </div>

      {/* overlay */}
      <div className="w-full h-[92vh] bg-black absolute top-0 opacity-40"></div>

      {/* content */}
      <div className="absolute top-0 w-full h-[92vh] flex items-center justify-center text-center">
        <div className="w-1/2 mx-auto">
          <h1 className="text-5xl font-bold text-white">
            Plan your trips with wanderwise
          </h1>

          <p className="text-white mt-4 text-lg leading-8">
            Wanderwise is a travel planning app that helps you plan your trips
            with ease. Invite your friends, create itineries, and share your
            travel plans with others. Start planning your next adventure today!
          </p>

       <CustomButton text="Get Started"  />
        </div>
      </div>
    </div>
  );
};

export default Hero;
