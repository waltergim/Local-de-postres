export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
};

export type Category = {
  id: string;
  name: string;
};

export type HoursRow = {
  days: string;
  time: string;
};

export type SiteData = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  location: string;
  address: string;
  phoneDisplay: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  email: string;
  hours: HoursRow[];
};

export type Catalog = {
  products: Product[];
  site: SiteData;
};
