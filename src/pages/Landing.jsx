import React from "react"
import Navbar from "../components/common/Navbar"
import Hero from '../components/landingComponents/Hero'
import Features from "../components/landingComponents/Features";
import FamousTrips from "../components/landingComponents/FamousTrips";
import OurMission from "../components/landingComponents/OurMission";
import TestimonialsSection from "../components/landingComponents/Testimonials";
import { Footer } from "../components/landingComponents/Footer";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";



const Landing = () => {

  const { token } = useAuth();

  if(token){
    Navigate("/dashboard");
  }
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
