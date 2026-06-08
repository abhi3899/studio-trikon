import type { Project, Testimonial } from '../types'

export const seedProjects: Project[] = [
  {
    id: 'p1',
    title: 'Bodakdev Residence',
    category: 'Residential',
    year: '2024',
    location: 'Bodakdev, Ahmedabad',
    area: '4,200 sq ft',
    description:
      'A contemporary family home that draws from the play of light and shadow. Double-height volumes create a sense of vertical space, while warm stone finishes anchor the structure to its landscape. Every room opens to a private courtyard — a nod to the traditional Gujarati pol house.',
    shortDescription: 'Contemporary family home with double-height volumes and a private courtyard.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&q=80',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1400&q=80',
    ],
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    tags: ['Residential', 'Contemporary', 'Courtyard'],
    featured: true,
  },
  {
    id: 'p2',
    title: 'Prahladnagar Studio',
    category: 'Interior',
    year: '2024',
    location: 'Prahladnagar, Ahmedabad',
    area: '1,800 sq ft',
    description:
      'A live-work studio for a textile designer. Raw concrete contrasts with hand-woven textiles and warm teak joinery. Storage is woven into the architecture — every wall does more than one thing. The light shifts dramatically from morning to evening through deep window reveals.',
    shortDescription: 'Live-work studio balancing raw concrete with warm handcrafted materials.',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80',
    ],
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80',
    tags: ['Interior', 'Live-Work', 'Minimal'],
    featured: true,
  },
  {
    id: 'p3',
    title: 'SG Highway Office',
    category: 'Commercial',
    year: '2023',
    location: 'SG Highway, Ahmedabad',
    area: '6,500 sq ft',
    description:
      "A creative office for a product design firm. The brief asked for a space that blurs the line between work and play. Flexible zones shift from deep-focus quiet rooms to open collaboration areas, all tied by a warm amber material palette referencing Gujarat's craft traditions.",
    shortDescription: 'Flexible creative workspace with warm amber tones and adaptable zones.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=80',
      'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1400&q=80',
    ],
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    tags: ['Commercial', 'Office', 'Flexible'],
    featured: true,
  },
  {
    id: 'p4',
    title: 'Nalsarovar Farmhouse',
    category: 'Residential',
    year: '2023',
    location: 'Nalsarovar, Gujarat',
    area: '3,100 sq ft',
    description:
      'A weekend retreat set at the edge of Nalsarovar wetlands. Built from local Dhrangadhra stone with a green roof that disappears into the landscape. Passive cooling strategies eliminate the need for air conditioning entirely — the house breathes through its section.',
    shortDescription: 'Wetland-edge retreat built in local stone with a living green roof.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1400&q=80',
    ],
    coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80',
    tags: ['Residential', 'Sustainable', 'Vernacular'],
    featured: false,
  },
  {
    id: 'p5',
    title: 'Kankaria Café',
    category: 'Commercial',
    year: '2023',
    location: 'Law Garden, Ahmedabad',
    area: '900 sq ft',
    description:
      'A specialty coffee bar near Law Garden where the espresso machine is the altar and everything else recedes. Arched niches, handmade Kutch tiles, and a single dramatic pendant light define the 900 sq ft space. Every material references the craft heritage of Gujarat.',
    shortDescription: 'A devotional coffee bar where every material choice points toward the cup.',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=80',
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=80',
    ],
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80',
    tags: ['Commercial', 'Hospitality', 'Interior'],
    featured: false,
  },
  {
    id: 'p6',
    title: 'Vastrapur Penthouse',
    category: 'Interior',
    year: '2024',
    location: 'Vastrapur, Ahmedabad',
    area: '5,600 sq ft',
    description:
      'A duplex penthouse for a collector of contemporary art. The design acts as a gallery first, home second — white box volumes open onto a terrace garden, and concealed storage keeps every surface quiet. The only colour in the space comes from the art and the sky.',
    shortDescription: "Art-collector's duplex penthouse where architecture recedes behind the work.",
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=1400&q=80',
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1400&q=80',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1400&q=80',
    ],
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=900&q=80',
    tags: ['Interior', 'Luxury', 'Art'],
    featured: false,
  },
]

export const seedTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya & Rahul Shah',
    project: 'Bodakdev Residence',
    quote:
      'Harshada and Shivam understood what we wanted before we could articulate it. They held every constraint — budget, timeline, our chaotic wishlist — with complete calm. We cry a little every time we walk into the living room.',
    role: 'Homeowners',
  },
  {
    id: 't2',
    name: 'Devika Krishnan',
    project: 'Prahladnagar Studio',
    quote:
      "I've been in the studio for a year and it still surprises me — different light, different corners at different times of day. It works exactly as hard as I do.",
    role: 'Textile Designer',
  },
  {
    id: 't3',
    name: 'Arun Mehta',
    project: 'SG Highway Office',
    quote:
      'Our team of 40 moved in and said it felt smaller — meaning it felt human-scaled, not corporate. Output went up 30% in the first quarter. I wish I could attribute that entirely to the architecture.',
    role: 'CEO, Amber Design Co.',
  },
  {
    id: 't4',
    name: 'Sunita & Vikram Patel',
    project: 'Nalsarovar Farmhouse',
    quote:
      "Two years in and we've never turned on the AC. The house breathes on its own. Our kids can identify every migratory bird at the lake now.",
    role: 'Homeowners',
  },
  {
    id: 't5',
    name: 'Nikhil Desai',
    project: 'Kankaria Café',
    quote:
      "Six months after opening we were fully booked on weekends. People come for the coffee and stay for the space. Studio Trikon gave us an identity we didn't know we needed.",
    role: 'Owner, Kankaria Café',
  },
]
