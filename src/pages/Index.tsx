import { useState } from "react";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { ChatInput } from "@/components/ChatInput";
import { EmptyStateView } from "@/components/EmptyStateView";
import { ChatMessagesArea } from "@/components/ChatMessagesArea";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";

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
    sonnerToast.success("Project created", {
      description: `${name} has been created successfully.`,
      position: "top-right",
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
    sonnerToast.success("File uploaded", {
      description: `${file.name} has been uploaded to the project.`,
      position: "top-right",
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
    sonnerToast.success("Project archived", {
      description: "The project has been moved to the archive.",
      position: "top-right",
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
    sonnerToast.success("Project unarchived", {
      description: "The project has been restored from the archive.",
      position: "top-right",
    });
  };

  const handleQuickAction = (action: string) => {
    if (!activeProject) return;
    
    const actionMessages: Record<string, string> = {
      image: "Create an image of ",
      summarize: "Summarize this text: ",
      code: "Write code for ",
      assist: "Help me with "
    };
    
    handleSendMessage(actionMessages[action]);
  };

  const activeProjectData = projects.find((p) => p.id === activeProject);
  const hasMessages = activeProjectData?.messages.length > 0;

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
        setProjects={setProjects}
      />

      <div className="flex-1 flex flex-col">
        {activeProject ? (
          <>
            {hasMessages ? (
              <ChatMessagesArea 
                messages={activeProjectData?.messages || []}
                projectName={activeProjectData?.name || ''}
              />
            ) : (
              <EmptyStateView onQuickAction={handleQuickAction} />
            )}
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