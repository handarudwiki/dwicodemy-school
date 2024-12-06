import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Teacher = {
  id: number;
  name: string;
  teacherId: number;
  email?: string;
  phone: string;
  photo: string;
  subjects: string[];
  classes: string[];
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
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

const Teachers = () => {
  const renderRow = (item: Teacher) => {
    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-dwiPurpleLight"
      >
        <td className="flex items-center gap-4 p-4">
          <Image
            src={item.photo}
            width={40}
            height={40}
            alt=""
            className="md:hidden xl:block 1-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-500">{item?.email}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{item.teacherId}</td>
        <td className="hidden md:table-cell">{item.subjects.join(',')}</td>
        <td className="hidden md:table-cell">{item.classes.join(',')}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
            <div className="flex flex-row items-center justify-center gap-2 borde">
                <Link href={`/list/teachers/${item.id}`}>
                    <button>
                        <Image src='/view.png' width={16} height={16} alt="" className="border w-7 h-7 flex items-center justify-center  bg-dwiSky" />
                    </button>
                </Link>
                {role === 'admin' && (
                    
                    <FormModal table="teacher" type="delete" id={item.id}/>
                    
                )}
            </div>
        </td>
      </tr>
    );
  };

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
                {role === 'admin' && <FormModal table='teacher' type='create'/>}
            </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} data={teachersData} renderRow={renderRow} />
      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default Teachers;
