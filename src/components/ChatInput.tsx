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
  const [isGlobeActive, setIsGlobeActive] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 p-4 border-t bg-secondary shadow-md"
    >
      {/* File Upload Button */}
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
        className="h-12 w-12 rounded-xl hover:bg-accent transition"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <FileUp className="h-5 w-5 text-muted-foreground" />
      </Button>

      {/* Globe Toggle Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={`h-12 w-12 rounded-xl transition ${
          isGlobeActive ? "bg-primary text-white" : "hover:bg-accent"
        }`}
        onClick={() => setIsGlobeActive(!isGlobeActive)}
      >
        <Globe className="h-5 w-5" />
      </Button>

      {/* Text Input */}
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="flex-1 min-h-[50px] max-h-[200px] text-sm p-3 rounded-xl border border-muted-foreground focus:ring-2 focus:ring-primary"
      />

      {/* Send Button with Text */}
      <Button
        type="submit"
        className="h-12 px-4 rounded-xl bg-primary hover:bg-primary/90 transition flex items-center gap-2"
      >
        <span className="text-white font-medium">Send</span>
        <Send className="h-5 w-5 text-white" />
      </Button>
    </form>
  );
};