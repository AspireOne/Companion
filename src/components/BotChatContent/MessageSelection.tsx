import { selectedMessagesAtom } from "@components/BotChatContent/BotChatContent";
import { ChatMessageProps } from "@components/bot-chat/ChatMessage";
import { useAtom } from "jotai";
import React, { useState } from "react";

export type SelectedMessage = {
  messageId: number;
  message: string;
};
type MessageSelectionProps = {
  onSelectionChange: (selectedMessages: SelectedMessage[]) => void;
  children: React.ReactNode;
};

export const MessageSelection = ({ onSelectionChange, children }: MessageSelectionProps) => {
  const [selectedMessages, setSelectedMessages] = useAtom(selectedMessagesAtom);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleMessageClick = (props: ChatMessageProps) => {
    if (isSelecting) {
      const updatedSelection = selectedMessages.some(
        (msg) => msg.messageId === props.messageId,
      )
        ? selectedMessages.filter((msg) => msg.messageId !== props.messageId)
        : [...selectedMessages, props];
      setSelectedMessages(updatedSelection);
      onSelectionChange(updatedSelection);

      if (updatedSelection.length === 0) setIsSelecting(false);
    }
  };

  const handleLongClick = (props: ChatMessageProps) => {
    const data: SelectedMessage = {
      messageId: props.messageId,
      message: props.message,
    };
    setIsSelecting(true);
    setSelectedMessages([data]);
    onSelectionChange([data]);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            // @ts-ignore
            onClick: () => handleMessageClick(child.props),
            onLongClick: () => handleLongClick(child.props),
            selected: selectedMessages.some((msg) => msg.messageId === child.props.messageId),
          });
        }
        return child;
      })}
    </div>
  );
};
