import { Button } from "@/components/ui/button";
import { PlusCircle, FolderIcon, Archive, Folder, File, FileUp, Globe, ArchiveRestore, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";


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
  onProjectUnarchive?: (projectId: string) => void;
  onFileUpload?: (projectId: string, file: File) => void;
}

export const ProjectSidebar = ({
  projects,
  activeProject,
  onProjectSelect,
  onProjectCreate,
  onProjectArchive,
  onProjectUnarchive,
  onFileUpload,
}: ProjectSidebarProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProjectFiles, setSelectedProjectFiles] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

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

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
  };

  const switchProject = (projectId: string) => {
    onProjectSelect(projectId);
  };

  const activeProjects = projects.filter((p) => !p.isArchived);
  const archivedProjects = projects.filter((p) => p.isArchived);

  return (
    <div className="w-64 bg-secondary border-r p-4 flex flex-col gap-4 font-sans">
      <div className="w-full flex justify-center">
        <img src="src/assets/images/logo.svg" alt="Logo"/>
      </div>

      <div className="space-y-2">
        {!isCreating ? (
          <Button onClick={() => setIsCreating(true)} variant="outline" className="w-full">
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
              <Button onClick={handleCreateProject} variant="default" className="flex-1">
                Create
              </Button>
              <Button onClick={() => setIsCreating(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {activeProjects.map((project) => (
          <div key={project.id} className="space-y-1">
            <div
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-orange-500 transition ${activeProject === project.id ? "bg-orange-500 text-white" : ""
                }`}
            >
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => switchProject(project.id)}
              >
                <FolderIcon className="mr-2 h-4 w-4" />
                {project.name}
              </Button>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onProjectArchive?.(project.id)}
                >
                  <Archive className="h-4 w-4" />
                </Button>
                <button onClick={() => toggleProject(project.id)}>
                  {expandedProjects.includes(project.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {expandedProjects.includes(project.id) && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start pl-8"
                  onClick={() => setSelectedProjectFiles(selectedProjectFiles === project.id ? null : project.id)}
                >
                  <Folder className="mr-2 h-4 w-4" />
                  Files ({project.files?.length || 0})
                </Button>
                {selectedProjectFiles === project.id && project.files && (
                  <div className="pl-12 space-y-1">
                    {project.files.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <File className="h-3 w-3" />
                        {file}
                      </div>
                    ))}
                  </div>
                )}
              </>
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
              <div key={project.id} className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start opacity-50"
                  onClick={() => onProjectSelect(project.id)}
                >
                  <FolderIcon className="mr-2 h-4 w-4" />
                  {project.name}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onProjectUnarchive?.(project.id)}
                >
                  <ArchiveRestore className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
