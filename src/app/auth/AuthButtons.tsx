import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  return (
    <div className="mt-5 flex gap-3 flex-1 flex-col md:flex-row z-50 relative">
      <Button className="w-full" variant={"outline"}>
        Log in
      </Button>
      <Button className="w-full">
        Sign up
      </Button>
    </div>
  );
};

export default AuthButtons;
