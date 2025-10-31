"use client"
import React from 'react'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Pricing from '@/components/home/Pricing'
import HowItWorks from '@/components/home/HowItWorks'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import EnterpriseSection from '@/components/home/EnterpriseSection'

export const dynamic = 'force-dynamic'

export default function Home() {
  useDocumentTitle(
    'Home',
    'Welcome to the AI Change Management Platform. Discover how our innovative solutions can transform your business processes and drive organizational success.'
  );

  return (
    <React.Fragment>
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <EnterpriseSection />
      <Footer />
    </React.Fragment>
  );
}
