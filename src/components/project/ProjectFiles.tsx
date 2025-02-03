import { Button } from "@/components/ui/button";
import { File, FolderIcon, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ProjectFilesProps {
  projectId: string;
  files?: string[];
}

export const ProjectFiles = ({ projectId, files }: ProjectFilesProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="pl-8 space-y-1">
      <Button
        variant="ghost"
        className="w-full justify-start text-sm text-muted-foreground"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FolderIcon className="mr-2 h-4 w-4" />
        Files
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </Button>
      
      {isExpanded && files && (
        <div className="pl-4 space-y-1">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground p-1 rounded-md hover:bg-primary/5">
              <File className="h-3 w-3" />
              {file}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};