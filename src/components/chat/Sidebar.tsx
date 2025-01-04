import { User } from "@/db/dummy";
import { ScrollArea } from "../ui/scroll-area";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import useSound from "use-sound";
import { usePreference } from "@/store/usePreferences";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useSelectedUser } from "@/store/useSelectedUser";

interface SidebarProps {
  isCollapsed: boolean;
  users: User[];
}

const Sidebar = ({ isCollapsed, users }: SidebarProps) => {
  const [playClickSound] = useSound("/sounds/clicky-mouse-click.mp3");
  const { soundEnabled } = usePreference();
  const { setSelectedUser, selectedUser } = useSelectedUser();
  const { user } = useKindeBrowserClient();
  return (
    <div className="flex relative flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 max-h-full overflow-auto bg-background">
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex item-center text-2xl gap-2">
            <p className="font-medium">Chats</p>
          </div>
        </div>
      )}
      <ScrollArea className="gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {users.map((user, idx) =>
          isCollapsed ? (
            <TooltipProvider key={idx}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => {
                      soundEnabled && playClickSound();
                      setSelectedUser(user);
                    }}
                  >
                    <Avatar className="my-1 flex justify-center items-center">
                      <AvatarImage
                        src={user.image || "/user-placeholder.png"}
                        alt="user image"
                        className="border-2 border-white rounded-full w-10 h-10"
                      />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">{user.name[0]}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  className="flex items-center gap-4"
                  side="right"
                >
                  {user.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              key={idx}
              className={cn(
                "w-full justify-start my-1 gap-4",
                selectedUser?.email === user.email &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink"
              )}
              variant={"grey"}
              size={"xl"}
              onClick={() => {
                soundEnabled && playClickSound();
                setSelectedUser(user);
              }}
            >
              <Avatar className="my-1 flex justify-center items-center">
                <AvatarImage
                  src={user.image || "/user-placeholder.png"}
                  alt="user image"
                  className="w-10 h-10"
                />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{user.name}</span>
              </div>
            </Button>
          )
        )}
      </ScrollArea>

      <div className="mt-auto">
        <div className="flex justify-between items-center gap-2 py-2 md:px-6">
          {!isCollapsed && (
            <div className="hidden md:flex gap-2 items-center">
              <Avatar className="flex items-center justify-center">
                <AvatarImage
                  src={user?.picture || "/user-placeholder.png"}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                  className="border-2 border-white rounded-full w-8 h-8"
                />
              </Avatar>
              <p className="font-bold">
                {user?.given_name} {user?.family_name}
              </p>
            </div>
          )}
          <div className="flex">
            <LogoutLink>
              <LogOut cursor={"pointer"} size={22} />
            </LogoutLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
