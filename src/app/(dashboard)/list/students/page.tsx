import FormModal from '@/app/components/FormModal';
import Pagination from '@/app/components/Pagination';
import Table from '@/app/components/Table';
import TableSearch from '@/app/components/TableSearch';
import { role, studentsData } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type student = {
    id: number;
    name: string;
    studentId : number;
    email?: string;
    photo: string;
    phone?: string;
    grade: number;
    class: string;
    address: string;
}

const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student ID",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

const student = () => {

    const renderRow = (item: student) => {
       return <tr className='border-b border-gray-200 even:bg-slat-50 text-sm hover:bg-dwiPurpleLight' key={item.id}>
            <td className='flex items-center gap-4 p-4'>
                <Image src={item.photo} width={40} height={40} alt='' className='rounded-full object-cover w-10 h-10 md:hidden xl:block'/>
                <div className="flex flex-col">
                    <h3 className='font-semibold '>{item.name}</h3>
                    <p className='text-xs text-gray-500'>{item.class}</p>
                </div>
            </td>
            <td className='hiden md:table-cell'>{item.studentId}</td>
            <td className='hiden md:table-cell'>{item.grade}</td>
            <td className='hiden md:table-cell'>{item?.phone}</td>
            <td className='hiden md:table-cell'>{item.address}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className='w-7 h-7 flex items-center justify-center rounded-full bg-dwiSky'>
                            <Image src="/view.png" alt='' width={16} height={16}/>
                        </button>
                    </Link>
                    {role === 'admin' &&  <FormModal table='student' type='delete' id={item.id}/>}
                </div>
            </td>
        </tr>
    }

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between ">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch/>
            <div className="flex items-center gap-4 self-end">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-dwiYellow ">
                    <Image src='/filter.png' width={14} height={14} alt=""/>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-dwiYellow">
                    <Image src="/sort.png" width={14} height={14} alt=""/>
                </button>
                {role === 'admin' && <FormModal table='student' type='create'/>}
            </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} data={studentsData} renderRow={renderRow} />
      {/* Pagination */}
      <Pagination />
    </div>
  )
}

export default student