"use client"
import React from 'react'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Pricing from '@/components/home/Pricing'
import HowItWorks from '@/components/home/HowItWorks'

export const runtime = "edge";

export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <HowItWorks/>
      <Features />
      <Pricing />
      <Footer />
    </React.Fragment>
  );
}
