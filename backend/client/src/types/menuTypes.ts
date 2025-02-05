export interface MenuItem {
  _id: string;
  title: string;
  description?: string;
  prices?: number[];
  glutenFree?: boolean;
  plateSplitting?: boolean;
  rawDisclaimer?: boolean;
}

export interface MenuSubcategory {
  _id: string;
  title: string;
  description?: string;
  items: MenuItem[];
  categories: string[];
}

export interface MenuCategory {
  _id: string;
  title: string;
  subcategories: string[];
  locations: string[];
}

export interface Location {
  _id: string;
  title: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  emailAddress: string;
  categories: string[];
}

export interface MenuState {
  locations: Location[];
  selectedLocation: string;
  categories: MenuCategory[];
  selectedCategory: string;
}
