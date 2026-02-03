import Link from 'next/link'
import React from 'react'
import { Navigation } from './components/nav'
import { Building2, Hammer, Wrench, Shield } from 'lucide-react'
import Hero from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import Cta from './components/Cta'

const services = [
  {
    name: 'Construction Management',
    description:
      'Expert oversight of your construction projects from planning to completion.',
    icon: Hammer as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    name: 'Property Maintenance',
    description:
      'Comprehensive maintenance services to keep your properties in top condition.',
    icon: Wrench as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    name: 'Building Services',
    description:
      'Full-service building management solutions tailored to your needs.',
    icon: Building2 as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
  {
    name: 'Quality Assurance',
    description:
      'Rigorous quality control ensuring the highest standards in every project.',
    icon: Shield as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  },
]

const features = [
  'Professional project management',
  'Experienced team of specialists',
  'Quality craftsmanship guaranteed',
  'Timely project completion',
  'Competitive pricing',
  '24/7 support available',
]

export default function Home() {
  return (
    <div className='relative min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900'>
      <Navigation />
      <Hero />
      <Services services={services} />
      <Features features={features} />
      <Cta />
    </div>
  )
}
