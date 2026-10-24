export interface SculptureSpecs {
  size: string; // e.g. "82 x 45 x 40 cm"
  weight: string; // e.g. "12.4 kg"
  salvagedPartsCount: number;
  originOfBase: string; // e.g. "Ostend scrap rail yard"
}

export interface Sculpture {
  id: string;
  title: string;
  year: number;
  category: "walker" | "flyer" | "warrior";
  image: string;
  description: string;
  materials: string[];
  specs: SculptureSpecs;
  story: string;
}

export interface Exhibition {
  id: string;
  year: string;
  title: string;
  location: string;
  type: string; // e.g. "Solo Exhibition" or "Group Show"
  coordinates: string; // e.g. "51.0500° N, 3.7333° E"
  gallery: string;
}
