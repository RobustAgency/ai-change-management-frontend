"use client";
import React from 'react';
import Footer from '@/components/home/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Pricing from '@/components/home/Pricing';
import HowItWorks from '@/components/home/HowItWorks';
import EnterpriseSection from '@/components/home/EnterpriseSection';
import AiProcessFlow from '@/components/home/AiProcessFlow';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <HowItWorks />
      <AiProcessFlow />
      <Features />
      <Pricing />
      <EnterpriseSection />
    </React.Fragment>
  );
}
