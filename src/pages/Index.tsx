import { useState } from "react";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface Project {
  id: string;
  name: string;
  messages: Message[];
  documents: string[];
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
      documents: [],
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

  const handleFileUpload = () => {
    toast({
      title: "Coming Soon",
      description: "Document upload functionality will be available in the next version.",
    });
  };

  const activeProjectData = projects.find((p) => p.id === activeProject);

  return (
    <div className="flex h-screen bg-background">
      <ProjectSidebar
        projects={projects}
        activeProject={activeProject}
        onProjectSelect={setActiveProject}
        onProjectCreate={handleCreateProject}
      />

      <div className="flex-1 flex flex-col">
        {activeProject ? (
          <>
            <div className="border-b p-4 bg-white flex justify-between items-center">
              <h2 className="text-lg font-semibold">{activeProjectData?.name}</h2>
              <Button variant="outline" onClick={handleFileUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
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
            <ChatInput onSendMessage={handleSendMessage} />
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