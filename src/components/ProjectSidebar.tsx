import { Button } from "@/components/ui/button";
import { PlusCircle, FolderIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface Project {
  id: string;
  name: string;
}

interface ProjectSidebarProps {
  projects: Project[];
  activeProject: string | null;
  onProjectSelect: (projectId: string) => void;
  onProjectCreate: (name: string) => void;
}

export const ProjectSidebar = ({
  projects,
  activeProject,
  onProjectSelect,
  onProjectCreate,
}: ProjectSidebarProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      onProjectCreate(newProjectName);
      setNewProjectName("");
      setIsCreating(false);
    }
  };

  return (
    <div className="w-64 bg-secondary border-r p-4 flex flex-col gap-4">
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
        {projects.map((project) => (
          <Button
            key={project.id}
            variant={activeProject === project.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onProjectSelect(project.id)}
          >
            <FolderIcon className="mr-2 h-4 w-4" />
            {project.name}
          </Button>
        ))}
      </div>
    </div>
  );
};