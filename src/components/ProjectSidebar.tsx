import { Button } from "@/components/ui/button";
import { PlusCircle, FolderIcon, Archive, Folder, File, FileUp } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

interface Project {
  id: string;
  name: string;
  isArchived?: boolean;
  files?: string[];
}

interface ProjectSidebarProps {
  projects: Project[];
  activeProject: string | null;
  onProjectSelect: (projectId: string) => void;
  onProjectCreate: (name: string) => void;
  onProjectArchive?: (projectId: string) => void;
  onFileUpload?: (projectId: string, file: File) => void;
}

export const ProjectSidebar = ({
  projects,
  activeProject,
  onProjectSelect,
  onProjectCreate,
  onProjectArchive,
  onFileUpload,
}: ProjectSidebarProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProjectFiles, setSelectedProjectFiles] = useState<string | null>(null);

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      onProjectCreate(newProjectName);
      setNewProjectName("");
      setIsCreating(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, projectId: string) => {
    const file = event.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(projectId, file);
    }
  };

  const activeProjects = projects.filter((p) => !p.isArchived);
  const archivedProjects = projects.filter((p) => p.isArchived);

  return (
    <div className="w-64 bg-secondary border-r p-4 flex flex-col gap-4">
      <div className="h-12 flex items-center">
        {/* Logo space */}
        <div className="w-12 h-12 bg-muted rounded-lg"></div>
      </div>

      <div className="space-y-2">
        {!isCreating ? (
          <Button
            onClick={() => setIsCreating(true)}
            variant="outline"
            className="w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        ) : (
          <div className="space-y-2">
            <Input
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name"
              className="w-full"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleCreateProject}
                variant="default"
                className="flex-1"
              >
                Create
              </Button>
              <Button
                onClick={() => setIsCreating(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {activeProjects.map((project) => (
          <div key={project.id} className="space-y-1">
            <div className="flex items-center gap-2">
              <Button
                variant={activeProject === project.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onProjectSelect(project.id)}
              >
                <FolderIcon className="mr-2 h-4 w-4" />
                {project.name}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onProjectArchive?.(project.id)}
              >
                <Archive className="h-4 w-4" />
              </Button>
            </div>
            {project.files && project.files.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start pl-8"
                onClick={() => setSelectedProjectFiles(selectedProjectFiles === project.id ? null : project.id)}
              >
                <Folder className="mr-2 h-4 w-4" />
                Files ({project.files.length})
              </Button>
            )}
            {selectedProjectFiles === project.id && (
              <div className="pl-12 space-y-1">
                {project.files?.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <File className="h-3 w-3" />
                    {file}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {archivedProjects.length > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Archived Projects</h3>
            {archivedProjects.map((project) => (
              <Button
                key={project.id}
                variant="ghost"
                className="w-full justify-start opacity-50"
                onClick={() => onProjectSelect(project.id)}
              >
                <FolderIcon className="mr-2 h-4 w-4" />
                {project.name}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};