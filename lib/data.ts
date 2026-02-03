import { Data, IInvoiceInput } from '@/types'
import { toSlug } from './utils'

const invoices: IInvoiceInput[] = [
  // Complete dummy invoice with all new fields
  {
    name: 'Complete Plumbing & Electrical Work',
    slug: toSlug('Complete Plumbing & Electrical Work'),
    price: 1250.00,
    
    // Business Address
    businessAddress: {
      houseNumber: '42',
      roadName: 'Business Park Road',
      city: 'London',
      country: 'United Kingdom',
      postCode: 'SW1A 1AA',
    },
    
    // Business Contact Information
    businessContactInformation: {
      firstName: 'John',
      lastName: 'Smith',
      address: {
        houseNumber: '42',
        roadName: 'Business Park Road',
        city: 'London',
        country: 'United Kingdom',
        postCode: 'SW1A 1AA',
      },
      phone: '+44 20 1234 5678',
      email: 'john.smith@business.com',
    },
    
    // Client Information
    clientInformation: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      address: {
        houseNumber: '123',
        roadName: 'Main Street',
        city: 'Manchester',
        country: 'United Kingdom',
        postCode: 'M1 1AB',
      },
      phone: '+44 161 9876 5432',
      email: 'sarah.johnson@email.com',
    },
    
    // Job Address
    jobAddress: {
      houseNumber: '456',
      roadName: 'Work Avenue',
      city: 'Birmingham',
      country: 'United Kingdom',
      postCode: 'B1 2CD',
    },
    
    // Dates
    invoiceDate: new Date('2026-01-25'),
    jobStartDate: new Date('2026-02-01'),
    jobFinishDate: new Date('2026-02-15'),
    
    // Job Items
    jobItems: [
      {
        description: 'Plumbing repair and installation',
        quantity: 2,
        rate: 75.00,
        total: 150.00,
      },
      {
        description: 'Electrical wiring and outlets',
        quantity: 3,
        rate: 100.00,
        total: 300.00,
      },
      {
        description: 'Bathroom fixture installation',
        quantity: 1,
        rate: 200.00,
        total: 200.00,
      },
      {
        description: 'Kitchen sink and faucet installation',
        quantity: 1,
        rate: 150.00,
        total: 150.00,
      },
      {
        description: 'Light fixture installation',
        quantity: 4,
        rate: 50.00,
        total: 200.00,
      },
      {
        description: 'Final inspection and testing',
        quantity: 1,
        rate: 250.00,
        total: 250.00,
      },
    ],
  },
    // Second dummy invoice
  {
    name: 'Kitchen Renovation Project',
    slug: toSlug('Kitchen Renovation Project'),
    price: 3200.00,
    
    businessAddress: {
      houseNumber: '42',
      roadName: 'Business Park Road',
      city: 'London',
      country: 'United Kingdom',
      postCode: 'SW1A 1AA',
    },
    
    businessContactInformation: {
      firstName: 'John',
      lastName: 'Smith',
      address: {
        houseNumber: '42',
        roadName: 'Business Park Road',
        city: 'London',
        country: 'United Kingdom',
        postCode: 'SW1A 1AA',
      },
      phone: '+44 20 1234 5678',
      email: 'john.smith@business.com',
    },
    
    clientInformation: {
      firstName: 'Michael',
      lastName: 'Brown',
      address: {
        houseNumber: '789',
        roadName: 'Oak Tree Lane',
        city: 'Leeds',
        country: 'United Kingdom',
        postCode: 'LS1 3EF',
      },
      phone: '+44 113 5555 1234',
      email: 'michael.brown@email.com',
    },
    
    jobAddress: {
      houseNumber: '789',
      roadName: 'Oak Tree Lane',
      city: 'Leeds',
      country: 'United Kingdom',
      postCode: 'LS1 3EF',
    },
    
    invoiceDate: new Date('2026-01-20'),
    jobStartDate: new Date('2026-01-28'),
    jobFinishDate: new Date('2026-03-15'),
    
    jobItems: [
      {
        description: 'Kitchen cabinet installation',
        quantity: 12,
        rate: 150.00,
        total: 1800.00,
      },
      {
        description: 'Countertop installation',
        quantity: 1,
        rate: 800.00,
        total: 800.00,
      },
      {
        description: 'Appliance installation',
        quantity: 4,
        rate: 100.00,
        total: 400.00,
      },
      {
        description: 'Tiling work',
        quantity: 1,
        rate: 200.00,
        total: 200.00,
      },
    ],
  },
  
  // Third dummy invoice
  {
    name: 'Bathroom Remodeling Service',
    slug: toSlug('Bathroom Remodeling Service'),
    price: 1850.00,
    
    businessAddress: {
      houseNumber: '42',
      roadName: 'Business Park Road',
      city: 'London',
      country: 'United Kingdom',
      postCode: 'SW1A 1AA',
    },
    
    businessContactInformation: {
      firstName: 'John',
      lastName: 'Smith',
      address: {
        houseNumber: '42',
        roadName: 'Business Park Road',
        city: 'London',
        country: 'United Kingdom',
        postCode: 'SW1A 1AA',
      },
      phone: '+44 20 1234 5678',
      email: 'john.smith@business.com',
    },
    
    clientInformation: {
      firstName: 'Emma',
      lastName: 'Wilson',
      address: {
        houseNumber: '321',
        roadName: 'Riverside Drive',
        city: 'Bristol',
        country: 'United Kingdom',
        postCode: 'BS1 4GH',
      },
      phone: '+44 117 7777 8888',
      email: 'emma.wilson@email.com',
    },
    
    jobAddress: {
      houseNumber: '321',
      roadName: 'Riverside Drive',
      city: 'Bristol',
      country: 'United Kingdom',
      postCode: 'BS1 4GH',
    },
    
    invoiceDate: new Date('2026-01-15'),
    jobStartDate: new Date('2026-01-22'),
    jobFinishDate: new Date('2026-02-28'),
    
    jobItems: [
      {
        description: 'Bathroom suite installation',
        quantity: 1,
        rate: 500.00,
        total: 500.00,
      },
      {
        description: 'Shower installation',
        quantity: 1,
        rate: 350.00,
        total: 350.00,
      },
      {
        description: 'Wall tiling',
        quantity: 1,
        rate: 400.00,
        total: 400.00,
      },
      {
        description: 'Floor tiling',
        quantity: 1,
        rate: 300.00,
        total: 300.00,
      },
      {
        description: 'Plumbing and fixtures',
        quantity: 1,
        rate: 300.00,
        total: 300.00,
      },
    ],
  },
  
  // Fourth dummy invoice
  {
    name: 'Roof Repair and Maintenance',
    slug: toSlug('Roof Repair and Maintenance'),
    price: 2750.00,
    
    businessAddress: {
      houseNumber: '42',
      roadName: 'Business Park Road',
      city: 'London',
      country: 'United Kingdom',
      postCode: 'SW1A 1AA',
    },
    
    businessContactInformation: {
      firstName: 'John',
      lastName: 'Smith',
      address: {
        houseNumber: '42',
        roadName: 'Business Park Road',
        city: 'London',
        country: 'United Kingdom',
        postCode: 'SW1A 1AA',
      },
      phone: '+44 20 1234 5678',
      email: 'john.smith@business.com',
    },
    
    clientInformation: {
      firstName: 'David',
      lastName: 'Taylor',
      address: {
        houseNumber: '654',
        roadName: 'Hilltop Road',
        city: 'Sheffield',
        country: 'United Kingdom',
        postCode: 'S1 5IJ',
      },
      phone: '+44 114 2222 3333',
      email: 'david.taylor@email.com',
    },
    
    jobAddress: {
      houseNumber: '654',
      roadName: 'Hilltop Road',
      city: 'Sheffield',
      country: 'United Kingdom',
      postCode: 'S1 5IJ',
    },
    
    invoiceDate: new Date('2026-01-10'),
    jobStartDate: new Date('2026-01-18'),
    jobFinishDate: new Date('2026-02-10'),
    
    jobItems: [
      {
        description: 'Roof tile replacement',
        quantity: 150,
        rate: 8.00,
        total: 1200.00,
      },
      {
        description: 'Gutter cleaning and repair',
        quantity: 1,
        rate: 250.00,
        total: 250.00,
      },
      {
        description: 'Roof insulation installation',
        quantity: 1,
        rate: 600.00,
        total: 600.00,
      },
      {
        description: 'Chimney repair',
        quantity: 1,
        rate: 400.00,
        total: 400.00,
      },
      {
        description: 'Roof inspection and certification',
        quantity: 1,
        rate: 300.00,
        total: 300.00,
      },
    ],
  },
  

]

const data: Data = {
  invoices,
}

export default data