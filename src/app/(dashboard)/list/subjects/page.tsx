import FormModal from '@/app/components/FormModal'
import Pagination from '@/app/components/Pagination'
import Table from '@/app/components/Table'
import TableSearch from '@/app/components/TableSearch'
import { role, subjectsData } from '@/lib/data'
import { access } from 'fs'
import Image from 'next/image'
import React from 'react'

type Subject={
    id:number,
    name:string,
    teachers:string[],
}

const columns = [
    {
        header : "Subject name",
        accessor : "name"
    },
    {
        header : "Teachers",
        accessor : "teachers",
        className : "hidden md:table-cell"
    },
    {
        header : "Actions",
        accessor : "actions",
    }
]

const Subjects = () => {
    const renderRow = (item: Subject) => (
        <tr
          key={item.id}
          className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
          <td className="flex items-center gap-4 p-4">{item.name}</td>
          <td className="hidden md:table-cell">{item.teachers.join(",")}</td>
          <td>
            <div className="flex items-center gap-2">
              {role === "admin" && (
                <>
                  <FormModal table="subject" type="update" data={item} />
                  <FormModal table="subject" type="delete" id={item.id} />
                </>
              )}
            </div>
          </td>
        </tr>
      );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* TOP */}
        <div className="flex items-center justify-between">
            <h1>All Subjects</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <TableSearch/>
                <div className="flex items-center gap-4 self-end">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-dwiYellow">
                        <Image src="/filter.png" width={14} height={14} alt=''/>
                    </button>
                    <button className='w-8 h-8 flex items-center justify-center rounded-full bg-dwiYellow'>
                        <Image src="/sort.png" width={14} height={14} alt=''/>
                    </button>
                    {role == "admin" && <FormModal table='teacher' type='create'/>}
                </div>
            </div>
        </div>
        {/* LIST */}
        <div className="">
            <Table columns={columns} renderRow={renderRow} data={subjectsData}/> 
        </div>
        {/* PAGINATION */}
        <div className="">
           <Pagination/>
        </div>
    </div>
  )
}

export default Subjects