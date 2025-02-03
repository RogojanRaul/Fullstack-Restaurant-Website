export interface MenuItem {
  title: string;
  description: string;
  price: number;
}

export interface MenuSubcategory {
  title: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuCategory {
  categoryName: string;
  subcategories: MenuSubcategory[];
}

export interface Location {
  title: string;
  address: string;
  categories: MenuCategory[];
}

export interface MenuState {
  locations: Location[];
  selectedLocation: string;
  categories: MenuCategory[];
  selectedCategory: string;
}
