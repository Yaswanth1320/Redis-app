import ChatBottom from "./ChatBottom";
import MessageList from "./MessageList";
import TopBar from "./TopBar";

const MessageContainer = () => {
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
