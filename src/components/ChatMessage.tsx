
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Check, X } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ChatMessageProps {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  onEdit?: (id: string, newContent: string) => void;
  onDelete?: (id: string) => void;
}

export const ChatMessage = ({ id, content, isUser, timestamp, onEdit, onDelete }: ChatMessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleSaveEdit = () => {
    if (editContent.trim() && onEdit) {
      onEdit(id, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={cn(
        "flex w-full mb-4 group",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-4 relative",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[60px] resize-none"
            />
            <div className="flex gap-2 justify-end">
              <Button size="sm" onClick={handleSaveEdit}>
                <Check className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="message-content">{content}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs opacity-70">
                {formatTime(timestamp)}
              </span>
              {isUser && (
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => onDelete?.(id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
