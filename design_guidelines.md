# Design Guidelines: Website Komplek Perumahan

## Design Approach
**Reference-Based Approach** - Drawing inspiration from premium real estate platforms like Airbnb (for property showcasing), combined with clean corporate website aesthetics. The design emphasizes property imagery, clear information hierarchy, and straightforward navigation fitting for Indonesian property market expectations.

## Core Design Principles
1. **Clean & Professional**: Minimalist layouts with generous whitespace
2. **Property-Focused**: Large, high-quality property images as focal points
3. **Trust-Building**: Clear information presentation with emphasis on credibility
4. **Easy Navigation**: Smooth scrolling with visible section anchors

## Typography System
**Primary Font**: Google Sans (all weights)
- **Hero Headlines**: font-bold text-5xl md:text-6xl lg:text-7xl
- **Section Titles**: font-bold text-3xl md:text-4xl lg:text-5xl
- **Subsection Titles**: font-semibold text-2xl md:text-3xl
- **Body Text**: font-normal text-base md:text-lg leading-relaxed
- **Small Text/Captions**: font-normal text-sm md:text-base

## Layout System
**Spacing Units**: Consistent use of Tailwind units 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 md:py-20 lg:py-24
- Container margins: px-6 md:px-8 lg:px-12
- Element gaps: gap-6 md:gap-8 lg:gap-12
- Card padding: p-6 md:p-8

**Container Strategy**:
- Full-width sections with inner max-w-7xl mx-auto
- Content max-width: max-w-6xl for text-heavy sections
- Grid layouts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Component Library

### Navigation
- Fixed header with logo, navigation menu, and CTA button
- Smooth scroll navigation to sections
- Mobile: Hamburger menu with slide-in drawer
- Desktop: Horizontal menu items with subtle hover underline

### Hero Section
- Full-viewport height (min-h-screen) with property hero image
- Overlay gradient for text legibility
- Promotional banner/badge highlighting discount voucher
- Primary CTA button with backdrop-blur background
- Scrolling indicator at bottom

### Beranda (Home) Section
- Quick navigation cards (4-6 cards) in grid layout
- Icon-title-description pattern with hover lift effect
- Cards: rounded-2xl with subtle shadow, p-8

### Tentang Kami (About) Section
- Two-column layout: Text content + Masterplan/site map image
- Bulleted list of keunggulan (advantages)
- Company credentials and timeline if applicable

### Tipe Unit (Unit Types) Section
- Property card grid (2-3 columns desktop)
- Each card: Large property image, unit type name, specifications (luas tanah/bangunan, kamar tidur/mandi), price range
- Cards with rounded-xl borders and hover scale effect (scale-105)

### Fasilitas (Facilities) Section
- Icon grid showcasing amenities (6-12 items)
- Simple icon-label layout in 3-4 columns
- Grouped by category if many facilities

### Lokasi (Location) Section
- Embedded Google Maps iframe (aspect-video)
- Address and accessibility information
- Nearby landmarks list

### Kontak (Contact) Section
- Two-column: Contact form + Company information
- Form fields: Nama, Email, No. Telepon, Pesan
- Company details: Address, phone, email, office hours, social media links

### Footer
- Three-column layout: Company info, Quick links, Social media
- Copyright and developer credits

## Images Strategy
**Hero Image**: Large, high-quality photograph of the housing complex (aerial view or main gate/entrance preferred)
**Property Images**: Professional photography for each unit type showing exterior and key features
**Masterplan**: Site layout/map showing lot divisions and facilities placement
**Facilities**: Icon illustrations or small photos representing each amenity
**Location Map**: Embedded interactive Google Maps

## Interaction Patterns
- Smooth scroll behavior between sections
- Cards: Subtle hover lift (translate-y-1 + shadow enhancement)
- Buttons: Standard hover states without custom overlays
- Form inputs: Focus ring with brand color
- Mobile menu: Slide-in animation from right

## Responsive Strategy
- Mobile-first approach
- Stack columns to single column on mobile
- Hero text sizing scales down appropriately
- Touch-friendly tap targets (min 44px)
- Hamburger navigation below md breakpoint

## Accessibility
- Semantic HTML structure (header, nav, main, section, footer)
- ARIA labels for interactive elements
- Sufficient color contrast for readability
- Focus indicators for keyboard navigation
- Alt text for all property images