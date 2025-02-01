import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, FileUp, Globe } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload?: (file: File) => void;
}

export const ChatInput = ({ onSendMessage, onFileUpload }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-white">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileUpload}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-[50px]"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <FileUp className="h-4 w-4" />
      </Button>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-[50px]">
            <Globe className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          {/* Content will be added later */}
        </SheetContent>
      </Sheet>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="min-h-[50px] max-h-[200px]"
      />
      <Button type="submit" size="icon" className="h-[50px]">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};