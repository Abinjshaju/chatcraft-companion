
import { ChatMessage } from "@/components/ChatMessage";
import { MessageSearch } from "@/components/MessageSearch";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessagesAreaProps {
  messages: Message[];
  projectName: string;
  onEditMessage?: (id: string, newContent: string) => void;
  onDeleteMessage?: (id: string) => void;
}

export const ChatMessagesArea = ({ 
  messages, 
  projectName, 
  onEditMessage, 
  onDeleteMessage 
}: ChatMessagesAreaProps) => {
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchResults = (results: Message[]) => {
    setFilteredMessages(results);
    setIsSearchActive(true);
  };

  const handleClearSearch = () => {
    setFilteredMessages([]);
    setIsSearchActive(false);
  };

  const displayMessages = isSearchActive ? filteredMessages : messages;

  return (
    <>
      <div className="border-b p-4 bg-white">
        <h2 className="text-lg font-semibold">{projectName}</h2>
      </div>
      
      <MessageSearch 
        messages={messages}
        onSearchResults={handleSearchResults}
        onClearSearch={handleClearSearch}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {displayMessages.length === 0 && isSearchActive ? (
          <div className="text-center text-muted-foreground py-8">
            No messages found matching your search.
          </div>
        ) : (
          displayMessages.map((message) => (
            <ChatMessage
              key={message.id}
              id={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
              onEdit={onEditMessage}
              onDelete={onDeleteMessage}
            />
          ))
        )}
      </div>
    </>
  );
};
