import { Button } from "@/components/ui/button";
import { File, FolderIcon, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ProjectFilesProps {
  projectId: string;
  files?: string[];
}

export const ProjectFiles = ({ projectId, files }: ProjectFilesProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div className="pl-8 space-y-1">
      <Button
        variant="ghost"
        className="w-full justify-start text-sm text-muted-foreground hover:bg-primary/10"
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
            <div 
              key={index} 
              className={`file-item flex items-center gap-2 text-sm text-muted-foreground p-1 rounded-md cursor-pointer ${
                selectedFile === file ? 'selected' : ''
              }`}
              onClick={() => setSelectedFile(file)}
            >
              <File className="h-3 w-3" />
              {file}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};