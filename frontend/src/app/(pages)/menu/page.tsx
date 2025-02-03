'use client';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import MenuTabs from './components/MenuTabs';

import { get } from '@/Fetch';
import createQueryString from '@/utils/createQueryString';
import { Location } from '@/types';

import styles from './styles.module.css';

const Menu = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedLocation = searchParams.get('location');

  const createLocationQuery = (value: string) => {
    const createQuery = createQueryString('location', value, searchParams);
    router.push(pathname + '?' + createQuery, { scroll: false });
  };

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = (await get({
          url: 'api/menu/getLocations',
        })) as Location[];
        setLocations(response);

        if (response.length > 0 && !selectedLocation) {
          const defaultLocation = response[0].title;
          setTimeout(() => createLocationQuery(defaultLocation), 0);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getLocations();
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Our menu</h1>
        <div
          className='w-1 h-8'
          style={{ backgroundColor: 'var(--primary)' }}
        />
        <div className='w-full max-w-[380px] mx-auto'>
          <h1 className='flex justify-center items-center gap-1 mb-2'>
            Select your location
          </h1>
          <Select onValueChange={createLocationQuery} name='select'>
            <SelectTrigger className='w-full h-[100x] bg-white bg-opacity-10 backdrop-blur-sm rounded-none border-opacity-20 border-2 border-white text-md'>
              <SelectValue
                placeholder={
                  typeof window === 'undefined' || loading
                    ? 'Loading...'
                    : selectedLocation || 'Select a location'
                }
              />
            </SelectTrigger>
            <SelectContent className='max-w-[380px] bg-white bg-opacity-20 backdrop-blur-sm rounded-none text-md border-none text-white'>
              {locations.map((location: any, index: number) => (
                <SelectItem
                  key={location._id}
                  value={location.title}
                  className='cursor-pointer text-md focus:bg-slate-900 focus:text-white [&:not(:last-child)]:mb-1 rounded-none'
                >
                  {location.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='max-w-[1320px] px-2 mx-auto py-[50px] md:py-[100px]'>
        <MenuTabs />
      </div>
    </main>
  );
};

export default Menu;
