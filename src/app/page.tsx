import MenuTab from "@/components/MenuTab";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center justify-center gap-4 p-4 md:px-24 py-32">
      <MenuTab />
      <div
        className="absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
				dark:bg-[size:20px_20px] bg-[#ffffff] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px]"
        aria-hidden="true"
      />
    </main>
  );
}
