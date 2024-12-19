import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { parentsData, role } from "@/lib/data";
import Image from "next/image";

type Parent = {
  id: number;
  name: string;
  email?: number;
  students: string[];
    phone: string;
    address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student Names",
    accessor: "name",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "star time",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "End time",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const Page = () => {
  const renderRow = (item: Parent) => {
    return (
      <tr className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-dwiPurpleLight" key={item.id}>
        <td className="flex items-center gap-4 p-4">
            <div className="flex flex-col">
                <h3 className="font-semibold">{item.name}</h3>
                <span className="text-xs text-gray-500">{item?.email}</span>
            </div>
        </td>
        <td className="hidden md:table-cell">{item.students.join(',')}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal type="update" table="event" data={item} />
                <FormModal type="delete" table="event" id={item.id} />
              </>
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
        <h1 className="hidden md:block text-lg font-semibold">
          All Parents
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-dwiYellow ">
              <Image src="/filter.png" width={14} height={14} alt="" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-dwiYellow">
              <Image src="/sort.png" width={14} height={14} alt="" />
            </button>
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} data={parentsData} renderRow={renderRow} />
      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default Page;



