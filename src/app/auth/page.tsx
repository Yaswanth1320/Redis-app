import Image from "next/image";
import AuthButtons from "./AuthButtons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) redirect("/");
  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex overflow-hidden dark:bg-[#651c2b54] bg-[#651c2b] relative justify-center items-center">
        <img
          src="/redis-logo.svg"
          alt="logo"
          className="absolute -left-1/4 opacity-25 -bottom-64 lg:scale-125 xl:scale-100 scale-[2] -z-1 pointer-events-none select-none"
        />
        <div className="flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold">
          <Image
            src={"/logo.png"}
            alt="app-logo"
            width={450}
            height={150}
            className="w-[400px] z-10 pointer-events-none select-none"
          />
          <AuthButtons />
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex">
        <img src="/hero-right.jpg" alt="hero" />
      </div>
    </div>
  );
};

export default page;
