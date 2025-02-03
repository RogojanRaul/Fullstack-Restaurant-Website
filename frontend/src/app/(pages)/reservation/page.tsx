'use client';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Location } from '@/types';
import { get } from '@/Fetch';

import styles from './styles.module.css';

const ReservationPage = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const handleSelectedLocation = (value: string) => {
    if (!locations) return;
    const location = locations.find((loc: Location) => loc._id === value);
    setSelectedLocation(location || locations[0]);
  };

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = (await get({
          url: 'api/menu/getLocations',
        })) as Location[];
        setLocations(response);
        setSelectedLocation(response[0]);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getLocations();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.subTitle}>Reservation</h1>
        <h1 className={styles.title}>BOOK A TABLE</h1>
      </div>
      <div className={styles.selectLocationContainer}>
        <Select onValueChange={handleSelectedLocation} name='select'>
          <SelectTrigger className='w-[350px] h-[100x] bg-white bg-opacity-10 backdrop-blur-sm rounded-none border-opacity-20 border-2 border-white text-md'>
            <SelectValue
              placeholder={loading ? 'Loading...' : selectedLocation?.title}
            />
          </SelectTrigger>
          <SelectContent className=' bg-white bg-opacity-20 backdrop-blur-md rounded-none text-md border-none text-white'>
            {locations.map((location: any, index: number) => (
              <SelectItem
                key={location._id}
                value={location._id}
                className='cursor-pointer text-md focus:bg-slate-900 focus:text-white [&:not(:last-child)]:mb-1 rounded-none'
              >
                {location.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className={styles.rules}>
        <p className='text-[18px] max-w-[650px]'>
          For reservations in our private wine cellar, please contact the
          restaurant for additional information and availability.  Minimums do
          apply.
        </p>
        <p className='text-[18px] max-w-[950px]'>
          For children, SELECT does not provide booster seats or high chairs due
          to the limitation of floor space and car seats are not allowed in the
          seats or booths.  Our tables are not designed to accommodate any type
           of attachment of seats with the danger of tipping over.  Please know
          that strollers are not allowed to ensure the safety of your children
          and others by not blocking the walkways with limited floor space..  If
          you have any questions regarding our accommodations for small children
          then please give us a call or email.
        </p>
        <p className='text-[18px] max-w-[950px]'>
          Auto gratuity of 20% will be added to any party of 5 guests or more.
           Children are included in numbering the amount of people in a party.
           Also, there will be a 10% service charge on all to-go orders.
        </p>
      </div>
      <div className={styles.locationContactInfo}>
        <div className='flex gap-[30px]'>
          <p>{selectedLocation?._id}</p>
          <p>{selectedLocation?.title}</p>
          <p>{selectedLocation?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
