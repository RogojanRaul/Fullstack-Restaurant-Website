export type MenuItem = {
  _id: string;
  title: string;
  description: string;
  prices: number[];
  glutenFree: boolean;
  plateSplitting: boolean;
  disclaimer: boolean;
};

export type MenuSubcategory = {
  _id: string;
  title: string;
  description?: string;
  items: MenuItem[];
};

export type MenuCategory = {
  _id: string;
  categoryName: string;
  subcategories: MenuSubcategory[];
};

export type Location = {
  _id: string;
  title: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  emailAddress: string;
};
