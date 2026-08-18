import { Star, StarCheck } from "lucide-react";
import React from "react";

const OurMission = () => {
  return (
    <section className="px-80 py-24 bg-emerald-900 text-amber-50">
      <h2 className="text-4xl font-bold text-center mb-12 ">Our Mission</h2>
      <p className="text-xl font-medium italic text-center">
        Our mission is to provide the best possible service to our customers.
        Plan their itenary
        <br /> and make their trip memorable. We strive to offer unique
        experiences that <br />
        cater to the diverse interests of our travelers.
      </p>
     <div className="grid grid-cols-3 mt-20 border border-amber-100">
  
  <div className="text-center py-6 border-r border-amber-100">
    <p className="text-3xl font-bold mt-3">300+</p>
    <p>Clients Served</p>
  </div>

  <div className="text-center py-6 border-r border-amber-100 mt-3">
    <p className="text-3xl font-bold flex items-center justify-center gap-2">
      4.8🌟
    </p>
    <p>Overall Rating</p>
  </div>

  <div className="text-center py-6 mt-3">
    <p className="text-3xl font-bold">20+</p>
    <p>Countries Linked</p>
  </div>

</div>
    </section>
  );
};

export default OurMission;
