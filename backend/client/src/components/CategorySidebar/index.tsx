'use client';

import { MenuCategory } from '@/types/menuTypes';

interface CategorySidebarProps {
  categories: MenuCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategorySidebarProps) => {
  return (
    <div className='w-64 border-r pr-4'>
      <h2 className='font-semibold mb-4'>Categories</h2>
      <div className='space-y-2'>
        {categories.map((category) => (
          <button
            key={category.categoryName}
            onClick={() => onCategoryChange(category.categoryName)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.categoryName
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-secondary'
            }`}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
