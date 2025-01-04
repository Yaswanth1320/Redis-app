import { Avatar, AvatarImage } from "../ui/avatar";
import { Info, X } from "lucide-react";
import { useSelectedUser } from "@/store/useSelectedUser";

const TopBar = () => {
  const { selectedUser, setSelectedUser } = useSelectedUser();
  return (
    <div className="w-full h-20 flex justify-between items-center border-b p-4">
      <div className="flex items-center gap-2">
        <Avatar className="flex items-center justify-center">
          <AvatarImage
            src={selectedUser?.image || "/user-placeholder.png"}
            alt="user image"
            className="w-10 h-10 object-cover rounded-full"
          />
        </Avatar>
        <span className="font-medium">{selectedUser?.name}</span>
      </div>
      <div className="flex gap-2">
        <Info className="text-muted-foreground cursor-pointer hover:text-primary" />
        <X
          className="text-muted-foreground cursor-pointer hover:text-primary"
          onClick={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
};

export default TopBar;
