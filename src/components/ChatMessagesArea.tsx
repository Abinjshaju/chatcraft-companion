import { ChatMessage } from "@/components/ChatMessage";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface ChatMessagesAreaProps {
  messages: Message[];
  projectName: string;
}

export const ChatMessagesArea = ({ messages, projectName }: ChatMessagesAreaProps) => {
  return (
    <>
      <div className="border-b p-4 bg-white">
        <h2 className="text-lg font-semibold">{projectName}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            isUser={message.isUser}
          />
        ))}
      </div>
    </>
  );
};