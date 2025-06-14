
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageSearchProps {
  messages: Message[];
  onSearchResults: (results: Message[]) => void;
  onClearSearch: () => void;
}

export const MessageSearch = ({ messages, onSearchResults, onClearSearch }: MessageSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setIsSearching(false);
      onClearSearch();
      return;
    }

    setIsSearching(true);
    const filteredMessages = messages.filter(message =>
      message.content.toLowerCase().includes(term.toLowerCase())
    );
    onSearchResults(filteredMessages);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    onClearSearch();
  };

  return (
    <div className="p-3 border-b bg-background">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9 pr-9"
        />
        {isSearching && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      {isSearching && (
        <p className="text-xs text-muted-foreground mt-2">
          Search active - showing filtered results
        </p>
      )}
    </div>
  );
};
