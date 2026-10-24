import { getAssetUrl } from "./utils/asset";

export const ABOUT_TEXTS = [
  {
    title: "Olivier Pauwels (°1974)",
    content: "Olivier Pauwels, also known by his tag BOHI, is a Belgian artist holding a graphic arts degree. He started his career as a painter and graphic designer, but quickly turned his attention towards three-dimensional assemblages. It’s exactly those fascinating assemblages that trigger everyone’s imagination."
  },
  {
    title: "Reinventing art",
    content: "With an eye for detail and a strong preference for old materials, combined with sweet little babies, Olivier creates an apocalyptic image track. This track seeks the balance between humour and threat, violence and love, renewal and reconditioning."
  },
  {
    title: "Cyberbabies",
    content: "Extraordinary examples of Olivier’s art work are his cyber babies: android creatures, born from classic toy dolls and old machine parts. These humanoid contraptions, which originally were given an undeniably steampunk look or donned military attributes, are moving as well as fascinating. They enable the artist to express his own view of the world."
  },
  {
    title: "Inspiration",
    content: "The artist guides us towards a surreal world of ‘Cyber Babies’ and futuristic machines. It’s an escape from reality, as well as a statement launching every baby, every new-born into an outrageous world. A world in which the mass hysteria of the constantly wanting more determines the rhythm of life. The babies are the seed for the next generation. They’re a blank slate on which we can project our wishes, fears and dreams of the future."
  },
  {
    title: "Creation",
    content: "It’s actually the objects themselves that trigger new creations. Objects are decontextualized and are given a new dimension, a new identity, whereby they lose all connection with their past. “Where the life of an object stops… the dream world of the artist begins.”"
  },
  {
    title: "Skulls and Wheels",
    content: "Olivier’s specific way of assemblage got him in touch with film legend George Miller in 2010. Olivier participated in shaping the image of the movie Mad-Max Fury Road (2015), which was rewarded with 6 Oscars. The film director is a kindred spirit who creates his own world, a world that questions what lies ahead in the universe."
  }
];

export const ABOUT_IMAGES = [
  "/img/about/1.jpg",
  "/img/about/3.jpg",
  "/img/about/4.jpg",
  "/img/about/5.jpg",
  "/img/about/6.jpg",
  "/img/about/21.jpg"
].map(getAssetUrl);

const RAW_PORTFOLIO_ITEMS = [
  { id: "p1", title: "Mickey's", year: "2020", status: "Available", thumb: "/img/portfolio/28-thumbnail.jpg", full: "/img/portfolio/28-full.jpg" },
  { id: "p2", title: "Porsche Felca GT", year: "2020", status: "SOLD", thumb: "/img/portfolio/27-thumbnail.jpg", full: "/img/portfolio/27-full.jpg" },
  { id: "p3", title: "Bronze Mickey's", year: "2020", status: "Available", thumb: "/img/portfolio/26-thumbnail.jpg", full: "/img/portfolio/26a-full.jpeg" },
  { id: "p4", title: "Jaguar Neufunk", year: "2019", status: "SOLD", thumb: "/img/portfolio/25-thumbnail.jpg", full: "/img/portfolio/25-full.jpg" },
  { id: "p5", title: "Blue Pilot", year: "2018", status: "Available", thumb: "/img/portfolio/24-thumbnail.jpg", full: "/img/portfolio/24-full.jpg" },
  { id: "p6", title: "Marsdiver II", year: "2018", status: "SOLD", thumb: "/img/portfolio/23-thumbnail.jpg", full: "/img/portfolio/23-full.jpg" },
  { id: "p7", title: "C-Baby Binoculairejet", year: "2017", status: "SOLD", thumb: "/img/portfolio/22-thumbnail.jpg", full: "/img/portfolio/22-full.jpg" },
  { id: "p8", title: "Soviet Stealth Bomber & Studies", year: "2015-2016", status: "SOLD", thumb: "/img/portfolio/21-thumbnail.jpg", full: "/img/portfolio/21-full.jpg" },
  { id: "p9", title: "Manta-Mig", year: "2016", status: "SOLD", thumb: "/img/portfolio/18-thumbnail.jpg", full: "/img/portfolio/18-full.jpg" },
  { id: "p10", title: "Marchal M12", year: "2016", status: "SOLD", thumb: "/img/portfolio/19-full.jpg", full: "/img/portfolio/19-full.jpg" },
  { id: "p11", title: "Sub-Zero U-0", year: "2015", status: "SOLD", thumb: "/img/portfolio/16-thumbnail.jpg", full: "/img/portfolio/16-full.jpg" },
  { id: "p12", title: "Guestronauts", year: "2013-2014", status: "Available", thumb: "/img/portfolio/14-thumbnail.jpg", full: "/img/portfolio/14-full.jpg" },
  { id: "p13", title: "Maserati Dragster", year: "2016", status: "SOLD", thumb: "/img/portfolio/13-thumbnail.jpg", full: "/img/portfolio/13-full.jpg" },
  { id: "p14", title: "Drawings", year: "2014-2016", status: "Available", thumb: "/img/portfolio/15-thumbnail.jpg", full: "/img/portfolio/15-full.jpg" },
  { id: "p15", title: "V8 Hoover Plymouth", year: "2014", status: "SOLD", thumb: "/img/portfolio/17-thumbnail.jpg", full: "/img/portfolio/17-full.jpg" }
];

