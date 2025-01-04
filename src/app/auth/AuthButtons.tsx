"use client";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";

const AuthButtons = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="mt-5 flex gap-3 flex-1 flex-col md:flex-row z-50 relative">
      <LoginLink className="flex-1" onClick={() => setLoading(true)}>
        <Button className="w-full" variant={"outline"} disabled={loading}>
          Log in
        </Button>
      </LoginLink>
      <RegisterLink className="flex-1" onClick={() => setLoading(true)}>
        <Button className="w-full" disabled={loading}>
          Sign up
        </Button>
      </RegisterLink>
    </div>
  );
};

export default AuthButtons;
