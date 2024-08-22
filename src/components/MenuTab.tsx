import { MoonIcon, SunIcon,Volume2 } from "lucide-react";
import { Button } from "./ui/button";

const MenuTab = () => {
  return (
    <div className="flex flex-wrap px-1 md:px-2 gap-2">
      <Button variant={"outline"} size={"icon"}>
        <SunIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button variant={"outline"} size={"icon"}>
        <MoonIcon className="size-[1.2rem] text-muted-foreground" />
      </Button>
      <Button variant={"outline"} size={"icon"}>
        <Volume2 className="size-[1.2rem] text-muted-foreground" />
      </Button>
    </div>
  );
}

export default MenuTab;
