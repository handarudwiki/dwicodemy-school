import Image from "next/image";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-schreen flex">
        {/* left */}
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
            <Link href="/">
                <Image src="/logo.png" width={32} height={32} alt="logo"/>
                <span className="hidden lg:block font-blood">DwiCodemy</span>
            </Link>
            <Sidebar/>
        </div>
        {/* rigth */}
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
            <Navbar/>
            {children}
        </div>
    </div>
  );
}