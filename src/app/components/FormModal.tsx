"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const TeacherForm = dynamic(() => import("./form/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});

const StudentForm = dynamic(() => import("./form/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?:any) => JSX.Element;
} = {
  teacher: (type,data) => <TeacherForm type={type} data={data}/>,
  student: (type, data) => <StudentForm type={type} data={data}/>,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table: "teacher" | "student" | "subject" |"parent" | "class" | "grade" | "lesson"| "exam" | "assignment" | "attendance" | "result" | "event" | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-dwiYellow"
      : type === "update"
      ? "bg-dwiSky"
      : "bg-dwiPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form>
        <span className="text-center font-medium">
          All data will be lost, are you sure you want delete this {table}
        </span>
        <button className="bg-read-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "update" || type == "create"  ? (
      forms[table](type)
    ) : (
      "form not found"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center  justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} width={16} height={16} alt="" />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:-[70%] lg:w-[60%] xl-w[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" width={14} height={14} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
