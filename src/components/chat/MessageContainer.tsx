import { useEffect } from "react";
import ChatBottom from "./ChatBottom";
import MessageList from "./MessageList";
import TopBar from "./TopBar";
import { useSelectedUser } from "@/store/useSelectedUser";

const MessageContainer = () => {
  const { setSelectedUser } = useSelectedUser();
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        setSelectedUser(null);
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setSelectedUser]);
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <TopBar />
      <div className="w-full overflow-x-hidden overflow-y-auto h-full flex flex-col">
        <MessageList />
        <ChatBottom />
      </div>
    </div>
  );
};

export default MessageContainer;
