import Image from 'next/image'
import React from 'react'

const UserCard = ({type}:{type : string}) => {
  return (
    <div className="rounded-2xl odd:bg-dwiPurple even:bg-dwiYellow p-4 flex-1 min-w-[130px]">
        <div className="flex justify-between items-center">
            <span className='text-[10px] bg-white px-2 py-1 rounded-full text-green-600'>2024/2025</span>
            <Image src="/more.png" width={20} height={20} alt=''/>
        </div>
        <h1 className='text-2xl font-semibold my-4'>1.234</h1>
        <h2 className='capitalize font-medium text-sm text-gray-500'>{type}s</h2>
    </div>
  )
}

export default UserCard