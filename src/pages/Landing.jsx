import React from "react"
import Navbar from "../components/common/Navbar"
import Hero from '../components/landingComponents/Hero'
import Features from "../components/landingComponents/Features";
import FamousTrips from "../components/landingComponents/FamousTrips";
import OurMission from "../components/landingComponents/OurMission";
import TestimonialsSection from "../components/landingComponents/Testimonials";
import { Footer } from "../components/landingComponents/Footer";


const Landing = () => {
  return (
    <div>
    <Navbar />
    <Hero />
    <Features />
    <FamousTrips />
    <OurMission />
    <TestimonialsSection />
    <Footer />
    </div>
  );
};

export default Landing
