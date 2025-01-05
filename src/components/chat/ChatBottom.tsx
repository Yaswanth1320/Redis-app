"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Image as ImageIcon,
  Loader,
  SendHorizonal,
  ThumbsUp,
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "./EmojiPicker";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { Button } from "../ui/button";
import useSound from "use-sound";
import { usePreference } from "@/store/usePreferences";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessageAction } from "@/actions/message.action";
import { useSelectedUser } from "@/store/useSelectedUser";
import { pusherClient } from "@/lib/pusher";
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Message } from "@/db/dummy";

const ChatBottom = () => {
  const [message, setMessage] = useState("");
  const { soundEnabled } = usePreference();
  const { selectedUser } = useSelectedUser();
  const { user: currentUser } = useKindeBrowserClient();
  const [imagUrl, setImageUrl] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const [playSound1] = useSound("/sounds/keystroke1.mp3");
  const [playSound2] = useSound("/sounds/keystroke2.mp3");
  const [playSound3] = useSound("/sounds/keystroke3.mp3");
  const [playSound4] = useSound("/sounds/keystroke4.mp3");
  const [notification] = useSound("/sounds/notification.mp3");
  const soundsArray = [playSound1, playSound2, playSound3, playSound4];

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: sendMessageAction,
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;
    console.log("inside mess");
    sendMessage({
      content: message,
      messageType: "text",
      receiverId: selectedUser?.id!,
    });
    setMessage("");
    textAreaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setMessage(message + "/n");
    }
  };

  const playRandomKeyStroke = () => {
    const randomIndex = Math.floor(Math.random() * soundsArray.length);
    soundEnabled && soundsArray[randomIndex]();
  };

  useEffect(() => {
    const channelName = `${currentUser?.id}__${selectedUser?.id}`
      .split("__")
      .sort()
      .join("__");

    const channel = pusherClient?.subscribe(channelName);

    const handleNewMessage = (data: { message: Message }) => {
      queryClient.setQueryData(
        ["messages", selectedUser?.id],
        (oldMessages: Message[]) => {
          return [...oldMessages, data.message];
        }
      );
      if (soundEnabled && data.message.senderId !== currentUser?.id) {
        notification();
      }
    };

    channel.bind("newMessage", handleNewMessage);

    return () => {
      channel.unbind("newMessage", handleNewMessage);
      pusherClient.unsubscribe(channelName);
    };
  }, [
    currentUser?.id,
    selectedUser?.id,
    queryClient,
    soundEnabled,
    notification,
  ]);

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      {!message.trim() && (
        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          onSuccess={(result, { widget }) => {
            setImageUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <ImageIcon
                size={20}
                className="cursor-pointer text-muted-foreground"
                onClick={() => open()}
              />
            );
          }}
        </CldUploadWidget>
      )}

      <Dialog open={!!imagUrl}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center relative h-96 w-full mx-auto">
            <Image
              src={imagUrl}
              alt="Image preview"
              className="object-contain"
              fill
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                sendMessage({
                  content: imagUrl,
                  messageType: "image",
                  receiverId: selectedUser?.id!,
                });
                setImageUrl("");
              }}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.5 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
          className="w-full relative"
        >
          <Textarea
            autoComplete="off"
            placeholder="Aa"
            rows={1}
            value={message}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setMessage(e.target.value);
              playRandomKeyStroke();
            }}
            className="w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background min-h-0"
            ref={textAreaRef}
          />
          <div className="absolute right-2 bottom-0.5">
            <EmojiPicker
              onChange={(emoji) => {
                setMessage(message + emoji);
                if (textAreaRef.current) {
                  textAreaRef.current.focus();
                }
              }}
            />
          </div>
        </motion.div>
        {message.trim() ? (
          <Button
            className="w-9 h-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            variant={"ghost"}
            size={"icon"}
            onClick={handleSendMessage}
          >
            <SendHorizonal size={20} className="text-muted-foreground" />
          </Button>
        ) : (
          <Button
            className="w-9 h-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            variant={"ghost"}
            size={"icon"}
          >
            {!isPending && (
              <ThumbsUp
                size={20}
                className="text-muted-foreground"
                onClick={() => {
                  sendMessage({
                    content: "👍",
                    messageType: "text",
                    receiverId: selectedUser?.id!,
                  });
                }}
              />
            )}
            {isPending && <Loader size={20} className="animate-spin" />}
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBottom;
