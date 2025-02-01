import { useState } from "react";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
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
      />

      <div className="flex-1 flex flex-col">
        {activeProject ? (
          <>
            {hasMessages ? (
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
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-[#1A1F2C] text-white">
                <h1 className="text-4xl font-semibold mb-8">What can I help with?</h1>
                <div className="max-w-2xl w-full px-4">
                  <div className="text-sm text-gray-400 mb-4 text-center">
                    Start a conversation and I'll help you with your project
                  </div>
                </div>
              </div>
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