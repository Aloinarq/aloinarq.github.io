import { prices, service, site } from '../config';

const lei = (n: number) => `${n.toLocaleString('en-GB')} lei`;
const example = prices.apartmentExampleArea * prices.apartmentPerSquareMetre;

export const en = {
  lang: 'en',
  htmlLang: 'en',
  ogLocale: 'en_GB',
  languageName: 'English',
  skip: 'Skip to content',
  meta: {
    title: 'Plan 1:1 – room scans, measured floor plans and 3D models',
    description:
      'I scan rooms with an iPhone’s LiDAR and deliver a measured floor plan and a 3D model that opens in the browser. For designers, makers, builders and agents in Romania.',
    ogAlt: 'The 3D model of a scanned bedroom, seen from above, next to the name plan 1:1.',
  },
  slugs: { privacy: 'privacy', terms: 'form-terms' },
  ids: {
    what: 'what-you-get',
    fit: 'will-it-fit',
    who: 'who-its-for',
    how: 'how-it-works',
    prices: 'prices',
    about: 'about',
    faq: 'questions',
    contact: 'enquiry',
    designers: 'designers',
    makers: 'kitchen-makers',
    contractors: 'contractors',
    agents: 'real-estate',
    homeowners: 'homeowners',
  },
  nav: {
    label: 'Main',
    menu: 'Menu',
    close: 'Close',
    what: 'What you get',
    who: 'Who it’s for',
    prices: 'Prices',
    faq: 'Questions',
    cta: 'Send an enquiry',
    languages: 'Language',
  },
  hero: {
    lead: 'Rooms scanned with LiDAR and delivered as a measured plan and a 3D model, for designers, makers, builders and agents.',
    videoLabel: 'The 3D model of my bedroom, scanned on 29 October, turning slowly.',
    posterAlt: 'The 3D model of a bedroom seen from above as a dollhouse: bed, wardrobe, dresser and nightstands.',
  },
  what: {
    heading: 'What you get',
    tabsLabel: 'Deliverables',
    items: [
      {
        tab: 'Model',
        title: 'The room in 3D',
        text: 'Each room is rebuilt as a 3D model that opens in a web browser, on a phone or a computer, with nothing to install. See it as a dollhouse, from the top, front or side, or walk through it at eye height.',
        alt: 'The 3D model at eye height: the bed with its channelled headboard, a nightstand and the wardrobe.',
      },
      {
        tab: 'Plan',
        title: 'A plan with m²',
        text: 'A top-down plan with walls, doors, windows and numbered furniture, the overall size and the floor area in m², and a legend with each piece’s dimensions. It is shown on screen; there is no PDF or CAD export yet.',
        alt: 'The floor plan of the bedroom: 4.11 × 3.60 m, about 14.8 m², with numbered furniture and a legend of sizes.',
      },
      {
        tab: 'Measure',
        title: 'A tape in the model',
        text: 'Click two points and read the distance, or lock it to one direction. Select a piece and you see its clearance to the walls and the furniture around it.',
        alt: 'The tape measure in the model: 83.8 cm between the foot of the bed and the dresser.',
      },
      {
        tab: 'Planning',
        title: 'Try it at real size',
        text: 'Add furniture from a catalogue at real dimensions (sofa, desk, bookshelf, rugs, lamps, TVs and more, or a custom size), or a specific product modelled from its published dimensions. Pieces sit on the floor or a wall and stop at the walls. Scanned furniture can be moved, rotated or removed, and doors open and close. Save each arrangement as a named version, with undo, and compare.',
        alt: 'A Samsung 55-inch QN85F placed on the dresser, selected, with its size and its distances to the walls.',
      },
    ],
    primary: 'Send an enquiry',
    secondary: 'See the prices',
  },
  fit: {
    heading: 'Will it fit on the dresser?',
    intro: 'This is the dresser wall of my bedroom, drawn from the scan at scale. Pick a TV and slide it along.',
    sizesLabel: 'TV size',
    sizes: ['43-inch', '55-inch Samsung QN85F', '65-inch', '75-inch'],
    sizeNotes: ['typical size', 'published dimensions', 'typical size', 'typical size'],
    slider: 'Position on the dresser',
    drawingLabel: 'Front view of the dresser wall, with the vanity and mirror on the left, the dresser in the middle and the door on the right.',
    labels: { vanity: 'vanity', mirror: 'mirror', dresser: 'dresser', door: 'door' },
    status: {
      fits: 'It fits.',
      tight: 'It fits, with only {gap} cm to spare next to the {near}.',
      hits: 'It doesn’t fit here: it runs into the {into}.',
    },
    things: { mirror: { near: 'mirror', into: 'mirror' }, door: { near: 'door frame', into: 'door frame' } },
    detail:
      'Panel {w} × {h} cm on a {dresser} cm dresser. Gap to the mirror: {mirror} cm. Gap to the door frame: {door} cm.',
    overhang: 'The panel hangs over the dresser by {left} cm on the left and {right} cm on the right; the stand stays on top.',
    noOverhang: 'The panel sits within the dresser’s width.',
    fallback: 'Centred on the 112 cm dresser, the 55-inch Samsung QN85F (122.8 cm wide) hangs over by about 5 cm on each side and clears the vanity mirror by about a centimetre.',
    note: 'A simplified front view of the 3D model. When the gap is under 5 cm, check it with a tape before you buy.',
    compareHeading: 'The same question in the 3D model, from the bed',
    compare: [
      { caption: 'On the dresser.', alt: 'From the bed: the TV standing on the dresser, the vanity and pink chair on the left, the door on the right.' },
      { caption: 'On the wall, saved as a second version.', alt: 'From the bed: the same TV mounted on the wall above the dresser.' },
    ],
  },
  who: {
    word: 'For',
    heading: 'Who it’s for',
    today: 'Today',
    withScan: 'With a scan',
    groups: [
      {
        key: 'designers',
        name: 'Interior designers and architects',
        today: 'The first visit goes on a tape and a notepad, and the as-built drawing is redrawn before any design work starts.',
        after: 'You have a 3D model and a plan with m² before the first meeting, and you try layouts in 3D in front of the client.',
      },
      {
        key: 'makers',
        name: 'Kitchen, wardrobe and furniture makers',
        today: 'A second trip to check a measurement, and a client who can’t picture how the piece will sit in the room.',
        after: 'You design from the room’s measurements and model, show the client the piece in place, and check the critical dimensions on site before production.',
      },
      {
        key: 'contractors',
        name: 'Renovation contractors',
        today: 'Quotes from photos and a quick walk-through, then the real wall lengths turn up once work has started.',
        after: 'A measured record of the space before work starts: walls, openings and floor area for the quote, and the room as it was.',
      },
      {
        key: 'agents',
        name: 'Real-estate agents and property managers',
        today: 'Listings with a hand sketch or no plan at all, and buyers asking whether their furniture will fit.',
        after: 'A floor plan with m² for the listing, and a 3D model that buyers open from a link.',
      },
      {
        key: 'homeowners',
        name: 'Homeowners and renters',
        today: 'A sofa, wardrobe or TV bought from the shop’s measurements, and the hope that it fits.',
        after: 'You check it first in the 3D model of your own room, at its real size.',
      },
    ],
  },
  how: {
    heading: 'Four steps, one visit',
    steps: [
      { lead: 'First, you send an enquiry.', text: `Tell me which rooms, the city and what you want to decide. Within ${service.replyWorkingDays} working days I reply with a price and a possible date.` },
      { lead: 'Then, a written contract.', text: 'You get a written contract before any work starts; payment is by bank transfer under that contract. It lists the rooms, what you receive, the price and the delivery date.' },
      { lead: 'On the day, the scan visit.', text: `I walk each room with an iPhone Pro. Its LiDAR sensor and Apple’s RoomPlan capture the walls, doors, windows and main furniture, and I take reference photos. Allow about ${service.minutesPerRoomOnSite} minutes per room.` },
      { lead: `Within ${service.deliveryWorkingDays} working days, delivery and planning together.`, text: 'You get a private link to the model and the floor plan. We open it together, place what you are considering, and save each arrangement as a named version.' },
    ],
    contractLabel: 'The first lines of the contract template (in Romanian, the version that is signed).',
    viewsLabel: 'What the scan captures, seen from the top, the front and the side.',
    viewAlts: ['The bedroom model from the top.', 'The bedroom model from the front.', 'The bedroom model from the side.'],
    videoLabel: 'Placing a Samsung 55-inch QN85F from the catalogue onto the dresser, then mounting it on the wall.',
  },
  prices: {
    heading: 'Introductory prices',
    intro: 'A new, one-person service, priced below established 3D tours and measured surveys.',
    groups: [
      {
        name: 'Scans',
        items: [
          { name: 'One room', price: `from ${lei(prices.oneRoom)}`, text: `The scan visit, the room’s 3D model and its floor plan, online for ${service.linkOnlineMonths} months.` },
          { name: 'Whole apartment', price: `from ${prices.apartmentPerSquareMetre} lei per m²`, text: `Every room, at least ${lei(prices.apartmentMinimum)}. ${prices.apartmentExampleArea} m² comes to ${lei(example)}.` },
        ],
      },
      {
        name: 'Extras',
        items: [
          { name: 'Planning help', price: `from ${lei(prices.planningPerRoom)} per room`, text: `I place up to ${prices.planningPiecesPerRoom} pieces you have chosen in the model, specific products modelled from their published dimensions.` },
          { name: 'Travel', price: `included in ${site.city}`, text: `Outside ${site.city}, quoted before you sign.` },
        ],
      },
      {
        name: 'For businesses',
        items: [
          { name: 'Your first room', price: prices.businessFirstRoom === 0 ? 'free' : lei(prices.businessFirstRoom), text: 'One room of your next project, so you can judge the model on real work. One per business.' },
        ],
      },
    ],
    note: 'These are starting prices. The final price is in the contract, before any work starts.',
    photoAlt: 'The 3D model open on a phone, with the TV on the dresser.',
    photoCaption: 'The model on a phone, no app needed.',
  },
  about: {
    heading: 'About',
    photoTodo: site.photo,
    paragraphs: [
      'I’m Levente. I scan rooms with the LiDAR sensor of an iPhone Pro and rebuild each one as a measured floor plan and a 3D model you can open in a browser.',
      'Every picture on this page is my own bedroom, scanned on 29 October and rebuilt in the same viewer you would get.',
      'I work alone, under my own name, not as a company. Before any work we sign a written contract, and you pay by bank transfer under it.',
      'The scan has limits, and I would rather you hear them from me. There is no PDF or CAD export yet, and the scan only sees what the walk-through sees: in my room a balcony behind closed curtains came out as a plain window. So before a scan I open whatever needs to be seen.',
      `I work in Romanian, Hungarian and English, anywhere in Romania, with visits by arrangement.`,
    ],
    signoff: 'Levente',
    role: 'Room scans and 3D models',
  },
  faq: {
    heading: 'Questions before you book',
    items: [
      {
        q: 'How accurate is it?',
        a: 'The room is measured with the iPhone’s LiDAR sensor and Apple’s RoomPlan, which is right for planning furniture and layouts. I don’t quote an accuracy figure. For anything made to the millimetre, such as a worktop or built-in units, check the critical dimensions on site as you would anyway.',
      },
      {
        q: 'How long does a scan take?',
        a: `About ${service.minutesPerRoomOnSite} minutes per room on site, so a three-room apartment is done in well under an hour. The model and plan follow within ${service.deliveryWorkingDays} working days.`,
      },
      {
        q: 'What do I need to do?',
        a: 'Let me in and open what should be seen: curtains, doors, wardrobes if their inside matters. You don’t need to move furniture; it becomes part of the model, and it can be moved or removed there.',
      },
      {
        q: 'What do I receive, and how do I open it?',
        a: `A private link that opens the 3D model and the floor plan in any modern browser, on a phone or a computer, with no app or account. It stays online for ${service.linkOnlineMonths} months. The viewer’s buttons are in English for now, so we go through it together at handover.`,
      },
      {
        q: 'Can I scan the rooms myself?',
        a: 'No. The capture app isn’t public, so I come and do the scan.',
      },
      {
        q: 'How do the contract and payment work?',
        a: 'You get a written contract before any work starts; payment is by bank transfer under that contract. It names the rooms, what you receive, the price and the delivery date, and both of us sign it.',
      },
      {
        q: 'What happens to my scan?',
        a: 'It is yours. I keep it private, use it only for your project, never publish it, and delete it when you ask. The privacy policy has the details.',
      },
      {
        q: 'What is not included?',
        a: 'Outdoor spaces and whole buildings, photoreal renders, CAD, DWG or PDF drawings, a downloadable app, and interior design. The plan and the model show the rooms as they are, for you to plan in.',
      },
    ],
    privacyLink: 'privacy policy',
  },
  contact: {
    heading: 'Tell me about the room',
    sentence: `I reply within ${service.replyWorkingDays} working days with a price and a date. Nothing is booked until we both sign the contract.`,
    fields: {
      name: 'Your name',
      contact: 'Email or phone',
      property: 'Property type',
      propertyOptions: ['Apartment', 'House', 'Office', 'Shop or showroom', 'Other'],
      rooms: 'Number of rooms',
      roomsOptions: ['1', '2', '3', '4', '5', '6 or more'],
      city: 'City',
      message: 'What do you want to decide?',
      messagePlaceholder: 'For example: will a 240 cm corner sofa fit, and where should the TV go?',
      consent: 'I agree that my details are used to answer this enquiry, as set out in the {privacy} and the {terms}.',
      consentPrivacy: 'privacy policy',
      consentTerms: 'form terms',
    },
    submit: 'Send the enquiry',
    sending: 'Sending…',
    sent: 'Thank you. Your enquiry has been sent; I will reply within two working days.',
    error: 'The enquiry could not be sent. Please write to me at {email} instead.',
    notConnected: 'The form is not connected yet ({endpoint}). Please write to {email} or call {phone}.',
    or: 'Or write to me directly:',
    required: 'Required',
  },
  footer: {
    reach: 'Write or call',
    area: `${site.city}, Romania. Visits by arrangement.`,
    sections: 'On this page',
    legal: 'Legal',
    privacy: 'Privacy policy',
    terms: 'Form terms',
    languages: 'Languages',
    line: 'Plan 1:1 is Levente’s own service, offered as a private person in Romania.',
    top: 'Back to top',
  },
  legal: {
    back: 'Back to the home page',
    updated: 'Last updated: 19 November 2026',
  },
  notFound: {
    title: 'This page doesn’t exist',
    text: 'The link may be old or mistyped.',
    home: 'Go to the home page',
  },
};

export type Dict = typeof en;
