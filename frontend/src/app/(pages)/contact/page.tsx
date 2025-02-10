'use client';
// import emailjs from '@emailjs/browser';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MdOutlineMailOutline } from 'react-icons/md';
import { IoPhonePortraitOutline } from 'react-icons/io5';

import { Location } from '@/types';
import { get } from '@/Fetch';

import Button from '@/components/Button';

import styles from './styles.module.css';
import { useEffect, useState } from 'react';

const Contact = () => {
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIserror] = useState(false);

  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    locations[0]
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
          url: 'api/locations',
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

  const sendEmail = (e: any) => {
    // e.preventDefault();
    // setIsEmailSending(true);
    // emailjs
    //   .sendForm(
    //     'service_6j34gco',
    //     'template_cx3438r',
    //     e.target,
    //     'GyLlpDVWLIG5rOyRl'
    //   )
    //   .then((result) => {
    //     console.log('Email sent successfully:');
    //     setIsEmailSending(false);
    //     setIsSuccess(true);
    //     setIserror(false);
    //   })
    //   .catch((error) => {
    //     console.error('Error sending email:', error);
    //     setIsEmailSending(false);
    //     setIsSuccess(false);
    //     setIserror(true);
    //   });
  };

  return (
    <div className={styles.container}>
      <div className='w-full'>
        <div className={styles.titleContainer}>
          <h1 className={styles.subTitle}>Contact</h1>
          <h1 className={styles.title}>SEND US A MESSAGE</h1>
        </div>
        <div className='w-full flex justify-center items-center'>
          <Select onValueChange={handleSelectedLocation} name='select'>
            <SelectTrigger className='w-full max-w-[600px] h-[100x] bg-white bg-opacity-10 backdrop-blur-sm rounded-none border-opacity-20 border-2 border-white text-md selectTrigger'>
              <SelectValue
                placeholder={
                  loading
                    ? 'Loading...'
                    : selectedLocation?.title
                    ? selectedLocation.title
                    : 'Oops, something went wrong'
                }
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
      </div>
      <div className='w-full max-w-[600px]'>
        <div className='mb-5'>
          <h3
            className='text-3xl font-semibold mb-2'
            style={{ color: 'var(--primary)', fontFamily: 'var(primary-font)' }}
          >
            Contact Info
          </h3>
          <p className='flex items-center gap-1 text-lg'>
            <IoPhonePortraitOutline /> {selectedLocation?.phoneNumber}
          </p>
          <p className='flex items-center gap-1 text-lg'>
            <MdOutlineMailOutline /> {selectedLocation?.emailAddress}
          </p>
        </div>
        <h3
          className='text-3xl font-semibold mb-2'
          style={{ color: 'var(--primary)', fontFamily: 'var(primary-font)' }}
        >
          Opening Hours
        </h3>
        <p className='text-lg'>Everyday 9 am - 10 pm</p>
      </div>
      <form className={styles.form} onSubmit={sendEmail}>
        <input type='text' name='fullName' placeholder='Full name' />
        <input type='email' name='email' placeholder='Email' />
        <input type='text' name='subject' placeholder='Subject' />
        <input type='number' name='phoneNumber' placeholder='Phone Number' />
        <textarea name='message' placeholder='Message'></textarea>
        {isSuccess && <p className='text-green-500'>Email sent successful!</p>}
        {isError && (
          <p className='text-red-500'>
            Something went wrong, please try again!
          </p>
        )}
        <Button
          as='button'
          size='md'
          variant='primary'
          fullWidth
          disabled={locations && locations.length !== 0 ? false : true}
        >
          {isEmailSending ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </div>
  );
};

export default Contact;
