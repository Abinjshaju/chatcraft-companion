import { Button } from "@/components/ui/button";
import { FolderIcon, Share, Pencil, Archive, Trash2, MoreVertical, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectFiles } from "./ProjectFiles";
import { useState } from "react";

interface Project {
  id: string;
  name: string;
  isArchived?: boolean;
  files?: string[];
}

interface ProjectItemProps {
  project: Project;
  isActive: boolean;
  onProjectSelect: (projectId: string) => void;
  onProjectArchive?: (projectId: string) => void;
  onProjectRename: (projectId: string, currentName: string) => void;
  onProjectDelete: (projectId: string) => void;
}

export const ProjectItem = ({
  project,
  isActive,
  onProjectSelect,
  onProjectArchive,
  onProjectRename,
  onProjectDelete,
}: ProjectItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-1">
      <div
        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 transition ${
          isActive ? "bg-primary/20 text-primary" : ""
        }`}
      >
        <Button
          variant="ghost"
          className="w-full justify-start text-left"
          onClick={() => onProjectSelect(project.id)}
        >
          <FolderIcon className="mr-2 h-4 w-4" />
          {project.name}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Share className="mr-2 h-4 w-4" /> Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onProjectRename(project.id, project.name)}>
              <Pencil className="mr-2 h-4 w-4" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onProjectArchive?.(project.id)}>
              <Archive className="mr-2 h-4 w-4" /> Archive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onProjectDelete(project.id)} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isExpanded && <ProjectFiles projectId={project.id} files={project.files} />}
    </div>
  );
};