import { useState } from "react";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "sonner";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface Project {
  id: string;
  name: string;
  messages: Message[];
  files: string[];
  isArchived: boolean;
}

const Index = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const handleCreateProject = (name: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      messages: [],
      files: [],
      isArchived: false,
    };
    setProjects([...projects, newProject]);
    setActiveProject(newProject.id);
    toast({
      title: "Project created",
      description: `${name} has been created successfully.`,
    });
  };

  const handleSendMessage = (content: string) => {
    if (!activeProject) return;

    setProjects(
      projects.map((project) =>
        project.id === activeProject
          ? {
              ...project,
              messages: [
                ...project.messages,
                { id: Date.now().toString(), content, isUser: true },
                {
                  id: (Date.now() + 1).toString(),
                  content: "This is a mock response. The AI integration will be implemented in the next version.",
                  isUser: false,
                },
              ],
            }
          : project
      )
    );
  };

  const handleFileUpload = (projectId: string, file: File) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              files: [...project.files, file.name],
            }
          : project
      )
    );
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded to the project.`,
    });
  };

  const handleProjectArchive = (projectId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              isArchived: true,
            }
          : project
      )
    );
    toast({
      title: "Project archived",
      description: "The project has been moved to the archive.",
    });
  };

  const handleProjectUnarchive = (projectId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              isArchived: false,
            }
          : project
      )
    );
    toast({
      title: "Project unarchived",
      description: "The project has been restored from the archive.",
    });
  };

  const activeProjectData = projects.find((p) => p.id === activeProject);

  return (
    <div className="flex h-screen bg-background font-sans">
      <ProjectSidebar
        projects={projects}
        activeProject={activeProject}
        onProjectSelect={setActiveProject}
        onProjectCreate={handleCreateProject}
        onProjectArchive={handleProjectArchive}
        onProjectUnarchive={handleProjectUnarchive}
        onFileUpload={handleFileUpload}
      />

      <div className="flex-1 flex flex-col">
        <Toaster position="top-right" />
        {activeProject ? (
          <>
            <div className="border-b p-4 bg-white">
              <h2 className="text-lg font-semibold">{activeProjectData?.name}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeProjectData?.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  isUser={message.isUser}
                />
              ))}
            </div>
            <ChatInput 
              onSendMessage={handleSendMessage}
              onFileUpload={(file) => activeProject && handleFileUpload(activeProject, file)}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select or create a project to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;