import { getAssetUrl } from "../utils/asset";

export interface PortfolioCreature {
  id: string;
  slug: string;
  title: string;
  year: string;
  status: string;
  category: string;
  thumb: string;
  full: string;
  images: string[];
  description: string;
  materials: string[];
  dimensions: string;
}

const RAW_PORTFOLIO_CREATURES: PortfolioCreature[] = [
  {
    "id": "28",
    "slug": "mickeys",
    "title": "Mickey's",
    "year": "2020",
    "status": "Available",
    "category": "Cyber-Baby Assemblage",
    "thumb": "/img/portfolio/28-thumbnail.jpg",
    "full": "/img/portfolio/28-full.jpg",
    "images": [
      "/img/portfolio/28-full.jpg",
      "/img/portfolio/28a-full.jpeg",
      "/img/portfolio/28b-full.jpeg",
      "/img/portfolio/28b-full.jpg",
      "/img/portfolio/28c-full.jpeg",
      "/img/portfolio/28c-full.jpg",
      "/img/portfolio/28d-full.jpeg",
      "/img/portfolio/28d-full.jpg",
      "/img/portfolio/28e-full.jpeg",
      "/img/portfolio/28e-full.jpg",
      "/img/portfolio/28f-full.jpeg",
      "/img/portfolio/28f-full.jpg",
      "/img/portfolio/28g-full.jpg",
      "/img/portfolio/28h-full.jpg",
      "/img/portfolio/28i-full.jpeg",
      "/img/portfolio/28i-full.jpg",
      "/img/portfolio/28j-full.jpeg"
    ],
    "description": "A monumental centerpiece of Olivier Pauwels\u2019 iconic C-Baby series. Featuring iconic curved ear silhouetted armatures, porcelain infant gaze, industrial vacuum manifold assemblies, and clockwork precision gears.",
    "materials": [
      "Salvaged porcelain infant doll",
      "Decommissioned aircraft manifold",
      "1940s brass ignition dials",
      "Steel gear assemblages",
      "Hand-patinated zinc rivets"
    ],
    "dimensions": "68 x 45 x 42 cm"
  },
  {
    "id": "27",
    "slug": "porsche-felca-gt",
    "title": "Porsche Felca GT",
    "year": "2020",
    "status": "Acquired",
    "category": "Kinetic Vehicular Sculpture",
    "thumb": "/img/portfolio/27-thumbnail.jpg",
    "full": "/img/portfolio/27-full.jpg",
    "images": [
      "/img/portfolio/27-full.jpg",
      "/img/portfolio/27a-full.jpg",
      "/img/portfolio/27b-full.jpg",
      "/img/portfolio/27c-full.jpg",
      "/img/portfolio/27d-full.jpg",
      "/img/portfolio/27e-full.jpg",
      "/img/portfolio/27f-full.jpg"
    ],
    "description": "An aggressive, high-velocity biomechanical racer integrating vintage automotive transmission gearing, exposed throttle linkages, and hand-beaten aluminum panels.",
    "materials": [
      "Vintage automotive pistons",
      "Felca chronograph casings",
      "Hand-turned brass axles",
      "Tempered iron spring coils"
    ],
    "dimensions": "84 x 36 x 32 cm"
  },
  {
    "id": "26",
    "slug": "bronze-mickeys",
    "title": "Bronze Mickey's",
    "year": "2020",
    "status": "Available",
    "category": "Cast Bronze & Mechanical Core",
    "thumb": "/img/portfolio/26-thumbnail.jpg",
    "full": "/img/portfolio/26a-full.jpeg",
    "images": [
      "/img/portfolio/26a-full.jpeg",
      "/img/portfolio/26b-full.jpeg"
    ],
    "description": "A rare lost-wax cast bronze edition exploring pop-cultural iconography infused with internal industrial mechanisms, exposed balance wheels, and aged verdigris patina.",
    "materials": [
      "Cast bronze with acid patina",
      "Industrial brass cogs",
      "Surgical steel pins",
      "Cast iron display plinth"
    ],
    "dimensions": "46 x 32 x 28 cm"
  },
  {
    "id": "25",
    "slug": "jaguar-neufunk",
    "title": "Jaguar Neufunk",
    "year": "2019",
    "status": "Acquired",
    "category": "Biomechanical Hybrid",
    "thumb": "/img/portfolio/25-thumbnail.jpg",
    "full": "/img/portfolio/25-full.jpg",
    "images": [
      "/img/portfolio/25-full.jpg",
      "/img/portfolio/25a-full.jpeg",
      "/img/portfolio/25b-full.jpeg",
      "/img/portfolio/25c-full.jpeg",
      "/img/portfolio/25d-full.jpeg"
    ],
    "description": "Constructed around a decommissioned radio transmitter chassis and antique automobile radiator components, presenting a ferocious, predatory aerodynamic stance.",
    "materials": [
      "Vacuum tube radio housings",
      "Radiator copper mesh",
      "Polished steel steering knuckles",
      "Wired cockpit indicators"
    ],
    "dimensions": "76 x 40 x 38 cm"
  },
  {
    "id": "24",
    "slug": "blue-pilot",
    "title": "Blue Pilot",
    "year": "2018",
    "status": "Available",
    "category": "Space Probe & Lunar Lander",
    "thumb": "/img/portfolio/24-thumbnail.jpg",
    "full": "/img/portfolio/24-full.jpg",
    "images": [
      "/img/portfolio/24-full.jpg",
      "/img/portfolio/24a-full.jpg",
      "/img/portfolio/24b-full.jpg",
      "/img/portfolio/24c-full.jpg",
      "/img/portfolio/24d-full.jpg",
      "/img/portfolio/24e-full.jpg"
    ],
    "description": "A series of futuristic planetary landers and orbital satellite assemblages showcased in neon acrylic vitrines and high-pigment blue surfaces, incorporating polished metallic domes, antenna masts, and articulated landing struts.",
    "materials": [
      "Fluorescent acrylic vitrine",
      "Spun stainless steel domes",
      "Telescopic brass antenna array",
      "Articulated landing leg struts",
      "Aviation cockpit viewport lenses"
    ],
    "dimensions": "45 x 45 x 50 cm"
  },
  {
    "id": "23",
    "slug": "marsdiver-ii",
    "title": "Marsdiver II",
    "year": "2018",
    "status": "Acquired",
    "category": "Deep-Space Atmospheric Walker",
    "thumb": "/img/portfolio/23-thumbnail.jpg",
    "full": "/img/portfolio/23-full.jpg",
    "images": [
      "/img/portfolio/23-full.jpg",
      "/img/portfolio/23a-full.jpg"
    ],
    "description": "An atmospheric deep-exploration biped created with vintage deep-sea brass dive helmets, aviation high-pressure breathing hoses, and articulated walker legs.",
    "materials": [
      "Brass pressure chamber fixtures",
      "High-pressure rubber/braided steel hoses",
      "Cast aluminum joint knuckles",
      "Aircraft cockpit tachometers"
    ],
    "dimensions": "92 x 52 x 48 cm"
  },
  {
    "id": "22",
    "slug": "c-baby-binoculairejet",
    "title": "C-Baby Binoculairejet",
    "year": "2017",
    "status": "Acquired",
    "category": "Cyberjet Cockpit Assemblage",
    "thumb": "/img/portfolio/22-thumbnail.jpg",
    "full": "/img/portfolio/22-full.jpg",
    "images": [
      "/img/portfolio/22-full.jpg",
      "/img/portfolio/22a-full.jpg",
      "/img/portfolio/22b-full.jpg",
      "/img/portfolio/22c-full.jpg"
    ],
    "description": "An acclaimed masterwork from the international museum tour. An infant face ensconced within a jet-powered flight apparatus with twin binocular optic sights.",
    "materials": [
      "Twin brass optical prisms",
      "Vintage typewriter armatures",
      "Aviation combustion nozzles",
      "Porcelain doll molding"
    ],
    "dimensions": "52 x 45 x 42 cm"
  },
  {
    "id": "21",
    "slug": "soviet-stealth-bomber-studies",
    "title": "Soviet Stealth Bomber & Studies",
    "year": "2015-2016",
    "status": "Acquired",
    "category": "Technical Assemblage Plates",
    "thumb": "/img/portfolio/21-thumbnail.jpg",
    "full": "/img/portfolio/21-full.jpg",
    "images": [
      "/img/portfolio/21-full.jpg",
      "/img/portfolio/21a-full.jpg",
      "/img/portfolio/21b-full.jpg",
      "/img/portfolio/21c-full.jpg",
      "/img/portfolio/21d-full.jpg",
      "/img/portfolio/21e-full.jpg"
    ],
    "description": "Master technical plates and mixed-media wall assemblages detailing Soviet stealth prototypes, Horten 38 bombers, and Pancake Mig 39 assemblies with embedded avionics, illuminated warning components, and graphite schematics.",
    "materials": [
      "Industrial graph-paper drafting board",
      "Soviet red star insignia & warning placards",
      "Decommissioned aircraft instruments & wiring harness",
      "Hand-rendered technical drafting & sepia washes",
      "Aluminum cowling plates"
    ],
    "dimensions": "115 x 75 cm"
  },
  {
    "id": "20",
    "slug": "torpedorider",
    "title": "Torpedorider",
    "year": "2016",
    "status": "Acquired",
    "category": "Sub-Aquatic High-Velocity Unit",
    "thumb": "/img/portfolio/20-thumbnail.jpg",
    "full": "/img/portfolio/20-full.jpg",
    "images": [
      "/img/portfolio/20-full.jpg",
      "/img/portfolio/20a-full.jpg"
    ],
    "description": "A streamlined marine projectile vessel piloted by an integrated cybernetic android, exploring aquatic speed records and hydrodynamic mechanics.",
    "materials": [
      "Decommissioned brass torpedo casing",
      "Propeller drive shafts",
      "Hydraulic fluid reservoirs",
      "Pressure dials"
    ],
    "dimensions": "105 x 30 x 28 cm"
  },
  {
    "id": "19",
    "slug": "marchal-m12",
    "title": "Marchal M12",
    "year": "2016",
    "status": "Acquired",
    "category": "Vintage Headlamp Aero-Cruiser",
    "thumb": "/img/portfolio/19-thumbnail.jpg",
    "full": "/img/portfolio/19-full.jpg",
    "images": [
      "/img/portfolio/19-full.jpg",
      "/img/portfolio/19a-full.jpg"
    ],
    "description": "Built around a monumental 1930s Marchal cat-eye automotive headlamp, complete with fluted Fresnel lens and rear jet propulsion fins.",
    "materials": [
      "1930s Marchal glass headlamp lens",
      "Spun aluminum nacelle",
      "Hand-bent exhaust manifolds",
      "Gilded gear trains"
    ],
    "dimensions": "62 x 40 x 36 cm"
  },
  {
    "id": "18",
    "slug": "manta-mig",
    "title": "Manta-Mig",
    "year": "2016",
    "status": "Acquired",
    "category": "Marine Jet Hybrid",
    "thumb": "/img/portfolio/18-thumbnail.jpg",
    "full": "/img/portfolio/18-full.jpg",
    "images": [
      "/img/portfolio/18-full.jpg",
      "/img/portfolio/18a-full.jpg",
      "/img/portfolio/18b-full.jpg"
    ],
    "description": "An organic silhouette mimicking the sweeping wings of a giant oceanic manta ray, merged seamlessly with the air intakes and turbine fans of a MIG fighter jet.",
    "materials": [
      "Beaten industrial vent hoods",
      "Turbine rotor blades",
      "Oxidized zinc sheet plating",
      "Fighter jet instruments"
    ],
    "dimensions": "72 x 65 x 30 cm"
  },
  {
    "id": "17",
    "slug": "v8-hoover-plymouth",
    "title": "V8 Hoover Plymouth",
    "year": "2014",
    "status": "Acquired",
    "category": "Vintage Vacuum Combustion Racer",
    "thumb": "/img/portfolio/17-thumbnail.jpg",
    "full": "/img/portfolio/17-full.jpg",
    "images": [
      "/img/portfolio/17-full.jpg",
      "/img/portfolio/17a-full.jpg",
      "/img/portfolio/17b-full.jpg",
      "/img/portfolio/17c-full.jpg"
    ],
    "description": "A tour de force of repurposed industrial archaeology: a 1950s Hoover vacuum cleaner housing reimagined as a ground-effect racing trike powered by an exposed V8 engine and adorned with an authentic Plymouth sailing ship mascot and racing number 74.",
    "materials": [
      "1950s Hoover vacuum cleaner housing & emblem",
      "Authentic Plymouth chrome mascot hood ornament",
      "Exposed V8 engine block, velocity stacks & spark cabling",
      "Twin vintage chrome incandescent headlights",
      "Hand-patinated olive & ivory racing fairing with racing #74",
      "Porcelain infant pilot with leather aviator helmet & goggles"
    ],
    "dimensions": "78 x 42 x 34 cm"
  },
  {
    "id": "16",
    "slug": "sub-zero-u-0",
    "title": "Sub-Zero U-0",
    "year": "2015",
    "status": "Acquired",
    "category": "Arctic Submersible Walker",
    "thumb": "/img/portfolio/16-thumbnail.jpg",
    "full": "/img/portfolio/16-full.jpg",
    "images": [
      "/img/portfolio/16-full.jpg",
      "/img/portfolio/16a-full.jpg",
      "/img/portfolio/16b-full.jpg",
      "/img/portfolio/16c-full.jpg"
    ],
    "description": "Engineered to withstand deep abyssal cold. Features a reinforced spherical viewport, articulated tread stabilizers, and copper refrigeration conduits.",
    "materials": [
      "Heavy cast iron pressure sphere",
      "Submarine ballast valves",
      "Brass cooling coils",
      "Industrial chain links"
    ],
    "dimensions": "64 x 48 x 40 cm"
  },
  {
    "id": "15",
    "slug": "concept-drawings-and-studies",
    "title": "Concept Drawings & Studies",
    "year": "2014-2016",
    "status": "Available",
    "category": "Original Ink & Graphite Plates",
    "thumb": "/img/portfolio/15-thumbnail.jpg",
    "full": "/img/portfolio/15-full.jpg",
    "images": [
      "/img/portfolio/15-full.jpg",
      "/img/portfolio/15a-full.jpg",
      "/img/portfolio/15b-full.jpg",
      "/img/portfolio/15c-full.jpg"
    ],
    "description": "Rare original studio master drawings detailing the internal mechanics, anatomical bone-to-steel joints, and hydraulic schematics for Pauwels\u2019 sculptures.",
    "materials": [
      "Archival rag paper",
      "India ink & Sepia wash",
      "Graphite pencil notations",
      "Custom steel museum frame"
    ],
    "dimensions": "50 x 70 cm"
  },
  {
    "id": "14",
    "slug": "guestronauts",
    "title": "Guestronauts",
    "year": "2013-2014",
    "status": "Available",
    "category": "Interplanetary Travelers",
    "thumb": "/img/portfolio/14-thumbnail.jpg",
    "full": "/img/portfolio/14-full.jpg",
    "images": [
      "/img/portfolio/14-full.jpg",
      "/img/portfolio/14a-full.jpg",
      "/img/portfolio/14b-full.jpg"
    ],
    "description": "A charming and eerie pair of cybernetic explorers equipped with modular backpacks, atmospheric filtration units, and spherical observation helms.",
    "materials": [
      "Vintage brass gas mask fittings",
      "Leather pilot flight straps",
      "Clockwork propulsion hubs",
      "Glass vacuum envelopes"
    ],
    "dimensions": "55 x 38 x 30 cm"
  },
  {
    "id": "13",
    "slug": "maserati-dragster",
    "title": "Maserati Dragster",
    "year": "2016",
    "status": "Acquired",
    "category": "Quattroporte Land Speed Dragster",
    "thumb": "/img/portfolio/13-thumbnail.jpg",
    "full": "/img/portfolio/13-full.jpg",
    "images": [
      "/img/portfolio/13-full.jpg",
      "/img/portfolio/13a-full.jpg",
      "/img/portfolio/13b-full.jpg",
      "/img/portfolio/13c-full.jpg"
    ],
    "description": "A record-breaking land-speed streamliner driven by a Maserati Quattroporte Evoluzione V8 engine, featuring an ultra-low chrome monocoque chassis, aerodynamic pilot fairing, and competition racing number 26.",
    "materials": [
      "Maserati Quattroporte Evoluzione engine & chassis plate",
      "Mirror-finish chrome streamliner bodywork",
      "Custom rear drag-slick with exposed suspension spring",
      "Full-face chrome competition helmet with respiration tube",
      "Competition racing livery #26"
    ],
    "dimensions": "95 x 42 x 35 cm"
  },
  {
    "id": "12",
    "slug": "rocketstrider",
    "title": "Rocketstrider",
    "year": "2013",
    "status": "Acquired",
    "category": "Rocket Propulsion Biped",
    "thumb": "/img/portfolio/12-full.jpg",
    "full": "/img/portfolio/12-full.jpg",
    "images": [
      "/img/portfolio/12-full.jpg"
    ],
    "description": "An aggressive bipedal exploration walker featuring vertical booster nozzles, articulated knee actuators, and panoramic periscopic vision.",
    "materials": [
      "Steel exhaust expansion chambers",
      "Machined brass pivots",
      "Oil-tempered wire guides",
      "Heavy iron chassis"
    ],
    "dimensions": "82 x 44 x 38 cm"
  },
  {
    "id": "11",
    "slug": "aero-baby-trike",
    "title": "Aero-Baby Trike",
    "year": "2013",
    "status": "Acquired",
    "category": "Aviation Three-Wheeler",
    "thumb": "/img/portfolio/11-full.jpg",
    "full": "/img/portfolio/11-full.jpg",
    "images": [
      "/img/portfolio/11-full.jpg"
    ],
    "description": "A dynamic motorized tricycle featuring an aircraft nose cowl, spoke wheel propulsion, and classic porcelain face pilot figure.",
    "materials": [
      "Spoked vintage wheels",
      "Aero cowling sheet metal",
      "Leather seat saddle",
      "Chain drive assembly"
    ],
    "dimensions": "60 x 40 x 36 cm"
  },
  {
    "id": "10",
    "slug": "locomotive-infant",
    "title": "Locomotive Infant",
    "year": "2012",
    "status": "Acquired",
    "category": "Steam Valve Hybrid",
    "thumb": "/img/portfolio/10-full.jpg",
    "full": "/img/portfolio/10-full.jpg",
    "images": [
      "/img/portfolio/10-full.jpg"
    ],
    "description": "Marrying the raw power of nineteenth-century railway steam locomotion with cybernetic android anatomy, complete with functioning steam release valves.",
    "materials": [
      "Cast bronze steam whistle",
      "Boiler pressure manometer",
      "Heavy steel flanged rail wheels",
      "Copper rivets"
    ],
    "dimensions": "70 x 35 x 38 cm"
  },
  {
    "id": "9",
    "slug": "v-twin-crawler",
    "title": "V-Twin Crawler",
    "year": "2012",
    "status": "Acquired",
    "category": "Twin-Cylinder Desert Quad",
    "thumb": "/img/portfolio/9-full.jpg",
    "full": "/img/portfolio/9-full.jpg",
    "images": [
      "/img/portfolio/9-full.jpg"
    ],
    "description": "A low-slung, four-point rough-terrain crawler driven by a vintage motorcycle V-twin block, built to navigate toxic wastelands.",
    "materials": [
      "Motorcycle cylinder heads",
      "Drive chains and sprockets",
      "Wide lug tires",
      "Hand-oxidized iron armor"
    ],
    "dimensions": "68 x 46 x 32 cm"
  },
  {
    "id": "7",
    "slug": "zeppelin-cruiser",
    "title": "Zeppelin Cruiser",
    "year": "2011",
    "status": "Acquired",
    "category": "Dirigible Biomechanical Hull",
    "thumb": "/img/portfolio/7-thumbnail.jpg",
    "full": "/img/portfolio/7-full.jpg",
    "images": [
      "/img/portfolio/7-full.jpg"
    ],
    "description": "An aerial dreadnought featuring an elongated skeletal fuselage, dual steering rudders, and suspended gondola housing.",
    "materials": [
      "Perforated aluminum ribs",
      "Brass steering linkages",
      "Clockwork gearbox",
      "Vintage watch jewels"
    ],
    "dimensions": "90 x 28 x 35 cm"
  },
  {
    "id": "6",
    "slug": "submersible-nautilus",
    "title": "Submersible Nautilus",
    "year": "2010",
    "status": "Acquired",
    "category": "Brass Pressure Hull Walker",
    "thumb": "/img/portfolio/6-full.jpg",
    "full": "/img/portfolio/6-full.jpg",
    "images": [
      "/img/portfolio/6-full.jpg"
    ],
    "description": "Victorian Jules Verne-esque submarine equipped with mechanical ballast fins, porthole illumination lens, and stabilizing anchors.",
    "materials": [
      "Heavy spun brass hull",
      "Convex glass porthole",
      "Deep-sea depth gauges",
      "Cast lead ballast weights"
    ],
    "dimensions": "74 x 36 x 32 cm"
  },
  {
    "id": "5",
    "slug": "monowheel-scout",
    "title": "Monowheel Scout",
    "year": "2009",
    "status": "Acquired",
    "category": "Gyro-Stabilized Recon Vehicle",
    "thumb": "/img/portfolio/5-thumbnail.jpg",
    "full": "/img/portfolio/5-full.jpg",
    "images": [
      "/img/portfolio/5-full.jpg"
    ],
    "description": "A single giant outer hoop wheel enclosing a gyroscopically balanced rider cockpit with exposed timing belts and forward optical searchlight.",
    "materials": [
      "Large diameter steel ring bearing",
      "Internal gyro weights",
      "Carburetor linkages",
      "Lens housing"
    ],
    "dimensions": "65 x 30 x 62 cm"
  },
  {
    "id": "4",
    "slug": "iron-glider",
    "title": "Iron Glider",
    "year": "2009",
    "status": "Acquired",
    "category": "Wind-Tunnel Glider Android",
    "thumb": "/img/portfolio/4-thumbnail.jpg",
    "full": "/img/portfolio/4-full.jpg",
    "images": [
      "/img/portfolio/4-full.jpg"
    ],
    "description": "A delicate yet menacing flight study featuring ribbed canvas-and-steel wings and dual aileron cables operated by mechanical hand levers.",
    "materials": [
      "Hand-beaten zinc sheet wings",
      "Piano wire flight controls",
      "Copper hydraulic fittings",
      "Brass hinges"
    ],
    "dimensions": "75 x 55 x 28 cm"
  },
  {
    "id": "3",
    "slug": "rustborn-sentinel",
    "title": "Rustborn Sentinel",
    "year": "2008",
    "status": "Acquired",
    "category": "Early Scrap-Metal Automaton",
    "thumb": "/img/portfolio/3-thumbnail.jpg",
    "full": "/img/portfolio/3-full.jpg",
    "images": [
      "/img/portfolio/3-full.jpg"
    ],
    "description": "One of the foundation milestones in Olivier Pauwels\u2019 career. Raw, unapologetic industrial scrap assembled with visceral emotional weight.",
    "materials": [
      "Port of Ostend railway spikes",
      "Aged iron machine housings",
      "Hand-welded rebar skeleton",
      "Found porcelain face"
    ],
    "dimensions": "80 x 42 x 36 cm"
  },
  {
    "id": "2",
    "slug": "cyber-flyer",
    "title": "Cyber-Flyer",
    "year": "2008",
    "status": "Acquired",
    "category": "Aviation Biomechanical Hybrid",
    "thumb": "/img/portfolio/2-thumbnail.jpg",
    "full": "/img/portfolio/2-full.jpg",
    "images": [
      "/img/portfolio/2-full.jpg"
    ],
    "description": "An early kinetic prototype exploring the intersection of vintage flight instrumentation, doll face innocence, and mechanical propulsion.",
    "materials": [
      "Vintage airspeed indicator dial",
      "Brass clockwork mechanism",
      "Welded sheet steel fuselage",
      "Copper fuel pipes"
    ],
    "dimensions": "58 x 42 x 30 cm"
  },
  {
    "id": "1",
    "slug": "c-baby-biplane",
    "title": "C-Baby Biplane",
    "year": "2007",
    "status": "Acquired",
    "category": "Vintage Radial Engine Pioneer",
    "thumb": "/img/portfolio/1-thumbnail.jpg",
    "full": "/img/portfolio/1-full.jpg",
    "images": [
      "/img/portfolio/1-full.jpg"
    ],
    "description": "The groundbreaking first creation that inaugurated the internationally acclaimed C-Baby series. Documented extensively in his debut monograph.",
    "materials": [
      "1930s radial model engine",
      "Perforated iron wing spars",
      "Antique baby doll head",
      "Hand-soldered brass wires"
    ],
    "dimensions": "54 x 48 x 26 cm"
  }
];

export const PORTFOLIO_CREATURES: PortfolioCreature[] = RAW_PORTFOLIO_CREATURES.map((c) => ({
  ...c,
  thumb: getAssetUrl(c.thumb),
  full: getAssetUrl(c.full),
  images: c.images.map(getAssetUrl),
}));

