import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

interface CreateProjectProps {
  onProjectCreate: (name: string) => void;
}

export const CreateProject = ({ onProjectCreate }: CreateProjectProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      onProjectCreate(newProjectName);
      setNewProjectName("");
      setIsCreating(false);
    }
  };

  if (!isCreating) {
    return (
      <Button onClick={() => setIsCreating(true)} variant="outline" className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        New Project
      </Button>
    );
  }

  return (
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
  );
};