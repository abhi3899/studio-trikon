-- ─────────────────────────────────────────────────────────
-- Studio Trikon — Seed data
-- Run in Supabase SQL Editor to populate demo projects + testimonials
-- ─────────────────────────────────────────────────────────

insert into projects (id, title, category, year, location, area, description, short_description, images, cover_image, tags, featured) values

('p1', 'Bodakdev Residence', 'Residential', '2024', 'Bodakdev, Ahmedabad', '4,200 sq ft',
'A contemporary family home that draws from the play of light and shadow. Double-height volumes create a sense of vertical space, while warm stone finishes anchor the structure to its landscape. Every room opens to a private courtyard — a nod to the traditional Gujarati pol house.',
'Contemporary family home with double-height volumes and a private courtyard.',
ARRAY[
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&q=80',
  'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1400&q=80'
],
'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
ARRAY['Residential','Contemporary','Courtyard'],
true),

('p2', 'Prahladnagar Studio', 'Interior', '2024', 'Prahladnagar, Ahmedabad', '1,800 sq ft',
'A live-work studio for a textile designer. Raw concrete contrasts with hand-woven textiles and warm teak joinery. Storage is woven into the architecture — every wall does more than one thing. The light shifts dramatically from morning to evening through deep window reveals.',
'Live-work studio balancing raw concrete with warm handcrafted materials.',
ARRAY[
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80'
],
'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80',
ARRAY['Interior','Live-Work','Minimal'],
true),

('p3', 'SG Highway Office', 'Commercial', '2023', 'SG Highway, Ahmedabad', '6,500 sq ft',
'A creative office for a product design firm. The brief asked for a space that blurs the line between work and play. Flexible zones shift from deep-focus quiet rooms to open collaboration areas, all tied by a warm amber material palette referencing Gujarat''s craft traditions.',
'Flexible creative workspace with warm amber tones and adaptable zones.',
ARRAY[
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=80',
  'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1400&q=80'
],
'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
ARRAY['Commercial','Office','Flexible'],
true),

('p4', 'Nalsarovar Farmhouse', 'Residential', '2023', 'Nalsarovar, Gujarat', '3,100 sq ft',
'A weekend retreat set at the edge of Nalsarovar wetlands. Built from local Dhrangadhra stone with a green roof that disappears into the landscape. Passive cooling strategies eliminate the need for air conditioning entirely — the house breathes through its section.',
'Wetland-edge retreat built in local stone with a living green roof.',
ARRAY[
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=80',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1400&q=80'
],
'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80',
ARRAY['Residential','Sustainable','Vernacular'],
false),

('p5', 'Kankaria Café', 'Commercial', '2023', 'Law Garden, Ahmedabad', '900 sq ft',
'A specialty coffee bar near Law Garden where the espresso machine is the altar and everything else recedes. Arched niches, handmade Kutch tiles, and a single dramatic pendant light define the 900 sq ft space. Every material references the craft heritage of Gujarat.',
'A devotional coffee bar where every material choice points toward the cup.',
ARRAY[
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=80',
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=80'
],
'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80',
ARRAY['Commercial','Hospitality','Interior'],
false),

('p6', 'Vastrapur Penthouse', 'Interior', '2024', 'Vastrapur, Ahmedabad', '5,600 sq ft',
'A duplex penthouse for a collector of contemporary art. The design acts as a gallery first, home second — white box volumes open onto a terrace garden, and concealed storage keeps every surface quiet. The only colour in the space comes from the art and the sky.',
'Art-collector''s duplex penthouse where architecture recedes behind the work.',
ARRAY[
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=1400&q=80',
  'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1400&q=80',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1400&q=80'
],
'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=900&q=80',
ARRAY['Interior','Luxury','Art'],
false);


insert into testimonials (id, name, project, quote, role) values

('t1', 'Priya & Rahul Shah', 'Bodakdev Residence',
'Harshada and Shivam understood what we wanted before we could articulate it. They held every constraint — budget, timeline, our chaotic wishlist — with complete calm. We cry a little every time we walk into the living room.',
'Homeowners'),

('t2', 'Devika Krishnan', 'Prahladnagar Studio',
'I''ve been in the studio for a year and it still surprises me — different light, different corners at different times of day. It works exactly as hard as I do.',
'Textile Designer'),

('t3', 'Arun Mehta', 'SG Highway Office',
'Our team of 40 moved in and said it felt smaller — meaning it felt human-scaled, not corporate. Output went up 30% in the first quarter. I wish I could attribute that entirely to the architecture.',
'CEO, Amber Design Co.'),

('t4', 'Sunita & Vikram Patel', 'Nalsarovar Farmhouse',
'Two years in and we''ve never turned on the AC. The house breathes on its own. Our kids can identify every migratory bird at the lake now.',
'Homeowners'),

('t5', 'Nikhil Desai', 'Kankaria Café',
'Six months after opening we were fully booked on weekends. People come for the coffee and stay for the space. Studio Trikon gave us an identity we didn''t know we needed.',
'Owner, Kankaria Café');
