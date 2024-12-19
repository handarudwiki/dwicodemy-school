import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Announcement, Class, Prisma } from "@prisma/client"
import Image from "next/image";

type AnnouncementList = Announcement & { class: Class };

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string }).role;
  const currentUserId = userId;

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: AnnouncementList) => {
    return (
      <tr
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-dwiPurpleLight"
        key={item.id}
      >
        <div className="flex items-center gap-4 p-4">{item.title}</div>
        <td>{item.class.name}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat().format(item.date)}</td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal type="update" table="announcement" data={item} />
                <FormModal type="delete" table="announcement" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  }


  const {page, ...queryParams} = await searchParams

  const p = page ? parseInt(page) : 1

  const query:Prisma.AnnouncementWhereInput = {}

 if(queryParams){
  for(const [key, value] of Object.entries(queryParams)){
   if(value != undefined){
      switch(key){
        case "search":
          query.title = {contains: value, mode: "insensitive"}
          break;
        default:
          break;
      }
   }
  }
 }

 const roleConditions = {
  teacher: { lessons: { some: { teacher_id: currentUserId! } } },
  student: { students: { some: { id: currentUserId! } } },
  parent: { students: { some: { parent_id: currentUserId! } } },
};

 query.OR = [
    {class_id : null},
    {
      class : roleConditions[role as keyof typeof roleConditions] || {isNot: null}
    }
 ]

 const [data, count] = await prisma.$transaction([
  prisma.announcement.findMany({
    where: query,
    include: { class: true },
    skip: (p - 1) * ITEM_PER_PAGE,
    take: ITEM_PER_PAGE,
  }),
  prisma.announcement.count({ where: query }),
 ])


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between ">
        <h1 className="hidden md:block text-lg font-semibold">
          All Announcements
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
      <Table columns={columns} data={data} renderRow={renderRow}/>
      {/* Pagination */}
      <Pagination count={count} page={p} />
    </div>
  );
};

export default page;
