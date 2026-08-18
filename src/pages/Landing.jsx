import React from "react"
import Navbar from "../components/common/Navbar"
import Hero from '../components/landingComponents/Hero'
import Features from "../components/landingComponents/Features";
import FamousTrips from "../components/landingComponents/FamousTrips";
import OurMission from "../components/landingComponents/OurMission";


const Landing = () => {
  return (
    <div>
    <Navbar />
    <Hero />
    <Features />
    <FamousTrips />
    <OurMission />
    </div>
  );
};

export default Landing