export const PORTFOLIO_ITEMS = RAW_PORTFOLIO_ITEMS.map((item) => ({
  ...item,
  thumb: getAssetUrl(item.thumb),
  full: getAssetUrl(item.full)
}));

const RAW_BOOKS = [
  { id: "b1", title: "Introducing Bohi", year: "2007", status: "Signed copy", image: "/img/books/bohi.jpg" },
  { id: "b2", title: "Future Pass 3.0", year: "2014", status: "Signed copy", image: "/img/books/futurepass.jpg" },
  { id: "b3", title: "Cyber-Baby I", year: "2015", status: "Sold out", image: "/img/books/cyberbaby1.jpg" },
  { id: "b4", title: "Cyber-Baby II", year: "2016", status: "Sold out", image: "/img/books/cyberbaby2.jpg" }
];

export const BOOKS = RAW_BOOKS.map((b) => ({
  ...b,
  image: getAssetUrl(b.image)
}));

export const MADMAX_IMAGES = [
  "/img/madmax/1a.jpg",
  "/img/madmax/2.jpg",
  "/img/madmax/3.jpg",
  "/img/madmax/4.jpg",
  "/img/madmax/5.jpg",
  "/img/madmax/6.jpg",
  "/img/madmax/7.jpg",
  "/img/madmax/8.jpg",
  "/img/madmax/10.jpg",
  "/img/madmax/11.jpg",
  "/img/madmax/12.jpg",
  "/img/madmax/15.jpg"
].map(getAssetUrl);

export const EXHIBITIONS = [
  { year: "2025", events: ["Luum Ostend, Belgium", "AAF. Brussels, Belgium", "Project 'Final Odyssey' Ettelgem, Belgium"] },
  { year: "2024", events: ["Sculptura 2, Tour & Taxis and Gare Maritime Brussels, Belgium", "AAF. Brussels, Belgium", "Gallery Van Dun Laren, Netherlands"] },
  { year: "2023", events: ["Toddler Pillars, Beinart Gallery Melbourne, Australia", "Design Ostend, Belgium", "Faithfully Yours, studio location and props, Netherlands"] },
  { year: "2022", events: ["M.P.V. Gallery Pan Amsterdam, Netherlands", "Luum Ostend, Belgium", "Campo & Campo Antwerp, Belgium"] },
  { year: "2021", events: ["Galleri Oxholm Copenhagen, Denmark"] },
  { year: "2020", events: ["Solo show The Boutique Gallery Sint Martens Latem, Belgium", "The Boutique Gallery Knokke, Belgium", "The Boutique Gallery Franschhoek, South Africa"] }
];
