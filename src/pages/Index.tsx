import { useState } from "react";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { ChatInput } from "@/components/ChatInput";
import { EmptyStateView } from "@/components/EmptyStateView";
import { ChatMessagesArea } from "@/components/ChatMessagesArea";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
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

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: "This is a mock response. The AI integration will be implemented in the next version.",
      isUser: false,
      timestamp: new Date(),
    };

    setProjects(
      projects.map((project) =>
        project.id === activeProject
          ? {
              ...project,
              messages: [...project.messages, newMessage, aiResponse],
            }
          : project
      )
    );
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    if (!activeProject) return;

    setProjects(
      projects.map((project) =>
        project.id === activeProject
          ? {
              ...project,
              messages: project.messages.map((msg) =>
                msg.id === messageId ? { ...msg, content: newContent } : msg
              ),
            }
          : project
      )
    );

    sonnerToast.success("Message updated", {
      position: "top-right",
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    if (!activeProject) return;

    setProjects(
      projects.map((project) =>
        project.id === activeProject
          ? {
              ...project,
              messages: project.messages.filter((msg) => msg.id !== messageId),
            }
          : project
      )
    );

    sonnerToast.success("Message deleted", {
      position: "top-right",
    });
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
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
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
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={80}>
          <div className="flex-1 flex flex-col h-full">
            {activeProject ? (
              <>
                {hasMessages ? (
                  <ChatMessagesArea 
                    messages={activeProjectData?.messages || []}
                    projectName={activeProjectData?.name || ''}
                    onEditMessage={handleEditMessage}
                    onDeleteMessage={handleDeleteMessage}
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
