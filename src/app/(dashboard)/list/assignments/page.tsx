import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type AssignmentList = Assignment & { lesson:{
  subject: Subject;
  class: Class;
  teacher: Teacher;
} };


const page =async ({
  searchParams
}:{searchParams : {[key:string]: string|undefined}}) => {

  const {userId, sessionClaims} = await auth();
  const role = (sessionClaims?.metadata as {role: string}).role;
  const currentUserId = userId;


  const columns = [
    {
      header: "Subject Name",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "teacher",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Due date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher" ?
      [
        {
          header: "Actions",
          accessor: "action",
        },
      ] : []),
  ];
  const renderRow = (item: AssignmentList) => {
    return (
      <tr className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-dwiPurpleLight">
        <div className="flex items-center gap-4 p-4">{item.lesson.subject.name}</div>
        <td>{item.lesson.class.name}</td>
        <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat().format(item.due_date)}</td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal type="update" table="assignment" data={item} />
                <FormModal type="delete" table="assignment" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };

  const {page, ...queryParams} = await searchParams

  const p = page ? parseInt(page) : 1;

  const query: Prisma.AssignmentWhereInput = {};

  if(queryParams){
    for(const [key, value] of Object.entries(queryParams)){
      if(value != undefined){
        switch(key){
         case "classId":
            query.lesson.class_id = parseInt(value);
            break;
          case "teacherId":
            query.lesson.teacher_id = value;
            break;
          case "subjectId":
            query.lesson.subject_id = parseInt(value);
            break;
          default:
            break;
        }
      }
    }
  }

  //Role Conditions
  switch(role){
    case "admin":
      break;
    case "teacher":
      query.lesson.teacher_id = currentUserId;
      break;
    case "student":
      query.lesson.class = {
        students:{
          some:{
            id: currentUserId
          }
        }
      }
      break;
    case "parent":
      query.lesson.class = {
        students:{
          some:{
            parent_id: currentUserId
          }
        }
      }
      break;
      default:
        break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {lesson: {include: {subject: true, class: true, teacher: true}}},
      skip: (p - 1) * ITEM_PER_PAGE,
      take: ITEM_PER_PAGE,
    }),
    prisma.assignment.count({where: query}),
  ])

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between ">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignment
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
      <Table columns={columns} data={data} renderRow={renderRow} />
      {/* Pagination */}
      <Pagination count={count} page={p}/>
    </div>
  );
};

export default page;
