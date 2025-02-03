'use client';

import { MenuSubcategory } from '@/types/menuTypes';

interface MenuContentProps {
  subcategories: MenuSubcategory[] | undefined;
}

const MenuContent = ({ subcategories }: MenuContentProps) => {
  if (!subcategories) return null;

  return (
    <div className='flex-1 pl-8'>
      {subcategories.map((subcategory) => (
        <div key={subcategory.title} className='mb-12'>
          <div className='mb-4'>
            <h2 className='text-2xl font-semibold'>{subcategory.title}</h2>
            {subcategory.description && (
              <p className='text-muted-foreground mt-1'>
                {subcategory.description}
              </p>
            )}
            <div className='w-full h-[1px] bg-white' />
          </div>

          <div className='space-y-6'>
            {subcategory.items.map((item) => (
              <div key={item.title} className='group'>
                <div className='flex items-baseline justify-between gap-4'>
                  <h3 className='text-lg font-medium'>{item.title}</h3>
                  <div className='relative flex-grow border-b border-dotted border-muted-foreground/30' />
                  <span className='font-medium'>${item.price.toFixed(2)}</span>
                </div>
                <p className='text-muted-foreground mt-1'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuContent;
