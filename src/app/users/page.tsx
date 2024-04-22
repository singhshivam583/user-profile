'use client'
import { useEffect } from 'react';
import { getAllUsers } from '@/store/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { RootState } from '@/store/store';
import { HoverEffect } from "../../components/ui/card-hover-effect";
import { Button } from '@/components/ui/moving-border';

export default function User() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.user?.loading);
  const data = useAppSelector((state: RootState) => state.user?.data);
  const error = useAppSelector((state: RootState) => state.user?.error);
  // console.log(data)

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
          loading...
        </Button>
    </div>
  )
}
  if(error) return <div className='min-h-screen flex items-center justify-center'>Error...</div>
  
  return (
    <div className="min-h-screen p-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mt-20">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">{loading? "Data Fetching...":"All Data Fetched Successfully"}</h2>
          <p className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-white sm:text-3xl">{loading? "":"All Users"}</p>
        </div>
        <div className="mt-1">
          <HoverEffect
          items={data.map((user:any) => (
            {
              title: user.name,
              description:`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
              link: `users/${user.id}`,
              linkData: `${user.id}`,
              email: user.email,
            }
          ))}
          />
        </div>
      </div>
    </div>
  )
}
