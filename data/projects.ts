export type Project = {
  slug: string
  title: string // header
  description: string
  date?: string
  location?: string
  picture?: string // image URL
  url?: string
  repository?: string
  published: boolean
  body: {
    code: string
  }
}

export const allProjects: Project[] = [
  // Featured project
  {
    slug: 'haslemere-avenue-rear-extension',
    title: 'Haslemere Avenue Rear Extension',
    description:
      'When space is precious, the right design will make all the difference! This rear extension focuses on the kitchen – one of the most frequently used areas within the home. By extending into the garden with a high, vaulted pitched roof to add considerable volume, the space feels generous and airy. A simple, clean design complete with skylights makes it the perfect space to gather and entertain guests. The flat roof creates a contemporary canvas to feature the three triple-glazed skylights, creating a space where traditional design meets modern chic.',
    date: '2023-07-01',
    location: 'South West London',
    picture:
      'https://images.squarespace-cdn.com/content/v1/5da9d8dac27be961d4b5750c/c73dcbf2-f111-4db6-847c-117519239d94/Project+1+%282%29-min.jpg?format=2500w',
    published: true,
    body: {
      code: `# Haslemere Avenue Rear Extension

This rear extension project maximised living space by extending into the garden with a high, vaulted pitched roof. The design features bi-folding doors to create a seamless connection between indoor and outdoor spaces, making it perfect for entertaining.

## Key Features
- Vaulted pitched roof with triple-glazed skylights
- Bi-folding doors for indoor-outdoor living
- Contemporary design with traditional elements
- Multi-purpose living, dining and entertaining space`,
    },
  },
  
  // Second project
  {
    slug: 'victorian-terrace-kitchen-renovation',
    title: 'Victorian Terrace Kitchen Renovation',
    description:
      'A complete kitchen transformation in a Victorian terrace property. This project involved removing internal walls to create an open-plan kitchen-dining area, installing bespoke cabinetry, and integrating modern appliances while preserving the property\'s period character. The result is a stunning contemporary kitchen that respects the building\'s heritage.',
    date: '2023-09-15',
    location: 'Manchester',
    picture:
      'https://images.squarespace-cdn.com/content/v1/5da9d8dac27be961d4b5750c/c73dcbf2-f111-4db6-847c-117519239d94/Project+1+%282%29-min.jpg?format=2500w',
    published: true,
    body: {
      code: `# Victorian Terrace Kitchen Renovation

Complete kitchen transformation combining modern functionality with period character. The project involved structural work to create an open-plan space while maintaining the property's Victorian charm.

## Project Details
- Structural wall removal and reinforcement
- Bespoke kitchen cabinetry installation
- Period-appropriate flooring and finishes
- Modern appliance integration`,
    },
  },
  
  // Third project
  {
    slug: 'luxury-bathroom-suite-installation',
    title: 'Luxury Bathroom Suite Installation',
    description:
      'A high-end bathroom renovation featuring premium fixtures, underfloor heating, and bespoke tiling. This project transformed a dated bathroom into a luxurious spa-like retreat with attention to detail in every aspect, from the walk-in shower to the freestanding bathtub.',
    date: '2023-11-20',
    location: 'Bristol',
    picture:
      'https://images.squarespace-cdn.com/content/v1/5da9d8dac27be961d4b5750c/c73dcbf2-f111-4db6-847c-117519239d94/Project+1+%282%29-min.jpg?format=2500w',
    published: true,
    body: {
      code: `# Luxury Bathroom Suite Installation

Premium bathroom renovation creating a spa-like retreat with high-end fixtures and finishes. The project focused on luxury and comfort while maintaining practical functionality.

## Features
- Walk-in shower with rainfall head
- Freestanding bathtub installation
- Underfloor heating system
- Premium tiling and finishes`,
    },
  },
  
  {
    slug: 'loft-conversion-family-home',
    title: 'Loft Conversion for Growing Family',
    description:
      'Converting unused loft space into a bright, functional master bedroom with ensuite bathroom. This project added significant value and living space to a family home, featuring dormer windows for maximum light and headroom, and careful attention to insulation and soundproofing.',
    date: '2023-05-10',
    location: 'Leeds',
    picture:
      'https://dunsterhouse.co.uk/wp-content/uploads/2024/05/Addroom-Modular-5025-SD-F-White-Day.webp',
    published: true,
    body: {
      code: `# Loft Conversion for Growing Family

Transforming unused attic space into a beautiful master suite with ensuite bathroom. The conversion maximises natural light and creates valuable additional living space.

## Project Scope
- Dormer window installation
- Structural reinforcement
- Master bedroom and ensuite creation
- High-quality insulation and soundproofing`,
    },
  },
  
  {
    slug: 'commercial-office-refurbishment',
    title: 'Commercial Office Refurbishment',
    description:
      'Complete refurbishment of a 2,000 sq ft office space including new partition walls, modern lighting systems, HVAC upgrades, and contemporary finishes. The project was completed on schedule with minimal disruption to business operations.',
    date: '2023-08-05',
    location: 'Birmingham',
    picture:
      'https://images.squarespace-cdn.com/content/v1/5da9d8dac27be961d4b5750c/c73dcbf2-f111-4db6-847c-117519239d94/Project+1+%282%29-min.jpg?format=2500w',
    published: true,
    body: {
      code: `# Commercial Office Refurbishment

Modern office space transformation with focus on functionality and employee wellbeing. The refurbishment created a contemporary, efficient workspace.

## Key Elements
- Partition wall installation
- Modern LED lighting systems
- HVAC system upgrades
- Contemporary finishes and branding`,
    },
  },
  
  {
    slug: 'period-property-restoration',
    title: 'Period Property Restoration',
    description:
      'Comprehensive restoration of a Grade II listed Victorian property, including roof repairs, sash window restoration, period-appropriate plasterwork, and careful preservation of original features. This project required close collaboration with conservation officers to maintain historical integrity.',
    date: '2023-04-18',
    location: 'South West London',
    picture:
      'https://plusrooms.co.uk/wp-content/uploads/2021/02/IMG_9407-2048x1365.webp',
    published: true,
    body: {
      code: `# Period Property Restoration

Sensitive restoration of a Grade II listed Victorian property, preserving historical character while ensuring modern comfort and functionality.

## Restoration Work
- Roof and chimney repairs
- Sash window restoration
- Period-appropriate plasterwork
- Original feature preservation`,
    },
  },
  
  {
    slug: 'garden-room-office-construction',
    title: 'Garden Room Office Construction',
    description:
      'Construction of a bespoke garden office with full insulation, electrical installation, and bi-folding doors. This standalone structure provides a quiet workspace separate from the main house, with modern amenities and natural light throughout.',
    date: '2023-10-12',
    location: 'Sheffield',
    picture:
      'https://images.squarespace-cdn.com/content/v1/5da9d8dac27be961d4b5750c/c73dcbf2-f111-4db6-847c-117519239d94/Project+1+%282%29-min.jpg?format=2500w',
    published: true,
    body: {
      code: `# Garden Room Office Construction

Bespoke standalone garden office providing a dedicated workspace with modern amenities and excellent natural light.

## Construction Details
- Fully insulated structure
- Electrical installation and lighting
- Bi-folding doors for natural light
- Weatherproof and secure design`,
    },
  },
  
  {
    slug: 'roof-replacement-and-insulation',
    title: 'Complete Roof Replacement and Insulation',
    description:
      'Full roof replacement on a 1930s semi-detached property, including new tiles, guttering, insulation upgrade, and chimney repairs. The project significantly improved energy efficiency and resolved long-standing leaks, while maintaining the property\'s original character.',
    date: '2023-06-22',
    location: 'Liverpool',
    picture:
      'https://images.squarespace-cdn.com/content/v1/5da9d8dac27be961d4b5750c/c73dcbf2-f111-4db6-847c-117519239d94/Project+1+%282%29-min.jpg?format=2500w',
    published: true,
    body: {
      code: `# Complete Roof Replacement and Insulation

Comprehensive roof replacement project improving energy efficiency and resolving structural issues while preserving period character.

## Work Completed
- Full roof tile replacement
- Guttering and downpipe installation
- Insulation upgrade
- Chimney repair and pointing`,
    },
  },
  
  {
    slug: 'basement-conversion-cinema-room',
    title: 'Basement Conversion to Cinema Room',
    description:
      'Converting an unused basement into a luxury home cinema with soundproofing, climate control, and custom lighting. This project required careful waterproofing and structural considerations to create a comfortable, high-quality entertainment space.',
    date: '2023-12-08',
    location: 'London',
    picture:
      'https://images.squarespace-cdn.com/content/v1/5da9d8dac27be961d4b5750c/c73dcbf2-f111-4db6-847c-117519239d94/Project+1+%282%29-min.jpg?format=2500w',
    published: true,
    body: {
      code: `# Basement Conversion to Cinema Room

Transforming unused basement space into a luxury home cinema with professional-grade soundproofing and climate control.

## Conversion Features
- Professional soundproofing
- Climate control system
- Custom lighting installation
- Waterproofing and damp proofing`,
    },
  },
  
  {
    slug: 'extension-and-conservatory-removal',
    title: 'Extension and Conservatory Replacement',
    description:
      'Removing an old, inefficient conservatory and replacing it with a high-quality extension featuring proper insulation, underfloor heating, and large glazed doors. The new space provides year-round usability and significantly improves the property\'s energy efficiency.',
    date: '2023-03-14',
    location: 'Nottingham',
    picture:
      'https://images.squarespace-cdn.com/content/v1/5da9d8dac27be961d4b5750c/c73dcbf2-f111-4db6-847c-117519239d94/Project+1+%282%29-min.jpg?format=2500w',
    published: true,
    body: {
      code: `# Extension and Conservatory Replacement

Replacing an inefficient conservatory with a properly insulated extension that can be used year-round.

## Project Highlights
- Old conservatory removal
- New extension construction
- Underfloor heating installation
- Large glazed doors for natural light`,
    },
  },
  
  {
    slug: 'property-maintenance-and-repairs',
    title: 'Comprehensive Property Maintenance',
    description:
      'Ongoing maintenance contract for a portfolio of rental properties, including regular inspections, emergency repairs, and planned maintenance. This project ensures all properties remain in excellent condition and compliant with safety regulations.',
    date: '2023-01-30',
    location: 'Multiple Locations',
    picture:
      'https://images.squarespace-cdn.com/content/v1/5da9d8dac27be961d4b5750c/c73dcbf2-f111-4db6-847c-117519239d94/Project+1+%282%29-min.jpg?format=2500w',
    published: true,
    body: {
      code: `# Comprehensive Property Maintenance

Ongoing maintenance service ensuring properties remain in excellent condition and compliant with all regulations.

## Services Provided
- Regular property inspections
- Emergency repair response
- Planned maintenance scheduling
- Safety compliance checks`,
    },
  },
]