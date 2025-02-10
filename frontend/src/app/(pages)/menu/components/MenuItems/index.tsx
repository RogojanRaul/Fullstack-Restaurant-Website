'use client';
import { MenuSubcategory } from '@/types';

type MenuItemsProps = {
  subCategories: MenuSubcategory[];
};

const MenuItems = ({ subCategories }: MenuItemsProps) => {
  return (
    <div className='w-full px-3'>
      {subCategories.length !== 0 ? (
        subCategories.map((subCategory) => (
          <div key={subCategory._id} className='mb-10'>
            <div className='w-full xl:mb-[50px] mb-[25px]'>
              <h1 className='w-full text-3xl lg:text-4xl font-bold mb-5 lg:mb-8 border-b-2'>
                {subCategory.title}
              </h1>
              <p className='text-md xl:text-[18px] text-gray-200'>
                {subCategory.description}
              </p>
            </div>
            <div className='flex flex-col gap-7'>
              {subCategory.items.map((item) => (
                <div key={item._id}>
                  <h1
                    style={{ color: 'var(--primary)' }}
                    className='flex justify-between items-center text-2xl font-bold mb-2 uppercase'
                  >
                    <div className='flex gap-1 items-center'>
                      {item.title}

                      {item.glutenFree && (
                        <img
                          src='/icons/glutenFree2.svg'
                          alt='gluten free icon'
                          className='w-[35px]'
                        />
                      )}

                      {item.plateSplitting && (
                        <img
                          src='/icons/billSplit.svg'
                          alt='bill splitting icon'
                          className='w-[35px]'
                        />
                      )}

                      {item.disclaimer && (
                        <img
                          src='/icons/billSplit.svg'
                          alt='bill splitting icon'
                          className='w-[35px]'
                        />
                      )}
                    </div>
                    {item.prices.length > 0 && (
                      <div
                        className={`${
                          item.prices.length > 0 ? 'flex gap-2' : ''
                        }`}
                      >
                        {item.prices.map((price, index) => (
                          <span key={index}>
                            {price}
                            {index < item.prices.length - 1 && ' | '}
                          </span>
                        ))}
                      </div>
                    )}
                  </h1>
                  <p className='text-md xl:text-[18px] text-gray-200'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <h1 className='text-xl text-red-500'>
          No Items where found in this category
        </h1>
      )}
    </div>
  );
};

export default MenuItems;
