import { Button } from "@/components/ui/button";
import { PlusCircle, FolderIcon, Archive, Folder, File, Share, Pencil, Trash2, MoreVertical, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      onProjectCreate(newProjectName);
      setNewProjectName("");
      setIsCreating(false);
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
    <div className="w-64 bg-secondary border-r p-4 flex flex-col gap-4 font-sans relative">
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
              className={`flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 transition ${
                activeProject === project.id ? "bg-primary/20 text-primary" : ""
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
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onProjectArchive?.(project.id)}>
                    <Archive className="mr-2 h-4 w-4" /> Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                  <Archive className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-4 left-4"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </div>
  );
};