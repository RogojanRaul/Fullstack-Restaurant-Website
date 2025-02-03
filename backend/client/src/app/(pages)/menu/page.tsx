'use client';

import { useEffect, useState } from 'react';
import { Location, MenuCategory, MenuState } from '@/types/menuTypes';
import LocationSelector from '@/components/LocationSelector';
import CategorySidebar from '@/components/CategorySidebar';
import MenuContent from '@/components/MenuContent';
import { get } from '@/utils/fetch';

const MenuPage = () => {
  const [state, setState] = useState<MenuState>({
    locations: [],
    selectedLocation: '',
    categories: [],
    selectedCategory: '',
  });
  const [subcategories, setSubcategories] = useState<any>([]);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = (await get({
          url: 'api/menu/getLocations',
        })) as Location[];
        setState({
          ...state,
          locations: response,
          selectedLocation: response[0]?.title || '',
        });
      } catch (error) {
        console.log(error);
      }
    };
    getLocations();
  }, []);

  useEffect(() => {
    if (!state.selectedLocation) return;

    const getCategories = async () => {
      try {
        const response = (await get({
          url: `api/menu/getLocationsCategories/${state.selectedLocation}`,
        })) as MenuCategory[];
        setState({
          ...state,
          categories: response,
          selectedCategory: response[0]?.categoryName || '',
        });
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [state.selectedLocation]);

  useEffect(() => {
    const getSubcategories = async () => {
      try {
        const response = await get({
          url: `api/menu/menuItems/${state.selectedLocation}/${state.selectedCategory}`,
        });
        setSubcategories(response);
      } catch (error) {
        console.log(error);
      }
    };
    getSubcategories();
  }, [state.selectedCategory]);

  const handleLocationChange = (location: string) => {
    setState((prev) => ({
      ...prev,
      selectedLocation: location,
    }));
    if (location !== state.selectedLocation) {
      setSubcategories([]);
    }
  };

  const handleCategoryChange = (category: string) => {
    setState((prev) => ({
      ...prev,
      selectedCategory: category,
    }));
  };

  return (
    <div className=' min-h-screen container mx-auto py-8 px-4'>
      <LocationSelector
        locations={state.locations}
        selectedLocation={state.selectedLocation}
        onLocationChange={handleLocationChange}
      />

      <div className='flex gap-8'>
        <CategorySidebar
          categories={state.categories}
          selectedCategory={state.selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <MenuContent subcategories={subcategories} />
      </div>
    </div>
  );
};

export default MenuPage;
