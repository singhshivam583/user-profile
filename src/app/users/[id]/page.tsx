'use client'
import React, {useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllUsers} from '@/store/userSlice';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/moving-border';
import Link from 'next/link';
import { CircleX } from 'lucide-react';

function UserProfile({params}:any) {

  // const {userData, setUserData}: any = useState({})

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.user?.loading);
  const data  = useAppSelector((state: RootState) => state.user?.data);
  const error = useAppSelector((state: RootState) => state.user?.error);
  // console.log(data)
  const userData : any = data.filter(item => item.id.toString() == params.id.toString())[0];
  // console.log(userData);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if(loading){
      return (
        <div className='min-h-screen flex items-center justify-center'>
          <Button
            borderRadius="10rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            loading....
          </Button>
      </div>
    )
  }
  if(error) return <div className='min-h-screen flex items-center justify-center'>Error...</div>
  
  return (
    <>
      <div className="min-h-screen bg-gray-900 pt-36">
        <h1 className="text-lg md:text-5xl text-center font-sans font-bold mb-8 text-teal-600">User Profile</h1>  
        <div className="flex flex-wrap justify-center">
                <CardContainer className="inter-var mx-4 ">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                      <div className='flex justify-between'>
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                      >
                        {userData?.name}
                      </CardItem>
                      <Link href={'/'}><CircleX/></Link>
                      </div>
                      <CardItem
                        translateZ="50"
                        className='text-xs'
                      >
                        {userData?.username}
                      </CardItem>
                      <CardItem
                        as="button"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-4 dark:text-neutral-300"
                      >
                        <span className='font-bold'>Email:</span> {userData?.email}
                      </CardItem>
                      <CardItem
                            translateZ={70}
                            className='pt-6 w-full flex flex-row justify-between'
                      >
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='w-full'>
                          <h2 className=' flex items-start justify-start font-bold'>Comapny:</h2>
                          <h1 className='font-bold'>{userData?.company?.name}</h1>
                          <p className='text-xs'>{userData?.company?.catchPhrase}</p>
                          <p className='text-xs'>{userData?.company?.bs}</p>
                        </div>
                        <div className='w-full'>
                          <span className='font-bold'>Address: </span><p className='text-sm'>{`${userData?.address?.street}, ${userData?.address?.suite}, ${userData?.address?.city}, ${userData?.address?.zipcode}`}</p>
                          <p className='text-xs'><span className='text-xs underline'>geo</span>: {`${userData?.address?.geo?.lat}, ${userData?.address?.geo?.lng}`}</p>
                        </div>
                        </div>
                      </CardItem>
                      <div className="flex flex-col justify-center items-center mt-10">
                        <CardItem
                          translateZ={20}
                          as="button"
                          className="px-2 py-2 rounded-xl text-xs font-normal dark:text-white"
                        >
                          <span className='font-bold'>contact no. :-</span> {userData?.phone.split('x')[0]}
                        </CardItem>
                        <CardItem
                          translateZ={20}
                          as="button"
                          className="px-2 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs"
                        >
                          <span className='font-bold'>Visit →</span> www.{userData?.website}
                        </CardItem>
                      </div>
                    </CardBody>
                </CardContainer>
        </div>  
    </div>
    </>
  )
}

export default UserProfile