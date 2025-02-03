import { Button } from "@/components/ui/button";
import { Archive, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { CreateProject } from "./project/CreateProject";
import { ProjectItem } from "./project/ProjectItem";

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
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export const ProjectSidebar = ({
  projects,
  activeProject,
  onProjectSelect,
  onProjectCreate,
  onProjectArchive,
  onProjectUnarchive,
  setProjects,
}: ProjectSidebarProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [projectToRename, setProjectToRename] = useState<{id: string, name: string} | null>(null);
  const { theme, setTheme } = useTheme();

  const handleRename = (projectId: string, currentName: string) => {
    setProjectToRename({ id: projectId, name: currentName });
    setIsRenaming(true);
  };

  const handleRenameSubmit = () => {
    if (projectToRename && projectToRename.name.trim()) {
      setProjects(projects.map(project => 
        project.id === projectToRename.id 
          ? { ...project, name: projectToRename.name }
          : project
      ));
      setIsRenaming(false);
      setProjectToRename(null);
    }
  };

  const handleDelete = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    if (activeProject === projectId) {
      onProjectSelect(projects[0]?.id || null);
    }
  };

  const activeProjects = projects.filter((p) => !p.isArchived);
  const archivedProjects = projects.filter((p) => p.isArchived);

  return (
    <div className="w-64 bg-secondary border-r p-4 flex flex-col gap-4 font-sans relative">
      <div className="w-full flex justify-center">
        <img src="src/assets/images/logo.svg" alt="Logo"/>
      </div>

      <CreateProject onProjectCreate={onProjectCreate} />

      <div className="space-y-2">
        {activeProjects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            isActive={activeProject === project.id}
            onProjectSelect={onProjectSelect}
            onProjectArchive={onProjectArchive}
            onProjectRename={handleRename}
            onProjectDelete={handleDelete}
          />
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
                  <Archive className="mr-2 h-4 w-4" />
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

      <Dialog open={isRenaming} onOpenChange={setIsRenaming}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
          </DialogHeader>
          <Input
            value={projectToRename?.name || ""}
            onChange={(e) => setProjectToRename(prev => prev ? {...prev, name: e.target.value} : null)}
            placeholder="New project name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenaming(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameSubmit}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};