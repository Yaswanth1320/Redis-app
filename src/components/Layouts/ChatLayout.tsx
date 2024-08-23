import { ResizablePanelGroup } from "../ui/resizable";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
}

const ChatLayout = ({ defaultLayout = [320, 480] }: ChatLayoutProps) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full items-stretch rounded-lg bg-background"
    ></ResizablePanelGroup>
  );
};

export default ChatLayout;
