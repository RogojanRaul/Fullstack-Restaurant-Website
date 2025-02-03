'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaFilter } from 'react-icons/fa';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import Button from '@/components/Button';
import MenuItems from '../MenuItems';
import DineDifferent from '@/components/DineDifferent';
import Skeleton from '@/components/Skeleton';

import { get } from '@/Fetch';
import useIsMobile from '@/hooks/useIsMobile';

import { MenuCategory, MenuSubcategory } from '@/types';

import styles from './styles.module.css';

const MenuTabs = () => {
  const [state, setState] = useState({
    categories: [] as MenuCategory[],
    subCategories: [] as MenuSubcategory[],
    loading: true,
    error: null as string | null,
  });

  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1200);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocation = searchParams.get('location');
  const selectedCategoryId = searchParams.get('category');

  const skeletonArr = new Array(5).fill('');

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!currentLocation) return;

      try {
        // Fetch categories
        const categoryResponse = (await get({
          url: `api/menu/getLocationsCategories/${currentLocation}`,
        })) as MenuCategory[];

        if (!mounted) return;

        // Handle default category selection
        if (
          categoryResponse.length > 0 &&
          (!selectedCategoryId ||
            !categoryResponse.some((c) => c._id === selectedCategoryId))
        ) {
          const defaultCategoryId = categoryResponse[0]._id;
          router.push(
            `${pathname}?location=${currentLocation}&category=${defaultCategoryId}`,
            { scroll: false }
          );
          return; // Let the URL change trigger a re-render
        }

        // Fetch subcategories if we have a valid category
        let subCategoryResponse: MenuSubcategory[] = [];
        if (selectedCategoryId) {
          const selectedCategory = categoryResponse.find(
            (category) => category._id === selectedCategoryId
          );
          if (selectedCategory) {
            subCategoryResponse = (await get({
              url: `api/menu/menuItems/${currentLocation}/${selectedCategory.categoryName}`,
            })) as MenuSubcategory[];
          }
        }

        if (!mounted) return;

        setState({
          categories: categoryResponse,
          subCategories: subCategoryResponse,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!mounted) return;
        console.error('Error fetching menu data:', error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Failed to load menu data',
        }));
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [currentLocation, selectedCategoryId]);

  const renderCategories = () => {
    return state.categories?.map((category: any, index: number) => (
      <Link
        key={category._id}
        scroll={false}
        href={`?location=${currentLocation}&category=${category._id}`}
        className={`${styles.categoryLink} ${
          selectedCategoryId === category._id ? styles.active : ''
        }`}
      >
        {category.categoryName}
        <span>{`/0${index + 1}`}</span>
      </Link>
    ));
  };

  const renderHistory = () => {
    return (
      <div className={styles.history}>
        <div className={styles.historyPoint}>
          <div className={styles.iconContainer}>
            <img src='/icons/glutenFree2.svg' alt='gluten free icon' />
          </div>
          <p className='whitespace-nowrap'>Gluten Free</p>
        </div>
        <div className={styles.historyPoint}>
          <div className={styles.iconContainer}>
            <img src='/icons/billSplit.svg' alt='gluten free icon' />
          </div>
          <p className='whitespace-nowrap'>5 | Plate Splitting</p>
        </div>
      </div>
    );
  };

  const renderSkeletonItemsGrid = () => {
    return (
      <>
        {skeletonArr.map((_, index) => (
          <div key={index} className='w-full mb-10'>
            <Skeleton width='40%' height='25px' className={'mb-3'} />
            <Skeleton width='100%' height='16px' className={' mb-2'} />
            <Skeleton width='100%' height='16px' className={' mb-2'} />
            <Skeleton width='70%' height='16px' />
          </div>
        ))}
      </>
    );
  };

  const renderMobile = () => {
    return (
      <>
        {state.loading ? (
          renderSkeletonItemsGrid()
        ) : (
          <>
            <Drawer>
              <DrawerTrigger asChild>
                <div className='flex justify-end items-end w-full px-3 mb-[50px] lg:mb-[100px]'>
                  <Button
                    variant='primary'
                    as='button'
                    size='md'
                    endIcon={<FaFilter />}
                    fullWidth={isMobile}
                  >
                    Select Category
                  </Button>
                </div>
              </DrawerTrigger>
              <DrawerContent className='bg-black bg-opacity-50 backdrop-blur-md border-gray-800 border-2'>
                <div className='mx-auto w-full max-w-sm'>
                  <DrawerHeader>
                    <DrawerTitle className='flex justify-center items-center'>
                      <DineDifferent />
                    </DrawerTitle>
                    <DrawerDescription>Select menu category</DrawerDescription>
                  </DrawerHeader>
                  <div className='p-4 flex justify-center items-center flex-wrap gap-3'>
                    {state.categories.length === 0 ? (
                      <div className='text-red-500 text-center'>
                        No categories found for this location!
                      </div>
                    ) : (
                      <>
                        <div className='mb-5 flex flex-col gap-4 w-full'>
                          {renderCategories()}
                        </div>
                        {renderHistory()}
                      </>
                    )}
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <div className={styles.history}></div>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
            <MenuItems subCategories={state.subCategories} />
          </>
        )}
      </>
    );
  };

  const renderDesktop = () => {
    return (
      <>
        {state.loading ? (
          <div className='flex gap-[60px]'>
            <Skeleton width='250px' height='400px' />
            <div className='w-full '>{renderSkeletonItemsGrid()}</div>
          </div>
        ) : (
          <div className='flex justify-between gap-[60px]'>
            {state.categories.length !== 0 && (
              <div className={styles.categoriesMenuSideBar}>
                <div className={styles.categoriesMenu}>
                  {renderCategories()}
                </div>
                {renderHistory()}
              </div>
            )}
            <MenuItems subCategories={state.subCategories} />
          </div>
        )}
      </>
    );
  };

  if (state.error) {
    return <div className='text-red-500 text-center p-4'>{state.error}</div>;
  }

  return (
    <div className={styles.container}>
      {isTablet ? renderMobile() : renderDesktop()}
    </div>
  );
};

export default MenuTabs;
