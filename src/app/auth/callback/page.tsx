"use client";
import { checkAuthStatus } from "@/actions/auth.actions";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => await checkAuthStatus(),
  });
  if (data?.success) {
    router.push("/")
  }

  return (
    <div className="font-abc mt-20 w-full flex justify-center">
      <div className="flex flex-col gap-2 items-center">
        <Loader className="w-10 h-10 animate-spin text-muted-foreground" />
        <h3 className="text-xl font-bold">Redirecting...</h3>
        <p>please wait</p>
      </div>
    </div>
  );
};

export default Page;
