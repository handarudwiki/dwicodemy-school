import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
        {/* search bar */}
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <Image src="/search.png" width={14} height={14} alt='search'/>
            <input type="text" placeholder='search...' className='w-[200px] p-2 bg-transparent outline-none'/>
        </div>
        {/* icons and user */}
        <div className="flex items-center gap-6 justify-end w-full">
            <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                <Image src="/message.png" width={20} height={20} alt=''/>
            </div>
            <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
                <Image src="/announcement.png" alt="" width={20} height={20}/>
            </div>
            <div className="flex flex-col">
                <span className='text-xs ledding-3 font-medium'>John doe</span>
                <span className='text-[10px] text-gray-500 text-right'>Admin</span>
            </div>
            <UserButton />
        </div>
    </div>
  )
}

export default Navbar