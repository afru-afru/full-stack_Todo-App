
'use client'

import React from 'react'
import SignOutButton from './SignOutButton'
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  // const handleAddClick = () => {
  //   router.push('/form');
  // };
  return (
    <div className='flex  py-3 flex-wrap justify-around'>
        <h1 className='text-lg font-semibold'>Todo APP</h1>

        <ul className='flex gap-[40px] text-m'>
  <li className='cursor-pointer hover:text-red-500 transition-colors' onClick={() => router.push('/')}>Home</li>
  <li className='cursor-pointer hover:text-red-500 transition-colors' onClick={() => router.push('/products')}>Products</li>
  <li className='cursor-pointer hover:text-red-500 transition-colors' onClick={() => router.push('/about')}>About</li>
  <li className='cursor-pointer hover:text-red-500 transition-colors' onClick={() => router.push('/contact')}>Contact</li>

  <SignOutButton/>
</ul>
    </div>
  )
}

export default Navbar